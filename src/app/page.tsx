"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";
import { ArrowRight, Star, X, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactLenis } from "lenis/react";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { InfiniteSlider } from "@/components/ui/InfiniteSlider";
import { DragCarousel } from "@/components/ui/DragCarousel";
import { ModernHero } from "@/components/ui/modern-hero";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { services, reviews, projects } from "@/lib/data";

/* ──────────────────────────────────────────────
   Service Grid with spotlight glow + detail overlay
   ────────────────────────────────────────────── */
const SERVICE_ICONS = [
  // Bliksem - Algemene elektriciteit
  <path key="0" strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />,
  // Zon - Zonnepanelen
  <path key="1" strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />,
  // Batterij - Thuisbatterij
  <><path key="2a" strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z" /><path key="2b" strokeLinecap="round" strokeLinejoin="round" d="M6.75 9.75l2.25 2.25-2.25 2.25m4.5 0h3" /></>,
  // Auto/laadpaal
  <path key="3" strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25V3.375c0-.621.504-1.125 1.125-1.125h9.75c.621 0 1.125.504 1.125 1.125v11.25m-12 0h12m0 0h2.25" />,
  // Smartphone - Domotica
  <path key="4" strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />,
  // Wind - Ventilatie
  <path key="5" strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />,
];

function ServiceGrid() {
  const [activeService, setActiveService] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setActiveService(null), []);

  useEffect(() => {
    document.body.style.overflow = activeService !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeService]);

  // Spotlight effect: track mouse position on the grid
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll<HTMLElement>("[data-service-card]");

    const handleMove = (e: PointerEvent) => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    };

    grid.addEventListener("pointermove", handleMove);
    return () => grid.removeEventListener("pointermove", handleMove);
  }, []);

  const active = activeService !== null ? services[activeService] : null;

  return (
    <>
      <section className="relative bg-bg-alt pt-16 sm:pt-24 pb-0">
        <div className="mx-auto max-w-full">
          {/* Header */}
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-center px-5 text-center md:px-10">
            <Reveal>
              <p className="text-sm uppercase tracking-[0.25em] text-accent font-medium mb-4">Diensten</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="max-w-3xl font-black text-5xl sm:text-6xl lg:text-8xl tracking-tight">
                Wat kunnen wij voor u betekenen?
              </h2>
            </Reveal>
          </div>

          {/* Gradient line */}
          <div className="max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-border to-transparent mt-14 mb-0" />

          {/* Grid - full width */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-dashed divide-border sm:divide-x">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={0.08 * i}>
                <button
                  data-service-card
                  onClick={() => setActiveService(i)}
                  className={`
                    relative flex flex-col gap-4 px-8 py-10 lg:px-12 lg:py-14 text-left w-full
                    border-b border-dashed border-border
                    ${i >= 3 ? "lg:border-t lg:border-b-0" : ""}
                    ${i >= 4 ? "sm:border-b-0" : ""}
                    ${i === 2 ? "lg:border-b-0" : ""}
                    ${i === 5 ? "border-b-0" : ""}
                    ${i === 3 || i === 4 || i === 5 ? "border-b-0" : ""}
                    group cursor-pointer
                    transition-colors duration-300
                    hover:bg-accent/[0.07]
                    overflow-hidden
                  `}
                >
                  {/* Spotlight glow */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "radial-gradient(250px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,199,54,0.12), transparent 80%)",
                    }}
                  />

                  <svg className="w-10 h-10 text-text/60 group-hover:text-accent transition-colors duration-300 relative z-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    {SERVICE_ICONS[i]}
                  </svg>
                  <div className="flex flex-col gap-2 pt-8 lg:pt-14 relative z-10">
                    <h3 className="font-bold text-2xl tracking-tight sm:text-3xl group-hover:text-accent transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-text-muted leading-relaxed">{service.shortDescription}</p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Detail overlay */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            onClick={close}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={close}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-md"
              >
                <X className="h-5 w-5 text-text" />
              </button>

              <div className="relative aspect-[16/9] md:aspect-[21/9]">
                <Image src={active.image} alt={active.title} fill className="object-cover" sizes="800px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-sm uppercase tracking-[0.25em] text-accent font-medium mb-2">Diensten</p>
                  <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">{active.title}</h3>
                </div>
              </div>

              <div className="p-6 md:p-10">
                <p className="text-text-muted text-lg leading-relaxed mb-8">{active.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {active.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-text leading-relaxed">{detail}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Link href={`/diensten/${active.slug}`} className="inline-flex items-center justify-center gap-2 bg-accent text-[#10113d] px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform" onClick={close}>
                    Meer over {active.title.toLowerCase()}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-border text-text px-6 py-3 rounded-full font-medium text-sm hover:border-accent hover:text-accent transition-colors" onClick={close}>
                    Offerte aanvragen
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ──────────────────────────────────────────────
   Google Reviews Carousel
   ────────────────────────────────────────────── */
function GoogleReviewsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = () => setActiveIndex((prev) => (prev + 1) % reviews.length);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  useEffect(() => {
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = reviews[activeIndex];

  return (
    <div className="relative w-full max-w-5xl mx-auto px-6 lg:px-8">
      <motion.div className="absolute -left-4 top-1/2 -translate-y-1/2 text-[20rem] md:text-[28rem] font-bold text-text/[0.03] select-none pointer-events-none leading-none tracking-tighter">
        <AnimatePresence mode="wait">
          <motion.span
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            {String(activeIndex + 1).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      <div className="relative flex">
        <div className="hidden md:flex flex-col items-center justify-center pr-16 border-r border-border">
          <motion.span className="text-xs font-mono text-text-muted tracking-widest uppercase" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
            Google Reviews
          </motion.span>
          <div className="relative h-32 w-px bg-border mt-8">
            <motion.div className="absolute top-0 left-0 w-full bg-accent origin-top" animate={{ height: `${((activeIndex + 1) / reviews.length) * 100}%` }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} />
          </div>
        </div>

        <div className="flex-1 md:pl-16 py-12">
          <AnimatePresence mode="wait">
            <motion.div key={activeIndex} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.4 }} className="mb-8 flex gap-1">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-accent text-accent" />
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="relative mb-12 min-h-[180px] md:min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.blockquote key={activeIndex} className="text-3xl md:text-4xl lg:text-5xl font-light text-text leading-[1.15] tracking-tight" initial="hidden" animate="visible" exit="exit">
                {current.text.split(" ").map((word, i) => (
                  <motion.span key={i} className="inline-block mr-[0.3em]" variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] } },
                    exit: { opacity: 0, y: -10, transition: { duration: 0.15, delay: i * 0.01 } },
                  }}>
                    {word}
                  </motion.span>
                ))}
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="flex items-end justify-between">
            <AnimatePresence mode="wait">
              <motion.div key={activeIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, delay: 0.2 }} className="flex items-center gap-4">
                <motion.div className="w-8 h-px bg-text" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.3 }} style={{ originX: 0 }} />
                <div>
                  <p className="text-base font-medium text-text">{current.author}</p>
                  <p className="text-sm text-text-muted">{current.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-4">
              <button onClick={goPrev} className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-bg-alt transition-colors">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="text-text"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button onClick={goNext} className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-bg-alt transition-colors">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="text-text"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Homepage
   ────────────────────────────────────────────── */
export default function Home() {
  return (
    <ReactLenis root>
      {/* -- 1. HERO -- */}
      <ModernHero />

      {/* geen divider tussen hero en over ons, gewoon rechte overgang */}

      {/* -- 2. OVER ONS -- */}
      <section className="relative bg-white py-24 md:py-36 overflow-hidden">
        {/* Full-width wavy marquee - hidden on mobile */}
        <div className="absolute inset-0 z-0 hidden lg:flex items-center pointer-events-none overflow-hidden">
          <svg viewBox="0 0 2200 200" className="w-[200%] h-[220px]" preserveAspectRatio="none">
            <defs>
              <path
                id="wave-marquee"
                fill="none"
                d="M-1100,100 S-733,20 -550,100 S-183,180 0,100 S367,20 550,100 S917,180 1100,100 S1467,20 1650,100 S2017,180 2200,100 S2567,20 2750,100 S3117,180 3300,100"
              />
            </defs>
            <text style={{ fontSize: "58px", fontWeight: 900, fontFamily: "var(--font-sans-custom), sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }} className="fill-[#10113d]/[0.05]">
              <textPath href="#wave-marquee">
                <animate attributeName="startOffset" from="0" to="-1100" dur="20s" repeatCount="indefinite" />
                ELEKTRICITEIT ZIT IN DE FAMILIE — ELEKTRICITEIT ZIT IN DE FAMILIE — ELEKTRICITEIT ZIT IN DE FAMILIE — ELEKTRICITEIT ZIT IN DE FAMILIE — ELEKTRICITEIT ZIT IN DE FAMILIE — ELEKTRICITEIT ZIT IN DE FAMILIE —
              </textPath>
            </text>
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <Reveal>
                <p className="text-sm uppercase tracking-[0.25em] text-accent font-medium mb-6">Over ons</p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-8 text-text-muted text-lg leading-relaxed max-w-xl">
                  Robbe De Vlieger groeide op tussen de kabels en verdeelkasten. Met meer dan
                  14 jaar ervaring en een team van 3 vakmensen staat Elektro De Vlieger voor
                  betrouwbaarheid, netheid en persoonlijke service.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <Link href="/over-ons" className="mt-8 group inline-flex items-center gap-2 text-text font-medium hover:text-accent transition-colors">
                  Lees ons verhaal
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="mt-14 grid grid-cols-3 gap-6">
                  <Counter value={14} suffix="+" label="Jaar ervaring" />
                  <Counter value={3} suffix="" label="Vakmensen" />
                  <Counter value={9} suffix="/10" label="Klantscore" />
                </div>
              </Reveal>
            </div>

            <Reveal direction="right" delay={0.2}>
              <div className="relative w-[85%] ml-auto">
                <div
                  className="relative aspect-[4/5] w-full overflow-hidden"
                  style={{ borderRadius: "50% 50% 0 0 / 30% 30% 0 0" }}
                >
                  <Image
                    src="/images/robbe.png"
                    alt="Robbe De Vlieger"
                    fill
                    className="object-cover"
                    style={{ objectPosition: "50% 20%" }}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* divider: wit → off-white */}
      <SectionDivider direction="wavy" fillColor="#F8F8F6" className="bg-white" />

      {/* -- 3. DIENSTEN (grid) -- */}
      <ServiceGrid />

      {/* divider: off-white → off-white (decoratief) */}
      <SectionDivider direction="wavy" fillColor="#FFFFFF" className="bg-bg-alt" />

      {/* -- 4. WERKWIJZE -- */}
      <section className="relative bg-white py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.25em] text-accent font-medium mb-4">Werkwijze</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl sm:text-5xl md:text-[4.5vw] font-black tracking-tight mb-20">
              Hoe we te werk gaan
            </h2>
          </Reveal>

          <div className="relative">
            <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-border" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {[
                { num: "01", title: "Neem contact op", description: "Bel, mail of stuur een WhatsApp. Robbe luistert naar uw wensen en plant een vrijblijvend bezoek ter plaatse." },
                { num: "02", title: "Offerte op maat", description: "Na een grondige inspectie ontvangt u een duidelijke offerte. Transparant en zonder verborgen kosten." },
                { num: "03", title: "Vakkundige uitvoering", description: "Het werk wordt netjes en op tijd uitgevoerd. Proper resultaat, duidelijke communicatie en oplevering tot in de puntjes." },
              ].map((step, i) => (
                <Reveal key={step.num} delay={0.15 * i}>
                  <div className="relative">
                    <div className="relative z-10 inline-flex items-center justify-center w-24 h-24 rounded-full border border-border bg-white mb-8">
                      <span className="text-3xl font-black text-accent">{step.num}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-text mb-3">{step.title}</h3>
                    <p className="text-text-muted leading-relaxed max-w-sm">{step.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* divider: wit → off-white */}
      <SectionDivider direction="wavy" fillColor="#F8F8F6" className="bg-white" />

      {/* -- 5. REALISATIES (infinite slider) -- */}
      <section className="relative bg-bg-alt py-24 md:py-36 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-12">
          <div className="flex items-end justify-between">
            <div>
              <Reveal>
                <p className="text-sm uppercase tracking-[0.25em] text-accent font-medium mb-4">Realisaties</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-4xl sm:text-5xl md:text-[4.5vw] font-black tracking-tight">
                  Ons werk in beeld
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <Link href="/realisaties" className="hidden md:inline-flex items-center gap-2 text-text font-medium hover:text-accent transition-colors">
                Alle realisaties
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <InfiniteSlider direction="horizontal" duration={30} durationOnHover={60} gap={16}>
            {projects.slice(0, 6).map((project) => (
              <div key={project.title} className="relative w-[280px] md:w-[350px] aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer flex-shrink-0">
                <Image src={project.src} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="350px" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-sm font-bold text-white">{project.title}</p>
                </div>
              </div>
            ))}
          </InfiniteSlider>
          <InfiniteSlider direction="horizontal" duration={35} durationOnHover={60} gap={16} reverse>
            {projects.slice(6).map((project) => (
              <div key={project.title} className="relative w-[280px] md:w-[350px] aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer flex-shrink-0">
                <Image src={project.src} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="350px" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-sm font-bold text-white">{project.title}</p>
                </div>
              </div>
            ))}
          </InfiniteSlider>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-8 md:hidden">
          <Link href="/realisaties" className="inline-flex items-center gap-2 text-text font-medium hover:text-accent transition-colors">
            Alle realisaties bekijken
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* divider: off-white → wit */}
      <SectionDivider direction="wavy" fillColor="#FFFFFF" className="bg-bg-alt" />

      {/* -- 6. REVIEWS -- */}
      <section className="relative bg-white py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
          <div className="flex items-end justify-between">
            <div>
              <Reveal>
                <p className="text-sm uppercase tracking-[0.25em] text-accent font-medium mb-4">Recensies</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-4xl sm:text-5xl md:text-[4.5vw] font-black tracking-tight">
                  Wat klanten zeggen
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <Link href="/recensies" className="hidden md:inline-flex items-center gap-2 text-text font-medium hover:text-accent transition-colors">
                Alle recensies
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
        <GoogleReviewsCarousel />
      </section>

      {/* divider: wit → navy */}
      <SectionDivider direction="wavy" fillColor="#10113d" className="bg-white" />

      {/* -- 7. CTA -- */}
      <section className="bg-[#10113d] py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-6">
              Klaar om te starten?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-white/60 text-lg max-w-xl mx-auto mb-10">
              Neem vrijblijvend contact op voor advies of een offerte op maat.
              Robbe staat persoonlijk voor u klaar.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-[#FFC736] px-8 py-4 text-sm font-bold text-[#10113d] transition-all duration-300 hover:scale-105"
            >
              Neem contact op
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </ReactLenis>
  );
}
