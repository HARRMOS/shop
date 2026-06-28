export function isDemoMode(): boolean {
  if (process.env.DEMO_MODE === "true") return true;
  if (process.env.DEMO_MODE === "false") return false;
  // Sur Vercel sans PostgreSQL → données de démo intégrées
  if (process.env.VERCEL === "1" && !process.env.DATABASE_URL) return true;
  return false;
}
