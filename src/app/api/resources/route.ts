import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { createRecord, databaseConfigured, deleteRecord, listResources, updateRecord } from "@/lib/content-store";
import type { ResourceRecord } from "@/lib/content-types";

export const dynamic = "force-dynamic";

export async function GET() {
  try { return NextResponse.json({ items: await listResources(), configured: databaseConfigured }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Could not load resources" }, { status: 500 }); }
}

function valid(value: Partial<ResourceRecord>) {
  return Boolean(value.title?.trim() && ["book", "link", "archive"].includes(value.kind || "") && (value.kind === "book" || value.url?.trim()));
}

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Please sign in as an administrator." }, { status: 401 });
  if (!databaseConfigured) return NextResponse.json({ error: "Connect the database before adding content. See SETUP.md." }, { status: 503 });
  const body = await request.json();
  if (!valid(body)) return NextResponse.json({ error: "Add a title, type, and a link for online resources or archives." }, { status: 400 });
  try { return NextResponse.json({ item: await createRecord<ResourceRecord>("resources", body) }, { status: 201 }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Could not add resource" }, { status: 500 }); }
}

export async function PATCH(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Please sign in as an administrator." }, { status: 401 });
  const { id, ...body } = await request.json();
  if (!id || !valid(body)) return NextResponse.json({ error: "Complete the required fields." }, { status: 400 });
  try { return NextResponse.json({ item: await updateRecord<ResourceRecord>("resources", id, body) }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Could not update resource" }, { status: 500 }); }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Please sign in as an administrator." }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing resource id." }, { status: 400 });
  try { await deleteRecord("resources", id); return NextResponse.json({ ok: true }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Could not delete resource" }, { status: 500 }); }
}
