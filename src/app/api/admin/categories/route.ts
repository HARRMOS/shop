import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-api";
import { isDemoMode } from "@/lib/demo";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (isDemoMode()) return NextResponse.json([]);

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return NextResponse.json(categories);
}
