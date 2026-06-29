import { prisma } from "./prisma";
import { slugify } from "./utils";
import { Gender } from "@prisma/client";

export interface ProductInput {
  name: string;
  slug?: string;
  description: string;
  price: number;
  compareAt?: number | null;
  image: string;
  images?: string[];
  sizes: string[];
  colors: string[];
  gender: Gender;
  featured?: boolean;
  inStock?: boolean;
  categoryId: string;
  variants?: Array<{ size: string; color: string; stock: number; sku?: string | null }>;
}

export function parseStringList(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).map((s) => s.trim()).filter(Boolean);
  if (typeof value === "string") {
    return value
      .split(/[,;\n]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

export async function uniqueProductSlug(base: string, excludeId?: string) {
  let slug = slugify(base) || "produit";
  let suffix = 0;
  while (true) {
    const candidate = suffix === 0 ? slug : `${slug}-${suffix}`;
    const existing = await prisma.product.findUnique({ where: { slug: candidate } });
    if (!existing || existing.id === excludeId) return candidate;
    suffix++;
  }
}

export async function syncProductVariants(
  productId: string,
  sizes: string[],
  colors: string[],
  variants: ProductInput["variants"]
) {
  const combos = new Map<string, { size: string; color: string; stock: number; sku?: string | null }>();

  if (variants && variants.length > 0) {
    for (const v of variants) {
      if (!v.size || !v.color) continue;
      combos.set(`${v.size}::${v.color}`, {
        size: v.size,
        color: v.color,
        stock: Math.max(0, Number(v.stock) || 0),
        sku: v.sku || null,
      });
    }
  } else {
    for (const size of sizes) {
      for (const color of colors) {
        combos.set(`${size}::${color}`, { size, color, stock: 0, sku: null });
      }
    }
  }

  const existing = await prisma.productVariant.findMany({ where: { productId } });
  const existingKeys = new Set(existing.map((v) => `${v.size}::${v.color}`));

  for (const [key, data] of combos) {
    if (existingKeys.has(key)) {
      await prisma.productVariant.updateMany({
        where: { productId, size: data.size, color: data.color },
        data: { stock: data.stock, sku: data.sku },
      });
    } else {
      await prisma.productVariant.create({
        data: { productId, size: data.size, color: data.color, stock: data.stock, sku: data.sku },
      });
    }
    existingKeys.delete(key);
  }

  if (existingKeys.size > 0) {
    for (const key of existingKeys) {
      const [size, color] = key.split("::");
      await prisma.productVariant.deleteMany({ where: { productId, size, color } });
    }
  }

  const totalStock = await prisma.productVariant.aggregate({
    where: { productId },
    _sum: { stock: true },
  });

  await prisma.product.update({
    where: { id: productId },
    data: { inStock: (totalStock._sum.stock ?? 0) > 0 },
  });
}

export function validateProductInput(body: Record<string, unknown>): ProductInput | string {
  const name = String(body.name || "").trim();
  const description = String(body.description || "").trim();
  const image = String(body.image || "").trim();
  const categoryId = String(body.categoryId || "").trim();
  const price = Number(body.price);
  const gender = String(body.gender || "") as Gender;

  if (!name) return "Le nom est requis";
  if (!description) return "La description est requise";
  if (!image) return "L'image principale est requise";
  if (!categoryId) return "La catégorie est requise";
  if (!Number.isFinite(price) || price < 0) return "Prix invalide";
  if (!Object.values(Gender).includes(gender)) return "Genre invalide";

  const sizes = parseStringList(body.sizes);
  const colors = parseStringList(body.colors);
  if (sizes.length === 0) return "Au moins une taille est requise";
  if (colors.length === 0) return "Au moins une couleur est requise";

  const compareAt = body.compareAt != null && body.compareAt !== "" ? Number(body.compareAt) : null;
  const images = parseStringList(body.images);

  const variants = Array.isArray(body.variants)
    ? body.variants.map((v: Record<string, unknown>) => ({
        size: String(v.size || "").trim(),
        color: String(v.color || "").trim(),
        stock: Math.max(0, Number(v.stock) || 0),
        sku: v.sku ? String(v.sku).trim() : null,
      }))
    : undefined;

  return {
    name,
    slug: body.slug ? String(body.slug).trim() : undefined,
    description,
    price,
    compareAt: compareAt != null && Number.isFinite(compareAt) ? compareAt : null,
    image,
    images,
    sizes,
    colors,
    gender,
    featured: Boolean(body.featured),
    inStock: body.inStock !== false,
    categoryId,
    variants,
  };
}

export async function getTotalStock(productId: string) {
  const result = await prisma.productVariant.aggregate({
    where: { productId },
    _sum: { stock: true },
  });
  return result._sum.stock ?? 0;
}
