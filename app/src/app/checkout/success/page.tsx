import Link from "next/link";
import { ORG, HANDLING_DAYS } from "@/lib/site";

/**
 * A step in a purchase, not a page anyone should reach from search.
 * But it IS the highest-anxiety moment a first-time buyer will have —
 * they just paid $200+ to a small shop, and the receipt hasn't landed
 * yet. What this page says in the next thirty seconds shapes whether
 * they email in a panic on day three or wait patiently through the
 * handling window.
 */
export const metadata = {
  robots: { index: false, follow: false },
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Thank you for your order</h1>
        <p className="mt-4 text-lg text-stone-700">
          Your payment was received. A Stripe receipt is on its way to
          your email.
        </p>
      </div>

      <div className="mt-10 bg-stone-50 border border-stone-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-3">What happens next</h2>
        <ul className="space-y-3 text-stone-700 leading-relaxed">
          <li>
            <strong>
              Ships within {HANDLING_DAYS.min}–{HANDLING_DAYS.max} business
              days
            </strong>{" "}
            from Tinton Falls, NJ. Small operation, careful packing.
          </li>
          <li>
            <strong>What's in the box:</strong> the canvas, both Mexican
            certifications (1998 Rivera Carrera + Virgen Peregrina/John
            Paul II 1999), and packaging matched to the SKU — protective
            tube for rolled canvases, corner-protected double box for the
            framed pieces.
          </li>
          <li>
            <strong>Tracking</strong> emails when the label prints — check
            the address you gave Stripe.
          </li>
          <li>
            <strong>Questions?</strong>{" "}
            <a
              href={`mailto:${ORG.email}?subject=My%20Primos%20Maternos%20order`}
              className="text-[var(--accent)] underline"
            >
              {ORG.email}
            </a>
            {" "}or text 732-673-4260. Include the reference below if you
            have it handy.
          </li>
        </ul>
      </div>

      {session_id && (
        <p className="mt-4 text-xs text-stone-400 text-center break-all">
          Reference: {session_id}
        </p>
      )}

      <div className="mt-10 text-center">
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[var(--accent)] text-white font-semibold rounded-md hover:opacity-90 transition"
        >
          Back to the store
        </Link>
        <p className="mt-6 text-sm text-stone-500 max-w-md mx-auto">
          While you wait, the{" "}
          <Link href="/authenticity" className="text-[var(--accent)] underline">
            Authenticity page
          </Link>
          {" "}walks through the 1998 Rivera Carrera certification, the 1999
          Virgen Peregrina blessing, and both certificate scans at full
          resolution.
        </p>
      </div>
    </div>
  );
}
