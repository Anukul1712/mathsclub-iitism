"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a1628]/95 backdrop-blur-md border-b border-[#d4a843]/20 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#d4a843]/40 group-hover:border-[#d4a843] transition-all duration-300">
            <Image src="/logo.png" alt="Math Club Logo" fill className="object-cover" />
          </div>
          <div className="leading-tight">
            <div className="font-serif text-sm font-bold text-[#d4a843] tracking-widest uppercase">
              Math Club
            </div>
            <div className="font-sans text-[10px] text-[#e8e8e0]/50 tracking-wider uppercase">
              IIT(ISM) Dhanbad
            </div>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative nav-link font-sans text-sm tracking-wider uppercase transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-[#d4a843] active"
                    : "text-[#e8e8e0]/70 hover:text-[#e8e8e0]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#e8e8e0] hover:text-[#d4a843] transition-colors"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0d1f35]/98 backdrop-blur-md border-t border-[#d4a843]/20 px-6 py-6">
          <ul className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`font-sans text-sm tracking-wider uppercase ${
                    pathname === link.href
                      ? "text-[#d4a843]"
                      : "text-[#e8e8e0]/70"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
