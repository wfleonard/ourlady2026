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
Products seeded in `db/init.sql`. Four launch SKUs:
- olg-24x36-gold ($197) — primary framed product
- olg-24x36-rolled ($87)
- olg-36x54-rolled ($267)
- olg-12x18-frameless ($43)

To change prices or add SKUs, edit the seed block. ON CONFLICT updates on
reseed, so a `docker compose down && up -d` re-applies changes.

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
