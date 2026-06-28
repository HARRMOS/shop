import { Gender } from "@prisma/client";

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1200&q=85&auto=format&fit=crop`;

const rawCategories = [
  { name: "Abayas", slug: "abayas", gender: Gender.FEMME, description: "Abayas élégantes pour toutes les occasions" },
  { name: "Hijabs", slug: "hijabs", gender: Gender.FEMME, description: "Hijabs en mousseline, jersey et crêpe" },
  { name: "Jilbabs", slug: "jilbabs", gender: Gender.FEMME, description: "Jilbabs confortables et raffinés" },
  { name: "Ensembles Femme", slug: "ensembles-femme", gender: Gender.FEMME, description: "Ensembles coordonnés prêts à porter" },
  { name: "Qamis", slug: "qamis", gender: Gender.HOMME, description: "Qamis traditionnels et modernes" },
  { name: "Thobes", slug: "thobes", gender: Gender.HOMME, description: "Thobes de qualité premium" },
  { name: "Sarouels", slug: "sarouels", gender: Gender.HOMME, description: "Sarouels confortables et élégants" },
  { name: "Ensembles Homme", slug: "ensembles-homme", gender: Gender.HOMME, description: "Tenues complètes pour homme" },
];

const rawProducts = [
  { name: "Abaya Nour — Noir satiné", slug: "abaya-nour-noir", description: "Abaya fluide en satin de haute qualité, coupe A élégante avec manches kimono.", price: 89.9, compareAt: 109.9, image: u("1772474542630-5f5822ca8421"), sizes: ["XS", "S", "M", "L", "XL"], colors: ["Noir", "Bordeaux", "Vert sauge"], gender: Gender.FEMME, featured: true, categorySlug: "abayas" },
  { name: "Abaya Medina — Crème brodée", slug: "abaya-medina-creme", description: "Abaya en crêpe premium avec broderies dorées discrètes sur les manches.", price: 119.9, image: u("1561442748-c50715dc32f6"), sizes: ["S", "M", "L", "XL"], colors: ["Crème", "Beige", "Gris perle"], gender: Gender.FEMME, featured: true, categorySlug: "abayas" },
  { name: "Hijab Mousseline Premium", slug: "hijab-mousseline-premium", description: "Hijab en mousseline de soie, fin et opaque. Ne glisse pas, facile à draper.", price: 24.9, image: u("1594048225077-fe0c6e35d822"), sizes: ["180x70cm", "200x70cm"], colors: ["Noir", "Nude", "Vert olive"], gender: Gender.FEMME, featured: true, categorySlug: "hijabs" },
  { name: "Hijab Jersey Stretch", slug: "hijab-jersey-stretch", description: "Hijab en jersey stretch, confort optimal toute la journée.", price: 19.9, image: u("1536814294574-df49a3cc97bd"), sizes: ["180x70cm"], colors: ["Noir", "Gris", "Camel"], gender: Gender.FEMME, featured: false, categorySlug: "hijabs" },
  { name: "Jilbab Amira — Gris anthracite", slug: "jilbab-amira-gris", description: "Jilbab deux pièces avec capuche intégrée. Tissu crêpe anti-froissage.", price: 74.9, image: u("1768830985958-e8d3a93d3f14"), sizes: ["S/M", "L/XL"], colors: ["Gris anthracite", "Noir"], gender: Gender.FEMME, featured: false, categorySlug: "jilbabs" },
  { name: "Ensemble Layla — Rose poudré", slug: "ensemble-layla-rose", description: "Ensemble abaya + hijab assorti en crêpe premium.", price: 139.9, compareAt: 159.9, image: u("1626497361649-81cc097e9bfd"), sizes: ["S", "M", "L"], colors: ["Rose poudré", "Vert sauge"], gender: Gender.FEMME, featured: true, categorySlug: "ensembles-femme" },
  { name: "Qamis Al-Noor — Blanc cassé", slug: "qamis-al-noor-blanc", description: "Qamis en coton égyptien premium, coupe classique avec col saoudien.", price: 69.9, image: u("1578507435314-e39e7852eddd"), sizes: ["S", "M", "L", "XL", "XXL"], colors: ["Blanc cassé", "Beige", "Noir"], gender: Gender.HOMME, featured: true, categorySlug: "qamis" },
  { name: "Qamis Premium — Bleu nuit", slug: "qamis-premium-bleu", description: "Qamis en polyester haute qualité, finition soignée.", price: 79.9, compareAt: 94.9, image: u("1619974255488-59e69c33fdb7"), sizes: ["M", "L", "XL", "XXL"], colors: ["Bleu nuit", "Vert forêt"], gender: Gender.HOMME, featured: true, categorySlug: "qamis" },
  { name: "Thobe Emirati — Crème", slug: "thobe-emirati-creme", description: "Thobe style émirati en tissu léger et respirant.", price: 99.9, image: u("1627062422492-d076f4b6793a"), sizes: ["M", "L", "XL", "XXL"], colors: ["Crème", "Blanc"], gender: Gender.HOMME, featured: false, categorySlug: "thobes" },
  { name: "Sarouel Aladin — Noir", slug: "sarouel-aladin-noir", description: "Sarouel ample en coton mélangé, taille élastiquée avec cordon.", price: 39.9, image: u("1606756747454-0657ac5c93e2"), sizes: ["S", "M", "L", "XL"], colors: ["Noir", "Gris"], gender: Gender.HOMME, featured: false, categorySlug: "sarouels" },
  { name: "Ensemble Jumuah — Vert forêt", slug: "ensemble-jumuah-vert", description: "Ensemble qamis + sarouel assorti pour le vendredi.", price: 149.9, compareAt: 179.9, image: u("1666162174698-21b2f82f7ee9"), sizes: ["M", "L", "XL"], colors: ["Vert forêt", "Noir"], gender: Gender.HOMME, featured: true, categorySlug: "ensembles-homme" },
  { name: "Abaya Daily — Vert sauge", slug: "abaya-daily-vert-sauge", description: "Abaya quotidienne en jersey stretch, confortable et facile d'entretien.", price: 59.9, image: u("1712215150388-0c61e8b60a1a"), sizes: ["S", "M", "L", "XL"], colors: ["Vert sauge", "Noir"], gender: Gender.FEMME, featured: false, categorySlug: "abayas" },
];

const now = new Date("2026-01-01");

export const demoCategories = rawCategories.map((cat, i) => ({
  id: `demo-cat-${i}`,
  ...cat,
  createdAt: now,
}));

const categoryBySlug = Object.fromEntries(demoCategories.map((c) => [c.slug, c]));

export const demoProducts = rawProducts.map((p, i) => {
  const { categorySlug, compareAt, ...rest } = p;
  const category = categoryBySlug[categorySlug];
  return {
    id: `demo-prod-${i}`,
    ...rest,
    compareAt: compareAt ?? null,
    images: [] as string[],
    inStock: true,
    categoryId: category.id,
    category,
    createdAt: now,
    updatedAt: now,
  };
});

export type DemoProduct = (typeof demoProducts)[number];
export type DemoCategory = (typeof demoCategories)[number] & {
  _count: { products: number };
};

export function getDemoCategories(gender?: Gender): DemoCategory[] {
  return demoCategories
    .filter((c) => !gender || c.gender === gender)
    .map((c) => ({
      ...c,
      _count: {
        products: demoProducts.filter((p) => p.categoryId === c.id).length,
      },
    }));
}

export function getDemoProducts(filters?: {
  gender?: Gender;
  categorySlug?: string;
  search?: string;
}) {
  return demoProducts.filter((p) => {
    if (filters?.gender && p.gender !== filters.gender) return false;
    if (filters?.categorySlug && p.category.slug !== filters.categorySlug) return false;
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q)) return false;
    }
    return p.inStock;
  });
}

export function getDemoProductBySlug(slug: string) {
  return demoProducts.find((p) => p.slug === slug) ?? null;
}

export function getDemoRelatedProducts(productId: string, categoryId: string, limit = 4) {
  return demoProducts
    .filter((p) => p.categoryId === categoryId && p.id !== productId && p.inStock)
    .slice(0, limit);
}

export function getDemoFeaturedProducts(limit = 8) {
  return demoProducts.filter((p) => p.featured && p.inStock).slice(0, limit);
}
