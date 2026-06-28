"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";

const SHIPPING_THRESHOLD = 80;
const SHIPPING_COST = 5.9;

export default function PanierPage() {
  const { items, updateQuantity, removeItem, getTotal } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="py-20 text-center">
        <p className="text-charcoal-light">Chargement du panier...</p>
      </div>
    );
  }

  const subtotal = getTotal();
  const shipping = subtotal >= SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="py-20 lg:py-32">
        <div className="mx-auto max-w-lg px-4 text-center">
          <ShoppingBag size={48} className="mx-auto text-cream-dark mb-6" />
          <h1 className="font-display text-3xl text-charcoal mb-4">Votre panier est vide</h1>
          <p className="text-charcoal-light mb-8">
            Découvrez nos collections et trouvez votre prochaine tenue.
          </p>
          <Link
            href="/boutique"
            className="inline-flex items-center gap-2 bg-charcoal text-warm-white px-8 py-4 text-sm uppercase tracking-widest hover:bg-charcoal-light transition-colors"
          >
            Continuer mes achats
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl lg:text-4xl text-charcoal mb-10">Panier</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.size}-${item.color}`}
                className="flex gap-4 sm:gap-6 pb-6 border-b border-cream-dark"
              >
                <Link
                  href={`/produit/${item.slug}`}
                  className="relative w-24 sm:w-32 aspect-[3/4] shrink-0 overflow-hidden bg-cream-dark rounded-sm"
                >
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="128px" />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link
                    href={`/produit/${item.slug}`}
                    className="font-display text-base sm:text-lg text-charcoal hover:text-sage transition-colors line-clamp-2"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs text-charcoal-light mt-1">
                    {item.size} · {item.color}
                  </p>
                  <p className="text-sm font-medium text-charcoal mt-2">{formatPrice(item.price)}</p>

                  <div className="flex items-center justify-between mt-4">
                    <div className="inline-flex items-center border border-cream-dark">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.productId, item.size, item.color, item.quantity - 1)
                        }
                        className="p-2 hover:bg-cream-dark transition-colors"
                        aria-label="Diminuer"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-4 text-sm">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.productId, item.size, item.color, item.quantity + 1)
                        }
                        className="p-2 hover:bg-cream-dark transition-colors"
                        aria-label="Augmenter"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.productId, item.size, item.color)}
                      className="p-2 text-charcoal-light hover:text-red-600 transition-colors"
                      aria-label="Supprimer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="hidden sm:block text-sm font-medium text-charcoal">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-warm-white p-6 lg:p-8 border border-cream-dark sticky top-24">
              <h2 className="font-display text-xl text-charcoal mb-6">Récapitulatif</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-charcoal-light">Sous-total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-light">Livraison</span>
                  <span>{shipping === 0 ? "Gratuite" : formatPrice(shipping)}</span>
                </div>
                {subtotal < SHIPPING_THRESHOLD && subtotal > 0 && (
                  <p className="text-xs text-sage">
                    Plus que {formatPrice(SHIPPING_THRESHOLD - subtotal)} pour la livraison gratuite
                  </p>
                )}
                <div className="flex justify-between pt-3 border-t border-cream-dark text-base font-medium">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-6 w-full flex items-center justify-center gap-2 bg-charcoal text-warm-white py-4 text-sm uppercase tracking-widest hover:bg-charcoal-light transition-colors"
              >
                Commander
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/boutique"
                className="mt-4 block text-center text-sm text-sage hover:text-sage-dark transition-colors"
              >
                Continuer mes achats
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
