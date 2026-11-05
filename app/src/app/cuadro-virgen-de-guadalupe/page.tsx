import Link from "next/link";
import { listProducts, formatPrice, type Product } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import { JsonLd } from "@/components/JsonLd";
import { CATALOG_ES, ES_BASE, esProductPath } from "@/lib/catalogEs";
import { SITE_URL } from "@/lib/site";

// Spanish counterpart of /our-lady-of-guadalupe-prints, and the home of the
// Spanish catalog. Spanish buyers search "cuadro de la Virgen de Guadalupe";
// the URL, title and H1 use those words on purpose. Keep the facts and prices
// in step with the English page. The root layout is lang="en", so this page
// marks its own content lang="es".

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Cuadro de la Virgen de Guadalupe en lienzo — desde $57, envío gratis",
  description:
    "Cuadros de la Virgen de Guadalupe en lienzo, con marco o sin marco, de $57 a $324 en tres tamaños. Impresos en EE. UU. a partir de un archivo digital de la tilma certificado en México en 1998. Envío gratis a los 50 estados y Puerto Rico.",
  alternates: {
    canonical: ES_BASE,
    languages: { en: "/our-lady-of-guadalupe-prints", es: ES_BASE },
  },
  openGraph: { locale: "es_US" },
};

type Option = {
  what: string;
  label: string;
  arrives: string;
  match: (p: Product) => boolean;
};

const OPTIONS: Option[] = [
  {
    what: "Cuadro pequeño en lienzo",
    label: '12" × 18"',
    arrives: "Listo para colgar",
    match: (p) => p.size === "12x18",
  },
  {
    what: "Cuadro en lienzo sin marco",
    label: '24" × 36"',
    arrives: "Enrollado en un tubo, para enmarcar en un taller local",
    match: (p) => p.size === "24x36" && p.variant === "rolled",
  },
  {
    what: "Cuadro con marco, cinco marcos a elegir",
    label: '24" × 36"',
    arrives: "Listo para colgar",
    match: (p) => p.size === "24x36" && p.variant.includes("frame"),
  },
  {
    what: "Cuadro grande en lienzo sin marco",
    label: '36" × 54"',
    arrives: "Enrollado en un tubo, para enmarcar en un taller local",
    match: (p) => p.size === "36x54",
  },
];

const faq = [
  {
    q: "¿Es una pintura de la Virgen de Guadalupe o una impresión?",
    a: "Una impresión. Se reproduce a partir de un archivo digital en alta resolución de la tilma original, no se pinta a mano, y se imprime sobre lienzo de archivo, no en papel de póster. Una pintura es la interpretación de un artista; esto es la imagen misma, tan fiel como puede serlo una impresión.",
  },
  {
    q: "¿Qué tamaño de cuadro de la Virgen de Guadalupe debo comprar?",
    a: "El de 12 por 18 pulgadas para un estante, un escritorio o una pared pequeña; el de 24 por 36 para la sala, un pasillo, un salón de clases o un altar en casa; y el de 36 por 54 para el muro de una iglesia, una capilla o un salón parroquial.",
  },
  {
    q: "¿Por qué el cuadro sin marco cuesta menos que el cuadro con marco?",
    a: "Un marco es pesado y caro de enviar, y ese costo va incluido en el precio de cualquier cuadro con marco aunque no se vea. El lienzo sin marco viaja ligero, enrollado en un tubo protector, así que el de 24 por 36 pulgadas cuesta $114 frente a $214 con marco. Después, un taller de enmarcado local puede montarlo o enmarcarlo a juego con su casa, su iglesia o sus otros cuadros.",
  },
  {
    q: "¿Cuánto cuesta enmarcar el cuadro sin marco?",
    a: "Depende del taller y del marco que elija. Pida a un taller de enmarcado local un presupuesto para montar y enmarcar un lienzo de 24 por 36 pulgadas antes de hacer su pedido, y compare ese total con los $214 del cuadro con marco.",
  },
  {
    q: "¿El envío es realmente gratis?",
    a: "Sí, a los 50 estados de EE. UU. y Puerto Rico, en todos los tamaños y sin recargo por el cuadro de 36 por 54 pulgadas. Fuera de Estados Unidos, los mismos cuadros están en eBay, que hace envíos internacionales y se encarga de la aduana.",
  },
  {
    q: "¿Cómo sé que la imagen de la Virgen de Guadalupe es auténtica?",
    a: "Cada cuadro incluye dos certificaciones mexicanas. La imagen proviene de un archivo digital del Sagrado Original que el cardenal Norberto Rivera Carrera, Arzobispo Primado de México, certificó el 12 de diciembre de 1998 como reproducción fiel. La imagen, conocida como la Virgen Peregrina, fue bendecida por el papa Juan Pablo II el 25 de enero de 1999.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}${ES_BASE}#preguntas`,
  inLanguage: "es",
  mainEntity: faq.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default async function CuadrosPage() {
  let products: Product[] = [];
  try {
    products = await listProducts();
  } catch {
    products = [];
  }
  const spanish = products.filter((p) => CATALOG_ES[p.sku]);

  const priceFor = (option: Option) => {
    const prices = products.filter(option.match).map((p) => p.price_cents);
    return prices.length ? formatPrice(Math.min(...prices)) : null;
  };

  return (
    <div lang="es">
      <JsonLd data={faqJsonLd} />

      <section className="border-b border-stone-200 bg-gradient-to-b from-stone-50 to-[var(--background)]">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <p className="text-sm uppercase tracking-widest text-[var(--gold)] font-semibold">
            Con marco o sin marco · Tres tamaños · Envío gratis
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto">
            Cuadro de la Virgen de Guadalupe en lienzo
          </h1>
          <p className="mt-5 text-lg text-stone-700 leading-relaxed max-w-2xl mx-auto">
            Vendemos una sola imagen, la Virgen de Guadalupe, como cuadro en lienzo en tres
            tamaños: sin marco desde <strong>$114</strong>, con marco y listo para colgar a{" "}
            <strong>$214</strong>, y un cuadro pequeño de 12&quot; × 18&quot; listo para colgar a{" "}
            <strong>$57</strong>. Todos se imprimen en EE. UU. a partir de un archivo digital de la
            tilma certificado en México en 1998, se envían gratis a los 50 estados y Puerto Rico, e
            incluyen las dos certificaciones mexicanas.
          </p>
          <p className="mt-4 text-sm">
            <Link
              href="/our-lady-of-guadalupe-prints"
              hrefLang="en"
              lang="en"
              className="underline text-stone-600 hover:text-[var(--accent)]"
            >
              In English →
            </Link>
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-14 space-y-14 text-stone-700 leading-relaxed">
        <section>
          <h2 className="text-2xl md:text-3xl font-bold">Todas las opciones, lado a lado</h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-stone-300">
                  <th className="py-3 pr-4 font-semibold">Qué recibe</th>
                  <th className="py-3 pr-4 font-semibold">Tamaño</th>
                  <th className="py-3 pr-4 font-semibold">Precio</th>
                  <th className="py-3 font-semibold">Cómo llega</th>
                </tr>
              </thead>
              <tbody>
                {OPTIONS.map((option) => (
                  <tr key={option.what} className="border-b border-stone-200 align-top">
                    <td className="py-4 pr-4 font-semibold text-stone-800">{option.what}</td>
                    <td className="py-4 pr-4 whitespace-nowrap">{option.label}</td>
                    <td className="py-4 pr-4 whitespace-nowrap">
                      {priceFor(option) ?? <span className="text-stone-400">&mdash;</span>}
                    </td>
                    <td className="py-4">{option.arrives}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold">¿Con marco o sin marco?</h2>
          <p className="mt-4">
            El cuadro con marco es lo más fácil: llega listo para colgar. El cuadro sin marco cuesta
            casi la mitad, porque un marco es pesado y caro de enviar, y ese costo se paga aunque no
            se vea. El lienzo sin marco viaja ligero en un tubo, y un taller de enmarcado local
            puede montarlo o enmarcarlo a juego con su sala, su iglesia o sus otros cuadros. Las
            parroquias y las escuelas suelen pedirlo sin marco precisamente por eso.
          </p>
        </section>

        {spanish.length > 0 && (
          <section>
            <h2 className="text-2xl md:text-3xl font-bold">Todos los cuadros</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {spanish.map((product) => (
                <ProductCard
                  key={product.sku}
                  product={product}
                  name={CATALOG_ES[product.sku].name}
                  href={esProductPath(product.sku)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Seasonal: after December 12, drop the December 4 line; after
            January 6, replace the dates with year-round occasions (bautizo,
            primera comunión, confirmación, boda, quinceañera). Same dates as
            /gifts. */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold">
            Un regalo para el 12 de diciembre, Navidad o el Día de Reyes
          </h2>
          <p className="mt-4">
            Un cuadro de la Virgen de Guadalupe es un regalo que se queda en la pared: $57 el
            cuadro pequeño listo para colgar, $114 sin marco o $214 con marco, siempre con envío
            gratis. Haga su pedido a más tardar el <strong>4 de diciembre</strong> para el 12 de
            diciembre, el <strong>17 de diciembre</strong> para Navidad y el{" "}
            <strong>30 de diciembre</strong> para el Día de Reyes. Los cuadros con marco tardan
            unos tres días hábiles más que los enrollados.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold">Para su parroquia</h2>
          <p className="mt-4">
            Para santuarios parroquiales, procesiones del 12 de diciembre, ministerios hispanos y
            salones de catecismo,{" "}
            <Link href="/parroquias" className="text-[var(--accent)] underline">
              vea la página para parroquias
            </Link>
            . Para pedidos por volumen o con orden de compra, escriba a{" "}
            <a href="mailto:wfleonard@primosmaternos.com" className="text-[var(--accent)] underline">
              wfleonard@primosmaternos.com
            </a>
            .
          </p>
        </section>

        <section id="preguntas">
          <h2 className="text-2xl md:text-3xl font-bold">Preguntas antes de comprar</h2>
          <dl className="mt-6 space-y-6">
            {faq.map(({ q, a }) => (
              <div key={q}>
                <dt className="font-semibold text-stone-800">{q}</dt>
                <dd className="mt-2">{a}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6">
            Los dos certificados se publican completos en la{" "}
            <Link href="/authenticity" hrefLang="en" className="text-[var(--accent)] underline">
              página de autenticidad (en inglés)
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
