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
    "Church-authorized canvas replicas of the tilma of Saint Juan Diego, digitally scanned from the original image at the Basilica in Mexico City.",
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
