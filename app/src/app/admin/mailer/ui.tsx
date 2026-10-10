import Link from "next/link";
import { signOutAction } from "./actions";

export function MailerNav({ active }: { active: "contacts" | "add" | "templates" | "import" }) {
  const tab = (key: typeof active, href: string, label: string) => (
    <Link
      href={href}
      className={
        key === active
          ? "px-3 py-1.5 rounded bg-stone-900 !text-white"
          : "px-3 py-1.5 rounded hover:bg-stone-100"
      }
    >
      {label}
    </Link>
  );
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <div className="flex items-center gap-2 text-sm">
        <span className="font-semibold text-lg mr-3">Mailer</span>
        {tab("contacts", "/admin/mailer", "Contacts")}
        {tab("add", "/admin/mailer/add", "+ Add contact")}
        {tab("templates", "/admin/mailer/templates", "Templates")}
        {tab("import", "/admin/mailer/import", "Import CSV")}
      </div>
      <form action={signOutAction}>
        <button className="text-sm text-stone-500 hover:underline">Sign out</button>
      </form>
    </div>
  );
}

export function Flash({ tone, children }: { tone: "ok" | "err"; children: React.ReactNode }) {
  return (
    <div
      className={`mb-4 rounded px-4 py-2 text-sm ${
        tone === "ok" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
      }`}
    >
      {children}
    </div>
  );
}

export const fmtDate = (d: Date | null) =>
  d
    ? new Date(d).toLocaleString("en-US", {
        month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit",
        timeZone: "America/New_York",
      })
    : "";

export const input = "w-full border border-stone-300 rounded px-2 py-1.5 text-sm";
export const button = "bg-stone-900 !text-white rounded px-4 py-2 text-sm hover:bg-stone-700";
export const buttonGhost = "border border-stone-300 rounded px-4 py-2 text-sm hover:bg-stone-100";
