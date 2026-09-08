import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ElevaraLogoMark } from "./ui/ElevaraLogo";
import { Menu, X } from "lucide-react";
import { motion } from "motion/react";

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <ElevaraLogoMark size={32} />
      <span className="text-lg font-bold text-white tracking-tight">
        Elevara
      </span>
    </div>
  );
}

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <nav
      className="sticky top-0 z-50 border-b border-white/10 shadow-lg"
      style={{
        background: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(20px) saturate(1.8)",
        WebkitBackdropFilter: "blur(20px) saturate(1.8)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {[
            { label: "Features", href: "#features" },
            { label: "How It Works", href: "#how-it-works" },
            { label: "For Seekers", href: "#for-seekers" },
            { label: "For Recruiters", href: "#for-recruiters" },
            { label: "FAQ", href: "#faq" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-medium text-white/70 hover:text-white px-4 py-2 rounded-lg transition-colors"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="text-sm font-semibold text-white bg-gradient-to-r from-[#0d1b2a] to-[#06B6D4] px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            Get started free
          </Link>
        </div>
        {/* Mobile button */}
        <button
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="md:hidden p-2 text-white/70 hover:text-white hover:bg-[#0f172a]/10 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-white/10 px-6 py-5 space-y-1"
          style={{
            background: "rgba(15, 23, 42, 0.85)",
            backdropFilter: "blur(20px)",
          }}
        >
          {[
            "Features",
            "How It Works",
            "For Seekers",
            "For Recruiters",
            "FAQ",
          ].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-white/70 hover:text-white hover:bg-[#0f172a]/10 py-2.5 px-3 rounded-lg transition-all"
            >
              {item}
            </a>
          ))}
          <div className="flex gap-3 pt-4 border-t border-white/10 mt-4">
            <Link
              to="/login"
              className="flex-1 text-center text-sm font-medium text-white/70 border border-white/20 py-2 rounded-lg hover:bg-[#0f172a]/10 transition-colors"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="flex-1 text-center text-sm font-semibold text-white bg-gradient-to-r from-[#0d1b2a] to-[#06B6D4] py-2 rounded-lg"
            >
              Get started
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}




