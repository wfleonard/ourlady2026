import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __pgPool: Pool | undefined;
}

const pool =
  global.__pgPool ??
  new Pool({
    connectionString:
      process.env.DATABASE_URL ??
      "postgresql://primos:primos@localhost:5434/primos_store",
  });

if (process.env.NODE_ENV !== "production") {
  global.__pgPool = pool;
}

export { pool };

export type Product = {
  sku: string;
  name: string;
  description: string;
  size: string;
  variant: string;
  price_cents: number;
  image_path: string;
  sort_order: number;
};

export async function listProducts(): Promise<Product[]> {
  const { rows } = await pool.query<Product>(
    `SELECT sku, name, description, size, variant, price_cents, image_path, sort_order
       FROM products
      WHERE active = TRUE
      ORDER BY sort_order ASC`
  );
  return rows;
}

export async function getProduct(sku: string): Promise<Product | null> {
  const { rows } = await pool.query<Product>(
    `SELECT sku, name, description, size, variant, price_cents, image_path, sort_order
       FROM products
      WHERE sku = $1 AND active = TRUE`,
    [sku]
  );
  return rows[0] ?? null;
}

export function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
}
