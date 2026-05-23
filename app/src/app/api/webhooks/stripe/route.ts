import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { pool } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const rawBody = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    console.error("Webhook signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Idempotent event log
  await pool.query(
    `INSERT INTO stripe_events (id, type, payload) VALUES ($1, $2, $3)
     ON CONFLICT (id) DO NOTHING`,
    [event.id, event.type, event as unknown as object]
  );

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ["line_items"],
    });

    const lineItems = fullSession.line_items?.data ?? [];
    const shipping = (fullSession as unknown as {
      shipping_details?: {
        name?: string;
        address?: {
          line1?: string;
          line2?: string;
          city?: string;
          state?: string;
          postal_code?: string;
          country?: string;
        };
      };
    }).shipping_details;

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const { rows } = await client.query<{ id: number }>(
        `INSERT INTO orders (
            stripe_session_id, stripe_payment_intent, customer_email, customer_name,
            amount_total_cents, currency, payment_status,
            shipping_name, shipping_line1, shipping_line2, shipping_city,
            shipping_state, shipping_postal_code, shipping_country
         ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
         ON CONFLICT (stripe_session_id) DO UPDATE SET payment_status = EXCLUDED.payment_status
         RETURNING id`,
        [
          fullSession.id,
          typeof fullSession.payment_intent === "string"
            ? fullSession.payment_intent
            : fullSession.payment_intent?.id ?? null,
          fullSession.customer_details?.email ?? null,
          fullSession.customer_details?.name ?? null,
          fullSession.amount_total ?? 0,
          fullSession.currency ?? "usd",
          fullSession.payment_status ?? "unknown",
          shipping?.name ?? null,
          shipping?.address?.line1 ?? null,
          shipping?.address?.line2 ?? null,
          shipping?.address?.city ?? null,
          shipping?.address?.state ?? null,
          shipping?.address?.postal_code ?? null,
          shipping?.address?.country ?? null,
        ]
      );
      const orderId = rows[0].id;

      for (const item of lineItems) {
        const sku =
          (item.price?.product as Stripe.Product | null)?.metadata?.sku ??
          (fullSession.metadata?.sku ?? null);
        await client.query(
          `INSERT INTO order_items (order_id, sku, name, quantity, unit_price_cents)
           VALUES ($1, $2, $3, $4, $5)`,
          [
            orderId,
            sku,
            item.description ?? "Item",
            item.quantity ?? 1,
            item.price?.unit_amount ?? 0,
          ]
        );
      }
      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      console.error("Failed to persist order", err);
      return NextResponse.json({ error: "DB write failed" }, { status: 500 });
    } finally {
      client.release();
    }
  }

  return NextResponse.json({ received: true });
}
