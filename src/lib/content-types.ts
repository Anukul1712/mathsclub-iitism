export type EventRecord = {
  id: string;
  title: string;
  description: string;
  category: string;
  venue: string;
  starts_at: string;
  ends_at: string;
  registration_url?: string | null;
};

export type EventStatus = "upcoming" | "active" | "done";

export type MemberGroup = "faculty" | "core" | "member";

export type MemberRecord = {
  id: string;
  name: string;
  role: string;
  group_type: MemberGroup;
  details: string;
  bio: string;
  image_url?: string | null;
  sort_order: number;
};

export type ResourceKind = "book" | "link" | "archive";

export type ResourceRecord = {
  id: string;
  kind: ResourceKind;
  title: string;
  subtitle: string;
  description: string;
  url?: string | null;
  topic: string;
  level: string;
  sort_order: number;
};

export type ContactItemRecord = {
  id: string;
  icon: string;
  label: string;
  value: string;
  url?: string | null;
  sort_order: number;
};

export type FaqRecord = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
};

export type QotdRecord = {
  id: string;
  question: string;
  display_date: string;
  topic: string;
  difficulty: string;
  note: string;
};

export function getEventStatus(event: Pick<EventRecord, "starts_at" | "ends_at">, now = new Date()): EventStatus {
  const time = now.getTime();
  if (time < new Date(event.starts_at).getTime()) return "upcoming";
  if (time <= new Date(event.ends_at).getTime()) return "active";
  return "done";
}

export function formatEventDate(event: Pick<EventRecord, "starts_at" | "ends_at">) {
  const start = new Date(event.starts_at);
  const end = new Date(event.ends_at);
  const date = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(start);
  const timeFormat = new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
  return { date, time: `${timeFormat.format(start)} – ${timeFormat.format(end)}` };
}
