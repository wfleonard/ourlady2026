import Link from "next/link";
import { BuyButton } from "@/components/BuyButton";
import { formatPrice } from "@/lib/db";

export const metadata = {
  title: "For Your Parish — Our Lady of Guadalupe Canvas",
  description:
    "24\" × 36\" rolled canvas reproduction of the tilma of Saint Juan Diego, printed in Mexico from a high-resolution scan of the original. $114 with free U.S. shipping. Certificate of authenticity included.",
};

const PRICE_CENTS = 11400;
const SKU = "olg-24x36-rolled";

export default function ParishesPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-stone-200 bg-gradient-to-b from-stone-50 to-[var(--background)]">
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm uppercase tracking-widest text-[var(--gold)] font-semibold">
              For Parishes and Guadalupe Ministries
            </p>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight">
              Bring the image of Our Lady of Guadalupe to your parish
            </h1>
            <p className="mt-5 text-lg text-stone-700 leading-relaxed">
              A 24" × 36" rolled canvas reproduction of the tilma of Saint
              Juan Diego. Printed in Mexico from a high-resolution digital
              scan of the original image at the Basilica in Mexico City.
              Certificate of authenticity included with every canvas.
            </p>
            <div className="mt-6 flex items-baseline gap-4">
              <span className="text-4xl font-bold text-[var(--accent)]">
                {formatPrice(PRICE_CENTS)}
              </span>
              <span className="text-sm text-stone-600">
                free shipping · 50 U.S. states + Puerto Rico
              </span>
            </div>
            <div className="mt-6">
              <BuyButton sku={SKU} />
              <p className="mt-2 text-xs text-stone-500">
                Secure checkout by Stripe. Ships rolled in a protective tube.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/products/olg-24x36-rolled.jpg"
              alt="24 by 36 inch rolled canvas of Our Lady of Guadalupe"
              className="rounded-lg shadow-xl drop-shadow-[0_12px_30px_rgba(0,0,0,0.3)] max-h-[480px] w-auto object-contain bg-white p-6"
            />
          </div>
        </div>
      </section>

      {/* Jubilee callout — timely */}
      <section className="bg-[var(--accent)] text-white">
        <div className="max-w-4xl mx-auto px-6 py-10 text-center">
          <p className="text-sm uppercase tracking-widest opacity-80 mb-2">
            October 12, 2026 — October 12, 2027
          </p>
          <h2 className="text-2xl md:text-3xl font-bold">
            A Jubilee Year for Our Lady of Guadalupe
          </h2>
          <p className="mt-3 text-white/90 max-w-2xl mx-auto">
            Pope Leo XIV has granted a Jubilee Year marking 50 years since the
            tilma was carried into the current Basilica in Mexico City. A
            fitting year to display her image in your parish, chapel, or
            ministry space.
          </p>
          <Link
            href="/blog/jubilee-2026"
            className="inline-block mt-5 px-5 py-2 border border-white/60 rounded-md text-sm font-semibold hover:bg-white hover:text-[var(--accent)] transition"
          >
            Read about the Jubilee →
          </Link>
        </div>
      </section>

      {/* Certificate of authenticity */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Certificate of authenticity</h2>
          <p className="mt-3 text-stone-700 max-w-2xl mx-auto">
            Every canvas ships with two certificates from Mexico verifying
            that the image was printed from the authorized high-resolution
            scan of the tilma. These are what distinguish the canvas from
            generic prints available online.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <figure className="bg-white p-4 rounded-lg shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about/certification.jpg"
              alt="Mexican Catholic Church certification of authenticity"
              className="w-full h-auto object-contain"
            />
            <figcaption className="mt-2 text-sm text-stone-600 text-center">
              Mexican Catholic Church Certification
            </figcaption>
          </figure>
          <figure className="bg-white p-4 rounded-lg shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about/jubileo.jpg"
              alt="Mexico 2000 Jubileo seal of authenticity"
              className="w-full h-auto object-contain"
            />
            <figcaption className="mt-2 text-sm text-stone-600 text-center">
              Mexico 2000 Jubileo Seal
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Uses in parish life */}
      <section className="bg-stone-50 border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-3">
            One image, many uses
          </h2>
          <p className="text-center text-stone-600 mb-10 max-w-2xl mx-auto">
            Parishes across the U.S. have used the 24" × 36" rolled canvas
            for:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              ["Parish Guadalupe shrines", "A framed centerpiece for the shrine — you choose the frame locally to match the space."],
              ["December 12 processions and vigil Masses", "Carried in procession or displayed at the vigil Mass on the feast day."],
              ["Hispanic ministry meeting spaces", "A visible sign of identity and welcome for the ministry room."],
              ["Religious education classrooms", "For catechists teaching the apparition and the image's symbolism."],
              ["Parish office and rectory", "A quiet devotional presence in staff and administrative spaces."],
              ["Fundraising raffles", "A high-value item for a parish raffle — the certificate makes it a real gift, not a promotional print."],
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
        </div>
      </section>

      {/* What you get / product detail */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6">What each canvas is</h2>
        <ul className="space-y-3 text-stone-800 text-lg">
          <li className="flex gap-3">
            <span className="text-[var(--gold)] font-bold">·</span>
            <span>
              <strong>24" × 36"</strong> — substantial size for a parish
              space, small enough to ship rolled without a crate
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-[var(--gold)] font-bold">·</span>
            <span>
              Printed on archival canvas in <strong>Mexico</strong>, from a
              high-resolution digital scan of the original tilma
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-[var(--gold)] font-bold">·</span>
            <span>
              <strong>Ships rolled</strong> in a protective tube — take it
              to a local frame shop, or stretch it yourself
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-[var(--gold)] font-bold">·</span>
            <span>
              <strong>Certificate of authenticity</strong> included with
              every canvas
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-[var(--gold)] font-bold">·</span>
            <span>
              <strong>$114</strong> — free shipping to the 50 U.S. states and
              Puerto Rico
            </span>
          </li>
        </ul>

        <div className="mt-10 p-6 bg-stone-50 border border-stone-200 rounded-lg">
          <h3 className="font-semibold mb-2">Bulk orders</h3>
          <p className="text-stone-700 text-sm leading-relaxed">
            Ordering multiple canvases for a diocesan initiative, retreat,
            or school? Email{" "}
            <a
              href="mailto:wfleonard@primosmaternos.com?subject=Bulk%20order%20—%20Our%20Lady%20of%20Guadalupe%20canvas"
              className="text-[var(--accent)] underline"
            >
              wfleonard@primosmaternos.com
            </a>{" "}
            or text 732-673-4260 for a quote.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[var(--accent)] text-white">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <h2 className="text-3xl font-bold mb-3">Order for your parish</h2>
          <p className="text-white/90 mb-6">
            {formatPrice(PRICE_CENTS)} · free shipping · certificate of
            authenticity · secure checkout by Stripe
          </p>
          <div className="inline-block bg-white text-stone-900 rounded-md p-2">
            <BuyButton sku={SKU} />
          </div>
        </div>
      </section>
    </>
  );
}
