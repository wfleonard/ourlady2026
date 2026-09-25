# Primos Maternos Store — Claude Notes

## What this is
E-commerce site for Saxon Enterprises (dba Primos Maternos) selling
Our Lady of Guadalupe canvas products. Next.js 16 + Postgres + Stripe
Checkout, deployed to primosmaternos.com behind Caddy.

## Stack mirrors trading-signals
Same Docker Compose pattern as `/Users/saxon/trading-signals`:
- Postgres 16 in a container, port `127.0.0.1:5434` (5433 is taken by trading-signals)
- Next.js app exposed on `3001` (3000 is taken by trading-signals)
- Deploy via `deploy.sh` → `pm-update` on the server (parallel to `trading-update`)

## Deploy split — the important part

The `deploy.sh` at repo root provisions a fresh host once. Ongoing deploys
run through `pm-update` on the server, which is a **thin wrapper** that
`exec`s `/opt/primos-store/scripts/pm-update.sh`. The real steps travel
with a `git pull`.

This split exists because the previous helper was written once at
provisioning time and silently went stale — a catalog re-seed step added
in `92bc993` never ran on production for weeks. Any new deploy step goes
in `scripts/pm-update.sh` in-repo.

## `app/src/lib/site.ts` is the single source of truth

Anything a machine reads about this business — organization JSON-LD,
return-policy schema, handling times, allowed AI crawlers, canonical
site URL — comes from `site.ts`. Do not hardcode any of that in
individual pages; import from there. Reasons:

- Site URL is used by Stripe return URLs, sitemap, canonicals, and OG
  image absolute paths. One place to change per environment.
- `RETURN_POLICY` and `HANDLING_DAYS` are embedded in every product's
  Offer JSON-LD and stated in prose at `/shipping-and-returns`. If they
  drift, Google flags it. Both read from `site.ts`.
- `AI_CRAWLERS` names OAI, GPT, Perplexity, Claude, Google-Extended
  explicitly in `robots.ts` so a broader later `Disallow` can't lock
  them out by accident.

## Catalog

Eight SKUs, seeded in `db/init.sql`, ranging $57–$324. The authoritative
list with prices is the table in `README.md`. Product descriptions in
the seed are the long form that appears on product pages and in the
Product JSON-LD — they're front-loaded because the first sentence is
what a search snippet shows.

**Changing a price, description, or adding a SKU:** edit the seed block
in `db/init.sql` and push. On the server, `pm-update` reseeds after the
build — the reseed is `psql -v ON_ERROR_STOP=1` so a broken seed fails
loud instead of half-applying.

Locally:
```bash
docker compose exec -T postgres psql -U primos -d primos_store < db/init.sql
```

`docker compose down && up -d` does **not** apply seed changes.
`postgres_data` is a named volume, plain `down` does not remove it, and
Postgres runs `init.sql` only when the data directory is empty. The
reseed silently never happens and the old copy stays live on the store.

The seed uses `ON CONFLICT DO UPDATE` for products and marks any SKU
absent from the list `active = FALSE`, so order history survives a
catalog change.

## Authenticity — do not improvise

Every claim about the image traces back to
[`docs/primos-maternos-image-fidelity.md`](docs/primos-maternos-image-fidelity.md).
The two things the documents actually establish:

1. A Dec 12, 1998 certification signed by Cardinal Norberto Rivera
   Carrera, Archbishop Primate of Mexico, calls a print a *"faithful
   reproduction of the digital archive of the Sacred Original."*
   The digital capture and reproduction were done by DIGITAL COLOR
   S.A. DE C.V.
2. The image (Virgen Peregrina) was blessed by Pope John Paul II on
   Jan 25, 1999.

The site never claims:
- That every canvas is individually certified by the archdiocese today
  (only the 1998 print run was documented)
- That the canvas is manufactured in Mexico (the physical print happens
  in the USA)
- A blessing by Pope Francis (that was on the earlier site's copy but
  is not documented in the source materials)

The `/authenticity` page states the chain in the language of the
documents. Any page or email that mentions authenticity uses the same
three-part sentence: *image created in Mexico from a scan of the
original tilma · canvas printed in the USA · two Mexican certificates
included.*

## SEO / AEO scaffolding

- `sitemap.ts` and `robots.ts` are code, not static files (Next 16 App
  Router route handlers).
- `JsonLd.tsx` renders structured data as inline `<script type="application/ld+json">`.
- Layout carries Organization + WebSite schema.
- Every page has an `alternates: { canonical }` in metadata.
- Product pages `generateMetadata` from the DB row (title, description,
  OG image), and render Product + Offer JSON-LD with the shared
  `RETURN_POLICY` and `HANDLING_DAYS` from `site.ts`.
- Blog posts render Article JSON-LD, but deliberately **omit
  `datePublished`** — `post.date` is the date of the events described
  (December 12, 1531 for the apparition), not the publish date. Inventing
  one would be worse than leaving it out.
- `/checkout/success` and `/checkout/cancel` are `robots: { index: false, follow: false }` — they are transaction states, not landing pages.

## Stripe flow
1. Click "Buy now" on a product page → `POST /api/checkout`
2. Server creates a Checkout Session with `price_data` (no Stripe
   Product needed; we are the source of truth)
3. Redirect to Stripe-hosted checkout
4. On success: redirect to `/checkout/success`
5. Stripe fires `checkout.session.completed` → `/api/webhooks/stripe` →
   inserts into `orders` + `order_items`, logs raw event to
   `stripe_events`

## Known gotchas
- The webhook route is `runtime = "nodejs"` because it needs
  `req.text()` for signature verification — do NOT switch to edge.
- No tax collection on launch (per Bill). Free US shipping baked into
  price.
- The 5–10 business day handling window in `HANDLING_DAYS` is the
  merchant reality (small-op fulfillment), not a target — it feeds
  the schema honestly.
- Email address across the site is `wfleonard@primosmaternos.com`
  (Google Workspace alias into the Saxon Enterprises account, SPF/DKIM
  set up in DNS).
- `NEXT_PUBLIC_GA_ID` is gated in the layout — leaving it blank in
  local `.env` keeps analytics traffic off dev.
