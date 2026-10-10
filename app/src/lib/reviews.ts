// Customer reviews shown on the product pages. Each one was sent to us by a
// buyer who said we could post it; text is theirs, with only spacing and
// capitalization touched. Name is first name only (plus town if they gave one),
// as the review-request email promised.

export type Review = {
  /** URL slug: /reviews/<slug>. Never change one once posted — shared links use it. */
  slug: string;
  name: string;
  location?: string;
  /** SKU of the canvas they bought, for the "Bought:" line. */
  sku: string;
  productLabel: string;
  /** Month received, e.g. "October 2026". */
  received: string;
  /** Last real edit (YYYY-MM-DD); feeds the sitemap's lastmod. */
  updated: string;
  paragraphs: string[];
  /** `focus` is a CSS object-position that keeps the canvas in view when a card crops the photo. */
  photos: { src: string; alt: string; focus?: string }[];
  /**
   * Sentences for social cards and landing-page pull quotes, each word for word
   * from `paragraphs` (checked below). The first is the default.
   */
  pullQuotes: string[];
};

export const reviews: Review[] = [
  {
    slug: "matthew-glen-rock-nj",
    name: "Matthew",
    location: "Glen Rock, NJ",
    sku: "olg-24x36-gold",
    productLabel: '24"×36" Gold Frame',
    received: "October 2026",
    updated: "2026-10-10",
    paragraphs: [
      "We received the portrait of the tilma about a week or so ago and my wife and I could not be happier with it. The heavy duty packaging ensured it arrived without any damage and when we took it out, we were overwhelmed with how beautiful it looked.",
      "It is hanging on the wall directly in front of our front door and has become the center piece of our home. We have since been able to learn more about the history of the tilma and spent time teaching our three young children about it. It has already helped us to develop a deeper devotion to Our Lady and is a constant reminder that she is mother.",
      "We would be honored if you used the photo to help encourage people to display Our Lady of Guadalupe in their parishes and homes.",
    ],
    photos: [
      {
        src: "/reviews/matthew-entryway.jpg",
        alt: "Gold-framed Our Lady of Guadalupe canvas hanging in a family's front entryway beside the staircase, above a home altar with pink roses",
      },
      {
        src: "/reviews/matthew-altar-closeup.jpg",
        focus: "50% 0%",
        alt: "Close-up of the gold-framed tilma canvas above a home altar with pink roses, a Sacred Heart candle, a rosary, and a Bible",
      },
    ],
    pullQuotes: [
      "It is hanging on the wall directly in front of our front door and has become the center piece of our home.",
      "We would be honored if you used the photo to help encourage people to display Our Lady of Guadalupe in their parishes and homes.",
      "We have since been able to learn more about the history of the tilma and spent time teaching our three young children about it.",
      "The heavy duty packaging ensured it arrived without any damage and when we took it out, we were overwhelmed with how beautiful it looked.",
      "It has already helped us to develop a deeper devotion to Our Lady and is a constant reminder that she is mother.",
    ],
  },
];

// A pull quote that isn't in the customer's own text fails the build.
for (const r of reviews) {
  for (const q of r.pullQuotes) {
    if (!r.paragraphs.some((p) => p.includes(q))) {
      throw new Error(`Pull quote is not in ${r.name}'s review: ${q}`);
    }
  }
}

export function getReview(slug: string): Review | undefined {
  return reviews.find((r) => r.slug === slug);
}

/** "Matthew, Glen Rock, NJ" */
export const byline = (r: Review) => [r.name, r.location].filter(Boolean).join(", ");
