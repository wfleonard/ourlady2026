import Link from "next/link";
import { listProducts, formatPrice, type Product } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export const metadata = {
  alternates: { canonical: "/gifts" },
  title: "Advent + December 12 Gift Guide — Primos Maternos",
  description:
    "Our Lady of Guadalupe canvas gifts for Advent, December 12, and Christmas, printed from a digital archive of the Sacred Original certified in Mexico in 1998. Framed and rolled, from $57. Free shipping to the 50 U.S. states and Puerto Rico.",
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
      {/* Hero */}
      <section className="border-b border-stone-200 bg-gradient-to-b from-stone-50 to-[var(--background)]">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <p className="text-sm uppercase tracking-widest text-[var(--gold)] font-semibold">
            Advent · December 12 · Christmas
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto">
            The Guadalupe canvas gift guide
          </h1>
          <p className="mt-5 text-lg text-stone-700 leading-relaxed max-w-2xl mx-auto">
            The tilma image on archival canvas, printed from a digital archive
            of the Sacred Original certified in Mexico in 1998 as a faithful
            reproduction; the canvas is printed in the USA. Two Mexican
            certifications included. From{" "}
            <strong>$57</strong>. Free shipping to the 50 U.S. states and
            Puerto Rico. Two certificates from Mexico with every canvas.
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
              <div className="text-2xl font-bold mt-1">Dec 4</div>
              <div className="text-xs opacity-80 mt-1">
                (last order for feast-day delivery)
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-sm uppercase tracking-widest opacity-80">
                For Christmas
              </div>
              <div className="text-2xl font-bold mt-1">Dec 17</div>
              <div className="text-xs opacity-80 mt-1">
                (last order for Christmas Eve delivery)
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-sm uppercase tracking-widest opacity-80">
                For Three Kings Day
              </div>
              <div className="text-2xl font-bold mt-1">Dec 30</div>
              <div className="text-xs opacity-80 mt-1">
                (Jan 6 delivery — Día de los Reyes)
              </div>
            </div>
          </div>
          <p className="text-center text-xs opacity-80 mt-4">
            Framed canvases add ~3 business days over rolled. If gifting a
            rolled canvas, allow the recipient additional time for local
            framing.
          </p>
        </div>
      </section>

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

      {/* Who to give it to */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6">Who this makes sense for</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            ["Grandparents and parents", "Especially those with roots in Mexico or Latin America — the image carries their whole tradition."],
            ["A newlywed couple's home", "A first Marian image for a first apartment or house — 12\"×18\" gallery wrap fits any wall."],
            ["Godchildren and confirmandi", "A gift that outlasts the season and grows in meaning."],
            ["A pastor or religious", "The 24\"×36\" gold-framed for the rectory office."],
            ["The person hosting the Guadalupe party", "For the family that puts on the Dec 12 celebration every year."],
            ["Yourself", "Formalize the shrine you have been meaning to set up."],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="bg-white p-5 rounded-lg border border-stone-200"
            >
              <h3 className="font-semibold text-[var(--accent)] mb-1">
                {title}
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">{desc}</p>
            </div>
          ))}
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
            feast on December 12. A canvas ordered by Dec 4 arrives in time
            to unwrap on the first day of the Novena and pray with for the
            full nine days.
          </p>
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
          className="inline-block px-8 py-3 bg-[var(--accent)] text-white font-semibold rounded-md hover:opacity-90 transition"
        >
          Shop the full collection →
        </Link>
      </section>
    </>
  );
}
