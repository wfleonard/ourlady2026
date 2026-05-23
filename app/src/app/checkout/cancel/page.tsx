import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <h1 className="text-3xl font-bold">Checkout cancelled</h1>
      <p className="mt-4 text-stone-700">
        No charge was made. Your cart is still here when you're ready.
      </p>
      <Link
        href="/"
        className="inline-block mt-8 px-6 py-3 bg-[var(--accent)] text-white font-semibold rounded-md"
      >
        Back to the store
      </Link>
    </div>
  );
}
