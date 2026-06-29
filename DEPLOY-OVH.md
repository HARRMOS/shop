# Déploiement sur TON VPS OVH

Tu as déjà **Traefik** et un **PostgreSQL** Docker.  
Le nom du conteneur Postgres est **configurable** dans `.env` (`POSTGRES_CONTAINER`).

---

## Renommer ton conteneur Postgres existant (Haros → autre nom)

Sur le VPS :

```bash
docker rename Haros noor-postgres
```

Puis dans `.env` :

```env
POSTGRES_CONTAINER=noor-postgres
```

> Le nom du conteneur = hostname sur le réseau Docker.  
> Pas besoin de recréer PostgreSQL, juste le renommer.

---

## Étape 1 — Créer la base de données

```bash
cp .env.ovh.example .env
nano .env
chmod +x scripts/create-db.sh
./scripts/create-db.sh
```

---

## Étape 2 — Réseaux Docker

```bash
docker inspect noor-postgres --format '{{range $k,$v := .NetworkSettings.Networks}}{{$k}} {{end}}'
```

Mets le nom du réseau dans `.env` :

```env
POSTGRES_NETWORK=nom_du_reseau
TRAEFIK_NETWORK=traefik
```

Si besoin, connecte Postgres au réseau :

```bash
docker network connect postgres noor-postgres
```

---

## Étape 3 — Lancer le shop

```bash
docker compose -f docker-compose.ovh.yml up -d --build
docker compose -f docker-compose.ovh.yml --profile seed run --rm seed
```

---

## Variables importantes dans `.env`

| Variable | Exemple | Description |
|----------|---------|-------------|
| `POSTGRES_CONTAINER` | `noor-postgres` | Nom du conteneur Docker Postgres |
| `POSTGRES_NETWORK` | `postgres` | Réseau Docker de Postgres |
| `SHOP_DOMAIN` | `shop.mondomaine.fr` | Domaine du shop |
| `TRAEFIK_CERT_RESOLVER` | `letsencrypt` | Comme tes autres apps |

---

## DNS OVH

| Type | Nom | Cible |
|------|-----|-------|
| A | shop | IP du VPS |

---

## Vérifier

```bash
docker compose -f docker-compose.ovh.yml logs -f app
docker ps | grep noor
```

Puis ouvre `https://shop.ton-domaine.fr`

---

## Sans BDD (démo rapide)

Dans `.env` :

```env
DEMO_MODE=true
```

Et commente `DATABASE_URL` / lance sans seed — les produits sont en dur dans le code.

---

## Commandes utiles

```bash
docker compose -f docker-compose.ovh.yml logs -f app
docker compose -f docker-compose.ovh.yml restart app
docker compose -f docker-compose.ovh.yml up -d --build   # après git pull
```
