import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-api";
import { isDemoMode } from "@/lib/demo";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (isDemoMode()) return NextResponse.json({ error: "Mode démo" }, { status: 400 });

  const { id } = await params;
  const { read } = await request.json();

  const message = await prisma.contactMessage.update({
    where: { id },
    data: { read: Boolean(read) },
  });

  return NextResponse.json(message);
}
