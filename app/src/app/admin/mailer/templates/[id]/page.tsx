import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/adminAuth";
import { fieldsUsed } from "@/lib/emailFormat";
import { getTemplate, listFieldKeys } from "@/lib/outreach";
import { saveTemplateAction } from "../../actions";
import { Flash, MailerNav, button, input } from "../../ui";

export default async function TemplateEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; err?: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const { saved, err } = await searchParams;
  const isNew = id === "new";
  const t = isNew ? null : await getTemplate(Number(id));
  if (!isNew && !t) notFound();
  const keys = await listFieldKeys();
  const used = t ? fieldsUsed(`${t.subject} ${t.preview} ${t.body}`) : [];
  const unknown = used.filter((f) => !keys.includes(f) && f !== "email");

  return (
    <>
      <MailerNav active="templates" />
      <Link href="/admin/mailer/templates" className="text-sm text-stone-500 hover:underline">← All templates</Link>
      <h1 className="text-2xl font-semibold mt-2 mb-4">{isNew ? "New template" : t!.name}</h1>
      {saved && <Flash tone="ok">Saved.</Flash>}
      {err && <Flash tone="err">Name, subject, and body are required.</Flash>}

      <div className="grid lg:grid-cols-[1fr_280px] gap-8">
        <form action={saveTemplateAction} className="space-y-3">
          <input type="hidden" name="id" value={t?.id ?? ""} />
          <label className="block text-xs text-stone-500">
            Name
            <input name="name" defaultValue={t?.name} className={input} required />
          </label>
          <div className="flex gap-3">
            <label className="block text-xs text-stone-500 flex-1">
              Segment (matches a contact’s @segment)
              <input name="segment" defaultValue={t?.segment} className={input} />
            </label>
            <label className="block text-xs text-stone-500 w-28">
              Order
              <input name="position" type="number" defaultValue={t?.position ?? 1} className={input} />
            </label>
          </div>
          <label className="block text-xs text-stone-500">
            Subject
            <input name="subject" defaultValue={t?.subject} className={input} required />
          </label>
          <label className="block text-xs text-stone-500">
            Preview text
            <input name="preview" defaultValue={t?.preview} className={input} />
          </label>
          <label className="block text-xs text-stone-500">
            Body
            <textarea name="body" defaultValue={t?.body} rows={26} className={`${input} font-mono text-[13px] leading-relaxed`} required />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="active" defaultChecked={t?.active ?? true} />
            Active (unchecked hides it from the send screen)
          </label>
          <button className={button}>Save template</button>
        </form>

        <aside className="text-sm text-stone-600 space-y-4">
          <div>
            <h2 className="font-semibold text-stone-800 mb-1">Merge fields</h2>
            <p>Type <code>@</code> plus a column name from your spreadsheet, all lowercase:</p>
            <p className="mt-1 text-xs leading-6">{["email", ...keys].map((k) => <code key={k} className="mr-2">@{k}</code>)}</p>
            {unknown.length > 0 && (
              <p className="mt-2 text-amber-800 text-xs">
                Not a column in your list yet: {unknown.map((f) => `@${f}`).join(", ")}. Contacts without it can’t be sent this email.
              </p>
            )}
          </div>
          <div>
            <h2 className="font-semibold text-stone-800 mb-1">Formatting</h2>
            <ul className="text-xs space-y-1">
              <li>Blank line = new paragraph</li>
              <li><code>**bold**</code>, <code>*italic*</code></li>
              <li><code>[link text](https://…)</code></li>
              <li>Lines starting <code>- </code> or <code>1. </code> = list</li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
