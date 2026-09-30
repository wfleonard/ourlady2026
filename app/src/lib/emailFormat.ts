// Merge fields and the light Markdown the campaign emails are written in.
//
// Merge fields are @name, all lowercase, matching a spreadsheet column
// header (the same syntax as the docs/email-campaigns files). An @ right
// after a letter, digit, dot or @ is part of an email address and left alone,
// so wfleonard@primosmaternos.com in a signature is never treated as a field.
//
// Markdown supported: blank-line paragraphs, "- " and "1. " lists, "> "
// quotes, **bold**, *italic*, [text](https://link).

export type Fields = Record<string, string>;

const FIELD_RE = /(?<![\w.@])@([a-z][a-z0-9_]*)/g;

/** Every @field a template uses, in order of first appearance. */
export function fieldsUsed(text: string): string[] {
  return [...new Set([...text.matchAll(FIELD_RE)].map((m) => m[1]))];
}

/** Fills @fields from the contact. Blank or absent ones are left in place and reported. */
export function merge(text: string, fields: Fields): { text: string; missing: string[] } {
  const missing = new Set<string>();
  const out = text.replace(FIELD_RE, (match, key: string) => {
    const value = fields[key]?.trim();
    if (!value) {
      missing.add(key);
      return match;
    }
    return value;
  });
  return { text: out, missing: [...missing] };
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function inlineHtml(s: string): string {
  return escapeHtml(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*\n]+)\*/g, "<em>$1</em>")
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
      '<a href="$2" style="color:#8a1c1c;">$1</a>'
    );
}

function inlineText(s: string): string {
  return s
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, "$1 ($2)")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*([^*\n]+)\*/g, "$1");
}

const blocks = (md: string) =>
  md.replace(/\r\n/g, "\n").trim().split(/\n{2,}/).map((b) => b.split("\n"));

const P = 'style="margin:0 0 14px;"';

export function toHtml(md: string, preview = ""): string {
  const body = blocks(md)
    .map((lines) => {
      if (lines.every((l) => /^[-*] /.test(l))) {
        return `<ul ${P}>${lines.map((l) => `<li>${inlineHtml(l.slice(2))}</li>`).join("")}</ul>`;
      }
      if (lines.every((l) => /^\d+\. /.test(l))) {
        return `<ol ${P}>${lines.map((l) => `<li>${inlineHtml(l.replace(/^\d+\. /, ""))}</li>`).join("")}</ol>`;
      }
      if (lines.every((l) => l.startsWith(">"))) {
        const inner = lines.map((l) => inlineHtml(l.replace(/^>\s?/, ""))).join("<br>");
        return `<blockquote style="margin:0 0 14px;padding-left:12px;border-left:3px solid #ddd;color:#555;">${inner}</blockquote>`;
      }
      return `<p ${P}>${lines.map(inlineHtml).join("<br>")}</p>`;
    })
    .join("\n");

  // The hidden preheader is the "preview text" inboxes show after the subject.
  const preheader = preview
    ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preview)}</div>`
    : "";
  return `<!doctype html><html><body style="margin:0;padding:0;">${preheader}<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#222;max-width:620px;padding:16px;">${body}</div></body></html>`;
}

export function toText(md: string): string {
  return blocks(md)
    .map((lines) => lines.map((l) => inlineText(l.replace(/^>\s?/, ""))).join("\n"))
    .join("\n\n");
}
