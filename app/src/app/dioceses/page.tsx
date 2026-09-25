import Link from "next/link";
import { formatPrice } from "@/lib/db";

export const metadata = {
  alternates: { canonical: "/dioceses" },
  title: "For Dioceses — Bulk Our Lady of Guadalupe Canvas Program",
  description:
    "Diocesan bulk orders of the authentic 24\" × 36\" tilma canvas — for the Jubilee Year of Guadalupe, parish distribution, Catholic school rollouts, and bishop's-office gift programs. PO invoicing accepted.",
};

export default function DiocesesPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-stone-200 bg-gradient-to-b from-stone-50 to-[var(--background)]">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="text-sm uppercase tracking-widest text-[var(--gold)] font-semibold">
            For Diocesan Offices
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
            An authentic Guadalupe canvas for every parish in the diocese
          </h1>
          <p className="mt-5 text-lg text-stone-700 leading-relaxed max-w-3xl">
            The 24" × 36" tilma reproduction, printed from a digital archive
            of the Sacred Original that the Archbishop Primate of Mexico
            certified in 1998 as a faithful reproduction; the canvas is
            printed in the USA. Two Mexican certifications are included with
            every canvas. Volume pricing, purchase orders accepted,
            single-PO fulfillment across every parish or school in your
            diocese.
          </p>
          <p className="mt-4 text-base text-stone-600">
            <strong>Timing:</strong> Pope Leo XIV's Jubilee Year for Our
            Lady of Guadalupe runs{" "}
            <Link href="/blog/jubilee-2026" className="text-[var(--accent)] underline">
              October 12, 2026 through October 12, 2027
            </Link>{" "}
            — a natural anchor for a diocesan-wide initiative.
          </p>
        </div>
      </section>

      {/* Diocesan use cases */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-3">
          What dioceses have used it for
        </h2>
        <p className="text-center text-stone-600 mb-10 max-w-2xl mx-auto">
          Bulk orders that make more sense at the diocesan level than at
          each parish separately.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            [
              "A Jubilee gift to every parish",
              "Distribute one canvas to each parish in the diocese as a marker of the Guadalupe Jubilee Year. Bishop-branded card, single PO, single ship-to (chancery) or split across parishes.",
            ],
            [
              "Catholic school system rollout",
              "One canvas per religion classroom across every parochial school in the diocese. Coordinated with the superintendent's office.",
            ],
            [
              "Hispanic ministry initiative",
              "For the diocese's Hispanic Ministry office to distribute at deanery meetings, retreats, or leadership training.",
            ],
            [
              "Ordination and installation gifts",
              "A standard gift for newly ordained priests, newly installed pastors, or transitional deacons.",
            ],
            [
              "Retiring pastors and jubilarians",
              "A permanent piece for priests marking 25, 40, or 50 years of ordination.",
            ],
            [
              "Cathedral Guadalupe chapel",
              "A large-format canvas for a dedicated Guadalupe side chapel or shrine at the cathedral.",
            ],
            [
              "Newman Centers and Catholic colleges",
              "Distribute to campus ministries at every Catholic college and Newman Center in the diocese.",
            ],
            [
              "Diocesan Marian year initiative",
              "Some dioceses run their own Marian year. This offers a concrete, distributable piece for parish programs.",
            ],
            [
              "Seminary and formation houses",
              "A canvas in the seminary chapel or the residence corridors of formation houses.",
            ],
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

      {/* Pricing tiers */}
      <section className="bg-stone-50 border-y border-stone-200">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-3">Volume pricing</h2>
          <p className="text-stone-700 mb-8 leading-relaxed">
            Retail is {formatPrice(11400)} for a 24" × 36" rolled canvas and{" "}
            {formatPrice(21400)} for a framed 24" × 36". Diocesan bulk
            orders receive tiered pricing — email or text with your
            approximate quantity and we'll send a written quote within one
            business day.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-stone-200 rounded-lg overflow-hidden">
              <thead className="bg-stone-100 text-left text-sm uppercase tracking-widest text-stone-600">
                <tr>
                  <th className="px-4 py-3">Quantity (per SKU)</th>
                  <th className="px-4 py-3">Pricing approach</th>
                </tr>
              </thead>
              <tbody className="text-stone-800">
                <tr className="border-t border-stone-200">
                  <td className="px-4 py-3">1 – 4</td>
                  <td className="px-4 py-3">Retail (standard store pricing)</td>
                </tr>
                <tr className="border-t border-stone-200">
                  <td className="px-4 py-3">5 – 24</td>
                  <td className="px-4 py-3">Small-group discount — quoted</td>
                </tr>
                <tr className="border-t border-stone-200">
                  <td className="px-4 py-3">25 – 99</td>
                  <td className="px-4 py-3">
                    Institutional pricing — quoted, larger discount
                  </td>
                </tr>
                <tr className="border-t border-stone-200 bg-stone-50">
                  <td className="px-4 py-3 font-semibold">100+</td>
                  <td className="px-4 py-3 font-semibold">
                    Diocesan tier — quoted, best pricing (one canvas per parish
                    across most U.S. dioceses)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-stone-500 mt-4">
            Quotes account for SKU mix (framed vs rolled), split-shipping
            requirements, and requested delivery date. Purchase orders
            accepted from established diocesan offices — Net 30 standard.
          </p>
        </div>
      </section>

      {/* Fulfillment */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6">How diocesan orders work</h2>
        <ol className="space-y-6 text-stone-800">
          <li>
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--accent)] text-white font-bold flex items-center justify-center">
                1
              </span>
              <div>
                <h3 className="font-semibold">Request a quote</h3>
                <p className="text-stone-600 leading-relaxed mt-1">
                  Email with approximate quantity, SKU mix (framed / rolled /
                  gallery wrap), single or split shipping addresses, and any
                  required delivery date. Written quote returned within one
                  business day.
                </p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--accent)] text-white font-bold flex items-center justify-center">
                2
              </span>
              <div>
                <h3 className="font-semibold">Issue a purchase order</h3>
                <p className="text-stone-600 leading-relaxed mt-1">
                  PO issued against the quote. Net 30 payment terms standard
                  for diocesan offices with established accounts. We can also
                  accept check, ACH, or credit card at your preference.
                </p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--accent)] text-white font-bold flex items-center justify-center">
                3
              </span>
              <div>
                <h3 className="font-semibold">Fulfillment</h3>
                <p className="text-stone-600 leading-relaxed mt-1">
                  Standard fulfillment window for bulk orders is 3–4 weeks
                  from PO. Single ship-to (chancery, warehouse) is fastest;
                  split shipping to individual parishes adds 1–2 weeks and a
                  per-shipment charge that we build into the quote.
                </p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--accent)] text-white font-bold flex items-center justify-center">
                4
              </span>
              <div>
                <h3 className="font-semibold">Certificates and paperwork</h3>
                <p className="text-stone-600 leading-relaxed mt-1">
                  Every canvas ships with the two Mexican certificates of
                  authenticity (Catholic Church certification and 2000 Jubileo
                  seal). Diocesan orders receive a signed invoice on Saxon
                  Enterprises letterhead suitable for accounting records.
                </p>
              </div>
            </div>
          </li>
        </ol>
      </section>

      {/* Contact CTA */}
      <section className="bg-[var(--accent)] text-white">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-3">Request a quote</h2>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Reply with your diocese, approximate quantity, and target
            delivery date. We'll return a written quote within one business
            day.
          </p>
          <div className="space-y-2">
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:wfleonard@primosmaternos.com?subject=Diocesan%20quote%20request&body=Diocese%3A%20%0AApproximate%20quantity%3A%20%0ASKU%20mix%20(framed%20%2F%20rolled%20%2F%20gallery%20wrap)%3A%20%0AShip-to%20(single%20chancery%20or%20split%20to%20parishes)%3A%20%0ATarget%20delivery%3A%20"
                className="underline"
              >
                wfleonard@primosmaternos.com
              </a>
            </p>
            <p>
              <strong>Text or call:</strong>{" "}
              <a href="sms:+17326734260" className="underline">
                732-673-4260
              </a>
            </p>
          </div>
          <p className="text-white/80 text-sm mt-6">
            William F. Leonard · Saxon Enterprises, Inc. — dba Primos
            Maternos · Tinton Falls, NJ
          </p>
        </div>
      </section>
    </>
  );
}
