import Link from "next/link";
import { reviews, byline } from "@/lib/reviews";
import { ReviewBlock } from "@/components/Reviews";
import { absoluteUrl } from "@/lib/site";

const first = reviews[0];

export const metadata = {
  alternates: { canonical: "/reviews" },
  title: "Customer Reviews — Primos Maternos",
  description:
    "Photos and words from families and parishes who hung the Our Lady of Guadalupe tilma canvas in their homes.",
  openGraph: first && {
    type: "website",
    url: absoluteUrl("/reviews"),
    title: "In their homes — Primos Maternos customer reviews",
    images: [{ url: absoluteUrl(`/reviews/${first.slug}/card?format=link`), width: 1200, height: 630, alt: `Review from ${byline(first)}` }],
  },
};

export default function ReviewsIndex() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <p className="text-sm uppercase tracking-widest text-[var(--gold)] font-semibold">
        From our customers
      </p>
      <h1 className="mt-2 text-4xl md:text-5xl font-bold leading-tight">In their homes</h1>
      <p className="mt-4 text-lg text-stone-700 max-w-2xl">
        Photos and words from the families and parishes who hung the image of Our Lady of
        Guadalupe. Every review is from a buyer, posted with their permission.
      </p>

      <div className="mt-12 space-y-16">
        {reviews.map((r) => (
          <div key={r.slug}>
            <ReviewBlock review={r} />
            <p className="mt-4 text-right">
              <Link href={`/reviews/${r.slug}`} className="text-sm text-[var(--accent)] underline">
                Share {r.name}’s review →
              </Link>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 pt-8 border-t border-stone-200 text-center">
        <Link
          href="/#products"
          className="inline-block px-6 py-3 bg-[var(--accent)] text-white font-semibold rounded-md hover:opacity-90 transition"
        >
          Browse the collection →
        </Link>
      </div>
    </div>
  );
}
