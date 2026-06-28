import { prisma } from "./prisma";
import { Gender } from "@prisma/client";
import { isDemoMode } from "./demo";
import {
  getDemoCategories,
  getDemoFeaturedProducts,
  getDemoProductBySlug,
  getDemoProducts,
  getDemoRelatedProducts,
} from "./demo-data";

export async function getFeaturedProducts(limit = 8) {
  if (isDemoMode()) return getDemoFeaturedProducts(limit);

  return prisma.product.findMany({
    where: { featured: true, inStock: true },
    include: { category: true },
    take: limit,
    orderBy: { createdAt: "desc" },
  });
}

export async function getProducts(filters?: {
  gender?: Gender;
  categorySlug?: string;
  search?: string;
}) {
  if (isDemoMode()) return getDemoProducts(filters);

  return prisma.product.findMany({
    where: {
      inStock: true,
      ...(filters?.gender && { gender: filters.gender }),
      ...(filters?.categorySlug && { category: { slug: filters.categorySlug } }),
      ...(filters?.search && {
        OR: [
          { name: { contains: filters.search, mode: "insensitive" } },
          { description: { contains: filters.search, mode: "insensitive" } },
        ],
      }),
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductBySlug(slug: string) {
  if (isDemoMode()) return getDemoProductBySlug(slug);

  return prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
}

export async function getCategories(gender?: Gender) {
  if (isDemoMode()) return getDemoCategories(gender);

  return prisma.category.findMany({
    where: gender ? { gender } : undefined,
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  });
}

export async function getRelatedProducts(productId: string, categoryId: string, limit = 4) {
  if (isDemoMode()) return getDemoRelatedProducts(productId, categoryId, limit);

  return prisma.product.findMany({
    where: {
      categoryId,
      id: { not: productId },
      inStock: true,
    },
    include: { category: true },
    take: limit,
  });
}
