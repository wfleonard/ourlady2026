import type { Metadata } from "next";
import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";
import { JsonLd } from "@/components/JsonLd";
import { ORG, SITE_URL, absoluteUrl } from "@/lib/site";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  // Makes every relative URL in page metadata resolve to the real site.
  metadataBase: new URL(SITE_URL),
  title: "Primos Maternos — Our Lady of Guadalupe Canvas",
  description:
    "Our Lady of Guadalupe canvases printed from a digital archive of the Sacred Original, certified in Mexico in 1998 as a faithful reproduction. Framed and rolled, shipped from Tinton Falls, NJ.",
  alternates: { canonical: "/" },
};

/** Who this business is, in the form a machine reads. */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: ORG.name,
  legalName: ORG.legalName,
  url: SITE_URL,
  email: ORG.email,
  description: ORG.description,
  logo: absoluteUrl("/icon.png"),
  address: {
    "@type": "PostalAddress",
    addressLocality: ORG.city,
    addressRegion: ORG.state,
    addressCountry: ORG.country,
  },
  areaServed: { "@type": "Country", name: "United States" },
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: ORG.name,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={webSiteJsonLd} />
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
                Reflections
              </Link>
              <Link href="/authenticity" className="hover:text-[var(--accent)]">
                Authenticity
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
              · <a href="mailto:wfleonard@primosmaternos.com" className="underline">wfleonard@primosmaternos.com</a>
            </p>
            <p className="mt-3 text-xs text-stone-400 space-x-4">
              <Link href="/parishes" className="hover:text-[var(--accent)]">
                For Parishes
              </Link>
              <span>·</span>
              <Link href="/schools" className="hover:text-[var(--accent)]">
                For Schools
              </Link>
              <span>·</span>
              <Link href="/dioceses" className="hover:text-[var(--accent)]">
                For Dioceses
              </Link>
            </p>
            <p className="mt-2">© {new Date().getFullYear()} Saxon Enterprises, Inc.</p>
          </div>
        </footer>
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
