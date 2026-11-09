import type { MetadataRoute } from "next";
import { listProducts } from "@/lib/db";
import { posts } from "@/lib/blog";
import { reviews } from "@/lib/reviews";
import { SITE_URL } from "@/lib/site";
import { CATALOG_ES, ES_BASE, esProductPath } from "@/lib/catalogEs";

/**
 * Served at /sitemap.xml, which used to 404. Product pages come from the
 * database, so this route is rendered per request rather than at build time.
 */
export const dynamic = "force-dynamic";

type Route = {
  path: string;
  priority: number;
  updated: string;
  /** English and Spanish versions of the same page, listed on both entries. */
  languages?: { en: string; es: string };
};

const PRINTS = { en: "/our-lady-of-guadalupe-prints", es: ES_BASE };
const PARISHES = { en: "/parishes", es: "/parroquias" };

/**
 * `updated` is the date the page's content last really changed. Bump it when
 * you edit a page: Google ignores lastmod on sites where it always reads
 * "now", so these must stay honest.
 */
const STATIC_ROUTES: Route[] = [
  { path: "/", priority: 1, updated: "2026-11-09" },
  { path: PRINTS.en, priority: 0.9, updated: "2026-11-05", languages: PRINTS },
  { path: PRINTS.es, priority: 0.9, updated: "2026-11-09", languages: PRINTS },
  { path: "/authenticity", priority: 0.9, updated: "2026-11-09" },
  { path: "/about", priority: 0.7, updated: "2026-11-09" },
  { path: "/canvas-sizes", priority: 0.9, updated: "2026-11-09" },
  { path: "/canvas-and-frame-guide", priority: 0.8, updated: "2026-11-09" },
  { path: "/new-jersey", priority: 0.9, updated: "2026-11-09" },
  { path: PARISHES.en, priority: 0.9, updated: "2026-11-09", languages: PARISHES },
  { path: PARISHES.es, priority: 0.9, updated: "2026-11-09", languages: PARISHES },
  { path: "/schools", priority: 0.9, updated: "2026-11-09" },
  { path: "/dioceses", priority: 0.9, updated: "2026-11-09" },
  { path: "/gifts", priority: 0.8, updated: "2026-11-09" },
  { path: "/novena", priority: 0.7, updated: "2026-11-09" },
  { path: "/shipping-and-returns", priority: 0.7, updated: "2026-11-09" },
  { path: "/blog", priority: 0.7, updated: "2026-10-10" },
  { path: "/reviews", priority: 0.7, updated: "2026-11-09" },
];

const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

function alternates(languages?: { en: string; es: string }) {
  return languages
    ? { alternates: { languages: { en: abs(languages.en), es: abs(languages.es) } } }
    : {};
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // A database that is down must not take the sitemap with it: the static
  // pages and the posts are still worth listing.
  let productUrls: MetadataRoute.Sitemap = [];
  try {
    const products = await listProducts();
    productUrls = products.flatMap((product) => {
      // No lastModified: the products table has no updated_at column, and a
      // made-up date is worse than none.
      const en = `/products/${product.sku}`;
      if (!CATALOG_ES[product.sku]) {
        return [{ url: abs(en), changeFrequency: "weekly" as const, priority: 0.8 }];
      }
      const pair = { en, es: esProductPath(product.sku) };
      return [pair.en, pair.es].map((path) => ({
        url: abs(path),
        changeFrequency: "weekly" as const,
        priority: 0.8,
        ...alternates(pair),
      }));
    });
  } catch {
    productUrls = [];
  }

  return [
    ...STATIC_ROUTES.map(({ path, priority, updated, languages }) => ({
      url: abs(path),
      lastModified: updated,
      changeFrequency: "weekly" as const,
      priority,
      ...alternates(languages),
    })),
    ...productUrls,
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updated,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...reviews.map((r) => ({
      url: `${SITE_URL}/reviews/${r.slug}`,
      lastModified: r.updated,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
