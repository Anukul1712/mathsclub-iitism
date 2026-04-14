"use client";
import { useState } from "react";

const ALL_EVENTS = [
  {
    date: "Apr 09, 2026",
    title: "Club Induction",
    desc: "Introduction to the club, its activities, and how to get involved.",
    tag: "Workshop",
    status: "past",
    venue: "NLHC G-8",
    time: "07:00 PM – 07:30 PM",
  },
  {
    date: "Apr 09-10, 2026",
    title: "Integration Bee 2026",
    desc: "Integration Bee Competition.",
    tag: "Competition",
    status: "past",
    venue: "NLHC G-8",
    time: "07:00 PM – 09:00 PM",
  }
];

const TAGS = ["All", "Competition", "Workshop", "Lecture", "Cultural"];

const TAG_COLORS: Record<string, string> = {
  Competition: "text-red-300 border-red-400/30",
  Workshop: "text-blue-300 border-blue-400/30",
  Lecture: "text-green-300 border-green-400/30",
  Cultural: "text-purple-300 border-purple-400/30",
};

export default function EventsPage() {
  const [filter, setFilter] = useState("All");
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  const visible = ALL_EVENTS.filter(
    (e) =>
      e.status === tab && (filter === "All" || e.tag === filter)
  );

  return (
    <>
      {/* Header */}
      <section className="pt-36 pb-20 px-6 relative overflow-hidden math-grid">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 80% at 50% 0%, rgba(212,168,67,0.07) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="font-mono text-[#d4a843]/60 text-xs tracking-[0.3em] uppercase mb-4">Calendar</p>
          <h1 className="font-display text-6xl md:text-8xl font-light text-[#e8e8e0] leading-tight mb-6">
            Club<br /><span className="text-[#d4a843] italic">Events</span>
          </h1>
          <div className="section-divider w-32 mb-8" />
          <p className="font-sans text-lg text-[#e8e8e0]/60 max-w-2xl leading-relaxed">
            From olympiad workshops to casual puzzle hunts, there&apos;s always something happening at the Math Club.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-40 bg-[#0a1628]/95 backdrop-blur-md border-y border-[#d4a843]/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          {/* Tabs */}
          <div className="flex gap-1 border border-[#d4a843]/20 rounded-sm overflow-hidden">
            {(["upcoming", "past"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2 font-sans text-xs tracking-widest uppercase transition-colors duration-200 ${
                  tab === t
                    ? "bg-[#d4a843] text-[#0a1628] font-semibold"
                    : "text-[#e8e8e0]/50 hover:text-[#e8e8e0]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Tag filters */}
          <div className="flex gap-2 flex-wrap">
            {TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-3 py-1 text-xs font-sans tracking-wider uppercase border rounded-sm transition-all duration-200 ${
                  filter === tag
                    ? "bg-[#d4a843]/20 border-[#d4a843]/60 text-[#d4a843]"
                    : "border-[#d4a843]/20 text-[#e8e8e0]/40 hover:border-[#d4a843]/40 hover:text-[#e8e8e0]/60"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {visible.length === 0 ? (
            <div className="text-center py-24 font-display text-3xl text-[#e8e8e0]/20 italic">
              No events found.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {visible.map((ev, i) => (
                <div
                  key={i}
                  className="border border-[#d4a843]/15 bg-[#0d1f35]/50 p-7 card-hover border-glow rounded-sm relative overflow-hidden"
                >
                  {/* Gold bar */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#d4a843]/60 to-transparent" />

                  <div className="flex items-start justify-between mb-3 pl-3">
                    <div className="font-mono text-[#d4a843] text-xs font-semibold tracking-widest">
                      {ev.date}
                    </div>
                    <span className={`text-[10px] font-sans font-semibold tracking-widest uppercase border px-2 py-0.5 rounded-sm ${TAG_COLORS[ev.tag] || "text-[#d4a843]/50 border-[#d4a843]/30"}`}>
                      {ev.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-[#e8e8e0] font-semibold mb-3 pl-3">{ev.title}</h3>
                  <p className="font-sans text-sm text-[#e8e8e0]/50 leading-relaxed mb-5 pl-3">{ev.desc}</p>

                  <div className="flex gap-4 text-xs font-mono text-[#e8e8e0]/30 pl-3">
                    <span>📍 {ev.venue}</span>
                    <span>🕐 {ev.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
