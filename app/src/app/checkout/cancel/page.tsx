import Link from "next/link";
import { CATALOG_ES, ES_BASE, esProductPath } from "@/lib/catalogEs";

/** A step in a purchase, not a page anyone should reach from search. */
export const metadata = {
  robots: { index: false, follow: false },
};

const TEXT = {
  en: {
    title: "Checkout canceled",
    body: "No charge was made. The canvas is still here when you're ready.",
    back: "Back to the canvas",
    store: "Back to the store",
  },
  es: {
    title: "Pago cancelado",
    body: "No se hizo ningún cargo. El cuadro sigue aquí cuando usted esté listo.",
    back: "Volver al cuadro",
    store: "Volver a los cuadros",
  },
};

/**
 * /api/checkout sends the buyer here with the SKU they were buying, and
 * lang=es when they came from a Spanish page, so the button can return them
 * to that same product in their language.
 */
export default async function CancelPage({
  searchParams,
}: {
  searchParams: Promise<{ sku?: string; lang?: string }>;
}) {
  const { sku, lang } = await searchParams;
  const locale = lang === "es" ? "es" : "en";
  const t = TEXT[locale];

  // Only a well-formed SKU becomes a link; anything else goes to the store.
  const validSku = sku && /^[a-z0-9-]+$/.test(sku) ? sku : null;
  let href = locale === "es" ? ES_BASE : "/";
  let label = t.store;
  if (validSku && (locale === "en" || CATALOG_ES[validSku])) {
    href = locale === "es" ? esProductPath(validSku) : `/products/${validSku}`;
    label = t.back;
  }

  return (
    <div lang={locale} className="max-w-2xl mx-auto px-6 py-20 text-center">
      <h1 className="text-3xl font-bold">{t.title}</h1>
      <p className="mt-4 text-stone-700">{t.body}</p>
      <Link
        href={href}
        className="inline-block mt-8 px-6 py-3 bg-[var(--accent)] text-[var(--gold)]! font-semibold rounded-md"
      >
        {label}
      </Link>
    </div>
  );
}
