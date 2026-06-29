import { PrismaClient, Gender } from "@prisma/client";

const prisma = new PrismaClient();

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1200&q=85&auto=format&fit=crop`;

const categories = [
  { name: "Abayas", slug: "abayas", gender: Gender.FEMME, description: "Abayas élégantes pour toutes les occasions" },
  { name: "Hijabs", slug: "hijabs", gender: Gender.FEMME, description: "Hijabs en mousseline, jersey et crêpe" },
  { name: "Jilbabs", slug: "jilbabs", gender: Gender.FEMME, description: "Jilbabs confortables et raffinés" },
  { name: "Ensembles Femme", slug: "ensembles-femme", gender: Gender.FEMME, description: "Ensembles coordonnés prêts à porter" },
  { name: "Qamis", slug: "qamis", gender: Gender.HOMME, description: "Qamis traditionnels et modernes" },
  { name: "Thobes", slug: "thobes", gender: Gender.HOMME, description: "Thobes de qualité premium" },
  { name: "Sarouels", slug: "sarouels", gender: Gender.HOMME, description: "Sarouels confortables et élégants" },
  { name: "Ensembles Homme", slug: "ensembles-homme", gender: Gender.HOMME, description: "Tenues complètes pour homme" },
];

const products = [
  {
    name: "Abaya Nour — Noir satiné",
    slug: "abaya-nour-noir",
    description: "Abaya fluide en satin de haute qualité, coupe A élégante avec manches kimono. Doublure légère, fermeture discrète. Idéale pour les occasions spéciales et le quotidien.",
    price: 89.9,
    compareAt: 109.9,
    image: u("1772474542630-5f5822ca8421"),
    images: [],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Noir", "Bordeaux", "Vert sauge"],
    gender: Gender.FEMME,
    featured: true,
    categorySlug: "abayas",
  },
  {
    name: "Abaya Medina — Crème brodée",
    slug: "abaya-medina-creme",
    description: "Abaya en crêpe premium avec broderies dorées discrètes sur les manches. Coupe droite flatteuse, matière respirante.",
    price: 119.9,
    image: u("1561442748-c50715dc32f6"),
    images: [],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Crème", "Beige", "Gris perle"],
    gender: Gender.FEMME,
    featured: true,
    categorySlug: "abayas",
  },
  {
    name: "Hijab Mousseline Premium",
    slug: "hijab-mousseline-premium",
    description: "Hijab en mousseline de soie, fin et opaque. Ne glisse pas, facile à draper. Disponible en palette de couleurs tendance.",
    price: 24.9,
    image: u("1594048225077-fe0c6e35d822"),
    images: [],
    sizes: ["180x70cm", "200x70cm"],
    colors: ["Noir", "Nude", "Vert olive", "Bordeaux", "Bleu nuit"],
    gender: Gender.FEMME,
    featured: true,
    categorySlug: "hijabs",
  },
  {
    name: "Hijab Jersey Stretch",
    slug: "hijab-jersey-stretch",
    description: "Hijab en jersey stretch, confort optimal toute la journée. Matière anti-glisse, entretien facile.",
    price: 19.9,
    image: u("1536814294574-df49a3cc97bd"),
    images: [],
    sizes: ["180x70cm"],
    colors: ["Noir", "Gris", "Camel", "Rose poudré"],
    gender: Gender.FEMME,
    featured: false,
    categorySlug: "hijabs",
  },
  {
    name: "Jilbab Amira — Gris anthracite",
    slug: "jilbab-amira-gris",
    description: "Jilbab deux pièces avec capuche intégrée. Tissu crêpe anti-froissage, coupe ample et modeste.",
    price: 74.9,
    image: u("1768830985958-e8d3a93d3f14"),
    images: [],
    sizes: ["S/M", "L/XL"],
    colors: ["Gris anthracite", "Noir", "Bleu marine"],
    gender: Gender.FEMME,
    featured: false,
    categorySlug: "jilbabs",
  },
  {
    name: "Ensemble Layla — Rose poudré",
    slug: "ensemble-layla-rose",
    description: "Ensemble abaya + hijab assorti en crêpe premium. Look coordonné sans effort, parfait pour l'Aïd.",
    price: 139.9,
    compareAt: 159.9,
    image: u("1626497361649-81cc097e9bfd"),
    images: [],
    sizes: ["S", "M", "L"],
    colors: ["Rose poudré", "Vert sauge", "Lavande"],
    gender: Gender.FEMME,
    featured: true,
    categorySlug: "ensembles-femme",
  },
  {
    name: "Qamis Al-Noor — Blanc cassé",
    slug: "qamis-al-noor-blanc",
    description: "Qamis en coton égyptien premium, coupe classique avec col saoudien. Broderie discrète sur la poitrine.",
    price: 69.9,
    image: u("1578507435314-e39e7852eddd"),
    images: [],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Blanc cassé", "Beige", "Bleu ciel", "Noir"],
    gender: Gender.HOMME,
    featured: true,
    categorySlug: "qamis",
  },
  {
    name: "Qamis Premium — Bleu nuit",
    slug: "qamis-premium-bleu",
    description: "Qamis en polyester haute qualité, finition soignée. Idéal pour la prière et les occasions.",
    price: 79.9,
    compareAt: 94.9,
    image: u("1619974255488-59e69c33fdb7"),
    images: [],
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Bleu nuit", "Vert forêt", "Marron"],
    gender: Gender.HOMME,
    featured: true,
    categorySlug: "qamis",
  },
  {
    name: "Thobe Emirati — Crème",
    slug: "thobe-emirati-creme",
    description: "Thobe style émirati en tissu léger et respirant. Coupe ample, col mandarin élégant.",
    price: 99.9,
    image: u("1627062422492-d076f4b6793a"),
    images: [],
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Crème", "Blanc", "Gris clair"],
    gender: Gender.HOMME,
    featured: false,
    categorySlug: "thobes",
  },
  {
    name: "Sarouel Aladin — Noir",
    slug: "sarouel-aladin-noir",
    description: "Sarouel ample en coton mélangé, taille élastiquée avec cordon. Confort absolu pour la maison et la mosquée.",
    price: 39.9,
    image: u("1606756747454-0657ac5c93e2"),
    images: [],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Noir", "Gris", "Beige"],
    gender: Gender.HOMME,
    featured: false,
    categorySlug: "sarouels",
  },
  {
    name: "Ensemble Jumuah — Vert forêt",
    slug: "ensemble-jumuah-vert",
    description: "Ensemble qamis + sarouel assorti pour le vendredi. Tissu premium, finitions haut de gamme.",
    price: 149.9,
    compareAt: 179.9,
    image: u("1666162174698-21b2f82f7ee9"),
    images: [],
    sizes: ["M", "L", "XL"],
    colors: ["Vert forêt", "Noir", "Bleu marine"],
    gender: Gender.HOMME,
    featured: true,
    categorySlug: "ensembles-homme",
  },
  {
    name: "Abaya Daily — Vert sauge",
    slug: "abaya-daily-vert-sauge",
    description: "Abaya quotidienne en jersey stretch, confortable et facile d'entretien. Coupe droite minimaliste.",
    price: 59.9,
    image: u("1712215150388-0c61e8b60a1a"),
    images: [],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Vert sauge", "Noir", "Gris"],
    gender: Gender.FEMME,
    featured: false,
    categorySlug: "abayas",
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  for (const product of products) {
    const { categorySlug, ...data } = product;
    const category = await prisma.category.findUnique({ where: { slug: categorySlug } });
    if (!category) continue;

    const saved = await prisma.product.upsert({
      where: { slug: data.slug },
      update: {
        name: data.name,
        description: data.description,
        price: data.price,
        compareAt: data.compareAt ?? null,
        image: data.image,
        sizes: data.sizes,
        colors: data.colors,
        featured: data.featured,
        gender: data.gender,
        inStock: true,
      },
      create: { ...data, categoryId: category.id },
    });

    for (const size of saved.sizes) {
      for (const color of saved.colors) {
        await prisma.productVariant.upsert({
          where: {
            productId_size_color: {
              productId: saved.id,
              size,
              color,
            },
          },
          update: {},
          create: {
            productId: saved.id,
            size,
            color,
            stock: 10,
          },
        });
      }
    }
  }

  console.log("✅ Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
