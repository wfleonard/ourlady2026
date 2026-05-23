import Link from "next/link";
import { formatPrice, type Product } from "@/lib/db";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.sku}`}
      className="group block bg-white border border-stone-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
    >
      <div className="aspect-[2/3] bg-stone-100 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image_path}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-base leading-snug">{product.name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-stone-500 text-sm">{product.size}"</span>
          <span className="font-semibold text-[var(--accent)]">
            {formatPrice(product.price_cents)}
          </span>
        </div>
      </div>
    </Link>
  );
}
