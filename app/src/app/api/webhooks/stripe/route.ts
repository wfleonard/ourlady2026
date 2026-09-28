import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { pool } from "@/lib/db";
import { sendOrderAlert, type OrderAlert } from "@/lib/mailer";
import { notifySaxonAdmin } from "@/lib/saxonAdmin";

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

    let alert: OrderAlert | null = null;
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const { rows } = await client.query<{ id: number; inserted: boolean }>(
        `INSERT INTO orders (
            stripe_session_id, stripe_payment_intent, customer_email, customer_name,
            amount_total_cents, currency, payment_status,
            shipping_name, shipping_line1, shipping_line2, shipping_city,
            shipping_state, shipping_postal_code, shipping_country
         ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
         ON CONFLICT (stripe_session_id) DO UPDATE SET payment_status = EXCLUDED.payment_status
         RETURNING id, (xmax = 0) AS inserted`,
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
      const { id: orderId, inserted } = rows[0];

      // Stripe retries deliveries; only the first one writes items and alerts.
      const newItems = inserted ? lineItems : [];
      for (const item of newItems) {
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

      if (inserted) {
        alert = {
          orderId,
          customerName: fullSession.customer_details?.name ?? null,
          customerEmail: fullSession.customer_details?.email ?? null,
          amountTotalCents: fullSession.amount_total ?? 0,
          items: lineItems.map((i) => ({
            name: i.description ?? "Item",
            quantity: i.quantity ?? 1,
            unitPriceCents: i.price?.unit_amount ?? 0,
          })),
          shipping: [
            shipping?.name,
            shipping?.address?.line1,
            shipping?.address?.line2,
            [shipping?.address?.city, shipping?.address?.state, shipping?.address?.postal_code]
              .filter(Boolean)
              .join(", "),
            shipping?.address?.country,
          ].filter((l): l is string => !!l),
          paymentIntent:
            typeof fullSession.payment_intent === "string"
              ? fullSession.payment_intent
              : fullSession.payment_intent?.id ?? null,
          livemode: event.livemode,
        };
      }
    } catch (err) {
      await client.query("ROLLBACK");
      console.error("Failed to persist order", err);
      return NextResponse.json({ error: "DB write failed" }, { status: 500 });
    } finally {
      client.release();
    }

    // The order is saved; a mail failure must not 500 and trigger a Stripe retry.
    if (alert) {
      await sendOrderAlert(alert).catch((err) =>
        console.error("Order alert email failed for order", alert?.orderId, err)
      );
      await notifySaxonAdmin({
        id: fullSession.id,
        type: "order",
        title: `Order #${alert.orderId}: ${alert.items.map((i) => `${i.quantity} × ${i.name}`).join(", ")}`,
        amountCents: alert.amountTotalCents,
        name: alert.customerName ?? undefined,
        email: alert.customerEmail ?? undefined,
      });
    }
  }

  return NextResponse.json({ received: true });
}
