import Image from "next/image";

const FACULTY = [
  {
    name: "Prof. S. P. Tiwari",
    role: "Faculty in-charge",
    dept: "Mathematics & Computing Department",
    expertise: "Topology, Category Theory, and Fuzzy Automata Theory",
    image: "/team/photos/sptiwari.png"
  }
];

const CORE = [
  { name: "Ayush Verma", role: "Coordinator", year: "2nd Year, B.Tech (Mechanical)", image: "/team/photos/ayush.jpeg", quote: "Everyone is complex, unique and incomparable but can be equal." },
  { name: "Abhimanyu Yadav", role: "Tech Coordinator", year: "2nd Year, B.Tech (Mechanical)", image: "/team/photos/abhimanyu.jpeg", quote: "An idiot with a plan can beat a genius without plan" },
];

const MEMBERS = [
  { name: "Subrat Panda", year: "2nd Year, B.Tech (Electrical)", image: "/team/photos/subrat.jpeg", quote: "The power to constrain an adversary may depend on the power to bind oneself." },
  { name: "Saranshh Rastogi", year: "2nd Year, B.Tech (Electrical)", image: "/team/photos/saranshh.png", quote: "Equations are poetry." },
  { name: "Aarya Muniyavula", year: "2nd Year, B.Tech (Mechanical)", image: "/team/photos/aarya.png", quote: "Solving puzzles." },
  { name: "Ansh Mathur", year: "2nd Year, B.Tech (Mechanical)", image: "/team/photos/ansh.jpeg", quote: "Everything is a risk. Not doing anything is also a risk." },
  { name: "Yash Jha", year: "2nd Year, B.Tech (Mathematics and Computing)", image: "/team/photos/yash.png", quote: "Engineering through math." },
  { name: "Anukul Tiwari", year: "2nd Year, B.Tech (Environmental)", image: "/team/photos/anukul.jpeg", quote: "Until I get there I won't give up." },
  { name: "Kiran Pal", year: "2nd Year, B.Tech (Mathematics and Computing)", image: "/team/photos/kiran.jpeg", quote: "Any loop can be shrunk." }
];

function Avatar({ name, image, sizeClass = "w-14 h-14", textClass = "text-lg" }: { name: string, image?: string, sizeClass?: string, textClass?: string }) {
  if (image) {
    return (
      <div className={`${sizeClass} relative rounded-full overflow-hidden shrink-0 border border-[#d4a843]/40`}>
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    );
  }
  
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("");
  const hue = name.charCodeAt(0) * 15 % 360;
  return (
    <div
      className={`${sizeClass} rounded-full flex items-center justify-center font-serif font-bold text-[#0a1628] shrink-0 ${textClass}`}
      style={{ background: `hsl(${hue}, 50%, 65%)` }}
    >
      {initials}
    </div>
  );
}

export default function TeamPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-36 pb-20 px-6 relative overflow-hidden math-grid">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 80% at 50% 0%, rgba(212,168,67,0.07) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="font-mono text-[#d4a843]/60 text-xs tracking-[0.3em] uppercase mb-4">The People</p>
          <h1 className="font-display text-6xl md:text-8xl font-light text-[#e8e8e0] leading-tight mb-6">
            Our<br /><span className="text-[#d4a843] italic">Team</span>
          </h1>
          <div className="section-divider w-32 mb-8" />
          <p className="font-sans text-lg text-[#e8e8e0]/60 max-w-2xl leading-relaxed">
            Driven by curiosity, united by a love for mathematics. Meet the people who make the club thrive.
          </p>
        </div>
      </section>

      {/* Faculty */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[#d4a843]/60 text-xs tracking-[0.3em] uppercase mb-8">Faculty</p>
          <div className="grid md:grid-cols-2 gap-8">
            {FACULTY.map((f, i) => (
              <div key={i} className="border border-[#d4a843]/20 bg-[#0d1f35]/50 p-10 border-glow rounded-md flex gap-8 items-start">
                <Avatar name={f.name} image={f.image} sizeClass="w-32 h-32" />
                <div>
                  <div className="font-serif text-[#e8e8e0] text-2xl font-semibold mb-2">{f.name}</div>
                  <div className="font-sans text-sm text-[#d4a843] tracking-widest uppercase mb-3">{f.role}</div>
                  <div className="font-sans text-sm text-[#e8e8e0]/60 mb-2">{f.dept}</div>
                  <div className="font-sans text-sm text-[#e8e8e0]/40 italic leading-relaxed">{f.expertise}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core team */}
      <section className="py-16 px-6 bg-[#080f1e]">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[#d4a843]/60 text-xs tracking-[0.3em] uppercase mb-8">Core Committee 2026–27</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {CORE.map((m, i) => (
              <div key={i} className="border border-[#d4a843]/15 bg-[#0d1f35]/40 p-8 card-hover rounded-md text-center flex flex-col items-center">
                <div className="flex justify-center mb-6">
                  <Avatar name={m.name} image={m.image} sizeClass="w-32 h-32" />
                </div>
                <div className="font-serif text-[#e8e8e0] text-xl font-semibold mb-2">{m.name}</div>
                <div className="font-sans text-sm text-[#d4a843] tracking-widest uppercase mb-3">{m.role}</div>
                <div className="font-sans text-xs text-[#e8e8e0]/40 mb-3">{m.year}</div>
                {m.quote && (
                  <p className="font-sans text-xs italic text-[#e8e8e0]/60 mt-auto leading-relaxed">
                    &quot;{m.quote}&quot;
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* General members */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[#d4a843]/60 text-xs tracking-[0.3em] uppercase mb-8">Active Members</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {MEMBERS.map((m, i) => (
              <div key={i} className="border border-[#d4a843]/10 bg-[#0d1f35]/30 p-8 card-hover rounded-md text-center flex flex-col items-center">
                <div className="flex justify-center mb-6">
                  <Avatar name={m.name} image={m.image} sizeClass="w-32 h-32" />
                </div>
                <div className="font-serif text-[#e8e8e0] text-xl font-semibold mb-2">{m.name}</div>
                <div className="font-sans text-sm text-[#d4a843] tracking-widest uppercase mb-3">Member</div>
                <div className="font-sans text-xs text-[#e8e8e0]/40 mb-3">{m.year}</div>
                {m.quote && (
                  <p className="font-sans text-xs italic text-[#e8e8e0]/60 mt-auto leading-relaxed">
                    &quot;{m.quote}&quot;
                  </p>
                )}
              </div>
            ))}
          </div>
          <p className="font-sans text-xs text-[#e8e8e0]/30 mt-8 text-center italic">
            and more members to join us on this journey.
          </p>
        </div>
      </section>
    </>
  );
}
