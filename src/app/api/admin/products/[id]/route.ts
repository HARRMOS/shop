import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-api";
import { isDemoMode } from "@/lib/demo";
import {
  syncProductVariants,
  uniqueProductSlug,
  validateProductInput,
} from "@/lib/admin-products";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  if (isDemoMode()) return NextResponse.json(null, { status: 404 });

  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true, variants: true },
  });

  if (!product) return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (isDemoMode()) return NextResponse.json({ error: "Mode démo" }, { status: 400 });

  const { id } = await params;
  const body = await request.json();
  const input = validateProductInput(body);
  if (typeof input === "string") {
    return NextResponse.json({ error: input }, { status: 400 });
  }

  const slug = input.slug
    ? await uniqueProductSlug(input.slug, id)
    : await uniqueProductSlug(input.name, id);

  await prisma.product.update({
    where: { id },
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

  await syncProductVariants(id, input.sizes, input.colors, input.variants);

  const full = await prisma.product.findUnique({
    where: { id },
    include: { category: true, variants: true },
  });

  return NextResponse.json(full);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (isDemoMode()) return NextResponse.json({ error: "Mode démo" }, { status: 400 });

  const { id } = await params;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
