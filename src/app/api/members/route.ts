import { NextRequest, NextResponse } from "next/server";
import { createRecord, databaseConfigured, deleteRecord, listMembers, updateRecord } from "@/lib/content-store";
import type { MemberRecord } from "@/lib/content-types";
import { isAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json({ items: await listMembers(), configured: databaseConfigured });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not load members" }, { status: 500 });
  }
}

function validMember(value: Partial<MemberRecord>) {
  return Boolean(value.name?.trim() && value.role?.trim() && ["faculty", "core", "member"].includes(value.group_type || "") && value.details?.trim());
}

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Please sign in as an administrator." }, { status: 401 });
  if (!databaseConfigured) return NextResponse.json({ error: "Connect the database before adding content. See SETUP.md." }, { status: 503 });
  const body = await request.json();
  if (!validMember(body)) return NextResponse.json({ error: "Complete every required field." }, { status: 400 });
  try {
    return NextResponse.json({ item: await createRecord<MemberRecord>("members", body) }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not add member" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Please sign in as an administrator." }, { status: 401 });
  const { id, ...body } = await request.json();
  if (!id || !validMember(body)) return NextResponse.json({ error: "Complete every required field." }, { status: 400 });
  try {
    return NextResponse.json({ item: await updateRecord<MemberRecord>("members", id, body) });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not update member" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Please sign in as an administrator." }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing member id." }, { status: 400 });
  try {
    await deleteRecord("members", id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not delete member" }, { status: 500 });
  }
}
