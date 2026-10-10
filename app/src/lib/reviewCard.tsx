import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { byline, type Review } from "@/lib/reviews";

// Social-media images of a review, drawn by the site so every new review gets
// on-brand cards with no design work. Gelasio is metrically matched to Georgia,
// the site's own font (OFL, assets/fonts).

export const CARD_FORMATS = {
  feed: { width: 1080, height: 1350, label: "Instagram / Facebook post (1080×1350)" },
  story: { width: 1080, height: 1920, label: "Story / Reel cover (1080×1920)" },
  link: { width: 1200, height: 630, label: "Link preview (1200×630)" },
} as const;
export type CardFormat = keyof typeof CARD_FORMATS;

const C = { bg: "#faf7f2", ink: "#1c1917", muted: "#57534e", accent: "#8b1538", gold: "#b8893a" };

const fontsDir = join(process.cwd(), "assets/fonts");
const fonts = Promise.all([
  readFile(join(fontsDir, "gelasio-latin-400-normal.woff")),
  readFile(join(fontsDir, "gelasio-latin-400-italic.woff")),
  readFile(join(fontsDir, "gelasio-latin-700-normal.woff")),
]).then(([regular, italic, bold]) => [
  { name: "Gelasio", data: regular, weight: 400 as const, style: "normal" as const },
  { name: "Gelasio", data: italic, weight: 400 as const, style: "italic" as const },
  { name: "Gelasio", data: bold, weight: 700 as const, style: "normal" as const },
]);

async function photoDataUri(src: string) {
  const data = await readFile(join(process.cwd(), "public", src));
  return `data:image/jpeg;base64,${data.toString("base64")}`;
}

/** Bigger type for shorter quotes, so each card fills its space. */
function quoteSize(text: string, format: CardFormat) {
  const base = { feed: 54, story: 66, link: 40 }[format];
  if (text.length > 120) return Math.round(base * 0.82);
  if (text.length > 90) return Math.round(base * 0.9);
  return base;
}

export async function renderReviewCard(review: Review, format: CardFormat, quote: string, photo: number) {
  const { width, height } = CARD_FORMATS[format];
  const img = await photoDataUri(review.photos[photo].src);
  const objectPosition = review.photos[photo].focus ?? "50% 50%";
  const wide = format === "link";
  const pad = wide ? 48 : 72;

  const text = (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: pad, justifyContent: "center" }}>
      <div style={{ display: "flex", fontSize: wide ? 20 : 26, letterSpacing: 4, color: C.gold, fontWeight: 700 }}>
        FROM A CUSTOMER’S HOME
      </div>
      <div
        style={{
          display: "flex",
          marginTop: wide ? 18 : 28,
          paddingLeft: wide ? 22 : 30,
          borderLeft: `${wide ? 6 : 8}px solid ${C.accent}`,
          fontSize: quoteSize(quote, format),
          lineHeight: 1.3,
          color: C.ink,
          fontStyle: "italic",
        }}
      >
        “{quote}”
      </div>
      <div style={{ display: "flex", marginTop: wide ? 18 : 30, fontSize: wide ? 24 : 32, color: C.muted }}>
        <span style={{ color: C.ink, fontWeight: 700 }}>— {byline(review)}</span>
        <span style={{ marginLeft: 12 }}>· verified buyer</span>
      </div>
    </div>
  );

  const brand = (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: `${wide ? 18 : 30}px ${pad}px`,
        background: C.accent,
        color: "#fff",
        fontSize: wide ? 24 : 32,
      }}
    >
      <span style={{ fontWeight: 700 }}>Primos Maternos</span>
      <span style={{ opacity: 0.9 }}>primosmaternos.com</span>
    </div>
  );

  // Story keeps more of the photo; feed balances photo and quote.
  const photoShare = { feed: 0.5, story: 0.55, link: 0 }[format];

  return new ImageResponse(
    wide ? (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: C.bg, fontFamily: "Gelasio" }}>
        <div style={{ display: "flex", flex: 1 }}>
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img src={img} width={430} height={height - 60} style={{ objectFit: "cover", objectPosition, width: 430, height: "100%" }} />
          {text}
        </div>
        {brand}
      </div>
    ) : (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: C.bg, fontFamily: "Gelasio" }}>
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img src={img} width={width} height={Math.round(height * photoShare)} style={{ objectFit: "cover", objectPosition, width: "100%", height: Math.round(height * photoShare) }} />
        {text}
        {brand}
      </div>
    ),
    { width, height, fonts: await fonts }
  );
}
