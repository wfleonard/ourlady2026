import { notFound } from "next/navigation";
import { BlogPostLayout } from "@/components/BlogPostLayout";
import { getPost } from "@/lib/blog";

const post = getPost("apparition");

export const metadata = {
  title: `${post?.title} — Primos Maternos`,
  description: post?.excerpt,
};

export default function ApparitionPost() {
  if (!post) notFound();
  return (
    <BlogPostLayout post={post}>
      <p>
        On the morning of Saturday, December 9, 1531, a 57-year-old indigenous
        widower named Juan Diego was walking to Mass at Tlatelolco. His path
        took him past the hill of Tepeyac, a few miles north of what is today
        Mexico City. At the foot of the hill he heard music — and a woman's
        voice calling his name.
      </p>

      <p>
        She was young, perhaps eighteen. Her skin was the color of his own.
        She told him who she was:
      </p>

      <blockquote>
        "Know for certain, littlest of my sons, that I am the perfect and
        perpetual Virgin Mary, Mother of the True God through Whom everything
        lives, the Lord of all things near and far, the Master of heaven and
        earth."
      </blockquote>

      <p>
        She asked for a temple to be built on that spot, where she could "show
        and give all my love, compassion, help, and protection." She sent Juan
        Diego to the bishop of Mexico City with the request.
      </p>

      <h2>The bishop's doubt</h2>

      <p>
        Bishop Juan de Zumárraga, a Spanish Franciscan, listened politely.
        Juan Diego was an indigenous laborer, recently baptized, with no
        standing. The bishop did what any bishop in 1531 would have done — he
        asked for a sign.
      </p>

      <p>
        Juan Diego returned to Tepeyac and reported the bishop's answer. The
        Lady told him to come back the next morning, when she would give him
        a sign worthy of belief.
      </p>

      <h2>An uncle near death</h2>

      <p>
        But the next morning, Juan Diego could not come. His uncle, Juan
        Bernardino, was dying. Juan Diego left at dawn to fetch a priest to
        administer the last rites — and tried to skirt the hill so he wouldn't
        have to face the Lady empty-handed. She intercepted him anyway.
      </p>

      <p>
        Her words to him on that fourth and final visit have been engraved on
        the hearts of Mexicans for almost five centuries:
      </p>

      <blockquote>
        "Do not let anything afflict you, and do not be afraid of any illness
        or accident or pain. Am I not here who am your Mother? Are you not
        under my shadow and protection? Is there anything else that you need?"
      </blockquote>

      <p>
        She told him not to worry about his uncle — Juan Bernardino had
        already been healed. (When Juan Diego returned home that evening, he
        found him well, and his uncle told of a young Lady in light who had
        appeared to him and called herself{" "}
        <em>"Immaculate Virgin Mary who crushed the Serpent."</em>)
      </p>

      <h2>Roses in December</h2>

      <p>
        The Lady sent Juan Diego to the top of Tepeyac to gather flowers.
        Tepeyac in December was a barren rocky outcrop where nothing grew.
        Juan Diego climbed it anyway. At the summit he found a bed of
        Castilian roses — flowers not native to Mexico, and not in season
        anywhere — blooming in the morning frost.
      </p>

      <p>
        He cut them and brought them down. With her own hands the Lady
        arranged them inside his tilma — the rough cactus-fiber cloak worn by
        Aztec men — and tied it around his neck. She told him:
      </p>

      <blockquote>
        "You are my ambassador worthy of confidence. Go in peace."
      </blockquote>

      <h2>The sign</h2>

      <p>
        Back at the bishop's residence, Juan Diego was made to wait. When he
        was finally admitted, he opened his tilma to let the roses tumble out
        as proof — and saw the bishop and his attendants fall to their knees.
        On the coarse cloth of the tilma, where there had been nothing before,
        was an image of the Lady, life-sized, exactly as Juan Diego had seen
        her at Tepeyac.
      </p>

      <p>
        That tilma is the same one still hanging today in the Basilica of Our
        Lady of Guadalupe in Mexico City. It is the image we print on every
        canvas we sell. Almost five hundred years later, no one has been able
        to explain how it was made.
      </p>

      <p>
        Juan Diego spent the remaining seventeen years of his life telling the
        story to every Indian who would listen. In 2002, Pope John Paul II
        canonized him in Mexico City — the first indigenous American to be
        declared a saint.
      </p>
    </BlogPostLayout>
  );
}
