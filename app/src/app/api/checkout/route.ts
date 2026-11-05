import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getProduct } from "@/lib/db";
import { CATALOG_ES } from "@/lib/catalogEs";

export async function POST(req: NextRequest) {
  try {
    const { sku, quantity, locale } = await req.json();
    if (typeof sku !== "string") {
      return NextResponse.json({ error: "Missing sku" }, { status: 400 });
    }
    const qty = Math.max(1, Math.min(10, Number(quantity) || 1));

    const product = await getProduct(sku);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ??
      req.headers.get("origin") ??
      "http://localhost:3001";

    // A Spanish page gets Spanish all the way through: the item name on
    // Stripe's page and receipt, and the thank-you and cancel pages. The
    // price and SKU are the same either way. The webhook stores this name
    // on the order item, so Spanish orders read in Spanish in the order
    // alert; the SKU beside it is what fulfillment goes by.
    const spanish = locale === "es";
    const es = spanish ? CATALOG_ES[product.sku] : undefined;
    const lang = spanish ? "&lang=es" : "";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      // The Spanish pages ask for Stripe's Spanish checkout; otherwise Stripe
      // follows the buyer's browser language.
      ...(spanish ? { locale: "es" as const } : {}),
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: qty,
          price_data: {
            currency: "usd",
            unit_amount: product.price_cents,
            product_data: {
              name: es?.name ?? product.name,
              description: es?.label ?? `${product.size}" — ${product.variant.replace(/-/g, " ")}`,
              images: [`${origin}${product.image_path}`],
              metadata: { sku: product.sku },
            },
          },
        },
      ],
      // US 50 states + DC + Puerto Rico (PR is a separate ISO-3166 code from US)
      shipping_address_collection: { allowed_countries: ["US", "PR"] },
      metadata: { sku: product.sku, ...(spanish ? { locale: "es" } : {}) },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}${lang}`,
      cancel_url: `${origin}/checkout/cancel?sku=${encodeURIComponent(product.sku)}${lang}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("checkout error", err);
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
