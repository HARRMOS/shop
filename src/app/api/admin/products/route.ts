import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-api";
import { isDemoMode } from "@/lib/demo";
import {
  syncProductVariants,
  uniqueProductSlug,
  validateProductInput,
} from "@/lib/admin-products";

export async function GET(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (isDemoMode()) return NextResponse.json([]);

  const q = new URL(request.url).searchParams.get("q")?.trim();

  const products = await prisma.product.findMany({
    where: q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { slug: { contains: q, mode: "insensitive" } },
          ],
        }
      : undefined,
    include: {
      category: true,
      variants: true,
      _count: { select: { variants: true } },
    },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (isDemoMode()) {
    return NextResponse.json({ error: "Mode démo" }, { status: 400 });
  }

  const body = await request.json();
  const input = validateProductInput(body);
  if (typeof input === "string") {
    return NextResponse.json({ error: input }, { status: 400 });
  }

  const slug = input.slug
    ? await uniqueProductSlug(input.slug)
    : await uniqueProductSlug(input.name);

  const product = await prisma.product.create({
    data: {
      name: input.name,
      slug,
      description: input.description,
      price: input.price,
      compareAt: input.compareAt,
      image: input.image,
      images: input.images ?? [],
      sizes: input.sizes,
      colors: input.colors,
      gender: input.gender,
      featured: input.featured ?? false,
      inStock: input.inStock ?? true,
      categoryId: input.categoryId,
    },
  });

  await syncProductVariants(product.id, input.sizes, input.colors, input.variants);

  const full = await prisma.product.findUnique({
    where: { id: product.id },
    include: { category: true, variants: true },
  });

  return NextResponse.json(full, { status: 201 });
}
