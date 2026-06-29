"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";

const SHIPPING_THRESHOLD = 80;
const SHIPPING_COST = 5.9;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [orderEmail, setOrderEmail] = useState("");
  const [isDemoOrder, setIsDemoOrder] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = getTotal();
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  if (items.length === 0 && !success) {
    router.push("/panier");
    return null;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const data = {
      email: form.get("email") as string,
      firstName: form.get("firstName") as string,
      lastName: form.get("lastName") as string,
      phone: form.get("phone") as string,
      address: form.get("address") as string,
      city: form.get("city") as string,
      postalCode: form.get("postalCode") as string,
      country: form.get("country") as string,
      notes: form.get("notes") as string,
      items,
      subtotal,
      shipping,
      total,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Erreur lors de la commande");
      }

      setOrderNumber(result.orderNumber);
      setOrderEmail(data.email);
      setIsDemoOrder(Boolean(result.demo));
      clearCart();
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="py-20 lg:py-32">
        <div className="mx-auto max-w-lg px-4 text-center">
          <CheckCircle size={56} className="mx-auto text-sage mb-6" />
          <h1 className="font-display text-3xl text-charcoal mb-4">Commande confirmée !</h1>
          <p className="text-charcoal-light mb-2">
            Merci pour votre commande. Un email de confirmation vous a été envoyé.
          </p>
          <p className="text-sm font-medium text-charcoal mb-4">
            N° de commande : {orderNumber}
          </p>
          {isDemoOrder && (
            <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 px-4 py-3 mb-8">
              Mode démo actif : cette commande n&apos;a pas été enregistrée en base. Mettez{" "}
              <code className="text-xs">DEMO_MODE=false</code> dans le fichier <code className="text-xs">.env</code>{" "}
              puis redémarrez l&apos;application.
            </p>
          )}
          {!isDemoOrder && <div className="mb-8" />}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/compte"
              className="inline-flex items-center justify-center gap-2 bg-charcoal text-warm-white px-8 py-4 text-sm uppercase tracking-widest hover:bg-charcoal-light transition-colors"
            >
              Mon espace client
            </Link>
            <Link
              href={`/commande/suivi?numero=${orderNumber}&email=${encodeURIComponent(orderEmail)}`}
              className="inline-flex items-center justify-center gap-2 border border-charcoal text-charcoal px-8 py-4 text-sm uppercase tracking-widest hover:bg-cream transition-colors"
            >
              Suivre ma commande
            </Link>
            <Link
              href="/boutique"
              className="inline-flex items-center justify-center gap-2 border border-cream-dark text-charcoal px-8 py-4 text-sm uppercase tracking-widest hover:bg-cream transition-colors"
            >
              Continuer mes achats
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/panier"
          className="inline-flex items-center gap-2 text-sm text-charcoal-light hover:text-sage transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Retour au panier
        </Link>

        <h1 className="font-display text-3xl lg:text-4xl text-charcoal mb-10">Finaliser la commande</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="font-display text-xl text-charcoal mb-6">Coordonnées</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-xs uppercase tracking-widest text-charcoal-light mb-2">
                    Prénom *
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 border border-cream-dark bg-warm-white focus:outline-none focus:border-sage text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs uppercase tracking-widest text-charcoal-light mb-2">
                    Nom *
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-4 py-3 border border-cream-dark bg-warm-white focus:outline-none focus:border-sage text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-xs uppercase tracking-widest text-charcoal-light mb-2">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-cream-dark bg-warm-white focus:outline-none focus:border-sage text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-charcoal-light mb-2">
                    Téléphone *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full px-4 py-3 border border-cream-dark bg-warm-white focus:outline-none focus:border-sage text-sm"
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl text-charcoal mb-6">Adresse de livraison</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="address" className="block text-xs uppercase tracking-widest text-charcoal-light mb-2">
                    Adresse *
                  </label>
                  <input
                    id="address"
                    name="address"
                    required
                    className="w-full px-4 py-3 border border-cream-dark bg-warm-white focus:outline-none focus:border-sage text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="postalCode" className="block text-xs uppercase tracking-widest text-charcoal-light mb-2">
                      Code postal *
                    </label>
                    <input
                      id="postalCode"
                      name="postalCode"
                      required
                      className="w-full px-4 py-3 border border-cream-dark bg-warm-white focus:outline-none focus:border-sage text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-xs uppercase tracking-widest text-charcoal-light mb-2">
                      Ville *
                    </label>
                    <input
                      id="city"
                      name="city"
                      required
                      className="w-full px-4 py-3 border border-cream-dark bg-warm-white focus:outline-none focus:border-sage text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="country" className="block text-xs uppercase tracking-widest text-charcoal-light mb-2">
                    Pays
                  </label>
                  <select
                    id="country"
                    name="country"
                    defaultValue="France"
                    className="w-full px-4 py-3 border border-cream-dark bg-warm-white focus:outline-none focus:border-sage text-sm"
                  >
                    <option value="France">France</option>
                    <option value="Belgique">Belgique</option>
                    <option value="Suisse">Suisse</option>
                    <option value="Luxembourg">Luxembourg</option>
  </select>
                </div>
                <div>
                  <label htmlFor="notes" className="block text-xs uppercase tracking-widest text-charcoal-light mb-2">
                    Notes (optionnel)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    className="w-full px-4 py-3 border border-cream-dark bg-warm-white focus:outline-none focus:border-sage text-sm resize-none"
                    placeholder="Instructions de livraison..."
                  />
                </div>
              </div>
            </section>
          </div>

          <div>
            <div className="bg-warm-white p-6 lg:p-8 border border-cream-dark sticky top-24">
              <h2 className="font-display text-xl text-charcoal mb-6">Votre commande</h2>

              <ul className="space-y-3 mb-6 max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <li
                    key={`${item.productId}-${item.size}-${item.color}`}
                    className="flex justify-between text-sm gap-4"
                  >
                    <span className="text-charcoal-light line-clamp-1">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="shrink-0">{formatPrice(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-3 text-sm border-t border-cream-dark pt-4">
                <div className="flex justify-between">
                  <span className="text-charcoal-light">Sous-total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-light">Livraison</span>
                  <span>{shipping === 0 ? "Gratuite" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-cream-dark font-medium">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full bg-charcoal text-warm-white py-4 text-sm uppercase tracking-widest hover:bg-charcoal-light transition-colors disabled:opacity-50"
              >
                {loading ? "Traitement..." : "Confirmer la commande"}
              </button>

              <p className="mt-4 text-[10px] text-charcoal-light text-center leading-relaxed">
                Paiement à la livraison ou virement — un email de confirmation vous sera envoyé
                avec les instructions de paiement.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
