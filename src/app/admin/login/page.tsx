"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error();
      router.push("/admin");
    } catch {
      setError("Mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <h1 className="font-display text-2xl text-charcoal text-center mb-6">Administration</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          required
          className="w-full px-4 py-3 border border-cream-dark bg-warm-white focus:outline-none focus:border-sage text-sm"
        />
        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-charcoal text-warm-white py-3 text-sm uppercase tracking-widest hover:bg-charcoal-light disabled:opacity-50"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
