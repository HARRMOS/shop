"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { ORDER_STATUS_LABELS } from "@/lib/orders";
import { LogOut, Package, Mail } from "lucide-react";

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  firstName: string;
  lastName: string;
  email: string;
  total: number;
  createdAt: string;
}

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [tab, setTab] = useState<"orders" | "messages">("orders");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/orders").then((r) => (r.ok ? r.json() : Promise.reject())),
      fetch("/api/admin/messages").then((r) => (r.ok ? r.json() : Promise.reject())),
    ])
      .then(([o, m]) => {
        setOrders(o);
        setMessages(m);
      })
      .catch(() => router.push("/admin/login"))
      .finally(() => setLoading(false));
  }, [router]);

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const updated = await res.json();
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: updated.status } : o)));
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  if (loading) {
    return <p className="text-center py-20 text-charcoal-light">Chargement...</p>;
  }

  return (
    <div className="py-8 lg:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-2xl lg:text-3xl text-charcoal">Administration</h1>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-charcoal-light hover:text-charcoal"
          >
            <LogOut size={16} /> Déconnexion
          </button>
        </div>

        <div className="flex gap-4 mb-6 border-b border-cream-dark">
          <button
            onClick={() => setTab("orders")}
            className={`flex items-center gap-2 pb-3 text-sm uppercase tracking-widest border-b-2 -mb-px ${
              tab === "orders" ? "border-sage text-sage" : "border-transparent text-charcoal-light"
            }`}
          >
            <Package size={16} /> Commandes ({orders.length})
          </button>
          <button
            onClick={() => setTab("messages")}
            className={`flex items-center gap-2 pb-3 text-sm uppercase tracking-widest border-b-2 -mb-px ${
              tab === "messages" ? "border-sage text-sage" : "border-transparent text-charcoal-light"
            }`}
          >
            <Mail size={16} /> Messages ({messages.length})
          </button>
        </div>

        {tab === "orders" && (
          <div className="overflow-x-auto">
            {orders.length === 0 ? (
              <p className="text-charcoal-light text-center py-12">Aucune commande</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-widest text-charcoal-light border-b border-cream-dark">
                    <th className="pb-3 pr-4">N°</th>
                    <th className="pb-3 pr-4">Client</th>
                    <th className="pb-3 pr-4">Total</th>
                    <th className="pb-3 pr-4">Date</th>
                    <th className="pb-3 pr-4">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-cream-dark">
                      <td className="py-4 pr-4 font-medium">{order.orderNumber}</td>
                      <td className="py-4 pr-4">
                        <p>{order.firstName} {order.lastName}</p>
                        <p className="text-xs text-charcoal-light">{order.email}</p>
                      </td>
                      <td className="py-4 pr-4">{formatPrice(order.total)}</td>
                      <td className="py-4 pr-4 text-charcoal-light">
                        {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="py-4">
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          className="text-xs border border-cream-dark bg-warm-white px-2 py-1.5"
                        >
                          {Object.entries(ORDER_STATUS_LABELS).map(([k, v]) => (
                            <option key={k} value={k}>{v}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {tab === "messages" && (
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p className="text-charcoal-light text-center py-12">Aucun message</p>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="bg-warm-white border border-cream-dark p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">{msg.name}</p>
                      <p className="text-xs text-charcoal-light">{msg.email}</p>
                    </div>
                    <p className="text-xs text-charcoal-light">
                      {new Date(msg.createdAt).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                  {msg.subject && <p className="text-sm font-medium mb-1">{msg.subject}</p>}
                  <p className="text-sm text-charcoal-light">{msg.message}</p>
                </div>
              ))
            )}
          </div>
        )}

        <p className="mt-8 text-center">
          <Link href="/" className="text-sm text-sage hover:underline">← Retour au site</Link>
        </p>
      </div>
    </div>
  );
}
