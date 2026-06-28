"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice, cn } from "@/lib/utils";
import type { Product, Category } from "@prisma/client";

type ProductWithCategory = Product & { category: Category };

interface AddToCartProps {
  product: ProductWithCategory;
}

export function AddToCart({ product }: AddToCartProps) {
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [color, setColor] = useState(product.colors[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCart((s) => s.addItem);

  const handleAdd = () => {
    if (!size || !color) return;
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.image,
      size,
      color,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-6">
      {product.sizes.length > 0 && (
        <div>
          <label className="block text-xs uppercase tracking-widest text-charcoal-light mb-3">
            Taille
          </label>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={cn(
                  "px-4 py-2 text-sm border transition-colors",
                  size === s
                    ? "border-charcoal bg-charcoal text-warm-white"
                    : "border-cream-dark text-charcoal hover:border-sage"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {product.colors.length > 0 && (
        <div>
          <label className="block text-xs uppercase tracking-widest text-charcoal-light mb-3">
            Couleur — {color}
          </label>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={cn(
                  "px-4 py-2 text-sm border transition-colors",
                  color === c
                    ? "border-charcoal bg-charcoal text-warm-white"
                    : "border-cream-dark text-charcoal hover:border-sage"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="block text-xs uppercase tracking-widest text-charcoal-light mb-3">
          Quantité
        </label>
        <div className="inline-flex items-center border border-cream-dark">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-3 hover:bg-cream-dark transition-colors"
            aria-label="Diminuer"
          >
            <Minus size={16} />
          </button>
          <span className="px-6 text-sm font-medium">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="p-3 hover:bg-cream-dark transition-colors"
            aria-label="Augmenter"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        disabled={!product.inStock}
        className={cn(
          "w-full flex items-center justify-center gap-2 py-4 text-sm uppercase tracking-widest font-medium transition-all",
          added
            ? "bg-sage text-white"
            : "bg-charcoal text-warm-white hover:bg-charcoal-light",
          !product.inStock && "opacity-50 cursor-not-allowed"
        )}
      >
        {added ? (
          <>
            <Check size={18} />
            Ajouté au panier
          </>
        ) : (
          <>
            <ShoppingBag size={18} />
            {product.inStock ? "Ajouter au panier" : "Rupture de stock"}
          </>
        )}
      </button>

      <Link
        href="/panier"
        className="block text-center text-sm text-sage hover:text-sage-dark transition-colors underline underline-offset-4"
      >
        Voir le panier
      </Link>
    </div>
  );
}

export function ProductGallery({ product }: { product: ProductWithCategory }) {
  return (
    <div className="relative aspect-[3/4] overflow-hidden bg-cream-dark rounded-sm">
      <Image
        src={product.image}
        alt={product.name}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority
      />
    </div>
  );
}
