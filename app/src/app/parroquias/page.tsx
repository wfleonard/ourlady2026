import Link from "next/link";
import { BuyButton } from "@/components/BuyButton";
import { formatPrice } from "@/lib/db";
import { ReviewHighlight } from "@/components/ReviewHighlight";
import { reviews } from "@/lib/reviews";

// Spanish counterpart of /parishes for parishes and Hispanic ministries. Keep
// the two in step: same product, price, claims and sections. The root layout
// is lang="en", so this page marks its own content lang="es".

export const metadata = {
  alternates: { canonical: "/parroquias", languages: { en: "/parishes", es: "/parroquias" } },
  title: "Para su parroquia — Lienzo de Nuestra Señora de Guadalupe",
  description:
    "Reproducción en lienzo enrollado de 24\" × 36\" de la tilma de San Juan Diego, impresa a partir del archivo digital del Sagrado Original certificado en México en 1998 como reproducción fiel; el lienzo se imprime en EE. UU. Incluye dos certificaciones mexicanas. $114 con envío gratis en EE. UU.",
  openGraph: { locale: "es_US" },
};

const PRICE_CENTS = 11400;
const SKU = "olg-24x36-rolled";
const matthew = reviews.find((r) => r.name === "Matthew");

export default function ParroquiasPage() {
  return (
    <div lang="es">
      {/* Hero */}
      <section className="border-b border-stone-200 bg-gradient-to-b from-stone-50 to-[var(--background)]">
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm uppercase tracking-widest text-[var(--gold)] font-semibold">
              Para parroquias y ministerios guadalupanos
              <Link href="/parishes" hrefLang="en" lang="en" className="ml-3 normal-case tracking-normal underline">
                In English →
              </Link>
            </p>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight">
              Lleve la imagen de Nuestra Señora de Guadalupe a su parroquia
            </h1>
            <p className="mt-5 text-lg text-stone-700 leading-relaxed">
              Una reproducción en lienzo enrollado de 24" × 36" de la tilma de
              San Juan Diego, impresa a partir de un archivo digital del Sagrado
              Original creado en México y certificado en 1998 por el Arzobispo
              Primado de México como reproducción fiel. El lienzo se imprime en
              EE. UU. Cada lienzo incluye dos certificaciones mexicanas.
            </p>
            <div className="mt-6 flex items-baseline gap-4">
              <span className="text-4xl font-bold text-[var(--accent)]">
                {formatPrice(PRICE_CENTS)}
              </span>
              <span className="text-sm text-stone-600">
                envío gratis · 50 estados de EE. UU. y Puerto Rico
              </span>
            </div>
            <div className="mt-6">
              <BuyButton sku={SKU} locale="es" />
              <p className="mt-2 text-xs text-stone-500">
                Pago seguro con Stripe. Se envía enrollado en un tubo protector.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/products/olg-24x36-rolled.jpg"
              alt="Lienzo enrollado de 24 por 36 pulgadas de Nuestra Señora de Guadalupe"
              className="rounded-lg shadow-xl drop-shadow-[0_12px_30px_rgba(0,0,0,0.3)] max-h-[480px] w-auto object-contain bg-white p-6"
            />
          </div>
        </div>
      </section>

      {/* Jubilee callout — timely */}
      <section className="bg-[var(--accent)] text-white">
        <div className="max-w-4xl mx-auto px-6 py-10 text-center">
          <p className="text-sm uppercase tracking-widest opacity-80 mb-2">
            12 de octubre de 2026 — 12 de octubre de 2027
          </p>
          <h2 className="text-2xl md:text-3xl font-bold">
            Un Año Jubilar para Nuestra Señora de Guadalupe
          </h2>
          <p className="mt-3 text-white/90 max-w-2xl mx-auto">
            El papa León XIV ha concedido un Año Jubilar por los 50 años del
            traslado de la tilma a la actual Basílica en la Ciudad de México.
            Un año propicio para exhibir su imagen en su parroquia, capilla o
            espacio de ministerio.
          </p>
          <Link
            href="/blog/jubilee-2026"
            hrefLang="en"
            className="inline-block mt-5 px-5 py-2 border border-white/60 rounded-md text-sm font-semibold hover:bg-white hover:text-[var(--accent)] transition"
          >
            Leer sobre el Jubileo (en inglés) →
          </Link>
        </div>
      </section>

      {/* Certificates of authenticity */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Dos certificados de México</h2>
          <p className="mt-3 text-stone-700 max-w-2xl mx-auto">
            Cada lienzo se envía con dos certificados de México que verifican
            que la imagen se imprimió a partir del escaneo autorizado en alta
            resolución de la tilma. Esto es lo que distingue al lienzo de las
            impresiones genéricas que se venden en línea.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <figure className="bg-white p-4 rounded-lg shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about/certification.webp"
              alt="Certificación de autenticidad de la Iglesia Católica de México"
              className="w-full h-auto object-contain"
            />
            <figcaption className="mt-2 text-sm text-stone-600 text-center">
              Certificación de la Iglesia Católica de México
            </figcaption>
          </figure>
          <figure className="bg-white p-4 rounded-lg shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about/jubileo.webp"
              alt="Sello de autenticidad del Jubileo México 2000"
              className="w-full h-auto object-contain"
            />
            <figcaption className="mt-2 text-sm text-stone-600 text-center">
              Sello del Jubileo México 2000
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Uses in parish life */}
      <section className="bg-stone-50 border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-3">
            Una imagen, muchos usos
          </h2>
          <p className="text-center text-stone-600 mb-10 max-w-2xl mx-auto">
            Parroquias de todo EE. UU. han usado el lienzo enrollado de 24" × 36" para:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              ["Santuarios guadalupanos parroquiales", "Una pieza central enmarcada para el santuario; usted elige el marco localmente para que armonice con el espacio."],
              ["Procesiones y misas de vigilia del 12 de diciembre", "Para llevarla en procesión o exhibirla en la misa de vigilia el día de la fiesta."],
              ["Salones del ministerio hispano", "Un signo visible de identidad y bienvenida para el salón del ministerio."],
              ["Salones de catequesis", "Para catequistas que enseñan la aparición y el simbolismo de la imagen."],
              ["Oficina parroquial y casa rectoral", "Una presencia devocional discreta en los espacios del personal y la administración."],
              ["Rifas para recaudar fondos", "Un artículo de alto valor para una rifa parroquial; el certificado lo convierte en un verdadero regalo, no en una impresión promocional."],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="bg-white p-5 rounded-lg border border-stone-200"
              >
                <h3 className="font-semibold text-[var(--accent)] mb-1">
                  {title}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer review — translated, original shown beneath */}
      {matthew && (
        <ReviewHighlight
          review={matthew}
          quote={2}
          locale="es"
          translation="Sería un honor que usaran la foto para animar a más personas a tener a Nuestra Señora de Guadalupe en sus parroquias y hogares."
        />
      )}

      {/* What you get / product detail */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6">Qué es cada lienzo</h2>
        <ul className="space-y-3 text-stone-800 text-lg">
          <li className="flex gap-3">
            <span className="text-[var(--gold)] font-bold">·</span>
            <span>
              <strong>24" × 36"</strong>: un tamaño considerable para un
              espacio parroquial, y lo bastante pequeño para enviarse enrollado
              sin caja de madera
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-[var(--gold)] font-bold">·</span>
            <span>
              Impreso en lienzo de archivo en <strong>EE. UU.</strong> a partir
              del archivo digital del Sagrado Original creado en México y
              certificado en 1998 como reproducción fiel
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-[var(--gold)] font-bold">·</span>
            <span>
              <strong>Se envía enrollado</strong> en un tubo protector: llévelo
              a una tienda de marcos de su localidad o móntelo usted mismo
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-[var(--gold)] font-bold">·</span>
            <span>
              <strong>Dos certificados de México</strong> que verifican la
              autenticidad de la imagen, incluidos con cada lienzo
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-[var(--gold)] font-bold">·</span>
            <span>
              <strong>$114</strong>: envío gratis a los 50 estados de EE. UU. y
              Puerto Rico
            </span>
          </li>
        </ul>

        <div className="mt-10 p-6 bg-stone-50 border border-stone-200 rounded-lg">
          <h3 className="font-semibold mb-2">Pedidos al por mayor</h3>
          <p className="text-stone-700 text-sm leading-relaxed">
            ¿Necesita varios lienzos para una iniciativa diocesana, un retiro o
            una escuela? Escriba a{" "}
            <a
              href="mailto:wfleonard@primosmaternos.com?subject=Pedido%20al%20por%20mayor%20—%20lienzo%20de%20Nuestra%20Se%C3%B1ora%20de%20Guadalupe"
              className="text-[var(--accent)] underline"
            >
              wfleonard@primosmaternos.com
            </a>{" "}
            o envíe un mensaje de texto al 732-673-4260 para una cotización.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[var(--accent)] text-white">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <h2 className="text-3xl font-bold mb-3">Haga su pedido para la parroquia</h2>
          <p className="text-white/90 mb-6">
            {formatPrice(PRICE_CENTS)} · envío gratis · dos certificados de
            México · pago seguro con Stripe
          </p>
          <div className="inline-block bg-white text-stone-900 rounded-md p-2">
            <BuyButton sku={SKU} locale="es" />
          </div>
        </div>
      </section>
    </div>
  );
}
