"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart";

export function CartHydration() {
  const setItems = useCart.setState;

  useEffect(() => {
    try {
      const stored = localStorage.getItem("noor-cart");
      if (stored) {
        setItems({ items: JSON.parse(stored) });
      }
    } catch {
      // ignore
    }
  }, [setItems]);

  return null;
}
