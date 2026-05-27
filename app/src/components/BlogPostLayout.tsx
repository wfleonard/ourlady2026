import Link from "next/link";
import { type Post } from "@/lib/blog";

export function BlogPostLayout({
  post,
  children,
}: {
  post: Post;
  children: React.ReactNode;
}) {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      <Link
        href="/blog"
        className="text-sm text-stone-500 hover:text-[var(--accent)]"
      >
        ← All stories
      </Link>

      <header className="mt-6 mb-8">
        <div className="text-xs uppercase tracking-widest text-[var(--gold)] font-semibold">
          {post.date} · {post.readTime}
        </div>
        <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-stone-600 leading-relaxed">
          {post.excerpt}
        </p>
      </header>

      <div className="bg-stone-50 rounded-lg p-8 flex items-center justify-center mb-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt={post.imageAlt}
          className="max-w-full h-auto object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.3)]"
        />
      </div>

      <div className="prose prose-stone max-w-none text-[17px] leading-[1.75] text-stone-800 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:mb-5 [&_blockquote]:border-l-4 [&_blockquote]:border-[var(--accent)] [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-stone-700 [&_blockquote]:my-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-5 [&_li]:mb-2">
        {children}
      </div>

      <div className="mt-16 pt-8 border-t border-stone-200 text-center">
        <p className="text-stone-600 mb-4">
          Bring the tilma image into your home or chapel.
        </p>
        <Link
          href="/#products"
          className="inline-block px-6 py-3 bg-[var(--accent)] text-white font-semibold rounded-md hover:opacity-90 transition"
        >
          Browse the collection →
        </Link>
      </div>
    </article>
  );
}
