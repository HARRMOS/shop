"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { slugify } from "@/lib/utils";
import { Gender } from "@prisma/client";

interface Category {
  id: string;
  name: string;
}

interface Variant {
  size: string;
  color: string;
  stock: number;
  sku: string;
}

export interface ProductFormData {
  id?: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAt: number | null;
  image: string;
  images: string[];
  sizes: string[];
  colors: string[];
  gender: Gender;
  featured: boolean;
  inStock: boolean;
  categoryId: string;
  variants: Variant[];
}

interface ProductFormProps {
  initial?: Partial<ProductFormData>;
  mode: "create" | "edit";
}

const empty: ProductFormData = {
  name: "",
  slug: "",
  description: "",
  price: 0,
  compareAt: null,
  image: "",
  images: [],
  sizes: ["S", "M", "L"],
  colors: ["Noir"],
  gender: Gender.FEMME,
  featured: false,
  inStock: true,
  categoryId: "",
  variants: [],
};

function buildVariants(sizes: string[], colors: string[], existing: Variant[]): Variant[] {
  const map = new Map(existing.map((v) => [`${v.size}::${v.color}`, v]));
  const result: Variant[] = [];
  for (const size of sizes) {
    for (const color of colors) {
      const key = `${size}::${color}`;
      const prev = map.get(key);
      result.push({
        size,
        color,
        stock: prev?.stock ?? 0,
        sku: prev?.sku ?? "",
      });
    }
  }
  return result;
}

export function ProductForm({ initial, mode }: ProductFormProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<ProductFormData>({ ...empty, ...initial });
  const [sizesText, setSizesText] = useState((initial?.sizes ?? empty.sizes).join(", "));
  const [colorsText, setColorsText] = useState((initial?.colors ?? empty.colors).join(", "));
  const [imagesText, setImagesText] = useState((initial?.images ?? []).join("\n"));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then(setCategories)
      .catch(() => {});
  }, []);

  useEffect(() => {
    const sizes = sizesText.split(/[,;]/).map((s) => s.trim()).filter(Boolean);
    const colors = colorsText.split(/[,;]/).map((s) => s.trim()).filter(Boolean);
    setForm((f) => ({
      ...f,
      sizes,
      colors,
      variants: buildVariants(sizes, colors, f.variants),
    }));
  }, [sizesText, colorsText]);

  const updateVariant = (index: number, field: keyof Variant, value: string | number) => {
    setForm((f) => {
      const variants = [...f.variants];
      variants[index] = { ...variants[index], [field]: value };
      return { ...f, variants };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      slug: form.slug || slugify(form.name),
      images: imagesText.split("\n").map((s) => s.trim()).filter(Boolean),
      variants: form.variants.map((v) => ({
        size: v.size,
        color: v.color,
        stock: Number(v.stock) || 0,
        sku: v.sku || null,
      })),
    };

    const url = mode === "create" ? "/api/admin/products" : `/api/admin/products/${form.id}`;
    const method = mode === "create" ? "POST" : "PATCH";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur");
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setSaving(false);
    }
  };

  const totalStock = form.variants.reduce((s, v) => s + (Number(v.stock) || 0), 0);

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-charcoal">
          {mode === "create" ? "Nouveau produit" : "Modifier le produit"}
        </h1>
        <Link href="/admin/products" className="text-sm text-sage hover:underline">
          ← Retour à la liste
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-warm-white border border-cream-dark p-6 space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-charcoal-light">Informations</h2>
            <div>
              <label className="block text-xs text-charcoal-light mb-1">Nom *</label>
              <input
                required
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    name: e.target.value,
                    slug: f.slug || slugify(e.target.value),
                  }))
                }
                className="w-full px-3 py-2 border border-cream-dark text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-charcoal-light mb-1">Slug URL</label>
              <input
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                className="w-full px-3 py-2 border border-cream-dark text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs text-charcoal-light mb-1">Description *</label>
              <textarea
                required
                rows={5}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="w-full px-3 py-2 border border-cream-dark text-sm resize-none"
              />
            </div>
          </section>

          <section className="bg-warm-white border border-cream-dark p-6 space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-charcoal-light">Médias</h2>
            <div>
              <label className="block text-xs text-charcoal-light mb-1">Image principale (URL) *</label>
              <input
                required
                type="url"
                value={form.image}
                onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                className="w-full px-3 py-2 border border-cream-dark text-sm"
                placeholder="https://..."
              />
            </div>
            {form.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.image} alt="" className="w-32 h-40 object-cover border border-cream-dark" />
            )}
            <div>
              <label className="block text-xs text-charcoal-light mb-1">Images supplémentaires (une URL par ligne)</label>
              <textarea
                rows={3}
                value={imagesText}
                onChange={(e) => setImagesText(e.target.value)}
                className="w-full px-3 py-2 border border-cream-dark text-sm resize-none font-mono text-xs"
              />
            </div>
          </section>

          <section className="bg-warm-white border border-cream-dark p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs uppercase tracking-widest text-charcoal-light">
                Variantes &amp; stock ({totalStock} unités)
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-charcoal-light mb-1">Tailles (séparées par virgule)</label>
                <input
                  value={sizesText}
                  onChange={(e) => setSizesText(e.target.value)}
                  className="w-full px-3 py-2 border border-cream-dark text-sm"
                  placeholder="XS, S, M, L, XL"
                />
              </div>
              <div>
                <label className="block text-xs text-charcoal-light mb-1">Couleurs (séparées par virgule)</label>
                <input
                  value={colorsText}
                  onChange={(e) => setColorsText(e.target.value)}
                  className="w-full px-3 py-2 border border-cream-dark text-sm"
                  placeholder="Noir, Beige, Vert"
                />
              </div>
            </div>

            {form.variants.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-xs mt-4">
                  <thead>
                    <tr className="text-left text-charcoal-light border-b border-cream-dark">
                      <th className="pb-2 pr-3">Taille</th>
                      <th className="pb-2 pr-3">Couleur</th>
                      <th className="pb-2 pr-3">Stock</th>
                      <th className="pb-2">SKU</th>
                    </tr>
                  </thead>
                  <tbody>
                    {form.variants.map((v, i) => (
                      <tr key={`${v.size}-${v.color}`} className="border-b border-cream-dark">
                        <td className="py-2 pr-3">{v.size}</td>
                        <td className="py-2 pr-3">{v.color}</td>
                        <td className="py-2 pr-3">
                          <input
                            type="number"
                            min={0}
                            value={v.stock}
                            onChange={(e) => updateVariant(i, "stock", Number(e.target.value))}
                            className="w-20 px-2 py-1 border border-cream-dark"
                          />
                        </td>
                        <td className="py-2">
                          <input
                            value={v.sku}
                            onChange={(e) => updateVariant(i, "sku", e.target.value)}
                            className="w-full px-2 py-1 border border-cream-dark font-mono"
                            placeholder="SKU-001"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-warm-white border border-cream-dark p-6 space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-charcoal-light">Prix</h2>
            <div>
              <label className="block text-xs text-charcoal-light mb-1">Prix (€) *</label>
              <input
                required
                type="number"
                min={0}
                step={0.01}
                value={form.price || ""}
                onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-cream-dark text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-charcoal-light mb-1">Prix barré (€)</label>
              <input
                type="number"
                min={0}
                step={0.01}
                value={form.compareAt ?? ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    compareAt: e.target.value ? Number(e.target.value) : null,
                  }))
                }
                className="w-full px-3 py-2 border border-cream-dark text-sm"
              />
            </div>
          </section>

          <section className="bg-warm-white border border-cream-dark p-6 space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-charcoal-light">Organisation</h2>
            <div>
              <label className="block text-xs text-charcoal-light mb-1">Catégorie *</label>
              <select
                required
                value={form.categoryId}
                onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
                className="w-full px-3 py-2 border border-cream-dark text-sm bg-warm-white"
              >
                <option value="">Choisir...</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-charcoal-light mb-1">Genre *</label>
              <select
                value={form.gender}
                onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value as Gender }))}
                className="w-full px-3 py-2 border border-cream-dark text-sm bg-warm-white"
              >
                <option value={Gender.FEMME}>Femme</option>
                <option value={Gender.HOMME}>Homme</option>
                <option value={Gender.UNISEXE}>Unisexe</option>
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
              />
              Produit vedette
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={form.inStock}
                onChange={(e) => setForm((f) => ({ ...f, inStock: e.target.checked }))}
              />
              En stock (global)
            </label>
          </section>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-charcoal text-warm-white py-3 text-sm uppercase tracking-widest hover:bg-charcoal-light disabled:opacity-50"
          >
            {saving ? "Enregistrement..." : mode === "create" ? "Créer le produit" : "Enregistrer"}
          </button>
        </div>
      </div>
    </form>
  );
}
