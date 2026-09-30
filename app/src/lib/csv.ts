/**
 * Minimal RFC 4180 CSV parser: quoted fields, doubled quotes, commas and
 * newlines inside quotes, CRLF, and the BOM Excel puts on "CSV UTF-8" exports.
 * Returns one object per row keyed by header.
 */
export function parseCsv(input: string): { headers: string[]; rows: Record<string, string>[] } {
  const text = input.replace(/^﻿/, "");
  const records: string[][] = [];
  let record: string[] = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        quoted = false;
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      quoted = true;
    } else if (ch === ",") {
      record.push(field);
      field = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      record.push(field);
      records.push(record);
      record = [];
      field = "";
    } else {
      field += ch;
    }
  }
  if (field || record.length) {
    record.push(field);
    records.push(record);
  }

  const nonEmpty = records.filter((r) => r.some((v) => v.trim()));
  const [headerRow = [], ...body] = nonEmpty;
  const headers = headerRow.map(normalizeKey);
  const rows = body.map((r) =>
    Object.fromEntries(headers.map((h, i) => [h, (r[i] ?? "").trim()]))
  );
  return { headers, rows };
}

/** "First Name" → "firstname", "Business_Name" → "business_name". Headers become @merge fields. */
export function normalizeKey(header: string): string {
  return header.trim().toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9_]/g, "");
}
