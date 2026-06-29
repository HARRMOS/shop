"use client";

import { ProductForm } from "@/components/admin/ProductForm";
import { useAdminAuth } from "@/components/admin/useAdminAuth";

export default function NewProductPage() {
  const ready = useAdminAuth();
  if (!ready) return <p className="text-charcoal-light">Chargement...</p>;
  return <ProductForm mode="create" />;
}
