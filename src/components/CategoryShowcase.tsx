import Link from "next/link";
import Image from "next/image";
import { images } from "@/lib/images";

const categories = [
  { name: "Abayas", href: "/boutique?category=abayas", image: images.categories.abayas },
  { name: "Hijabs", href: "/boutique?category=hijabs", image: images.categories.hijabs },
  { name: "Qamis", href: "/boutique?category=qamis", image: images.categories.qamis },
  { name: "Thobes", href: "/boutique?category=thobes", image: images.categories.thobes },
  { name: "Ensembles", href: "/boutique?category=ensembles-femme", image: images.categories.ensembles },
  { name: "Jilbabs", href: "/boutique?category=jilbabs", image: images.categories.jilbabs },
];

export function CategoryShowcase() {
  return (
    <section className="py-20 lg:py-24 bg-warm-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.35em] text-sage mb-3">Catégories</p>
          <h2 className="font-display text-3xl sm:text-4xl text-charcoal">
            Achetez par type
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group relative aspect-[3/4] overflow-hidden bg-cream-dark"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 16vw"
              />
              <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/50 transition-colors" />
              <div className="absolute inset-x-0 bottom-0 p-3 lg:p-4">
                <span className="block text-center text-warm-white text-xs uppercase tracking-[0.15em] font-medium">
                  {cat.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
