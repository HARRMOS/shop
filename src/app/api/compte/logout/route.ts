import { NextResponse } from "next/server";
import { getClearCustomerCookie } from "@/lib/customer-auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  const cookie = getClearCustomerCookie();
  response.cookies.set(cookie);
  return response;
}
