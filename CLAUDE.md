# Primos Maternos Store — Claude Notes

## What this is
E-commerce site for Saxon Enterprises (dba Primos Maternos) selling
Our Lady of Guadalupe canvas products. Next.js + Postgres + Stripe Checkout.

## Stack mirrors trading-signals
Same Docker Compose pattern as `/Users/saxon/trading-signals`:
- Postgres 16 in a container, port `127.0.0.1:5434` (5433 is taken by trading-signals)
- Next.js app exposed on `3001` (3000 is taken by trading-signals)
- Deploy via `deploy.sh` → `pm-update` on the server (parallel to `trading-update`)

## Catalog
Eight SKUs, seeded in `db/init.sql`, ranging $57–$267. The authoritative list
with prices is the table in `README.md` — it is deliberately not duplicated
here, because the copy that used to live here drifted out of date.

**Changing a price or adding a SKU:** edit the seed block in `db/init.sql`, then
apply it to the running database:

```bash
docker compose exec -T postgres psql -U primos -d primos_store < db/init.sql
```

`docker compose down && up -d` does **not** apply seed changes. `postgres_data`
is a named volume, plain `down` does not remove it, and Postgres runs
`init.sql` only when the data directory is empty. The reseed silently never
happens and the old price stays live on the store.

The seed uses `ON CONFLICT DO UPDATE` for products and marks any SKU absent from
the list `active = FALSE`, so order history survives a catalog change.

## Stripe flow
1. Click "Buy now" on a product page → `POST /api/checkout`
2. Server creates a Checkout Session with `price_data` (no Stripe Product
   needed; we are the source of truth)
3. Redirect to Stripe-hosted checkout
4. On success: redirect to `/checkout/success`
5. Stripe fires `checkout.session.completed` → `/api/webhooks/stripe` →
   inserts into `orders` + `order_items`, logs raw event to `stripe_events`

## Known gotchas
- The webhook route is `runtime = "nodejs"` because it needs `req.text()` for
  signature verification — do NOT switch to edge.
- Images in `app/public/products/` came from `/Users/saxon/PrimosMaternos/Primos-Maternos-Images`;
  picked the smallest variants. Replace with higher-quality product shots when ready.
- No tax collection on launch (per Bill). Free US shipping baked into price.
