"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Mail,
  RotateCcw,
  LogOut,
  Plus,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Produits", icon: Package },
  { href: "/admin/orders", label: "Commandes", icon: ShoppingCart },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/refunds", label: "Remboursements", icon: RotateCcw },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="flex h-full min-h-screen">
      <aside className="w-64 shrink-0 bg-charcoal text-cream flex flex-col">
        <div className="p-6 border-b border-charcoal-light">
          <p className="font-display text-xl text-warm-white">Noor Admin</p>
          <p className="text-[10px] uppercase tracking-widest text-cream-dark mt-1">Back-office</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {nav.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors",
                  active ? "bg-sage text-white" : "text-cream-dark hover:bg-charcoal-light hover:text-warm-white"
                )}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-charcoal-light space-y-2">
          <Link
            href="/admin/products/new"
            className="flex items-center justify-center gap-2 w-full bg-sage text-white py-2.5 text-xs uppercase tracking-widest hover:bg-sage-dark transition-colors rounded"
          >
            <Plus size={14} /> Nouveau produit
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 text-xs text-cream-dark hover:text-warm-white transition-colors"
          >
            <ExternalLink size={14} /> Voir le site
          </a>
          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 w-full py-2 text-xs text-cream-dark hover:text-warm-white transition-colors"
          >
            <LogOut size={14} /> Déconnexion
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-10 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
