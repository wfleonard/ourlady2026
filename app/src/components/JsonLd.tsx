/**
 * Renders one JSON-LD block. Assistants and search engines read these to learn
 * what a page is about without parsing the prose.
 *
 * `<` is escaped so a stray "</script>" inside any value cannot close the tag
 * early, which is the one way a block like this can break a page.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
