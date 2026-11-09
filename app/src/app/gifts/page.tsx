import Link from "next/link";
import { listProducts, formatPrice, type Product } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import { ReviewHighlight } from "@/components/ReviewHighlight";
import { reviews } from "@/lib/reviews";
import { JsonLd } from "@/components/JsonLd";
import { GiftOccasions } from "@/components/GiftOccasions";
import { SITE_URL, orderByDate } from "@/lib/site";

const matthew = reviews.find((r) => r.name === "Matthew");

export const dynamic = "force-dynamic";

// Order-by dates come from ORDER_BY in site.ts; update them there each season.
// After January 6, the deadlines banner can go and the occasion cards carry
// the page year-round.
export const metadata = {
  alternates: { canonical: "/gifts" },
  title: "Our Lady of Guadalupe Gifts — Canvas Prints from $57, Free Shipping",
  description: `Our Lady of Guadalupe gifts by occasion: Christmas, December 12, Three Kings Day, confirmation, baptism, wedding, ordination, housewarming and a nursery. From $57 with free shipping; framed and ready to hang at $214. Order by ${orderByDate("christmas")} for Christmas.`,
};

const faq = [
  {
    q: "What is a good Christmas gift for a Mexican Catholic grandmother?",
    a: `An Our Lady of Guadalupe canvas she can hang the same day: the 24 by 36 inch print in a gold frame, $214, ready to hang, or the 12 by 18 inch canvas at $57 for a smaller wall or a home altar. The image was created in Mexico from a scan of the original tilma, the canvas is printed in the USA, and two Mexican certificates come with it. Shipping is free; order by ${orderByDate("christmas")} for Christmas delivery.`,
  },
  {
    q: "Is there an Our Lady of Guadalupe gift under $60?",
    a: "Yes. The 12 by 18 inch canvas is $57 with free shipping to all 50 states and Puerto Rico. It is stretched over 0.75 inch bars with a hanging wire on the back, so it hangs straight from the box, and it comes with both Mexican certifications.",
  },
  {
    q: "When is the last day to order a Guadalupe gift for December 12, Christmas or Three Kings Day?",
    a: `${orderByDate("dec12")} for December 12, ${orderByDate("christmas")} for Christmas, and ${orderByDate("threeKings")} for Three Kings Day on January 6. Each date allows up to ten business days before the order ships plus ground transit.`,
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/gifts#faq`,
  mainEntity: faq.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default async function GiftsPage() {
  let products: Product[] = [];
  try {
    products = await listProducts();
  } catch {
    products = [];
  }

  const framed = products.filter((p) => p.variant.includes("frame"));
  const rolled = products.filter((p) => p.variant === "rolled");
  const gallery = products.filter((p) => p.variant.startsWith("gallery-wrap"));

  return (
    <>
      <JsonLd data={faqJsonLd} />

      {/* Hero */}
      <section className="border-b border-stone-200 bg-gradient-to-b from-stone-50 to-[var(--background)]">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <p className="text-sm uppercase tracking-widest text-[var(--gold)] font-semibold">
            Christmas · December 12 · Baptism · Wedding · Ordination
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto">
            Our Lady of Guadalupe gifts
          </h1>
          <p className="mt-5 text-lg text-stone-700 leading-relaxed max-w-2xl mx-auto">
            An Our Lady of Guadalupe canvas print makes a gift that stays on
            the wall: <strong>$57</strong> for a small ready-to-hang picture,{" "}
            <strong>$114</strong> unframed, or <strong>$214</strong> framed
            and ready to hang, all with free shipping. Order by{" "}
            <strong>{orderByDate("dec12")}</strong> for December 12, by{" "}
            <strong>{orderByDate("christmas")}</strong> for Christmas, and by{" "}
            <strong>{orderByDate("threeKings")}</strong> for Three Kings Day.
          </p>
          <p className="mt-4 text-stone-600 leading-relaxed max-w-2xl mx-auto">
            The tilma image on archival canvas, printed from a digital
            archive of the Sacred Original that Cardinal Norberto Rivera
            Carrera, Archbishop Primate of Mexico, certified on December
            12, 1998 as a faithful reproduction. The image, known as the
            Virgen Peregrina, was blessed by Pope John Paul II on January
            25, 1999. The canvas is printed in the USA. Two Mexican
            certifications ship with every order. Free shipping to the 50
            U.S. states and Puerto Rico.
          </p>
        </div>
      </section>

      {/* Ordering deadlines banner */}
      <section className="bg-[var(--accent)] text-white">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h2 className="text-center text-xl md:text-2xl font-bold mb-4">
            Order by these dates to arrive on time
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-sm uppercase tracking-widest opacity-80">
                For December 12
              </div>
              <div className="text-2xl font-bold mt-1">{orderByDate("dec12")}</div>
              <div className="text-xs opacity-80 mt-1">
                (last order for feast-day delivery)
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-sm uppercase tracking-widest opacity-80">
                For Christmas
              </div>
              <div className="text-2xl font-bold mt-1">{orderByDate("christmas")}</div>
              <div className="text-xs opacity-80 mt-1">
                (last order for delivery before Christmas)
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-sm uppercase tracking-widest opacity-80">
                For Three Kings Day
              </div>
              <div className="text-2xl font-bold mt-1">{orderByDate("threeKings")}</div>
              <div className="text-xs opacity-80 mt-1">
                (Jan 6 delivery — Día de los Reyes)
              </div>
            </div>
          </div>
          <p className="text-center text-xs opacity-80 mt-4">
            Each date allows up to ten business days before your order ships, plus ground transit. If gifting a
            rolled canvas, allow the recipient additional time for local
            framing.
          </p>
        </div>
      </section>

      <GiftOccasions />

      {/* Gift-picker: three price bands */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-3">
          Three ways to give the image
        </h2>
        <p className="text-center text-stone-600 mb-10 max-w-2xl mx-auto">
          Pick by budget and by how "ready to hang" you want the gift to be.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm">
            <div className="text-xs uppercase tracking-widest text-[var(--gold)] font-semibold">
              Under $100
            </div>
            <h3 className="mt-1 text-xl font-bold">Rolled or gallery wrap</h3>
            <p className="mt-3 text-sm text-stone-600 leading-relaxed">
              Ships in a protective tube (rolled) or ready to hang out of
              the box (12"×18" gallery wrap). Best for a personal gift, or
              a recipient who wants to pick their own frame locally.
            </p>
            <ul className="mt-4 text-sm space-y-1 text-stone-700">
              <li>· 12"×18" Gallery Wrap — $57</li>
              <li>· 24"×36" Rolled — $114</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-[var(--accent)] shadow-md">
            <div className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold">
              Most popular · $214
            </div>
            <h3 className="mt-1 text-xl font-bold">24"×36" framed canvas</h3>
            <p className="mt-3 text-sm text-stone-600 leading-relaxed">
              Ready to hang. Five frame styles to match the recipient's
              home or chapel. The gift they'll open on Christmas morning
              and put up the same day.
            </p>
            <ul className="mt-4 text-sm space-y-1 text-stone-700">
              <li>· Gold · Cherry · Beaded Mahogany</li>
              <li>· Black Red Oak · Silver Ornate</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm">
            <div className="text-xs uppercase tracking-widest text-[var(--gold)] font-semibold">
              Statement piece · $324
            </div>
            <h3 className="mt-1 text-xl font-bold">36"×54" rolled canvas</h3>
            <p className="mt-3 text-sm text-stone-600 leading-relaxed">
              The largest we sell. For a home altar wall, a family
              gathering space, or the parish shrine your family sponsors.
              Ships rolled, ready for a local framer.
            </p>
            <ul className="mt-4 text-sm space-y-1 text-stone-700">
              <li>· 36"×54" Rolled — $324</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Customer review — arrival and first look, what a gift giver worries about */}
      {matthew && (
        <ReviewHighlight
          review={matthew}
          quote="The heavy duty packaging ensured it arrived without any damage and when we took it out, we were overwhelmed with how beautiful it looked."
        />
      )}

      {/* Full catalog */}
      <section id="all" className="bg-stone-50 border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-2">Every SKU we make</h2>
          <p className="text-stone-600 mb-8">
            Five framed 24"×36" options, three rolled sizes, one 12"×18"
            gallery wrap.
          </p>

          {framed.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mb-4 mt-4">
                Framed 24"×36" — ready to hang
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {framed.map((p) => (
                  <ProductCard key={p.sku} product={p} />
                ))}
              </div>
            </>
          )}

          {rolled.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mb-4 mt-8">
                Rolled canvas — ships in a tube
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {rolled.map((p) => (
                  <ProductCard key={p.sku} product={p} />
                ))}
              </div>
            </>
          )}

          {gallery.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mb-4 mt-8">
                Gallery wrap — ready to hang, no frame
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {gallery.map((p) => (
                  <ProductCard key={p.sku} product={p} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Novena tie-in */}
      <section className="bg-stone-50 border-y border-stone-200">
        <div className="max-w-3xl mx-auto px-6 py-14 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            December 3 — the Novena begins
          </h2>
          <p className="text-stone-700 leading-relaxed">
            The traditional Novena to Our Lady of Guadalupe runs December
            3–11, one day for each of her apparitions, leading into the
            feast on December 12. Order by {orderByDate("dec12")} to have the
            canvas for the feast, and a week or more earlier to have it
            for the first day of the Novena.
          </p>
        </div>
      </section>

      {/* Certificates — trust chain right before the final ask */}
      <section className="bg-stone-50 border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              What ships with every canvas
            </h2>
            <p className="mt-3 text-stone-700 max-w-2xl mx-auto">
              Two Mexican certifications — the primary signed by Cardinal
              Norberto Rivera Carrera on December 12, 1998, and the
              secondary recording the Virgen Peregrina blessing by Pope
              John Paul II in 1999. Full text on our{" "}
              <Link href="/authenticity" className="text-[var(--accent)] underline">
                Authenticity page
              </Link>
              .
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <figure className="bg-white p-4 rounded-lg shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/about/certification.webp"
                alt="Mexican certification dated December 12, 1998, signed by Cardinal Norberto Rivera Carrera, certifying the print as a faithful reproduction of the digital archive of the Sacred Original"
                className="w-full h-auto object-contain"
              />
              <figcaption className="mt-2 text-sm text-stone-600 text-center">
                1998 certification — Cardinal Rivera Carrera
              </figcaption>
            </figure>
            <figure className="bg-white p-4 rounded-lg shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/about/jubileo.webp"
                alt="Mexican certification recording that the Virgen Peregrina was blessed by Pope John Paul II on January 25, 1999 and traveled through Mexico until April 2000 for the Great Jubilee"
                className="w-full h-auto object-contain"
              />
              <figcaption className="mt-2 text-sm text-stone-600 text-center">
                Virgen Peregrina blessing — Pope John Paul II, 1999
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section id="faq" className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6">Gift questions</h2>
        <div className="space-y-6 text-stone-700 leading-relaxed">
          {faq.map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold text-lg text-stone-800">{q}</h3>
              <p className="mt-2">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-3">Ready to pick one</h2>
        <p className="text-stone-600 mb-6">
          {formatPrice(5700)}–{formatPrice(32400)} · free shipping ·
          two certificates from Mexico · secure checkout by Stripe
        </p>
        <Link
          href="#all"
          className="inline-block px-8 py-3 bg-[var(--accent)] text-[var(--gold)]! font-semibold rounded-md hover:opacity-90 transition"
        >
          Shop the full collection →
        </Link>
      </section>
    </>
  );
}
