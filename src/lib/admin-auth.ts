import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "mathclub_admin";
const maxAge = 60 * 60 * 24 * 7;

function secret() {
  return process.env.ADMIN_PASSWORD || "";
}

function signature(expires: string) {
  return createHmac("sha256", secret()).update(expires).digest("hex");
}

export function makeAdminToken() {
  const expires = String(Math.floor(Date.now() / 1000) + maxAge);
  return `${expires}.${signature(expires)}`;
}

export async function isAdmin() {
  const password = secret();
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!password || !token) return false;
  const [expires, supplied] = token.split(".");
  if (!expires || !supplied || Number(expires) < Date.now() / 1000) return false;
  const expected = signature(expires);
  if (supplied.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(supplied), Buffer.from(expected));
}

export function passwordMatches(supplied: string) {
  const expected = secret();
  if (!expected || supplied.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(supplied), Buffer.from(expected));
}

export const adminCookieOptions = { httpOnly: true, sameSite: "lax" as const, secure: process.env.NODE_ENV === "production", path: "/", maxAge };
