import Link from "next/link";

export const metadata = {
  title: "À propos",
  description: "Découvrez l'histoire et les valeurs de Noor Collection.",
};

export default function AboutPage() {
  return (
    <div className="py-8 lg:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl lg:text-4xl text-charcoal mb-8">À propos</h1>
        <div className="prose prose-neutral max-w-none space-y-6 text-charcoal-light leading-relaxed">
          <p>
            <strong className="text-charcoal">Noor Collection</strong> est née d&apos;une passion pour
            la mode modeste et l&apos;élégance. Notre mission est simple : proposer des vêtements
            musulmans de qualité, alliant pudeur, confort et style contemporain.
          </p>
          <p>
            Chaque pièce est sélectionnée avec soin — tissus premium, coupes flatteuses, finitions
            soignées. Que vous cherchiez une abaya pour une occasion spéciale ou un qamis pour le
            quotidien, nous avons ce qu&apos;il vous faut.
          </p>
          <h2 className="font-display text-xl text-charcoal pt-4">Nos valeurs</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Qualité avant quantité</li>
            <li>Respect de la pudeur islamique</li>
            <li>Service client attentionné</li>
            <li>Transparence et confiance</li>
          </ul>
        </div>
        <Link
          href="/boutique"
          className="inline-block mt-10 text-sm uppercase tracking-widest text-sage hover:text-sage-dark transition-colors"
        >
          Découvrir la boutique →
        </Link>
      </div>
    </div>
  );
}
