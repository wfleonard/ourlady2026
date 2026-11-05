import Link from "next/link";
import { ORG, HANDLING_DAYS } from "@/lib/site";
import { ES_BASE } from "@/lib/catalogEs";
import { stripe } from "@/lib/stripe";
import { MetaPixelEvent } from "@/components/MetaPixelEvent";

/**
 * Purchase event for the Meta Pixel, built from the Stripe session itself
 * so the value is what was actually charged. Only paid, live sessions
 * count: a test-mode order would teach the ads to find the wrong people.
 * Any Stripe error just skips the event; the page still renders.
 */
async function purchaseEvent(sessionId: string | undefined) {
  if (!sessionId?.startsWith("cs_live_")) return null;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid" || session.amount_total == null) return null;
    return {
      eventId: session.id,
      params: {
        value: session.amount_total / 100,
        currency: (session.currency ?? "usd").toUpperCase(),
        content_ids: session.metadata?.sku ? [session.metadata.sku] : [],
        content_type: "product",
        num_items: 1,
      },
    };
  } catch {
    return null;
  }
}

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

const PHONE = "732-673-4260";
const MAIL_SUBJECT = { en: "My Primos Maternos order", es: "Mi pedido de Primos Maternos" };

/** Orders from the Spanish pages come back with lang=es (see /api/checkout). */
const TEXT = {
  en: {
    title: "Thank you for your order",
    received: "Your payment was received. A Stripe receipt is on its way to your email.",
    next: "What happens next",
    ships: `Ships within ${HANDLING_DAYS.min}–${HANDLING_DAYS.max} business days`,
    shipsRest: " from Tinton Falls, NJ. Small operation, careful packing.",
    boxLabel: "What's in the box:",
    box: " the canvas, both Mexican certifications (1998 Rivera Carrera + Virgen Peregrina/John Paul II 1999), and packaging matched to the SKU — protective tube for rolled canvases, corner-protected double box for the framed pieces.",
    trackingLabel: "Tracking",
    tracking: " emails when the label prints — check the address you gave Stripe.",
    questions: "Questions?",
    contactRest: ` or text ${PHONE}. Include the reference below if you have it handy.`,
    reference: "Reference",
    back: "Back to the store",
    backHref: "/",
    waitBefore: "While you wait, the ",
    waitLink: "Authenticity page",
    waitAfter: " walks through the 1998 Rivera Carrera certification, the 1999 Virgen Peregrina blessing, and both certificate scans at full resolution.",
  },
  es: {
    title: "Gracias por su pedido",
    received: "Recibimos su pago. Stripe le enviará el recibo a su correo electrónico.",
    next: "Qué sigue",
    ships: `Se envía en ${HANDLING_DAYS.min} a ${HANDLING_DAYS.max} días hábiles`,
    shipsRest: " desde Tinton Falls, Nueva Jersey. Somos un negocio pequeño y empacamos con cuidado.",
    boxLabel: "Qué incluye la caja:",
    box: " el cuadro, las dos certificaciones mexicanas (la del cardenal Rivera Carrera de 1998 y la de la Virgen Peregrina bendecida por Juan Pablo II en 1999) y el empaque adecuado: un tubo protector para los lienzos enrollados y una caja doble con esquineros para los cuadros con marco.",
    trackingLabel: "El número de rastreo",
    tracking: " le llega por correo cuando se imprime la etiqueta; revise el correo que le dio a Stripe.",
    questions: "¿Preguntas?",
    contactRest: ` o envíe un mensaje de texto al ${PHONE}. Si lo tiene a mano, incluya la referencia de abajo.`,
    reference: "Referencia",
    back: "Volver a los cuadros",
    backHref: ES_BASE,
    waitBefore: "Mientras espera, la ",
    waitLink: "página de autenticidad (en inglés)",
    waitAfter: " explica la certificación de 1998 del cardenal Rivera Carrera, la bendición de la Virgen Peregrina en 1999 y muestra los dos certificados en alta resolución.",
  },
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; lang?: string }>;
}) {
  const { session_id, lang } = await searchParams;
  const locale = lang === "es" ? "es" : "en";
  const t = TEXT[locale];
  const purchase = await purchaseEvent(session_id);
  return (
    <div lang={locale} className="max-w-2xl mx-auto px-6 py-16">
      {purchase && (
        <MetaPixelEvent event="Purchase" params={purchase.params} eventId={purchase.eventId} />
      )}
      <div className="text-center">
        <h1 className="text-3xl font-bold">{t.title}</h1>
        <p className="mt-4 text-lg text-stone-700">{t.received}</p>
      </div>

      <div className="mt-10 bg-stone-50 border border-stone-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-3">{t.next}</h2>
        <ul className="space-y-3 text-stone-700 leading-relaxed">
          <li>
            <strong>{t.ships}</strong>
            {t.shipsRest}
          </li>
          <li>
            <strong>{t.boxLabel}</strong>
            {t.box}
          </li>
          <li>
            <strong>{t.trackingLabel}</strong>
            {t.tracking}
          </li>
          <li>
            <strong>{t.questions}</strong>{" "}
            <a
              href={`mailto:${ORG.email}?subject=${encodeURIComponent(MAIL_SUBJECT[locale])}`}
              className="text-[var(--accent)] underline"
            >
              {ORG.email}
            </a>
            {t.contactRest}
          </li>
        </ul>
      </div>

      {session_id && (
        <p className="mt-4 text-xs text-stone-400 text-center break-all">
          {t.reference}: {session_id}
        </p>
      )}

      <div className="mt-10 text-center">
        <Link
          href={t.backHref}
          className="inline-block px-6 py-3 bg-[var(--accent)] text-[var(--gold)]! font-semibold rounded-md hover:opacity-90 transition"
        >
          {t.back}
        </Link>
        <p className="mt-6 text-sm text-stone-500 max-w-md mx-auto">
          {t.waitBefore}
          <Link href="/authenticity" className="text-[var(--accent)] underline">
            {t.waitLink}
          </Link>
          {t.waitAfter}
        </p>
      </div>
    </div>
  );
}
