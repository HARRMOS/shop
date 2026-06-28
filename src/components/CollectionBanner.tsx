import Link from "next/link";
import Image from "next/image";
import { images } from "@/lib/images";

const collections = [
  {
    title: "Femme",
    subtitle: "Abayas · Hijabs · Ensembles",
    href: "/collections/femme",
    image: images.collections.femme,
    count: "8 catégories",
  },
  {
    title: "Homme",
    subtitle: "Qamis · Thobes · Sarouels",
    href: "/collections/homme",
    image: images.collections.homme,
    count: "4 catégories",
  },
];

export function CollectionBanner() {
  return (
    <section className="py-20 lg:py-28 bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-sage mb-3">Nos univers</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal">
              Deux collections,<br className="hidden sm:block" /> une même exigence
            </h2>
          </div>
          <p className="text-charcoal-light max-w-sm leading-relaxed text-sm">
            Des pièces pensées pour le quotidien, la prière et les moments qui comptent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {collections.map((col) => (
            <Link
              key={col.href}
              href={col.href}
              className="group relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden"
            >
              <Image
                src={col.image}
                alt={`Collection ${col.title}`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-charcoal/20 group-hover:from-charcoal/90 transition-all duration-500" />
              <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
                <p className="text-gold-light text-[10px] uppercase tracking-[0.25em] mb-3">
                  {col.subtitle}
                </p>
                <h3 className="font-display text-4xl lg:text-5xl text-warm-white mb-2">
                  {col.title}
                </h3>
                <p className="text-cream/60 text-xs mb-5">{col.count}</p>
                <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-warm-white border border-warm-white/30 px-5 py-2.5 group-hover:bg-warm-white group-hover:text-charcoal transition-all duration-300">
                  Explorer la collection
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
