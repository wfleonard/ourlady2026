import Link from "next/link";
import { reviews } from "@/lib/reviews";

/** "In their homes" — customer reviews with photos, shown on every product page. */
export function Reviews() {
  if (reviews.length === 0) return null;
  return (
    <section className="mt-20 pt-12 border-t border-stone-200" aria-labelledby="reviews-heading">
      <p className="text-sm uppercase tracking-widest text-[var(--gold)] font-semibold">
        From our customers
      </p>
      <h2 id="reviews-heading" className="mt-2 text-3xl font-bold leading-tight">
        In their homes
      </h2>

      <div className="mt-8 space-y-12">
        {reviews.map((r) => (
          <figure key={r.name + r.received} className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-8 items-start">
            <div className="grid grid-cols-2 gap-3">
              {r.photos.map((p) => (
                <a key={p.src} href={p.src} target="_blank" rel="noopener" className="block bg-stone-50 rounded-lg overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.src} alt={p.alt} loading="lazy" className="w-full h-full object-cover aspect-[3/4] hover:scale-[1.02] transition-transform" />
                </a>
              ))}
            </div>
            <div>
              <blockquote className="text-[17px] leading-[1.75] text-stone-800 space-y-4 border-l-4 border-[var(--accent)] pl-5">
                {r.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </blockquote>
              <figcaption className="mt-5 pl-5 text-sm text-stone-600">
                <span className="font-semibold text-stone-900">— {r.name}</span>
                {r.location && `, ${r.location}`} · verified buyer · {r.received}
                <span className="block mt-1">
                  Bought:{" "}
                  <Link href={`/products/${r.sku}`} className="underline hover:text-[var(--accent)]">
                    {r.productLabel}
                  </Link>
                </span>
              </figcaption>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
