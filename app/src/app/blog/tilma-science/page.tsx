import { notFound } from "next/navigation";
import { BlogPostLayout } from "@/components/BlogPostLayout";
import { getPost } from "@/lib/blog";

const post = getPost("tilma-science");

export const metadata = {
  title: `${post?.title} — Primos Maternos`,
  description: post?.excerpt,
};

export default function TilmaSciencePost() {
  if (!post) notFound();
  return (
    <BlogPostLayout post={post}>
      <p>
        The tilma is a rough cloak woven from the fibers of the maguey cactus.
        It measures about 5'7" by 3'5" — two pieces of coarse agave cloth
        stitched up the center. Aztec men wore them as everyday clothing in
        1531. Nothing about the material is precious.
      </p>

      <p>
        Cloth woven from this fiber breaks down within roughly twenty years.
        Juan Diego's tilma has now hung in Mexico City for almost five
        centuries — much of that time exposed to candle smoke, humidity, dust,
        salt air, the breath of millions of pilgrims, and the constant
        touching of hands. It still shows no sign of decay.
      </p>

      <h2>The pigments that aren't there</h2>

      <p>
        In 1936, the German chemist Richard Kuhn — a Nobel laureate — examined
        threads from the tilma and reported that the colors were not animal,
        not mineral, and not vegetable. There was no known pigment that
        matched them.
      </p>

      <p>
        In 1979, two Americans — biophysicist Philip Callahan of the
        University of Florida (himself a painter) and Jody B. Smith — examined
        the image with infrared photography. Their findings, summarized:
      </p>

      <ul>
        <li>No trace of paint anywhere on the original portions</li>
        <li>No brush strokes</li>
        <li>No sketches, no underdrawing, no corrections</li>
        <li>No primer or sizing on the cloth</li>
        <li>Face, hands, robe, and mantle were laid down in a single step</li>
      </ul>

      <p>
        A NASA professor who studied the infrared analysis wrote:
      </p>

      <blockquote>
        "There is no way to explain the quality of the pigments used for the
        pink dress, the blue veil, the face and the hands, or the permanence
        of the colors, or the vividness of the colors after several
        centuries, during which they ordinarily should have deteriorated…
        Studying this Image has been the most moving experience of my life."
      </blockquote>

      <p>
        Callahan and Smith also noted iridescence — the image changes color
        slightly with the viewing angle, a property that cannot be reproduced
        by any technique of human painting.
      </p>

      <h2>The figures in her eyes</h2>

      <p>
        In 1929, the Basilica's official photographer noticed what looked like
        a bearded man reflected in the right eye of the image. In 1951, that
        same figure was confirmed by examination through a magnifier, and the
        same reflection was found in the left eye — in the position it would
        appear in a living human eye, according to the optical laws of the
        Samson-Purkinje effect (the triple reflection produced by the curved
        surface of a real cornea).
      </p>

      <p>
        More than twenty ophthalmologists have since examined the eyes. The
        first, Dr. Javier Torroella Bueno in 1956, certified the presence of
        the full triple reflection. Dr. Rafael Torrija Lavoignet, examining
        with an ophthalmoscope, noted that the eyes appeared strangely
        "alive."
      </p>

      <p>
        In 1979, Dr. José Aste Tonsmann — a Cornell-trained engineer working
        at IBM — scanned a high-resolution photograph of the eyes at 2,500×
        magnification and processed the images with the same algorithms used
        for satellite imagery. He identified <strong>thirteen separate
        human figures</strong> reflected in the eyes, in the proportions and
        positions you would expect in a real eye reflecting what stood in
        front of it:
      </p>

      <ul>
        <li>A seated indigenous man</li>
        <li>An elderly white man with a bald patch and white beard — matching contemporary portraits of Bishop Zumárraga</li>
        <li>A young translator</li>
        <li>Juan Diego, opening his tilma</li>
        <li>A black woman (Zumárraga's freed slave Maria, documented in his will)</li>
        <li>A pensive bearded Spaniard</li>
        <li>And, in the center of the pupils — a family group: a young mother with a baby on her back in a rebozo, a man, two children, and an older couple</li>
      </ul>

      <p>
        In 1991, ophthalmologists detected microscopic capillary circulation
        in the free edge of the eyelids and cornea. The pupils have been
        shown to constrict in response to light and dilate again when it is
        removed — exactly as a living human eye would.
      </p>

      <h2>What the tilma has survived</h2>

      <p>
        In 1791, a workman cleaning the glass frame spilled concentrated
        nitric acid directly onto the cloth. Such a spill should have eaten a
        hole through the fabric within minutes. Instead, only a faint
        streaking appeared in one corner — and over time even that has
        faded.
      </p>

      <p>
        In 1921, during the Mexican Revolution, a bomb hidden in a vase of
        flowers at the foot of the image was detonated. The blast destroyed
        the marble altar steps, bent a brass crucifix, and shattered windows
        in nearby buildings. The pane of glass protecting the tilma was not
        even cracked. The image was untouched. Since 1993 the tilma has hung
        behind bulletproof glass.
      </p>

      <h2>What it cost the scientists</h2>

      <p>
        Many of the researchers who studied the image came to it as
        skeptics and left it as believers. The NASA scientist's quote above
        was not isolated. Callahan, an established academic with no
        religious motive for his conclusions, wrote that the original image
        was "unexplainable as a human work."
      </p>

      <p>
        We don't ask anyone to take any of this on faith. We ask only that
        you look at the image, with the science laid out, and decide for
        yourself what to make of it.
      </p>
    </BlogPostLayout>
  );
}
