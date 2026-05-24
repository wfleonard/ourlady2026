import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct, formatPrice } from "@/lib/db";
import { BuyButton } from "@/components/BuyButton";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ sku: string }>;
}) {
  const { sku } = await params;
  const product = await getProduct(sku);
  if (!product) notFound();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Link
        href="/#products"
        className="text-sm text-stone-500 hover:text-[var(--accent)]"
      >
        ← Back to all products
      </Link>

      <div className="mt-6 grid md:grid-cols-2 gap-10">
        <div className="bg-stone-50 rounded-lg p-10 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image_path}
            alt={product.name}
            className="max-w-full h-auto object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.3)]"
          />
        </div>
        <div>
          <p className="text-sm uppercase tracking-widest text-[var(--gold)] font-semibold">
            {product.size}" · {product.variant.replace(/-/g, " ")}
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold leading-tight">
            {product.name}
          </h1>
          <div className="mt-4 text-3xl font-bold text-[var(--accent)]">
            {formatPrice(product.price_cents)}
          </div>
          <p className="mt-6 text-stone-700 leading-relaxed">
            {product.description}
          </p>
          <ul className="mt-6 space-y-2 text-sm text-stone-600 list-disc list-inside">
            <li>The only Church-authorized replica of the tilma</li>
            <li>Blessed by Pope John Paul II and Pope Francis</li>
            <li>Digitally scanned directly from the tilma of Saint Juan Diego</li>
            <li>Certificate of authenticity included</li>
            <li>Free shipping to all 50 U.S. states and Puerto Rico</li>
          </ul>
          <div className="mt-8">
            <BuyButton sku={product.sku} />
            <p className="mt-3 text-xs text-stone-500">
              Secure checkout by Stripe. Apple Pay and Google Pay supported.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
