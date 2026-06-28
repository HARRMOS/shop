import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-32 text-center px-4">
      <p className="text-6xl font-display text-sage mb-4">404</p>
      <h1 className="font-display text-2xl text-charcoal mb-4">Page introuvable</h1>
      <p className="text-charcoal-light mb-8">La page que vous cherchez n&apos;existe pas.</p>
      <Link
        href="/"
        className="inline-block bg-charcoal text-warm-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-charcoal-light transition-colors"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
