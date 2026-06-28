# Noor Collection

Boutique e-commerce de vêtements musulmans (homme & femme) — Next.js, PostgreSQL, Docker.

## Stack

- **Frontend** : Next.js 15, React, Tailwind CSS
- **Base de données** : PostgreSQL + Prisma ORM
- **Panier** : Zustand (localStorage)
- **Déploiement** : Docker (compatible VPS OVH)

## Démarrage rapide (local, sans Docker)

### Prérequis

- Node.js 20+
- PostgreSQL 16 (via Homebrew sur Mac)

### 1. Installer PostgreSQL (Mac)

```bash
brew install postgresql@16
brew services start postgresql@16

# Ajouter psql au PATH (à mettre aussi dans ~/.zshrc)
export PATH="/opt/homebrew/opt/postgresql@16/bin:$PATH"

# Créer la base de dev
createuser -s noor
psql postgres -c "ALTER USER noor WITH PASSWORD 'noor_secret';"
psql postgres -c "CREATE DATABASE noor_collection OWNER noor;"
```

### 2. Configurer l'environnement

```bash
cp .env.example .env
```

Le `.env` local :

```env
DATABASE_URL="postgresql://noor:noor_secret@localhost:5432/noor_collection?schema=public"
```

### 3. Installer et lancer

```bash
npm install
npm run db:push
npm run db:seed
npm run dev
```

Site accessible sur [http://localhost:3000](http://localhost:3000)

### Alternative : PostgreSQL via Docker

Si tu préfères Docker en local :

```bash
docker compose up postgres -d
```

## Déploiement Docker (VPS OVH)

### Tout en un (app + BDD)

```bash
# Build et lancement
docker compose up -d --build

# Initialiser la BDD (première fois)
docker compose --profile seed run --rm seed
```

### BDD sur un VPS séparé

Si PostgreSQL tourne déjà sur votre VPS OVH :

1. Ouvrez le port 5432 (ou utilisez un tunnel SSH)
2. Configurez `DATABASE_URL` dans `.env` :

```env
DATABASE_URL="postgresql://USER:PASSWORD@IP_VPS:5432/noor_collection?schema=public"
```

3. Déployez uniquement l'app :

```bash
docker build -t noor-collection .
docker run -d \
  --name noor-app \
  -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e NEXT_PUBLIC_SITE_URL="https://votre-domaine.fr" \
  noor-collection
```

### Reverse proxy (Nginx / Traefik)

Pointez votre domaine OVH vers le port 3000 du conteneur. Exemple Nginx :

```nginx
server {
    listen 80;
    server_name votre-domaine.fr;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Ajoutez Let's Encrypt avec Certbot pour le HTTPS.

## Structure du projet

```
src/
├── app/                  # Pages Next.js (App Router)
│   ├── page.tsx          # Accueil
│   ├── boutique/         # Catalogue
│   ├── collections/      # Femme / Homme
│   ├── produit/[slug]/   # Fiche produit
│   ├── panier/           # Panier
│   ├── checkout/         # Commande
│   └── api/orders/       # API commandes
├── components/           # Composants UI
└── lib/                  # Prisma, panier, utils
prisma/
├── schema.prisma         # Modèle BDD
└── seed.ts               # Données de démo (12 produits)
```

## Personnalisation client

| Élément | Fichier |
|---------|---------|
| Nom de la boutique | `src/components/Header.tsx`, `.env` |
| Couleurs / thème | `src/app/globals.css` |
| Produits | `prisma/seed.ts` ou Prisma Studio |
| Pages infos | `src/app/a-propos/`, `contact/`, etc. |
| Email / téléphone | `src/components/Footer.tsx`, `contact/` |

## Prochaines étapes suggérées

- [ ] Intégration Stripe / PayPal pour paiement en ligne
- [ ] Panel admin pour gérer produits et commandes
- [ ] Envoi d'emails de confirmation (Resend, SendGrid)
- [ ] Upload d'images produits (Cloudinary, S3)
- [ ] Analytics (Plausible, Google Analytics)

## Commandes utiles

```bash
npm run dev          # Dev local
npm run build        # Build production
npm run db:studio    # Interface admin BDD
npm run db:seed      # Re-seed produits
docker compose logs -f app   # Logs conteneur
```
