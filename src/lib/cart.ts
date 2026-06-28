import { create } from "zustand";
import type { CartItem } from "./cart-types";

export type { CartItem } from "./cart-types";

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

const STORAGE_KEY = "noor-cart";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],

  addItem: (item) => {
    const items = get().items.length ? get().items : loadCart();
    const existing = items.find(
      (i) => i.productId === item.productId && i.size === item.size && i.color === item.color
    );

    let newItems: CartItem[];
    if (existing) {
      newItems = items.map((i) =>
        i.productId === item.productId && i.size === item.size && i.color === item.color
          ? { ...i, quantity: i.quantity + (item.quantity ?? 1) }
          : i
      );
    } else {
      newItems = [...items, { ...item, quantity: item.quantity ?? 1 }];
    }

    saveCart(newItems);
    set({ items: newItems });
  },

  removeItem: (productId, size, color) => {
    const newItems = get().items.filter(
      (i) => !(i.productId === productId && i.size === size && i.color === color)
    );
    saveCart(newItems);
    set({ items: newItems });
  },

  updateQuantity: (productId, size, color, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId, size, color);
      return;
    }
    const newItems = get().items.map((i) =>
      i.productId === productId && i.size === size && i.color === color
        ? { ...i, quantity }
        : i
    );
    saveCart(newItems);
    set({ items: newItems });
  },

  clearCart: () => {
    saveCart([]);
    set({ items: [] });
  },

  getTotal: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

  getItemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
}));
