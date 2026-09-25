import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ORG, SITE_URL, RETURN_POLICY } from "@/lib/site";

export const metadata = {
  title: "Shipping and Returns — Primos Maternos",
  description:
    "Free shipping to all 50 states and Puerto Rico, dispatch in 5 to 10 business days, 30-day returns, and free replacement of a canvas damaged in transit if you send a photo within 7 days.",
  alternates: { canonical: "/shipping-and-returns" },
};


const faq = [
  {
    q: "How much does shipping cost?",
    a: "Nothing. Shipping is free to all 50 United States and Puerto Rico, at every size, framed or rolled. There is no minimum order and no surcharge on the large canvases.",
  },
  {
    q: "How long until my canvas ships?",
    a: "Five to ten business days. Each canvas is printed and then stretched, framed or rolled for that order rather than pulled from a shelf, and the framed pieces take the longer end of that range. Carrier transit is on top of it.",
  },
  {
    q: "What is the return policy?",
    a: "Thirty days from delivery. Send it back in its original condition and packaging and you get a full refund of what you paid for the canvas. Return shipping is the buyer's to arrange and pay for. A rolled canvas that has already been stretched or framed cannot go back, because it can no longer be resold.",
  },
  {
    q: "What if my canvas arrives damaged?",
    a: "Email a photo within 7 days of delivery and a replacement ships free. Do not send the damaged canvas back, and do not pay to return anything: keep it or dispose of it. Photograph the outer box as well as the canvas if the box took the damage, because that is what the carrier claim needs.",
  },
  {
    q: "Can I cancel or change my order?",
    a: "Within 24 hours of placing it, yes, for a full refund. After that the canvas is usually in production and cannot be pulled back. If the order has not yet shipped it is always worth emailing to ask.",
  },
  {
    q: "When should I order for December 12?",
    a: "By mid-November if the canvas needs framing after it arrives, and by the third week of November for a framed or gallery wrap piece that hangs straight from the box. Dispatch takes five to ten business days before carrier transit, and December is the carriers' worst month.",
  },
  {
    q: "Do you ship outside the United States?",
    a: "Not at present. Shipping covers the 50 states and Puerto Rico.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/shipping-and-returns#faq`,
  mainEntity: faq.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const policyJsonLd = {
  "@context": "https://schema.org",
  ...RETURN_POLICY,
};

export default function ShippingAndReturnsPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={policyJsonLd} />

      <section className="border-b border-stone-200 bg-gradient-to-b from-stone-50 to-[var(--background)]">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <p className="text-sm uppercase tracking-widest text-[var(--gold)] font-semibold">
            Before you order
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto">
            Shipping and returns
          </h1>
          <p className="mt-5 text-lg text-stone-700 leading-relaxed max-w-2xl mx-auto">
            Free shipping to all 50 states and Puerto Rico. Five to ten business days before it
            leaves us. Thirty days to return it. A canvas damaged in transit is replaced free.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-14 space-y-14 text-stone-700 leading-relaxed">
        <section>
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="rounded-lg border border-stone-200 bg-white p-5">
              <h2 className="font-semibold text-stone-800">Shipping is free</h2>
              <p className="mt-2 text-sm">
                All 50 states and Puerto Rico, every size, framed or rolled. No minimum, and no
                surcharge on the 36&quot; × 54&quot;.
              </p>
            </div>
            <div className="rounded-lg border border-stone-200 bg-white p-5">
              <h2 className="font-semibold text-stone-800">5 to 10 business days</h2>
              <p className="mt-2 text-sm">
                Before it leaves us, plus carrier transit. Framed pieces take the longer end.
              </p>
            </div>
            <div className="rounded-lg border border-stone-200 bg-white p-5">
              <h2 className="font-semibold text-stone-800">30 days to return</h2>
              <p className="mt-2 text-sm">
                Full refund on the canvas. Return shipping is yours to arrange and pay for.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold">Shipping</h2>
          <p className="mt-4">
            Shipping is free to all 50 United States and Puerto Rico. That applies at every size
            and every finish, with no minimum order, and the 36&quot; × 54&quot; carries no
            surcharge even though it is the most awkward piece to send. We do not ship outside
            the United States at present.
          </p>
          <p className="mt-4">
            Orders leave us <strong>five to ten business days</strong> after they are placed.
            Nothing here is pulled off a shelf: each canvas is printed for the order and then
            stretched, framed or rolled, and the framed pieces sit at the longer end of that
            range. Carrier transit comes on top of it.
          </p>
          <p className="mt-4">
            Rolled canvases travel in a protective tube. Framed and gallery wrap pieces travel
            boxed and ready to hang. Whatever you order, both Mexican certifications come with
            it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold">If it arrives damaged</h2>
          <p className="mt-4">
            <strong>Email a photo within 7 days of delivery and a replacement ships free.</strong>{" "}
            You do not send the damaged canvas back and you do not pay to return anything. Keep
            it or dispose of it, whichever you prefer.
          </p>
          <p className="mt-4">
            Photograph the outer box as well as the canvas, especially if the box is what took
            the blow. That photograph is what a carrier claim turns on, and having it decides the
            matter in an email rather than a correspondence.
          </p>
          <p className="mt-4">
            Send it to{" "}
            <a href={`mailto:${ORG.email}`} className="text-[var(--accent)] underline">
              {ORG.email}
            </a>{" "}
            with your order number.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold">Returns</h2>
          <p className="mt-4">
            If the canvas is simply not what you wanted, you have{" "}
            <strong>30 days from delivery</strong>. Send it back in its original condition and
            packaging and we refund the full price of the canvas. Return shipping is yours to
            arrange and to pay for, which is why it is worth deciding the size before you order
            rather than after.
          </p>
          <p className="mt-4">
            One limit, and it is a practical one rather than a technicality: a rolled canvas that
            has already been stretched or framed cannot be returned, because it can no longer be
            sold to anyone else. If you are unsure between sizes, the{" "}
            <Link href="/canvas-sizes" className="text-[var(--accent)] underline">
              size guide
            </Link>{" "}
            gives the viewing distance and hanging height for each one, which is usually what
            settles it.
          </p>
          <p className="mt-4">
            Refunds go back to the card that paid, and your bank adds its own few days after we
            issue it. Start a return by emailing{" "}
            <a href={`mailto:${ORG.email}`} className="text-[var(--accent)] underline">
              {ORG.email}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold">Cancelling or changing an order</h2>
          <p className="mt-4">
            Within <strong>24 hours</strong> of placing an order you can cancel it for a full
            refund, or change the size or frame. After that the canvas is usually already in
            production. If it has not shipped it is still worth asking, and we will do what we
            can.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold">Ordering for December 12</h2>
          <p className="mt-4">
            The feast of Our Lady of Guadalupe is December 12 and the novena begins December 3.
            Working backwards from five to ten business days of dispatch, then carrier transit in
            the month carriers are at their worst:
          </p>
          <ul className="mt-5 space-y-2 list-disc list-inside">
            <li>
              <strong>Order by mid-November</strong> for a rolled canvas, which still needs
              stretching or framing after it reaches you.
            </li>
            <li>
              <strong>Order by the third week of November</strong> for a framed or gallery wrap
              piece, which hangs straight from the box.
            </li>
          </ul>
          <p className="mt-4">
            Parishes and schools ordering in quantity should allow longer still and talk to us
            first:{" "}
            <Link href="/parishes" className="text-[var(--accent)] underline">
              parishes
            </Link>
            ,{" "}
            <Link href="/schools" className="text-[var(--accent)] underline">
              schools
            </Link>
            ,{" "}
            <Link href="/dioceses" className="text-[var(--accent)] underline">
              dioceses
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold">Questions</h2>
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
