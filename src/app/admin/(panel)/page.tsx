"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAdminAuth } from "@/components/admin/useAdminAuth";
import { formatPrice } from "@/lib/utils";
import { Package, ShoppingCart, Mail, RotateCcw, AlertTriangle, TrendingUp } from "lucide-react";

interface Stats {
  orders: number;
  revenue: number;
  pendingOrders: number;
  products: number;
  lowStock: number;
  unreadMessages: number;
  pendingRefunds: number;
}

export default function AdminDashboardPage() {
  const ready = useAdminAuth();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    if (!ready) return;
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats);
  }, [ready]);

  if (!ready) return <p className="text-charcoal-light">Chargement...</p>;

  const cards = [
    { label: "Chiffre d'affaires", value: formatPrice(stats?.revenue ?? 0), icon: TrendingUp, href: "/admin/orders" },
    { label: "Commandes", value: stats?.orders ?? 0, icon: ShoppingCart, href: "/admin/orders" },
    { label: "En attente", value: stats?.pendingOrders ?? 0, icon: ShoppingCart, href: "/admin/orders" },
    { label: "Produits", value: stats?.products ?? 0, icon: Package, href: "/admin/products" },
    { label: "Stock faible", value: stats?.lowStock ?? 0, icon: AlertTriangle, href: "/admin/products" },
    { label: "Messages non lus", value: stats?.unreadMessages ?? 0, icon: Mail, href: "/admin/messages" },
    { label: "Remboursements", value: stats?.pendingRefunds ?? 0, icon: RotateCcw, href: "/admin/refunds" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl text-charcoal mb-2">Tableau de bord</h1>
      <p className="text-sm text-charcoal-light mb-8">Vue d&apos;ensemble de votre boutique</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="bg-warm-white border border-cream-dark p-5 hover:border-sage transition-colors group"
          >
            <div className="flex items-center justify-between mb-3">
              <Icon size={20} className="text-sage" />
            </div>
            <p className="text-2xl font-display text-charcoal group-hover:text-sage transition-colors">{value}</p>
            <p className="text-xs text-charcoal-light mt-1">{label}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-warm-white border border-cream-dark p-6">
          <h2 className="font-display text-lg text-charcoal mb-4">Actions rapides</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/products/new" className="bg-charcoal text-warm-white px-5 py-2.5 text-xs uppercase tracking-widest hover:bg-charcoal-light">
              + Nouveau produit
            </Link>
            <Link href="/admin/orders" className="border border-charcoal text-charcoal px-5 py-2.5 text-xs uppercase tracking-widest hover:bg-cream">
              Voir commandes
            </Link>
            <Link href="/admin/messages" className="border border-charcoal text-charcoal px-5 py-2.5 text-xs uppercase tracking-widest hover:bg-cream">
              Messages
            </Link>
          </div>
        </div>
        <div className="bg-warm-white border border-cream-dark p-6">
          <h2 className="font-display text-lg text-charcoal mb-4">Alertes</h2>
          <ul className="space-y-2 text-sm text-charcoal-light">
            {(stats?.lowStock ?? 0) > 0 && (
              <li className="flex items-center gap-2 text-amber-700">
                <AlertTriangle size={16} /> {stats?.lowStock} variante(s) avec stock ≤ 3
              </li>
            )}
            {(stats?.pendingOrders ?? 0) > 0 && (
              <li>{stats?.pendingOrders} commande(s) en attente de traitement</li>
            )}
            {(stats?.unreadMessages ?? 0) > 0 && (
              <li>{stats?.unreadMessages} message(s) non lu(s)</li>
            )}
            {(stats?.pendingRefunds ?? 0) > 0 && (
              <li>{stats?.pendingRefunds} demande(s) de remboursement en attente</li>
            )}
            {!stats?.lowStock && !stats?.pendingOrders && !stats?.unreadMessages && !stats?.pendingRefunds && (
              <li className="text-sage">Tout est à jour ✓</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
