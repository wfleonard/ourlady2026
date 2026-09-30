import { redirect } from "next/navigation";
import { isAdmin, signIn } from "@/lib/adminAuth";

async function login(fd: FormData) {
  "use server";
  if (await signIn(String(fd.get("password") ?? ""))) redirect("/admin/mailer");
  await new Promise((r) => setTimeout(r, 1500)); // slow down guessing
  redirect("/admin/login?err=1");
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ err?: string }>;
}) {
  if (await isAdmin()) redirect("/admin/mailer");
  const { err } = await searchParams;
  const configured = (process.env.ADMIN_PASSWORD ?? "").length >= 12;

  return (
    <form action={login} className="max-w-sm mx-auto mt-12 space-y-4">
      <h1 className="text-2xl font-semibold">Admin sign-in</h1>
      {!configured && (
        <p className="text-sm text-red-700">
          ADMIN_PASSWORD is not set (or is under 12 characters) in .env, so sign-in is disabled.
        </p>
      )}
      {err && <p className="text-sm text-red-700">Wrong password.</p>}
      <input
        type="password"
        name="password"
        autoFocus
        autoComplete="current-password"
        placeholder="Password"
        className="w-full border border-stone-300 rounded px-3 py-2"
      />
      <button className="w-full bg-stone-900 text-white rounded px-3 py-2">Sign in</button>
    </form>
  );
}
