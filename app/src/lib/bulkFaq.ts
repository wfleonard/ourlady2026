import { BULK_ORDERS as B, HANDLING_DAYS, ORG } from "@/lib/site";
import { esProductPath } from "@/lib/catalogEs";

/**
 * The quantity-order questions parishes, schools and dioceses ask an assistant
 * before they ask us: volume pricing, purchase orders and Net 30, tax-exempt
 * certificates, split shipping, and which size to buy. One list feeds both the
 * visible Q&A and the FAQPage JSON-LD (see `BulkOrdering.tsx`), so the two
 * cannot drift apart. Terms come from `BULK_ORDERS` in site.ts.
 *
 * Prices are written out because an answer is quoted as text. Keep them in
 * step with db/init.sql: 12x18 $57, 24x36 $114 unframed / $214 framed,
 * 36x54 $324.
 */

export type Audience = "parish" | "school" | "diocese";
export type Locale = "en" | "es";
export type QA = { q: string; a: string };
export type UseCase = { title: string; size: string; price: string; text: string; href: string };

const WHO_EN: Record<Audience, string> = {
  parish: "parishes",
  school: "Catholic schools",
  diocese: "dioceses",
};

const SIZE_Q_EN: Record<Audience, string> = {
  parish: "What size Our Lady of Guadalupe picture should a parish buy?",
  school: "What size Our Lady of Guadalupe picture should we buy for each classroom?",
  diocese: "What size Our Lady of Guadalupe picture should a diocese order for its parishes and schools?",
};

const contactEn = `email ${ORG.email} or text ${ORG.phone}`;
const contactEs = `escriba a ${ORG.email} o envíe un mensaje de texto al ${ORG.phone}`;

function faqEn(audience: Audience): QA[] {
  return [
    {
      q: `Do you offer volume pricing for ${WHO_EN[audience]}?`,
      a: `Yes. One to ${B.retailMax} canvases are at the store price. From ${B.smallGroup.min} to ${B.smallGroup.max} of the same canvas there is a small-group discount, from ${B.institutional.min} to ${B.institutional.max} institutional pricing, and from ${B.diocesanMin} up the diocesan tier with the best pricing. Each tier is quoted: ${contactEn} with the quantity and sizes, and we send a written quote within one business day.`,
    },
    {
      q: "Do you accept purchase orders and Net 30 terms?",
      a: `Yes. Parishes, Catholic schools and diocesan offices can all order against a purchase order: reply to your written quote with the PO number and we invoice against it. Net ${B.netDays} terms are for established accounts. On a first order, payment by check, ACH or credit card is due before the canvases ship.`,
    },
    {
      q: "How do we submit a tax-exempt certificate?",
      a: `You do not need to. Primos Maternos does not charge sales tax on any order, so the price on the quote or at checkout is the total. If your office requires a certificate on file anyway, email it to ${ORG.email} with your purchase order and we keep it with your account.`,
    },
    {
      q: "Can one order ship to several addresses?",
      a: `Yes. One quote and one purchase order can cover shipments to several parishes, schools or classrooms. Shipping everything to one address, such as a chancery or a school office, is fastest: quantity orders ship ${B.fulfillmentWeeks.min} to ${B.fulfillmentWeeks.max} weeks from the purchase order. Splitting the order across addresses adds ${B.splitExtraWeeks.min} to ${B.splitExtraWeeks.max} weeks and a per-shipment charge, which we build into the quote.`,
    },
    {
      q: SIZE_Q_EN[audience],
      a: "The 12 by 18 inch canvas, $57, ready to hang, for each classroom, office or small chapel. The 36 by 54 inch canvas, $324, for a parish hall, a church wall or a Hispanic ministry space, where it is seen from across the room; it ships rolled for local framing. The 24 by 36 inch canvas, $114 unframed or $214 framed, sits between them and suits the altar or procession on the December 12 feast.",
    },
  ];
}

function faqEs(): QA[] {
  return [
    {
      q: "¿Ofrecen precios por volumen para parroquias?",
      a: `Sí. De uno a ${B.retailMax} lienzos se paga el precio de la tienda. De ${B.smallGroup.min} a ${B.smallGroup.max} del mismo lienzo hay un descuento para grupos pequeños; de ${B.institutional.min} a ${B.institutional.max}, precio institucional; y desde ${B.diocesanMin}, el nivel diocesano, con el mejor precio. Cada nivel se cotiza: ${contactEs} con la cantidad y los tamaños, y le enviamos una cotización por escrito en un día hábil.`,
    },
    {
      q: "¿Aceptan órdenes de compra y pago a 30 días (Net 30)?",
      a: `Sí. Parroquias, escuelas católicas y oficinas diocesanas pueden hacer su pedido con una orden de compra: responda a su cotización con el número de la orden y facturamos contra ella. El pago a ${B.netDays} días es para cuentas establecidas. En un primer pedido, el pago con cheque, ACH o tarjeta de crédito se hace antes del envío.`,
    },
    {
      q: "¿Cómo enviamos un certificado de exención de impuestos?",
      a: `No hace falta. Primos Maternos no cobra impuesto sobre las ventas en ningún pedido, así que el precio de la cotización o del pago en línea es el total. Si su oficina exige tener un certificado archivado, envíelo a ${ORG.email} junto con su orden de compra y lo guardamos con su cuenta.`,
    },
    {
      q: "¿Un mismo pedido puede enviarse a varias direcciones?",
      a: `Sí. Una cotización y una orden de compra pueden cubrir envíos a varias parroquias, escuelas o salones. Enviar todo a una sola dirección, como la cancillería o la oficina parroquial, es lo más rápido: los pedidos por cantidad salen de ${B.fulfillmentWeeks.min} a ${B.fulfillmentWeeks.max} semanas después de la orden de compra. Dividir el pedido entre varias direcciones añade de ${B.splitExtraWeeks.min} a ${B.splitExtraWeeks.max} semanas y un cargo por envío, que incluimos en la cotización.`,
    },
    {
      q: "¿Qué tamaño de imagen de la Virgen de Guadalupe conviene a una parroquia?",
      a: "El lienzo de 12 por 18 pulgadas, de $57, listo para colgar, para cada salón de clase, oficina o capilla pequeña. El lienzo de 36 por 54 pulgadas, de $324, para el salón parroquial, una pared de la iglesia o el espacio del ministerio hispano, donde se ve desde el otro lado de la sala; se envía enrollado para enmarcarlo localmente. El de 24 por 36 pulgadas, de $114 sin marco o $214 enmarcado, queda entre los dos y sirve para el altar o la procesión de la fiesta del 12 de diciembre.",
    },
  ];
}

export function bulkFaq(audience: Audience, locale: Locale = "en"): QA[] {
  return locale === "es" ? faqEs() : faqEn(audience);
}

export function bulkUseCases(locale: Locale = "en"): UseCase[] {
  if (locale === "es") {
    return [
      {
        title: "Una imagen para cada salón de clase",
        size: '12" × 18"',
        price: "$57",
        text: "Llega lista para colgar, sin enmarcar. Una por salón o aula de catequesis; desde 5 lienzos le enviamos una cotización por volumen.",
        href: esProductPath("olg-12x18-gallery-wrap"),
      },
      {
        title: "Una imagen grande para el salón parroquial o el ministerio hispano",
        size: '36" × 54"',
        price: "$324",
        text: "El tamaño más grande, pensado para verse desde el otro lado de un salón, un espacio de ministerio o una pared de la iglesia. Se envía enrollado en un tubo para que un enmarcador local lo monte.",
        href: esProductPath("olg-36x54-rolled"),
      },
      {
        title: "Imágenes para la fiesta del 12 de diciembre",
        size: '24" × 36"',
        price: "$114 sin marco · $214 enmarcado",
        text: `Para el altar, la procesión y la misa de vigilia. Un lienzo sale en ${HANDLING_DAYS.min} a ${HANDLING_DAYS.max} días hábiles; los pedidos por cantidad salen de ${B.fulfillmentWeeks.min} a ${B.fulfillmentWeeks.max} semanas después de la orden de compra, así que pida su cotización a principios de noviembre.`,
        href: esProductPath("olg-24x36-rolled"),
      },
    ];
  }
  return [
    {
      title: "A picture for every classroom",
      size: '12" × 18"',
      price: "$57",
      text: "Arrives ready to hang, no framing needed. One per classroom or religion room; from 5 canvases we send a volume quote.",
      href: "/products/olg-12x18-gallery-wrap",
    },
    {
      title: "A large image for the parish hall or Hispanic ministry",
      size: '36" × 54"',
      price: "$324",
      text: "The largest size, meant to be seen across a hall, a ministry room or a church wall. Ships rolled in a tube for a local framer to stretch or frame.",
      href: "/products/olg-36x54-rolled",
    },
    {
      title: "Images for the December 12 feast",
      size: '24" × 36"',
      price: "$114 unframed · $214 framed",
      text: `For the feast-day altar, the procession and the vigil Mass. A single canvas leaves us in ${HANDLING_DAYS.min} to ${HANDLING_DAYS.max} business days; quantity orders ship ${B.fulfillmentWeeks.min} to ${B.fulfillmentWeeks.max} weeks from the purchase order, so ask for a quote by early November.`,
      href: "/products/olg-24x36-rolled",
    },
  ];
}
