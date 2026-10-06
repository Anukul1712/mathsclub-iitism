import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { createRecord, databaseConfigured, deleteRecord, listContactItems, listFaqs, updateRecord } from "@/lib/content-store";
import type { ContactItemRecord, FaqRecord } from "@/lib/content-types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [items, faqs] = await Promise.all([listContactItems(), listFaqs()]);
    return NextResponse.json({ items, faqs, configured: databaseConfigured });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Could not load contact information" }, { status: 500 }); }
}

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Please sign in as an administrator." }, { status: 401 });
  if (!databaseConfigured) return NextResponse.json({ error: "Connect the database before adding content. See SETUP.md." }, { status: 503 });
  const { entity, ...body } = await request.json();
  try {
    if (entity === "item" && body.label?.trim() && body.value?.trim()) return NextResponse.json({ item: await createRecord<ContactItemRecord>("contact_items", body) }, { status: 201 });
    if (entity === "faq" && body.question?.trim() && body.answer?.trim()) return NextResponse.json({ item: await createRecord<FaqRecord>("faqs", body) }, { status: 201 });
    return NextResponse.json({ error: "Complete every required field." }, { status: 400 });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Could not add contact content" }, { status: 500 }); }
}

export async function PATCH(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Please sign in as an administrator." }, { status: 401 });
  const { id, entity, ...body } = await request.json();
  if (!id) return NextResponse.json({ error: "Missing content id." }, { status: 400 });
  try {
    if (entity === "item" && body.label?.trim() && body.value?.trim()) return NextResponse.json({ item: await updateRecord<ContactItemRecord>("contact_items", id, body) });
    if (entity === "faq" && body.question?.trim() && body.answer?.trim()) return NextResponse.json({ item: await updateRecord<FaqRecord>("faqs", id, body) });
    return NextResponse.json({ error: "Complete every required field." }, { status: 400 });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Could not update contact content" }, { status: 500 }); }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Please sign in as an administrator." }, { status: 401 });
  const params = new URL(request.url).searchParams;
  const id = params.get("id"); const entity = params.get("entity");
  if (!id || !["item", "faq"].includes(entity || "")) return NextResponse.json({ error: "Missing content id or type." }, { status: 400 });
  try { await deleteRecord(entity === "item" ? "contact_items" : "faqs", id); return NextResponse.json({ ok: true }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Could not delete contact content" }, { status: 500 }); }
}
