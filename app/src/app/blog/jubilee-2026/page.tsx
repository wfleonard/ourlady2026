import { notFound } from "next/navigation";
import { BlogPostLayout } from "@/components/BlogPostLayout";
import { getPost } from "@/lib/blog";

const post = getPost("jubilee-2026");

export const metadata = {
  title: `${post?.title} — Primos Maternos`,
  description: post?.excerpt,
};

export default function Jubilee2026Post() {
  if (!post) notFound();
  return (
    <BlogPostLayout post={post}>
      <p>
        On September 9, 2026, Cardinal Carlos Aguiar Retes — the primate
        archbishop of Mexico — announced that Pope Leo XIV had granted a
        Jubilee Year for Our Lady of Guadalupe. It marks fifty years since
        the image of the Virgin was carried, on October 12, 1976, from the
        Old Basilica into the New Basilica that still houses it today.
      </p>

      <p>
        The Jubilee runs a full year, from{" "}
        <strong>October 12, 2026 through October 12, 2027</strong>.
      </p>

      <h2>What is opening on October 12</h2>

      <p>
        Cardinal Aguiar will celebrate the opening Mass of the Roses at noon
        on October 12, 2026, at the Basilica of Guadalupe in Mexico City. He
        will formally open the Holy Door — the physical sign that a Jubilee
        Year is under way.
      </p>

      <p>
        Construction on the current basilica began in 1974. Two years later,
        on October 12, 1976, the tilma of Saint Juan Diego — the same rough
        agave-fiber cloak with the image miraculously imprinted on it in 1531
        — was transferred from the Old Basilica (now called the Expiatory
        Temple of Christ the King) into the new circular structure. That
        transfer is what the anniversary commemorates.
      </p>

      <h2>The plenary indulgence</h2>

      <p>
        A Jubilee Year comes with a plenary indulgence — the full remission
        of the temporal punishment due to sin already forgiven. To receive
        it during this Jubilee, the faithful must:
      </p>

      <ul>
        <li>Visit the Basilica of Guadalupe in Mexico City with devotion and a contrite spirit</li>
        <li>Participate in a liturgical act at the basilica, or spend time in prayer there</li>
        <li>Go to sacramental confession</li>
        <li>Receive Eucharistic Communion</li>
        <li>Recite the Creed</li>
        <li>Pray for the intentions of the Holy Father</li>
      </ul>

      <p>
        The last four are the "usual conditions" attached to any Church
        indulgence. The first two are what make this particular one
        Guadalupan — it is tied specifically to the shrine at Tepeyac.
      </p>

      <h2>Why this Jubilee matters</h2>

      <p>
        Guadalupe is already the most visited Marian shrine in the world.
        Roughly 20 million pilgrims come to Mexico City each year — three
        times the traffic at Lourdes, second only to the Vatican itself. On
        the feast day of December 12, more than 3 million arrive in a single
        weekend.
      </p>

      <p>
        A Jubilee Year is not a permanent designation. Popes grant them for
        specific occasions — anniversaries, universal jubilees every 25
        years, or, as in this case, a milestone in the life of a particular
        shrine. The last time Guadalupe had one of this scope was for the
        450th anniversary of the apparition in 1981.
      </p>

      <p>
        Cardinal Aguiar's charge to the faithful: "May Saint Mary of
        Guadalupe, mother of the true God through whom we live, help us to
        make the most of this jubilee" and pursue "spiritual renewal and
        conversion."
      </p>

      <h2>If you can't make it to Mexico City</h2>

      <p>
        Most of us can't. But the year is also an invitation to bring the
        image into daily life at home — printed on canvas from the digital
        archive of the Sacred Original certified in Mexico in 1998 as a
        faithful reproduction.
      </p>

      <p>
        The Novena to Our Lady of Guadalupe is one traditional way to mark
        the Jubilee wherever you are — nine days of prayer, one for each of
        her apparitions to Juan Diego and Juan Bernardino. December 3–11
        prepares the heart for the feast day itself on December 12.
      </p>
    </BlogPostLayout>
  );
}
