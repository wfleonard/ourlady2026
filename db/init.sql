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

-- Seed the four launch SKUs
INSERT INTO products (sku, name, description, size, variant, price_cents, image_path, sort_order) VALUES
('olg-24x36-gold',
 'Our Lady of Guadalupe — 24"x36" Gold Framed Canvas',
 'The Church-authorized replica of the tilma of Saint Juan Diego, stretched on canvas and finished in a classic gold frame. Includes certificate of authenticity. Ready to hang.',
 '24x36', 'gold-frame',
 19700,
 '/products/olg-24x36-gold.jpg',
 10),
('olg-24x36-rolled',
 'Our Lady of Guadalupe — 24"x36" Rolled Canvas',
 'The Church-authorized tilma image printed on archival canvas and shipped rolled in a protective tube. Ready for your own framing. Includes certificate of authenticity.',
 '24x36', 'rolled',
 8700,
 '/products/olg-24x36-rolled.jpg',
 20),
('olg-36x54-rolled',
 'Our Lady of Guadalupe — 36"x54" Rolled Canvas',
 'The large-format Church-authorized tilma image on archival canvas, shipped rolled. A devotional centerpiece for chapels, parish halls, and large home altars.',
 '36x54', 'rolled',
 26700,
 '/products/olg-36x54-rolled.jpg',
 30),
('olg-12x18-frameless',
 'Our Lady of Guadalupe — 12"x18" Stretched Canvas',
 'The Church-authorized tilma image on a 12"x18" stretched canvas — no frame, ready to hang as-is. Perfect for a home altar, bedside, or office.',
 '12x18', 'stretched',
 4300,
 '/products/olg-12x18-frameless.jpg',
 40)
ON CONFLICT (sku) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    price_cents = EXCLUDED.price_cents,
    image_path = EXCLUDED.image_path,
    sort_order = EXCLUDED.sort_order,
    active = TRUE;
