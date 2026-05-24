import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getProduct } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { sku, quantity } = await req.json();
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

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: qty,
          price_data: {
            currency: "usd",
            unit_amount: product.price_cents,
            product_data: {
              name: product.name,
              description: `${product.size}" — ${product.variant.replace(/-/g, " ")}`,
              images: [`${origin}${product.image_path}`],
              metadata: { sku: product.sku },
            },
          },
        },
      ],
      // US 50 states + DC + Puerto Rico (PR is a separate ISO-3166 code from US)
      shipping_address_collection: { allowed_countries: ["US", "PR"] },
      metadata: { sku: product.sku },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("checkout error", err);
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
