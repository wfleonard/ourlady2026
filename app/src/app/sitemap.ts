import type { MetadataRoute } from "next";
import { listProducts } from "@/lib/db";
import { posts } from "@/lib/blog";
import { reviews } from "@/lib/reviews";
import { SITE_URL } from "@/lib/site";

/**
 * Served at /sitemap.xml, which used to 404. Product pages come from the
 * database, so this route is rendered per request rather than at build time.
 */
export const dynamic = "force-dynamic";

/**
 * `updated` is the date the page's content last really changed. Bump it when
 * you edit a page: Google ignores lastmod on sites where it always reads
 * "now", so these must stay honest.
 */
const STATIC_ROUTES: { path: string; priority: number; updated: string }[] = [
  { path: "/", priority: 1, updated: "2026-09-25" },
  { path: "/authenticity", priority: 0.9, updated: "2026-09-25" },
  { path: "/canvas-sizes", priority: 0.9, updated: "2026-09-25" },
  { path: "/new-jersey", priority: 0.9, updated: "2026-09-25" },
  { path: "/parishes", priority: 0.9, updated: "2026-10-10" },
  { path: "/parroquias", priority: 0.9, updated: "2026-10-10" },
  { path: "/schools", priority: 0.9, updated: "2026-10-10" },
  { path: "/dioceses", priority: 0.9, updated: "2026-09-26" },
  { path: "/gifts", priority: 0.8, updated: "2026-10-10" },
  { path: "/novena", priority: 0.7, updated: "2026-09-25" },
  { path: "/shipping-and-returns", priority: 0.7, updated: "2026-09-30" },
  { path: "/blog", priority: 0.7, updated: "2026-10-10" },
  { path: "/reviews", priority: 0.7, updated: "2026-10-10" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // A database that is down must not take the sitemap with it: the static
  // pages and the posts are still worth listing.
  let productUrls: MetadataRoute.Sitemap = [];
  try {
    const products = await listProducts();
    productUrls = products.map((product) => ({
      // No lastModified: the products table has no updated_at column, and a
      // made-up date is worse than none.
      url: `${SITE_URL}/products/${product.sku}`,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {
    productUrls = [];
  }

  return [
    ...STATIC_ROUTES.map(({ path, priority, updated }) => ({
      url: `${SITE_URL}${path === "/" ? "" : path}`,
      lastModified: updated,
      changeFrequency: "weekly" as const,
      priority,
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
