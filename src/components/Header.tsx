"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, Search, User } from "lucide-react";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/collections/femme", label: "Femme" },
  { href: "/collections/homme", label: "Homme" },
  { href: "/boutique", label: "Boutique" },
  { href: "/a-propos", label: "À propos" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const itemCount = useCart((s) => s.getItemCount());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-warm-white/90 backdrop-blur-md border-b border-cream-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <button
            type="button"
            className="lg:hidden p-2 -ml-2 text-charcoal"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link href="/" className="flex flex-col items-center lg:items-start">
            <span className="font-display text-xl lg:text-2xl tracking-wide text-charcoal">
              Noor Collection
            </span>
            <span className="hidden sm:block text-[10px] uppercase tracking-[0.25em] text-sage">
              Mode pudique &amp; élégante
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm uppercase tracking-widest text-charcoal-light hover:text-sage transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/compte"
              className="p-2 text-charcoal-light hover:text-sage transition-colors"
              aria-label="Mon compte"
            >
              <User size={20} />
            </Link>
            <Link
              href="/boutique"
              className="p-2 text-charcoal-light hover:text-sage transition-colors"
              aria-label="Rechercher"
            >
              <Search size={20} />
            </Link>
            <Link
              href="/panier"
              className="relative p-2 text-charcoal-light hover:text-sage transition-colors"
              aria-label="Panier"
            >
              <ShoppingBag size={20} />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-sage text-[10px] font-medium text-white">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 border-t border-cream-dark",
          mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 border-t-0"
        )}
      >
        <nav className="flex flex-col px-4 py-4 gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-3 text-sm uppercase tracking-widest text-charcoal hover:text-sage transition-colors border-b border-cream-dark last:border-0"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
