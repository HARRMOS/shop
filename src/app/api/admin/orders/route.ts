import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";
import { isDemoMode } from "@/lib/demo";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  if (isDemoMode()) {
    return NextResponse.json([]);
  }

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return NextResponse.json(orders);
}
