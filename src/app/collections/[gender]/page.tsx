import { Gender } from "@prisma/client";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getProducts, getCategories } from "@/lib/products";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ gender: string }>;
  searchParams: Promise<{ category?: string }>;
}

const genderMap: Record<string, Gender> = {
  femme: Gender.FEMME,
  homme: Gender.HOMME,
};

const genderLabels: Record<string, { title: string; description: string }> = {
  femme: {
    title: "Collection Femme",
    description: "Abayas, hijabs, jilbabs et ensembles — élégance et pudeur.",
  },
  homme: {
    title: "Collection Homme",
    description: "Qamis, thobes, sarouels et ensembles — tradition et modernité.",
  },
};

export async function generateMetadata({ params }: PageProps) {
  const { gender } = await params;
  const info = genderLabels[gender];
  if (!info) return { title: "Collection" };
  return { title: info.title, description: info.description };
}

export default async function CollectionPage({ params, searchParams }: PageProps) {
  const { gender } = await params;
  const search = await searchParams;
  const genderEnum = genderMap[gender];
  if (!genderEnum) notFound();

  const info = genderLabels[gender];
  const products = await getProducts({
    gender: genderEnum,
    categorySlug: search.category,
  });
  const categories = await getCategories(genderEnum);

  return (
    <div className="py-8 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <nav className="text-xs text-charcoal-light mb-4">
            <Link href="/" className="hover:text-sage transition-colors">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-charcoal">{info.title}</span>
          </nav>
          <h1 className="font-display text-3xl lg:text-4xl text-charcoal mb-2">{info.title}</h1>
          <p className="text-charcoal-light max-w-xl">{info.description}</p>
        </div>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            <Link
              href={`/collections/${gender}`}
              className={cn(
                "px-4 py-2 text-xs uppercase tracking-widest border transition-colors",
                !search.category
                  ? "border-charcoal bg-charcoal text-warm-white"
                  : "border-cream-dark text-charcoal-light hover:border-sage"
              )}
            >
              Tout
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/collections/${gender}?category=${cat.slug}`}
                className={cn(
                  "px-4 py-2 text-xs uppercase tracking-widest border transition-colors",
                  search.category === cat.slug
                    ? "border-charcoal bg-charcoal text-warm-white"
                    : "border-cream-dark text-charcoal-light hover:border-sage"
                )}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        {products.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-charcoal-light py-20">Aucun produit dans cette catégorie.</p>
        )}
      </div>
    </div>
  );
}
