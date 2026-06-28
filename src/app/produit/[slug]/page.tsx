import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AddToCart, ProductGallery } from "@/components/AddToCart";
import { ProductCard } from "@/components/ProductCard";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Produit introuvable" };
  return {
    title: product.name,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product.id, product.categoryId);
  const hasDiscount = product.compareAt && product.compareAt > product.price;

  return (
    <div className="py-8 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs text-charcoal-light mb-8 overflow-x-auto">
          <Link href="/" className="hover:text-sage transition-colors shrink-0">
            Accueil
          </Link>
          <ChevronRight size={12} className="shrink-0" />
          <Link href="/boutique" className="hover:text-sage transition-colors shrink-0">
            Boutique
          </Link>
          <ChevronRight size={12} className="shrink-0" />
          <Link
            href={`/collections/${product.gender === "FEMME" ? "femme" : "homme"}`}
            className="hover:text-sage transition-colors shrink-0"
          >
            {product.gender === "FEMME" ? "Femme" : "Homme"}
          </Link>
          <ChevronRight size={12} className="shrink-0" />
          <span className="text-charcoal truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <ProductGallery product={product} />

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-sage mb-2">
              {product.category.name}
            </p>
            <h1 className="font-display text-3xl lg:text-4xl text-charcoal mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-medium text-charcoal">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-lg text-charcoal-light line-through">
                    {formatPrice(product.compareAt!)}
                  </span>
                  <span className="text-xs uppercase tracking-wider bg-gold/20 text-gold px-2 py-1">
                    -{Math.round(((product.compareAt! - product.price) / product.compareAt!) * 100)}%
                  </span>
                </>
              )}
            </div>

            <p className="text-charcoal-light leading-relaxed mb-8">{product.description}</p>

            <AddToCart product={product} />

            <div className="mt-10 pt-8 border-t border-cream-dark space-y-3 text-sm text-charcoal-light">
              <p>✓ Livraison gratuite dès 80€ d&apos;achat</p>
              <p>✓ Retours sous 14 jours</p>
              <p>✓ Paiement sécurisé</p>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20 lg:mt-28">
            <h2 className="font-display text-2xl text-charcoal mb-8">Vous aimerez aussi</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
