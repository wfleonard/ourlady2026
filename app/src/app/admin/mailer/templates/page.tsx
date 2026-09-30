import Link from "next/link";
import { requireAdmin } from "@/lib/adminAuth";
import { fieldsUsed } from "@/lib/emailFormat";
import { listTemplates } from "@/lib/outreach";
import { MailerNav, button } from "../ui";

export default async function TemplatesPage() {
  await requireAdmin();
  const templates = await listTemplates(true);
  const segments = [...new Set(templates.map((t) => t.segment))];

  return (
    <>
      <MailerNav active="templates" />
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-stone-500">
          A contact whose <code>@segment</code> matches a template’s segment gets that sequence suggested in order.
        </p>
        <Link href="/admin/mailer/templates/new" className={button}>New template</Link>
      </div>
      {segments.map((seg) => (
        <section key={seg} className="mb-6">
          <h2 className="font-semibold mb-2">{seg ? `Segment ${seg}` : "No segment"}</h2>
          <ul className="border border-stone-200 rounded divide-y divide-stone-100">
            {templates.filter((t) => t.segment === seg).map((t) => (
              <li key={t.id} className="px-3 py-2 text-sm">
                <Link href={`/admin/mailer/templates/${t.id}`} className="font-medium hover:underline">
                  {t.position}. {t.name.replace(/^[^·]+· /, "")}
                </Link>
                {!t.active && <span className="ml-2 text-xs text-stone-400">(hidden)</span>}
                <span className="block text-xs text-stone-500">{t.subject}</span>
                <span className="block text-xs text-stone-400">
                  {fieldsUsed(`${t.subject} ${t.preview} ${t.body}`).map((f) => `@${f}`).join(" ")}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
