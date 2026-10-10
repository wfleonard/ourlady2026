import Link from "next/link";
import { requireAdmin } from "@/lib/adminAuth";
import { listContacts, listRecentSends, listSegments, orgName, personName } from "@/lib/outreach";
import { Flash, MailerNav, fmtDate, input } from "./ui";

export default async function MailerHome({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; segment?: string; deleted?: string }>;
}) {
  await requireAdmin();
  const { q = "", segment = "", deleted } = await searchParams;
  const [contacts, segments, recent] = await Promise.all([
    listContacts(q.trim(), segment),
    listSegments(),
    listRecentSends(),
  ]);

  return (
    <>
      <MailerNav active="contacts" />
      {deleted && <Flash tone="ok">Contact deleted.</Flash>}

      <div className="grid lg:grid-cols-[1fr_300px] gap-8">
        <section>
          <form className="flex flex-wrap gap-2 mb-4">
            <input name="q" defaultValue={q} placeholder="Search name, business, town, email…" className={`${input} flex-1 min-w-48`} />
            <select name="segment" defaultValue={segment} className="border border-stone-300 rounded px-2 text-sm">
              <option value="">All segments</option>
              {segments.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <button className="border border-stone-300 rounded px-3 text-sm hover:bg-stone-100">Filter</button>
          </form>

          <p className="text-xs text-stone-500 mb-2">
            {contacts.length} contact{contacts.length === 1 ? "" : "s"}
            {contacts.length === 500 && " (first 500 — narrow the search)"}. Click one to send.
          </p>

          {contacts.length === 0 ? (
            <p className="text-sm text-stone-500 py-8">
              No contacts yet. <Link href="/admin/mailer/add" className="underline">Add one</Link> or <Link href="/admin/mailer/import" className="underline">import your spreadsheet</Link>.
            </p>
          ) : (
            <div className="overflow-x-auto border border-stone-200 rounded">
              <table className="w-full text-sm">
                <thead className="bg-stone-50 text-left text-xs uppercase text-stone-500">
                  <tr>
                    <th className="px-3 py-2">Business / contact</th>
                    <th className="px-3 py-2">Town</th>
                    <th className="px-3 py-2">Seg</th>
                    <th className="px-3 py-2">Last sent</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c) => (
                    <tr key={c.id} className="border-t border-stone-100 hover:bg-amber-50/50">
                      <td className="px-3 py-2">
                        <Link href={`/admin/mailer/contacts/${c.id}`} className="block">
                          <span className="font-medium">{orgName(c.fields) || c.email}</span>
                          {c.unsubscribed && <span className="ml-2 text-xs text-red-700">unsubscribed</span>}
                          <span className="block text-xs text-stone-500">
                            {personName(c.fields)}{personName(c.fields) && " · "}{c.email}
                          </span>
                        </Link>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        {[c.fields.city, c.fields.state].filter(Boolean).join(", ")}
                      </td>
                      <td className="px-3 py-2">{c.fields.segment}</td>
                      <td className="px-3 py-2 text-xs">
                        {c.last_sent_at ? (
                          <>
                            <span className="block">{c.last_template ?? "Custom"}</span>
                            <span className="text-stone-500">{fmtDate(c.last_sent_at)} · {c.sent_count} total</span>
                          </>
                        ) : (
                          <span className="text-stone-400">never</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <aside>
          <h2 className="font-semibold mb-2">Recent sends</h2>
          {recent.length === 0 && <p className="text-sm text-stone-500">Nothing sent yet.</p>}
          <ul className="space-y-2 text-sm">
            {recent.map((s) => (
              <li key={s.id} className="border-b border-stone-100 pb-2">
                <Link href={`/admin/mailer/contacts/${s.contact_id}`} className="hover:underline">
                  {s.to_email}
                </Link>
                {s.status === "failed" && <span className="ml-1 text-xs text-red-700">failed</span>}
                <span className="block text-xs text-stone-500">{s.template_name ?? s.subject}</span>
                <span className="block text-xs text-stone-400">{fmtDate(s.sent_at)}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
