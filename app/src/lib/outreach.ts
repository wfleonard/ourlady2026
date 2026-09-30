import { pool } from "@/lib/db";
import { transport } from "@/lib/mailer";
import { ORG } from "@/lib/site";
import { merge, toHtml, toText, type Fields } from "@/lib/emailFormat";

// Data and sending for the one-at-a-time outreach mailer at /admin/mailer.
// Sends go through the same Workspace SMTP relay as the order alerts.

export type Contact = {
  id: number;
  email: string;
  fields: Fields;
  unsubscribed: boolean;
  notes: string | null;
};

export type ContactRow = Contact & {
  sent_count: number;
  last_sent_at: Date | null;
  last_template: string | null;
};

export type Template = {
  id: number;
  slug: string;
  name: string;
  segment: string;
  position: number;
  subject: string;
  preview: string;
  body: string;
  active: boolean;
};

export type Send = {
  id: number;
  contact_id: number | null;
  template_id: number | null;
  template_name: string | null;
  to_email: string;
  subject: string;
  body: string;
  status: "sent" | "failed";
  error: string | null;
  sent_at: Date;
};

/** The organization a contact belongs to, from whichever column the list uses. */
export function orgName(f: Fields): string {
  return (
    f.business || f.businessname || f.company || f.organization ||
    f.parishname || f.schoolname || f.diocesename || ""
  );
}

export function personName(f: Fields): string {
  return [f.firstname, f.lastname].filter(Boolean).join(" ");
}

export const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

// ─── Contacts ────────────────────────────────────────────────

export async function listContacts(q: string, segment: string): Promise<ContactRow[]> {
  const { rows } = await pool.query<ContactRow>(
    `SELECT c.id, c.email, c.fields, c.unsubscribed, c.notes,
            (SELECT count(*)::int FROM mail_sends s WHERE s.contact_id = c.id AND s.status = 'sent') AS sent_count,
            ls.sent_at AS last_sent_at, t.name AS last_template
       FROM mail_contacts c
       LEFT JOIN LATERAL (
            SELECT sent_at, template_id FROM mail_sends s
             WHERE s.contact_id = c.id AND s.status = 'sent'
             ORDER BY sent_at DESC LIMIT 1) ls ON TRUE
       LEFT JOIN mail_templates t ON t.id = ls.template_id
      WHERE ($1 = '' OR c.email ILIKE '%' || $1 || '%' OR c.fields::text ILIKE '%' || $1 || '%')
        AND ($2 = '' OR c.fields->>'segment' = $2)
      ORDER BY c.id
      LIMIT 500`,
    [q, segment]
  );
  return rows;
}

export async function getContact(id: number): Promise<Contact | null> {
  const { rows } = await pool.query<Contact>(
    `SELECT id, email, fields, unsubscribed, notes FROM mail_contacts WHERE id = $1`,
    [id]
  );
  return rows[0] ?? null;
}

export async function listSegments(): Promise<string[]> {
  const { rows } = await pool.query<{ segment: string }>(
    `SELECT DISTINCT fields->>'segment' AS segment FROM mail_contacts
      WHERE coalesce(fields->>'segment', '') <> ''
     UNION
     SELECT DISTINCT segment FROM mail_templates WHERE segment <> ''
     ORDER BY 1`
  );
  return rows.map((r) => r.segment);
}

/** Every column name in use across the list, i.e. every @field available to templates. */
export async function listFieldKeys(): Promise<string[]> {
  const { rows } = await pool.query<{ key: string }>(
    `SELECT DISTINCT jsonb_object_keys(fields) AS key FROM mail_contacts ORDER BY 1`
  );
  return rows.map((r) => r.key);
}

/**
 * Insert or update by email. Non-blank values in `fields` overwrite what's
 * stored; blank ones leave the stored value alone, so re-importing a sheet with
 * a column missing doesn't wipe it.
 */
export async function upsertContact(email: string, fields: Fields): Promise<"inserted" | "updated"> {
  const clean = Object.fromEntries(
    Object.entries(fields).filter(([k, v]) => k && k !== "email" && v.trim())
  );
  const { rows } = await pool.query<{ inserted: boolean }>(
    `INSERT INTO mail_contacts (email, fields) VALUES ($1, $2)
     ON CONFLICT (email) DO UPDATE
        SET fields = mail_contacts.fields || EXCLUDED.fields, updated_at = NOW()
     RETURNING (xmax = 0) AS inserted`,
    [email.trim().toLowerCase(), clean]
  );
  return rows[0].inserted ? "inserted" : "updated";
}

export async function updateContact(
  id: number,
  email: string,
  fields: Fields,
  unsubscribed: boolean,
  notes: string
): Promise<void> {
  await pool.query(
    `UPDATE mail_contacts
        SET email = $2, fields = $3, unsubscribed = $4, notes = $5, updated_at = NOW()
      WHERE id = $1`,
    [id, email.trim().toLowerCase(), fields, unsubscribed, notes || null]
  );
}

export async function deleteContact(id: number): Promise<void> {
  await pool.query(`DELETE FROM mail_contacts WHERE id = $1`, [id]);
}

// ─── Templates ───────────────────────────────────────────────

export async function listTemplates(includeInactive = false): Promise<Template[]> {
  const { rows } = await pool.query<Template>(
    `SELECT id, slug, name, segment, position, subject, preview, body, active
       FROM mail_templates
      WHERE active OR $1
      ORDER BY segment, position, id`,
    [includeInactive]
  );
  return rows;
}

export async function getTemplate(id: number): Promise<Template | null> {
  const { rows } = await pool.query<Template>(
    `SELECT id, slug, name, segment, position, subject, preview, body, active
       FROM mail_templates WHERE id = $1`,
    [id]
  );
  return rows[0] ?? null;
}

export async function saveTemplate(
  id: number | null,
  t: Omit<Template, "id" | "slug">
): Promise<number> {
  if (id) {
    await pool.query(
      `UPDATE mail_templates
          SET name = $2, segment = $3, position = $4, subject = $5, preview = $6,
              body = $7, active = $8, updated_at = NOW()
        WHERE id = $1`,
      [id, t.name, t.segment, t.position, t.subject, t.preview, t.body, t.active]
    );
    return id;
  }
  const { rows } = await pool.query<{ id: number }>(
    `INSERT INTO mail_templates (slug, name, segment, position, subject, preview, body, active)
     VALUES ('custom-' || extract(epoch FROM clock_timestamp())::bigint, $1, $2, $3, $4, $5, $6, $7)
     RETURNING id`,
    [t.name, t.segment, t.position, t.subject, t.preview, t.body, t.active]
  );
  return rows[0].id;
}

// ─── Sends ───────────────────────────────────────────────────

const SEND_COLUMNS = `s.id, s.contact_id, s.template_id, t.name AS template_name, s.to_email,
  s.subject, s.body, s.status, s.error, s.sent_at`;

export async function listSendsForContact(contactId: number): Promise<Send[]> {
  const { rows } = await pool.query<Send>(
    `SELECT ${SEND_COLUMNS} FROM mail_sends s LEFT JOIN mail_templates t ON t.id = s.template_id
      WHERE s.contact_id = $1 ORDER BY s.sent_at DESC`,
    [contactId]
  );
  return rows;
}

export async function listRecentSends(limit = 15): Promise<Send[]> {
  const { rows } = await pool.query<Send>(
    `SELECT ${SEND_COLUMNS} FROM mail_sends s LEFT JOIN mail_templates t ON t.id = s.template_id
      ORDER BY s.sent_at DESC LIMIT $1`,
    [limit]
  );
  return rows;
}

export type Draft = { to: string; subject: string; preview: string; body: string };

/** Fills a template for one contact. `missing` lists @fields the contact has no value for. */
export function draftFor(template: Template, contact: Contact): Draft & { missing: string[] } {
  const fields = { ...contact.fields, email: contact.email };
  const subject = merge(template.subject, fields);
  const preview = merge(template.preview, fields);
  const body = merge(template.body, fields);
  return {
    to: contact.email,
    subject: subject.text,
    preview: preview.text,
    body: body.text,
    missing: [...new Set([...subject.missing, ...preview.missing, ...body.missing])],
  };
}

export function outreachFrom(): string {
  return process.env.OUTREACH_FROM || `William F. Leonard <${ORG.email}>`;
}

/** Sends one email. Throws on SMTP failure; the caller records the outcome. */
export async function deliver(draft: Draft): Promise<string> {
  if (!transport) throw new Error("SMTP is not configured (SMTP_HOST is blank in .env).");
  const info = await transport.sendMail({
    from: outreachFrom(),
    to: draft.to,
    bcc: process.env.OUTREACH_BCC || undefined,
    subject: draft.subject,
    text: toText(draft.body),
    html: toHtml(draft.body, draft.preview),
    headers: { "List-Unsubscribe": `<mailto:${ORG.email}?subject=unsubscribe>` },
  });
  return info.messageId;
}

export async function recordSend(s: {
  contactId: number;
  templateId: number | null;
  draft: Draft;
  error: string | null;
  messageId: string | null;
}): Promise<number> {
  const { rows } = await pool.query<{ id: number }>(
    `INSERT INTO mail_sends (contact_id, template_id, to_email, subject, body, status, error, message_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
    [
      s.contactId, s.templateId, s.draft.to, s.draft.subject, s.draft.body,
      s.error ? "failed" : "sent", s.error, s.messageId,
    ]
  );
  return rows[0].id;
}
