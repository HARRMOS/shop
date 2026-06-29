"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import type { CartItem } from "@/lib/cart-types";

function sanitizeCartItems(items: CartItem[]): CartItem[] {
  return items.filter((item) => !item.productId.startsWith("demo-"));
}

export function CartHydration() {
  const setItems = useCart.setState;

  useEffect(() => {
    try {
      const stored = localStorage.getItem("noor-cart");
      if (!stored) return;

      const parsed = JSON.parse(stored) as CartItem[];
      const items = sanitizeCartItems(parsed);

      if (items.length !== parsed.length) {
        localStorage.setItem("noor-cart", JSON.stringify(items));
      }
      if (items.length > 0) {
        setItems({ items });
      }
    } catch {
      // ignore
    }
  }, [setItems]);

  return null;
}
