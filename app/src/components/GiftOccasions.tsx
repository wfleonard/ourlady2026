import Link from "next/link";
import {
  AUTHENTICITY_LINE,
  UNDER_60,
  giftOccasions,
  productHref,
  type Locale,
} from "@/lib/giftOccasions";

const COPY = {
  en: {
    title: "Gifts by occasion",
    intro: "One image, nine occasions. The size, frame and price we recommend for each.",
    view: "See this canvas →",
    under60Cta: "See the $57 canvas →",
  },
  es: {
    title: "Regalos por ocasión",
    intro: "Una imagen, nueve ocasiones. El tamaño, el marco y el precio que recomendamos para cada una.",
    view: "Ver este cuadro →",
    under60Cta: "Ver el cuadro de $57 →",
  },
} as const;

/** The "Under $60" callout plus one card per occasion. Shared by /gifts and the Spanish catalog. */
export function GiftOccasions({ locale = "en" }: { locale?: Locale }) {
  const t = COPY[locale];
  const under = UNDER_60[locale];
  return (
    <>
      <section id={locale === "es" ? "menos-de-60" : "under-60"} className="max-w-4xl mx-auto px-6 py-12">
        <div className="rounded-lg border-2 border-[var(--accent)] bg-white p-6 md:p-8 grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{under.title}</h2>
            <p className="mt-3 text-stone-700 leading-relaxed">{under.text}</p>
            <p className="mt-3 text-sm text-stone-600">{AUTHENTICITY_LINE[locale]}</p>
            <Link href={productHref(under.sku, locale)} className="mt-4 inline-block font-semibold text-[var(--accent)]">
              {t.under60Cta}
            </Link>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/products/${under.sku}.jpg`}
            alt={locale === "es" ? "Cuadro de 12 por 18 pulgadas de la Virgen de Guadalupe" : "12 by 18 inch Our Lady of Guadalupe canvas"}
            className="max-h-56 w-auto mx-auto object-contain"
          />
        </div>
      </section>

      <section id={locale === "es" ? "ocasiones" : "occasions"} className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-3">{t.title}</h2>
        <p className="text-center text-stone-600 mb-10 max-w-2xl mx-auto">{t.intro}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {giftOccasions(locale).map((o) => (
            <section key={o.id} id={o.id} className="bg-white p-5 rounded-lg border border-stone-200 flex flex-col">
              <h3 className="text-xl font-semibold text-[var(--accent)]">{o.title}</h3>
              <p className="mt-1 text-sm font-semibold text-stone-800">{o.pick}</p>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">{o.text}</p>
              <p className="mt-2 text-xs text-stone-500 leading-relaxed flex-1">{AUTHENTICITY_LINE[locale]}</p>
              <Link href={productHref(o.sku, locale)} className="mt-3 text-sm font-semibold text-[var(--accent)]">
                {t.view}
              </Link>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
