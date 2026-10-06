"use client";

import { useEffect, useMemo, useState } from "react";
import type { EventRecord, EventStatus } from "@/lib/content-types";
import { formatEventDate, getEventStatus } from "@/lib/content-types";

const STATUS_LABELS: Record<EventStatus, string> = { upcoming: "Upcoming", active: "Happening now", done: "Completed" };
const STATUS_STYLES: Record<EventStatus, string> = {
  upcoming: "text-blue-200 border-blue-400/30 bg-blue-400/10",
  active: "text-green-200 border-green-400/40 bg-green-400/10",
  done: "text-[#e8e8e0]/40 border-[#e8e8e0]/15",
};

export default function EventsBrowser({ initialEvents }: { initialEvents: EventRecord[] }) {
  const [filter, setFilter] = useState("All");
  const [tab, setTab] = useState<EventStatus>("upcoming");
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(timer);
  }, []);

  const categories = useMemo(() => ["All", ...Array.from(new Set(initialEvents.map((event) => event.category)))], [initialEvents]);
  const counts = useMemo(() => initialEvents.reduce((result, event) => {
    result[getEventStatus(event, now)] += 1;
    return result;
  }, { upcoming: 0, active: 0, done: 0 }), [initialEvents, now]);
  const visible = initialEvents
    .filter((event) => getEventStatus(event, now) === tab && (filter === "All" || event.category === filter))
    .sort((a, b) => tab === "done" ? +new Date(b.starts_at) - +new Date(a.starts_at) : +new Date(a.starts_at) - +new Date(b.starts_at));

  return <>
    <section className="pt-36 pb-20 px-6 relative overflow-hidden math-grid">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 80% at 50% 0%, rgba(212,168,67,0.07) 0%, transparent 70%)" }} />
      <div className="relative z-10 max-w-5xl mx-auto">
        <p className="font-mono text-[#d4a843]/60 text-xs tracking-[0.3em] uppercase mb-4">Calendar</p>
        <h1 className="font-display text-6xl md:text-8xl font-light text-[#e8e8e0] leading-tight mb-6">Club<br /><span className="text-[#d4a843] italic">Events</span></h1>
        <div className="section-divider w-32 mb-8" />
        <p className="font-sans text-lg text-[#e8e8e0]/60 max-w-2xl leading-relaxed">Event stages update automatically from their start and end dates—no manual status changes needed.</p>
      </div>
    </section>

    <section className="sticky top-16 z-40 bg-[#0a1628]/95 backdrop-blur-md border-y border-[#d4a843]/10 px-6 py-4">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
        <div className="flex gap-1 border border-[#d4a843]/20 rounded-sm overflow-hidden">
          {(["upcoming", "active", "done"] as EventStatus[]).map((status) => <button key={status} onClick={() => setTab(status)} className={`px-4 py-2 font-sans text-xs tracking-wider uppercase transition-colors ${tab === status ? "bg-[#d4a843] text-[#0a1628] font-semibold" : "text-[#e8e8e0]/50 hover:text-[#e8e8e0]"}`}>{STATUS_LABELS[status]} <span className="opacity-60">{counts[status]}</span></button>)}
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => <button key={category} onClick={() => setFilter(category)} className={`px-3 py-1 text-xs font-sans tracking-wider uppercase border rounded-sm transition-all ${filter === category ? "bg-[#d4a843]/20 border-[#d4a843]/60 text-[#d4a843]" : "border-[#d4a843]/20 text-[#e8e8e0]/40 hover:text-[#e8e8e0]/70"}`}>{category}</button>)}
        </div>
      </div>
    </section>

    <section className="py-16 px-6 min-h-[28rem]">
      <div className="max-w-6xl mx-auto">
        {visible.length === 0 ? <div className="text-center py-24 font-display text-3xl text-[#e8e8e0]/20 italic">No {STATUS_LABELS[tab].toLowerCase()} events.</div> : <div className="grid md:grid-cols-2 gap-6">
          {visible.map((event) => {
            const formatted = formatEventDate(event);
            const status = getEventStatus(event, now);
            return <article key={event.id} className="border border-[#d4a843]/15 bg-[#0d1f35]/50 p-7 card-hover border-glow rounded-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#d4a843]/60 to-transparent" />
              <div className="flex flex-wrap gap-2 items-start justify-between mb-3 pl-3">
                <div className="font-mono text-[#d4a843] text-xs font-semibold tracking-widest">{formatted.date}</div>
                <div className="flex gap-2"><span className={`text-[10px] font-sans font-semibold tracking-widest uppercase border px-2 py-0.5 rounded-sm ${STATUS_STYLES[status]}`}>{STATUS_LABELS[status]}</span><span className="text-[10px] font-sans font-semibold tracking-widest uppercase border border-[#d4a843]/30 text-[#d4a843]/70 px-2 py-0.5 rounded-sm">{event.category}</span></div>
              </div>
              <h2 className="font-serif text-xl text-[#e8e8e0] font-semibold mb-3 pl-3">{event.title}</h2>
              <p className="font-sans text-sm text-[#e8e8e0]/50 leading-relaxed mb-5 pl-3">{event.description}</p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-[#e8e8e0]/40 pl-3"><span>📍 {event.venue}</span><span>🕐 {formatted.time}</span></div>
              {event.registration_url && status !== "done" && <a href={event.registration_url} target="_blank" rel="noreferrer" className="inline-block ml-3 mt-5 text-xs uppercase tracking-widest text-[#d4a843] hover:text-[#f0d080]">Register →</a>}
            </article>;
          })}
        </div>}
      </div>
    </section>
  </>;
}
