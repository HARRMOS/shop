export function isDemoMode(): boolean {
  const mode = process.env.DEMO_MODE?.trim().toLowerCase();
  if (mode === "true" || mode === "1" || mode === "yes") return true;
  if (mode === "false" || mode === "0" || mode === "no") return false;
  // Sur Vercel sans PostgreSQL → données de démo intégrées
  if (process.env.VERCEL === "1" && !process.env.DATABASE_URL) return true;
  return false;
}
