import { requireAdmin } from "@/lib/adminAuth";
import { BUYER_SEGMENT as BUYER, countMissingBuyers, listSegments } from "@/lib/outreach";
import { addContact, addPastBuyersAction } from "../actions";
import { Flash, MailerNav, button, buttonGhost, input } from "../ui";

const ERRORS: Record<string, string> = {
  bademail: "That isn’t a valid email address.",
};

export default async function AddContactPage({
  searchParams,
}: {
  searchParams: Promise<{ err?: string; segment?: string; buyers?: string }>;
}) {
  await requireAdmin();
  const { err, segment = BUYER, buyers } = await searchParams;
  const [existing, missingBuyers] = await Promise.all([listSegments(), countMissingBuyers()]);
  // Buyer is always offered, even before any contact carries it.
  const segments = [...new Set([BUYER, ...existing])].sort();

  return (
    <>
      <MailerNav active="add" />
      {err && ERRORS[err] && <Flash tone="err">{ERRORS[err]}</Flash>}
      {buyers !== undefined && (
        <Flash tone="ok">
          {buyers === "0" ? "No new buyers to add." : `Added ${buyers} buyer${buyers === "1" ? "" : "s"} from past orders.`}
        </Flash>
      )}

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

      <section className="max-w-xl mt-10 pt-6 border-t border-stone-200">
        <h2 className="font-semibold mb-1">Buyers from Stripe</h2>
        <p className="text-sm text-stone-600 mb-3">
          Every new live order adds its buyer here automatically, in the Buyer segment, with the
          order in their notes. A buyer already on the list keeps their own segment.
        </p>
        {missingBuyers > 0 ? (
          <form action={addPastBuyersAction}>
            <button className={buttonGhost}>
              Add {missingBuyers} past buyer{missingBuyers === 1 ? "" : "s"} from earlier orders
            </button>
          </form>
        ) : (
          <p className="text-sm text-stone-500">Every past buyer is already on the list.</p>
        )}
      </section>
    </>
  );
}
