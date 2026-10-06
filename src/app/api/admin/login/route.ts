import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, adminCookieOptions, makeAdminToken, passwordMatches } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  const { password = "" } = await request.json();
  if (!process.env.ADMIN_PASSWORD) return NextResponse.json({ error: "ADMIN_PASSWORD has not been configured." }, { status: 503 });
  if (!passwordMatches(password)) return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, makeAdminToken(), adminCookieOptions);
  return response;
}
