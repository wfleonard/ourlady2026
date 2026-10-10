"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin, signOut } from "@/lib/adminAuth";
import { parseCsv, normalizeKey } from "@/lib/csv";
import { merge } from "@/lib/emailFormat";
import {
  deleteContact, deliver, getContact, isEmail, recordSend,
  saveTemplate, updateContact, upsertContact,
} from "@/lib/outreach";
import { ORG } from "@/lib/site";

const str = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();

/**
 * Sends the (possibly hand-edited) draft on the contact page. Any @field still
 * in the text is filled from the contact again, and the send is refused if one
 * has no value, so "Dear @firstname," never goes out.
 */
export async function sendEmail(fd: FormData) {
  await requireAdmin();
  const contactId = Number(str(fd, "contactId"));
  const templateId = Number(str(fd, "templateId")) || null;
  const test = str(fd, "mode") === "test";
  const back = `/admin/mailer/contacts/${contactId}?t=${templateId ?? ""}`;

  const contact = await getContact(contactId);
  if (!contact) redirect("/admin/mailer");
  if (contact.unsubscribed && !test) redirect(`${back}&err=unsubscribed`);

  const fields = { ...contact.fields, email: contact.email };
  const subject = merge(str(fd, "subject"), fields);
  const preview = merge(str(fd, "preview"), fields);
  const body = merge(String(fd.get("body") ?? ""), fields);
  if (subject.missing.length || preview.missing.length || body.missing.length) {
    redirect(`${back}&err=missing`);
  }
  if (!subject.text || !body.text.trim()) redirect(`${back}&err=empty`);

  if (test) {
    // A copy to yourself; not recorded against the contact.
    const to = process.env.OUTREACH_BCC || process.env.ORDER_NOTIFY_TO || ORG.email;
    try {
      await deliver({ to, subject: `[TEST] ${subject.text}`, preview: preview.text, body: body.text });
    } catch (e) {
      console.error("Outreach test send failed:", e);
      redirect(`${back}&err=testfailed`);
    }
    redirect(`${back}&test=1`);
  }

  const draft = { to: contact.email, subject: subject.text, preview: preview.text, body: body.text };
  let messageId: string | null = null;
  let error: string | null = null;
  try {
    messageId = await deliver(draft);
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
    console.error(`Outreach send to contact ${contactId} failed:`, e);
  }
  const sendId = await recordSend({ contactId, templateId, draft, error, messageId });
  revalidatePath("/admin/mailer");
  redirect(`/admin/mailer/contacts/${contactId}?${error ? "failed" : "sent"}=${sendId}`);
}

export async function saveContact(fd: FormData) {
  await requireAdmin();
  const id = Number(str(fd, "id"));
  const email = str(fd, "email");
  if (!isEmail(email)) redirect(`/admin/mailer/contacts/${id}?err=bademail`);

  // Existing fields arrive as field:<key>; one new column as newKey/newValue.
  const fields: Record<string, string> = {};
  for (const [k, v] of fd.entries()) {
    if (k.startsWith("field:") && String(v).trim()) fields[k.slice(6)] = String(v).trim();
  }
  const newKey = normalizeKey(str(fd, "newKey"));
  if (newKey && newKey !== "email" && str(fd, "newValue")) fields[newKey] = str(fd, "newValue");

  try {
    await updateContact(id, email, fields, fd.get("unsubscribed") === "on", str(fd, "notes"));
  } catch (e) {
    if ((e as { code?: string }).code === "23505") redirect(`/admin/mailer/contacts/${id}?err=dupemail`);
    throw e;
  }
  redirect(`/admin/mailer/contacts/${id}?saved=1`);
}

export async function removeContact(fd: FormData) {
  await requireAdmin();
  await deleteContact(Number(str(fd, "id")));
  redirect("/admin/mailer?deleted=1");
}

/** Add one contact by hand, then open it so it can be emailed right away. */
export async function addContact(fd: FormData) {
  await requireAdmin();
  const email = str(fd, "email");
  if (!isEmail(email)) redirect(`/admin/mailer/add?err=bademail&segment=${encodeURIComponent(str(fd, "segment"))}`);
  const fields: Record<string, string> = {};
  for (const key of ["firstname", "lastname", "business", "city", "state", "segment"]) {
    fields[key] = str(fd, key);
  }
  if (str(fd, "newSegment")) fields.segment = str(fd, "newSegment");
  const { id } = await upsertContact(email, fields, str(fd, "notes"));
  revalidatePath("/admin/mailer");
  redirect(`/admin/mailer/contacts/${id}?saved=1`);
}

/** Upload a CSV exported from the spreadsheet. Matches on email: new rows are added, existing ones updated. */
export async function importCsv(fd: FormData) {
  await requireAdmin();
  const file = fd.get("file");
  if (!(file instanceof File) || file.size === 0) redirect("/admin/mailer/import?err=nofile");

  const { headers, rows } = parseCsv(await file.text());
  if (!headers.includes("email")) redirect("/admin/mailer/import?err=noemail");

  let inserted = 0, updated = 0, skipped = 0;
  for (const row of rows) {
    if (!isEmail(row.email ?? "")) {
      skipped++;
      continue;
    }
    const { inserted: isNew } = await upsertContact(row.email, row);
    if (isNew) inserted++;
    else updated++;
  }
  revalidatePath("/admin/mailer");
  redirect(`/admin/mailer/import?inserted=${inserted}&updated=${updated}&skipped=${skipped}`);
}

export async function saveTemplateAction(fd: FormData) {
  await requireAdmin();
  const id = Number(str(fd, "id")) || null;
  const t = {
    name: str(fd, "name"),
    segment: str(fd, "segment"),
    position: Number(str(fd, "position")) || 0,
    subject: str(fd, "subject"),
    preview: str(fd, "preview"),
    body: String(fd.get("body") ?? "").replace(/\r\n/g, "\n").trim(),
    active: fd.get("active") === "on",
  };
  if (!t.name || !t.subject || !t.body) redirect(`/admin/mailer/templates/${id ?? "new"}?err=required`);
  const saved = await saveTemplate(id, t);
  redirect(`/admin/mailer/templates/${saved}?saved=1`);
}

export async function signOutAction() {
  await signOut();
  redirect("/admin/login");
}

