import type { NextRequest } from "next/server";
import { getReview } from "@/lib/reviews";
import { CARD_FORMATS, renderReviewCard, type CardFormat } from "@/lib/reviewCard";

export const runtime = "nodejs";

/**
 * A review as a social-media image.
 *   /reviews/<slug>/card?format=feed|story|link&q=<pull quote #>&photo=<photo #>&download=1
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const review = getReview(slug);
  if (!review) return new Response("Review not found", { status: 404 });

  const sp = req.nextUrl.searchParams;
  const format = (sp.get("format") ?? "feed") as CardFormat;
  if (!(format in CARD_FORMATS)) return new Response("Unknown format", { status: 400 });
  const q = Number(sp.get("q") ?? 0);
  const photo = Number(sp.get("photo") ?? 0);
  const quote = review.pullQuotes[q];
  if (!quote || !review.photos[photo]) return new Response("No such quote or photo", { status: 404 });

  const res = await renderReviewCard(review, format, quote, photo);
  res.headers.set("Cache-Control", "public, max-age=86400");
  if (sp.get("download")) {
    res.headers.set("Content-Disposition", `attachment; filename="primos-review-${slug}-${format}-q${q + 1}.png"`);
  }
  return res;
}
