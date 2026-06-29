"use client";

import { useState, FormEvent } from "react";
import { CheckCircle } from "lucide-react";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          subject: form.get("subject"),
          message: form.get("message"),
        }),
      });
      if (!res.ok) throw new Error();
      setSuccess(true);
      e.currentTarget.reset();
    } catch {
      setError("Erreur lors de l'envoi. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <CheckCircle size={40} className="mx-auto text-sage mb-4" />
        <p className="font-display text-lg text-charcoal mb-2">Message envoyé !</p>
        <p className="text-sm text-charcoal-light">Nous vous répondrons sous 24–48h.</p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-4 text-sm text-sage hover:underline"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        type="text"
        placeholder="Nom"
        required
        className="w-full px-4 py-3 border border-cream-dark bg-warm-white focus:outline-none focus:border-sage text-sm"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="w-full px-4 py-3 border border-cream-dark bg-warm-white focus:outline-none focus:border-sage text-sm"
      />
      <input
        name="subject"
        type="text"
        placeholder="Sujet (optionnel)"
        className="w-full px-4 py-3 border border-cream-dark bg-warm-white focus:outline-none focus:border-sage text-sm"
      />
      <textarea
        name="message"
        rows={4}
        placeholder="Votre message"
        required
        className="w-full px-4 py-3 border border-cream-dark bg-warm-white focus:outline-none focus:border-sage text-sm resize-none"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-charcoal text-warm-white py-3 text-sm uppercase tracking-widest hover:bg-charcoal-light transition-colors disabled:opacity-50"
      >
        {loading ? "Envoi..." : "Envoyer"}
      </button>
    </form>
  );
}
