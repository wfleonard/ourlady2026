import { notFound } from "next/navigation";
import Link from "next/link";
import { BlogPostLayout } from "@/components/BlogPostLayout";
import { getPost } from "@/lib/blog";

const post = getPost("pope-latin-america-2026");

export const metadata = {
  alternates: { canonical: "/blog/pope-latin-america-2026" },
  title: `${post?.title} — Primos Maternos`,
  description: post?.excerpt,
};

export default function PopeLatinAmerica2026Post() {
  if (!post) notFound();
  return (
    <BlogPostLayout post={post}>
      <p>
        The Vatican has released Pope Leo XIV's schedule for his first
        apostolic voyage to Latin America. It runs <strong>November 6–17,
        2026</strong>, covering three countries — Uruguay, Argentina, and
        Peru. Ten public Masses. Three youth prayer vigils. Meetings with
        heads of state, interfaith leaders, and Catholic communities across
        the continent.
      </p>

      <p>
        The trip does not include Mexico. But it does include a striking
        number of Marian stops, and the timing overlaps a Guadalupe Jubilee
        Year that opened on October 12.
      </p>

      <h2>The itinerary — Marian highlights</h2>

      <h3>Uruguay · November 6–8</h3>
      <ul>
        <li>
          <strong>Nov 7 – Paysandú:</strong> Mass at Parque París Londres,
          10 a.m.
        </li>
        <li>
          <strong>Nov 7 – Montevideo:</strong> Youth prayer vigil at
          Centenary Stadium, 7 p.m.
        </li>
        <li>
          <strong>Nov 7 – Montevideo:</strong> Visit to the parish of{" "}
          <strong>Our Lady of Guadalupe</strong> — one of the few Marian
          shrines in the region dedicated specifically to the tilma image
        </li>
        <li>
          <strong>Nov 8 – Florida:</strong> Cathedral Basilica Mass, 10
          a.m.
        </li>
      </ul>

      <h3>Argentina · November 8–11</h3>
      <ul>
        <li>
          <strong>Nov 9 – Buenos Aires:</strong> Mass at Monumento de los
          Españoles, 11:30 a.m.
        </li>
        <li>
          <strong>Nov 10 – Córdoba:</strong> Mass at the Military Aviation
          School
        </li>
        <li>
          <strong>Nov 11 – Buenos Aires:</strong> Mass at the{" "}
          <strong>Basilica of Our Lady of Luján</strong> — the national
          Marian shrine of Argentina, and one of the most visited pilgrimage
          sites in South America
        </li>
      </ul>

      <h3>Peru · November 11–17</h3>
      <ul>
        <li>
          <strong>Nov 13 – Chiclayo:</strong> Mass near Pampas de Pimentel,
          10:30 a.m.; visit to the <strong>Shrine of Our Lady of Peace</strong>
        </li>
        <li>
          <strong>Nov 14 – Santa Cruz de Succhabamba:</strong> 11 a.m. Mass
        </li>
        <li>
          <strong>Nov 14 – Chiclayo:</strong> The Pope will{" "}
          <strong>crown a statue of the Virgin Mary at the Cathedral of
          St. Mary</strong> — a coronation is a formal Church act
          recognizing the shrine's importance
        </li>
        <li>
          <strong>Nov 14 – Lima:</strong> Prayer service for the closing of
          the jubilee year of St. Turibius of Mogrovejo, the second
          Archbishop of Lima and patron of the Latin American episcopate
        </li>
        <li>
          <strong>Nov 15 – Pucallpa:</strong> Mass at Villa Deportiva
          Regional Ucayali
        </li>
        <li>
          <strong>Nov 16 – Callao:</strong> Final Mass at Las Palmas Air
          Base
        </li>
      </ul>

      <h2>Why Peru</h2>

      <p>
        The six full days in Peru are not coincidence. Before he was
        elected Pope, Leo XIV served as bishop of Chiclayo. The visit to
        the Shrine of Our Lady of Peace and the Marian coronation at the
        Cathedral of St. Mary are, in effect, a return to a diocese he
        knows personally.
      </p>

      <p>
        The closing of the Jubilee of St. Turibius of Mogrovejo on
        November 14 in Lima is the other pole of the Peru leg — St.
        Turibius was the second Archbishop of Lima in the 16th century,
        traveled the Andes on foot, learned Quechua, and confirmed the
        young Rose of Lima. He is the patron saint of the Latin American
        bishops.
      </p>

      <h2>The Marian pattern</h2>

      <p>
        Look at the list again. In every one of the three countries the
        Pope visits, at least one major stop is a Marian shrine or a
        Marian act. An Our Lady of Guadalupe parish in Montevideo. The
        Basilica of Our Lady of Luján in Argentina. The Shrine of Our
        Lady of Peace and a Marian statue coronation in Peru. This is
        not accidental. It reflects both the Marian character of Latin
        American Catholicism and the Pope's own emphasis on Mary as
        Mother of the Americas.
      </p>

      <h2>The parallel Jubilee</h2>

      <p>
        The trip runs about a month after{" "}
        <Link href="/blog/jubilee-2026">
          the Guadalupe Jubilee Year opened at the Basilica in Mexico City
        </Link>
        {" "}on October 12, 2026. So while Pope Leo XIV himself will be
        celebrating Mass in Buenos Aires and Chiclayo, the Holy Door in
        Mexico City will be open and the Guadalupan pilgrimages will be
        running. Millions of the faithful across the Americas can enter
        the Jubilee at Tepeyac while following the Pope's trip through
        Uruguay, Argentina, and Peru at the same time.
      </p>

      <p>
        For parishes and Guadalupe ministries in the U.S., the two events
        together — the Jubilee Year on one hand, the papal voyage on the
        other — make November and December an exceptionally full season
        of Marian attention across the continent.
      </p>
    </BlogPostLayout>
  );
}
