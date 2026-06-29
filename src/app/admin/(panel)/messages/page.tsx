"use client";

import { useEffect, useState } from "react";
import { useAdminAuth } from "@/components/admin/useAdminAuth";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const ready = useAdminAuth();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!ready) return;
    fetch("/api/admin/messages")
      .then((r) => r.json())
      .then(setMessages);
  }, [ready]);

  const markRead = async (id: string, read: boolean) => {
    const res = await fetch(`/api/admin/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read }),
    });
    if (res.ok) {
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read } : m)));
    }
  };

  if (!ready) return <p className="text-charcoal-light">Chargement...</p>;

  return (
    <div>
      <h1 className="font-display text-3xl text-charcoal mb-2">Messages</h1>
      <p className="text-sm text-charcoal-light mb-8">{messages.length} message(s)</p>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <p className="text-charcoal-light text-center py-16">Aucun message</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-warm-white border p-5 ${msg.read ? "border-cream-dark opacity-75" : "border-sage"}`}
            >
              <div className="flex flex-wrap justify-between items-start gap-4 mb-2">
                <div>
                  <p className="font-medium">{msg.name}</p>
                  <a href={`mailto:${msg.email}`} className="text-xs text-sage hover:underline">{msg.email}</a>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-xs text-charcoal-light">
                    {new Date(msg.createdAt).toLocaleDateString("fr-FR")}
                  </p>
                  <button
                    onClick={() => markRead(msg.id, !msg.read)}
                    className="text-xs uppercase tracking-widest border border-cream-dark px-2 py-1 hover:bg-cream"
                  >
                    {msg.read ? "Non lu" : "Marquer lu"}
                  </button>
                </div>
              </div>
              {msg.subject && <p className="text-sm font-medium mb-1">{msg.subject}</p>}
              <p className="text-sm text-charcoal-light whitespace-pre-wrap">{msg.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
