import { SEED_CONTACT_ITEMS, SEED_EVENTS, SEED_FAQS, SEED_MEMBERS, SEED_QOTD, SEED_RESOURCES } from "@/data/seed";
import type { ContactItemRecord, EventRecord, FaqRecord, MemberRecord, QotdRecord, ResourceRecord } from "@/lib/content-types";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const databaseConfigured = Boolean(url && key);

async function supabase<T>(path: string, init?: RequestInit): Promise<T> {
  if (!url || !key) throw new Error("Database is not configured");
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
  if (!response.ok) throw new Error((await response.text()) || "Database request failed");
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export async function listEvents(): Promise<EventRecord[]> {
  if (!databaseConfigured) return SEED_EVENTS;
  return supabase<EventRecord[]>("events?select=*&order=starts_at.asc");
}

export async function listMembers(): Promise<MemberRecord[]> {
  if (!databaseConfigured) return SEED_MEMBERS;
  return supabase<MemberRecord[]>("members?select=*&order=group_type.asc,sort_order.asc,name.asc");
}

export async function listResources(): Promise<ResourceRecord[]> {
  if (!databaseConfigured) return SEED_RESOURCES;
  return supabase<ResourceRecord[]>("resources?select=*&order=kind.asc,sort_order.asc,title.asc");
}

export async function listContactItems(): Promise<ContactItemRecord[]> {
  if (!databaseConfigured) return SEED_CONTACT_ITEMS;
  return supabase<ContactItemRecord[]>("contact_items?select=*&order=sort_order.asc,label.asc");
}

export async function listFaqs(): Promise<FaqRecord[]> {
  if (!databaseConfigured) return SEED_FAQS;
  return supabase<FaqRecord[]>("faqs?select=*&order=sort_order.asc,question.asc");
}

export async function listQotd(): Promise<QotdRecord[]> {
  if (!databaseConfigured) return SEED_QOTD;
  return supabase<QotdRecord[]>("qotd?select=*&order=display_date.desc");
}

export type ContentTable = "events" | "members" | "resources" | "contact_items" | "faqs" | "qotd";

export async function createRecord<T>(table: ContentTable, value: Omit<T, "id">): Promise<T> {
  const rows = await supabase<T[]>(table, { method: "POST", body: JSON.stringify(value), headers: { Prefer: "return=representation" } });
  return rows[0];
}

export async function updateRecord<T>(table: ContentTable, id: string, value: Partial<T>): Promise<T> {
  const rows = await supabase<T[]>(`${table}?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(value), headers: { Prefer: "return=representation" } });
  return rows[0];
}

export async function deleteRecord(table: ContentTable, id: string): Promise<void> {
  await supabase(`${table}?id=eq.${encodeURIComponent(id)}`, { method: "DELETE", headers: { Prefer: "return=minimal" } });
}
