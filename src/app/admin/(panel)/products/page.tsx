"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAdminAuth } from "@/components/admin/useAdminAuth";
import { formatPrice } from "@/lib/utils";
import { Pencil, Trash2, Search } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  inStock: boolean;
  featured: boolean;
  image: string;
  category: { name: string };
  variants: Array<{ stock: number }>;
}

export default function AdminProductsPage() {
  const ready = useAdminAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  const load = (search = "") => {
    setLoading(true);
    const url = search ? `/api/admin/products?q=${encodeURIComponent(search)}` : "/api/admin/products";
    fetch(url)
      .then((r) => r.json())
      .then(setProducts)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (ready) load();
  }, [ready]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    load(q);
  };

  const deleteProduct = async (id: string, name: string) => {
    if (!confirm(`Supprimer « ${name} » ?`)) return;
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (res.ok) setProducts((p) => p.filter((x) => x.id !== id));
  };

  if (!ready) return <p className="text-charcoal-light">Chargement...</p>;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl text-charcoal">Produits</h1>
          <p className="text-sm text-charcoal-light">{products.length} produit(s)</p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-charcoal text-warm-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-charcoal-light"
        >
          + Nouveau produit
        </Link>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6 max-w-md">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-light" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher..."
            className="w-full pl-9 pr-3 py-2 border border-cream-dark text-sm"
          />
        </div>
        <button type="submit" className="px-4 py-2 border border-charcoal text-sm hover:bg-cream">
          OK
        </button>
      </form>

      {loading ? (
        <p className="text-charcoal-light">Chargement...</p>
      ) : products.length === 0 ? (
        <p className="text-charcoal-light text-center py-16">Aucun produit</p>
      ) : (
        <div className="overflow-x-auto bg-warm-white border border-cream-dark">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-widest text-charcoal-light border-b border-cream-dark bg-cream/50">
                <th className="p-4">Produit</th>
                <th className="p-4">Catégorie</th>
                <th className="p-4">Prix</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Statut</th>
                <th className="p-4 w-24"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const stock = p.variants.reduce((s, v) => s + v.stock, 0);
                return (
                  <tr key={p.id} className="border-b border-cream-dark hover:bg-cream/30">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-14 shrink-0 bg-cream-dark overflow-hidden">
                          <Image src={p.image} alt="" fill className="object-cover" sizes="48px" />
                        </div>
                        <div>
                          <p className="font-medium text-charcoal">{p.name}</p>
                          <p className="text-xs text-charcoal-light font-mono">{p.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-charcoal-light">{p.category.name}</td>
                    <td className="p-4 font-medium">{formatPrice(p.price)}</td>
                    <td className="p-4">
                      <span className={stock <= 3 ? "text-amber-700 font-medium" : ""}>{stock}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {p.inStock ? (
                          <span className="text-[10px] uppercase bg-sage/10 text-sage px-2 py-0.5">En stock</span>
                        ) : (
                          <span className="text-[10px] uppercase bg-red-50 text-red-600 px-2 py-0.5">Rupture</span>
                        )}
                        {p.featured && (
                          <span className="text-[10px] uppercase bg-gold/10 text-gold px-2 py-0.5">Vedette</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link href={`/admin/products/${p.id}`} className="p-1.5 hover:bg-cream rounded" title="Modifier">
                          <Pencil size={16} />
                        </Link>
                        <button onClick={() => deleteProduct(p.id, p.name)} className="p-1.5 hover:bg-red-50 text-red-600 rounded" title="Supprimer">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
