import Link from "next/link";
import { posts } from "@/lib/blog";

export const metadata = {
  title: "Blog — Primos Maternos",
  description:
    "Stories, science, and symbolism of Our Lady of Guadalupe and the tilma of Saint Juan Diego.",
};

export default function BlogIndex() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-12">
        <p className="text-sm uppercase tracking-widest text-[var(--gold)] font-semibold">
          Stories of the Tilma
        </p>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold leading-tight">
          Blog
        </h1>
        <p className="mt-4 text-lg text-stone-700 max-w-2xl">
          The apparition, the science that cannot explain the image, and the
          symbols the Aztecs read at first glance.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block bg-white border border-stone-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition"
          >
            <div className="aspect-[4/5] bg-stone-50 p-6 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.imageAlt}
                className="max-w-full max-h-full object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.25)] group-hover:scale-[1.03] transition-transform"
              />
            </div>
            <div className="p-6 border-t border-stone-100">
              <div className="text-xs uppercase tracking-widest text-stone-500 mb-2">
                {post.date} · {post.readTime}
              </div>
              <h2 className="font-semibold text-lg leading-snug group-hover:text-[var(--accent)] transition-colors">
                {post.title}
              </h2>
              <p className="mt-3 text-sm text-stone-600 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="mt-4 text-sm font-semibold text-[var(--accent)]">
                Read the story →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
