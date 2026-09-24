import type { MetadataRoute } from "next";
import { AI_CRAWLERS, PRIVATE_PATHS, SITE_URL } from "@/lib/site";

/** Served at /robots.txt. Without it the site returns a 404 there, which is what it did before. */
export default function robots(): MetadataRoute.Robots {
  const disallow = [...PRIVATE_PATHS];

  return {
    rules: [
      { userAgent: [...AI_CRAWLERS], allow: "/", disallow },
      { userAgent: "*", allow: "/", disallow },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
