import { listResources } from "@/lib/content-store";

export const dynamic = "force-dynamic";

const LEVEL_COLORS: Record<string, string> = {
  Beginner: "text-green-300 border-green-400/30",
  Intermediate: "text-blue-300 border-blue-400/30",
  Advanced: "text-orange-300 border-orange-400/30",
  Expert: "text-red-300 border-red-400/30",
};

export default async function ResourcesPage() {
  const resources = await listResources();
  const books = resources.filter((item) => item.kind === "book");
  const links = resources.filter((item) => item.kind === "link");
  const archives = resources.filter((item) => item.kind === "archive");
  return <>
    <section className="pt-36 pb-20 px-6 relative overflow-hidden math-grid"><div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 80% at 50% 0%, rgba(212,168,67,0.07) 0%, transparent 70%)" }} /><div className="relative z-10 max-w-5xl mx-auto"><p className="font-mono text-[#d4a843]/60 text-xs tracking-[0.3em] uppercase mb-4">Learn & Grow</p><h1 className="font-display text-6xl md:text-8xl font-light text-[#e8e8e0] leading-tight mb-6">Resources<br /><span className="text-[#d4a843] italic">& Reading</span></h1><div className="section-divider w-32 mb-8" /><p className="font-sans text-lg text-[#e8e8e0]/60 max-w-2xl leading-relaxed">A curated collection of books, links, and problem archives for every level of mathematical curiosity.</p></div></section>
    <section className="py-16 px-6"><div className="max-w-6xl mx-auto"><p className="font-mono text-[#d4a843]/60 text-xs tracking-[0.3em] uppercase mb-8">📚 Recommended Books</p>{books.length ? <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{books.map((book) => <article key={book.id} className="border border-[#d4a843]/15 bg-[#0d1f35]/40 p-5 card-hover rounded-sm relative overflow-hidden"><div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#d4a843]/40 to-transparent" /><div className="font-mono text-[10px] text-[#d4a843]/40 tracking-widest mb-3 uppercase">{book.topic}</div><h2 className="font-serif text-[#e8e8e0] font-semibold text-sm leading-tight mb-2">{book.title}</h2><p className="font-sans text-xs text-[#e8e8e0]/40 italic mb-4">{book.subtitle}</p>{book.level && <span className={`text-[10px] border px-2 py-0.5 font-sans font-semibold tracking-widest uppercase rounded-sm ${LEVEL_COLORS[book.level] || "text-[#d4a843] border-[#d4a843]/30"}`}>{book.level}</span>}</article>)}</div> : <Empty />}</div></section>
    <section className="py-16 px-6 bg-[#080f1e]"><div className="max-w-6xl mx-auto"><p className="font-mono text-[#d4a843]/60 text-xs tracking-[0.3em] uppercase mb-8">🏆 Olympiad & Exam Papers</p>{archives.length ? <div className="grid md:grid-cols-2 gap-4">{archives.map((item) => <a key={item.id} href={item.url || "#"} target="_blank" rel="noopener noreferrer" className="border border-[#d4a843]/15 bg-[#0d1f35]/40 p-6 card-hover border-glow rounded-sm flex items-start gap-4 group"><div className="font-display text-3xl text-[#d4a843]/30">∑</div><div><h2 className="font-serif text-[#e8e8e0] font-semibold mb-2 group-hover:text-[#d4a843]">{item.title}</h2><p className="font-sans text-xs text-[#e8e8e0]/50 leading-relaxed">{item.description}</p></div><span className="ml-auto text-[#d4a843]/30 group-hover:text-[#d4a843]">↗</span></a>)}</div> : <Empty />}</div></section>
    <section className="py-16 px-6"><div className="max-w-6xl mx-auto"><p className="font-mono text-[#d4a843]/60 text-xs tracking-[0.3em] uppercase mb-8">🌐 Online Resources</p>{links.length ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{links.map((item) => <a key={item.id} href={item.url || "#"} target="_blank" rel="noopener noreferrer" className="border border-[#d4a843]/15 bg-[#0d1f35]/40 p-6 card-hover border-glow rounded-sm group"><div className="flex justify-between items-start mb-3"><h2 className="font-serif text-[#e8e8e0] font-semibold group-hover:text-[#d4a843]">{item.title}</h2><span className="text-[#d4a843]/30 group-hover:text-[#d4a843]">↗</span></div><p className="font-sans text-xs text-[#e8e8e0]/50 leading-relaxed">{item.description}</p></a>)}</div> : <Empty />}</div></section>
    <section className="py-16 px-6 bg-[#080f1e]"><div className="max-w-3xl mx-auto text-center border border-[#d4a843]/20 p-12 border-glow rounded-sm"><div className="font-display text-5xl text-[#d4a843]/20 mb-4">∮</div><h2 className="font-display text-3xl text-[#e8e8e0] font-light mb-4">Member <span className="text-[#d4a843] italic">Notes & Handouts</span></h2><p className="font-sans text-sm text-[#e8e8e0]/50 mb-8 leading-relaxed">Club members get access to exclusive lecture notes, workshop handouts, and a shared problem set library.</p><a href="/contact" className="inline-block px-8 py-3 bg-[#d4a843] text-[#0a1628] font-sans font-bold text-sm tracking-widest uppercase hover:bg-[#f0d080]">Become a Member</a></div></section>
  </>;
}

function Empty() { return <p className="border border-[#d4a843]/10 p-8 text-center text-sm text-[#e8e8e0]/35">Nothing has been added here yet.</p>; }
