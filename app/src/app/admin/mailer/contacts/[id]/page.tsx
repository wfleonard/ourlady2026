import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/adminAuth";
import { toHtml } from "@/lib/emailFormat";
import {
  draftFor, getContact, listFieldKeys, listSendsForContact, listTemplates,
  orgName, outreachFrom, personName,
} from "@/lib/outreach";
import { removeContact, saveContact, sendEmail } from "../../actions";
import { Flash, MailerNav, button, buttonGhost, fmtDate, input } from "../../ui";

const ERRORS: Record<string, string> = {
  missing: "Some @fields have no value for this contact. Fill them in under Contact details, or edit them out of the draft.",
  empty: "Subject and body can't be empty.",
  unsubscribed: "This contact is marked unsubscribed.",
  testfailed: "The test email failed to send. Check the server logs (docker compose logs nextjs-app).",
  bademail: "That isn't a valid email address.",
  dupemail: "Another contact already has that email address.",
};

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  await requireAdmin();
  const { id } = await params;
  const sp = await searchParams;
  const contact = await getContact(Number(id));
  if (!contact) notFound();

  const [templates, sends, fieldKeys] = await Promise.all([
    listTemplates(),
    listSendsForContact(contact.id),
    listFieldKeys(),
  ]);

  const sentAt = new Map<number, Date>();
  for (const s of sends) {
    if (s.status === "sent" && s.template_id && !sentAt.has(s.template_id)) sentAt.set(s.template_id, s.sent_at);
  }
  const segment = contact.fields.segment ?? "";
  const sequence = templates.filter((t) => segment && t.segment === segment);
  const others = templates.filter((t) => !sequence.includes(t));
  const nextUp = sequence.find((t) => !sentAt.has(t.id));

  // ?t= picks a template; otherwise default to the next unsent one in the sequence.
  const chosenId = sp.t !== undefined ? Number(sp.t) : nextUp?.id;
  const template = templates.find((t) => t.id === chosenId);
  const draft = template ? draftFor(template, contact) : null;
  const alreadySent = template ? sentAt.get(template.id) : undefined;

  const sentRow = sp.sent ? sends.find((s) => s.id === Number(sp.sent)) : undefined;
  const failedRow = sp.failed ? sends.find((s) => s.id === Number(sp.failed)) : undefined;

  // Show every column the list uses, so a blank one can be filled in here.
  const keys = [...new Set([...Object.keys(contact.fields), ...fieldKeys])].sort();

  return (
    <>
      <MailerNav active="contacts" />
      <Link href="/admin/mailer" className="text-sm text-stone-500 hover:underline">← All contacts</Link>

      <div className="mt-2 mb-6">
        <h1 className="text-2xl font-semibold">{orgName(contact.fields) || contact.email}</h1>
        <p className="text-sm text-stone-600">
          {[personName(contact.fields), contact.fields.contactrole, contact.email].filter(Boolean).join(" · ")}
        </p>
        <p className="text-sm text-stone-500">
          {[contact.fields.city, contact.fields.state].filter(Boolean).join(", ")}
          {segment && ` · Segment ${segment}`}
          {contact.unsubscribed && <span className="ml-2 text-red-700 font-medium">Unsubscribed</span>}
        </p>
      </div>

      {sentRow && <Flash tone="ok">Sent “{sentRow.subject}” to {sentRow.to_email}.</Flash>}
      {failedRow && <Flash tone="err">Send failed: {failedRow.error}</Flash>}
      {sp.test && <Flash tone="ok">Test copy sent to you.</Flash>}
      {sp.saved && <Flash tone="ok">Contact saved.</Flash>}
      {sp.err && ERRORS[sp.err] && <Flash tone="err">{ERRORS[sp.err]}</Flash>}

      <div className="grid lg:grid-cols-[1fr_340px] gap-8">
        <section>
          <h2 className="font-semibold mb-2">Send an email</h2>

          {sequence.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {sequence.map((t) => (
                <Link
                  key={t.id}
                  href={`?t=${t.id}`}
                  className={`text-xs rounded-full px-3 py-1.5 border ${
                    t.id === template?.id ? "bg-stone-900 !text-white border-stone-900" : "border-stone-300 hover:bg-stone-100"
                  }`}
                >
                  {sentAt.has(t.id) ? "✓ " : t.id === nextUp?.id ? "→ " : ""}
                  {t.name.replace(/^[^·]+· /, "")}
                </Link>
              ))}
            </div>
          )}

          <form className="flex gap-2 mb-4">
            <select name="t" defaultValue={template?.id ?? ""} className={`${input} flex-1`}>
              <option value="">{sequence.length ? "…or pick any template" : "Pick a template"}</option>
              {others.concat(sequence).map((t) => (
                <option key={t.id} value={t.id}>{sentAt.has(t.id) ? "✓ " : ""}{t.name}</option>
              ))}
            </select>
            <button className={buttonGhost}>Load</button>
          </form>

          {!template && sequence.length > 0 && !nextUp && (
            <p className="text-sm text-stone-500">Every email in segment {segment}’s sequence has been sent. Pick any template above.</p>
          )}

          {template && draft && (
            <form action={sendEmail} className="space-y-3 border border-stone-200 rounded p-4">
              <input type="hidden" name="contactId" value={contact.id} />
              <input type="hidden" name="templateId" value={template.id} />
              <div className="text-sm text-stone-600">
                <div><span className="text-stone-400 w-14 inline-block">From</span>{outreachFrom()}</div>
                <div><span className="text-stone-400 w-14 inline-block">To</span>{draft.to}</div>
              </div>
              <label className="block text-xs text-stone-500">
                Subject
                <input name="subject" defaultValue={draft.subject} className={`${input} mt-1 text-base`} />
              </label>
              <label className="block text-xs text-stone-500">
                Preview text (shown after the subject in the inbox)
                <input name="preview" defaultValue={draft.preview} className={`${input} mt-1`} />
              </label>
              <label className="block text-xs text-stone-500">
                Body — edit freely for this one send; the template itself doesn’t change
                <textarea
                  name="body"
                  defaultValue={draft.body}
                  rows={20}
                  className={`${input} mt-1 font-mono text-[13px] leading-relaxed`}
                />
              </label>

              {draft.missing.length > 0 && (
                <p className="text-sm text-red-700">
                  No value for {draft.missing.map((m) => `@${m}`).join(", ")}. Add it under Contact details →
                </p>
              )}
              {alreadySent && (
                <label className="flex items-center gap-2 text-sm text-amber-800">
                  <input type="checkbox" required />
                  This email already went to this contact on {fmtDate(alreadySent)}. Send it again anyway.
                </label>
              )}

              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  name="mode"
                  value="send"
                  disabled={draft.missing.length > 0 || contact.unsubscribed}
                  className={`${button} disabled:opacity-40`}
                >
                  Send to {draft.to}
                </button>
                <button name="mode" value="test" formNoValidate className={buttonGhost}>
                  Send test to me
                </button>
              </div>

              <details className="pt-2">
                <summary className="text-xs text-stone-500 cursor-pointer">How it will look (template as loaded, before edits)</summary>
                <iframe
                  srcDoc={toHtml(draft.body, draft.preview)}
                  sandbox=""
                  title="Email preview"
                  className="w-full h-[500px] mt-2 border border-stone-200 rounded bg-white"
                />
              </details>
            </form>
          )}

          <h2 className="font-semibold mt-8 mb-2">History</h2>
          {sends.length === 0 && <p className="text-sm text-stone-500">Nothing sent to this contact yet.</p>}
          <ul className="space-y-2">
            {sends.map((s) => (
              <li key={s.id} className="text-sm border-b border-stone-100 pb-2">
                <details>
                  <summary className="cursor-pointer">
                    <span className={s.status === "failed" ? "text-red-700" : ""}>
                      {s.status === "failed" ? "✗ " : "✓ "}{s.subject}
                    </span>
                    <span className="text-xs text-stone-500 ml-2">{fmtDate(s.sent_at)}</span>
                  </summary>
                  {s.error && <p className="text-xs text-red-700 mt-1">{s.error}</p>}
                  <pre className="whitespace-pre-wrap text-xs text-stone-600 bg-stone-50 p-3 mt-2 rounded">{s.body}</pre>
                </details>
              </li>
            ))}
          </ul>
        </section>

        <aside>
          <h2 className="font-semibold mb-2">Contact details</h2>
          <form action={saveContact} className="space-y-2">
            <input type="hidden" name="id" value={contact.id} />
            <label className="block text-xs text-stone-500">
              email
              <input name="email" defaultValue={contact.email} className={input} />
            </label>
            {keys.map((k) => (
              <label key={k} className="block text-xs text-stone-500">
                @{k}
                <input name={`field:${k}`} defaultValue={contact.fields[k] ?? ""} className={input} />
              </label>
            ))}
            <div className="flex gap-2 pt-1">
              <input name="newKey" placeholder="new column" className={input} />
              <input name="newValue" placeholder="value" className={input} />
            </div>
            <label className="block text-xs text-stone-500">
              Notes (private)
              <textarea name="notes" defaultValue={contact.notes ?? ""} rows={3} className={input} />
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="unsubscribed" defaultChecked={contact.unsubscribed} />
              Unsubscribed (blocks sending)
            </label>
            <button className={button}>Save contact</button>
          </form>

          <details className="mt-6">
            <summary className="text-xs text-stone-400 cursor-pointer">Delete contact</summary>
            <form action={removeContact} className="mt-2">
              <input type="hidden" name="id" value={contact.id} />
              <p className="text-xs text-stone-500 mb-2">Removes the contact and its send history. Marking unsubscribed is usually better.</p>
              <button className="text-sm text-red-700 border border-red-300 rounded px-3 py-1.5">Delete permanently</button>
            </form>
          </details>
        </aside>
      </div>
    </>
  );
}
