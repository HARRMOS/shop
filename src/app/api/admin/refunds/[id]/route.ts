import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";
import { isDemoMode } from "@/lib/demo";
import { RefundStatus } from "@prisma/client";
import { sendRefundStatusUpdate } from "@/lib/email";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;
  const { status, adminNote } = await request.json();

  if (!Object.values(RefundStatus).includes(status)) {
    return NextResponse.json({ error: "Statut invalide" }, { status: 400 });
  }

  if (isDemoMode()) {
    return NextResponse.json({ error: "Mode démo" }, { status: 400 });
  }

  const refund = await prisma.refundRequest.update({
    where: { id },
    data: {
      status,
      ...(adminNote !== undefined ? { adminNote: adminNote || null } : {}),
    },
    include: { order: true },
  });

  await sendRefundStatusUpdate({
    email: refund.order.email,
    firstName: refund.order.firstName,
    orderNumber: refund.order.orderNumber,
    status,
    adminNote: refund.adminNote,
  }).catch(console.error);

  return NextResponse.json(refund);
}
