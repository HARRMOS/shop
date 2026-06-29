import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateOrderNumber } from "@/lib/utils";
import { isDemoMode } from "@/lib/demo";
import { validateOrderItems, decrementOrderStock } from "@/lib/orders";
import { sendOrderConfirmationToCustomer, sendOrderNotificationToShop } from "@/lib/email";
import type { CartItem } from "@/lib/cart-types";
import type { Prisma } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const required = ["email", "firstName", "lastName", "phone", "address", "city", "postalCode", "items"];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ error: `Champ manquant: ${field}` }, { status: 400 });
      }
    }

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    const { items, subtotal, shipping, total } = await validateOrderItems(body.items as CartItem[]);

    if (Math.abs(body.total - total) > 0.01) {
      return NextResponse.json({ error: "Total invalide" }, { status: 400 });
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
        items: items as unknown as Prisma.InputJsonValue,
        subtotal,
        shipping,
        total,
      },
    });

    const normalizedEmail = body.email.trim().toLowerCase();
    await prisma.customerProfile.upsert({
      where: { email: normalizedEmail },
      create: {
        email: normalizedEmail,
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        address: body.address,
        city: body.city,
        postalCode: body.postalCode,
        country: body.country || "France",
      },
      update: {
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        address: body.address,
        city: body.city,
        postalCode: body.postalCode,
        country: body.country || "France",
      },
    });

    console.info(`Order created: ${order.orderNumber} (${order.id})`);

    await decrementOrderStock(items as CartItem[]);

    const emailData = {
      orderNumber: order.orderNumber,
      firstName: order.firstName,
      lastName: order.lastName,
      email: order.email,
      phone: order.phone,
      address: order.address,
      city: order.city,
      postalCode: order.postalCode,
      country: order.country,
      items: items as Array<{ name: string; size: string; color: string; quantity: number; price: number }>,
      subtotal,
      shipping,
      total,
      notes: order.notes,
    };

    const emailResults = await Promise.allSettled([
      sendOrderConfirmationToCustomer(emailData),
      sendOrderNotificationToShop(emailData),
    ]);

    for (const result of emailResults) {
      if (result.status === "rejected") {
        console.error("Order email failed:", result.reason);
      } else if (!result.value.ok) {
        console.warn("Order email issue:", result.value);
      }
    }

    return NextResponse.json({ orderNumber: order.orderNumber, id: order.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur serveur";
    console.error("Order creation error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
