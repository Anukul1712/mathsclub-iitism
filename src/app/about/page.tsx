import Image from "next/image";
import Link from "next/link";

const BRANCHES = [
  { icon: "Γ", title: "Game Theory", desc: "Mathematical models of strategic interaction, Nash equilibria, and rational decision making." },
  { icon: "Σ", title: "Algebra", desc: "Group theory, rings, fields, and the abstract structures that unify mathematics." },
  { icon: "∇", title: "Geometry", desc: "Differential geometry, topology, and the shape of spaces we can barely imagine." },
  { icon: "P", title: "Probability", desc: "Stochastic processes, statistics, and the mathematics of uncertainty." },
  { icon: "λ", title: "Number Theory", desc: "Primes, congruences, and the deep secrets hidden in the integers." },
  { icon: "∞", title: "Combinatorics", desc: "Counting, graph theory, and the art of discrete mathematics." },
];

// const ACHIEVEMENTS = [
//   { year: "2024", title: "Inter-IIT Math Olympiad", result: "Gold Medal - Team of 4" },
//   { year: "2023", title: "NBHM Scholarship", result: "5 club members selected" },
//   { year: "2023", title: "National Pi Day Quiz", result: "Runner-Up, Pan-India" },
//   { year: "2022", title: "CMI Entrance Mentorship", result: "100% success rate" },
// ];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-36 pb-20 px-6 relative overflow-hidden math-grid">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 80% at 50% 0%, rgba(212,168,67,0.07) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="font-mono text-[#d4a843]/60 text-xs tracking-[0.3em] uppercase mb-4">Our Story</p>
          <h1 className="font-display text-6xl md:text-8xl font-light text-[#e8e8e0] leading-tight mb-6">
            About<br />
            <span className="text-[#d4a843] italic">the Club</span>
          </h1>
          <div className="section-divider w-32 mb-8" />
          <p className="font-sans text-lg text-[#e8e8e0]/60 max-w-2xl leading-relaxed">
            Freshly minted and driven by boundless ambition, the Mathematics Club is IIT(ISM) Dhanbad&apos;s new home for absolute mathematical passion and discovery.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-full border border-[#d4a843]/10 rotate-slow" />
              <div className="absolute inset-8 rounded-full border border-[#d4a843]/20" />
              <div className="absolute inset-16 rounded-full overflow-hidden border-2 border-[#d4a843]/40 shadow-[0_0_60px_rgba(212,168,67,0.15)]">
                <Image src="/logo.png" alt="Club Logo" fill className="object-cover" />
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-display text-4xl text-[#e8e8e0] font-light mb-6">
              Our <span className="text-[#d4a843] italic">Mission</span>
            </h2>
            <div className="space-y-4 font-sans text-[#e8e8e0]/60 leading-relaxed">
              <p>
                The Mathematics Club of IIT(ISM) Dhanbad is a newly founded initiative with a singular, unyielding purpose: to revolutionise how mathematics is celebrated and perceived beyond the classroom.
              </p>
              <p>
                We believe mathematics is not merely a tool for engineering - it is an art, a language, a philosophy. Though we are just beginning our journey, our vision spans competitive mathematics, pure research seminars, recreational puzzles, and intense collaborative learning.
              </p>
              <p>
                We might not have years of legacy behind us yet, but we are here to bridge the gap between rigorous academic routines and the intuitive joy of discovery, shaking the campus with our absolute drive to do great things.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                ["Explore", "All branches from algebra to topology"],
                ["Compete", "Olympiads, contests & inter-IIT events"],
                ["Learn", "Workshops, talks & reading groups"],
                ["Connect", "Network with mathematicians & alumni"],
              ].map(([h, d]) => (
                <div key={h} className="border border-[#d4a843]/15 p-4 rounded-sm bg-[#0d1f35]/40">
                  <div className="font-serif text-[#d4a843] text-sm font-semibold mb-1">{h}</div>
                  <div className="font-sans text-xs text-[#e8e8e0]/40 leading-relaxed">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Branches */}
      <section className="py-20 px-6 bg-[#080f1e]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-mono text-[#d4a843]/60 text-xs tracking-[0.3em] uppercase mb-3">Areas of Focus</p>
            <h2 className="font-display text-5xl font-light text-[#e8e8e0]">
              Branches of <span className="text-[#d4a843] italic">Mathematics</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {BRANCHES.map((b, i) => (
              <div key={i} className="border border-[#d4a843]/15 bg-[#0d1f35]/40 p-6 card-hover border-glow rounded-sm">
                <div className="font-display text-5xl text-[#d4a843]/40 mb-4 leading-none">{b.icon}</div>
                <h3 className="font-serif text-lg text-[#e8e8e0] font-semibold mb-2">{b.title}</h3>
                <p className="font-sans text-xs text-[#e8e8e0]/50 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements 
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-mono text-[#d4a843]/60 text-xs tracking-[0.3em] uppercase mb-3">Track Record</p>
            <h2 className="font-display text-5xl font-light text-[#e8e8e0]">
              Club <span className="text-[#d4a843] italic">Achievements</span>
            </h2>
          </div>
          <div className="space-y-4">
            {ACHIEVEMENTS.map((a, i) => (
              <div key={i} className="flex items-center gap-6 border border-[#d4a843]/15 bg-[#0d1f35]/30 px-6 py-5 rounded-sm hover:border-[#d4a843]/30 transition-colors">
                <div className="font-mono text-[#d4a843] text-sm font-bold w-12 shrink-0">{a.year}</div>
                <div className="flex-1">
                  <div className="font-serif text-[#e8e8e0] font-semibold">{a.title}</div>
                </div>
                <div className="font-sans text-xs text-[#d4a843]/70 text-right shrink-0">{a.result}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}
    </>
  );
}
