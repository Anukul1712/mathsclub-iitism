import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-[#080f1e] border-t border-[#d4a843]/20 overflow-hidden">
      {/* Pi watermark */}
      <div className="pi-watermark" aria-hidden>π</div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#d4a843]/40">
                <Image src="/logo.png" alt="Logo" fill className="object-cover" />
              </div>
              <div>
                <div className="font-serif text-[#d4a843] font-bold tracking-widest uppercase text-sm">
                  Mathematics Club
                </div>
                <div className="font-sans text-[#e8e8e0]/50 text-xs tracking-wider uppercase">
                  IIT(ISM) Dhanbad
                </div>
              </div>
            </div>
            <p className="font-sans text-sm text-[#e8e8e0]/50 leading-relaxed max-w-xs">
              Where equations breathe and infinity finds its form. Dedicated to the pursuit of mathematical truth since our founding.
            </p>
            {/* Social icons */}
            <div className="flex gap-4 mt-6">
              {["Instagram", "LinkedIn", "Twitter"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 rounded border border-[#d4a843]/30 flex items-center justify-center text-[#d4a843]/60 hover:border-[#d4a843] hover:text-[#d4a843] transition-all duration-200 text-xs font-mono"
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif text-[#d4a843] text-sm font-semibold tracking-widest uppercase mb-5">
              Navigate
            </h4>
            <ul className="space-y-3">
              {[
                ["Home", "/"],
                ["About", "/about"],
                ["Events", "/events"],
                ["Team", "/team"],
                ["Resources", "/resources"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="font-sans text-sm text-[#e8e8e0]/60 hover:text-[#d4a843] transition-colors duration-200 tracking-wide"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-[#d4a843] text-sm font-semibold tracking-widest uppercase mb-5">
              Find Us
            </h4>
            <address className="not-italic font-sans text-sm text-[#e8e8e0]/50 leading-relaxed space-y-2">
              <p>Mathematics Department</p>
              <p>IIT (ISM) Dhanbad</p>
              <p>Jharkhand - 826 004, India</p>
              <p className="pt-2">
                <a href="mailto:mathsclub@iitism.ac.in" className="text-[#d4a843]/70 hover:text-[#d4a843] transition-colors">
                  mathsclub@iitism.ac.in
                </a>
              </p>
            </address>

            {/* Equations easter egg */}
            <div className="mt-6 font-mono text-xs text-[#d4a843]/30 space-y-1">
              <div>e<sup>iπ</sup> + 1 = 0</div>
              <div>∫₋∞^∞ e<sup>-x²</sup>dx = √π</div>
            </div>
          </div>
        </div>

        <div className="section-divider my-10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-[#e8e8e0]/30 tracking-wider">
            © {new Date().getFullYear()} Mathematics Club, IIT(ISM) Dhanbad. All rights reserved.
          </p>
          <p className="font-mono text-xs text-[#d4a843]/30">
            π ≈ 3.14159265358979…
          </p>
        </div>
      </div>
    </footer>
  );
}
