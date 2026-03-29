"use client";

import { motion, useInView, animate, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { VideoHero } from "@/components/sections/VideoHero";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Marquee } from "@/components/ui/Marquee";
import { ArrowRight, Phone, Mail, MapPin, Clock, Star, Send } from "lucide-react";
import { InfiniteSlider } from "@/components/ui/InfiniteSlider";
import Image from "next/image";

/* ──────────────────────────────────────────────
   Animated Counter
   ────────────────────────────────────────────── */
function Counter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const ctrl = animate(0, value, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => ctrl.stop();
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-text">
        {display}
        <span className="text-primary">{suffix}</span>
      </p>
      <p className="mt-2 text-sm text-text-muted uppercase tracking-widest">{label}</p>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Fade-in wrapper
   ────────────────────────────────────────────── */
function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}) {
  const offsets = { up: { x: 0, y: 40 }, left: { x: -40, y: 0 }, right: { x: 40, y: 0 }, none: { x: 0, y: 0 } };
  const o = offsets[direction];
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: o.x, y: o.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Google Reviews Carousel (design-testimonial stijl)
   ────────────────────────────────────────────── */
function GoogleReviewsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const reviews = [
    {
      text: "Geweldige snelle service. Aanrader !!",
      author: "Phill T",
      role: "Google Review",
    },
    {
      text: "Fantastische vakmensen! Hebben onze renovatie van begin tot eind opgevolgd en werken uitgevoerd wanneer nodig! Ook hebben ze ons uit de nood geholpen bij defecte boiler; in de ochtend gebeld en diezelfde dag nog gemaakt. Echt een aanrader!",
      author: "Tom Mannaerts",
      role: "Google Review",
    },
  ];

  const goNext = () => setActiveIndex((prev) => (prev + 1) % reviews.length);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  useEffect(() => {
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = reviews[activeIndex];

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto px-6 lg:px-8">
      {/* Groot nummer op achtergrond */}
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

      {/* Content */}
      <div className="relative flex">
        {/* Links - verticale tekst */}
        <div className="hidden md:flex flex-col items-center justify-center pr-16 border-r border-border">
          <motion.span
            className="text-xs font-mono text-text-muted tracking-widest uppercase"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            Google Reviews
          </motion.span>
          <div className="relative h-32 w-px bg-border mt-8">
            <motion.div
              className="absolute top-0 left-0 w-full bg-primary origin-top"
              animate={{ height: `${((activeIndex + 1) / reviews.length) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        {/* Midden - review content */}
        <div className="flex-1 md:pl-16 py-12">
          {/* Sterren */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="mb-8 flex gap-1"
            >
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Quote met woord-voor-woord animatie */}
          <div className="relative mb-12 min-h-[180px] md:min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={activeIndex}
                className="text-3xl md:text-4xl lg:text-5xl font-light text-text leading-[1.15] tracking-tight"
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {current.text.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-[0.3em]"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] },
                      },
                      exit: { opacity: 0, y: -10, transition: { duration: 0.15, delay: i * 0.01 } },
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Auteur + navigatie */}
          <div className="flex items-end justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex items-center gap-4"
              >
                <motion.div
                  className="w-8 h-px bg-text"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  style={{ originX: 0 }}
                />
                <div>
                  <p className="text-base font-medium text-text">{current.author}</p>
                  <p className="text-sm text-text-muted">{current.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-4">
              <button
                onClick={goPrev}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-bg transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="text-text">
                  <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={goNext}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-bg transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="text-text">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */
const services = [
  {
    title: "Elektrische installaties",
    description: "Volledige aanleg en vernieuwing - van bekabeling tot afwerking, volgens de laatste normen.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=80",
  },
  {
    title: "Verdeelkasten",
    description: "Installatie en upgrade van uw verdeelkast zodat alles veilig en conform is.",
    image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=1200&q=80",
  },
  {
    title: "Domotica",
    description: "Smart home oplossingen - verlichting, verwarming en beveiliging vanuit uw smartphone.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&q=80",
  },
  {
    title: "Elektrische keuringen",
    description: "Officiele keuring bij verkoop, verhuur of na renovatie. Snel en correct afgehandeld.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80",
  },
  {
    title: "Verwarmingssystemen",
    description: "Elektrische vloerverwarming en warmtepompen - energiezuinig en comfortabel.",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1200&q=80",
  },
  {
    title: "Waterverwarming",
    description: "Boilers en waterverwarmers - advies op maat, installatie en onderhoud.",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=80",
  },
];

const projects = [
  { src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80", title: "Installatie - woning Sint-Job" },
  { src: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=600&q=80", title: "Verdeelkast - villa Brecht" },
  { src: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80", title: "Domotica - nieuwbouw Brasschaat" },
  { src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80", title: "Keuring - appartement Schoten" },
  { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", title: "Verlichting - kantoor Antwerpen" },
  { src: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80", title: "Boiler - renovatie Kapellen" },
  { src: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80", title: "Vloerverwarming - nieuwbouw Schilde" },
  { src: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80", title: "Bekabeling - renovatie Merksem" },
];

const testimonials = [
  {
    name: "Phill T",
    text: "Geweldige snelle service. Aanrader !!",
    role: "Google Review",
    rating: 5,
  },
  {
    name: "Tom Mannaerts",
    text: "Fantastische vakmensen! Hebben onze renovatie van begin tot eind opgevolgd en werken uitgevoerd wanneer nodig! Ook hebben ze ons uit de nood geholpen bij defecte boiler; in de ochtend gebeld en diezelfde dag nog gemaakt. Echt een aanrader!",
    role: "Google Review",
    rating: 5,
  },
];

const steps = [
  {
    num: "01",
    title: "Neem contact op",
    description: "Bel of mail ons met uw vraag. We luisteren naar uw wensen en plannen een vrijblijvend bezoek in.",
  },
  {
    num: "02",
    title: "Offerte op maat",
    description: "Na een grondige inspectie ontvangt u een duidelijke offerte. Geen verborgen kosten, geen verrassingen.",
  },
  {
    num: "03",
    title: "Vakkundige uitvoering",
    description: "We voeren het werk netjes en op tijd uit. U kunt rekenen op een proper resultaat en oplevering.",
  },
];

/* ──────────────────────────────────────────────
   Page
   ────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      {/* -- HEADER -- */}
      <NavBar />

      <main>
        {/* -- 1. HERO -- */}
        <VideoHero
          src="/img/hero-video.mp4"
          brandName="Electro Sterkens"
          tagline="Uw elektricien in Sint-Job-in-'t-Goor"
          cta={{ text: "Neem contact op", href: "#contact" }}
        />

        {/* -- 2. OVER ONS -- */}
        <section id="about" className="relative bg-bg py-24 md:py-36 overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Text */}
              <div>
                <Reveal>
                  <p className="text-sm uppercase tracking-[0.25em] text-primary font-medium mb-6">Over ons</p>
                </Reveal>
                <Reveal delay={0.1}>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1]">
                    Vakmanschap met{" "}
                    <span className="accent-italic text-primary">persoonlijke</span>{" "}
                    aanpak
                  </h2>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="mt-8 text-text-muted text-lg leading-relaxed max-w-xl">
                    Electro Sterkens is niet zomaar een elektricien. Johan Sterkens bouwde zijn bedrijf
                    op met een principe: persoonlijke service en vakmanschap. Elke klant krijgt dezelfde
                    aandacht - of het nu gaat om het vervangen van een stopcontact of de volledige
                    elektrische installatie van een nieuwbouw.
                  </p>
                </Reveal>
                <Reveal delay={0.3}>
                  <p className="mt-4 text-text-muted text-lg leading-relaxed max-w-xl">
                    Als geautoriseerd partner van <span className="text-text font-medium">BTicino</span> en{" "}
                    <span className="text-text font-medium">Legrand</span> werkt Johan uitsluitend met
                    kwaliteitsmaterialen. Geen compromissen.
                  </p>
                </Reveal>

                {/* Stats */}
                <Reveal delay={0.4}>
                  <div className="mt-14 grid grid-cols-3 gap-6">
                    <Counter value={20} suffix="+" label="Jaar ervaring" />
                    <Counter value={500} suffix="+" label="Klanten" />
                    <Counter value={24} suffix="u" label="Reactietijd" />
                  </div>
                </Reveal>
              </div>

              {/* Photo */}
              <Reveal direction="right" delay={0.2}>
                <div className="relative">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                    <Image
                      src="/img/johan-sterkens.jpg"
                      alt="Johan Sterkens"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  {/* Accent corner decoration */}
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-primary/30 rounded-2xl -z-10" />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* -- DIVIDER -- */}
        <SectionDivider direction="right" fillColor="#F8F8F6" className="bg-bg" />

        {/* -- 3. DIENSTEN -- horizontal carousel */}
        <section id="services" className="relative bg-bg-alt py-24 md:py-36">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-12">
            <Reveal>
              <p className="text-sm uppercase tracking-[0.25em] text-primary font-medium mb-4">Diensten</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                Wat we voor u doen
              </h2>
            </Reveal>
          </div>

          {/* Horizontal scroll carousel */}
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto px-6 lg:px-8 pb-8 snap-x snap-mandatory scrollbar-hide"
                 style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {services.map((service, i) => (
                <div
                  key={service.title}
                  className="flex-shrink-0 w-[340px] md:w-[400px] snap-start group cursor-pointer"
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-5">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-text tracking-tight uppercase mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -- DIVIDER -- */}
        <SectionDivider direction="left" fillColor="#F8F8F6" className="bg-bg-alt" />

        {/* -- 4. PROCES -- */}
        <section id="werkwijze" className="relative bg-bg-alt py-24 md:py-36">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal>
              <p className="text-sm uppercase tracking-[0.25em] text-primary font-medium mb-4">Werkwijze</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-20">
                Hoe we te werk gaan
              </h2>
            </Reveal>

            <div className="relative">
              <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-border" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                {steps.map((step, i) => (
                  <Reveal key={step.num} delay={0.15 * i}>
                    <div className="relative">
                      <div className="relative z-10 inline-flex items-center justify-center w-24 h-24 rounded-full border border-border bg-bg-alt mb-8">
                        <span className="text-3xl font-black text-primary">{step.num}</span>
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

        {/* -- DIVIDER -- */}
        <SectionDivider direction="right" fillColor="#FFFFFF" className="bg-bg-alt" />

        {/* -- 5. REALISATIES -- infinite slider */}
        <section id="realisaties" className="relative bg-bg py-24 md:py-36 overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-12">
            <Reveal>
              <p className="text-sm uppercase tracking-[0.25em] text-primary font-medium mb-4">Realisaties</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                Ons werk in beeld
              </h2>
            </Reveal>
          </div>

          <div className="flex flex-col gap-4">
            <InfiniteSlider direction="horizontal" duration={30} durationOnHover={60} gap={16}>
              {projects.slice(0, 4).map((project) => (
                <div key={project.title} className="relative w-[280px] md:w-[350px] aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer flex-shrink-0">
                  <img src={project.src} alt={project.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-sm font-bold text-white">{project.title}</p>
                  </div>
                </div>
              ))}
            </InfiniteSlider>
            <InfiniteSlider direction="horizontal" duration={35} durationOnHover={60} gap={16} reverse>
              {projects.slice(4).map((project) => (
                <div key={project.title} className="relative w-[280px] md:w-[350px] aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer flex-shrink-0">
                  <img src={project.src} alt={project.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-sm font-bold text-white">{project.title}</p>
                  </div>
                </div>
              ))}
            </InfiniteSlider>
          </div>
        </section>

        {/* -- DIVIDER -- */}
        <SectionDivider direction="left" fillColor="#F8F8F6" className="bg-bg" />

        {/* -- 6. TESTIMONIALS -- design carousel */}
        <section id="reviews" className="relative bg-bg-alt py-24 md:py-36">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
            <Reveal>
              <p className="text-sm uppercase tracking-[0.25em] text-primary font-medium mb-4">Recensies</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                Wat anderen zeggen
              </h2>
            </Reveal>
          </div>
          <GoogleReviewsCarousel />
        </section>

        {/* Simpele overgang - geen schuine divider, gewoon een subtiele lijn */}
        <div className="border-t border-border" />

        {/* -- 7. CONTACT -- */}
        <section id="contact" className="relative bg-bg-alt py-24 md:py-36">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal>
              <p className="text-sm uppercase tracking-[0.25em] text-primary font-medium mb-4">Contact</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-16">
                Vrijblijvend contact opnemen
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              {/* Left - Contact info */}
              <Reveal delay={0.2}>
                <div className="space-y-8">
                  <p className="text-text-muted text-lg leading-relaxed max-w-md">
                    Heeft u een vraag of wilt u een offerte? Bel ons of vul het formulier in.
                    We reageren binnen 24 uur.
                  </p>

                  <div className="space-y-6">
                    <a
                      href="tel:036364120"
                      className="flex items-center gap-4 text-text hover:text-primary transition-colors group"
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-full border border-border group-hover:border-primary/40 transition-colors">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-text-muted">Telefoon</p>
                        <p className="font-medium">03 636 41 20</p>
                      </div>
                    </a>

                    <a
                      href="mailto:johan@electrosterkens.be"
                      className="flex items-center gap-4 text-text hover:text-primary transition-colors group"
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-full border border-border group-hover:border-primary/40 transition-colors">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-text-muted">E-mail</p>
                        <p className="font-medium">johan@electrosterkens.be</p>
                      </div>
                    </a>

                    <div className="flex items-center gap-4 text-text">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full border border-border">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-text-muted">Adres</p>
                        <p className="font-medium">Meidoornlaan 21a</p>
                        <p className="text-text-muted">2960 Sint-Job-in-'t-Goor</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-text">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full border border-border">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-text-muted">Openingstijden</p>
                        <p className="font-medium">Ma - Vr: 08:00 - 12:00, 13:00 - 18:00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Right - Form */}
              <Reveal delay={0.3} direction="right">
                <form
                  className="space-y-8"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div>
                    <input
                      type="text"
                      placeholder="Uw naam"
                      className="input-underline"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Uw e-mailadres"
                      className="input-underline"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Uw telefoonnummer"
                      className="input-underline"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Uw bericht"
                      rows={4}
                      className="input-underline resize-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 bg-primary hover:bg-accent text-white font-semibold px-8 py-4 rounded-full transition-colors duration-300"
                  >
                    Verstuur
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              </Reveal>
            </div>

            {/* Google Maps */}
            <Reveal delay={0.2} className="mt-20">
              <div className="relative w-full overflow-hidden rounded-xl border border-border aspect-[21/9]">
                <iframe
                  title="Google Maps"
                  src={`https://www.google.com/maps?q=${encodeURIComponent("Meidoornlaan 21a, 2960 Sint-Job-in-'t-Goor, Belgium")}&output=embed`}
                  className="absolute inset-0 h-full w-full opacity-90"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* -- FOOTER -- */}
      <footer className="bg-bg-alt border-t border-border py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <p className="text-2xl lg:text-3xl font-black text-text tracking-tight">
                Electro Sterkens
              </p>
              <p className="mt-4 text-text-muted leading-relaxed max-w-sm">
                Uw elektricien in Sint-Job-in-'t-Goor en omstreken
              </p>
            </div>
            <div className="space-y-3 text-sm text-text-muted">
              <p>
                <a href="tel:036364120" className="hover:text-text transition-colors">
                  03 636 41 20
                </a>
              </p>
              <p>
                <a href="mailto:johan@electrosterkens.be" className="hover:text-text transition-colors">
                  johan@electrosterkens.be
                </a>
              </p>
              <p className="text-text-muted/60">
                Meidoornlaan 21a<br />
                2960 Sint-Job-in-'t-Goor
              </p>
              <p className="pt-2">
                <a
                  href="https://www.facebook.com/Electro.Sterkens.Brecht/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted/60 hover:text-text transition-colors"
                >
                  Facebook
                </a>
              </p>
            </div>
          </div>
          <div className="mt-16 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-text-muted/40">
            <p>&copy; {new Date().getFullYear()} Electro Sterkens</p>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ──────────────────────────────────────────────
   Navigation - light theme, minimal
   ────────────────────────────────────────────── */
function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const links = [
    { label: "Over", href: "#about" },
    { label: "Diensten", href: "#services" },
    { label: "Realisaties", href: "#realisaties" },
    { label: "Werkwijze", href: "#werkwijze" },
    { label: "Reviews", href: "#reviews" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-bg/90 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav className="flex items-center justify-between h-20 md:h-24">
            <a href="#" className="text-xl md:text-2xl font-black text-text tracking-tight relative z-50">
              Electro Sterkens
            </a>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-10">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative text-sm tracking-wide text-text-muted hover:text-text transition-colors duration-300 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-primary hover:bg-accent rounded-full transition-colors duration-300"
              >
                Contact
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center z-50"
              aria-label={mobileOpen ? "Menu sluiten" : "Menu openen"}
            >
              <div className="w-7 flex flex-col items-end gap-2">
                <motion.span
                  className="block h-[1.5px] bg-text origin-right"
                  animate={{
                    width: "28px",
                    rotate: mobileOpen ? -45 : 0,
                  }}
                  style={{ transformOrigin: "right center" }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="block h-[1.5px] bg-text origin-right"
                  animate={{
                    width: mobileOpen ? "28px" : "20px",
                    rotate: mobileOpen ? 45 : 0,
                  }}
                  style={{ transformOrigin: "right center" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <motion.div
          className="fixed inset-0 z-40 bg-bg md:hidden flex flex-col"
          initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex-1 flex flex-col justify-center px-8">
            <nav className="space-y-2">
              {[...links, { label: "Contact", href: "#contact" }].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-4xl sm:text-5xl font-bold text-text tracking-tight hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </nav>
            <motion.div
              className="mt-16 pt-8 border-t border-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <a href="tel:036364120" className="block text-lg text-text-muted hover:text-text transition-colors">
                03 636 41 20
              </a>
              <a href="mailto:johan@electrosterkens.be" className="block mt-2 text-lg text-text-muted hover:text-text transition-colors">
                johan@electrosterkens.be
              </a>
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
}
