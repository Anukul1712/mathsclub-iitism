"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import type { EventRecord, MemberGroup, MemberRecord } from "@/lib/content-types";
import { formatEventDate, getEventStatus } from "@/lib/content-types";
import { ContactManager, QotdManager, ResourcesManager } from "./DynamicManagers";

type Notice = { kind: "success" | "error"; text: string } | null;
const inputClass = "w-full rounded-sm border border-[#d4a843]/20 bg-[#081526] px-3 py-2.5 text-sm text-[#e8e8e0] outline-none focus:border-[#d4a843]/70";
const labelClass = "block text-[11px] uppercase tracking-widest text-[#e8e8e0]/50 mb-1.5";

const emptyEvent = { title: "", description: "", category: "Workshop", venue: "", starts_at: "", ends_at: "", registration_url: "" };
const emptyMember = { name: "", role: "Member", group_type: "member" as MemberGroup, details: "", bio: "", image_url: "", sort_order: 1 };

function localInput(iso: string) {
  const date = new Date(iso);
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}

async function jsonRequest(url: string, options?: RequestInit) {
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Something went wrong.");
  return data;
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [configured, setConfigured] = useState(false);
  const [password, setPassword] = useState("");
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [members, setMembers] = useState<MemberRecord[]>([]);
  const [eventForm, setEventForm] = useState(emptyEvent);
  const [memberForm, setMemberForm] = useState(emptyMember);
  const [eventId, setEventId] = useState<string | null>(null);
  const [memberId, setMemberId] = useState<string | null>(null);
  const [section, setSection] = useState<"events" | "members" | "resources" | "contact" | "qotd">("events");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);

  const load = useCallback(async () => {
    const [eventData, memberData] = await Promise.all([jsonRequest("/api/events"), jsonRequest("/api/members")]);
    setEvents(eventData.items);
    setMembers(memberData.items);
    setConfigured(eventData.configured && memberData.configured);
  }, []);

  useEffect(() => {
    jsonRequest("/api/admin/session").then(async (session) => {
      setAuthenticated(session.authenticated);
      setConfigured(session.configured);
      if (session.authenticated) await load();
    }).catch((error) => { setAuthenticated(false); setNotice({ kind: "error", text: error.message }); });
  }, [load]);

  async function login(event: FormEvent) {
    event.preventDefault(); setBusy(true); setNotice(null);
    try {
      await jsonRequest("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      setAuthenticated(true); setPassword(""); await load();
    } catch (error) { setNotice({ kind: "error", text: error instanceof Error ? error.message : "Could not sign in." }); }
    finally { setBusy(false); }
  }

  async function saveEvent(event: FormEvent) {
    event.preventDefault(); setBusy(true); setNotice(null);
    try {
      const payload = { ...eventForm, starts_at: new Date(eventForm.starts_at).toISOString(), ends_at: new Date(eventForm.ends_at).toISOString(), registration_url: eventForm.registration_url || null };
      await jsonRequest("/api/events", { method: eventId ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(eventId ? { id: eventId, ...payload } : payload) });
      setEventForm(emptyEvent); setEventId(null); await load(); setNotice({ kind: "success", text: eventId ? "Event updated." : "Event added." });
    } catch (error) { setNotice({ kind: "error", text: error instanceof Error ? error.message : "Could not save event." }); }
    finally { setBusy(false); }
  }

  async function saveMember(event: FormEvent) {
    event.preventDefault(); setBusy(true); setNotice(null);
    try {
      await jsonRequest("/api/members", { method: memberId ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(memberId ? { id: memberId, ...memberForm } : memberForm) });
      setMemberForm(emptyMember); setMemberId(null); await load(); setNotice({ kind: "success", text: memberId ? "Member updated." : "Member added." });
    } catch (error) { setNotice({ kind: "error", text: error instanceof Error ? error.message : "Could not save member." }); }
    finally { setBusy(false); }
  }

  async function remove(type: "events" | "members", id: string, name: string) {
    if (!window.confirm(`Delete ${name}? This cannot be undone.`)) return;
    setBusy(true); setNotice(null);
    try { await jsonRequest(`/api/${type}?id=${encodeURIComponent(id)}`, { method: "DELETE" }); await load(); setNotice({ kind: "success", text: `${type === "events" ? "Event" : "Member"} deleted.` }); }
    catch (error) { setNotice({ kind: "error", text: error instanceof Error ? error.message : "Could not delete item." }); }
    finally { setBusy(false); }
  }

  async function upload(file?: File) {
    if (!file) return;
    setBusy(true); setNotice(null);
    try { const body = new FormData(); body.append("file", file); const data = await jsonRequest("/api/admin/upload", { method: "POST", body }); setMemberForm((current) => ({ ...current, image_url: data.url })); setNotice({ kind: "success", text: "Photo uploaded. Save the member to finish." }); }
    catch (error) { setNotice({ kind: "error", text: error instanceof Error ? error.message : "Could not upload photo." }); }
    finally { setBusy(false); }
  }

  if (authenticated === null) return <main className="min-h-screen pt-36 px-6 text-center text-[#e8e8e0]/50">Loading manager…</main>;
  if (!authenticated) return <main className="min-h-screen pt-36 px-6"><form onSubmit={login} className="max-w-md mx-auto border border-[#d4a843]/20 bg-[#0d1f35]/70 p-8 rounded-sm"><p className="font-mono text-xs tracking-[0.25em] uppercase text-[#d4a843]/60 mb-3">Private area</p><h1 className="font-display text-4xl text-[#e8e8e0] mb-3">Site manager</h1><p className="text-sm text-[#e8e8e0]/50 mb-7">Sign in with the club admin password. No coding knowledge is needed.</p><label className={labelClass}>Admin password</label><input className={inputClass} type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus required />{notice && <p className="mt-4 text-sm text-red-300">{notice.text}</p>}<button disabled={busy} className="mt-6 w-full bg-[#d4a843] text-[#0a1628] py-3 text-sm font-semibold uppercase tracking-widest disabled:opacity-50">{busy ? "Signing in…" : "Sign in"}</button></form></main>;

  return <main className="min-h-screen pt-28 pb-20 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-wrap gap-5 justify-between items-end mb-8"><div><p className="font-mono text-xs tracking-[0.25em] uppercase text-[#d4a843]/60 mb-2">Content dashboard</p><h1 className="font-display text-5xl text-[#e8e8e0]">Site manager</h1></div><button onClick={async () => { await fetch("/api/admin/logout", { method: "POST" }); setAuthenticated(false); }} className="text-xs uppercase tracking-widest text-[#e8e8e0]/50 hover:text-[#d4a843]">Sign out</button></div>
      {!configured && <div className="mb-6 border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-100"><strong>Preview mode:</strong> the forms are ready, but content cannot be saved until Supabase is connected using the short steps in <code>SETUP.md</code>.</div>}
      {notice && <div className={`mb-6 border p-4 text-sm ${notice.kind === "success" ? "border-green-400/30 bg-green-400/10 text-green-200" : "border-red-400/30 bg-red-400/10 text-red-200"}`}>{notice.text}</div>}
      <div className="flex flex-wrap gap-1 border border-[#d4a843]/20 w-fit mb-8">{(["events", "members", "resources", "contact", "qotd"] as const).map((tab) => <button key={tab} onClick={() => setSection(tab)} className={`px-5 py-3 text-xs uppercase tracking-widest ${section === tab ? "bg-[#d4a843] text-[#0a1628]" : "text-[#e8e8e0]/60"}`}>{tab === "qotd" ? "QOTD" : tab}</button>)}</div>

      {section === "events" ? <div className="grid lg:grid-cols-[minmax(0,420px)_1fr] gap-8 items-start">
        <form onSubmit={saveEvent} className="border border-[#d4a843]/20 bg-[#0d1f35]/60 p-6 rounded-sm lg:sticky lg:top-24"><h2 className="font-serif text-2xl mb-5">{eventId ? "Edit event" : "Add an event"}</h2><div className="space-y-4">
          <Field label="Event title"><input className={inputClass} value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} required /></Field>
          <Field label="Description"><textarea className={`${inputClass} min-h-24`} value={eventForm.description} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} required /></Field>
          <div className="grid grid-cols-2 gap-3"><Field label="Category"><input className={inputClass} list="categories" value={eventForm.category} onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })} required /><datalist id="categories"><option>Competition</option><option>Workshop</option><option>Lecture</option><option>Cultural</option></datalist></Field><Field label="Venue"><input className={inputClass} value={eventForm.venue} onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })} required /></Field></div>
          <Field label="Starts"><input className={inputClass} type="datetime-local" value={eventForm.starts_at} onChange={(e) => setEventForm({ ...eventForm, starts_at: e.target.value })} required /></Field><Field label="Ends"><input className={inputClass} type="datetime-local" value={eventForm.ends_at} onChange={(e) => setEventForm({ ...eventForm, ends_at: e.target.value })} required /></Field>
          <Field label="Registration link (optional)"><input className={inputClass} type="url" placeholder="https://…" value={eventForm.registration_url} onChange={(e) => setEventForm({ ...eventForm, registration_url: e.target.value })} /></Field>
        </div><div className="flex gap-3 mt-6"><button disabled={busy || !configured} className="flex-1 bg-[#d4a843] text-[#0a1628] py-3 text-xs font-semibold uppercase tracking-widest disabled:opacity-40">{busy ? "Saving…" : eventId ? "Save changes" : "Add event"}</button>{eventId && <button type="button" onClick={() => { setEventId(null); setEventForm(emptyEvent); }} className="px-4 border border-[#d4a843]/20 text-xs uppercase">Cancel</button>}</div></form>
        <div className="space-y-4"><h2 className="font-serif text-2xl">All events <span className="text-[#d4a843]/50">({events.length})</span></h2>{events.map((item) => { const formatted = formatEventDate(item); return <article key={item.id} className="border border-[#d4a843]/15 bg-[#0d1f35]/40 p-5 flex flex-col sm:flex-row gap-4 justify-between"><div><div className="text-[10px] uppercase tracking-widest text-[#d4a843] mb-2">{getEventStatus(item)} · {formatted.date} · {formatted.time}</div><h3 className="font-serif text-xl">{item.title}</h3><p className="text-sm text-[#e8e8e0]/45 mt-1">{item.category} · {item.venue}</p></div><ItemActions edit={() => { setEventId(item.id); setEventForm({ title: item.title, description: item.description, category: item.category, venue: item.venue, starts_at: localInput(item.starts_at), ends_at: localInput(item.ends_at), registration_url: item.registration_url || "" }); window.scrollTo({ top: 0, behavior: "smooth" }); }} remove={() => remove("events", item.id, item.title)} /></article>; })}</div>
      </div> : section === "members" ? <div className="grid lg:grid-cols-[minmax(0,420px)_1fr] gap-8 items-start">
        <form onSubmit={saveMember} className="border border-[#d4a843]/20 bg-[#0d1f35]/60 p-6 rounded-sm lg:sticky lg:top-24"><h2 className="font-serif text-2xl mb-5">{memberId ? "Edit person" : "Add a person"}</h2><div className="space-y-4">
          <Field label="Full name"><input className={inputClass} value={memberForm.name} onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })} required /></Field><div className="grid grid-cols-2 gap-3"><Field label="Role"><input className={inputClass} value={memberForm.role} onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })} required /></Field><Field label="Section"><select className={inputClass} value={memberForm.group_type} onChange={(e) => setMemberForm({ ...memberForm, group_type: e.target.value as MemberGroup })}><option value="faculty">Faculty</option><option value="core">Core team</option><option value="member">Member</option></select></Field></div>
          <Field label="Year / department"><input className={inputClass} value={memberForm.details} onChange={(e) => setMemberForm({ ...memberForm, details: e.target.value })} required /></Field><Field label="Quote / expertise (optional)"><textarea className={`${inputClass} min-h-20`} value={memberForm.bio} onChange={(e) => setMemberForm({ ...memberForm, bio: e.target.value })} /></Field>
          <Field label="Photo"><input className={inputClass} type="file" accept="image/*" onChange={(e) => upload(e.target.files?.[0])} /><p className="text-[11px] text-[#e8e8e0]/35 mt-1.5">Or paste an image URL below. A placeholder is created if left empty.</p><input className={`${inputClass} mt-2`} type="text" placeholder="https://… or /team/photos/name.jpg" value={memberForm.image_url} onChange={(e) => setMemberForm({ ...memberForm, image_url: e.target.value })} /></Field><Field label="Display order"><input className={inputClass} type="number" min="0" value={memberForm.sort_order} onChange={(e) => setMemberForm({ ...memberForm, sort_order: Number(e.target.value) })} /></Field>
        </div><div className="flex gap-3 mt-6"><button disabled={busy || !configured} className="flex-1 bg-[#d4a843] text-[#0a1628] py-3 text-xs font-semibold uppercase tracking-widest disabled:opacity-40">{busy ? "Saving…" : memberId ? "Save changes" : "Add person"}</button>{memberId && <button type="button" onClick={() => { setMemberId(null); setMemberForm(emptyMember); }} className="px-4 border border-[#d4a843]/20 text-xs uppercase">Cancel</button>}</div></form>
        <div className="space-y-4"><h2 className="font-serif text-2xl">Everyone <span className="text-[#d4a843]/50">({members.length})</span></h2>{members.map((item) => <article key={item.id} className="border border-[#d4a843]/15 bg-[#0d1f35]/40 p-5 flex gap-4 justify-between"><div><div className="text-[10px] uppercase tracking-widest text-[#d4a843] mb-2">{item.group_type} · {item.role}</div><h3 className="font-serif text-xl">{item.name}</h3><p className="text-sm text-[#e8e8e0]/45 mt-1">{item.details}</p></div><ItemActions edit={() => { setMemberId(item.id); setMemberForm({ name: item.name, role: item.role, group_type: item.group_type, details: item.details, bio: item.bio, image_url: item.image_url || "", sort_order: item.sort_order }); window.scrollTo({ top: 0, behavior: "smooth" }); }} remove={() => remove("members", item.id, item.name)} /></article>)}</div>
      </div> : null}
      {section === "resources" && <ResourcesManager configured={configured} />}
      {section === "contact" && <ContactManager configured={configured} />}
      {section === "qotd" && <QotdManager configured={configured} />}
    </div>
  </main>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label><span className={labelClass}>{label}</span>{children}</label>; }
function ItemActions({ edit, remove }: { edit: () => void; remove: () => void }) { return <div className="flex gap-2 shrink-0"><button onClick={edit} className="h-fit border border-[#d4a843]/30 px-3 py-2 text-[10px] uppercase tracking-widest text-[#d4a843]">Edit</button><button onClick={remove} className="h-fit border border-red-400/20 px-3 py-2 text-[10px] uppercase tracking-widest text-red-300/70">Delete</button></div>; }
