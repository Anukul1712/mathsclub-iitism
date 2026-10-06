import { NextRequest, NextResponse } from "next/server";
import { createRecord, databaseConfigured, deleteRecord, listEvents, updateRecord } from "@/lib/content-store";
import type { EventRecord } from "@/lib/content-types";
import { isAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json({ items: await listEvents(), configured: databaseConfigured });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not load events" }, { status: 500 });
  }
}

function validEvent(value: Partial<EventRecord>) {
  return Boolean(value.title?.trim() && value.description?.trim() && value.category?.trim() && value.venue?.trim() && value.starts_at && value.ends_at && new Date(value.ends_at).getTime() >= new Date(value.starts_at).getTime());
}

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Please sign in as an administrator." }, { status: 401 });
  if (!databaseConfigured) return NextResponse.json({ error: "Connect the database before adding content. See SETUP.md." }, { status: 503 });
  const body = await request.json();
  if (!validEvent(body)) return NextResponse.json({ error: "Complete every required field and check the dates." }, { status: 400 });
  try {
    const item = await createRecord<EventRecord>("events", body);
    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not add event" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Please sign in as an administrator." }, { status: 401 });
  const { id, ...body } = await request.json();
  if (!id || !validEvent(body)) return NextResponse.json({ error: "Complete every required field and check the dates." }, { status: 400 });
  try {
    return NextResponse.json({ item: await updateRecord<EventRecord>("events", id, body) });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not update event" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Please sign in as an administrator." }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing event id." }, { status: 400 });
  try {
    await deleteRecord("events", id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not delete event" }, { status: 500 });
  }
}
