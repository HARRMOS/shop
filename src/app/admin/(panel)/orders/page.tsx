"use client";

import { useEffect, useState } from "react";
import { useAdminAuth } from "@/components/admin/useAdminAuth";
import { formatPrice } from "@/lib/utils";
import { ORDER_STATUS_LABELS } from "@/lib/orders";

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

export default function AdminOrdersPage() {
  const ready = useAdminAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!ready) return;
    fetch("/api/admin/orders")
      .then((r) => r.json())
      .then(setOrders);
  }, [ready]);

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

  if (!ready) return <p className="text-charcoal-light">Chargement...</p>;

  return (
    <div>
      <h1 className="font-display text-3xl text-charcoal mb-2">Commandes</h1>
      <p className="text-sm text-charcoal-light mb-8">{orders.length} commande(s)</p>

      <div className="overflow-x-auto bg-warm-white border border-cream-dark">
        {orders.length === 0 ? (
          <p className="text-charcoal-light text-center py-16">Aucune commande</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-widest text-charcoal-light border-b border-cream-dark bg-cream/50">
                <th className="p-4">N°</th>
                <th className="p-4">Client</th>
                <th className="p-4">Total</th>
                <th className="p-4">Date</th>
                <th className="p-4">Statut</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-cream-dark">
                  <td className="p-4 font-medium">{order.orderNumber}</td>
                  <td className="p-4">
                    <p>{order.firstName} {order.lastName}</p>
                    <p className="text-xs text-charcoal-light">{order.email}</p>
                  </td>
                  <td className="p-4">{formatPrice(order.total)}</td>
                  <td className="p-4 text-charcoal-light">
                    {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="p-4">
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
    </div>
  );
}
