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
  /** Bulk quotes by text or call. */
  phone: "732-673-4260",
  city: "Tinton Falls",
  state: "NJ",
  country: "US",
} as const;

/**
 * A page's <title>, with the brand appended only when it still fits. Bing flags
 * titles over 70 characters and Google cuts them off near 60, so a long product
 * name or headline goes out bare rather than truncated mid-word.
 */
export function pageTitle(title: string): string {
  const branded = `${title} — ${ORG.name}`;
  return branded.length <= 60 ? branded : title;
}

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
/**
 * The eBay listing for each SKU. Checkout here ships to the 50 states and
 * Puerto Rico only; eBay's international shipping covers buyers elsewhere and
 * handles customs, so product pages link there for them. A SKU without a
 * listing (the 12x18 gallery wrap, for now) simply shows no eBay link.
 */
export const EBAY_LISTINGS: Partial<Record<string, string>> = {
  "olg-24x36-gold": "https://www.ebay.com/itm/184779375228",
  "olg-24x36-cherry": "https://www.ebay.com/itm/184779364948",
  "olg-24x36-beaded-mahogany": "https://www.ebay.com/itm/184779363392",
  "olg-24x36-black-red-oak": "https://www.ebay.com/itm/184779367663",
  "olg-24x36-silver-ornate": "https://www.ebay.com/itm/184779359135",
  "olg-24x36-rolled": "https://www.ebay.com/itm/184136879559",
  "olg-36x54-rolled": "https://www.ebay.com/itm/184670577846",
};

export const PRIVATE_PATHS = ["/api/", "/checkout/", "/admin/"] as const;

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

/**
 * Last day to order for delivery before each December occasion, as Bill set
 * them for the 2026 season. Each date allows the full handling window
 * (`HANDLING_DAYS.max` business days) plus about five business days of ground
 * transit. /gifts, /shipping-and-returns, /novena, /new-jersey and the Spanish
 * catalog all read these, so update them here once a season (ISO dates, read
 * as calendar days with no time zone).
 */
export const ORDER_BY = {
  dec12: { orderBy: "2026-11-19", occasion: "December 12", occasionEs: "el 12 de diciembre" },
  christmas: { orderBy: "2026-12-02", occasion: "Christmas", occasionEs: "Navidad" },
  threeKings: { orderBy: "2026-12-11", occasion: "Three Kings Day (January 6)", occasionEs: "el Día de Reyes (6 de enero)" },
} as const;

export type OrderByKey = keyof typeof ORDER_BY;

/** "November 19" / "19 de noviembre", from an ISO date, with no time zone shift. */
export function orderByDate(key: OrderByKey, locale: "en" | "es" = "en", withYear = false): string {
  const [y, m, d] = ORDER_BY[key].orderBy.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString(locale === "es" ? "es-US" : "en-US", {
    month: "long",
    day: "numeric",
    ...(withYear ? { year: "numeric" } : {}),
    timeZone: "UTC",
  });
}

/**
 * Terms for parish, school and diocesan quantity orders, as Bill confirmed them
 * in November 2026. The bulk Q&A on /parishes, /schools, /dioceses and
 * /parroquias is written from these, and its FAQPage JSON-LD repeats it, so a
 * change here reaches the prose and the markup together. Every tier is quoted
 * by email or text; there is no published discount percentage.
 */
export const BULK_ORDERS = {
  /** Per-SKU quantity tiers. The first tier pays the store price. */
  retailMax: 4,
  smallGroup: { min: 5, max: 24 },
  institutional: { min: 25, max: 99 },
  diocesanMin: 100,
  /** Business days to return a written quote. */
  quoteDays: 1,
  /** Weeks from the purchase order until a quantity order ships to one address. */
  fulfillmentWeeks: { min: 3, max: 4 },
  /** Extra weeks when one order is split across several addresses. */
  splitExtraWeeks: { min: 1, max: 2 },
  /** Net 30 is for established accounts; a first order is paid before it ships. */
  netDays: 30,
} as const;
