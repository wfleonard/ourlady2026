import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct, formatPrice } from "@/lib/db";
import { BuyButton } from "@/components/BuyButton";
import { EbayLink } from "@/components/EbayLink";
import { JsonLd } from "@/components/JsonLd";
import { MetaPixelEvent } from "@/components/MetaPixelEvent";
import { CATALOG_ES, ES_BASE, esProductPath } from "@/lib/catalogEs";
import { ORG, SITE_URL, absoluteUrl, pageTitle, RETURN_POLICY, HANDLING_DAYS, EBAY_LISTINGS } from "@/lib/site";

// Spanish counterpart of /products/[sku]. Same product, price and claims; the
// words come from lib/catalogEs.ts. The root layout is lang="en", so this
// page marks its own content lang="es".

export const dynamic = "force-dynamic";

/** One query per request, shared by generateMetadata and the page itself. */
const loadProduct = cache(getProduct);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sku: string }>;
}): Promise<Metadata> {
  const { sku } = await params;
  const product = await loadProduct(sku);
  const es = CATALOG_ES[sku];
  if (!product || !es) return { title: "Cuadro no encontrado — Primos Maternos" };

  const url = esProductPath(product.sku);
  return {
    title: pageTitle(es.name),
    description: es.description,
    alternates: {
      canonical: url,
      languages: { en: `/products/${product.sku}`, es: url },
    },
    openGraph: {
      type: "website",
      locale: "es_US",
      url: absoluteUrl(url),
      title: es.name,
      description: es.description,
      images: [{ url: absoluteUrl(product.image_path), alt: es.name }],
    },
  };
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ sku: string }>;
}) {
  const { sku } = await params;
  const product = await loadProduct(sku);
  const es = CATALOG_ES[sku];
  if (!product || !es) notFound();

  const url = absoluteUrl(esProductPath(product.sku));
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: es.name,
    description: es.description,
    sku: product.sku,
    image: absoluteUrl(product.image_path),
    url,
    inLanguage: "es",
    brand: { "@type": "Brand", name: ORG.name },
    size: `${product.size} pulgadas`,
    material: "Lienzo",
    offers: {
      "@type": "Offer",
      url,
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
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "US" },
      },
    },
  };

  return (
    <div lang="es" className="max-w-6xl mx-auto px-6 py-12">
      <JsonLd data={productJsonLd} />
      <MetaPixelEvent
        event="ViewContent"
        params={{
          content_ids: [product.sku],
          content_type: "product",
          content_name: es.name,
          value: product.price_cents / 100,
          currency: "USD",
        }}
      />
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <Link href={ES_BASE} className="text-stone-500 hover:text-[var(--accent)]">
          ← Ver todos los cuadros
        </Link>
        <Link
          href={`/products/${product.sku}`}
          hrefLang="en"
          lang="en"
          className="text-stone-500 underline hover:text-[var(--accent)]"
        >
          In English →
        </Link>
      </div>

      {/* Same order as the English page: below md the title, price and Buy
          button come before the image. */}
      <div className="mt-6 grid md:grid-cols-2 gap-x-10 gap-y-6 md:gap-y-0">
        <div className="md:col-start-2">
          <p className="text-sm uppercase tracking-widest text-[var(--gold)] font-semibold">
            {es.label}
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold leading-tight">{es.name}</h1>
          <div className="mt-4 text-3xl font-bold text-[var(--accent)]">
            {formatPrice(product.price_cents)}
          </div>
          <div className="mt-4 md:hidden">
            <BuyButton sku={product.sku} locale="es" />
            <p className="mt-2 text-xs text-stone-500">
              Envío gratis en EE. UU. · Pago seguro con Stripe
            </p>
          </div>
        </div>
        <div className="bg-stone-50 rounded-lg p-6 md:p-10 flex items-center justify-center md:col-start-1 md:row-start-1 md:row-span-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image_path}
            alt={es.name}
            className="max-w-full h-auto object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.3)]"
          />
        </div>
        <div className="md:col-start-2">
          <p className="mt-6 text-stone-700 leading-relaxed">{es.description}</p>
          <ul className="mt-6 space-y-2 text-sm text-stone-600 list-disc list-inside">
            <li>
              Impreso a partir de un archivo digital del Sagrado Original,
              certificado el 12 de diciembre de 1998 por el cardenal Norberto
              Rivera Carrera, Arzobispo Primado de México, como reproducción fiel
            </li>
            <li>
              La imagen, conocida como la Virgen Peregrina, fue bendecida por el
              papa Juan Pablo II el 25 de enero de 1999
            </li>
            <li>Impreso sobre lienzo de archivo en EE. UU.</li>
            <li>Cada cuadro incluye dos certificaciones mexicanas</li>
            <li>Envío gratis a los 50 estados de EE. UU. y Puerto Rico</li>
          </ul>
          <div className="mt-8">
            <BuyButton sku={product.sku} locale="es" />
            <p className="mt-3 text-xs text-stone-500">
              Pago seguro con Stripe. Acepta Apple Pay y Google Pay.
            </p>
            {EBAY_LISTINGS[product.sku] && (
              <EbayLink sku={product.sku} href={EBAY_LISTINGS[product.sku]!} locale="es" />
            )}
          </div>
          <p className="mt-8 text-sm text-stone-600">
            ¿Dudas sobre el tamaño, el marco o la autenticidad?{" "}
            <Link href={`${ES_BASE}#preguntas`} className="text-[var(--accent)] underline">
              Vea las preguntas frecuentes
            </Link>
            . Para pedidos de parroquias,{" "}
            <Link href="/parroquias" className="text-[var(--accent)] underline">
              vea la página para parroquias
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
