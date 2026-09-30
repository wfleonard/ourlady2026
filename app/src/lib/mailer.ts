import nodemailer from "nodemailer";
import { ORG, SITE_URL } from "@/lib/site";
import { formatPrice } from "@/lib/db";

// Owner-facing order alerts. Stripe's own "successful payment" emails are an
// account setting that is easy to leave off, so the store sends its own.
// SMTP is the Google Workspace relay (smtp-relay.gmail.com:587), which
// authenticates by the server's IP, so SMTP_USER/SMTP_PASS stay blank. Setting
// them switches to password login (e.g. smtp.gmail.com with an app password).
// If SMTP_HOST isn't set the alert is skipped with a warning; the order is
// still saved.

const host = process.env.SMTP_HOST;
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const port = Number(process.env.SMTP_PORT || 587);

export const transport = host
  ? nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      requireTLS: port !== 465,
      // Google's relay rejects the container hostname Nodemailer would send in EHLO.
      name: "primosmaternos.com",
      auth: user && pass ? { user, pass } : undefined,
    })
  : null;

export type OrderAlert = {
  orderId: number;
  customerName: string | null;
  customerEmail: string | null;
  amountTotalCents: number;
  items: { name: string; quantity: number; unitPriceCents: number }[];
  shipping: string[];
  paymentIntent: string | null;
  livemode: boolean;
};

export async function sendOrderAlert(order: OrderAlert): Promise<void> {
  if (!transport) {
    console.warn("SMTP not configured — skipping order alert for order", order.orderId);
    return;
  }

  const to = process.env.ORDER_NOTIFY_TO || ORG.email;
  const from = process.env.MAIL_FROM || `Primos Maternos Store <${ORG.email}>`;
  const total = formatPrice(order.amountTotalCents);
  const mode = order.livemode ? "" : "[TEST] ";
  const stripeLink = order.paymentIntent
    ? `https://dashboard.stripe.com/${order.livemode ? "" : "test/"}payments/${order.paymentIntent}`
    : null;

  const lines = [
    `New order #${order.orderId} — ${total}`,
    "",
    `Customer: ${order.customerName ?? "(no name)"} <${order.customerEmail ?? "no email"}>`,
    "",
    "Items:",
    ...order.items.map(
      (i) => `  ${i.quantity} × ${i.name} @ ${formatPrice(i.unitPriceCents)}`
    ),
    "",
    "Ship to:",
    ...(order.shipping.length ? order.shipping.map((l) => `  ${l}`) : ["  (no shipping address)"]),
    "",
    ...(stripeLink ? [`Stripe: ${stripeLink}`] : []),
    `Store: ${SITE_URL}`,
  ];

  await transport.sendMail({
    from,
    to,
    replyTo: order.customerEmail ?? undefined,
    subject: `${mode}New Primos Maternos order #${order.orderId} — ${total}`,
    text: lines.join("\n"),
  });
}
