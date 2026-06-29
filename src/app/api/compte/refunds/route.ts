import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCustomerEmail, normalizeEmail } from "@/lib/customer-auth";
import { isDemoMode } from "@/lib/demo";
import { sendRefundNotificationToShop, sendRefundRequestToCustomer } from "@/lib/email";

export async function POST(request: NextRequest) {
  const email = await getCustomerEmail();
  if (!email) {
    return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  }

  if (isDemoMode()) {
    return NextResponse.json({ error: "Mode démo" }, { status: 400 });
  }

  const { orderId, reason } = await request.json();
  if (!orderId || !reason?.trim()) {
    return NextResponse.json({ error: "Commande et motif requis" }, { status: 400 });
  }

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      email: { equals: email, mode: "insensitive" },
    },
  });

  if (!order) {
    return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });
  }

  if (!["DELIVERED", "SHIPPED", "CONFIRMED", "PENDING"].includes(order.status)) {
    return NextResponse.json({ error: "Cette commande ne peut pas faire l'objet d'un remboursement" }, { status: 400 });
  }

  const existing = await prisma.refundRequest.findFirst({
    where: {
      orderId: order.id,
      status: { in: ["PENDING", "APPROVED"] },
    },
  });

  if (existing) {
    return NextResponse.json({ error: "Une demande de remboursement est déjà en cours" }, { status: 400 });
  }

  const refund = await prisma.refundRequest.create({
    data: {
      orderId: order.id,
      email: normalizeEmail(email),
      reason: reason.trim(),
    },
  });

  await Promise.allSettled([
    sendRefundRequestToCustomer({
      email: order.email,
      firstName: order.firstName,
      orderNumber: order.orderNumber,
    }),
    sendRefundNotificationToShop({
      orderNumber: order.orderNumber,
      email: order.email,
      reason: reason.trim(),
    }),
  ]);

  return NextResponse.json(refund, { status: 201 });
}
