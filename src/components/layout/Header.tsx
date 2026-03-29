"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui";
import type { ClientConfig, Section } from "@/types/client";

const easeOut: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

interface HeaderProps {
  config: ClientConfig;
}

const sectionLabels: Record<string, string> = {
  hero: "",
  services: "Diensten",
  about: "Over",
  howItWorks: "Werkwijze",
  gallery: "Realisaties",
  testimonials: "Reviews",
  contact: "Contact",
  pricing: "Prijzen",
  faq: "FAQ",
  menu: "Menu",
};

function getSectionId(type: string): string {
  return type === "howItWorks" ? "werkwijze" : type;
}

// Only show main navigation items, not all sections
const mainNavTypes = ["services", "about", "contact"];

export function Header({ config }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Filter to main nav links only
  const navItems = config.sections
    .filter(
      (s: Section) =>
        mainNavTypes.includes(s.type) && sectionLabels[s.type] !== ""
    )
    .map((s: Section) => ({
      label: sectionLabels[s.type] || s.type,
      href: `#${getSectionId(s.type)}`,
      type: s.type,
    }));

  // Separate CTA (contact) from regular links
  const navLinks = navItems.filter((item) => item.type !== "contact");
  const contactItem = navItems.find((item) => item.type === "contact");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Stagger animation for mobile menu items
  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.08,
        duration: 0.4,
        ease: easeOut,
      },
    }),
    exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-bg/90 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <Container>
          <nav className="flex items-center justify-between h-20 md:h-24">
            {/* Logo / Business name — serif for elegance */}
            <a
              href="#"
              className="font-serif text-xl md:text-2xl text-text tracking-tight relative z-50"
            >
              {config.business.name}
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative text-sm tracking-wide text-text-muted hover:text-text transition-colors duration-300 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 hover:after:w-full after:bg-text after:transition-all after:duration-300"
                >
                  {item.label}
                </a>
              ))}
              {contactItem && (
                <a
                  href={contactItem.href}
                  className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-bg bg-text rounded-full hover:bg-text/90 transition-colors duration-300"
                >
                  {contactItem.label}
                </a>
              )}
            </div>

            {/* Mobile hamburger — simple 2-line design */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center z-50"
              aria-label={mobileOpen ? "Menu sluiten" : "Menu openen"}
            >
              <div className="w-7 flex flex-col items-end gap-2">
                <motion.span
                  className="block h-[1.5px] bg-text origin-right"
                  animate={{
                    width: mobileOpen ? "28px" : "28px",
                    rotate: mobileOpen ? -45 : 0,
                    y: mobileOpen ? 0 : 0,
                    x: mobileOpen ? 0 : 0,
                  }}
                  style={{ transformOrigin: "right center" }}
                  transition={{ duration: 0.3, ease: easeOut }}
                />
                <motion.span
                  className="block h-[1.5px] bg-text origin-right"
                  animate={{
                    width: mobileOpen ? "28px" : "20px",
                    rotate: mobileOpen ? 45 : 0,
                    y: mobileOpen ? 0 : 0,
                    x: mobileOpen ? 0 : 0,
                  }}
                  style={{ transformOrigin: "right center" }}
                  transition={{ duration: 0.3, ease: easeOut }}
                />
              </div>
            </button>
          </nav>
        </Container>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-bg md:hidden flex flex-col"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{
              duration: 0.5,
              ease: easeOut,
            }}
          >
            <div className="flex-1 flex flex-col justify-center px-8">
              <nav className="space-y-2">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    custom={i}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <a
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 text-4xl sm:text-5xl font-bold text-text tracking-tight hover:text-primary transition-colors duration-300"
                    >
                      {item.label}
                    </a>
                  </motion.div>
                ))}
              </nav>

              {/* Contact info at bottom of mobile menu */}
              <motion.div
                className="mt-16 pt-8 border-t border-border"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                {config.business.phone && (
                  <a
                    href={`tel:${config.business.phone.replace(/\s/g, "")}`}
                    className="block text-lg text-text-muted hover:text-text transition-colors"
                  >
                    {config.business.phone}
                  </a>
                )}
                {config.business.email && (
                  <a
                    href={`mailto:${config.business.email}`}
                    className="block mt-2 text-lg text-text-muted hover:text-text transition-colors"
                  >
                    {config.business.email}
                  </a>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
