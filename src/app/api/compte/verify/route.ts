import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCustomerSessionCookie } from "@/lib/customer-auth";

export async function GET(request: NextRequest) {
  const token = new URL(request.url).searchParams.get("token");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  if (!token) {
    return NextResponse.redirect(new URL("/compte?error=lien-invalide", siteUrl));
  }

  const loginToken = await prisma.loginToken.findUnique({ where: { token } });

  if (!loginToken || loginToken.expiresAt < new Date()) {
    if (loginToken) await prisma.loginToken.delete({ where: { id: loginToken.id } });
    return NextResponse.redirect(new URL("/compte?error=lien-expire", siteUrl));
  }

  await prisma.loginToken.delete({ where: { id: loginToken.id } });

  const response = NextResponse.redirect(new URL("/compte", siteUrl));
  const cookie = getCustomerSessionCookie(loginToken.email);
  response.cookies.set(cookie);
  return response;
}
