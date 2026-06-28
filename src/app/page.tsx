import Link from "next/link";
import { ArrowRight, Truck, Shield, RotateCcw, Sparkles } from "lucide-react";
import { Hero } from "@/components/Hero";
import { PromoBanner } from "@/components/PromoBanner";
import { CategoryShowcase } from "@/components/CategoryShowcase";
import { CollectionBanner } from "@/components/CollectionBanner";
import { BrandStory } from "@/components/BrandStory";
import { ProductCard } from "@/components/ProductCard";
import { Testimonials } from "@/components/Testimonials";
import { Newsletter } from "@/components/Newsletter";
import { getFeaturedProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

const features = [
  {
    icon: Truck,
    title: "Expédition 24-48h",
    description: "Livraison rapide partout en France",
  },
  {
    icon: Shield,
    title: "Paiement sécurisé",
    description: "Vos données sont protégées",
  },
  {
    icon: RotateCcw,
    title: "Retours 14 jours",
    description: "Satisfait ou remboursé",
  },
  {
    icon: Sparkles,
    title: "Qualité premium",
    description: "Tissus sélectionnés avec soin",
  },
];

export default async function HomePage() {
  const featured = await getFeaturedProducts(8);

  return (
    <>
      <Hero />

      <section className="border-b border-cream-dark bg-warm-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start gap-3 lg:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage/10 text-sage">
                  <feature.icon size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-charcoal">{feature.title}</h3>
                  <p className="text-xs text-charcoal-light mt-0.5 leading-relaxed hidden sm:block">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PromoBanner />
      <CategoryShowcase />
      <CollectionBanner />
      <BrandStory />

      <section className="py-20 lg:py-28 bg-warm-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-sage mb-3">Sélection</p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal">
                Nos coups de cœur
              </h2>
            </div>
            <Link
              href="/boutique"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-sage hover:text-sage-dark transition-colors border-b border-sage/30 pb-1"
            >
              Voir toute la boutique
              <ArrowRight size={14} />
            </Link>
          </div>

          {featured.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-charcoal-light py-12">
              Produits bientôt disponibles. Lancez{" "}
              <code className="text-sage">npm run db:seed</code>.
            </p>
          )}
        </div>
      </section>

      <Testimonials />
      <Newsletter />
    </>
  );
}
