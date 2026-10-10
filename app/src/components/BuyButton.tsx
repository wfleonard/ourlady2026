"use client";

import { useState } from "react";

const LABELS = {
  en: { buy: "Buy now", redirecting: "Redirecting to Stripe…", failed: "Something went wrong" },
  es: { buy: "Comprar ahora", redirecting: "Redirigiendo a Stripe…", failed: "Algo salió mal. Inténtelo de nuevo." },
};

export function BuyButton({ sku, locale = "en" }: { sku: string; locale?: "en" | "es" }) {
  const t = LABELS[locale];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function checkout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sku, quantity: 1, locale }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Checkout failed");
      }
      window.location.href = data.url;
    } catch (e) {
      setError(locale === "en" && e instanceof Error ? e.message : t.failed);
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={checkout}
        disabled={loading}
        className="w-full sm:w-auto px-8 py-3 bg-[var(--accent)] text-white font-semibold rounded-md hover:opacity-90 disabled:opacity-50 transition"
      >
        {loading ? t.redirecting : t.buy}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
