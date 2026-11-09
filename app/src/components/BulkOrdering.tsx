import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";
import { bulkFaq, bulkUseCases, type Audience, type Locale } from "@/lib/bulkFaq";

const COPY = {
  en: {
    useCasesTitle: "Which size for which room",
    useCasesIntro: "What parishes, schools and dioceses order, and the size we recommend for each.",
    faqTitle: "Ordering in quantity: questions and answers",
    view: "See this canvas →",
  },
  es: {
    useCasesTitle: "Qué tamaño para cada espacio",
    useCasesIntro: "Lo que piden parroquias, escuelas y diócesis, y el tamaño que recomendamos para cada caso.",
    faqTitle: "Pedidos por cantidad: preguntas y respuestas",
    view: "Ver este lienzo →",
  },
} as const;

/**
 * Recommended sizes plus the quantity-order Q&A, with FAQPage JSON-LD built
 * from the same list the visitor reads. `path` is the page's own path, used
 * for the schema @id and the #faq anchor.
 */
export function BulkOrdering({
  audience,
  path,
  locale = "en",
}: {
  audience: Audience;
  path: string;
  locale?: Locale;
}) {
  const faq = bulkFaq(audience, locale);
  const t = COPY[locale];
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}${path}#faq`,
    inLanguage: locale,
    mainEntity: faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />

      <section id="sizes" className="max-w-5xl mx-auto px-6 py-16 border-t border-stone-200">
        <h2 className="text-3xl font-bold text-center mb-3">{t.useCasesTitle}</h2>
        <p className="text-center text-stone-600 mb-10 max-w-2xl mx-auto">{t.useCasesIntro}</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {bulkUseCases(locale).map((u) => (
            <div key={u.title} className="bg-white p-5 rounded-lg border border-stone-200 flex flex-col">
              <h3 className="font-semibold text-[var(--accent)]">{u.title}</h3>
              <p className="mt-1 text-sm font-semibold text-stone-800">
                {u.size} · {u.price}
              </p>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed flex-1">{u.text}</p>
              <Link href={u.href} className="mt-3 text-sm font-semibold text-[var(--accent)]">
                {t.view}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="bg-stone-50 border-y border-stone-200">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-6">{t.faqTitle}</h2>
          <dl className="space-y-6 text-stone-700 leading-relaxed">
            {faq.map(({ q, a }) => (
              <div key={q}>
                <dt className="font-semibold text-stone-800">{q}</dt>
                <dd className="mt-2">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
