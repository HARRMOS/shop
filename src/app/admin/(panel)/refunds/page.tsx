"use client";

import { useEffect, useState } from "react";
import { useAdminAuth } from "@/components/admin/useAdminAuth";
import { formatPrice } from "@/lib/utils";

interface Refund {
  id: string;
  status: string;
  reason: string;
  email: string;
  createdAt: string;
  order: { orderNumber: string; firstName: string; lastName: string; total: number };
}

export default function AdminRefundsPage() {
  const ready = useAdminAuth();
  const [refunds, setRefunds] = useState<Refund[]>([]);

  useEffect(() => {
    if (!ready) return;
    fetch("/api/admin/refunds")
      .then((r) => r.json())
      .then(setRefunds);
  }, [ready]);

  const updateRefundStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/admin/refunds/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const updated = await res.json();
      setRefunds((prev) => prev.map((r) => (r.id === id ? { ...r, status: updated.status } : r)));
    }
  };

  if (!ready) return <p className="text-charcoal-light">Chargement...</p>;

  return (
    <div>
      <h1 className="font-display text-3xl text-charcoal mb-2">Remboursements</h1>
      <p className="text-sm text-charcoal-light mb-8">{refunds.length} demande(s)</p>

      <div className="space-y-4">
        {refunds.length === 0 ? (
          <p className="text-charcoal-light text-center py-16">Aucune demande</p>
        ) : (
          refunds.map((refund) => (
            <div key={refund.id} className="bg-warm-white border border-cream-dark p-5">
              <div className="flex flex-wrap justify-between gap-4 mb-2">
                <div>
                  <p className="font-medium">{refund.order.orderNumber}</p>
                  <p className="text-xs text-charcoal-light">
                    {refund.order.firstName} {refund.order.lastName} — {refund.email}
                  </p>
                </div>
                <select
                  value={refund.status}
                  onChange={(e) => updateRefundStatus(refund.id, e.target.value)}
                  className="text-xs border border-cream-dark bg-warm-white px-2 py-1.5"
                >
                  <option value="PENDING">En attente</option>
                  <option value="APPROVED">Approuvé</option>
                  <option value="REJECTED">Refusé</option>
                  <option value="COMPLETED">Remboursé</option>
                </select>
              </div>
              <p className="text-sm text-charcoal-light">{refund.reason}</p>
              <p className="text-xs text-charcoal-light mt-2">
                {new Date(refund.createdAt).toLocaleDateString("fr-FR")} · {formatPrice(refund.order.total)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
