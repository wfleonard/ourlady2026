import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogPostLayout } from "@/components/BlogPostLayout";
import { getPost } from "@/lib/blog";
import { ORG, pageTitle } from "@/lib/site";

const post = getPost("digital-archive-1998");

export const metadata = {
  alternates: { canonical: "/blog/digital-archive-1998" },
  title: pageTitle(post?.metaTitle ?? post?.title ?? ""),
  description: post?.excerpt,
};

// Every claim here traces to docs/primos-maternos-image-fidelity.md or to the
// linked sources. The Missionary Image accounts date their capture to 1999 and
// say nothing about Digital Color or Cardinal Rivera, so the post does not say
// the two are the same capture.
export default function DigitalArchivePost() {
  if (!post) notFound();
  return (
    <BlogPostLayout post={post}>
      <p>
        Most prints of Our Lady of Guadalupe have no documented link to the
        original: a photograph of a painting of a print, retouched along the
        way. One digital capture made directly from the tilma is documented by
        a certificate signed in Mexico City on the Feast of Our Lady of
        Guadalupe, December 12, 1998.
      </p>

      <h2>What is the &ldquo;digital archive of the Sacred Original&rdquo;?</h2>

      <p>
        It is a digital capture of the original tilma, the image the Church
        calls the <em>Sagrado Original</em>. The certificate signed by Cardinal
        Norberto Rivera Carrera, Archbishop Primate of Mexico, reads:
      </p>

      <blockquote>
        &ldquo;Certifico que la presente impresión es una reproducción fiel del
        archivo digital del Sagrado Original de la imagen de Nuestra Señora de
        Guadalupe.&rdquo;
        <br />
        &ldquo;I certify that this print is a faithful reproduction of the
        digital archive of the Sacred Original of the Image of Our Lady of
        Guadalupe.&rdquo;
      </blockquote>

      <p>
        The certificate is dated 12-XII-1998, so the archive existed by that
        day. No surviving document we hold gives the date of the capture
        itself.
      </p>

      <h2>Who was Digital Color, S.A. de C.V.?</h2>

      <p>
        Digital Color, S.A. de C.V. is the Mexican company named at the foot
        of the certificate: &ldquo;Captura del archivo digital y reproducción:
        DIGITAL COLOR S.A. DE C.V.&rdquo; (digital archive capture and
        reproduction). The certificate credits it with both.
      </p>

      <p>
        Beyond that line, we have found no public record of the company or of
        who authorized it to do the work. If you know more about Digital Color
        or the 1998 capture, we would like to hear from you at{" "}
        <a href={`mailto:${ORG.email}`}>{ORG.email}</a>.
      </p>

      <h2>What does &ldquo;faithful reproduction&rdquo; certify?</h2>

      <p>
        It certifies that one print matched the digital archive. That is a
        narrower claim than it sounds, and the difference matters when you
        compare sellers:
      </p>

      <ul>
        <li>It speaks to the print made in 1998, not to every print made since.</li>
        <li>It certifies faithfulness to the archive, which was captured from the Sacred Original.</li>
        <li>It is not an endorsement of any seller, including us.</li>
      </ul>

      <h2>How is it different from the Virgen Peregrina blessing?</h2>

      <p>
        They are two separate documents. The second records that the image
        known as the Virgen Peregrina, the Pilgrim Virgin, was blessed by Pope
        John Paul II on January 25, 1999, during his visit to Mexico City. It
        then traveled throughout Mexico from January 1999 to April 2000 for
        the Great Jubilee. The 1998 certificate is about fidelity to the
        original; the 1999 document is about a blessing and a pilgrimage.
      </p>

      <h2>Is it the same as the Missionary Image?</h2>

      <p>
        Not as far as any document shows. The Missionary Images are four
        large reproductions that, according to the Diocese of Orange and
        diocesan accounts, were made from a high-resolution digital image of
        the original tilma in 1999, with the approval of the Church. They were
        blessed by Monsignor Diego Monroy and have toured parishes in the
        United States and elsewhere.
      </p>

      <p>
        The published accounts of the Missionary Images date their capture to
        1999 and do not name Digital Color or Cardinal Rivera. The 1998
        certificate shows an archive already existed the year before. Whether
        the two are the same capture is not something the public record
        settles, so we don&apos;t claim it.
      </p>

      <h2>Why the capture matters for a print</h2>

      <p>
        A print is only as sharp as the file behind it. The file we print from
        is 6,900 by 10,350 pixels, the same 2:3 proportion as our canvases, so
        nothing is cropped or stretched. That works out to 287.5 pixels per
        inch on a 24 by 36 inch canvas. The details are on our{" "}
        <Link href="/canvas-sizes">canvas sizes</Link> page, and full-size crops
        of the face, stars, and gold edging are on our{" "}
        <Link href="/authenticity">authenticity</Link> page alongside both
        certificates.
      </p>

      <h2>Sources</h2>

      <ul>
        <li>
          The 1998 certificate of faithful reproduction and the 1999 Virgen
          Peregrina certification, both shown on our{" "}
          <Link href="/authenticity">authenticity</Link> page.
        </li>
        <li>
          <a href="https://www.rcbo.org/tilma/about/" rel="noopener">
            Roman Catholic Diocese of Orange
          </a>
          , &ldquo;What is the Missionary Image?&rdquo;
        </li>
        <li>
          <a
            href="https://www.occatholic.com/the-missionary-tilma-of-our-lady-of-guadalupe/"
            rel="noopener"
          >
            OC Catholic
          </a>
          , &ldquo;The Missionary Tilma of Our Lady of Guadalupe.&rdquo;
        </li>
        <li>
          <a
            href="https://www.vatican.va/content/john-paul-ii/es/speeches/1999/january/documents/hf_jp-ii_spe_19990125_mexico-generations.html"
            rel="noopener"
          >
            The Holy See
          </a>
          , Pope John Paul II in Mexico City, January 25, 1999.
        </li>
      </ul>
    </BlogPostLayout>
  );
}
