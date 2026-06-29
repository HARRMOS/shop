import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { isDemoMode } from "@/lib/demo";
import { normalizeEmail } from "@/lib/customer-auth";
import { sendCustomerLoginLink } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }

    const normalized = normalizeEmail(email);

    if (isDemoMode()) {
      return NextResponse.json({ error: "Espace client indisponible en mode démo" }, { status: 400 });
    }

    const orderCount = await prisma.order.count({
      where: { email: { equals: normalized, mode: "insensitive" } },
    });

    // Ne pas révéler si l'email existe — message identique
    if (orderCount === 0) {
      return NextResponse.json({
        ok: true,
        message: "Si cet email a des commandes, un lien de connexion a été envoyé.",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    await prisma.loginToken.deleteMany({ where: { email: normalized } });
    await prisma.loginToken.create({ data: { email: normalized, token, expiresAt } });

    const result = await sendCustomerLoginLink(normalized, token);
    if (!result.ok && !result.skipped) {
      return NextResponse.json({ error: "Impossible d'envoyer l'email de connexion" }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      message: result.skipped
        ? "Lien généré (SMTP non configuré — vérifiez les logs serveur)."
        : "Un lien de connexion a été envoyé à votre adresse email.",
      ...(process.env.NODE_ENV === "development" && result.skipped
        ? { devLink: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/compte/verify?token=${token}` }
        : {}),
    });
  } catch (error) {
    console.error("Customer login error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
