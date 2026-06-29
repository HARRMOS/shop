#!/bin/sh
# Met à jour le schéma BDD (utilise Prisma 6 du projet, PAS npx prisma global)
set -e
docker compose -f docker-compose.ovh.yml --profile migrate run --rm migrate
