"use client";

import Link from "next/link";
import type { MouseEvent } from "react";

/**
 * Header links for narrow screens. The full row of links is wider than a
 * phone, so below `lg` they collapse into this disclosure.
 *
 * It is a native <details>, so it opens without any JavaScript. The only
 * script is closing it on a tap: the layout persists across client-side
 * navigation, so without this the menu would stay open over the next page,
 * and a same-page hash link (/#about) would never close it at all.
 */
export type NavLink = { href: string; label: string; lang?: string };

export function MobileMenu({ links }: { links: NavLink[] }) {
  const close = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.closest("details")?.removeAttribute("open");
  };

  return (
    <details className="group relative lg:hidden">
      <summary className="list-none cursor-pointer select-none rounded-md border border-stone-300 px-3 py-1.5 text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] [&::-webkit-details-marker]:hidden">
        <span className="group-open:hidden">Menu</span>
        <span className="hidden group-open:inline">Close</span>
      </summary>
      <nav
        aria-label="Site"
        className="absolute right-0 mt-2 w-56 rounded-lg border border-stone-200 bg-white py-2 shadow-lg"
      >
        {links.map(({ href, label, lang }) => (
          <Link
            key={href}
            href={href}
            lang={lang}
            hrefLang={lang}
            onClick={close}
            className="block px-4 py-2.5 text-sm hover:bg-stone-50 hover:text-[var(--accent)]"
          >
            {label}
          </Link>
        ))}
      </nav>
    </details>
  );
}
