import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";
import { isDemoMode } from "@/lib/demo";
import { sendOrderStatusUpdate } from "@/lib/email";
import { OrderStatus } from "@prisma/client";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;
  if (isDemoMode()) return NextResponse.json(null, { status: 404 });

  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  return NextResponse.json(order);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;
  const { status } = await request.json();

  if (!Object.values(OrderStatus).includes(status)) {
    return NextResponse.json({ error: "Statut invalide" }, { status: 400 });
  }

  if (isDemoMode()) {
    return NextResponse.json({ error: "Mode démo" }, { status: 400 });
  }

  const order = await prisma.order.update({
    where: { id },
    data: { status },
  });

  const items = order.items as Array<{ name: string; size: string; color: string; quantity: number; price: number }>;

  await sendOrderStatusUpdate({
    orderNumber: order.orderNumber,
    firstName: order.firstName,
    lastName: order.lastName,
    email: order.email,
    phone: order.phone,
    address: order.address,
    city: order.city,
    postalCode: order.postalCode,
    country: order.country,
    items,
    subtotal: order.subtotal,
    shipping: order.shipping,
    total: order.total,
    status,
  }).catch(console.error);

  return NextResponse.json(order);
}
