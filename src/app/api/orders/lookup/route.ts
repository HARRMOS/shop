import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isDemoMode } from "@/lib/demo";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const orderNumber = searchParams.get("numero");
  const email = searchParams.get("email");

  if (!orderNumber || !email) {
    return NextResponse.json({ error: "Numéro et email requis" }, { status: 400 });
  }

  if (isDemoMode()) {
    return NextResponse.json({ error: "Suivi indisponible en mode démo" }, { status: 404 });
  }

  const order = await prisma.order.findFirst({
    where: { orderNumber, email: { equals: email, mode: "insensitive" } },
  });

  if (!order) {
    return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });
  }

  return NextResponse.json(order);
}
