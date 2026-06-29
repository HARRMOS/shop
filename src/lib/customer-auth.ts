import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "noor_customer_session";

function getSecret() {
  return process.env.AUTH_SECRET || "dev-secret";
}

function getCustomerSessionToken(email: string) {
  return crypto
    .createHmac("sha256", getSecret())
    .update(`noor-customer:${email.toLowerCase()}`)
    .digest("hex");
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function getCustomerSessionCookie(email: string) {
  const normalized = normalizeEmail(email);
  const value = `${normalized}:${getCustomerSessionToken(normalized)}`;
  return {
    name: COOKIE_NAME,
    value,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  };
}

export function getClearCustomerCookie() {
  return { name: COOKIE_NAME, value: "", maxAge: 0, path: "/" };
}

export async function getCustomerEmail(): Promise<string | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(COOKIE_NAME)?.value;
  if (!raw) return null;

  const sep = raw.indexOf(":");
  if (sep === -1) return null;

  const email = raw.slice(0, sep);
  const token = raw.slice(sep + 1);
  if (!email || token !== getCustomerSessionToken(email)) return null;
  return email;
}

export async function requireCustomerEmail(): Promise<string | null> {
  return getCustomerEmail();
}
