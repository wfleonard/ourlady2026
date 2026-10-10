import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getReview, byline, reviews } from "@/lib/reviews";
import { ReviewBlock } from "@/components/Reviews";
import { absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return reviews.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const review = getReview((await params).slug);
  if (!review) return { title: "Review not found — Primos Maternos" };
  const url = `/reviews/${review.slug}`;
  const title = `“${review.pullQuotes[0]}” — ${byline(review)}`;
  // The shared link previews as the review's own card, not a generic logo.
  const card = { url: absoluteUrl(`${url}/card?format=link`), width: 1200, height: 630, alt: `Review from ${byline(review)}` };
  return {
    title: `Review from ${byline(review)} — Primos Maternos`,
    description: review.pullQuotes[0],
    alternates: { canonical: url },
    openGraph: { type: "article", url: absoluteUrl(url), title, description: `A ${review.productLabel} Our Lady of Guadalupe canvas in a customer’s home.`, images: [card] },
    twitter: { card: "summary_large_image", title, images: [card.url] },
  };
}

export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const review = getReview((await params).slug);
  if (!review) notFound();
  const pageUrl = absoluteUrl(`/reviews/${review.slug}`);
  const shareText = `“${review.pullQuotes[0]}” — ${byline(review)}`;
  const share = [
    ["Facebook", `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`],
    ["X", `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`],
    ["Email", `mailto:?subject=${encodeURIComponent("Our Lady of Guadalupe in a family's home")}&body=${encodeURIComponent(`${shareText}\n\n${pageUrl}`)}`],
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Link href="/reviews" className="text-sm text-stone-500 hover:text-[var(--accent)]">
        ← All reviews
      </Link>
      <h1 className="mt-6 text-3xl md:text-4xl font-bold leading-tight max-w-3xl">
        “{review.pullQuotes[0]}”
      </h1>
      <p className="mt-3 text-stone-600">{byline(review)} · verified buyer</p>

      <div className="mt-10">
        <ReviewBlock review={review} />
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3 text-sm">
        <span className="text-stone-500">Share:</span>
        {share.map(([label, href]) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="border border-stone-300 rounded px-3 py-1.5 hover:bg-stone-100">
            {label}
          </a>
        ))}
      </div>

      <div className="mt-16 pt-8 border-t border-stone-200 text-center">
        <p className="text-stone-600 mb-4">{review.name}’s canvas: the {review.productLabel}.</p>
        <Link
          href={`/products/${review.sku}`}
          className="inline-block px-6 py-3 bg-[var(--accent)] text-white font-semibold rounded-md hover:opacity-90 transition"
        >
          See this canvas →
        </Link>
      </div>
    </div>
  );
}
