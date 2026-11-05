/**
 * Spanish product copy, keyed by SKU. Price, size, image and availability
 * still come from the products table; only the words live here.
 *
 * Spanish buyers search "cuadro de la Virgen de Guadalupe", and the English
 * catalog uses none of those words. Keep each entry in step with its English
 * seed block in db/init.sql: same facts, same price in the first sentence.
 * A SKU missing from this map has no Spanish page (it 404s and is left out
 * of the sitemap), so a new SKU needs an entry here too.
 */

/** Base path of the Spanish catalog; each product sits under it by SKU. */
export const ES_BASE = "/cuadro-virgen-de-guadalupe";

export function esProductPath(sku: string): string {
  return `${ES_BASE}/${sku}`;
}

type EsCopy = {
  name: string;
  /** Short label above the title, in place of the English variant slug. */
  label: string;
  description: string;
};

const ORIGIN =
  "del archivo digital del Sagrado Original certificado en México en 1998. Incluye las dos certificaciones mexicanas.";

function framed(frame: string): EsCopy {
  return {
    name: `Cuadro de la Virgen de Guadalupe con marco ${frame} — 24"x36"`,
    label: `24" × 36" · con marco ${frame}`,
    description: `Un cuadro de la Virgen de Guadalupe de 24"x36" en lienzo con un marco ${frame}, a $214 y listo para colgar, con envío gratis a los 50 estados y Puerto Rico. Montado sobre lienzo de archivo e impreso en EE. UU. a 287.5 píxeles por pulgada a partir ${ORIGIN}`,
  };
}

export const CATALOG_ES: Record<string, EsCopy> = {
  "olg-24x36-rolled": {
    name: 'Cuadro de la Virgen de Guadalupe en lienzo, sin marco — 24"x36"',
    label: '24" × 36" · sin marco',
    description: `Un cuadro de la Virgen de Guadalupe de 24"x36" en lienzo, sin marco, a $114 con envío gratis a los 50 estados y Puerto Rico. Se envía enrollado en un tubo protector, listo para montarlo o enmarcarlo en un taller local a su gusto; por eso cuesta casi la mitad que un cuadro con marco. Impreso en EE. UU. sobre lienzo de archivo, no en papel de póster, a 287.5 píxeles por pulgada a partir ${ORIGIN}`,
  },
  "olg-36x54-rolled": {
    name: 'Cuadro grande de la Virgen de Guadalupe en lienzo, sin marco — 36"x54"',
    label: '36" × 54" · sin marco',
    description: `Nuestro cuadro más grande de la Virgen de Guadalupe: un lienzo de 36"x54" sin marco a $324, con envío gratis y sin recargo por tamaño. Pensado para el muro de una iglesia, una capilla, un salón parroquial o un altar grande en casa, y enviado enrollado en un tubo protector para enmarcarlo en un taller local. Impreso en EE. UU. sobre lienzo de archivo a 191.7 píxeles por pulgada a partir ${ORIGIN}`,
  },
  "olg-12x18-gallery-wrap": {
    name: 'Cuadro pequeño de la Virgen de Guadalupe, listo para colgar — 12"x18"',
    label: '12" × 18" · listo para colgar',
    description: `Un cuadro pequeño de la Virgen de Guadalupe de 12"x18" a $57, con el lienzo montado sobre bastidor de 0.75" para colgarlo al sacarlo de la caja, sin necesidad de marco. Es nuestro regalo más sencillo, con envío gratis a los 50 estados y Puerto Rico. Impreso en EE. UU. a 575 píxeles por pulgada a partir ${ORIGIN}`,
  },
  "olg-24x36-gold": framed("dorado"),
  "olg-24x36-cherry": framed("de cerezo"),
  "olg-24x36-beaded-mahogany": framed("de caoba perlado"),
  "olg-24x36-black-red-oak": framed("de roble rojo en negro"),
  "olg-24x36-silver-ornate": framed("plateado ornamentado"),
};
