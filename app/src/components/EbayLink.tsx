"use client";

import { sendGAEvent } from "@next/third-parties/google";

const TEXT = {
  en: {
    before: "Outside the United States?",
    link: "Buy this canvas on eBay",
    after: ", which ships internationally and handles customs.",
  },
  es: {
    before: "¿Fuera de Estados Unidos?",
    link: "Compre este cuadro en eBay",
    after: ", que hace envíos internacionales y se encarga de la aduana.",
  },
};

/** "Outside the US?" link to a SKU's eBay listing. Each click is a GA `ebay_click` event. */
export function EbayLink({
  sku,
  href,
  locale = "en",
}: {
  sku: string;
  href: string;
  locale?: "en" | "es";
}) {
  const t = TEXT[locale];
  return (
    <p className="mt-3 text-sm text-stone-600">
      {t.before}{" "}
      <a
        href={href}
        target="_blank"
        rel="noopener"
        onClick={() => sendGAEvent("event", "ebay_click", { sku, locale })}
        className="text-[var(--accent)] underline"
      >
        {t.link}
      </a>
      {t.after}
    </p>
  );
}
