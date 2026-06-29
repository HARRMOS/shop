import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "noor_admin_session";

function getSessionToken() {
  const secret = process.env.AUTH_SECRET || "dev-secret";
  return crypto.createHmac("sha256", secret).update("noor-admin").digest("hex");
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value === getSessionToken();
}

export function verifyAdminPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD?.trim();
  if (!adminPassword) return false;
  return password === adminPassword;
}

export function getAdminSessionCookie() {
  return {
    name: COOKIE_NAME,
    value: getSessionToken(),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  };
}

export function getClearAdminCookie() {
  return { name: COOKIE_NAME, value: "", maxAge: 0, path: "/" };
}
