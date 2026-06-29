import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";
import { isDemoMode } from "@/lib/demo";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  if (isDemoMode()) return NextResponse.json([]);

  const refunds = await prisma.refundRequest.findMany({
    include: {
      order: {
        select: { orderNumber: true, firstName: true, lastName: true, total: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(refunds);
}
