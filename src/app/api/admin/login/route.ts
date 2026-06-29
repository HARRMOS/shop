import { NextRequest, NextResponse } from "next/server";
import { verifyAdminPassword, getAdminSessionCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (!verifyAdminPassword(password)) {
    const message = !process.env.ADMIN_PASSWORD?.trim()
      ? "ADMIN_PASSWORD non configuré sur le serveur"
      : "Mot de passe incorrect";
    return NextResponse.json({ error: message }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  const cookie = getAdminSessionCookie();
  response.cookies.set(cookie.name, cookie.value, {
    httpOnly: cookie.httpOnly,
    secure: cookie.secure,
    sameSite: cookie.sameSite,
    maxAge: cookie.maxAge,
    path: cookie.path,
  });
  return response;
}
