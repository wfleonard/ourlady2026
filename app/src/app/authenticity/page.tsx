import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export const metadata = {
  title: "How to tell if a Guadalupe print is authentic — Primos Maternos",
  description:
    "Why Guadalupe prints look different, how big the original tilma is, hand painted vs printed, and the two Mexican certifications behind the image we print: Cardinal Rivera's 1998 certificate of faithful reproduction and the Virgen Peregrina blessed by John Paul II in 1999.",
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
    a: "Most prints on the market descend from photographs of photographs, and each generation loses detail and shifts color, which is why the face, the gold edging, and the stars on the mantle vary so much between sellers. Ask any seller which digital source their file came from: a print made from a high-resolution archive keeps detail a re-photographed copy has already lost. Ours descends from the digital archive of the Sacred Original that Cardinal Rivera certified in 1998 as a faithful reproduction.",
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

/**
 * Questions about the tilma itself and about print quality, shown as headings
 * in their own section. Facts: tilma size from published measurements
 * (about 1.68–1.70 m by 1.05 m; sources listed on the page); giclée, pigment
 * inks and the UV-protective coating confirmed by Bill in November 2026.
 * Prices must stay in step with db/init.sql.
 */
const printFaq = [
  {
    q: "How big is the original tilma of Our Lady of Guadalupe?",
    a: "About 1.7 meters tall by 1.05 meters wide, roughly 66 by 41 inches; published measurements differ by a few centimeters. It hangs above the main altar of the Basilica of Our Lady of Guadalupe in Mexico City. Our canvases are smaller than the cloth: the 36 by 54 inch canvas is about four-fifths of its height, the 24 by 36 a little over half, and the 12 by 18 a little over a quarter.",
  },
  {
    q: "What is the difference between a tilma replica and an ordinary Guadalupe print?",
    a: "\"Tilma replica\" usually means a reproduction of the whole image as it appears on the cloth, made from a photograph or scan of the original and often near its full size. An ordinary print is usually a smaller copy whose source is never stated, often re-photographed or retouched. The label alone proves nothing: what matters is whether the seller can name the source of the file and show documents for it. Ours comes from the digital archive of the Sacred Original that Cardinal Rivera certified in 1998 as a faithful reproduction. It is not full size; our largest canvas is 36 by 54 inches.",
  },
  {
    q: "Is a hand-painted Our Lady of Guadalupe image better than a printed one?",
    a: "They are different things. A hand-painted image is an artist's copy of the tilma, with that artist's hand in the face, the colors and the stars. A print made from a scan of the original reproduces the image itself, down to the weave of the cloth. Ours is printed, not painted: a giclée print in pigment inks on archival canvas with a UV-protective coating, made from a 6,900 by 10,350 pixel file.",
  },
  {
    q: "Why do cheap and expensive Guadalupe prints differ?",
    a: "Mostly in four things: the source file (a copy of a copy, or a high-resolution scan), the resolution it is printed at, the material (poster paper or archival canvas), and the inks and coating that decide how long it lasts. Ours are giclée prints in pigment inks on UV-coated archival canvas, from $57 for a 12 by 18 inch canvas to $324 for a 36 by 54, and each comes with both Mexican certifications.",
  },
  {
    q: "Why do the colors of my print look different from the website?",
    a: "Screens differ in brightness and color settings, and a screen lights the image from behind while a canvas reflects the light in the room. Warm indoor bulbs make the gold and the rose of the tunic look warmer; daylight makes them cooler. Look at the canvas in daylight before deciding the color is wrong, and if it still looks wrong, email a photo and we will look at it with you.",
  },
  {
    q: "What resolution is behind the largest 36 by 54 inch canvas?",
    a: "The same 6,900 by 10,350 pixel file as every size, which is 191.7 pixels per inch at 36 by 54 inches, 287.5 at 24 by 36, and 575 at 12 by 18. Nothing is enlarged to fill the canvas and nothing is cropped away. 191.7 is normal for a canvas that size, which is meant to be seen from eight feet or more, across a chapel, a church or a hall.",
  },
  {
    q: "What do the 1998 certified archive and the two Mexican certifications mean, in plain words?",
    a: "A Mexican firm, Digital Color, S.A. de C.V., captured a digital archive of the Sacred Original, the tilma kept at the Basilica in Mexico City, and made a print from it. The capture date is not recorded, only that the archive existed by December 12, 1998, when Cardinal Norberto Rivera Carrera, Archbishop Primate of Mexico, certified that print as a faithful reproduction of the archive. The second certificate records that the image known as the Virgen Peregrina was blessed by Pope John Paul II on January 25, 1999. In short: image created in Mexico from a scan of the original tilma, canvas printed in the USA, two Mexican certificates included. The certificates describe the image's history, not each canvas printed today.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/authenticity#faq`,
  mainEntity: [...printFaq, ...faq].map(({ q, a }) => ({
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
            What we can say about ours is documentary, and it is narrower than most shops would
            claim: the December 12, 1998 certification below calls the associated print a
            faithful reproduction — <em>reproducción fiel</em> — of the digital archive of the
            Sacred Original. Our canvases are printed in the United States from that historical
            image lineage.
          </p>
          <p className="mt-4">
            What the surviving documents do <strong>not</strong> establish is every intermediate
            file transfer between that 1998 print and the file we print from today, and we will
            not pretend otherwise. So rather than ask you to take the difference on faith, look
            at the image itself at full size and judge the detail with your own eyes.
          </p>
        </section>

        <section id="tilma-and-print">
          <h2 className="text-2xl md:text-3xl font-bold">
            The tilma, the print, and what the price buys
          </h2>
          <div className="mt-6 space-y-8">
            {printFaq.map(({ q, a }) => (
              <div key={q}>
                <h3 className="text-xl font-semibold text-stone-900">{q}</h3>
                <p className="mt-2">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold">The file we print from, at full size</h2>
          <p className="mt-4">
            This part is not history, and you do not have to take our word for any of it. The
            file we print from is <strong>6,900 by 10,350 pixels</strong>. On a 24&quot; ×
            36&quot; canvas that is <strong>287.5 pixels per inch</strong>, and on the 36&quot; ×
            54&quot; it is 191.7. Nothing is enlarged to fill the canvas, and the proportions match
            exactly, so nothing is cropped away either.
          </p>
          <p className="mt-4">
            The four details below are cut straight out of that file at one pixel per pixel, with
            no sharpening and no enlargement. Each covers three to four inches of the finished
            24&quot; × 36&quot; canvas. Open any of them, then hold it up against the same part of
            any other Guadalupe print you are considering.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <figure>
              <a href="/about/detail-face.webp" target="_blank" rel="noopener">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about/detail-face.webp"
                  width={1140}
                  height={1420}
                  loading="lazy"
                  alt="The face, cut at full size from the file we print from"
                  className="rounded-lg shadow-md w-full h-auto"
                />
              </a>
              <figcaption className="mt-2 text-sm text-stone-500">
                <strong className="text-stone-700">The face.</strong> The modeling around the eye and mouth, and the flecking in the gold of the hood. About four inches of the finished canvas.
              </figcaption>
            </figure>
            <figure>
              <a href="/about/detail-stars.webp" target="_blank" rel="noopener">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about/detail-stars.webp"
                  width={1300}
                  height={1300}
                  loading="lazy"
                  alt="Stars on the mantle, cut at full size from the file we print from"
                  className="rounded-lg shadow-md w-full h-auto"
                />
              </a>
              <figcaption className="mt-2 text-sm text-stone-500">
                <strong className="text-stone-700">Stars on the mantle.</strong> Each eight-pointed star separately shaped, lying over the thread texture of the cloth. About four and a half inches.
              </figcaption>
            </figure>
            <figure>
              <a href="/about/detail-gold.webp" target="_blank" rel="noopener">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about/detail-gold.webp"
                  width={900}
                  height={1200}
                  loading="lazy"
                  alt="Gold edging and the flowered tunic, cut at full size from the file we print from"
                  className="rounded-lg shadow-md w-full h-auto"
                />
              </a>
              <figcaption className="mt-2 text-sm text-stone-500">
                <strong className="text-stone-700">Gold edging and the flowered tunic.</strong> The fine line work stays separate instead of running together. About three inches.
              </figcaption>
            </figure>
            <figure>
              <a href="/about/detail-weave.webp" target="_blank" rel="noopener">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about/detail-weave.webp"
                  width={1200}
                  height={1200}
                  loading="lazy"
                  alt="The weave, cut at full size from the file we print from"
                  className="rounded-lg shadow-md w-full h-auto"
                />
              </a>
              <figcaption className="mt-2 text-sm text-stone-500">
                <strong className="text-stone-700">The weave.</strong> Plain cloth, where the individual threads of the ayate and the staining on it are resolved. About four inches.
              </figcaption>
            </figure>
          </div>
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
            digital del Sagrado Original de la imagen de Nuestra Señora de Guadalupe.&rdquo;
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
          {/* The fidelity section above still needs its own crops: face, stars, gold
              edging, weave. */}
          <figure className="mt-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <a href="/about/certification.webp" target="_blank" rel="noopener">
              <img
                src="/about/certification.webp"
                alt="Mexican certification dated December 12, 1998, signed by Cardinal Norberto Rivera Carrera, certifying the print as a faithful reproduction of the digital archive of the Sacred Original"
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
            </a>
            <figcaption className="mt-3 text-sm text-stone-500">
              Certificate of faithful reproduction. Cardinal Rivera&apos;s signature and title
              appear at the right, dated 12-XII-1998, with the Digital Color attribution beneath.
              Open the image to enlarge it and read the Spanish for yourself.
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
            <a href="/about/jubileo.webp" target="_blank" rel="noopener">
              <img
                src="/about/jubileo.webp"
                alt="Mexican certification recording that the Virgen Peregrina was blessed by Pope John Paul II on January 25, 1999 and traveled through Mexico until April 2000 for the Great Jubilee"
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
            </a>
            <figcaption className="mt-3 text-sm text-stone-500">
              Virgen Peregrina and Great Jubilee certification. Open the image to enlarge it.
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
              The certification does not prove <strong>every intermediate file transfer</strong>
              between the certified 1998 reproduction and the file used for production today.
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
            <li>
              <a
                className="underline hover:text-[var(--accent)]"
                href="https://www.tvazteca.com/aztecanoticias/que-es-el-ayate-la-tela-en-la-que-esta-la-imagen-la-virgen-guadalupe"
                rel="noopener"
              >
                TV Azteca
              </a>{" "}
              and{" "}
              <a
                className="underline hover:text-[var(--accent)]"
                href="https://vanguardia.com.mx/vida/este-es-el-lugar-exacto-donde-se-resguarda-el-lienzo-original-de-la-virgen-de-guadalupe-HK18561868"
                rel="noopener"
              >
                Vanguardia
              </a>{" "}
              — published measurements of the tilma, about 1.68 to 1.70 m by 1.05 m.
            </li>
          </ul>
        </section>

        <section id="faq">
          <h2 className="text-2xl md:text-3xl font-bold">Questions people ask</h2>
          <div className="mt-6 space-y-6">
            {faq.map(({ q, a }) => (
              <div key={q}>
                <h3 className="text-lg font-semibold text-stone-900">{q}</h3>
                <p className="mt-2 text-stone-700">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-stone-200 pt-10 text-center">
          <p className="text-lg">
            Every canvas ships with both certifications, and the image is printed in the United
            States.
          </p>
          <p className="mt-3 text-stone-600">
            Who we are, and who prints and ships your canvas:{" "}
            <Link href="/about" className="text-[var(--accent)] underline">
              about Primos Maternos
            </Link>
            .
          </p>
          <Link
            href="/#products"
            className="inline-block mt-6 px-8 py-3 bg-[var(--accent)] text-[var(--gold)]! font-semibold rounded-md hover:opacity-90 transition"
          >
            See the canvases
          </Link>
        </section>
      </div>
    </>
  );
}
