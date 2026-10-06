import Image from "next/image";
import { listMembers } from "@/lib/content-store";
import type { MemberRecord } from "@/lib/content-types";

export const dynamic = "force-dynamic";

function Avatar({ member }: { member: MemberRecord }) {
  if (member.image_url) return <div className="w-32 h-32 relative rounded-full overflow-hidden shrink-0 border border-[#d4a843]/40"><Image src={member.image_url} alt={member.name} fill sizes="128px" className="object-cover" /></div>;
  const initials = member.name.split(" ").slice(0, 2).map((word) => word[0]).join("");
  const hue = member.name.charCodeAt(0) * 15 % 360;
  return <div className="w-32 h-32 rounded-full flex items-center justify-center font-serif font-bold text-3xl text-[#0a1628] shrink-0" style={{ background: `hsl(${hue}, 50%, 65%)` }}>{initials}</div>;
}

function PersonCard({ member, faculty = false }: { member: MemberRecord; faculty?: boolean }) {
  return <article className={`border border-[#d4a843]/15 bg-[#0d1f35]/40 p-8 card-hover rounded-md flex ${faculty ? "sm:flex-row text-left items-start gap-8" : "flex-col text-center items-center"}`}>
    <div className={faculty ? "" : "mb-6"}><Avatar member={member} /></div>
    <div><h2 className="font-serif text-[#e8e8e0] text-xl font-semibold mb-2">{member.name}</h2><div className="font-sans text-sm text-[#d4a843] tracking-widest uppercase mb-3">{member.role}</div><div className="font-sans text-xs text-[#e8e8e0]/50 mb-3">{member.details}</div>{member.bio && <p className="font-sans text-xs italic text-[#e8e8e0]/60 mt-auto leading-relaxed">{faculty ? member.bio : `“${member.bio}”`}</p>}</div>
  </article>;
}

export default async function TeamPage() {
  const members = await listMembers();
  const groups = { faculty: members.filter((m) => m.group_type === "faculty"), core: members.filter((m) => m.group_type === "core"), member: members.filter((m) => m.group_type === "member") };
  return <>
    <section className="pt-36 pb-20 px-6 relative overflow-hidden math-grid"><div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 80% at 50% 0%, rgba(212,168,67,0.07) 0%, transparent 70%)" }} /><div className="relative z-10 max-w-5xl mx-auto"><p className="font-mono text-[#d4a843]/60 text-xs tracking-[0.3em] uppercase mb-4">The People</p><h1 className="font-display text-6xl md:text-8xl font-light text-[#e8e8e0] leading-tight mb-6">Our<br /><span className="text-[#d4a843] italic">Team</span></h1><div className="section-divider w-32 mb-8" /><p className="font-sans text-lg text-[#e8e8e0]/60 max-w-2xl leading-relaxed">Driven by curiosity, united by a love for mathematics. Meet the people who make the club thrive.</p></div></section>
    <section className="py-16 px-6"><div className="max-w-6xl mx-auto"><p className="font-mono text-[#d4a843]/60 text-xs tracking-[0.3em] uppercase mb-8">Faculty</p><div className="grid md:grid-cols-2 gap-8">{groups.faculty.map((member) => <PersonCard key={member.id} member={member} faculty />)}</div></div></section>
    <section className="py-16 px-6 bg-[#080f1e]"><div className="max-w-6xl mx-auto"><p className="font-mono text-[#d4a843]/60 text-xs tracking-[0.3em] uppercase mb-8">Core Committee 2026–27</p><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">{groups.core.map((member) => <PersonCard key={member.id} member={member} />)}</div></div></section>
    <section className="py-16 px-6"><div className="max-w-6xl mx-auto"><p className="font-mono text-[#d4a843]/60 text-xs tracking-[0.3em] uppercase mb-8">Active Members</p><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">{groups.member.map((member) => <PersonCard key={member.id} member={member} />)}</div><p className="font-sans text-xs text-[#e8e8e0]/30 mt-8 text-center italic">and more members to join us on this journey.</p></div></section>
  </>;
}
