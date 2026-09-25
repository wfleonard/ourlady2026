/**
 * One place for the facts that machines read about this business.
 *
 * Search engines and AI assistants answer buyer questions from structured data
 * and a sitemap long before they read the prose. Everything here feeds
 * `robots.ts`, `sitemap.ts`, and the JSON-LD in the layout and page files.
 */

/** Absolute site origin, no trailing slash. Stripe return URLs use the same variable. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://primosmaternos.com"
).replace(/\/$/, "");

export function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const ORG = {
  name: "Primos Maternos",
  legalName: "Saxon Enterprises, Inc.",
  description:
    "Our Lady of Guadalupe canvases printed from a digital archive of the Sacred Original, certified in Mexico in 1998 as a faithful reproduction. Printed in the United States.",
  email: "wfleonard@primosmaternos.com",
  city: "Tinton Falls",
  state: "NJ",
  country: "US",
} as const;

/**
 * Crawlers that fetch pages live when an assistant answers a question. They are
 * named rather than left to the catch-all rule so a later broad `Disallow`
 * can't shut them out by accident: a page they cannot fetch cannot be cited.
 */
export const AI_CRAWLERS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "Claude-SearchBot",
  "Claude-User",
  "Google-Extended",
] as const;

/** Nothing a buyer or a crawler should land on: checkout flow and API routes. */
export const PRIVATE_PATHS = ["/api/", "/checkout/"] as const;

/**
 * The returns policy in the form Google and assistants read, kept here so the
 * page that states it in prose and the product offers that reference it cannot
 * drift apart. Prose lives at /shipping-and-returns.
 */
export const RETURN_POLICY = {
  "@type": "MerchantReturnPolicy",
  "@id": `${SITE_URL}/shipping-and-returns#returns`,
  name: "30-day returns",
  applicableCountry: "US",
  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
  merchantReturnDays: 30,
  returnMethod: "https://schema.org/ReturnByMail",
  returnFees: "https://schema.org/ReturnShippingFees",
  refundType: "https://schema.org/FullRefund",
  merchantReturnLink: `${SITE_URL}/shipping-and-returns`,
} as const;

/** Business days between an order and it leaving for the carrier. */
export const HANDLING_DAYS = { min: 5, max: 10 } as const;
