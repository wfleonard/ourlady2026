import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export const metadata = {
  title: "How to tell if a Guadalupe print is authentic — Primos Maternos",
  description:
    "What to ask any seller, why Our Lady of Guadalupe prints look so different from each other, and the two Mexican certifications behind the image we print: Cardinal Rivera's 1998 certificate of faithful reproduction and the Virgen Peregrina blessed by John Paul II in 1999.",
  alternates: { canonical: "/authenticity" },
};

/**
 * The questions buyers actually ask, answered on the page and repeated here so
 * search engines and assistants can read them without parsing the prose.
 */
const faq = [
  {
    q: "How can I tell if an Our Lady of Guadalupe print is authentic and not a fake?",
    a: "No print is the tilma itself, so authenticity means one thing only: can the seller document where the digital image came from? Ask which digital archive the file came from, what certifications came with it, and whether the seller will show you those documents. A seller who cannot answer is selling a copy of a copy.",
  },
  {
    q: "Why do Our Lady of Guadalupe prints look so different from each other?",
    a: "Most prints on the market descend from photographs of photographs. Each generation loses detail and shifts color, which is why the face, the gold edging, and the stars on the mantle vary so much between sellers. A print made from a high-resolution digital archive of the original keeps detail that a re-photographed copy has already lost.",
  },
  {
    q: "What documents come with a Primos Maternos canvas?",
    a: "Two Mexican certifications. The first, dated December 12, 1998 and signed by Cardinal Norberto Rivera Carrera, Archbishop Primate of Mexico, certifies a print as a faithful reproduction of the digital archive of the Sacred Original. The second records that the image known as the Virgen Peregrina was blessed by Pope John Paul II on January 25, 1999 and traveled throughout Mexico until April 2000 for the Great Jubilee.",
  },
  {
    q: "Was my canvas itself blessed?",
    a: "No, and we will not say otherwise. The 1999 blessing was of the Virgen Peregrina image during Pope John Paul II's visit to Mexico. The certifications document the history of the image our prints descend from; they do not mean that any individual canvas printed today was examined, certified, or blessed.",
  },
  {
    q: "Where are the canvases printed?",
    a: "In the United States. The image lineage is Mexican; the printing is not.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/authenticity#faq`,
  mainEntity: faq.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const lineage = [
  ["Sacred Original Image", "Basilica of Our Lady of Guadalupe, Mexico City"],
  ["Digital archive capture and reproduction", "Digital Color, S.A. de C.V., Mexico"],
  [
    "Certified a faithful reproduction",
    "Cardinal Norberto Rivera Carrera, Archbishop Primate of Mexico · December 12, 1998",
  ],
  ["Virgen Peregrina blessed", "Pope John Paul II · January 25, 1999"],
  ["Great Jubilee pilgrimage through Mexico", "January 1999 – April 2000"],
  ["Primos Maternos canvas", "Printed in the United States"],
];

export default function AuthenticityPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />

      <section className="border-b border-stone-200 bg-gradient-to-b from-stone-50 to-[var(--background)]">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <p className="text-sm uppercase tracking-widest text-[var(--gold)] font-semibold">
            Provenance and certification
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight">
            How to tell if a Guadalupe print is authentic
          </h1>
          <p className="mt-5 text-lg text-stone-700 leading-relaxed">
            No print is the tilma itself. Authenticity means one thing: whether the seller can
            document where the digital image came from. Ours descends from a digital archive of
            the Sacred Original that Cardinal Norberto Rivera Carrera, Archbishop Primate of
            Mexico, certified on December 12, 1998 as a faithful reproduction — and we show you
            the certificates rather than asking you to take our word for it.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-14 space-y-14 text-[17px] leading-[1.75] text-stone-800">
        <section>
          <h2 className="text-2xl md:text-3xl font-bold">What to ask any seller</h2>
          <p className="mt-4">
            This works whether or not you buy from us. Four questions separate a documented
            image from a copy of a copy:
          </p>
          <ol className="mt-5 space-y-3 list-decimal list-inside">
            <li>
              <strong>Where did the digital file come from?</strong> A seller should be able to
              name the archive or the source, not just say &ldquo;from the tilma.&rdquo;
            </li>
            <li>
              <strong>What documents come with it?</strong> Ask to see them before you buy, at a
              resolution you can actually read.
            </li>
            <li>
              <strong>Who certified what, and when?</strong> A name and a date can be checked. A
              phrase like &ldquo;Church approved&rdquo; on its own cannot.
            </li>
            <li>
              <strong>Is the claim about the image or about this print?</strong> A blessing of an
              image in 1999 is not a blessing of a canvas printed last week. Any seller who
              blurs the two is telling you something about themselves.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold">
            Why Our Lady of Guadalupe prints look so different from each other
          </h2>
          <p className="mt-4">
            Put two Guadalupe prints side by side and they often look like different paintings.
            The reason is generational loss. Most images on the market are photographs of
            photographs, sometimes four or five copies deep, and each pass loses fine detail,
            hardens the edges, and pushes the color — usually warmer and more saturated than the
            cloth has ever been.
          </p>
          <p className="mt-4">
            What survives that process badly is exactly what devotion looks closely at:
          </p>
          <ul className="mt-5 space-y-2 list-disc list-inside">
            <li>
              <strong>The face.</strong> Softness and the modeling around the eyes and mouth go
              first. A heavily copied print looks flatter, and slightly wrong in a way that is
              hard to name.
            </li>
            <li>
              <strong>The stars on the mantle.</strong> Crisp and individually shaped in a
              high-resolution scan; blurred, merged, or repainted in a copy.
            </li>
            <li>
              <strong>The gold edging and the rays.</strong> Fine lines thicken and lose
              separation with every generation.
            </li>
            <li>
              <strong>The weave of the cloth.</strong> The fiber texture is visible in a scan
              made from the original. Copies lose it entirely, which is why they can look
              printed rather than woven.
            </li>
          </ul>
          <p className="mt-4">
            Our file comes from the digital archive described below, so those details are still
            there at full size. It is the difference you notice at arm&apos;s length from a
            24&quot; × 36&quot; canvas, and the reason we would rather show the image large than
            describe it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold">Where our image comes from</h2>
          <ol className="mt-6 space-y-4">
            {lineage.map(([step, detail], index) => (
              <li key={step} className="flex gap-4">
                <span className="flex-none w-7 h-7 rounded-full bg-[var(--accent)] text-white text-sm font-semibold flex items-center justify-center">
                  {index + 1}
                </span>
                <span>
                  <strong>{step}</strong>
                  <br />
                  <span className="text-stone-600">{detail}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold">
            The 1998 certificate of faithful reproduction
          </h2>
          <p className="mt-4">
            A Mexican certification dated <strong>December 12, 1998</strong>, signed by Cardinal
            Norberto Rivera Carrera, Archbishop Primate of Mexico, states:
          </p>
          <blockquote className="mt-5 border-l-4 border-[var(--accent)] pl-5 italic text-stone-700">
            &ldquo;Certifico que la presente impresión es una reproducción fiel del archivo
            digital del Sagrado Original de la Imagen de Nuestra Señora de Guadalupe.&rdquo;
            <span className="block mt-3 not-italic text-stone-600">
              &ldquo;I certify that this print is a faithful reproduction of the digital archive
              of the Sacred Original of the Image of Our Lady of Guadalupe.&rdquo;
            </span>
          </blockquote>
          <p className="mt-5">
            At the foot of the certificate:{" "}
            <em>&ldquo;Captura del archivo digital y reproducción: DIGITAL COLOR S.A. DE
            C.V.&rdquo;</em> — &ldquo;Digital archive capture and reproduction: Digital Color,
            S.A. de C.V.&rdquo;
          </p>
          <p className="mt-4">
            Three things follow from it, and only three: the source was the digital archive of
            the Sacred Original; Digital Color, S.A. de C.V. performed the capture and
            reproduction; and the Archbishop Primate of Mexico certified the print as faithful to
            that archive. It does not mean Cardinal Rivera examined any canvas printed since.
          </p>
          {/* certification.jpg is the scan we hold. Replace with the highest-resolution
              version available, and add crops for the fidelity section above. */}
          <figure className="mt-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about/certification.jpg"
              alt="Mexican certification dated December 12, 1998, signed by Cardinal Norberto Rivera Carrera, certifying the print as a faithful reproduction of the digital archive of the Sacred Original"
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
            <figcaption className="mt-3 text-sm text-stone-500">
              Certificate of faithful reproduction, December 12, 1998.
            </figcaption>
          </figure>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold">
            The Virgen Peregrina and Pope John Paul II
          </h2>
          <p className="mt-4">The second certification records:</p>
          <blockquote className="mt-5 border-l-4 border-[var(--accent)] pl-5 italic text-stone-700">
            &ldquo;Imagen de Nuestra Señora de Guadalupe conocida como &lsquo;Virgen
            Peregrina&rsquo;, bendecida por S.S. Juan Pablo II el 25 de enero de 1999 y que
            recorrió el territorio nacional de enero de 1999 a abril del 2000, con motivo del
            Gran Jubileo de los 2000 años de nuestra Redención.&rdquo;
            <span className="block mt-3 not-italic text-stone-600">
              &ldquo;Image of Our Lady of Guadalupe known as the &lsquo;Pilgrim Virgin,&rsquo;
              blessed by His Holiness John Paul II on January 25, 1999, which traveled throughout
              the national territory from January 1999 to April 2000 on the occasion of the Great
              Jubilee of the 2,000 years of our Redemption.&rdquo;
            </span>
          </blockquote>
          <p className="mt-5">
            Pope John Paul II was canonized in 2014. The blessing was of the Virgen Peregrina
            during his January 1999 visit to Mexico, and the pilgrimage that followed carried
            that image across the country for the Great Jubilee.
          </p>
          <figure className="mt-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about/jubileo.jpg"
              alt="Mexican certification recording that the Virgen Peregrina was blessed by Pope John Paul II on January 25, 1999 and traveled through Mexico until April 2000 for the Great Jubilee"
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
            <figcaption className="mt-3 text-sm text-stone-500">
              Virgen Peregrina and Great Jubilee certification.
            </figcaption>
          </figure>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold">What we do not claim</h2>
          <p className="mt-4">
            Primos Maternos came under its current ownership in 2005, years after the events
            above. Where the surviving documents do not establish a fact, we do not fill the gap:
          </p>
          <ul className="mt-5 space-y-2 list-disc list-inside">
            <li>
              The documents do not establish the <strong>date of the original capture</strong>,
              only that the archive existed by December 12, 1998.
            </li>
            <li>
              No surviving primary document states <strong>who authorized Digital Color, S.A. de
              C.V.</strong> to perform it.
            </li>
            <li>
              <strong>No individual canvas sold today</strong> was examined, certified, or
              blessed by Cardinal Rivera, Pope John Paul II, the Basilica, or the Archdiocese of
              Mexico.
            </li>
            <li>
              None of this is an <strong>endorsement of Primos Maternos</strong> by the Church.
              The documents describe an image and its history, not a seller.
            </li>
          </ul>
          <p className="mt-4">
            We would rather be the shop that says what it cannot prove than the one that makes a
            claim a buyer can disprove.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold">Sources</h2>
          <ul className="mt-5 space-y-2 list-disc list-inside">
            <li>
              The two Mexican certifications held with the image, shown above.
            </li>
            <li>
              <a
                className="underline hover:text-[var(--accent)]"
                href="https://www.vatican.va/content/john-paul-ii/es/speeches/1999/january/documents/hf_jp-ii_spe_19990125_mexico-generations.html"
                rel="noopener"
              >
                The Holy See
              </a>{" "}
              — Pope John Paul II in Mexico City, January 25, 1999.
            </li>
            <li>
              <a
                className="underline hover:text-[var(--accent)]"
                href="https://www.rcbo.org/tilma/about/"
                rel="noopener"
              >
                Roman Catholic Diocese of Orange
              </a>{" "}
              — the Missionary Image and the high-resolution digital reproduction project.
            </li>
            <li>
              <a
                className="underline hover:text-[var(--accent)]"
                href="https://www.occatholic.com/the-missionary-tilma-of-our-lady-of-guadalupe/"
                rel="noopener"
              >
                OC Catholic
              </a>{" "}
              — accounts of the Missionary Image, its creation and blessings.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold">Questions people ask</h2>
          <dl className="mt-6 space-y-6">
            {faq.map(({ q, a }) => (
              <div key={q}>
                <dt className="font-semibold text-stone-900">{q}</dt>
                <dd className="mt-2 text-stone-700">{a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="border-t border-stone-200 pt-10 text-center">
          <p className="text-lg">
            Every canvas ships with both certifications, and the image is printed in the United
            States.
          </p>
          <Link
            href="/#products"
            className="inline-block mt-6 px-8 py-3 bg-[var(--accent)] text-white font-semibold rounded-md hover:opacity-90 transition"
          >
            See the canvases
          </Link>
        </section>
      </div>
    </>
  );
}
