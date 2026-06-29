"use client";

import { useState, FormEvent, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { ORDER_STATUS_LABELS } from "@/lib/orders";
import { Package } from "lucide-react";

interface Order {
  orderNumber: string;
  status: string;
  firstName: string;
  lastName: string;
  email: string;
  items: Array<{ name: string; size: string; color: string; quantity: number; price: number }>;
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

function OrderTrackingForm() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState(searchParams.get("numero") || "");
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const lookup = async (num?: string, mail?: string) => {
    const n = num ?? orderNumber;
    const e = mail ?? email;
    if (!n || !e) return;
    setLoading(true);
    setError("");
    setOrder(null);
    try {
      const res = await fetch(`/api/orders/lookup?numero=${encodeURIComponent(n)}&email=${encodeURIComponent(e)}`);
      if (!res.ok) throw new Error();
      setOrder(await res.json());
    } catch {
      setError("Commande introuvable. Vérifiez le numéro et l'email.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const n = searchParams.get("numero");
    const e = searchParams.get("email");
    if (n && e) lookup(n, e);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    lookup();
  };

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <div>
          <label className="block text-xs uppercase tracking-widest text-charcoal-light mb-2">
            N° de commande
          </label>
          <input
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="NC-XXXXX-XXXX"
            required
            className="w-full px-4 py-3 border border-cream-dark bg-warm-white focus:outline-none focus:border-sage text-sm"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-charcoal-light mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-cream-dark bg-warm-white focus:outline-none focus:border-sage text-sm"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-charcoal text-warm-white py-3 text-sm uppercase tracking-widest hover:bg-charcoal-light disabled:opacity-50"
        >
          {loading ? "Recherche..." : "Suivre ma commande"}
        </button>
      </form>

      {order && (
        <div className="bg-warm-white border border-cream-dark p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Package size={24} className="text-sage" />
            <div>
              <p className="font-display text-lg">{order.orderNumber}</p>
              <p className="text-sm text-sage font-medium">
                {ORDER_STATUS_LABELS[order.status] || order.status}
              </p>
            </div>
          </div>
          <ul className="space-y-2 text-sm border-t border-cream-dark pt-4">
            {order.items.map((item, i) => (
              <li key={i} className="flex justify-between gap-4">
                <span className="text-charcoal-light">
                  {item.name} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-cream-dark pt-4 text-sm space-y-1">
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
            <p className="text-charcoal-light text-xs mt-2">
              Livraison : {order.address}, {order.postalCode} {order.city}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export function OrderTracking() {
  return (
    <Suspense fallback={<p className="text-center text-charcoal-light">Chargement...</p>}>
      <OrderTrackingForm />
    </Suspense>
  );
}
