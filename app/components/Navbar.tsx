"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/trajets", label: "Trajets" },
  { href: "/comment", label: "Comment ça marche" },
  { href: "/villes", label: "Villes" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav
      style={{ backgroundColor: "#162F5A" }}
      className="fixed top-0 left-0 right-0 z-50 shadow-md"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span
            style={{ backgroundColor: "#F5A623" }}
            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm"
          >
            JW
          </span>
          <span className="text-white font-bold text-xl tracking-wide">
            Jid Wadaag
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                pathname === l.href
                  ? "text-[#F5A623]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            style={{ backgroundColor: "#F5A623" }}
            className="px-5 py-2 rounded-full text-white font-semibold text-sm hover:opacity-90 transition"
          >
            Télécharger l&apos;app
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-2"
          aria-label="Menu"
        >
          <div className="w-6 h-0.5 bg-white mb-1.5" />
          <div className="w-6 h-0.5 bg-white mb-1.5" />
          <div className="w-6 h-0.5 bg-white" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ backgroundColor: "#1B4F8A" }} className="md:hidden px-6 pb-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block py-3 text-sm font-medium border-b border-white/10 ${
                pathname === l.href ? "text-[#F5A623]" : "text-white/80"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            style={{ backgroundColor: "#F5A623" }}
            className="mt-4 block text-center px-5 py-3 rounded-full text-white font-semibold text-sm"
          >
            Télécharger l&apos;app
          </Link>
        </div>
      )}
    </nav>
  );
}
