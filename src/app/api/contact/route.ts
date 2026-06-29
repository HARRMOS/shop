import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendContactNotification } from "@/lib/email";
import { isDemoMode } from "@/lib/demo";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, subject } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
    }

    if (!isDemoMode()) {
      await prisma.contactMessage.create({
        data: { name, email, message, subject: subject || null },
      });
    }

    await sendContactNotification({ name, email, message, subject });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Erreur lors de l'envoi" }, { status: 500 });
  }
}
