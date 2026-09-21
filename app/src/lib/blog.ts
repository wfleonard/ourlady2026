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
    slug: "jubilee-2026",
    title: "A Jubilee Year for Guadalupe: 50 Years Since the Transfer",
    excerpt:
      "On October 12, 2026, Pope Leo XIV opens a Jubilee Year marking a half-century since the tilma was carried into the New Basilica. Here's what it is, what it means, and how to receive the plenary indulgence.",
    image: "/blog/tilma-basilica-framed.jpg",
    imageAlt: "The tilma of Saint Juan Diego in its ornate silver-and-gold frame at the Basilica of Guadalupe, Mexico City",
    date: "October 12, 2026 – October 12, 2027",
    readTime: "4 min read",
  },
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
