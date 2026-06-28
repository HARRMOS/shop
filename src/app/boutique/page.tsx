import { ProductCard } from "@/components/ProductCard";
import { getProducts, getCategories } from "@/lib/products";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export const metadata = {
  title: "Boutique",
  description: "Découvrez tous nos vêtements musulmans pour homme et femme.",
};

export default async function BoutiquePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const products = await getProducts({
    categorySlug: params.category,
    search: params.q,
  });
  const categories = await getCategories();

  return (
    <div className="py-8 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="font-display text-3xl lg:text-4xl text-charcoal mb-2">Boutique</h1>
          <p className="text-charcoal-light">
            {products.length} produit{products.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="lg:w-56 shrink-0">
            <h2 className="text-xs uppercase tracking-widest text-charcoal-light mb-4">
              Catégories
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/boutique"
                  className={cn(
                    "text-sm transition-colors",
                    !params.category ? "text-sage font-medium" : "text-charcoal-light hover:text-sage"
                  )}
                >
                  Toutes
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/boutique?category=${cat.slug}`}
                    className={cn(
                      "text-sm transition-colors",
                      params.category === cat.slug
                        ? "text-sage font-medium"
                        : "text-charcoal-light hover:text-sage"
                    )}
                  >
                    {cat.name}
                    <span className="text-charcoal-light/60 ml-1">({cat._count.products})</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-8 border-t border-cream-dark">
              <h2 className="text-xs uppercase tracking-widest text-charcoal-light mb-4">
                Collections
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/collections/femme" className="text-sm text-charcoal-light hover:text-sage transition-colors">
                    Femme
                  </Link>
                </li>
                <li>
                  <Link href="/collections/homme" className="text-sm text-charcoal-light hover:text-sage transition-colors">
                    Homme
                  </Link>
                </li>
              </ul>
            </div>
          </aside>

          {products.length > 0 ? (
            <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex-1 text-center py-20">
              <p className="text-charcoal-light mb-4">Aucun produit trouvé.</p>
              <Link href="/boutique" className="text-sage hover:text-sage-dark text-sm underline">
                Voir tous les produits
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
