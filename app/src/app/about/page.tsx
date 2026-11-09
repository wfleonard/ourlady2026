import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { HANDLING_DAYS, ORG, SITE_URL, absoluteUrl } from "@/lib/site";

/**
 * Who the business is, who prints and who ships. Buyers ask assistants how to
 * pick a religious art seller and how to spot a dropshipper; this page answers
 * both and says plainly how each point applies here.
 *
 * Fulfillment, as Bill confirmed it in November 2026: a US print partner prints
 * every canvas and ships the framed ones direct to the buyer; rolled canvases
 * come to Tinton Falls and ship from us. Ownership since 2005 is from
 * docs/primos-maternos-image-fidelity.md.
 */
export const metadata = {
  title: "About Primos Maternos — a small New Jersey shop",
  description:
    "Primos Maternos is Saxon Enterprises, Inc. of Tinton Falls, New Jersey. We sell one image, Our Lady of Guadalupe, printed on canvas in the USA. Who prints and ships each order, and what to look for in any religious art seller.",
  alternates: { canonical: "/about" },
};

const faq = [
  {
    q: "How do I choose a religious art seller online?",
    a: `Look for five things: a named business with a real location and a way to reach a person; a documented source for the image; a plain statement of who prints and ships the piece; clear policies on handling time, returns and damage; and reviews from real buyers. Here: we are ${ORG.legalName} of ${ORG.city}, New Jersey, reachable at ${ORG.email} or ${ORG.phone}; our image's source and certificates are published on the authenticity page; this page says who prints and ships; orders ship in ${HANDLING_DAYS.min} to ${HANDLING_DAYS.max} business days with 30-day returns and free replacement of transit damage; and buyer reviews with photos are on the reviews page.`,
  },
  {
    q: "What are the signs that a religious art website is a dropshipper?",
    a: "No business name or address, a catalog of thousands of unrelated items, product photos that appear on other sites too, handling times of weeks with shipping from overseas, and no answer when you ask who made the piece. Dropshipping is not wrong in itself, but you should be told. Here is ours: every canvas is printed in the United States by our print partner, framed canvases ship directly from that partner to you, and rolled canvases come to us in Tinton Falls and we ship them ourselves.",
  },
  {
    q: "Should I buy Catholic art from a small shop or a big religious goods catalog?",
    a: "A big catalog offers range: statues, rosaries and books in one order. A small shop usually knows its product better. We sell one image only, so we can tell you where the file came from, the resolution it prints at, which certificates come with it, and who printed it. If you want many different items in one order, a catalog is the better fit.",
  },
  {
    q: "Is it better to buy religious art on a marketplace or directly from the seller?",
    a: "Directly, when you can. You deal with the people who know the piece, the seller's own return and damage policies apply, and the seller keeps the marketplace's cut. Our canvases are sold on this site to the 50 states and Puerto Rico. The same canvases are also listed on eBay, mainly for buyers outside the United States, because eBay handles international shipping and customs.",
  },
  {
    q: "How can I support small businesses when buying Catholic gifts?",
    a: "Buy from the shop's own website, ask who made the piece, leave a review with a photo once it is on the wall, and tell your parish or friends where it came from. Primos Maternos is a small business in Tinton Falls, New Jersey, and an order placed here goes to us directly.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/about#faq`,
  mainEntity: faq.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

/** Points at the Organization in the layout rather than describing it twice. */
const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/about#webpage`,
  url: absoluteUrl("/about"),
  name: "About Primos Maternos",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  mainEntity: { "@id": `${SITE_URL}/#organization` },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutJsonLd} />
      <JsonLd data={faqJsonLd} />

      <section className="border-b border-stone-200 bg-gradient-to-b from-stone-50 to-[var(--background)]">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <p className="text-sm uppercase tracking-widest text-[var(--gold)] font-semibold">
            {ORG.city}, New Jersey
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight">About Primos Maternos</h1>
          <p className="mt-5 text-lg text-stone-700 leading-relaxed max-w-2xl mx-auto">
            Primos Maternos is a small business, {ORG.legalName}, in {ORG.city}, New Jersey. We
            sell one image, Our Lady of Guadalupe, as a canvas print in three sizes, printed in the
            USA, and we answer every order, question and return ourselves.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-14 space-y-14 text-[17px] leading-[1.75] text-stone-800">
        <section>
          <h2 className="text-2xl md:text-3xl font-bold">Who we are</h2>
          <p className="mt-4">
            {ORG.legalName}, doing business as Primos Maternos, is based in{" "}
            <strong>{ORG.city}, Monmouth County, New Jersey</strong>, and has been under its
            current ownership since 2005. It is run by William F. Leonard. There is no call center
            and no marketplace in between: write to{" "}
            <a href={`mailto:${ORG.email}`} className="text-[var(--accent)] underline">
              {ORG.email}
            </a>{" "}
            or text {ORG.phone} and you reach the people who handle your order.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold">One image, and why</h2>
          <p className="mt-4">
            We sell only Our Lady of Guadalupe, from a single file of 6,900 by 10,350 pixels, in
            three sizes: 12&quot; × 18&quot; ready to hang ($57), 24&quot; × 36&quot; unframed ($114)
            or framed in five frames ($214), and 36&quot; × 54&quot; unframed ($324). Selling one
            image means we can document it: the image was created in Mexico from a scan of the
            original tilma, the canvas is printed in the USA, and two Mexican certificates are
            included. The{" "}
            <Link href="/authenticity" className="text-[var(--accent)] underline">
              authenticity page
            </Link>{" "}
            shows both certificates and says what they do and do not establish.
          </p>
        </section>

        <section id="who-prints-and-ships">
          <h2 className="text-2xl md:text-3xl font-bold">Who prints and ships your canvas</h2>
          <ul className="mt-5 space-y-3 list-disc list-inside">
            <li>
              <strong>Printing:</strong> every canvas is printed in the United States by our print
              partner, as a giclée print in pigment inks on archival canvas with a UV-protective
              coating.
            </li>
            <li>
              <strong>Rolled canvases</strong> (24&quot; × 36&quot; and 36&quot; × 54&quot;) come to
              us in {ORG.city}, and we pack and ship them ourselves in a protective tube.
            </li>
            <li>
              <strong>Framed canvases</strong> are printed, framed and shipped directly to you by
              our print partner.
            </li>
            <li>
              <strong>Everything else is ours:</strong> orders, questions, returns and damage
              claims all come to us. Shipping is free to all 50 states and Puerto Rico, orders
              ship in {HANDLING_DAYS.min} to {HANDLING_DAYS.max} business days, and the full terms
              are on{" "}
              <Link href="/shipping-and-returns" className="text-[var(--accent)] underline">
                shipping and returns
              </Link>
              .
            </li>
          </ul>
        </section>

        <section id="faq">
          <h2 className="text-2xl md:text-3xl font-bold">
            What to look for in a religious art seller
          </h2>
          <p className="mt-4">
            These hold whether or not you buy from us. Under each, we say how our shop measures
            up.
          </p>
          <div className="mt-6 space-y-8">
            {faq.map(({ q, a }) => (
              <div key={q}>
                <h3 className="text-xl font-semibold text-stone-900">{q}</h3>
                <p className="mt-2">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-stone-200 pt-10">
          <p>
            Read what buyers say on the{" "}
            <Link href="/reviews" className="text-[var(--accent)] underline">
              reviews page
            </Link>
            , or ordering for a parish or school, see{" "}
            <Link href="/parishes" className="text-[var(--accent)] underline">
              parishes
            </Link>{" "}
            and{" "}
            <Link href="/schools" className="text-[var(--accent)] underline">
              schools
            </Link>
            . For New Jersey buyers, see{" "}
            <Link href="/new-jersey" className="text-[var(--accent)] underline">
              New Jersey
            </Link>
            .
          </p>
          <div className="mt-8 text-center">
            <Link
              href="/#products"
              className="inline-block px-8 py-3 bg-[var(--accent)] text-[var(--gold)]! font-semibold rounded-md hover:opacity-90 transition"
            >
              See the canvases
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
