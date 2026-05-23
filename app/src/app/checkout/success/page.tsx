import Link from "next/link";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  return (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <h1 className="text-3xl font-bold">Thank you for your order</h1>
      <p className="mt-4 text-stone-700">
        Your payment was received. A receipt is on its way to your email.
      </p>
      {session_id && (
        <p className="mt-2 text-xs text-stone-400">Reference: {session_id}</p>
      )}
      <Link
        href="/"
        className="inline-block mt-8 px-6 py-3 bg-[var(--accent)] text-white font-semibold rounded-md"
      >
        Back to the store
      </Link>
    </div>
  );
}
