"use client";

import { useEffect, useState, FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { ORDER_STATUS_LABELS } from "@/lib/orders";
import { REFUND_STATUS_LABELS } from "@/lib/refunds";
import { LogOut, Package, MapPin, RotateCcw, User } from "lucide-react";

interface Profile {
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  postalCode: string | null;
  country: string;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  subtotal: number;
  shipping: number;
  createdAt: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  items: Array<{ name: string; size: string; color: string; quantity: number; price: number }>;
  refundRequests: Array<{ id: string; status: string; reason: string; createdAt: string }>;
}

interface Refund {
  id: string;
  status: string;
  reason: string;
  adminNote: string | null;
  createdAt: string;
  order: { orderNumber: string };
}

type Tab = "orders" | "profile" | "refunds";

function AccountContent() {
  const searchParams = useSearchParams();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [tab, setTab] = useState<Tab>("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [refunds, setRefunds] = useState<Refund[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");
  const [refundOrderId, setRefundOrderId] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const [refundLoading, setRefundLoading] = useState(false);
  const [refundMessage, setRefundMessage] = useState("");

  const loadAccount = async () => {
    const res = await fetch("/api/compte/me");
    if (!res.ok) {
      setAuthenticated(false);
      return;
    }
    const data = await res.json();
    setAuthenticated(true);
    setEmail(data.email);
    setOrders(data.orders);
    setRefunds(data.refunds);
    setProfile(data.profile);
  };

  useEffect(() => {
    loadAccount();
  }, []);

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "lien-expire") setLoginError("Le lien de connexion a expiré. Demandez-en un nouveau.");
    if (error === "lien-invalide") setLoginError("Lien de connexion invalide.");
  }, [searchParams]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    setLoginMessage("");
    try {
      const res = await fetch("/api/compte/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur");
      setLoginMessage(data.message);
      if (data.devLink) setLoginMessage(`${data.message} Lien dev : ${data.devLink}`);
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/compte/logout", { method: "POST" });
    setAuthenticated(false);
    setOrders([]);
    setRefunds([]);
    setProfile(null);
  };

  const handleProfileSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileMessage("");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/compte/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: form.get("firstName"),
        lastName: form.get("lastName"),
        phone: form.get("phone"),
        address: form.get("address"),
        city: form.get("city"),
        postalCode: form.get("postalCode"),
        country: form.get("country"),
      }),
    });
    if (res.ok) {
      setProfile(await res.json());
      setProfileMessage("Profil enregistré.");
    } else {
      setProfileMessage("Erreur lors de l'enregistrement.");
    }
    setProfileSaving(false);
  };

  const handleRefund = async (e: FormEvent) => {
    e.preventDefault();
    if (!refundOrderId || !refundReason.trim()) return;
    setRefundLoading(true);
    setRefundMessage("");
    const res = await fetch("/api/compte/refunds", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: refundOrderId, reason: refundReason }),
    });
    const data = await res.json();
    if (res.ok) {
      setRefundMessage("Demande de remboursement envoyée.");
      setRefundReason("");
      setRefundOrderId("");
      await loadAccount();
    } else {
      setRefundMessage(data.error || "Erreur");
    }
    setRefundLoading(false);
  };

  if (authenticated === null) {
    return <p className="text-center py-20 text-charcoal-light">Chargement...</p>;
  }

  if (!authenticated) {
    return (
      <div className="max-w-md mx-auto">
        <h1 className="font-display text-3xl text-charcoal text-center mb-2">Mon compte</h1>
        <p className="text-sm text-charcoal-light text-center mb-8">
          Connectez-vous avec l&apos;email utilisé lors de vos commandes
        </p>
        <form onSubmit={handleLogin} className="space-y-4 bg-warm-white border border-cream-dark p-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-charcoal-light mb-2">Email</label>
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-cream-dark bg-warm-white focus:outline-none focus:border-sage text-sm"
            />
          </div>
          {loginError && <p className="text-sm text-red-600">{loginError}</p>}
          {loginMessage && <p className="text-sm text-sage">{loginMessage}</p>}
          <button
            type="submit"
            disabled={loginLoading}
            className="w-full bg-charcoal text-warm-white py-3 text-sm uppercase tracking-widest hover:bg-charcoal-light disabled:opacity-50"
          >
            {loginLoading ? "Envoi..." : "Recevoir un lien de connexion"}
          </button>
        </form>
        <p className="text-center text-sm text-charcoal-light mt-6">
          <Link href="/commande/suivi" className="text-sage hover:underline">
            Suivre une commande sans compte
          </Link>
        </p>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: typeof Package }[] = [
    { id: "orders", label: "Commandes", icon: Package },
    { id: "profile", label: "Adresse", icon: MapPin },
    { id: "refunds", label: "Remboursements", icon: RotateCcw },
  ];

  const refundableOrders = orders.filter(
    (o) => !o.refundRequests.some((r) => ["PENDING", "APPROVED"].includes(r.status))
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-charcoal">Mon compte</h1>
          <p className="text-sm text-charcoal-light mt-1">{email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-charcoal-light hover:text-charcoal"
        >
          <LogOut size={16} /> Déconnexion
        </button>
      </div>

      <div className="flex gap-4 mb-8 border-b border-cream-dark overflow-x-auto">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 pb-3 text-sm uppercase tracking-widest border-b-2 -mb-px whitespace-nowrap ${
              tab === id ? "border-sage text-sage" : "border-transparent text-charcoal-light"
            }`}
          >
            <Icon size={16} /> {label}
          </button>
        ))}
      </div>

      {tab === "orders" && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <p className="text-charcoal-light text-center py-12">Aucune commande</p>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-warm-white border border-cream-dark p-6">
                <div className="flex flex-wrap justify-between gap-4 mb-4">
                  <div>
                    <p className="font-display text-lg">{order.orderNumber}</p>
                    <p className="text-sm text-sage font-medium">
                      {ORDER_STATUS_LABELS[order.status] || order.status}
                    </p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-medium">{formatPrice(order.total)}</p>
                    <p className="text-charcoal-light">
                      {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </div>
                <ul className="text-sm space-y-1 border-t border-cream-dark pt-4 mb-4">
                  {order.items.map((item, i) => (
                    <li key={i} className="flex justify-between gap-4 text-charcoal-light">
                      <span>{item.name} ({item.size}, {item.color}) × {item.quantity}</span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-charcoal-light">
                  Livraison : {order.address}, {order.postalCode} {order.city}, {order.country}
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {tab === "profile" && (
        <form onSubmit={handleProfileSave} className="bg-warm-white border border-cream-dark p-6 space-y-4 max-w-lg">
          <div className="flex items-center gap-2 mb-2 text-charcoal">
            <User size={18} /> <span className="text-sm font-medium">Mes coordonnées</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-charcoal-light mb-2">Prénom</label>
              <input name="firstName" defaultValue={profile?.firstName || ""} className="w-full px-4 py-3 border border-cream-dark text-sm" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-charcoal-light mb-2">Nom</label>
              <input name="lastName" defaultValue={profile?.lastName || ""} className="w-full px-4 py-3 border border-cream-dark text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-charcoal-light mb-2">Téléphone</label>
            <input name="phone" defaultValue={profile?.phone || ""} className="w-full px-4 py-3 border border-cream-dark text-sm" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-charcoal-light mb-2">Adresse</label>
            <input name="address" defaultValue={profile?.address || ""} className="w-full px-4 py-3 border border-cream-dark text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-charcoal-light mb-2">Ville</label>
              <input name="city" defaultValue={profile?.city || ""} className="w-full px-4 py-3 border border-cream-dark text-sm" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-charcoal-light mb-2">Code postal</label>
              <input name="postalCode" defaultValue={profile?.postalCode || ""} className="w-full px-4 py-3 border border-cream-dark text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-charcoal-light mb-2">Pays</label>
            <input name="country" defaultValue={profile?.country || "France"} className="w-full px-4 py-3 border border-cream-dark text-sm" />
          </div>
          {profileMessage && <p className="text-sm text-sage">{profileMessage}</p>}
          <button
            type="submit"
            disabled={profileSaving}
            className="bg-charcoal text-warm-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-charcoal-light disabled:opacity-50"
          >
            {profileSaving ? "Enregistrement..." : "Enregistrer"}
          </button>
        </form>
      )}

      {tab === "refunds" && (
        <div className="space-y-8">
          {refunds.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-sm uppercase tracking-widest text-charcoal-light">Mes demandes</h2>
              {refunds.map((refund) => (
                <div key={refund.id} className="bg-warm-white border border-cream-dark p-5">
                  <div className="flex justify-between gap-4 mb-2">
                    <p className="font-medium">{refund.order.orderNumber}</p>
                    <p className="text-sm text-sage">{REFUND_STATUS_LABELS[refund.status]}</p>
                  </div>
                  <p className="text-sm text-charcoal-light">{refund.reason}</p>
                  {refund.adminNote && (
                    <p className="text-sm mt-2 text-charcoal">Réponse boutique : {refund.adminNote}</p>
                  )}
                  <p className="text-xs text-charcoal-light mt-2">
                    {new Date(refund.createdAt).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              ))}
            </div>
          )}

          {refundableOrders.length > 0 ? (
            <form onSubmit={handleRefund} className="bg-warm-white border border-cream-dark p-6 space-y-4 max-w-lg">
              <h2 className="text-sm uppercase tracking-widest text-charcoal-light">Nouvelle demande</h2>
              <div>
                <label className="block text-xs uppercase tracking-widest text-charcoal-light mb-2">Commande</label>
                <select
                  value={refundOrderId}
                  onChange={(e) => setRefundOrderId(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-cream-dark text-sm bg-warm-white"
                >
                  <option value="">Sélectionner une commande</option>
                  {refundableOrders.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.orderNumber} — {formatPrice(o.total)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-charcoal-light mb-2">Motif</label>
                <textarea
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  required
                  rows={4}
                  placeholder="Décrivez la raison de votre demande..."
                  className="w-full px-4 py-3 border border-cream-dark text-sm resize-none"
                />
              </div>
              {refundMessage && <p className="text-sm text-sage">{refundMessage}</p>}
              <button
                type="submit"
                disabled={refundLoading}
                className="bg-charcoal text-warm-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-charcoal-light disabled:opacity-50"
              >
                {refundLoading ? "Envoi..." : "Demander un remboursement"}
              </button>
            </form>
          ) : (
            <p className="text-charcoal-light text-sm">Aucune commande éligible au remboursement.</p>
          )}
        </div>
      )}
    </div>
  );
}

export function AccountDashboard() {
  return (
    <Suspense fallback={<p className="text-center py-20 text-charcoal-light">Chargement...</p>}>
      <AccountContent />
    </Suspense>
  );
}
