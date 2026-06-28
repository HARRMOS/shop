import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { images } from "@/lib/images";

export function BrandStory() {
  return (
    <section className="overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative aspect-square lg:aspect-auto lg:min-h-[560px]">
          <Image
            src={images.brandStory}
            alt="Femmes en tenue modeste élégante"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-16 lg:py-20 bg-sage-dark text-warm-white">
          <p className="text-gold-light text-xs uppercase tracking-[0.35em] mb-6">Notre histoire</p>
          <h2 className="font-display text-3xl sm:text-4xl leading-tight mb-6">
            La lumière dans<br />chaque couture
          </h2>
          <p className="text-cream/80 leading-relaxed mb-4">
            <strong className="text-warm-white font-normal">Noor</strong> signifie lumière en arabe.
            Nous croyons que la pudeur et l&apos;élégance ne s&apos;opposent pas — elles se complètent.
          </p>
          <p className="text-cream/70 leading-relaxed mb-10 text-sm">
            Chaque pièce est choisie pour sa qualité de tissu, sa coupe flatteuse et son respect
            des principes islamiques. Des abayas fluides aux qamis impeccables, nous habillons
            toute la famille avec dignité.
          </p>

          <ul className="space-y-3 mb-10">
            {["Tissus premium certifiés", "Coupes testées & approuvées", "Livraison soignée en France"].map(
              (item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-cream/80">
                  <span className="h-1 w-1 rounded-full bg-gold shrink-0" />
                  {item}
                </li>
              )
            )}
          </ul>

          <Link
            href="/a-propos"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold-light hover:text-gold transition-colors w-fit"
          >
            En savoir plus
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
