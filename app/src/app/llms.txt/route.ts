import { listProducts } from "@/lib/db";
import { posts } from "@/lib/blog";
import { HANDLING_DAYS, ORG, RETURN_POLICY, SITE_URL } from "@/lib/site";
import { ES_BASE } from "@/lib/catalogEs";

/**
 * Served at /llms.txt (the llmstxt.org convention): a plain-Markdown map of
 * the site for AI assistants. Like robots.ts and sitemap.ts it is code, so
 * prices, policy, and the post list come from the same sources as the pages
 * and cannot drift. Products come from the database, so render per request.
 */
export const dynamic = "force-dynamic";

/** Key pages, each with a one-line summary of what it answers. */
const PAGES: { path: string; title: string; summary: string }[] = [
  { path: "/our-lady-of-guadalupe-prints", title: "Pictures, prints and canvases", summary: "Every option and price side by side, framed vs unframed, and why the unframed print costs less." },
  { path: ES_BASE, title: "Cuadro de la Virgen de Guadalupe", summary: `The catalog in Spanish: every option and price, framed vs unframed, gift dates, and a Spanish page for each canvas at ${ES_BASE}/{sku}.` },
  { path: "/authenticity", title: "Authenticity", summary: "What to ask any seller, why Guadalupe prints differ, and the two Mexican certifications behind this image." },
  { path: "/canvas-sizes", title: "Canvas sizes", summary: "12x18 gallery wrap, 24x36 framed or rolled, 36x54 rolled: resolution, viewing distance, and hanging height for each." },
  { path: "/shipping-and-returns", title: "Shipping and returns", summary: "Free shipping, handling time, 30-day returns, transit-damage replacement, international orders." },
  { path: "/parishes", title: "For parishes", summary: "The 24x36 rolled canvas for parishes, with free U.S. shipping." },
  { path: "/parroquias", title: "Para parroquias", summary: "The parish page in Spanish." },
  { path: "/schools", title: "For Catholic schools", summary: "Canvases for religious ed classrooms, school chapels, and December 12 celebrations." },
  { path: "/dioceses", title: "For dioceses", summary: "Diocesan bulk orders of the 24x36 canvas; PO invoicing accepted." },
  { path: "/gifts", title: "Gifts", summary: "Canvas gifts for Advent, December 12, and Christmas." },
  { path: "/new-jersey", title: "New Jersey", summary: "Canvases from Tinton Falls, Monmouth County, for homes, parishes, and schools in all five NJ dioceses." },
  { path: "/novena", title: "Novena", summary: "The traditional nine-day Novena to Our Lady of Guadalupe, prayed December 3–11, printable." },
  { path: "/reviews", title: "Customer reviews", summary: "Photos and words from families and parishes who hung the canvas." },
  { path: "/blog", title: "Blog", summary: "Reflections, science, and symbolism of Our Lady of Guadalupe and the tilma." },
];

function dollars(cents: number): string {
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
}

/** The first sentence, which is what the seed front-loads for snippets. */
function firstSentence(text: string): string {
  const match = text.match(/^.*?[.!?](?=\s|$)/s);
  return (match ? match[0] : text).replace(/\s+/g, " ").trim();
}

export async function GET() {
  // A database that is down must not take the file with it.
  let productLines: string[] = [];
  try {
    const products = await listProducts();
    productLines = products.map(
      (p) =>
        `- [${p.name}](${SITE_URL}/products/${p.sku}): ${dollars(p.price_cents)}. ${firstSentence(p.description)}`
    );
  } catch {
    productLines = [`- [All canvases](${SITE_URL}/#products)`];
  }

  const body = `# ${ORG.name}

> ${ORG.description}

${ORG.name} is the store name of ${ORG.legalName}, based in ${ORG.city}, ${ORG.state}. It sells canvas reproductions of the image of Our Lady of Guadalupe: image created in Mexico from a scan of the original tilma · canvas printed in the USA · two Mexican certificates included.

- A December 12, 1998 certification signed by Cardinal Norberto Rivera Carrera, Archbishop Primate of Mexico, calls a print a "faithful reproduction of the digital archive of the Sacred Original." The digital capture and reproduction were done by DIGITAL COLOR S.A. DE C.V.
- The image (Virgen Peregrina) was blessed by Pope John Paul II on January 25, 1999.
- Shipping is free to all 50 US states and Puerto Rico. Orders leave in ${HANDLING_DAYS.min} to ${HANDLING_DAYS.max} business days. Buyers outside the US can order through the eBay listing linked on each product page.
- Returns are accepted within ${RETURN_POLICY.merchantReturnDays} days of delivery for a full refund; the buyer pays return shipping.
- Contact: ${ORG.email}

## Canvases

${productLines.join("\n")}

## Pages

${PAGES.map((p) => `- [${p.title}](${SITE_URL}${p.path}): ${p.summary}`).join("\n")}

## Articles

${posts.map((post) => `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.excerpt}`).join("\n")}

## Optional

- [Sitemap](${SITE_URL}/sitemap.xml)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
