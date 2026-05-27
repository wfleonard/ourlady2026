import type { Metadata } from "next";
import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  title: "Primos Maternos — Our Lady of Guadalupe Canvas",
  description:
    "Church-authorized canvas replicas of the tilma of Saint Juan Diego. Framed and rolled canvas, shipped from Tinton Falls, NJ.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="border-b border-stone-200 bg-white/80 backdrop-blur sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <span className="text-xl font-semibold tracking-tight">
                Primos Maternos
              </span>
              <span className="hidden sm:inline text-sm text-stone-500">
                Our Lady of Guadalupe
              </span>
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/#products" className="hover:text-[var(--accent)]">
                Shop
              </Link>
              <Link href="/blog" className="hover:text-[var(--accent)]">
                Blog
              </Link>
              <Link href="/#about" className="hover:text-[var(--accent)]">
                About
              </Link>
              <Link href="/#contact" className="hover:text-[var(--accent)]">
                Contact
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-stone-200 mt-16 py-8 text-center text-sm text-stone-500">
          <div className="max-w-6xl mx-auto px-6">
            <p>
              Saxon Enterprises, Inc — dba Primos Maternos · Tinton Falls, NJ
              · <a href="mailto:wfleonard@saxonenterprises.net" className="underline">wfleonard@saxonenterprises.net</a>
            </p>
            <p className="mt-2">© {new Date().getFullYear()} Saxon Enterprises, Inc.</p>
          </div>
        </footer>
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
