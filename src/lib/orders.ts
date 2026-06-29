import { prisma } from "./prisma";
import { isDemoMode } from "./demo";
import type { CartItem } from "./cart-types";

const SHIPPING_THRESHOLD = 80;
const SHIPPING_COST = 5.9;

export function calculateShipping(subtotal: number) {
  return subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}

export async function validateOrderItems(items: CartItem[]) {
  if (isDemoMode()) {
    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const shipping = calculateShipping(subtotal);
    return { items, subtotal, shipping, total: subtotal + shipping };
  }

  const validated: CartItem[] = [];

  for (const item of items) {
    if (item.productId.startsWith("demo-")) {
      throw new Error(
        "Panier obsolète (mode démo). Videz le panier, rechargez la page, puis rajoutez vos articles."
      );
    }

    const product = await prisma.product.findUnique({ where: { id: item.productId } });
    if (!product || !product.inStock) {
      throw new Error(`Produit indisponible : ${item.name}`);
    }
    if (!product.sizes.includes(item.size)) {
      throw new Error(`Taille invalide pour ${item.name}`);
    }
    if (!product.colors.includes(item.color)) {
      throw new Error(`Couleur invalide pour ${item.name}`);
    }
    validated.push({
      ...item,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.image,
    });
  }

  const subtotal = validated.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = calculateShipping(subtotal);
  return { items: validated, subtotal, shipping, total: subtotal + shipping };
}

export const ORDER_STATUS_LABELS: Record<string, string> = {
  PENDING: "En attente",
  CONFIRMED: "Confirmée",
  SHIPPED: "Expédiée",
  DELIVERED: "Livrée",
  CANCELLED: "Annulée",
};
