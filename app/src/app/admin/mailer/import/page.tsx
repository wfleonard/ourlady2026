import { requireAdmin } from "@/lib/adminAuth";
import { addContact, importCsv } from "../actions";
import { Flash, MailerNav, button, input } from "../ui";

const ERRORS: Record<string, string> = {
  nofile: "Choose a CSV file first.",
  noemail: "The CSV needs a column headed “email”.",
  bademail: "That isn’t a valid email address.",
};

export default async function ImportPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  await requireAdmin();
  const sp = await searchParams;

  return (
    <>
      <MailerNav active="import" />
      {sp.inserted !== undefined && (
        <Flash tone="ok">
          Imported: {sp.inserted} new, {sp.updated} updated
          {Number(sp.skipped) > 0 && `, ${sp.skipped} skipped (no valid email)`}.
        </Flash>
      )}
      {sp.added && <Flash tone="ok">Contact saved.</Flash>}
      {sp.err && ERRORS[sp.err] && <Flash tone="err">{ERRORS[sp.err]}</Flash>}

      <div className="grid md:grid-cols-2 gap-10">
        <section>
          <h2 className="font-semibold mb-2">Import a spreadsheet</h2>
          <ol className="text-sm text-stone-600 list-decimal pl-5 space-y-1 mb-4">
            <li>Export the sheet as CSV (Google Sheets: File → Download → CSV; Excel: Save As → CSV UTF-8).</li>
            <li>It needs an <code>email</code> column. Every other column header becomes a merge field: “First Name” → <code>@firstname</code>.</li>
            <li>Include a <code>segment</code> column (A, B, C, D, Retail…) to get each contact’s sequence suggested.</li>
            <li>Re-importing is safe: rows match on email, filled cells update, blank cells leave existing values alone.</li>
          </ol>
          <form action={importCsv} className="space-y-3">
            <input type="file" name="file" accept=".csv,text/csv" className="text-sm" />
            <button className={button}>Import</button>
          </form>
        </section>

        <section>
          <h2 className="font-semibold mb-2">Add one contact</h2>
          <form action={addContact} className="grid grid-cols-2 gap-2">
            <input name="email" placeholder="email *" className={`${input} col-span-2`} required />
            <input name="firstname" placeholder="first name" className={input} />
            <input name="lastname" placeholder="last name" className={input} />
            <input name="business" placeholder="business" className={`${input} col-span-2`} />
            <input name="city" placeholder="town" className={input} />
            <input name="state" placeholder="state" className={input} />
            <input name="segment" placeholder="segment" className={input} />
            <div className="col-span-2">
              <button className={button}>Add contact</button>
            </div>
          </form>
          <p className="text-xs text-stone-500 mt-2">Add any other columns from the contact’s page after saving.</p>
        </section>
      </div>
    </>
  );
}
