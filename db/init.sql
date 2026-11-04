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

-- ─── Outreach mailer (/admin/mailer) ─────────────────────────
-- One row per person. Every spreadsheet column except email lands in
-- `fields`, keyed by its lowercased header, and each key is usable in a
-- template as @key (e.g. @firstname, @parishname, @city).
CREATE TABLE IF NOT EXISTS mail_contacts (
    id              SERIAL PRIMARY KEY,
    email           TEXT UNIQUE NOT NULL,          -- stored lowercased
    fields          JSONB NOT NULL DEFAULT '{}',
    unsubscribed    BOOLEAN NOT NULL DEFAULT FALSE,
    notes           TEXT,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

-- Prewritten emails. Body is light Markdown with @merge fields.
-- Seeded from docs/email-campaigns via db/mailer-seed.sql, then edited in the UI.
CREATE TABLE IF NOT EXISTS mail_templates (
    id              SERIAL PRIMARY KEY,
    slug            TEXT UNIQUE NOT NULL,
    name            TEXT NOT NULL,
    segment         TEXT NOT NULL DEFAULT '',      -- matches a contact's @segment
    position        INTEGER NOT NULL DEFAULT 0,    -- order within the segment's sequence
    subject         TEXT NOT NULL,
    preview         TEXT NOT NULL DEFAULT '',
    body            TEXT NOT NULL,
    active          BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at      TIMESTAMP DEFAULT NOW()
);

-- Every send attempt, with the exact text that went out.
CREATE TABLE IF NOT EXISTS mail_sends (
    id              SERIAL PRIMARY KEY,
    contact_id      INTEGER REFERENCES mail_contacts(id) ON DELETE CASCADE,
    template_id     INTEGER REFERENCES mail_templates(id) ON DELETE SET NULL,
    to_email        TEXT NOT NULL,
    subject         TEXT NOT NULL,
    body            TEXT NOT NULL,
    status          VARCHAR(10) NOT NULL,          -- 'sent' | 'failed'
    error           TEXT,
    message_id      TEXT,
    sent_at         TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_mail_sends_contact ON mail_sends(contact_id, sent_at DESC);
CREATE INDEX IF NOT EXISTS idx_mail_sends_sent ON mail_sends(sent_at DESC);

-- ─── Seed catalog ────────────────────────────────────────────
-- Display order (sort_order): the two rolled canvases lead as the best sellers,
-- then the gold frame, the other frames, and the 12x18 gallery wrap last.
INSERT INTO products (sku, name, description, size, variant, price_cents, image_path, sort_order) VALUES
('olg-24x36-gold',
 'Our Lady of Guadalupe Framed Canvas Print — 24"x36", Gold Frame',
 'A framed 24"x36" Our Lady of Guadalupe canvas print in a classic gold frame, $214 and ready to hang, with free shipping to all 50 states and Puerto Rico. Stretched on archival canvas and printed in the USA at 287.5 pixels per inch from the digital archive of the Sacred Original certified in Mexico in 1998. Both Mexican certifications included.',
 '24x36', 'gold-frame', 21400, '/products/olg-24x36-gold.jpg', 3),
('olg-24x36-cherry',
 'Our Lady of Guadalupe Framed Canvas Print — 24"x36", Cherry Frame',
 'A framed 24"x36" Our Lady of Guadalupe canvas print in a warm cherry frame, $214 and ready to hang, with free shipping to all 50 states and Puerto Rico. Stretched on archival canvas and printed in the USA at 287.5 pixels per inch from the digital archive of the Sacred Original certified in Mexico in 1998. Both Mexican certifications included.',
 '24x36', 'cherry-frame', 21400, '/products/olg-24x36-cherry.jpg', 4),
('olg-24x36-beaded-mahogany',
 'Our Lady of Guadalupe Framed Canvas Print — 24"x36", Beaded Mahogany Frame',
 'A framed 24"x36" Our Lady of Guadalupe canvas print in a beaded mahogany frame, $214 and ready to hang, with free shipping to all 50 states and Puerto Rico. Stretched on archival canvas and printed in the USA at 287.5 pixels per inch from the digital archive of the Sacred Original certified in Mexico in 1998. Both Mexican certifications included.',
 '24x36', 'beaded-mahogany-frame', 21400, '/products/olg-24x36-beaded-mahogany.jpg', 5),
('olg-24x36-black-red-oak',
 'Our Lady of Guadalupe Framed Canvas Print — 24"x36", Black Red Oak Frame',
 'A framed 24"x36" Our Lady of Guadalupe canvas print in a black red oak frame, $214 and ready to hang, with free shipping to all 50 states and Puerto Rico. Stretched on archival canvas and printed in the USA at 287.5 pixels per inch from the digital archive of the Sacred Original certified in Mexico in 1998. Both Mexican certifications included.',
 '24x36', 'black-red-oak-frame', 21400, '/products/olg-24x36-black-red-oak.jpg', 6),
('olg-24x36-silver-ornate',
 'Our Lady of Guadalupe Framed Canvas Print — 24"x36", Silver Ornate Frame',
 'A framed 24"x36" Our Lady of Guadalupe canvas print in an ornate silver frame, $214 and ready to hang, with free shipping to all 50 states and Puerto Rico. Stretched on archival canvas and printed in the USA at 287.5 pixels per inch from the digital archive of the Sacred Original certified in Mexico in 1998. Both Mexican certifications included.',
 '24x36', 'silver-ornate-frame', 21400, '/products/olg-24x36-silver-ornate.jpg', 7),
('olg-12x18-gallery-wrap',
 'Small Our Lady of Guadalupe Canvas Picture, Ready to Hang — 12"x18"',
 'A small 12"x18" Our Lady of Guadalupe canvas picture for $57, stretched over 0.75" bars so it hangs straight from the box with no frame needed. The simplest gift we make, with free shipping to all 50 states and Puerto Rico. Printed in the USA at 575 pixels per inch from the digital archive of the Sacred Original certified in Mexico in 1998. Both Mexican certifications included.',
 '12x18', 'gallery-wrap-0.75', 5700, '/products/olg-12x18-gallery-wrap.jpg', 8),
('olg-24x36-rolled',
 'Our Lady of Guadalupe Canvas Print, Unframed — 24"x36"',
 'An unframed 24"x36" Our Lady of Guadalupe canvas print for $114, with free shipping to all 50 states and Puerto Rico. It ships rolled in a protective tube, ready to be stretched or framed locally to suit your wall, which is why it costs about half what a framed picture does. Printed in the USA on archival canvas, not poster paper, at 287.5 pixels per inch from the digital archive of the Sacred Original certified in Mexico in 1998. Both Mexican certifications included.',
 '24x36', 'rolled', 11400, '/products/olg-24x36-rolled.jpg', 1),
('olg-36x54-rolled',
 'Large Our Lady of Guadalupe Canvas Print, Unframed — 36"x54"',
 'Our largest Our Lady of Guadalupe print: an unframed 36"x54" canvas for $324, with free shipping and no oversize surcharge. Sized for a church wall, chapel, parish hall or large home altar, and shipped rolled in a protective tube for local framing. Printed in the USA on archival canvas at 191.7 pixels per inch from the digital archive of the Sacred Original certified in Mexico in 1998. Both Mexican certifications included.',
 '36x54', 'rolled', 32400, '/products/olg-36x54-rolled.jpg', 2)
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
