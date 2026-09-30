"use client";

import { sendGAEvent } from "@next/third-parties/google";

/** "Outside the US?" link to a SKU's eBay listing. Each click is a GA `ebay_click` event. */
export function EbayLink({ sku, href }: { sku: string; href: string }) {
  return (
    <p className="mt-3 text-sm text-stone-600">
      Outside the United States?{" "}
      <a
        href={href}
        target="_blank"
        rel="noopener"
        onClick={() => sendGAEvent("event", "ebay_click", { sku })}
        className="text-[var(--accent)] underline"
      >
        Buy this canvas on eBay
      </a>
      , which ships internationally and handles customs.
    </p>
  );
}
