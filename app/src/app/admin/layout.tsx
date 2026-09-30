import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Primos Maternos",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-stone-800">{children}</div>;
}
