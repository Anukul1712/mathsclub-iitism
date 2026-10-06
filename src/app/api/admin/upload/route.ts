import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { isAdmin } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Please sign in as an administrator." }, { status: 401 });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ error: "Connect the database before uploading images." }, { status: 503 });
  const data = await request.formData();
  const file = data.get("file");
  if (!(file instanceof File) || !file.type.startsWith("image/")) return NextResponse.json({ error: "Choose an image file." }, { status: 400 });
  if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: "Images must be smaller than 5 MB." }, { status: 400 });
  const extension = file.name.split(".").pop()?.replace(/[^a-z0-9]/gi, "").toLowerCase() || "jpg";
  const path = `${randomUUID()}.${extension}`;
  const upload = await fetch(`${url}/storage/v1/object/team-photos/${path}`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": file.type, "x-upsert": "false" },
    body: await file.arrayBuffer(),
  });
  if (!upload.ok) return NextResponse.json({ error: (await upload.text()) || "Upload failed" }, { status: 500 });
  return NextResponse.json({ url: `${url}/storage/v1/object/public/team-photos/${path}` });
}
