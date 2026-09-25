import Link from "next/link";
import { listProducts, formatPrice, type Product } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Canvas Sizes: 12x18, 24x36 and 36x54 — Primos Maternos",
  description:
    "Which Our Lady of Guadalupe canvas size to buy, and what arrives. 12x18 gallery wrap, 24x36 framed or rolled, 36x54 rolled. Print resolution, viewing distance and hanging height for each.",
  alternates: { canonical: "/canvas-sizes" },
};

/**
 * The file is 6900 x 10350. Everything on this page about sharpness is that
 * number divided by the printed inches, so the table cannot drift away from
 * what we actually print.
 */
const FILE_WIDTH_PX = 6900;

type SizeRow = {
  size: string;
  label: string;
  inches: [number, number];
  /** What the piece is for, in one line. */
  suits: string;
  /** Rule of thumb: 1.5 to 2 times the diagonal. */
  viewing: string;
};

const SIZES: SizeRow[] = [
  {
    size: "12x18",
    label: '12" × 18"',
    inches: [12, 18],
    suits: "A home altar, a bedside wall, a classroom, a small office.",
    viewing: "3 to 4 feet",
  },
  {
    size: "24x36",
    label: '24" × 36"',
    inches: [24, 36],
    suits: "A living room, an entry hall, a parish office, a devotional corner.",
    viewing: "5 to 7 feet",
  },
  {
    size: "36x54",
    label: '36" × 54"',
    inches: [36, 54],
    suits: "A chapel, a parish hall, a sanctuary wall, a large stairwell.",
    viewing: "8 to 11 feet",
  },
];

function ppi(widthInches: number) {
  return Math.round(FILE_WIDTH_PX / widthInches);
}

function diagonal([w, h]: [number, number]) {
  return Math.round(Math.sqrt(w * w + h * h) * 10) / 10;
}

const faq = [
  {
    q: "What size Our Lady of Guadalupe canvas should I buy?",
    a: "Measure the wall first and work back from viewing distance. A 12 by 18 inch canvas reads well from three to four feet, which suits a home altar, a bedside wall or a classroom. A 24 by 36 reads from five to seven feet and is the usual choice for a living room, an entry hall or a parish office. A 36 by 54 is a room's centerpiece, meant for a chapel, a parish hall or a sanctuary wall seen from eight feet or more.",
  },
  {
    q: "Is the image cropped at different sizes?",
    a: "No. The file is 6,900 by 10,350 pixels, which is exactly 2:3, and all three sizes are 2:3 as well: 12 by 18, 24 by 36 and 36 by 54. The same full image fills every canvas, with nothing trimmed from the edges and nothing added to fill them.",
  },
  {
    q: "How sharp is the print at each size?",
    a: "The 12 by 18 prints at 575 pixels per inch, the 24 by 36 at 287, and the 36 by 54 at 192. Nothing is enlarged to fill the canvas at any size. Around 300 pixels per inch is the point past which a normal eye stops resolving detail at reading distance, so the 12 by 18 and the 24 by 36 hold up under close inspection, while the 36 by 54 is made for a wall you view from across a room.",
  },
  {
    q: "What is the difference between framed, gallery wrap, and rolled canvas?",
    a: "A framed canvas arrives stretched and finished in a wooden frame, ready to hang. A gallery wrap is stretched over 0.75 inch stretcher bars with no frame, and also hangs straight from the box. A rolled canvas ships in a protective tube and is printed on archival canvas for you to stretch and frame yourself, which is the usual choice when a parish or a buyer wants a specific frame.",
  },
  {
    q: "How high should a Guadalupe canvas be hung?",
    a: "Standard gallery practice is to center the image about 57 to 60 inches from the floor, which puts it at eye level for most adults standing. Above a home altar or a piece of furniture, hang it closer, leaving roughly 6 to 10 inches between the top of the furniture and the bottom of the canvas so the two read as one arrangement.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/canvas-sizes#faq`,
  mainEntity: faq.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default async function CanvasSizesPage() {
  let products: Product[] = [];
  try {
    products = await listProducts();
  } catch {
    products = [];
  }

  const bySize = (size: string) => products.filter((p) => p.size === size);
  const cheapest = (size: string) => {
    const prices = bySize(size).map((p) => p.price_cents);
    return prices.length ? formatPrice(Math.min(...prices)) : null;
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />

      <section className="border-b border-stone-200 bg-gradient-to-b from-stone-50 to-[var(--background)]">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <p className="text-sm uppercase tracking-widest text-[var(--gold)] font-semibold">
            Sizes
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto">
            Which size, and what arrives in the box
          </h1>
          <p className="mt-5 text-lg text-stone-700 leading-relaxed max-w-2xl mx-auto">
            Three sizes of the same image: 12&quot; × 18&quot;, 24&quot; × 36&quot; and 36&quot; ×
            54&quot;. Below is the resolution each one prints at, the distance it is meant to be
            seen from, and whether it arrives ready to hang or rolled in a tube.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-14 space-y-14 text-stone-700 leading-relaxed">
        <section>
          <h2 className="text-2xl md:text-3xl font-bold">
            The same full image at every size
          </h2>
          <p className="mt-4">
            The file we print from is <strong>6,900 by 10,350 pixels</strong>, which is exactly
            2:3. All three canvas sizes are 2:3 as well, so the whole image fills each one. Nothing
            is trimmed from the edges to make it fit, and nothing is enlarged to fill it out. What
            changes between the sizes is not the picture but how many pixels land in each inch of
            it.
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-stone-300">
                  <th className="py-3 pr-4 font-semibold">Size</th>
                  <th className="py-3 pr-4 font-semibold">Resolution</th>
                  <th className="py-3 pr-4 font-semibold">Diagonal</th>
                  <th className="py-3 pr-4 font-semibold">Best seen from</th>
                  <th className="py-3 font-semibold">From</th>
                </tr>
              </thead>
              <tbody>
                {SIZES.map((row) => (
                  <tr key={row.size} className="border-b border-stone-200 align-top">
                    <td className="py-4 pr-4 font-semibold text-stone-800 whitespace-nowrap">
                      {row.label}
                    </td>
                    <td className="py-4 pr-4 whitespace-nowrap">{ppi(row.inches[0])} ppi</td>
                    <td className="py-4 pr-4 whitespace-nowrap">{diagonal(row.inches)}&quot;</td>
                    <td className="py-4 pr-4">{row.viewing}</td>
                    <td className="py-4 whitespace-nowrap">
                      {cheapest(row.size) ?? <span className="text-stone-400">&mdash;</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-sm text-stone-500">
            Resolution is the file width divided by the printed width, with no enlargement at any
            size. Viewing distance follows the usual rule of one and a half to two times the
            diagonal.
          </p>

          <p className="mt-6">
            Around 300 pixels per inch is where a normal eye stops picking out more detail at
            reading distance. The 12&quot; × 18&quot; is comfortably past that and the 24&quot; ×
            36&quot; sits right at it, so both hold up when someone steps close, which is what
            people do with this image. The 36&quot; × 54&quot; prints at 192, which is normal for
            a canvas of that size and is made for a wall you take in from across a room rather
            than at arm&apos;s length.
          </p>
          <p className="mt-4">
            You can check that claim instead of accepting it.{" "}
            <Link href="/authenticity" className="text-[var(--accent)] underline">
              Full-size crops of the face, the stars, the gold edging and the weave
            </Link>{" "}
            are published at one pixel per pixel, cut straight from the file we print.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold">What arrives, and what you do</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            <div className="rounded-lg border border-stone-200 bg-white p-5">
              <h3 className="font-semibold text-stone-800">Framed</h3>
              <p className="mt-2 text-sm">
                Stretched and finished in a wooden frame, ready to hang. Offered at 24&quot; ×
                36&quot; in gold, cherry, beaded mahogany, black red oak and silver ornate.
              </p>
            </div>
            <div className="rounded-lg border border-stone-200 bg-white p-5">
              <h3 className="font-semibold text-stone-800">Gallery wrap</h3>
              <p className="mt-2 text-sm">
                Stretched over 0.75&quot; bars with no frame, hung straight from the box. Offered
                at 12&quot; × 18&quot;, and the simplest thing to give as a gift.
              </p>
            </div>
            <div className="rounded-lg border border-stone-200 bg-white p-5">
              <h3 className="font-semibold text-stone-800">Rolled</h3>
              <p className="mt-2 text-sm">
                Printed on archival canvas and shipped in a protective tube for you to stretch and
                frame. Offered at 24&quot; × 36&quot; and 36&quot; × 54&quot;, and the usual
                choice when a frame has to match a room.
              </p>
            </div>
          </div>
          <p className="mt-6">
            Every canvas ships with both Mexican certifications, whichever size and finish you
            choose.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold">Where each size goes</h2>
          <ul className="mt-5 space-y-3 list-disc list-inside">
            {SIZES.map((row) => (
              <li key={row.size}>
                <strong>{row.label}.</strong> {row.suits}
              </li>
            ))}
          </ul>
          <p className="mt-6">
            For hanging, center the image about <strong>57 to 60 inches</strong> from the floor,
            which is eye level for most adults standing. Over a home altar or a chest, hang it
            lower, leaving roughly 6 to 10 inches between the top of the furniture and the bottom
            of the canvas so the two read as a single arrangement rather than two separate things.
          </p>
        </section>

        {SIZES.map((row) => {
          const items = bySize(row.size);
          if (!items.length) return null;
          return (
            <section key={row.size}>
              <h2 className="text-2xl md:text-3xl font-bold">{row.label}</h2>
              <p className="mt-3 text-stone-600">
                {ppi(row.inches[0])} ppi · best seen from {row.viewing} · {row.suits}
              </p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((product) => (
                  <ProductCard key={product.sku} product={product} />
                ))}
              </div>
            </section>
          );
        })}

        <section>
          <h2 className="text-2xl md:text-3xl font-bold">Questions about size</h2>
          <dl className="mt-6 space-y-6">
            {faq.map(({ q, a }) => (
              <div key={q}>
                <dt className="font-semibold text-stone-800">{q}</dt>
                <dd className="mt-2">{a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </>
  );
}
