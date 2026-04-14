"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const FLOATING_EQUATIONS = [
  "∫₀^∞ e⁻ˣ² dx = √π/2",
  "eⁱπ + 1 = 0",
  "∑ 1/n² = π²/6",
  "∇²φ = 0",
  "Γ(n+1) = n!",
  "det(A) = ∏λᵢ",
  "∮ F·dr = 0",
  "ζ(2) = π²/6",
  "sin²θ + cos²θ = 1",
  "i² = −1",
  "p(x|θ) ∝ p(θ|x)p(x)",
  "A = πr²",
  "lim_{n→∞}(1+1/n)ⁿ = e",
  "d/dx eˣ = eˣ",
];

const STATS = [
  { value: "8", label: "Founding Members" },
  { value: "0", label: "Limits" },
  { value: "100%", label: "Pure Passion" },
  { value: "∞", label: "Potential" },
];

const QUOTES = [
  {
    text: "Mathematics is the language in which God has written the universe.",
    author: "Galileo Galilei",
  },
  {
    text: "The essence of mathematics lies in its freedom.",
    author: "Georg Cantor",
  },
  {
    text: "Pure mathematics is, in its way, the poetry of logical ideas.",
    author: "Albert Einstein",
  },
];

const UPCOMING: Array<{ date: string; title: string; desc: string; tag: string }> = [];

export default function HomePage() {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Rotating quotes
  useEffect(() => {
    const id = setInterval(() => setQuoteIdx((i) => (i + 1) % QUOTES.length), 5000);
    return () => clearInterval(id);
  }, []);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Particle = { x: number; y: number; vx: number; vy: number; r: number; alpha: number };
    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.3 + 0.05,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,168,67,${p.alpha})`;
        ctx.fill();
      });
      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(212,168,67,${0.05 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden math-grid">
        {/* Particle canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Floating equations */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden>
          {FLOATING_EQUATIONS.map((eq, i) => (
            <div
              key={i}
              className="eq-float absolute text-sm md:text-base"
              style={{
                top: `${5 + (i * 7) % 90}%`,
                left: `${(i * 13 + 3) % 88}%`,
                transform: `rotate(${(i % 5 - 2) * 3}deg)`,
                animationDelay: `${i * 0.4}s`,
                fontSize: `${0.7 + (i % 4) * 0.15}rem`,
              }}
            >
              {eq}
            </div>
          ))}
        </div>

        {/* Radial gradient center glow */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,168,67,0.06) 0%, transparent 70%)"
        }} />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Logo ring */}
          <div className="flex justify-center mb-10">
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              {/* Rotating outer ring */}
              <div className="absolute inset-0 rounded-full border border-[#d4a843]/20 rotate-slow" />
              <div className="absolute inset-2 rounded-full border border-[#d4a843]/10 rotate-slow" style={{ animationDirection: "reverse", animationDuration: "20s" }} />
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#d4a843]/50 shadow-[0_0_40px_rgba(212,168,67,0.2)]">
                <Image src="/logo.png" alt="Mathematics Club Logo" fill className="object-cover" />
              </div>
            </div>
          </div>

          <p className="font-mono text-[#d4a843]/60 text-xs tracking-[0.3em] uppercase mb-3 animate-fadeUp">
            IIT (ISM) Dhanbad
          </p>

          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light leading-none mb-4 animate-fadeUp delay-100">
            <span className="text-[#e8e8e0] chalk-text">Mathe</span>
            <span className="gold-shimmer font-semibold">matics</span>
          </h1>

          <h2 className="font-display text-2xl md:text-3xl font-light text-[#e8e8e0]/60 tracking-[0.2em] uppercase mb-8 animate-fadeUp delay-200">
            Club
          </h2>

          <p className="font-sans text-base md:text-lg text-[#e8e8e0]/60 max-w-2xl mx-auto leading-relaxed mb-12 animate-fadeUp delay-300">
            A new dawn for mathematics at IIT(ISM). We are just starting out, but with boundless passion and a relentless drive, we are here to shake the college and achieve greatness.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeUp delay-400">
            <Link
              href="/about"
              className="inline-block px-8 py-3.5 bg-[#d4a843] text-[#0a1628] font-sans font-semibold text-sm tracking-widest uppercase hover:bg-[#f0d080] transition-colors duration-200 rounded-sm"
            >
              Explore Club
            </Link>
            <Link
              href="/events"
              className="inline-block px-8 py-3.5 border border-[#d4a843]/40 text-[#d4a843] font-sans text-sm tracking-widest uppercase hover:border-[#d4a843] hover:bg-[#d4a843]/5 transition-all duration-200 rounded-sm"
            >
              Upcoming Events
            </Link>
          </div>

          {/* Scroll hint */}
          <div className="mt-20 flex flex-col items-center gap-2 animate-fadeUp delay-600">
            <span className="font-mono text-[10px] text-[#e8e8e0]/30 tracking-widest uppercase">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-[#d4a843]/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="relative py-20 border-y border-[#d4a843]/10 bg-[#0d1f35]/50">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-4xl md:text-5xl font-semibold gold-shimmer mb-2">
                {s.value}
              </div>
              <div className="font-sans text-xs text-[#e8e8e0]/50 tracking-widest uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ABOUT TEASER ─── */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p className="font-mono text-[#d4a843]/60 text-xs tracking-[0.3em] uppercase mb-4">
              About Us
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-[#e8e8e0] leading-tight mb-6">
              A Society<br />
              <span className="text-[#d4a843] italic">Built on Proof</span>
            </h2>
            <p className="font-sans text-[#e8e8e0]/60 leading-relaxed mb-4">
              We are the newly minted Mathematics Club of IIT(ISM) Dhanbad. We might be just starting out with no past achievements to show off yet, but our vision is anything but small. We are fueled by an intense passion for numbers, logic, and discovery.
            </p>
            <p className="font-sans text-[#e8e8e0]/60 leading-relaxed mb-8">
              We are here to revolutionize how math is perceived on campus. With absolute dedication, we are gearing up to host incredible events, solve complex problems, and shake the college with our enthusiasm to do great things.
            </p>
            <Link
              href="/about"
              className="font-sans text-sm text-[#d4a843] tracking-widest uppercase hover:text-[#f0d080] transition-colors flex items-center gap-2 group"
            >
              Learn More
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
          </div>

          {/* Visual - formula board */}
          <div className="relative">
            <div className="border border-[#d4a843]/20 rounded-sm p-8 bg-[#0d1f35]/60 border-glow">
              <div className="font-mono text-xs text-[#d4a843]/40 mb-4 tracking-widest">// FEATURED THEOREM</div>
              <div className="font-display text-2xl text-[#e8e8e0] italic mb-2">Euler&apos;s Identity</div>
              <div className="font-display text-5xl text-center py-8 text-[#d4a843]">
                e<sup className="text-2xl">iπ</sup> + 1 = 0
              </div>
              <p className="font-sans text-xs text-[#e8e8e0]/40 leading-relaxed">
                Connecting five fundamental constants - e, i, π, 1, and 0 - in one breathtaking equation. Called the most beautiful formula in mathematics.
              </p>
              <div className="mt-6 section-divider" />
              <div className="mt-4 flex justify-between text-[#e8e8e0]/20 font-mono text-xs">
                <span>Leonhard Euler, 1748</span>
                <span>∴ Q.E.D.</span>
              </div>
            </div>

            {/* Decorative corner */}
            <div className="absolute -top-4 -right-4 w-16 h-16 border-t border-r border-[#d4a843]/30" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 border-b border-l border-[#d4a843]/30" />
          </div>
        </div>
      </section>

      {/* ─── UPCOMING EVENTS ─── */}
      <section className="py-24 px-6 bg-[#080f1e] relative overflow-hidden">
        <div className="pi-watermark" aria-hidden>π</div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-mono text-[#d4a843]/60 text-xs tracking-[0.3em] uppercase mb-3">
              What&apos;s Ahead
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-[#e8e8e0]">
              Upcoming <span className="text-[#d4a843] italic">Events</span>
            </h2>
          </div>

          {UPCOMING.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {UPCOMING.map((ev, i) => (
                <div
                  key={i}
                  className="border border-[#d4a843]/15 bg-[#0d1f35]/50 p-7 card-hover border-glow rounded-sm"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="font-mono text-[#d4a843] text-sm font-semibold tracking-widest">
                      {ev.date}
                    </div>
                    <span className="text-[10px] font-sans font-semibold tracking-widest uppercase text-[#d4a843]/50 border border-[#d4a843]/30 px-2 py-0.5 rounded-sm">
                      {ev.tag}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-[#e8e8e0] font-semibold mb-3">
                    {ev.title}
                  </h3>
                  <p className="font-sans text-sm text-[#e8e8e0]/50 leading-relaxed">
                    {ev.desc}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-[#d4a843]/10 bg-[#0d1f35]/30 rounded-sm">
              <p className="font-sans text-[#e8e8e0]/40 tracking-widest uppercase text-sm">
                No events for now. Check back later!
              </p>
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              href="/events"
              className="inline-block font-sans text-sm text-[#d4a843] tracking-widest uppercase hover:text-[#f0d080] transition-colors group"
            >
              View All Events{" "}
              <span className="group-hover:translate-x-1 inline-block transition-transform duration-200">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── QUOTE ROTATOR ─── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
          <div className="font-display text-[20rem] text-[#d4a843]/[0.02] leading-none select-none">&ldquo;</div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div
            key={quoteIdx}
            className="animate-fadeUp"
          >
            <blockquote className="font-display text-2xl md:text-3xl text-[#e8e8e0] italic leading-relaxed mb-6">
              &ldquo;{QUOTES[quoteIdx].text}&rdquo;
            </blockquote>
            <cite className="font-sans text-sm text-[#d4a843]/70 tracking-widest uppercase not-italic">
              - {QUOTES[quoteIdx].author}
            </cite>
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {QUOTES.map((_, i) => (
              <button
                key={i}
                onClick={() => setQuoteIdx(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === quoteIdx ? "bg-[#d4a843] w-4" : "bg-[#d4a843]/30"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── JOIN CTA ─── */}
      <section className="py-24 px-6 bg-[#0d1f35]/80 relative overflow-hidden">
        <div className="absolute inset-0 math-grid opacity-30" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="font-display text-5xl md:text-6xl font-light text-[#e8e8e0] mb-4">
            Ready to <span className="text-[#d4a843] italic">Join?</span>
          </h2>
          <p className="font-sans text-[#e8e8e0]/60 mb-10 leading-relaxed">
            Be part of the founding generation. Whether you live for differential equations or are just falling in love with mathematics, help us build a legacy from the ground up.
          </p>
          <Link
            href="/contact"
            className="inline-block px-12 py-4 bg-[#d4a843] text-[#0a1628] font-sans font-bold text-sm tracking-widest uppercase hover:bg-[#f0d080] transition-all duration-200 rounded-sm shadow-[0_0_40px_rgba(212,168,67,0.3)] hover:shadow-[0_0_60px_rgba(212,168,67,0.5)]"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </>
  );
}
