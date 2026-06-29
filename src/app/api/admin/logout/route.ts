import { NextResponse } from "next/server";
import { getClearAdminCookie } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  const cookie = getClearAdminCookie();
  response.cookies.set(cookie.name, cookie.value, { maxAge: 0, path: "/" });
  return response;
}
