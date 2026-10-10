import Link from "next/link";
import type { Review } from "@/lib/reviews";

/**
 * One review, cut down for a landing page: a single photo, the part that speaks
 * to that page's reader as the pull quote, and a link to the full review on the
 * product page. `quote` is a paragraph index, or an excerpt that must appear
 * word for word in the review, so a pull quote can never drift from what the
 * customer wrote.
 */
export function ReviewHighlight({
  review,
  quote,
  photo = 0,
  locale = "en",
  translation,
}: {
  review: Review;
  quote: number | string;
  photo?: number;
  locale?: "en" | "es";
  /** Shown instead of the original on a translated page, marked as a translation. */
  translation?: string;
}) {
  const es = locale === "es";
  const text = typeof quote === "number" ? review.paragraphs[quote] : quote;
  if (!review.paragraphs.some((para) => para.includes(text))) {
    throw new Error(`Pull quote is not in ${review.name}'s review: ${text}`);
  }
  const p = review.photos[photo];
  return (
    <figure className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-10 items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.src} alt={p.alt} loading="lazy" className="w-full rounded-lg shadow-md aspect-[4/5] object-cover" />
      <div>
        <p className="text-sm uppercase tracking-widest text-[var(--gold)] font-semibold">
          {es ? "Desde el hogar de un cliente" : "From a customer’s home"}
        </p>
        <blockquote className="mt-4 text-2xl md:text-3xl font-semibold leading-snug text-stone-900">
          “{translation ?? text}”
        </blockquote>
        <figcaption className="mt-5 text-stone-600">
          <span className="font-semibold text-stone-900">— {review.name}</span>
          {review.location && `, ${review.location}`} · {es ? "cliente verificado" : "verified buyer"}
          {translation && <span className="block mt-1 text-sm">Traducción del original en inglés: “{text}”</span>}
          <Link href={`/products/${review.sku}#reviews-heading`} className="block mt-2 text-sm text-[var(--accent)] underline">
            {es ? `Leer la reseña completa de ${review.name} (en inglés) →` : `Read ${review.name}’s full review →`}
          </Link>
        </figcaption>
      </div>
    </figure>
  );
}
