import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateOrderNumber } from "@/lib/utils";
import { isDemoMode } from "@/lib/demo";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const required = ["email", "firstName", "lastName", "phone", "address", "city", "postalCode", "items", "total"];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ error: `Champ manquant: ${field}` }, { status: 400 });
      }
    }

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    const orderNumber = generateOrderNumber();

    if (isDemoMode()) {
      return NextResponse.json({ orderNumber, id: "demo", demo: true });
    }

    const order = await prisma.order.create({
      data: {
        orderNumber,
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        address: body.address,
        city: body.city,
        postalCode: body.postalCode,
        country: body.country || "France",
        notes: body.notes || null,
        items: body.items,
        subtotal: body.subtotal,
        shipping: body.shipping ?? 0,
        total: body.total,
      },
    });

    return NextResponse.json({ orderNumber: order.orderNumber, id: order.id });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
