import { NextRequest, NextResponse } from "next/server";
import { verifyAdminPassword, getAdminSessionCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
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
