import Link from "next/link";
import type { Review } from "@/lib/reviews";

/**
 * One review, cut down for a landing page: a single photo, the paragraph that
 * speaks to that page's reader as the pull quote, and a link to the full review
 * on the product page.
 */
export function ReviewHighlight({ review, quote, photo = 0 }: { review: Review; quote: number; photo?: number }) {
  const p = review.photos[photo];
  return (
    <figure className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-10 items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.src} alt={p.alt} loading="lazy" className="w-full rounded-lg shadow-md aspect-[4/5] object-cover" />
      <div>
        <p className="text-sm uppercase tracking-widest text-[var(--gold)] font-semibold">
          From a customer’s home
        </p>
        <blockquote className="mt-4 text-2xl md:text-3xl font-semibold leading-snug text-stone-900">
          “{review.paragraphs[quote]}”
        </blockquote>
        <figcaption className="mt-5 text-stone-600">
          <span className="font-semibold text-stone-900">— {review.name}</span>
          {review.location && `, ${review.location}`} · verified buyer
          <Link href={`/products/${review.sku}#reviews-heading`} className="block mt-2 text-sm text-[var(--accent)] underline">
            Read {review.name}’s full review →
          </Link>
        </figcaption>
      </div>
    </figure>
  );
}
