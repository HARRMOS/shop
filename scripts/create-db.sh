#!/bin/sh
# Crée la base dans un conteneur PostgreSQL Docker existant
set -e

# Charge uniquement les variables Postgres du .env (évite les erreurs avec les espaces)
if [ -f .env ]; then
  for key in POSTGRES_USER POSTGRES_PASSWORD POSTGRES_DB POSTGRES_CONTAINER POSTGRES_ADMIN_USER POSTGRES_ADMIN_DB; do
    line=$(grep -E "^${key}=" .env | head -1 || true)
    if [ -n "$line" ]; then
      value=$(printf '%s' "$line" | cut -d= -f2- | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
      export "$key=$value"
    fi
  done
fi

POSTGRES_USER="${POSTGRES_USER:-noor}"
POSTGRES_PASSWORD="${POSTGRES_PASSWORD:-noor_secret}"
POSTGRES_DB="${POSTGRES_DB:-noor_shop}"
POSTGRES_CONTAINER="${POSTGRES_CONTAINER:-noor-postgres}"
POSTGRES_ADMIN_USER="${POSTGRES_ADMIN_USER:-admin}"
POSTGRES_ADMIN_DB="${POSTGRES_ADMIN_DB:-haros}"

echo "→ Création utilisateur et base dans le conteneur '$POSTGRES_CONTAINER'..."

docker exec -i "$POSTGRES_CONTAINER" psql -U "$POSTGRES_ADMIN_USER" -d "$POSTGRES_ADMIN_DB" <<EOF
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
