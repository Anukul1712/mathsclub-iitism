import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { databaseConfigured } from "@/lib/content-store";

export async function GET() {
  return NextResponse.json({ authenticated: await isAdmin(), configured: databaseConfigured });
}
