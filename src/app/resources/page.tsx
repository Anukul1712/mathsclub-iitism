const BOOKS = [
  { title: "Game Theory", author: "Michael Maschler, Shmuel Zamir, Eilon Solan", level: "Advanced", topic: "Game Theory" },
  { title: "Abstract Algebra", author: "Dummit & Foote", level: "Intermediate", topic: "Algebra" },
  { title: "Topology", author: "James Munkres", level: "Intermediate", topic: "Topology" },
  { title: "Introduction to the Theory of Numbers", author: "Hardy & Wright", level: "Intermediate", topic: "Number Theory" },
  { title: "Linear Algebra Done Right", author: "Sheldon Axler", level: "Beginner", topic: "Linear Algebra" },
  { title: "The Art of Problem Solving Vol. 1 & 2", author: "Sandor Lehoczky", level: "Beginner", topic: "Olympiad" },
  { title: "A First Course in Probability", author: "Sheldon Ross", level: "Intermediate", topic: "Probability" },
  { title: "Algebraic Geometry", author: "Hartshorne", level: "Expert", topic: "Geometry" },
];

const LINKS = [
  { name: "MIT OpenCourseWare", url: "https://ocw.mit.edu/courses/mathematics/", desc: "Free lecture notes and problem sets from MIT's math department." },
  { name: "Art of Problem Solving", url: "https://artofproblemsolving.com", desc: "Forum, resources and courses for olympiad mathematics." },
  { name: "3Blue1Brown", url: "https://www.3blue1brown.com", desc: "Visual intuition for deep mathematical ideas." },
  { name: "Project Euler", url: "https://projecteuler.net", desc: "Challenging mathematical programming problems." },
  { name: "Khan Academy", url: "https://www.khanacademy.org/math", desc: "From arithmetic to multivariable calculus - free and excellent." },
  { name: "Wolfram MathWorld", url: "https://mathworld.wolfram.com", desc: "Comprehensive online encyclopedia of mathematics." },
];

const OLYMPIAD = [
  { 
    title: "IMO Problems Archive",
    desc: "Every International Math Olympiad problem from 1959 onwards.",
    url: "https://www.imo-official.org/problems.aspx"
  },
  { 
    title: "CMI Entrance Paper Collection",
    desc: "Past papers for Chennai Mathematical Institute entrance exam.",
    url: "https://www.cmi.ac.in/admissions/"
  },
  { 
    title: "NBHM Written Test Papers",
    desc: "National Board for Higher Mathematics scholarship exam papers.",
    url: "https://www.nbhm.dae.gov.in/"
  },
  { 
    title: "TIFR GS Mathematics",
    desc: "TIFR Graduate School admission test papers in mathematics.",
    url: "https://www.tifr.res.in/academics/past_question_papers.php"
  }
];
const LEVEL_COLORS: Record<string, string> = {
  Beginner: "text-green-300 border-green-400/30",
  Intermediate: "text-blue-300 border-blue-400/30",
  Advanced: "text-orange-300 border-orange-400/30",
  Expert: "text-red-300 border-red-400/30",
};

export default function ResourcesPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-36 pb-20 px-6 relative overflow-hidden math-grid">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 80% at 50% 0%, rgba(212,168,67,0.07) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="font-mono text-[#d4a843]/60 text-xs tracking-[0.3em] uppercase mb-4">Learn & Grow</p>
          <h1 className="font-display text-6xl md:text-8xl font-light text-[#e8e8e0] leading-tight mb-6">
            Resources<br /><span className="text-[#d4a843] italic">& Reading</span>
          </h1>
          <div className="section-divider w-32 mb-8" />
          <p className="font-sans text-lg text-[#e8e8e0]/60 max-w-2xl leading-relaxed">
            A curated collection of books, links, and problem archives for every level of mathematical curiosity.
          </p>
        </div>
      </section>

      {/* Books */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[#d4a843]/60 text-xs tracking-[0.3em] uppercase mb-8">📚 Recommended Books</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BOOKS.map((b, i) => (
              <div key={i} className="border border-[#d4a843]/15 bg-[#0d1f35]/40 p-5 card-hover rounded-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#d4a843]/40 to-transparent" />
                <div className="font-mono text-[10px] text-[#d4a843]/40 tracking-widest mb-3 uppercase">{b.topic}</div>
                <h3 className="font-serif text-[#e8e8e0] font-semibold text-sm leading-tight mb-2">{b.title}</h3>
                <p className="font-sans text-xs text-[#e8e8e0]/40 italic mb-4">{b.author}</p>
                <span className={`text-[10px] border px-2 py-0.5 font-sans font-semibold tracking-widest uppercase rounded-sm ${LEVEL_COLORS[b.level]}`}>
                  {b.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Olympiad papers */}
      <section className="py-16 px-6 bg-[#080f1e]">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[#d4a843]/60 text-xs tracking-[0.3em] uppercase mb-8">🏆 Olympiad & Exam Papers</p>
          <div className="grid md:grid-cols-2 gap-4">
            {OLYMPIAD.map((p, i) => (
              <a
                key={i}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#d4a843]/15 bg-[#0d1f35]/40 p-6 card-hover border-glow rounded-sm flex items-start gap-4 group"
              >
                <div className="font-display text-3xl text-[#d4a843]/30 group-hover:text-[#d4a843]/50 transition-colors">∑</div>
                <div>
                  <h3 className="font-serif text-[#e8e8e0] font-semibold mb-2 group-hover:text-[#d4a843] transition-colors">{p.title}</h3>
                  <p className="font-sans text-xs text-[#e8e8e0]/50 leading-relaxed">{p.desc}</p>
                </div>
                <span className="ml-auto text-[#d4a843]/30 group-hover:text-[#d4a843] transition-colors text-lg">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Online resources */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[#d4a843]/60 text-xs tracking-[0.3em] uppercase mb-8">🌐 Online Resources</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LINKS.map((l, i) => (
              <a
                key={i}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#d4a843]/15 bg-[#0d1f35]/40 p-6 card-hover border-glow rounded-sm group"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-serif text-[#e8e8e0] font-semibold group-hover:text-[#d4a843] transition-colors">{l.name}</h3>
                  <span className="text-[#d4a843]/30 group-hover:text-[#d4a843] transition-colors text-sm">↗</span>
                </div>
                <p className="font-sans text-xs text-[#e8e8e0]/50 leading-relaxed">{l.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Club notes CTA */}
      <section className="py-16 px-6 bg-[#080f1e]">
        <div className="max-w-3xl mx-auto text-center border border-[#d4a843]/20 p-12 border-glow rounded-sm">
          <div className="font-display text-5xl text-[#d4a843]/20 mb-4">∮</div>
          <h2 className="font-display text-3xl text-[#e8e8e0] font-light mb-4">
            Member <span className="text-[#d4a843] italic">Notes & Handouts</span>
          </h2>
          <p className="font-sans text-sm text-[#e8e8e0]/50 mb-8 leading-relaxed">
            Club members get access to exclusive lecture notes, handouts from workshops, and a shared problem set library. Join us to get access.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-[#d4a843] text-[#0a1628] font-sans font-bold text-sm tracking-widest uppercase hover:bg-[#f0d080] transition-colors rounded-sm"
          >
            Become a Member
          </a>
        </div>
      </section>
    </>
  );
}
