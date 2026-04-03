"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Construct a mailto link with the form data
      const mailtoLink = `mailto:mathsclub@iitism.ac.in?subject=${encodeURIComponent(
        form.subject
      )}&body=${encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
      )}`;

      // Open the user's default email client
      window.location.href = mailtoLink;
      
      // Show success message
      setSent(true);
    } catch (error) {
      alert("An error occurred while preparing the message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Header */}
      <section className="pt-36 pb-20 px-6 relative overflow-hidden math-grid">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 80% at 50% 0%, rgba(212,168,67,0.07) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="font-mono text-[#d4a843]/60 text-xs tracking-[0.3em] uppercase mb-4">Reach Out</p>
          <h1 className="font-display text-6xl md:text-8xl font-light text-[#e8e8e0] leading-tight mb-6">
            Get in<br /><span className="text-[#d4a843] italic">Touch</span>
          </h1>
          <div className="section-divider w-32 mb-8" />
          <p className="font-sans text-lg text-[#e8e8e0]/60 max-w-2xl leading-relaxed">
            Whether you want to join, collaborate, invite us to your event, or just talk mathematics - we&apos;re always listening.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { id: "name", label: "Your Name", type: "text", placeholder: "Leonhard Euler" },
                  { id: "email", label: "Email Address", type: "email", placeholder: "you@iitism.ac.in" },
                  { id: "subject", label: "Subject", type: "text", placeholder: "I want to join / Collaboration / ..." },
                ].map((f) => (
                  <div key={f.id}>
                    <label className="block font-mono text-[10px] text-[#d4a843]/60 tracking-widest uppercase mb-2">
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      value={form[f.id as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                      placeholder={f.placeholder}
                      required
                      className="w-full bg-[#0d1f35]/60 border border-[#d4a843]/20 text-[#e8e8e0] placeholder-[#e8e8e0]/20 font-sans text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-[#d4a843]/60 transition-colors"
                    />
                  </div>
                ))}

                <div>
                  <label className="block font-mono text-[10px] text-[#d4a843]/60 tracking-widest uppercase mb-2">
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    placeholder="Tell us what's on your mind..."
                    required
                    className="w-full bg-[#0d1f35]/60 border border-[#d4a843]/20 text-[#e8e8e0] placeholder-[#e8e8e0]/20 font-sans text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-[#d4a843]/60 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#d4a843] text-[#0a1628] font-sans font-bold text-sm tracking-widest uppercase py-4 hover:bg-[#f0d080] transition-colors rounded-sm shadow-[0_0_30px_rgba(212,168,67,0.2)] disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            ) : (
              <div className="border border-[#d4a843]/30 bg-[#0d1f35]/60 p-10 text-center border-glow rounded-sm">
                <div className="font-display text-6xl text-[#d4a843] mb-4">✓</div>
                <h3 className="font-serif text-2xl text-[#e8e8e0] mb-3">Message Sent!</h3>
                <p className="font-sans text-sm text-[#e8e8e0]/50 leading-relaxed">
                  Thank you for reaching out. We&apos;ll get back to you within 48 hours.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="mt-6 font-sans text-xs text-[#d4a843] tracking-widest uppercase hover:text-[#f0d080] transition-colors"
                >
                  Send another →
                </button>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-8">
            {[
              { icon: "📍", label: "Location", value: "Mathematics Department, IIT(ISM) Dhanbad, Jharkhand - 826 004" },
              { icon: "✉️", label: "Email", value: "mathsclub@iitism.ac.in" },
              { icon: "🌐", label: "Social Media", value: "@mathsclub.iitism on Instagram" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="text-2xl mt-0.5">{item.icon}</div>
                <div>
                  <div className="font-mono text-[10px] text-[#d4a843]/60 tracking-widest uppercase mb-1">{item.label}</div>
                  <div className="font-sans text-sm text-[#e8e8e0]/60 leading-relaxed whitespace-pre-line">{item.value}</div>
                </div>
              </div>
            ))}

            {/* FAQ */}
            <div className="border-t border-[#d4a843]/15 pt-8">
              <h3 className="font-serif text-lg text-[#e8e8e0] font-semibold mb-5">
                Frequently Asked
              </h3>
              <div className="space-y-4">
                {[
                  { q: "Who can join?", a: "Any student of IIT(ISM) Dhanbad - any year, any branch." },
                  { q: "Is there a membership fee?", a: "No fee. All activities are free for registered members." },
                  { q: "How do I join?", a: "Fill the form above or reach out via email." },
                ].map((faq, i) => (
                  <div key={i} className="border border-[#d4a843]/10 bg-[#0d1f35]/30 p-4 rounded-sm">
                    <div className="font-serif text-[#e8e8e0] text-sm font-semibold mb-1">{faq.q}</div>
                    <div className="font-sans text-xs text-[#e8e8e0]/50 leading-relaxed">{faq.a}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
