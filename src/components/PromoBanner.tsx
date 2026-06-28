import Link from "next/link";

export function PromoBanner() {
  return (
    <section className="bg-charcoal text-warm-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <p className="text-gold-light text-[10px] uppercase tracking-[0.3em] mb-2">Offre limitée</p>
            <p className="font-display text-2xl sm:text-3xl">
              −15% sur la collection Ramadan
            </p>
            <p className="text-cream/60 text-sm mt-1">Code : <span className="text-gold-light font-medium">NOOR15</span></p>
          </div>
          <Link
            href="/boutique"
            className="shrink-0 bg-gold text-charcoal px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-gold-light transition-colors"
          >
            Profiter de l&apos;offre
          </Link>
        </div>
      </div>
    </section>
  );
}
