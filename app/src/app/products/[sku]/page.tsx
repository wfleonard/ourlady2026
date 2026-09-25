import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct, formatPrice } from "@/lib/db";
import { BuyButton } from "@/components/BuyButton";
import { JsonLd } from "@/components/JsonLd";
import { ORG, SITE_URL, absoluteUrl, RETURN_POLICY, HANDLING_DAYS } from "@/lib/site";

export const dynamic = "force-dynamic";

/** One query per request, shared by generateMetadata and the page itself. */
const loadProduct = cache(getProduct);

/**
 * Without this, all eight product pages inherited the layout's title and
 * description, so every one of them described the shop rather than the thing
 * on the page. The catalog already holds better copy than any template.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ sku: string }>;
}): Promise<Metadata> {
  const { sku } = await params;
  const product = await loadProduct(sku);
  if (!product) return { title: "Canvas not found — Primos Maternos" };

  const url = `/products/${product.sku}`;
  return {
    title: `${product.name} — Primos Maternos`,
    description: product.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url: absoluteUrl(url),
      title: product.name,
      description: product.description,
      images: [{ url: absoluteUrl(product.image_path), alt: product.name }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ sku: string }>;
}) {
  const { sku } = await params;
  const product = await loadProduct(sku);
  if (!product) notFound();

  // The price, the size, and "in stock" are what an assistant quotes when a
  // buyer asks what this costs. Leaving them to the prose alone hides them.
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.sku,
    image: absoluteUrl(product.image_path),
    url: absoluteUrl(`/products/${product.sku}`),
    brand: { "@type": "Brand", name: ORG.name },
    size: `${product.size} inches`,
    material: "Canvas",
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/products/${product.sku}`),
      priceCurrency: "USD",
      price: (product.price_cents / 100).toFixed(2),
      availability: "https://schema.org/InStock",
      seller: { "@id": `${SITE_URL}/#organization` },
      hasMerchantReturnPolicy: RETURN_POLICY,
      shippingDetails: {
        "@type": "OfferShippingDetails",
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: HANDLING_DAYS.min,
            maxValue: HANDLING_DAYS.max,
            unitCode: "DAY",
          },
        },
        shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "USD" },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US",
        },
      },
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <JsonLd data={productJsonLd} />
      <Link
        href="/#products"
        className="text-sm text-stone-500 hover:text-[var(--accent)]"
      >
        ← Back to all products
      </Link>

      <div className="mt-6 grid md:grid-cols-2 gap-10">
        <div className="bg-stone-50 rounded-lg p-10 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image_path}
            alt={product.name}
            className="max-w-full h-auto object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.3)]"
          />
        </div>
        <div>
          <p className="text-sm uppercase tracking-widest text-[var(--gold)] font-semibold">
            {product.size}" · {product.variant.replace(/-/g, " ")}
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold leading-tight">
            {product.name}
          </h1>
          <div className="mt-4 text-3xl font-bold text-[var(--accent)]">
            {formatPrice(product.price_cents)}
          </div>
          <p className="mt-6 text-stone-700 leading-relaxed">
            {product.description}
          </p>
          <ul className="mt-6 space-y-2 text-sm text-stone-600 list-disc list-inside">
            <li>
              Printed from a digital archive of the Sacred Original, certified in
              1998 by the Archbishop Primate of Mexico as a faithful reproduction
            </li>
            <li>
              The image, known as the Virgen Peregrina, was blessed by Pope John
              Paul II on January 25, 1999
            </li>
            <li>Two Mexican certifications included with every canvas</li>
            <li>Free shipping to all 50 U.S. states and Puerto Rico</li>
          </ul>
          <div className="mt-8">
            <BuyButton sku={product.sku} />
            <p className="mt-3 text-xs text-stone-500">
              Secure checkout by Stripe. Apple Pay and Google Pay supported.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
