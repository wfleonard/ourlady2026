import { notFound } from "next/navigation";
import Link from "next/link";
import { BlogPostLayout } from "@/components/BlogPostLayout";
import { getPost } from "@/lib/blog";

const post = getPost("500th-anniversary-2031");

export const metadata = {
  alternates: { canonical: "/blog/500th-anniversary-2031" },
  title: `${post?.title} — Primos Maternos`,
  description: post?.excerpt,
};

export default function FiveHundredthAnniversaryPost() {
  if (!post) notFound();
  return (
    <BlogPostLayout post={post}>
      <p>
        In December 2031, the Church will mark <strong>500 years</strong>{" "}
        since Our Lady appeared to Saint Juan Diego on the hill of Tepeyac.
        Mexico City has now named the man who will shape that celebration:{" "}
        <strong>Father Eduardo Chávez</strong>, the Basilica of Guadalupe's
        magisterial Guadalupan theologian.
      </p>

      <p>
        Cardinal Carlos Aguiar Retes, primate archbishop of Mexico, appointed
        him in a letter signed September 22, 2026. Father Chávez will
        represent the Primate Archdiocese of Mexico for the content,
        preparation, and celebrations of the fifth centenary.
      </p>

      <h2>Who is Father Eduardo Chávez?</h2>

      <p>
        Few people alive know the Guadalupe event as closely as he does.
      </p>
      <ul>
        <li>
          <strong>Postulator of the cause of Saint Juan Diego</strong> — the
          priest responsible for presenting the visionary's case for
          sainthood to Rome. Juan Diego was canonized by Pope John Paul II in
          2002.
        </li>
        <li>
          <strong>Head of the Higher Institute of Guadalupan Studies</strong>,
          which has carried out research and formation on the apparitions for
          more than 25 years.
        </li>
        <li>
          <strong>Theologian of the Basilica</strong>, the official voice on
          what the Church teaches about the image and its message.
        </li>
      </ul>
      <p>
        In naming him, the cardinal pointed to exactly this preparation and
        experience.
      </p>

      <h2>What he says the anniversary is for</h2>

      <p>
        Speaking to ACI Prensa on October 7, Father Chávez called the
        appointment{" "}
        <q>a great honor, but also a great responsibility.</q> He was clear
        that the centenary is not meant to be a celebration of Mary for her
        own sake. Its purpose is to lead people to Jesus — the center of
        her message at Tepeyac — through devotion, praise, and above all
        adoration. He also hopes it will draw people together in shared love
        and enthusiasm for the faith.
      </p>

      <p>
        That is the same pattern the apparition itself followed. Mary asked
        for a church — a house where her Son would be worshiped — not a
        monument to herself.
      </p>

      <h2>Why 1531 still matters</h2>

      <p>
        Between December 9 and 12, 1531, Our Lady appeared to Juan Diego and
        asked that a shrine be built at Tepeyac. On December 12 she sent him
        to Bishop Juan de Zumárraga with roses gathered in his tilma. When he
        opened the cloak, her image was on it. That same tilma hangs in the
        Basilica in Mexico City today.{" "}
        <Link href="/blog/apparition">Read the full story of the apparition</Link>
        , or{" "}
        <Link href="/blog/tilma-science">
          what science still cannot explain about the cloth
        </Link>
        .
      </p>

      <h2>The road to 2031</h2>

      <p>
        The archdiocese has not yet published a program of events. What is
        known so far:
      </p>
      <ul>
        <li>
          <strong>September 22, 2026</strong> — Father Chávez appointed to
          lead the content and preparation for the centenary.
        </li>
        <li>
          <strong>October 12, 2026 – October 12, 2027</strong> —{" "}
          <Link href="/blog/jubilee-2026">
            the Guadalupe Jubilee Year
          </Link>{" "}
          marks 50 years since the tilma was moved into the New Basilica.
        </li>
        <li>
          <strong>December 9–12, 2031</strong> — 500 years since the four
          apparitions and the image on the tilma.
        </li>
      </ul>
      <p>
        We'll update this page as the archdiocese announces pilgrimages,
        liturgies, and other events.
      </p>

      <h2>How parishes and families can prepare</h2>

      <p>
        Five years is enough time to build something lasting, not just plan
        a single feast day.
      </p>
      <ul>
        <li>
          <strong>Make December 12 a yearly milestone.</strong> Treat each
          feast between now and 2031 as a step toward the centenary.
        </li>
        <li>
          <strong>Pray the novena.</strong> The{" "}
          <Link href="/novena">Guadalupe novena</Link> leading up to December
          12 is a simple way for a household or parish to start.
        </li>
        <li>
          <strong>Teach the story and the symbols.</strong> Children and
          catechumens can learn{" "}
          <Link href="/blog/codex-symbols">
            what the image said to the Aztecs
          </Link>{" "}
          — a lesson that lands well in classrooms and faith formation.
        </li>
        <li>
          <strong>Give the image a place of honor.</strong> A faithful
          reproduction of the tilma in a home, chapel, or parish hall keeps
          the anniversary in front of people every day. See our options for{" "}
          <Link href="/parishes">parishes</Link> and{" "}
          <Link href="/schools">schools</Link>.
        </li>
      </ul>

      <p className="text-sm text-stone-500">
        Source:{" "}
        <a
          href="https://www.ewtnnews.com/world/americas/guadalupe-expert-appointed-to-lead-mexico-s-preparations-for-500th-anniversary-of-apparitions"
          target="_blank"
          rel="noopener noreferrer"
        >
          David Ramos, EWTN News / ACI Prensa
        </a>
        , October 9, 2026.
      </p>
    </BlogPostLayout>
  );
}
