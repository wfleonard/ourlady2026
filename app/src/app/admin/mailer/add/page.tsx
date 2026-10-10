import { requireAdmin } from "@/lib/adminAuth";
import { listSegments } from "@/lib/outreach";
import { addContact } from "../actions";
import { Flash, MailerNav, button, input } from "../ui";

/** Buyers are added by hand after an order, so Buyer is always offered even before any contact carries it. */
const BUYER = "Buyer";

const ERRORS: Record<string, string> = {
  bademail: "That isn’t a valid email address.",
};

export default async function AddContactPage({
  searchParams,
}: {
  searchParams: Promise<{ err?: string; segment?: string }>;
}) {
  await requireAdmin();
  const { err, segment = BUYER } = await searchParams;
  const segments = [...new Set([BUYER, ...(await listSegments())])].sort();

  return (
    <>
      <MailerNav active="add" />
      {err && ERRORS[err] && <Flash tone="err">{ERRORS[err]}</Flash>}

      <section className="max-w-xl">
        <h2 className="font-semibold mb-1">Add a contact</h2>
        <p className="text-sm text-stone-600 mb-4">
          If the email is already on the list, the filled-in fields update that contact. You go
          straight to the contact’s page to send.
        </p>
        <form action={addContact} className="grid grid-cols-2 gap-3">
          <label className="col-span-2 text-sm">
            Email *
            <input name="email" type="email" className={input} required />
          </label>
          <label className="text-sm">
            First name
            <input name="firstname" className={input} />
          </label>
          <label className="text-sm">
            Last name
            <input name="lastname" className={input} />
          </label>
          <label className="col-span-2 text-sm">
            Business / parish
            <input name="business" className={input} />
          </label>
          <label className="text-sm">
            Town
            <input name="city" className={input} />
          </label>
          <label className="text-sm">
            State
            <input name="state" className={input} />
          </label>
          <label className="text-sm">
            Segment
            <select name="segment" defaultValue={segment} className={input}>
              {segments.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label className="text-sm">
            …or a new segment
            <input name="newSegment" placeholder="overrides the list" className={input} />
          </label>
          <label className="col-span-2 text-sm">
            Notes
            <textarea name="notes" rows={3} placeholder="e.g. order date, product, how they found us" className={input} />
          </label>
          <div className="col-span-2">
            <button className={button}>Add contact</button>
          </div>
        </form>
        <p className="text-xs text-stone-500 mt-3">Add any other columns from the contact’s page after saving.</p>
      </section>
    </>
  );
}
