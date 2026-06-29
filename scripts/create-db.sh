#!/bin/sh
# Crée la base dans un conteneur PostgreSQL Docker existant
# Configure POSTGRES_CONTAINER dans .env (nom du conteneur, ex: noor-postgres)
set -e

# Charge .env si présent
if [ -f .env ]; then
  set -a
  . ./.env
  set +a
fi

POSTGRES_USER="${POSTGRES_USER:-noor}"
POSTGRES_PASSWORD="${POSTGRES_PASSWORD:-noor_secret}"
POSTGRES_DB="${POSTGRES_DB:-noor_collection}"
POSTGRES_CONTAINER="${POSTGRES_CONTAINER:-noor-postgres}"
POSTGRES_ADMIN_USER="${POSTGRES_ADMIN_USER:-postgres}"

echo "→ Création utilisateur et base dans le conteneur '$POSTGRES_CONTAINER'..."

docker exec -i "$POSTGRES_CONTAINER" psql -U "$POSTGRES_ADMIN_USER" <<EOF
DO \$\$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '$POSTGRES_USER') THEN
    CREATE USER $POSTGRES_USER WITH PASSWORD '$POSTGRES_PASSWORD';
  ELSE
    ALTER USER $POSTGRES_USER WITH PASSWORD '$POSTGRES_PASSWORD';
  END IF;
END
\$\$;

SELECT 'CREATE DATABASE $POSTGRES_DB OWNER $POSTGRES_USER'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$POSTGRES_DB')\gexec

GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO $POSTGRES_USER;
EOF

echo "✅ Base '$POSTGRES_DB' prête."
echo ""
echo "DATABASE_URL=postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@${POSTGRES_CONTAINER}:5432/$POSTGRES_DB?schema=public"
