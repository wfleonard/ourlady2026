import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

/**
 * How to choose between rolled, gallery wrap and framed, which of the five
 * frames suits which room, and how to look after the canvas. Every question
 * heading on the page is also in the FAQPage JSON-LD, from the same lists.
 *
 * Product facts here (UV-protective coating, hanging wire on the framed and
 * gallery wrap pieces) were confirmed by Bill in November 2026. Prices are
 * written out because answers are quoted as text: keep them in step with
 * db/init.sql (12x18 $57, 24x36 $114 unframed / $214 framed, 36x54 $324).
 */
export const metadata = {
  title: "Framed vs Unframed Canvas: Guadalupe Canvas and Frame Guide",
  description:
    "Rolled, gallery wrap or framed Our Lady of Guadalupe canvas, and canvas versus poster, with prices from $57 to $324. The five frames compared, plus how to frame a rolled canvas, hang a heavy frame, prevent sagging and fading, and clean it.",
  alternates: { canonical: "/canvas-and-frame-guide" },
};

type QA = { q: string; a: string };

const choosing: QA[] = [
  {
    q: "Should a church wall get a framed or an unframed canvas?",
    a: "Usually unframed. The 36 by 54 inch canvas ($324) and the 24 by 36 ($114) ship rolled, so a local framer can stretch and frame them to match the church's woodwork and altar, which is what most parishes want. The framed 24 by 36 ($214) arrives ready to hang and suits a side chapel, a parish office or a shrine seen from close by.",
  },
  {
    q: "Gallery wrap or framed canvas for a religious picture?",
    a: "A gallery wrap is the canvas stretched over 0.75 inch wooden bars with no frame. It looks clean and simple and suits a bedroom, a nursery, a classroom or a small home altar; ours is 12 by 18 inches for $57. A framed canvas adds a wooden frame around the stretched image, which gives it the presence a devotional image usually has in a living room or above an altar; ours is 24 by 36 inches for $214, in five frames. Both arrive with a hanging wire on the back.",
  },
  {
    q: "Is a canvas better than a poster for an Our Lady of Guadalupe picture?",
    a: "For a picture meant to stay up for years, yes. A poster is printed on paper and needs glass and a frame to protect it, and glass reflects light across the image. Our prints are on archival canvas with a UV-protective coating, need no glass, and start at $57. We do not sell posters.",
  },
  {
    q: "Gold or mahogany frame for a Virgin of Guadalupe picture?",
    a: "Gold picks up the gold rays and stars in the image and suits a traditional home altar, a church office or a formal room. Beaded mahogany is darker and warmer, and suits a room with wood furniture or paneling. Both are $214 for the 24 by 36 inch canvas, as are the cherry, black red oak and silver ornate frames.",
  },
];

const care: QA[] = [
  {
    q: "How do I have a rolled canvas stretched or framed?",
    a: "Take it to a local frame shop in its tube and ask them to stretch it on stretcher bars, then either frame it or leave it as a gallery wrap. Ask for a quote first, because the price depends on the shop and the frame. Until then, keep it in the tube, and never fold or crease the canvas.",
  },
  {
    q: "How do I hang a heavy framed canvas?",
    a: "The framed 24 by 36 inch canvas arrives with a hanging wire on the back, as does the 12 by 18 inch gallery wrap. Hang the framed piece on two picture hooks rated for more than its weight, a few inches apart, which keeps it level and shares the load; screw into a stud where you can, or use wall anchors in drywall. Center the image about 57 to 60 inches from the floor.",
  },
  {
    q: "How do I keep a canvas from sagging?",
    a: "Canvas loosens a little as humidity changes. Hang it away from bathrooms, kitchens, radiators and air vents, and keep the room's humidity steady. If a stretched canvas does start to sag, a frame shop can tighten or re-stretch it.",
  },
  {
    q: "Do canvas prints fade in sunlight?",
    a: "Any print fades in strong direct sun over time. Our canvas has a UV-protective coating that slows fading, but hang it where direct sunlight does not fall on it for hours a day: a wall beside a window rather than one facing it.",
  },
  {
    q: "How do I clean a canvas print?",
    a: "Dust it gently with a soft, dry cloth or a clean, soft brush. Do not use water, glass cleaner or any household spray on the canvas, and do not rub it. The frame itself can be wiped with a slightly damp cloth, kept off the canvas.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/canvas-and-frame-guide#faq`,
  mainEntity: [...choosing, ...care].map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const FORMATS = [
  {
    name: "Rolled (unframed)",
    sizes: '24" × 36" · $114\n36" × 54" · $324',
    arrives: "In a protective tube, for a local framer",
    home: "When the frame has to match your furniture",
    church: "The usual choice: framed locally to match the church",
    href: "/products/olg-24x36-rolled",
  },
  {
    name: "Gallery wrap",
    sizes: '12" × 18" · $57',
    arrives: "Stretched over 0.75\" bars, wire on the back, ready to hang",
    home: "Bedroom, nursery, small home altar, gift",
    church: "Classrooms and offices",
    href: "/products/olg-12x18-gallery-wrap",
  },
  {
    name: "Framed",
    sizes: '24" × 36" · $214',
    arrives: "Stretched and framed, wire on the back, ready to hang",
    home: "Living room, entry hall, above a home altar",
    church: "Side chapel, shrine, parish office, rectory",
    href: "/products/olg-24x36-gold",
  },
  {
    name: "Poster (we do not sell these)",
    sizes: "—",
    arrives: "Paper; needs glass and a frame",
    home: "A short-term or budget display",
    church: "Not recommended: glare and paper aging",
    href: null,
  },
];

const FRAMES = [
  { sku: "olg-24x36-gold", name: "Gold", suits: "Picks up the gold rays and stars of the image. A traditional home altar, a church office, a formal living room, an ordination or Christmas gift." },
  { sku: "olg-24x36-cherry", name: "Cherry", suits: "A warm reddish wood tone. A dining or family room with wood furniture, and a wedding gift for a couple's first home." },
  { sku: "olg-24x36-beaded-mahogany", name: "Beaded mahogany", suits: "Dark wood with a beaded inner edge. A study, a rectory, a room with paneling or dark furniture." },
  { sku: "olg-24x36-black-red-oak", name: "Black red oak", suits: "A black finish. A modern home, white or light walls, a housewarming gift." },
  { sku: "olg-24x36-silver-ornate", name: "Silver ornate", suits: "Ornate silver. A white or cool-toned room, a bedroom altar, a baptism gift." },
];

function QAList({ items }: { items: QA[] }) {
  return (
    <div className="mt-6 space-y-8">
      {items.map(({ q, a }) => (
        <div key={q}>
          <h3 className="text-xl font-semibold text-stone-800">{q}</h3>
          <p className="mt-2">{a}</p>
        </div>
      ))}
    </div>
  );
}

export default function CanvasAndFrameGuidePage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />

      <section className="border-b border-stone-200 bg-gradient-to-b from-stone-50 to-[var(--background)]">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <p className="text-sm uppercase tracking-widest text-[var(--gold)] font-semibold">
            Rolled · Gallery wrap · Framed · Care
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto">
            Canvas and frame guide
          </h1>
          <p className="mt-5 text-lg text-stone-700 leading-relaxed max-w-2xl mx-auto">
            The Our Lady of Guadalupe canvas comes three ways: rolled for local framing from{" "}
            <strong>$114</strong>, as a ready-to-hang 12&quot; × 18&quot; gallery wrap at{" "}
            <strong>$57</strong>, or framed and ready to hang at <strong>$214</strong> in five
            frames. Below is when each one suits a home or a church wall, how the frames compare,
            and how to look after the canvas once it is up.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-14 space-y-16 text-stone-700 leading-relaxed">
        <section id="compare">
          <h2 className="text-2xl md:text-3xl font-bold">Rolled, gallery wrap, framed, or a poster</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm min-w-[640px]">
              <thead>
                <tr className="border-b-2 border-stone-300">
                  <th className="py-3 pr-4 font-semibold">Format</th>
                  <th className="py-3 pr-4 font-semibold">Sizes and price</th>
                  <th className="py-3 pr-4 font-semibold">How it arrives</th>
                  <th className="py-3 pr-4 font-semibold">At home</th>
                  <th className="py-3 font-semibold">In a church or school</th>
                </tr>
              </thead>
              <tbody>
                {FORMATS.map((f) => (
                  <tr key={f.name} className="border-b border-stone-200 align-top">
                    <td className="py-4 pr-4 font-semibold text-stone-800">
                      {f.href ? (
                        <Link href={f.href} className="text-[var(--accent)] underline">
                          {f.name}
                        </Link>
                      ) : (
                        f.name
                      )}
                    </td>
                    <td className="py-4 pr-4 whitespace-pre-line">{f.sizes}</td>
                    <td className="py-4 pr-4">{f.arrives}</td>
                    <td className="py-4 pr-4">{f.home}</td>
                    <td className="py-4">{f.church}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-stone-500">
            Every format is printed in the USA from the same image, and every canvas ships free with
            both Mexican certifications. For which size fits your wall, see the{" "}
            <Link href="/canvas-sizes" className="text-[var(--accent)] underline">
              size guide
            </Link>
            .
          </p>
          <QAList items={choosing} />
        </section>

        <section id="frames">
          <h2 className="text-2xl md:text-3xl font-bold">The five frames compared</h2>
          <p className="mt-4">
            All five frame the same 24&quot; × 36&quot; canvas, arrive ready to hang with a wire on
            the back, and cost $214 with free shipping. Choose by the room, not the image: the
            frame should belong to the wall it hangs on.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FRAMES.map((f) => (
              <Link
                key={f.sku}
                href={`/products/${f.sku}`}
                className="block rounded-lg border border-stone-200 bg-white p-4 hover:shadow-md transition"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/products/${f.sku}.jpg`}
                  alt={`Our Lady of Guadalupe 24 by 36 inch canvas in the ${f.name.toLowerCase()} frame`}
                  className="h-64 w-full object-contain"
                  loading="lazy"
                />
                <h3 className="mt-3 font-semibold text-[var(--accent)]">{f.name} · $214</h3>
                <p className="mt-1 text-sm text-stone-600">{f.suits}</p>
              </Link>
            ))}
          </div>
        </section>

        <section id="care">
          <h2 className="text-2xl md:text-3xl font-bold">Framing, hanging and care</h2>
          <QAList items={care} />
        </section>
      </div>
    </>
  );
}
