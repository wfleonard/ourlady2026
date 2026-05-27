export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  date: string;
  readTime: string;
};

export const posts: Post[] = [
  {
    slug: "apparition",
    title: "The Sign on the Tilma: How Mary Appeared to Juan Diego",
    excerpt:
      "Four apparitions on the hill of Tepeyac, a bed of Castilian roses on barren ground, and an image that no human hand had painted.",
    image: "/blog/our-lady-guadalupe-juan-diego-1.jpg",
    imageAlt: "Our Lady of Guadalupe appearing to Saint Juan Diego",
    date: "December 12, 1531",
    readTime: "5 min read",
  },
  {
    slug: "tilma-science",
    title: "What Science Cannot Explain About the Tilma",
    excerpt:
      "A cactus-fiber cloak that should have crumbled in twenty years has lasted nearly five hundred. Nobel chemists, NASA scientists, and ophthalmologists have all tried — and failed — to explain it.",
    image: "/blog/our-lady-guadalupe-basilica-juan-diego-1.jpg",
    imageAlt: "Our Lady of Guadalupe tilma displayed at the Basilica",
    date: "Research summary",
    readTime: "8 min read",
  },
  {
    slug: "codex-symbols",
    title: "A Codex in the Image: What the Aztecs Read",
    excerpt:
      "To the Spanish, it was a portrait. To the Aztecs, every fold, star, and color spoke. Inside the picture is a complete message written in two cultures at once.",
    image: "/blog/our-lady-guadalupe-basilica-juan-diego-2.jpg",
    imageAlt: "Our Lady of Guadalupe tilma close-up showing symbolic details",
    date: "Image symbolism",
    readTime: "7 min read",
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
