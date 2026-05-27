import { notFound } from "next/navigation";
import { BlogPostLayout } from "@/components/BlogPostLayout";
import { getPost } from "@/lib/blog";

const post = getPost("codex-symbols");

export const metadata = {
  title: `${post?.title} — Primos Maternos`,
  description: post?.excerpt,
};

export default function CodexSymbolsPost() {
  if (!post) notFound();
  return (
    <BlogPostLayout post={post}>
      <p>
        The Spanish missionaries had been preaching in Mexico for ten years
        before the apparition. Their results were thin. Aztec religion was
        sophisticated, ancient, and woven into every part of daily life. No
        sermon — and no theology lesson in a language the indigenous people
        barely understood — was going to displace it.
      </p>

      <p>
        Then Juan Diego opened his tilma in front of the bishop. Within ten
        years of that morning, an estimated <strong>nine million Aztecs</strong>{" "}
        had been baptized. Human sacrifice — practiced annually on tens of
        thousands of victims — ended.
      </p>

      <p>
        Anthropologists who study the image now understand why. To the Spanish
        it was a portrait of Mary. To the Aztecs it was a codex — a complete
        written message in a visual language they read fluently.
      </p>

      <h2>A face neither Spanish nor Indian</h2>

      <p>
        The Virgin's face is that of a young mestiza woman — the first
        generation of Spanish-Indian intermarriage. In 1531 there were no
        adult mestizos. The image was anticipating, by a generation, a new
        people who would be rejected by both sides. The face says: <em>you
        will belong to me.</em>
      </p>

      <h2>The signs of a pregnant virgin</h2>

      <p>
        In Aztec culture, a woman's hair told her status. Loose hair meant
        unmarried. A center part meant a virgin. Untied hair meant pregnant.
        The Virgin of Guadalupe wears her hair untied — but with a part in
        the middle. To an Aztec, this was unmistakable: a pregnant virgin.
      </p>

      <p>
        The high black sash around her waist was the Aztec maternity belt.
        The ends of the bow signified the end of one age and the beginning of
        another. Just below the sash — at the exact position of the womb —
        is a four-petaled flower called the <em>Nahui Ollin</em>, the Aztec
        glyph for the presence of God, for divinity itself, for the center
        of heaven and earth.
      </p>

      <p>
        Modern gynecologists have measured the figure's bodily proportions
        and confirmed they match a woman roughly nine months pregnant. A
        physician once placed a stethoscope on the cloth below the sash and
        reported a steady rhythm of 115 beats per minute — the heart rate of
        a fetus in utero. The fabric maintains a constant temperature of
        98.6° F.
      </p>

      <h2>The stars on her mantle</h2>

      <p>
        The blue-green mantle was the color of royalty, reserved in Aztec
        culture for the highest nobility. It is sprinkled with stars. In 1981,
        Father Mario Sánchez and Dr. Juan Hernández Illescas compared the
        position of those stars to the night sky over Mexico City on the
        winter solstice of December 12, 1531 — the moment Juan Diego opened
        his tilma in front of the bishop.
      </p>

      <p>
        The match was exact. The constellations on the mantle are the
        constellations of that morning, in the proper relative positions:
      </p>

      <ul>
        <li>The Boreal Crown sits above her head</li>
        <li>Virgo is on her chest, near her folded hands</li>
        <li>Leo lies over her womb, with its bright star Regulus — "the little king"</li>
        <li>Gemini, the twins, falls at her knees</li>
        <li>Orion is positioned exactly where the angel supports her</li>
      </ul>

      <h2>Defeating the old gods, without a word</h2>

      <p>
        She stands in front of the sun, its rays radiating around her body.
        To the Aztecs, the sun was Huitzilopochtli — the god who demanded
        the blood of human sacrifice. By standing in front of it and
        eclipsing it, she announced a power greater than his.
      </p>

      <p>
        She stands on a crescent moon. The moon was Tezcatlipoca, the god
        of night. By standing on it she announced victory over him.
      </p>

      <p>
        Her head is bowed — and Aztec gods never bowed their heads. Their
        idols stared straight ahead with wide eyes to display dominance. A
        bowed head meant submission to a higher power. She was, the image
        said clearly, not a god herself but the servant of one.
      </p>

      <p>
        Her hands are folded in prayer in the indigenous gesture of offering,
        not in the European gesture of supplication. One hand is darker, one
        lighter — the union of two races. At her throat is a gold brooch
        bearing a small black cross. The same cross was on the banner of
        Hernando Cortés. The image was telling the Indians, plainly: the
        faith of the conquerors is the faith I bring.
      </p>

      <h2>Coatlaxopeuh — "she who crushes the serpent"</h2>

      <p>
        Juan Bernardino, Juan Diego's uncle, said the Lady gave him her
        name. The Spanish heard <em>Guadalupe</em>, which is what stuck —
        but the closest Nahuatl word, almost identical in pronunciation, is{" "}
        <em>coatlaxopeuh</em>: "she who crushes the serpent."
      </p>

      <p>
        For an Aztec hearing it, the meaning was direct. Quetzalcóatl, the
        feathered serpent, was one of their highest gods, and the serpent
        also stood for the demonic spirits demanding human sacrifice. The
        Lady at Tepeyac was identifying herself by the act she had come to
        perform.
      </p>

      <p>
        For a Christian, it was the prophecy of Genesis 3:15 — <em>"I will
        put enmity between you and the woman… She will crush your head."</em>
        The image and the name carried the same message in two cultures at
        once.
      </p>

      <h2>What the image accomplished</h2>

      <p>
        Within a decade, the temples were emptied. The drums that had once
        announced human sacrifice were heard no more. Churches rose where
        idols had stood. Nine million people changed religions because they
        recognized — in a single image — a message addressed to them in
        their own language, by someone who clearly knew them.
      </p>

      <p>
        Every canvas we print carries that same image. We didn't design any
        of it. Nothing in it was painted by human hands.
      </p>
    </BlogPostLayout>
  );
}
