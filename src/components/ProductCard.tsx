import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import type { Product, Category } from "@prisma/client";

type ProductWithCategory = Product & { category: Category };

interface ProductCardProps {
  product: ProductWithCategory;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.compareAt && product.compareAt > product.price;

  return (
    <Link href={`/produit/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-cream-dark rounded-sm">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-gold text-charcoal text-[10px] uppercase tracking-wider px-2 py-1 font-medium">
            Promo
          </span>
        )}
        {product.gender === "FEMME" && (
          <span className="absolute top-3 right-3 bg-sage/90 text-white text-[10px] uppercase tracking-wider px-2 py-1">
            Femme
          </span>
        )}
        {product.gender === "HOMME" && (
          <span className="absolute top-3 right-3 bg-charcoal/80 text-white text-[10px] uppercase tracking-wider px-2 py-1">
            Homme
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-xs uppercase tracking-widest">Voir le produit</span>
        </div>
      </div>
      <div className="mt-4 space-y-1">
        <p className="text-[10px] uppercase tracking-widest text-sage">{product.category.name}</p>
        <h3 className="font-display text-base text-charcoal group-hover:text-sage transition-colors line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-charcoal">{formatPrice(product.price)}</span>
          {hasDiscount && (
            <span className="text-xs text-charcoal-light line-through">
              {formatPrice(product.compareAt!)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
