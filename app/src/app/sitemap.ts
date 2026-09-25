import type { MetadataRoute } from "next";
import { listProducts } from "@/lib/db";
import { posts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

/**
 * Served at /sitemap.xml, which used to 404. Product pages come from the
 * database, so this route is rendered per request rather than at build time.
 */
export const dynamic = "force-dynamic";

const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/authenticity", priority: 0.9 },
  { path: "/canvas-sizes", priority: 0.9 },
  { path: "/new-jersey", priority: 0.9 },
  { path: "/parishes", priority: 0.9 },
  { path: "/schools", priority: 0.9 },
  { path: "/dioceses", priority: 0.9 },
  { path: "/gifts", priority: 0.8 },
  { path: "/novena", priority: 0.7 },
  { path: "/blog", priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // A database that is down must not take the sitemap with it: the static
  // pages and the posts are still worth listing.
  let productUrls: MetadataRoute.Sitemap = [];
  try {
    const products = await listProducts();
    productUrls = products.map((product) => ({
      url: `${SITE_URL}/products/${product.sku}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {
    productUrls = [];
  }

  return [
    ...STATIC_ROUTES.map(({ path, priority }) => ({
      url: `${SITE_URL}${path === "/" ? "" : path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority,
    })),
    ...productUrls,
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
