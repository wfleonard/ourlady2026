import { listProducts, type Product } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let products: Product[] = [];
  try {
    products = await listProducts();
  } catch {
    products = [];
  }

  return (
    <>
      {/* Hero */}
      <section className="border-b border-stone-200 bg-gradient-to-b from-stone-50 to-[var(--background)]">
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm uppercase tracking-widest text-[var(--gold)] font-semibold">
              Church-Authorized · Made in Mexico
            </p>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight">
              Our Lady of Guadalupe
              <br />
              <span className="text-stone-500 text-3xl md:text-4xl">on canvas</span>
            </h1>
            <p className="mt-5 text-lg text-stone-700 leading-relaxed">
              The only replica of the tilma of Saint Juan Diego authorized by the
              Catholic Church. Digitally scanned from the original tilma and
              blessed by Pope John Paul II and Pope Francis. Free U.S. shipping.
            </p>
            <a
              href="#products"
              className="inline-block mt-8 px-8 py-3 bg-[var(--accent)] text-white font-semibold rounded-md hover:opacity-90 transition"
            >
              Shop the collection
            </a>
          </div>
          <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero-tilma.jpg"
              alt="Our Lady of Guadalupe — tilma image"
              className="rounded-lg shadow-xl max-h-[480px] w-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-2">The Collection</h2>
        <p className="text-stone-600 mb-8">
          Framed and rolled canvas, in four sizes. Every piece ships with a
          certificate of authenticity.
        </p>
        {products.length === 0 ? (
          <div className="p-8 bg-amber-50 border border-amber-200 rounded-lg text-amber-900">
            <p className="font-semibold">Catalog is loading.</p>
            <p className="text-sm mt-1">
              If this persists, the database may not be running. Run{" "}
              <code className="bg-amber-100 px-1 py-0.5 rounded">
                docker compose up -d
              </code>{" "}
              from the project root.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p.sku} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* About */}
      <section id="about" className="bg-stone-50 border-y border-stone-200">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-4">About the Image</h2>
          <p className="text-stone-700 leading-relaxed mb-4">
            On December 12, 1531, the Virgin Mary appeared to Saint Juan Diego on
            the hill of Tepeyac near Mexico City. As proof of the apparition,
            Castilian roses bloomed on the barren hilltop. When Juan Diego opened
            his tilma before the bishop, the image of the Virgin was found
            miraculously imprinted on the fabric. That cloak — nearly 500 years
            old — still hangs today in the Basilica of Our Lady of Guadalupe.
          </p>
          <p className="text-stone-700 leading-relaxed">
            Our canvases are printed from a high-resolution digital scan made
            directly from the tilma, on the most advanced canvas press in
            Mexico. Each comes with a certificate of authenticity from the
            archdiocese.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Questions?</h2>
        <p className="text-stone-700">
          William F. Leonard · Saxon Enterprises, Inc — dba Primos Maternos
        </p>
        <p className="mt-2">
          <a
            href="mailto:wfleonard@saxonenterprises.net"
            className="text-[var(--accent)] underline"
          >
            wfleonard@saxonenterprises.net
          </a>{" "}
          ·{" "}
          <a href="sms:+17326734260" className="text-[var(--accent)] underline">
            Text 732-673-4260
          </a>
        </p>
      </section>
    </>
  );
}
