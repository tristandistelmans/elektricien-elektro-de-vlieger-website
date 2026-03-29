"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const NAV_ITEMS = [
  {
    label: "Diensten",
    href: "/diensten",
    hasDropdown: true,
    items: [
      { label: "Algemene elektriciteit", href: "/diensten/algemene-elektriciteit" },
      { label: "Zonnepanelen", href: "/diensten/zonnepanelen" },
      { label: "Thuisbatterij", href: "/diensten/thuisbatterij" },
      { label: "Laadpalen", href: "/diensten/laadpalen" },
      { label: "Domotica", href: "/diensten/domotica" },
      { label: "Ventilatie", href: "/diensten/ventilatie" },
    ],
  },
  { label: "Over ons", href: "/over-ons" },
  { label: "Realisaties", href: "/realisaties" },
  { label: "Reviews", href: "/recensies" },
];

export function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 px-6 py-4 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="relative z-50 flex-shrink-0">
          <Image
            src="/images/logo.png"
            alt="Elektro De Vlieger"
            width={180}
            height={45}
            className={`w-[130px] md:w-[170px] h-auto transition-all duration-300 ${
              scrolled ? "" : "brightness-0 invert"
            }`}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-sans tracking-widest uppercase">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-1 transition-colors ${
                  scrolled ? "text-text-muted hover:text-text" : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="h-3.5 w-3.5" />}
              </Link>
              {item.hasDropdown && item.items && (
                <AnimatePresence>
                  {activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 min-w-[220px] rounded-lg shadow-lg py-2 bg-white border border-border"
                    >
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="block px-4 py-2.5 text-sm normal-case tracking-wide text-text-muted transition-colors hover:text-accent hover:bg-bg-alt"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          href="/contact"
          className={`hidden md:flex items-center gap-2 px-6 py-2 border font-sans text-xs tracking-widest uppercase transition-all duration-300 ${
            scrolled
              ? "border-[#FFC736] text-[#10113d] bg-[#FFC736] hover:bg-[#e6b42f]"
              : "border-white/50 text-white hover:bg-white hover:text-text"
          }`}
        >
          Contact
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>

        {/* Mobile menu button */}
        <button
          className={`md:hidden relative z-50 text-xl p-2 ${scrolled ? "text-text" : "text-white"}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Menu sluiten" : "Menu openen"}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border shadow-lg"
            >
              <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                <Image
                  src="/images/logo.png"
                  alt="Elektro De Vlieger"
                  width={140}
                  height={35}
                  className="w-[120px] h-auto"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-text text-xl"
                  aria-label="Menu sluiten"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="max-w-7xl mx-auto px-6 pb-6">
                <div className="grid gap-4 font-sans tracking-widest uppercase text-sm">
                  {NAV_ITEMS.map((item) => (
                    <div key={item.label}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-text hover:text-accent transition-colors py-1"
                      >
                        {item.label}
                      </Link>
                      {item.hasDropdown && item.items && (
                        <div className="pl-4 mt-2 space-y-2">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block text-text-muted hover:text-accent transition-colors text-xs normal-case tracking-wide"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="mt-2 inline-flex justify-center px-6 py-3 border border-[#FFC736] text-[#10113d] bg-[#FFC736] hover:bg-[#e6b42f] transition-all duration-300 text-xs tracking-widest uppercase"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
