# Primos Maternos — Our Lady of Guadalupe Store

E-commerce site for Saxon Enterprises, Inc (dba Primos Maternos). Sells
Church-authorized canvas replicas of the tilma of Saint Juan Diego.

## Stack

- Next.js 16 + React 19 + Tailwind v4 (`./app`)
- Postgres 16 in Docker
- Stripe Checkout (hosted) for payments
- Docker Compose for both services

## Local dev

```bash
cp .env.example .env
# Fill in POSTGRES_PASSWORD and STRIPE_* keys

docker compose up -d
# App on http://localhost:3001
# Postgres on 127.0.0.1:5434
```

To work on the Next.js app outside Docker:

```bash
cd app
npm install
npm run dev   # http://localhost:3001
```

The dev server reads `DATABASE_URL` if set, otherwise falls back to
`postgresql://primos:primos@localhost:5434/primos_store` (the docker-compose
default). Start `docker compose up -d postgres` first.

## Stripe setup

1. Create a Stripe account (test mode is fine to start).
2. Copy your test keys into `.env`:
   - `STRIPE_SECRET_KEY=sk_test_...`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...`
3. Webhook for order persistence:
   - In Stripe Dashboard → Developers → Webhooks, add an endpoint pointing to
     `https://<your-domain>/api/webhooks/stripe`.
   - Subscribe to `checkout.session.completed`.
   - Copy the signing secret into `STRIPE_WEBHOOK_SECRET`.
4. For local webhook testing, use the Stripe CLI:
   ```bash
   stripe listen --forward-to http://localhost:3001/api/webhooks/stripe
   ```

## Catalog

SKUs live in `db/init.sql` and seed on first Postgres boot. Edit the seed
block to change products, or `UPDATE products` directly for price changes.

| SKU                          | Product                              | Price |
|------------------------------|--------------------------------------|-------|
| olg-24x36-gold               | 24"x36" Gold frame                   | $197  |
| olg-24x36-cherry             | 24"x36" Cherry frame                 | $197  |
| olg-24x36-beaded-mahogany    | 24"x36" Beaded Mahogany frame        | $197  |
| olg-24x36-black-red-oak      | 24"x36" Black Red Oak frame          | $197  |
| olg-24x36-silver-ornate      | 24"x36" Silver Ornate frame          | $197  |
| olg-12x18-gallery-wrap       | 12"x18" Thin Gallery Wrap (0.75")    | $43   |
| olg-24x36-rolled             | 24"x36" Rolled canvas                | $87   |
| olg-36x54-rolled             | 36"x54" Rolled canvas                | $267  |

### Reseeding after a catalog change

`init.sql` only runs on a brand-new Postgres volume. To apply seed changes
to an already-running DB without losing orders:

```bash
docker compose exec -T postgres psql -U primos -d primos_store < db/init.sql
```

The seed uses `ON CONFLICT DO UPDATE` for products and marks any SKU not in
the list as `active = FALSE` (soft-delete, keeps order history intact).

## Deploy

Production target: **primosmaternos.com** on a fresh Ubuntu host.

`deploy.sh` is a one-shot script that, on a fresh Ubuntu 22.04/24.04 box:
- installs Docker + Compose
- installs Caddy and configures it as a reverse proxy with auto-HTTPS for
  `primosmaternos.com` (and `www.`)
- opens UFW for 80/443 only (3001 stays bound to localhost)
- clones this repo, builds, and starts the app stack
- drops `pm-update` at `/usr/local/bin/`

### First deploy

```bash
# On the server (as root)
curl -O https://raw.githubusercontent.com/wfleonard/ourlady2026/main/deploy.sh
bash deploy.sh
# Fill in .env when prompted (Postgres password + Stripe keys)
```

DNS: point `primosmaternos.com` and `www.primosmaternos.com` A records at the
server's IP. Caddy will issue the Let's Encrypt cert automatically within a
couple of minutes.

### Subsequent deploys

```bash
# Locally
git push origin main

# On the server
pm-update     # pulls, rebuilds, restarts
```

## Project layout

```
website2026/
├── app/              Next.js application
│   ├── src/app/      Routes (App Router)
│   ├── src/lib/      db.ts, stripe.ts
│   └── src/components/
├── db/init.sql       Schema + seed
├── docker-compose.yml
├── deploy.sh         One-shot server setup
└── .env.example
```
