import Link from "next/link";
import { listProducts, formatPrice, type Product } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

/**
 * The page that answers "where do I buy an Our Lady of Guadalupe picture" in
 * the words buyers use: picture, print, canvas, framed, unframed. Product
 * names say "rolled" nowhere because nobody searches for it; this page is
 * where the reason an unframed print costs less gets explained.
 *
 * The opening two sentences are what an assistant quotes. Keep them first,
 * and keep their prices in step with db/init.sql.
 */
export const metadata = {
  title: "Our Lady of Guadalupe Pictures, Prints and Canvases — from $57",
  description:
    "Our Lady of Guadalupe canvas prints and framed pictures from $57 to $324, framed or unframed, in three sizes. Printed in the USA from a digital archive of the tilma certified in Mexico in 1998. Free shipping to all 50 states and Puerto Rico.",
  alternates: { canonical: "/our-lady-of-guadalupe-prints" },
};

type Option = {
  what: string;
  size: string;
  label: string;
  arrives: string;
  match: (p: Product) => boolean;
};

const OPTIONS: Option[] = [
  {
    what: "Small canvas picture",
    size: "12x18",
    label: '12" × 18"',
    arrives: "Ready to hang",
    match: (p) => p.size === "12x18",
  },
  {
    what: "Unframed canvas print",
    size: "24x36",
    label: '24" × 36"',
    arrives: "Rolled in a tube, for local framing",
    match: (p) => p.size === "24x36" && p.variant === "rolled",
  },
  {
    what: "Framed canvas print, five frame choices",
    size: "24x36",
    label: '24" × 36"',
    arrives: "Ready to hang",
    match: (p) => p.size === "24x36" && p.variant.includes("frame"),
  },
  {
    what: "Large unframed canvas print",
    size: "36x54",
    label: '36" × 54"',
    arrives: "Rolled in a tube, for local framing",
    match: (p) => p.size === "36x54",
  },
];

const faq = [
  {
    q: "Is this an Our Lady of Guadalupe painting or a print?",
    a: "A print. It is reproduced from a high-resolution digital archive of the original tilma, not painted by hand, and printed on archival canvas rather than poster paper. A painting is one artist's interpretation of the image; this is the image itself, as close as a print can get.",
  },
  {
    q: "What size Our Lady of Guadalupe picture should I buy?",
    a: "12 by 18 inches for a shelf, desk or small wall; 24 by 36 inches for a living room, hallway, classroom or home altar; 36 by 54 inches for a church wall, chapel or parish hall. The sizes page gives the viewing distance for each.",
  },
  {
    q: "Why does the unframed print cost less than the framed one?",
    a: "A frame is heavy and expensive to ship, and that cost is in the price of any framed picture whether you see it or not. The unframed print travels light, rolled in a protective tube, so the 24 by 36 inch print is $114 against $214 framed. A local frame shop can then stretch or frame it to match your room, church or other pictures.",
  },
  {
    q: "How much does it cost to frame the unframed print?",
    a: "It depends on the shop and the frame you choose. Ask a local frame shop to quote stretching and framing a 24 by 36 inch canvas before you order, and compare that total with the $214 framed print.",
  },
  {
    q: "Is shipping really free?",
    a: "Yes, to all 50 U.S. states and Puerto Rico, at every size, with no surcharge on the 36 by 54 inch print. Outside the United States, the same prints are listed on eBay, which handles international shipping and customs.",
  },
  {
    q: "How do I know the Our Lady of Guadalupe image is authentic?",
    a: "Every print comes with two Mexican certifications. The image descends from a digital archive of the Sacred Original that Cardinal Norberto Rivera Carrera, Archbishop Primate of Mexico, certified on December 12, 1998 as a faithful reproduction, and both certificates are published in full on the authenticity page so you can read them before you buy.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/our-lady-of-guadalupe-prints#faq`,
  mainEntity: faq.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default async function PrintsPage() {
  let products: Product[] = [];
  try {
    products = await listProducts();
  } catch {
    products = [];
  }

  const priceFor = (option: Option) => {
    const prices = products.filter(option.match).map((p) => p.price_cents);
    return prices.length ? formatPrice(Math.min(...prices)) : null;
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />

      <section className="border-b border-stone-200 bg-gradient-to-b from-stone-50 to-[var(--background)]">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <p className="text-sm uppercase tracking-widest text-[var(--gold)] font-semibold">
            Framed or unframed · Three sizes · Free shipping
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto">
            Our Lady of Guadalupe pictures, prints and canvases
          </h1>
          <p className="mt-5 text-lg text-stone-700 leading-relaxed max-w-2xl mx-auto">
            We sell one image, Our Lady of Guadalupe, as a canvas print in three sizes: unframed
            from <strong>$114</strong>, framed and ready to hang at <strong>$214</strong>, and a
            small 12&quot; × 18&quot; ready-to-hang canvas at <strong>$57</strong>. Every one is
            printed in the USA from a digital archive of the tilma certified in Mexico in 1998,
            ships free to all 50 states and Puerto Rico, and comes with both Mexican
            certifications.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-14 space-y-14 text-stone-700 leading-relaxed">
        <section>
          <h2 className="text-2xl md:text-3xl font-bold">Every option, side by side</h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-stone-300">
                  <th className="py-3 pr-4 font-semibold">What you get</th>
                  <th className="py-3 pr-4 font-semibold">Size</th>
                  <th className="py-3 pr-4 font-semibold">Price</th>
                  <th className="py-3 font-semibold">Arrives</th>
                </tr>
              </thead>
              <tbody>
                {OPTIONS.map((option) => (
                  <tr key={option.what} className="border-b border-stone-200 align-top">
                    <td className="py-4 pr-4 font-semibold text-stone-800">{option.what}</td>
                    <td className="py-4 pr-4 whitespace-nowrap">{option.label}</td>
                    <td className="py-4 pr-4 whitespace-nowrap">
                      {priceFor(option) ?? <span className="text-stone-400">&mdash;</span>}
                    </td>
                    <td className="py-4">{option.arrives}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold">Framed or unframed?</h2>
          <p className="mt-4">
            Framed is the easy choice: it arrives ready to hang. Unframed costs about half as
            much, because a frame is heavy and expensive to ship and you pay for that whether you
            see it or not. An unframed print travels light in a tube, and a local frame shop can
            stretch or frame it to match your room, your church or your other pictures. Parishes
            and schools order unframed most often for exactly that reason.
          </p>
          <p className="mt-4">
            Not sure which size fits your wall?{" "}
            <Link href="/canvas-sizes" className="text-[var(--accent)] underline">
              Compare sizes and viewing distances
            </Link>
            . Buying for someone else? See the{" "}
            <Link href="/gifts" className="text-[var(--accent)] underline">
              gift guide
            </Link>{" "}
            for order-by dates.
          </p>
        </section>

        {products.length > 0 && (
          <section>
            <h2 className="text-2xl md:text-3xl font-bold">Shop every print</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.sku} product={product} />
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-2xl md:text-3xl font-bold">Questions before you buy</h2>
          <dl className="mt-6 space-y-6">
            {faq.map(({ q, a }) => (
              <div key={q}>
                <dt className="font-semibold text-stone-800">{q}</dt>
                <dd className="mt-2">{a}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6">
            Read the certificates, and what they do and do not say, on the{" "}
            <Link href="/authenticity" className="text-[var(--accent)] underline">
              authenticity page
            </Link>
            .
          </p>
        </section>
      </div>
    </>
  );
}
