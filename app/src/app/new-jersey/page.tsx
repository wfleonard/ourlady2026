import Link from "next/link";
import { listProducts, formatPrice, type Product } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import { JsonLd } from "@/components/JsonLd";
import { ORG, SITE_URL, absoluteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Lady of Guadalupe Canvas in New Jersey — Primos Maternos",
  description:
    "Our Lady of Guadalupe canvases from Tinton Falls, Monmouth County. Free shipping anywhere in New Jersey, for homes, parishes and Catholic schools in all five NJ dioceses.",
  alternates: { canonical: "/new-jersey" },
};

/**
 * New Jersey's twenty-one counties divide into five Latin-rite dioceses, and a
 * parish buyer thinks in those terms before they think in counties. Listing
 * them is also the plainest way to answer "do you serve my area": we serve all
 * of it, and here is the whole of it named.
 */
const DIOCESES = [
  {
    name: "Diocese of Trenton",
    counties: "Burlington, Mercer, Monmouth, Ocean",
    note: "Our own diocese. Tinton Falls sits in Monmouth County.",
  },
  {
    name: "Archdiocese of Newark",
    counties: "Bergen, Essex, Hudson, Union",
    note: null,
  },
  {
    name: "Diocese of Metuchen",
    counties: "Hunterdon, Middlesex, Somerset, Warren",
    note: null,
  },
  {
    name: "Diocese of Paterson",
    counties: "Morris, Passaic, Sussex",
    note: null,
  },
  {
    name: "Diocese of Camden",
    counties: "Atlantic, Camden, Cape May, Cumberland, Gloucester, Salem",
    note: null,
  },
];

const faq = [
  {
    q: "Where can I buy an Our Lady of Guadalupe canvas in New Jersey?",
    a: "From Primos Maternos, based in Tinton Falls in Monmouth County. We print on canvas from a digital archive of the Sacred Original certified in Mexico in 1998 as a faithful reproduction, and ship free anywhere in New Jersey, in three sizes: 12 by 18 inches, 24 by 36, and 36 by 54.",
  },
  {
    q: "Do you ship to my part of New Jersey?",
    a: "Yes, to every county in the state, and shipping is free. That covers all five New Jersey dioceses: Trenton, the Archdiocese of Newark, Metuchen, Paterson and Camden.",
  },
  {
    q: "Can a New Jersey parish or Catholic school order in quantity?",
    a: "Yes. Parishes, schools and diocesan offices order the 24 by 36 inch rolled canvas most often, because it ships flat in a tube and can be framed to match the building. Diocesan orders can be invoiced against a purchase order.",
  },
  {
    q: "Is Primos Maternos a local New Jersey business?",
    a: "Yes. Primos Maternos is operated by Saxon Enterprises, Inc. of Tinton Falls, New Jersey. The image lineage is Mexican and the canvases are printed in the United States; the business itself is in Monmouth County.",
  },
  {
    q: "When should a New Jersey parish order for the December 12 feast?",
    a: "Order by late November. The feast of Our Lady of Guadalupe falls on December 12, the novena runs December 3 through 11, and a rolled canvas usually needs framing or stretching after it arrives, which is the step people forget to leave time for.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/new-jersey#faq`,
  mainEntity: faq.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

/**
 * Says in structured form what the prose says: a New Jersey business whose
 * service area is the state. Points at the Organization in the layout rather
 * than describing the business twice.
 */
const localJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/new-jersey`,
  url: absoluteUrl("/new-jersey"),
  name: "Our Lady of Guadalupe Canvas in New Jersey",
  about: { "@id": `${SITE_URL}/#organization` },
  provider: {
    "@id": `${SITE_URL}/#organization`,
  },
  areaServed: {
    "@type": "State",
    name: "New Jersey",
    containedInPlace: { "@type": "Country", name: "United States" },
  },
};

export default async function NewJerseyPage() {
  let products: Product[] = [];
  try {
    products = await listProducts();
  } catch {
    products = [];
  }

  const rolled24 = products.find((p) => p.sku === "olg-24x36-rolled");

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={localJsonLd} />

      <section className="border-b border-stone-200 bg-gradient-to-b from-stone-50 to-[var(--background)]">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <p className="text-sm uppercase tracking-widest text-[var(--gold)] font-semibold">
            Tinton Falls · Monmouth County
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto">
            Our Lady of Guadalupe canvases, made by a New Jersey business
          </h1>
          <p className="mt-5 text-lg text-stone-700 leading-relaxed max-w-2xl mx-auto">
            Primos Maternos is in {ORG.city}, {ORG.state}. We print the tilma image on canvas from
            a digital archive of the Sacred Original certified in Mexico in 1998 as a faithful
            reproduction, and ship it free to every county in the state.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-14 space-y-14 text-stone-700 leading-relaxed">
        <section>
          <h2 className="text-2xl md:text-3xl font-bold">Where we are, and what that means</h2>
          <p className="mt-4">
            Saxon Enterprises, Inc., trading as Primos Maternos, operates from{" "}
            <strong>Tinton Falls in Monmouth County</strong>. Orders ship from here, and shipping
            within New Jersey is free, as it is to the rest of the 50 states and Puerto Rico.
          </p>
          <p className="mt-4">
            Two things about this image are worth being exact about, because most sellers are
            not. The image lineage is Mexican: it descends from a digital archive of the Sacred
            Original that Cardinal Norberto Rivera Carrera certified in 1998 as a faithful
            reproduction. The canvas itself is printed in the United States. Both Mexican
            certifications travel with every order, and{" "}
            <Link href="/authenticity" className="text-[var(--accent)] underline">
              both are published in full
            </Link>{" "}
            so you can read them before you buy anything.
          </p>
          <p className="mt-4">
            If you need to arrange something locally rather than ship, write to{" "}
            <a href={`mailto:${ORG.email}`} className="text-[var(--accent)] underline">
              {ORG.email}
            </a>{" "}
            and say what you need.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold">
            Every diocese in New Jersey, and every county
          </h2>
          <p className="mt-4">
            New Jersey&apos;s twenty-one counties fall under five Latin-rite dioceses. We ship to
            all of them, and parishes and schools in any of them can order in quantity.
          </p>
          <div className="mt-6 space-y-4">
            {DIOCESES.map(({ name, counties, note }) => (
              <div key={name} className="rounded-lg border border-stone-200 bg-white p-5">
                <h3 className="font-semibold text-stone-800">{name}</h3>
                <p className="mt-1 text-sm text-stone-600">{counties}</p>
                {note ? <p className="mt-2 text-sm text-[var(--accent)]">{note}</p> : null}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold">
            For New Jersey parishes, schools and diocesan offices
          </h2>
          <p className="mt-4">
            The 24&quot; × 36&quot; rolled canvas is what institutions order most, because it
            ships flat in a tube and can be framed to match the building it will hang in
            {rolled24 ? ` (${formatPrice(rolled24.price_cents)}, free shipping)` : ""}. The
            36&quot; × 54&quot; suits a chapel or a parish hall, where the piece is meant to be
            seen from across the room.
          </p>
          <p className="mt-4">
            Purchase-order invoicing is available for diocesan orders. There are pages written
            for each case:{" "}
            <Link href="/parishes" className="text-[var(--accent)] underline">
              parishes
            </Link>
            ,{" "}
            <Link href="/schools" className="text-[var(--accent)] underline">
              Catholic schools
            </Link>{" "}
            and{" "}
            <Link href="/dioceses" className="text-[var(--accent)] underline">
              diocesan programs
            </Link>
            .
          </p>
          <p className="mt-4">
            On size, resolution and what arrives in the box, the{" "}
            <Link href="/canvas-sizes" className="text-[var(--accent)] underline">
              size guide
            </Link>{" "}
            has the numbers: 575, 287.5 and 191.7 pixels per inch for the three sizes, with
            nothing enlarged to fill the canvas.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold">December 12 in New Jersey</h2>
          <p className="mt-4">
            The feast of Our Lady of Guadalupe is <strong>December 12</strong>, and the novena
            runs December 3 through 11. Parishes that order a rolled canvas need it in hand with
            time to stretch or frame it, so late November is the point to decide rather than the
            first week of December. The{" "}
            <Link href="/novena" className="text-[var(--accent)] underline">
              full novena
            </Link>{" "}
            is on the site to pray or print, free.
          </p>
        </section>

        {products.length > 0 ? (
          <section>
            <h2 className="text-2xl md:text-3xl font-bold">The canvases</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.sku} product={product} />
              ))}
            </div>
          </section>
        ) : null}

        <section>
          <h2 className="text-2xl md:text-3xl font-bold">Questions from New Jersey buyers</h2>
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
