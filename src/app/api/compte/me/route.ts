import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCustomerEmail } from "@/lib/customer-auth";
import { isDemoMode } from "@/lib/demo";

export async function GET() {
  const email = await getCustomerEmail();
  if (!email) {
    return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  }

  if (isDemoMode()) {
    return NextResponse.json({ error: "Mode démo" }, { status: 400 });
  }

  const [profile, orders, refunds] = await Promise.all([
    prisma.customerProfile.findUnique({ where: { email } }),
    prisma.order.findMany({
      where: { email: { equals: email, mode: "insensitive" } },
      orderBy: { createdAt: "desc" },
      include: {
        refundRequests: { orderBy: { createdAt: "desc" } },
      },
    }),
    prisma.refundRequest.findMany({
      where: { email: { equals: email, mode: "insensitive" } },
      include: { order: { select: { orderNumber: true } } },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return NextResponse.json({ email, profile, orders, refunds });
}
