#!/bin/bash
# ──────────────────────────────────────────────────────────────
# Pull, rebuild, restart, re-seed the catalog.
#
# This lives in the repo on purpose. /usr/local/bin/pm-update is a thin
# wrapper that execs this file, so changes to the deploy steps arrive with
# a git pull like everything else. Before that split, the helper on the
# server was written once at provisioning time and silently went stale:
# the catalog re-seed added in 92bc993 never ran on production, so product
# descriptions stayed frozen at whatever the database was first seeded with.
# ──────────────────────────────────────────────────────────────
set -euo pipefail
cd /opt/primos-store

echo "▶ Pulling latest from git..."
git pull origin main

echo "▶ Building app image..."
docker compose build

echo "▶ Restarting containers..."
docker compose up -d

echo "▶ Waiting for postgres..."
for i in {1..30}; do
  if docker compose exec -T postgres pg_isready -U primos -d primos_store >/dev/null 2>&1; then
    break
  fi
  if [ "$i" -eq 30 ]; then
    echo "✗ postgres did not become ready; catalog NOT seeded" >&2
    exit 1
  fi
  sleep 1
done

echo "▶ Re-applying catalog seed (upserts products, soft-deletes removed)..."
# ON_ERROR_STOP so a broken seed fails loudly instead of leaving the catalog
# half-applied, and the row count is echoed so a no-op is visible.
docker compose exec -T postgres psql -v ON_ERROR_STOP=1 -U primos -d primos_store < db/init.sql
docker compose exec -T postgres psql -U primos -d primos_store -tAc \
  "SELECT count(*) || ' active products' FROM products WHERE active;"

echo "✓ Updated, restarted, catalog synced"
