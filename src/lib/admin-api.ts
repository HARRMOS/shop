import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "./auth";

export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  return null;
}
