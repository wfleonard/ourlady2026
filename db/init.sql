-- Catalog: SKUs the storefront sells
CREATE TABLE IF NOT EXISTS products (
    sku             VARCHAR(40) PRIMARY KEY,
    name            TEXT NOT NULL,
    description     TEXT,
    size            VARCHAR(20) NOT NULL,
    variant         VARCHAR(40) NOT NULL,
    price_cents     INTEGER NOT NULL CHECK (price_cents > 0),
    image_path      TEXT NOT NULL,
    sort_order      INTEGER DEFAULT 0,
    active          BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Orders synced from Stripe checkout.session.completed
CREATE TABLE IF NOT EXISTS orders (
    id                      SERIAL PRIMARY KEY,
    stripe_session_id       VARCHAR(255) UNIQUE NOT NULL,
    stripe_payment_intent   VARCHAR(255),
    customer_email          TEXT,
    customer_name           TEXT,
    amount_total_cents      INTEGER NOT NULL,
    currency                VARCHAR(3) NOT NULL DEFAULT 'usd',
    payment_status          VARCHAR(40) NOT NULL,
    shipping_name           TEXT,
    shipping_line1          TEXT,
    shipping_line2          TEXT,
    shipping_city           TEXT,
    shipping_state          TEXT,
    shipping_postal_code    TEXT,
    shipping_country        TEXT,
    created_at              TIMESTAMP DEFAULT NOW()
);

-- One row per line item on an order
CREATE TABLE IF NOT EXISTS order_items (
    id              SERIAL PRIMARY KEY,
    order_id        INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    sku             VARCHAR(40) REFERENCES products(sku),
    name            TEXT NOT NULL,
    quantity        INTEGER NOT NULL CHECK (quantity > 0),
    unit_price_cents INTEGER NOT NULL
);

-- Raw Stripe webhook events for replay/debugging
CREATE TABLE IF NOT EXISTS stripe_events (
    id              VARCHAR(255) PRIMARY KEY,
    type            VARCHAR(100) NOT NULL,
    payload         JSONB NOT NULL,
    received_at     TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

-- ─── Seed catalog ────────────────────────────────────────────
-- Framed first (premium), then rolled, ordered small to large.
INSERT INTO products (sku, name, description, size, variant, price_cents, image_path, sort_order) VALUES
('olg-24x36-gold',
 'Our Lady of Guadalupe — 24"x36" Gold Frame',
 'The Church-authorized replica of the tilma of Saint Juan Diego, stretched on canvas and finished in a classic gold frame. Includes certificate of authenticity. Ready to hang.',
 '24x36', 'gold-frame', 19700, '/products/olg-24x36-gold.jpg', 10),
('olg-24x36-cherry',
 'Our Lady of Guadalupe — 24"x36" Cherry Frame',
 'The Church-authorized tilma image on stretched canvas, framed in warm cherry. Includes certificate of authenticity. Ready to hang.',
 '24x36', 'cherry-frame', 19700, '/products/olg-24x36-cherry.jpg', 11),
('olg-24x36-beaded-mahogany',
 'Our Lady of Guadalupe — 24"x36" Beaded Mahogany Frame',
 'The Church-authorized tilma image on stretched canvas, framed in beaded mahogany. Includes certificate of authenticity. Ready to hang.',
 '24x36', 'beaded-mahogany-frame', 19700, '/products/olg-24x36-beaded-mahogany.jpg', 12),
('olg-24x36-black-red-oak',
 'Our Lady of Guadalupe — 24"x36" Black Red Oak Frame',
 'The Church-authorized tilma image on stretched canvas, framed in black red oak. Includes certificate of authenticity. Ready to hang.',
 '24x36', 'black-red-oak-frame', 19700, '/products/olg-24x36-black-red-oak.jpg', 13),
('olg-24x36-silver-ornate',
 'Our Lady of Guadalupe — 24"x36" Silver Ornate Frame',
 'The Church-authorized tilma image on stretched canvas, framed in a silver ornate frame. Includes certificate of authenticity. Ready to hang.',
 '24x36', 'silver-ornate-frame', 19700, '/products/olg-24x36-silver-ornate.jpg', 14),
('olg-12x18-gallery-wrap',
 'Our Lady of Guadalupe — 12"x18" Thin Gallery Wrap (0.75")',
 'The Church-authorized tilma image on a 12"x18" thin gallery wrap canvas — 0.75" deep stretcher bars, no frame needed, ready to hang straight from the box. Includes certificate of authenticity.',
 '12x18', 'gallery-wrap-0.75', 5700, '/products/olg-12x18-gallery-wrap.jpg', 20),
('olg-24x36-rolled',
 'Our Lady of Guadalupe — 24"x36" Rolled Canvas',
 'The Church-authorized tilma image printed on archival canvas at 24"x36" and shipped rolled in a protective tube. Ready for your own framing. Includes certificate of authenticity.',
 '24x36', 'rolled', 8700, '/products/olg-24x36-rolled.jpg', 21),
('olg-36x54-rolled',
 'Our Lady of Guadalupe — 36"x54" Rolled Canvas',
 'The large-format Church-authorized tilma image on archival canvas at 36"x54", shipped rolled. A devotional centerpiece for chapels, parish halls, and large home altars.',
 '36x54', 'rolled', 26700, '/products/olg-36x54-rolled.jpg', 22)
ON CONFLICT (sku) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    size = EXCLUDED.size,
    variant = EXCLUDED.variant,
    price_cents = EXCLUDED.price_cents,
    image_path = EXCLUDED.image_path,
    sort_order = EXCLUDED.sort_order,
    active = TRUE;

-- Retire any SKUs not in the current seed list (soft-delete: mark inactive)
UPDATE products SET active = FALSE
 WHERE sku NOT IN (
    'olg-24x36-gold', 'olg-24x36-cherry', 'olg-24x36-beaded-mahogany',
    'olg-24x36-black-red-oak', 'olg-24x36-silver-ornate',
    'olg-12x18-gallery-wrap', 'olg-24x36-rolled', 'olg-36x54-rolled'
 );
