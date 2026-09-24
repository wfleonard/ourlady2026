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
              Authenticated Tilma Image · Printed in the USA
            </p>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight">
              Our Lady of Guadalupe
              <br />
              <span className="text-stone-500 text-3xl md:text-4xl">on canvas</span>
            </h1>
            <p className="mt-5 text-lg text-stone-700 leading-relaxed">
              Printed from a digital archive of the Sacred Original, certified in
              Mexico in 1998 as a faithful reproduction and carried through Mexico
              as the Virgen Peregrina after Pope John Paul II blessed it in 1999.
              Two Mexican certifications with every canvas. Free shipping to all
              50 U.S. states and Puerto Rico.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#products"
                className="inline-block px-8 py-3 bg-[var(--accent)] text-white font-semibold rounded-md hover:opacity-90 transition"
              >
                Shop the collection
              </a>
              <a
                href="/authenticity"
                className="inline-block text-sm underline hover:text-[var(--accent)]"
              >
                How to tell if a Guadalupe print is authentic
              </a>
            </div>
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
          Framed and rolled canvas, in four sizes. Every piece ships with
          two certificates from Mexico verifying the authenticity of the
          image.
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
          <p className="text-stone-700 leading-relaxed mb-8">
            The digital archive of the Sacred Original was created in Mexico by
            Digital Color, S.A. de C.V., and on December 12, 1998 Cardinal
            Norberto Rivera Carrera, Archbishop Primate of Mexico, certified a
            print from it as a faithful reproduction. Our canvases are printed on
            archival stock in the USA from that image lineage, and each ships with
            both Mexican certifications.{" "}
            <a href="/authenticity" className="underline hover:text-[var(--accent)]">
              Read the certificates and what they do and do not say.
            </a>
          </p>

          <h3 className="text-xl font-semibold mb-4 mt-10">Certificates of Authenticity</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <figure className="bg-white p-4 rounded-lg shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/about/certification.jpg"
                alt="Mexican Catholic Church certification of authenticity"
                className="w-full h-auto object-contain"
              />
              <figcaption className="mt-2 text-sm text-stone-600 text-center">
                Mexican Catholic Church Certification
              </figcaption>
            </figure>
            <figure className="bg-white p-4 rounded-lg shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/about/jubileo.jpg"
                alt="Mexico 2000 Jubileo seal of authenticity"
                className="w-full h-auto object-contain"
              />
              <figcaption className="mt-2 text-sm text-stone-600 text-center">
                Mexico 2000 Jubileo Seal
              </figcaption>
            </figure>
          </div>
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
            href="mailto:wfleonard@primosmaternos.com"
            className="text-[var(--accent)] underline"
          >
            wfleonard@primosmaternos.com
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
