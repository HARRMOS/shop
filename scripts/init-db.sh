#!/bin/sh
set -e

echo "⏳ Attente de PostgreSQL..."
sleep 5

echo "📦 Migration de la base de données..."
npx prisma db push

echo "🌱 Seed des produits..."
npx tsx prisma/seed.ts

echo "✅ Initialisation terminée !"
