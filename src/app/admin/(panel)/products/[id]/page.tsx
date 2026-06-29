"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProductForm, ProductFormData } from "@/components/admin/ProductForm";
import { useAdminAuth } from "@/components/admin/useAdminAuth";
import { Gender } from "@prisma/client";

export default function EditProductPage() {
  const ready = useAdminAuth();
  const params = useParams();
  const id = params.id as string;
  const [initial, setInitial] = useState<ProductFormData | null>(null);

  useEffect(() => {
    if (!ready || !id) return;
    fetch(`/api/admin/products/${id}`)
      .then((r) => r.json())
      .then((p) =>
        setInitial({
          id: p.id,
          name: p.name,
          slug: p.slug,
          description: p.description,
          price: p.price,
          compareAt: p.compareAt,
          image: p.image,
          images: p.images ?? [],
          sizes: p.sizes,
          colors: p.colors,
          gender: p.gender as Gender,
          featured: p.featured,
          inStock: p.inStock,
          categoryId: p.categoryId,
          variants: (p.variants ?? []).map((v: { size: string; color: string; stock: number; sku: string | null }) => ({
            size: v.size,
            color: v.color,
            stock: v.stock,
            sku: v.sku ?? "",
          })),
        })
      );
  }, [ready, id]);

  if (!ready || !initial) return <p className="text-charcoal-light">Chargement...</p>;
  return <ProductForm mode="edit" initial={initial} />;
}
