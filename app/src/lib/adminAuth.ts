import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Single-user sign-in for /admin. The password is ADMIN_PASSWORD in .env; the
// session is a signed expiry timestamp in an httpOnly cookie. The signing key
// is derived from the password, so changing the password signs everyone out.
// With ADMIN_PASSWORD unset (or under 12 characters) /admin stays locked.

const COOKIE = "pm_admin";
const MAX_AGE = 60 * 60 * 24 * 14; // 14 days

function signingKey(): Buffer | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password || password.length < 12) return null;
  return createHash("sha256").update(`primos-admin:${password}`).digest();
}

function sign(value: string, key: Buffer): string {
  return createHmac("sha256", key).update(value).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export async function isAdmin(): Promise<boolean> {
  const key = signingKey();
  const value = (await cookies()).get(COOKIE)?.value;
  if (!key || !value) return false;
  const [exp, sig] = value.split(".");
  if (!exp || !sig || Number(exp) < Date.now() / 1000) return false;
  return safeEqual(sig, sign(exp, key));
}

/** Call at the top of every admin page and server action. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");
}

export async function signIn(password: string): Promise<boolean> {
  const key = signingKey();
  if (!key || !safeEqual(password, process.env.ADMIN_PASSWORD!)) return false;
  const exp = String(Math.floor(Date.now() / 1000) + MAX_AGE);
  (await cookies()).set(COOKIE, `${exp}.${sign(exp, key)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: MAX_AGE,
  });
  return true;
}

export async function signOut(): Promise<void> {
  (await cookies()).delete({ name: COOKIE, path: "/admin" });
}
