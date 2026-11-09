import { orderByDate } from "@/lib/site";
import { esProductPath } from "@/lib/catalogEs";

/**
 * Gift ideas by occasion, the way buyers ask an assistant ("a wedding gift for
 * a Catholic couple", "an ordination gift for a priest"). /gifts renders the
 * English list and /cuadro-virgen-de-guadalupe the Spanish one, so the two
 * pages recommend the same canvas for the same occasion.
 *
 * Prices are written out because the recommendation is quoted as text. Keep
 * them in step with db/init.sql: 12x18 $57, 24x36 $114 unframed / $214 framed,
 * 36x54 $324.
 */

export type Locale = "en" | "es";

export type Occasion = {
  id: string;
  title: string;
  /** Size, finish and price, e.g. 24" × 36" in a gold frame · $214. */
  pick: string;
  text: string;
  sku: string;
};

/** The authenticity chain in the one wording the site uses (see CLAUDE.md). */
export const AUTHENTICITY_LINE: Record<Locale, string> = {
  en: "Image created in Mexico from a scan of the original tilma · canvas printed in the USA · two Mexican certificates included.",
  es: "Imagen creada en México a partir de un escaneo de la tilma original · lienzo impreso en EE. UU. · incluye dos certificados mexicanos.",
};

export function productHref(sku: string, locale: Locale): string {
  return locale === "es" ? esProductPath(sku) : `/products/${sku}`;
}

export function giftOccasions(locale: Locale = "en"): Occasion[] {
  if (locale === "es") {
    return [
      {
        id: "navidad",
        title: "Navidad",
        pick: '24" × 36" con marco dorado · $214',
        text: `Para la abuela, los papás o los padrinos: llega listo para colgar y se puede poner en la pared la misma mañana de Navidad. El marco dorado va bien con un altar familiar tradicional. Pida a más tardar el ${orderByDate("christmas", "es")}.`,
        sku: "olg-24x36-gold",
      },
      {
        id: "12-de-diciembre",
        title: "12 de diciembre",
        pick: '24" × 36" con marco · $214, o sin marco · $114',
        text: `Para la familia que organiza la fiesta guadalupana o reza la novena del 3 al 11 de diciembre. Con marco llega listo para el altar; sin marco cuesta casi la mitad y se enmarca en un taller local. Pida a más tardar el ${orderByDate("dec12", "es")}.`,
        sku: "olg-24x36-rolled",
      },
      {
        id: "dia-de-reyes",
        title: "Día de Reyes",
        pick: '12" × 18" listo para colgar · $57',
        text: `Un regalo sencillo para cada ahijado o cada hogar de la familia el 6 de enero, que se cuelga al sacarlo de la caja. Pida a más tardar el ${orderByDate("threeKings", "es")}.`,
        sku: "olg-12x18-gallery-wrap",
      },
      {
        id: "confirmacion",
        title: "Confirmación",
        pick: '12" × 18" listo para colgar · $57',
        text: "Para la recámara o el dormitorio universitario del confirmando: pequeño, ligero y sin marco que se rompa.",
        sku: "olg-12x18-gallery-wrap",
      },
      {
        id: "bautizo",
        title: "Bautizo",
        pick: '24" × 36" con marco plateado ornamentado · $214',
        text: "Un regalo de los padrinos que la familia conserva toda la vida. El marco plateado acompaña bien el blanco del bautizo y la sala donde se colgará.",
        sku: "olg-24x36-silver-ornate",
      },
      {
        id: "boda",
        title: "Boda",
        pick: '24" × 36" con marco de cerezo o de caoba perlado · $214',
        text: "La primera imagen de la Virgen para el primer hogar de los novios. La madera cálida combina con casi cualquier sala o comedor.",
        sku: "olg-24x36-cherry",
      },
      {
        id: "ordenacion",
        title: "Ordenación sacerdotal",
        pick: '24" × 36" con marco dorado · $214, o 36" × 54" sin marco · $324',
        text: "El marco dorado para la oficina de la rectoría o la casa del nuevo sacerdote. Si la parroquia le regala la imagen entre todos, el de 36\" × 54\" sirve para una capilla o un salón.",
        sku: "olg-24x36-gold",
      },
      {
        id: "casa-nueva",
        title: "Casa nueva",
        pick: '24" × 36" con marco de roble rojo en negro · $214',
        text: "Para bendecir una casa nueva. El marco negro va con una casa moderna; para un recibidor pequeño, el cuadro de 12\" × 18\" a $57.",
        sku: "olg-24x36-black-red-oak",
      },
      {
        id: "cuarto-del-bebe",
        title: "Cuarto del bebé",
        pick: '12" × 18" listo para colgar · $57',
        text: "Ligero, sin vidrio y sin marco pesado. Cuélguelo en una pared lejos de la cuna, no encima de ella.",
        sku: "olg-12x18-gallery-wrap",
      },
    ];
  }
  return [
    {
      id: "christmas",
      title: "Christmas",
      pick: '24" × 36" in a gold frame · $214',
      text: `For a grandmother, parents or godparents: it arrives ready to hang, so it can go on the wall on Christmas morning. Gold suits a traditional family altar. Order by ${orderByDate("christmas")}.`,
      sku: "olg-24x36-gold",
    },
    {
      id: "december-12",
      title: "December 12",
      pick: '24" × 36" framed · $214, or unframed · $114',
      text: `For the family that hosts the Guadalupe celebration or prays the novena from December 3 to 11. Framed, it goes straight onto the altar; unframed, it costs about half and is framed locally. Order by ${orderByDate("dec12")}.`,
      sku: "olg-24x36-rolled",
    },
    {
      id: "three-kings-day",
      title: "Three Kings Day",
      pick: '12" × 18" ready to hang · $57',
      text: `A simple January 6 gift for each godchild or each household in the family, hung straight from the box. Order by ${orderByDate("threeKings")}.`,
      sku: "olg-12x18-gallery-wrap",
    },
    {
      id: "confirmation",
      title: "Confirmation",
      pick: '12" × 18" ready to hang · $57',
      text: "For a confirmand's bedroom or dorm room: small, light, and no frame to break.",
      sku: "olg-12x18-gallery-wrap",
    },
    {
      id: "baptism",
      title: "Baptism",
      pick: '24" × 36" in a silver ornate frame · $214',
      text: "A godparents' gift the family keeps for life. Silver goes with the white of a baptism and with the room it will hang in.",
      sku: "olg-24x36-silver-ornate",
    },
    {
      id: "wedding",
      title: "Wedding",
      pick: '24" × 36" in a cherry or beaded mahogany frame · $214',
      text: "A first image of Our Lady for a couple's first home. Warm wood suits almost any living or dining room.",
      sku: "olg-24x36-cherry",
    },
    {
      id: "ordination",
      title: "Ordination",
      pick: '24" × 36" in a gold frame · $214, or 36" × 54" unframed · $324',
      text: "The gold frame for a new priest's rectory office or home. If a parish gives the image together, the 36\" × 54\" suits a chapel or a hall.",
      sku: "olg-24x36-gold",
    },
    {
      id: "housewarming",
      title: "Housewarming",
      pick: '24" × 36" in a black red oak frame · $214',
      text: "To bless a new home. The black frame suits a modern house; for a small entryway, the 12\" × 18\" at $57.",
      sku: "olg-24x36-black-red-oak",
    },
    {
      id: "nursery",
      title: "Nursery",
      pick: '12" × 18" ready to hang · $57',
      text: "Light, with no glass and no heavy frame. Hang it on a wall away from the crib, not above it.",
      sku: "olg-12x18-gallery-wrap",
    },
  ];
}

export const UNDER_60: Record<Locale, { title: string; text: string; sku: string }> = {
  en: {
    title: "Under $60",
    text: "The 12\" × 18\" canvas is $57 with free shipping to all 50 states and Puerto Rico. It is stretched over 0.75\" bars with a hanging wire on the back, so it goes on the wall straight from the box with no frame to buy.",
    sku: "olg-12x18-gallery-wrap",
  },
  es: {
    title: "Menos de $60",
    text: "El cuadro de 12\" × 18\" cuesta $57 con envío gratis a los 50 estados y Puerto Rico. Va montado sobre bastidor de 0.75\" con alambre para colgar en la parte de atrás, así que se cuelga al sacarlo de la caja, sin comprar marco.",
    sku: "olg-12x18-gallery-wrap",
  },
};
