import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { images } from "@/lib/images";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-stretch overflow-hidden bg-charcoal">
      {/* Image plein écran derrière le slogan */}
      <Image
        src={images.hero}
        alt="Homme en thobe blanc traditionnel"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-charcoal/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-charcoal/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-charcoal/30" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex items-center py-20 lg:py-0">
        <div className="max-w-xl lg:max-w-lg">
          <div className="inline-flex items-center gap-3 mb-8">
            <span className="h-px w-8 bg-gold" />
            <p className="text-gold-light text-xs uppercase tracking-[0.35em]">
              Collection Ramadan 2026
            </p>
          </div>

          <h1 className="font-display text-[2.75rem] sm:text-5xl lg:text-[3.5rem] text-warm-white leading-[1.1]">
            L&apos;élégance
            <span className="block text-gold-light italic mt-1">de la modestie</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-cream/80 leading-relaxed max-w-md">
            Abayas, hijabs, qamis et thobes sélectionnés avec soin.
            Des pièces raffinées pour honorer vos valeurs avec style.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/collections/femme"
              className="inline-flex items-center justify-center gap-2 bg-gold text-charcoal px-8 py-4 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-gold-light transition-colors"
            >
              Collection Femme
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/collections/homme"
              className="inline-flex items-center justify-center gap-2 border border-warm-white/30 text-warm-white px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-warm-white/10 transition-colors"
            >
              Collection Homme
            </Link>
          </div>

          <div className="mt-14 flex gap-10 sm:gap-14">
            {[
              { value: "500+", label: "Clientes" },
              { value: "12+", label: "Collections" },
              { value: "4.9", label: "Avis clients" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl sm:text-3xl text-warm-white">{stat.value}</p>
                <p className="text-[10px] uppercase tracking-widest text-cream/50 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
