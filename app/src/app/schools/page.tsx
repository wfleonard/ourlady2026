import Link from "next/link";
import { BuyButton } from "@/components/BuyButton";
import { formatPrice } from "@/lib/db";

export const metadata = {
  alternates: { canonical: "/schools" },
  title: "For Your Catholic School — Our Lady of Guadalupe Canvas",
  description:
    "24\" × 36\" rolled canvas of the tilma, printed from a digital archive of the Sacred Original certified in Mexico in 1998 as a faithful reproduction; the canvas is printed in the USA. Two Mexican certifications included. $114 per canvas, free U.S. shipping — for religious ed classrooms, school chapels, and December 12 celebrations.",
};

const PRICE_CENTS = 11400;
const SKU = "olg-24x36-rolled";

export default function SchoolsPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-stone-200 bg-gradient-to-b from-stone-50 to-[var(--background)]">
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm uppercase tracking-widest text-[var(--gold)] font-semibold">
              For Catholic Schools
            </p>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight">
              An authentic tilma image for every classroom
            </h1>
            <p className="mt-5 text-lg text-stone-700 leading-relaxed">
              A 24" × 36" rolled canvas reproduction of the tilma of Saint
              Juan Diego, printed from a digital archive of the Sacred
              Original that <strong>Cardinal Norberto Rivera Carrera,
              Archbishop Primate of Mexico</strong>, certified on{" "}
              <strong>December 12, 1998</strong> as a faithful
              reproduction. The image, known as the{" "}
              <strong>Virgen Peregrina</strong>, was blessed by{" "}
              <strong>Pope John Paul II on January 25, 1999</strong>. The
              canvas is printed in the USA on archival stock. Two Mexican
              certifications are included with every canvas.
            </p>
            <div className="mt-6 flex items-baseline gap-4">
              <span className="text-4xl font-bold text-[var(--accent)]">
                {formatPrice(PRICE_CENTS)}
              </span>
              <span className="text-sm text-stone-600">
                per canvas · free shipping · 50 U.S. states + Puerto Rico
              </span>
            </div>
            <div className="mt-6">
              <BuyButton sku={SKU} />
              <p className="mt-2 text-xs text-stone-500">
                Ordering for multiple classrooms? See the bulk section below.
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
            The Guadalupe Jubilee Year lands mid-school-year
          </h2>
          <p className="mt-3 text-white/90 max-w-2xl mx-auto">
            Pope Leo XIV has granted a Jubilee Year running Oct 12, 2026
            through Oct 12, 2027 — marking 50 years since the tilma was
            transferred into the current Basilica. A natural anchor for
            religious ed units this year.
          </p>
          <Link
            href="/blog/jubilee-2026"
            className="inline-block mt-5 px-5 py-2 border border-white/60 rounded-md text-sm font-semibold hover:bg-white hover:text-[var(--accent)] transition"
          >
            Read about the Jubilee →
          </Link>
        </div>
      </section>

      {/* School use cases */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-3">
          One canvas, many places in a school
        </h2>
        <p className="text-center text-stone-600 mb-10 max-w-2xl mx-auto">
          Catholic schools have used the 24" × 36" rolled canvas for:
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            ["Religious education classrooms", "One per classroom means every religion teacher has the actual image on the wall during the Dec 12 unit."],
            ["School chapel or prayer room", "A visible focal point for morning prayer, Advent, and feast-day Masses."],
            ["Main hallway or lobby", "Sets tone from the first door — especially at schools with a strong Hispanic community."],
            ["Library and study spaces", "Beside a Marian book display or Latin American history section."],
            ["Cafeteria or student commons", "Displayed above a small altar or memorial space during December."],
            ["Faculty lounge and offices", "Quiet devotional presence in staff spaces during the busy Advent weeks."],
            ["Dec 12 processions and Masses", "Carried in procession or stationed at the altar for the school Mass on the feast day."],
            ["Graduation gift or class legacy", "Framed and gifted by a graduating class as a permanent addition to the school."],
            ["Bulk parish + school orders", "Diocesan or school-district orders across multiple buildings — email for a quote."],
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

      {/* Curriculum connections */}
      <section className="bg-stone-50 border-y border-stone-200">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-4">
            Ties into what you're already teaching
          </h2>
          <p className="text-stone-700 leading-relaxed mb-6">
            The image is a natural fit for units across the curriculum, not
            just religion class. Two short pieces on the site — free to link
            from your LMS or share in a bulletin — go deep on why:
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <Link
              href="/blog/codex-symbols"
              className="block bg-white p-6 rounded-lg border border-stone-200 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-[var(--accent)] mb-2">
                A Codex in the Image
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                What the Aztecs read at a glance — the mestiza face, the
                Nahui Ollin, the winter-solstice constellations on her
                mantle. Good for religion, history, and Spanish classes.
              </p>
              <span className="text-sm font-semibold text-[var(--accent)] mt-3 inline-block">
                Read →
              </span>
            </Link>
            <Link
              href="/blog/tilma-science"
              className="block bg-white p-6 rounded-lg border border-stone-200 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-[var(--accent)] mb-2">
                What Science Cannot Explain
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                The Nobel chemist, the NASA scientist, the 13 figures found
                in the eyes. Faith-and-science material for high school
                religion or philosophy.
              </p>
              <span className="text-sm font-semibold text-[var(--accent)] mt-3 inline-block">
                Read →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Certificates — trust chain for a religion-department review */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-stone-200">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Two Mexican certifications</h2>
          <p className="mt-3 text-stone-700 max-w-2xl mx-auto">
            Both documents ship with every canvas. Religion teachers,
            campus ministers, and department chairs can read them
            alongside the image and cross-check the language. Full text
            in Spanish and English is on our{" "}
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
      </section>

      {/* Bulk pricing */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6">
          Bulk orders for schools and dioceses
        </h2>
        <p className="text-stone-700 mb-6 leading-relaxed">
          A school outfitting every religion classroom (typical: 5–15
          canvases) or a diocese ordering across multiple parishes and
          schools gets a bulk quote. Email or text with the quantity and
          the shipping address(es):
        </p>
        <div className="p-6 bg-stone-50 border border-stone-200 rounded-lg space-y-2">
          <p className="text-stone-800">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:wfleonard@primosmaternos.com?subject=Bulk%20order%20for%20our%20school%20%2F%20diocese&body=How%20many%20canvases%3A%20%0AShipping%20address(es)%3A%20%0AAny%20deadline%3A%20"
              className="text-[var(--accent)] underline"
            >
              wfleonard@primosmaternos.com
            </a>
          </p>
          <p className="text-stone-800">
            <strong>Text:</strong>{" "}
            <a href="sms:+17326734260" className="text-[var(--accent)] underline">
              732-673-4260
            </a>
          </p>
          <p className="text-stone-800">
            <strong>Purchase orders:</strong> accepted — reply to your quote
            with the PO number and we'll invoice accordingly.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[var(--accent)] text-white">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <h2 className="text-3xl font-bold mb-3">Order for your school</h2>
          <p className="text-white/90 mb-6">
            {formatPrice(PRICE_CENTS)} per canvas · free shipping ·
            two certificates from Mexico · bulk quotes on request
          </p>
          <div className="inline-block bg-white text-stone-900 rounded-md p-2">
            <BuyButton sku={SKU} />
          </div>
        </div>
      </section>
    </>
  );
}
