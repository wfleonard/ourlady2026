import Link from "next/link";
import { requireAdmin } from "@/lib/adminAuth";
import { reviews, byline } from "@/lib/reviews";
import { CARD_FORMATS, type CardFormat } from "@/lib/reviewCard";
import { MailerNav } from "../mailer/ui";

export const metadata = { robots: { index: false, follow: false } };

/**
 * Every review as ready-to-post images: one card per pull quote, each in the
 * three social sizes. Pick the photo with ?photo=<n> on the card links.
 */
export default async function ReviewCardsPage() {
  await requireAdmin();
  const formats = Object.entries(CARD_FORMATS) as [CardFormat, (typeof CARD_FORMATS)[CardFormat]][];

  return (
    <>
      <MailerNav active="reviews" />
      <p className="text-sm text-stone-600 mb-8 max-w-3xl">
        Download a card and post it. Each quote alternates between the review’s photos. Link the post to the
        review’s page — when shared, that page previews as its own card. New reviews go in{" "}
        <code>app/src/lib/reviews.ts</code> and get cards here automatically.
      </p>

      {reviews.map((r) => {
        const page = `/reviews/${r.slug}`;
        return (
          <section key={r.slug} className="mb-14">
            <h2 className="font-semibold text-lg">{byline(r)}</h2>
            <p className="text-sm text-stone-500 mb-4">
              Post link:{" "}
              <Link href={page} className="underline" target="_blank">
                primosmaternos.com{page}
              </Link>
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {r.pullQuotes.map((q, i) => {
                const photo = i % r.photos.length;
                const card = (f: CardFormat) => `${page}/card?format=${f}&q=${i}&photo=${photo}`;
                return (
                  <div key={i} className="border border-stone-200 rounded-lg overflow-hidden bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={card("feed")} alt={`Card: ${q}`} loading="lazy" className="w-full aspect-[4/5] object-cover bg-stone-100" />
                    <div className="p-3 text-sm space-y-1">
                      <p className="text-stone-500 text-xs">Quote {i + 1} · photo {photo + 1}</p>
                      {formats.map(([f, { label }]) => (
                        <a key={f} href={`${card(f)}&download=1`} className="block underline hover:text-[var(--accent)]">
                          ↓ {label}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </>
  );
}
