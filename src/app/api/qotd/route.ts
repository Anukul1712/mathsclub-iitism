import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { createRecord, databaseConfigured, deleteRecord, listQotd, updateRecord } from "@/lib/content-store";
import type { QotdRecord } from "@/lib/content-types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const items = await listQotd();
    const wantsAll = new URL(request.url).searchParams.get("all") === "1";
    if (wantsAll && await isAdmin()) return NextResponse.json({ items, configured: databaseConfigured });
    const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
    const get = (type: string) => parts.find((part) => part.type === type)?.value;
    const today = `${get("year")}-${get("month")}-${get("day")}`;
    return NextResponse.json({ items: items.filter((item) => item.display_date === today), configured: databaseConfigured });
  }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Could not load questions" }, { status: 500 }); }
}

function valid(value: Partial<QotdRecord>) { return Boolean(value.question?.trim() && /^\d{4}-\d{2}-\d{2}$/.test(value.display_date || "")); }

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Please sign in as an administrator." }, { status: 401 });
  if (!databaseConfigured) return NextResponse.json({ error: "Connect the database before adding content. See SETUP.md." }, { status: 503 });
  const body = await request.json();
  if (!valid(body)) return NextResponse.json({ error: "Add a question and display date." }, { status: 400 });
  try { return NextResponse.json({ item: await createRecord<QotdRecord>("qotd", body) }, { status: 201 }); }
  catch (error) {
    const message = error instanceof Error ? error.message : "Could not add question";
    return NextResponse.json({ error: message.includes("duplicate") ? "A Question of the Day already exists for this date." : message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Please sign in as an administrator." }, { status: 401 });
  const { id, ...body } = await request.json();
  if (!id || !valid(body)) return NextResponse.json({ error: "Add a question and display date." }, { status: 400 });
  try { return NextResponse.json({ item: await updateRecord<QotdRecord>("qotd", id, body) }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Could not update question" }, { status: 500 }); }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Please sign in as an administrator." }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing question id." }, { status: 400 });
  try { await deleteRecord("qotd", id); return NextResponse.json({ ok: true }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Could not delete question" }, { status: 500 }); }
}
