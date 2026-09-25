# Primos Maternos — Our Lady of Guadalupe Store

E-commerce site for Saxon Enterprises, Inc (dba Primos Maternos). Sells
Our Lady of Guadalupe canvases printed from a digital archive of the
Sacred Original, certified in Mexico in 1998 as a faithful reproduction.
Canvases are printed in the United States and ship free to the 50 U.S.
states and Puerto Rico.

## Stack

- Next.js 16 + React 19 + Tailwind v4 (`./app`)
- Postgres 16 in Docker
- Stripe Checkout (hosted) for payments
- Caddy reverse proxy with auto-HTTPS on the server

## Local dev

```bash
cp .env.example .env
# Fill in POSTGRES_PASSWORD and STRIPE_* keys, plus NEXT_PUBLIC_SITE_URL and
# NEXT_PUBLIC_GA_ID if you want analytics locally

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
2. Copy your keys into `.env`:
   - `STRIPE_SECRET_KEY=sk_test_...` (a restricted key with only Checkout Sessions:write, Customers:read, Payment Intents:read is best)
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...`
3. Webhook for order persistence:
   - Stripe Dashboard → Developers → Webhooks → add endpoint at
     `https://primosmaternos.com/api/webhooks/stripe`
   - Subscribe to `checkout.session.completed`
   - Copy the signing secret into `STRIPE_WEBHOOK_SECRET`
4. For local webhook testing, use the Stripe CLI:
   ```bash
   stripe listen --forward-to http://localhost:3001/api/webhooks/stripe
   ```

## Catalog

Product data lives in `db/init.sql` and seeds on first Postgres boot. Prices,
descriptions, and image paths are the DB's job; the app reads them live on
every request.

| SKU                          | Product                              | Price |
|------------------------------|--------------------------------------|-------|
| olg-24x36-gold               | 24"x36" Gold frame                   | $214  |
| olg-24x36-cherry             | 24"x36" Cherry frame                 | $214  |
| olg-24x36-beaded-mahogany    | 24"x36" Beaded Mahogany frame        | $214  |
| olg-24x36-black-red-oak      | 24"x36" Black Red Oak frame          | $214  |
| olg-24x36-silver-ornate      | 24"x36" Silver Ornate frame          | $214  |
| olg-12x18-gallery-wrap       | 12"x18" Thin Gallery Wrap (0.75")    | $57   |
| olg-24x36-rolled             | 24"x36" Rolled canvas                | $114  |
| olg-36x54-rolled             | 36"x54" Rolled canvas                | $324  |

### Reseeding after a catalog change

`init.sql` only runs on a brand-new Postgres volume. Editing product copy
or prices requires a re-seed against the running database.

**On the server:** `pm-update` does this automatically. It calls
`scripts/pm-update.sh` after the pull, which runs `psql < db/init.sql`
against the container, with `ON_ERROR_STOP=1` so a broken seed fails loudly.

**Locally:**
```bash
docker compose exec -T postgres psql -U primos -d primos_store < db/init.sql
```

The seed uses `ON CONFLICT DO UPDATE` for products and marks any SKU not in
the list as `active = FALSE` (soft-delete — order history stays intact).

## Authenticity claims

Every product-copy claim about the image traces back to a specific
document. The authoritative substrate is [`docs/primos-maternos-image-fidelity.md`](docs/primos-maternos-image-fidelity.md).

Two claims appear across the site:

1. **Fidelity** — the image is printed from a digital archive of the
   Sacred Original of the Tilma of Our Lady of Guadalupe. That digital
   archive was certified in Mexico on **December 12, 1998** by
   **Cardinal Norberto Rivera Carrera, Archbishop Primate of Mexico**,
   as a **faithful reproduction** (*"reproducción fiel"*) of the Sacred
   Original.
2. **Papal blessing** — the image, known as the **Virgen Peregrina**,
   was blessed by **Pope John Paul II on January 25, 1999**.

The `/authenticity` page displays the two Mexican certificates at
legible resolution and states the fidelity chain in the language of
the documents. Every other page that mentions authenticity links to it.

Provenance sentence used across the store: *the digital image was
created in Mexico from a scan of the original tilma at the Basilica in
Mexico City; the canvas is printed in the USA; two certificates from
Mexico verifying the image accompany every order.*

## SEO and AI-answer readiness

- `app/src/lib/site.ts` is the one source of truth for org identity,
  return policy, handling window, and AI-crawler allow-list. Every
  JSON-LD block and every mailto pulls from there.
- `app/src/app/robots.ts` names the AI crawlers explicitly (OAI, GPT,
  Perplexity, Claude, Google-Extended) so a broad later `Disallow`
  can't shut them out by accident.
- `app/src/app/sitemap.ts` lists every indexable route.
- `app/src/components/JsonLd.tsx` is the reusable structured-data helper.
  Layout carries Organization + WebSite; product pages carry Product +
  Offer with the shared `RETURN_POLICY`; blog posts carry Article.
- Checkout success and cancel pages are `robots: { index: false }` —
  they are transaction states, not landing pages.

## Deploy

Production target: **primosmaternos.com** on an Ubuntu host with Caddy in
front, Docker Compose behind.

`deploy.sh` is a one-shot provisioning script that:
- installs Docker + Compose + Caddy + UFW
- configures Caddy for `primosmaternos.com` and `www.` with auto-HTTPS
- opens firewall for 80/443 only (3001 stays bound to `127.0.0.1`)
- clones this repo to `/opt/primos-store`
- brings up the app stack
- drops a thin `pm-update` at `/usr/local/bin/` that `exec`s
  `/opt/primos-store/scripts/pm-update.sh`

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
pm-update     # git pull, docker compose build+up, reseed catalog
```

Because `pm-update` on the server is a thin wrapper, updates to the
deploy steps themselves ship with the code — no re-provisioning
needed for changes to `scripts/pm-update.sh`.

## Project layout

```
website2026/
├── app/
│   ├── src/app/            Routes (App Router)
│   │   ├── page.tsx        Home + Collection + About
│   │   ├── products/[sku]/
│   │   ├── blog/           Reflections index + posts
│   │   ├── novena/         Nine-day Guadalupe Novena
│   │   ├── authenticity/   Certificates + fidelity chain
│   │   ├── canvas-sizes/   Size guide with real PPI figures
│   │   ├── shipping-and-returns/
│   │   ├── new-jersey/     Local page for "near me" queries
│   │   ├── parishes/       For-parish B2B landing
│   │   ├── schools/        For-school B2B landing
│   │   ├── dioceses/       Diocesan bulk-order landing
│   │   ├── gifts/          Advent + Dec 12 gift guide
│   │   ├── checkout/       success + cancel (noindex)
│   │   ├── api/            checkout, webhooks/stripe
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── src/lib/            db.ts, stripe.ts, blog.ts, site.ts
│   └── src/components/     ProductCard, BuyButton, BlogPostLayout, JsonLd
├── db/init.sql             Schema + seed
├── scripts/pm-update.sh    Deploy step, versioned in-repo
├── docker-compose.yml
├── deploy.sh               First-time server provisioning
├── docs/
│   ├── primos-maternos-image-fidelity.md   Authenticity substrate
│   ├── email-campaigns/    Segmented email sequences + PDF renders
│   └── social-*-campaign.md
└── .env.example
```
