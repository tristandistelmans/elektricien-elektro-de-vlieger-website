"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Container, StarRating, FadeInOnScroll } from "@/components/ui";
import type { ClientConfig, TestimonialsData } from "@/types/client";

interface TestimonialsProps {
  data: TestimonialsData;
  variant: string;
  config: ClientConfig;
}

function Stacked({ data }: TestimonialsProps) {
  return (
    <section id="testimonials" className="py-24 lg:py-32">
      <Container>
        <div className="max-w-4xl">
          {/* Large decorative quotation mark */}
          <div className="relative">
            <span
              className="absolute -top-20 -left-4 text-[180px] leading-none font-serif text-primary/[0.07] select-none pointer-events-none"
              aria-hidden="true"
            >
              &ldquo;
            </span>
          </div>

          <FadeInOnScroll direction="none">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted mb-10">
              Wat klanten zeggen
            </p>
          </FadeInOnScroll>

          <div className="space-y-0">
            {data.testimonials.slice(0, 3).map((t, i) => (
              <FadeInOnScroll key={i} delay={i * 0.15} direction="none">
                <div
                  className={`py-10 ${
                    i > 0 ? "border-t border-border" : ""
                  }`}
                >
                  <p className="text-xl lg:text-2xl text-text leading-relaxed font-light">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <div>
                      <p className="text-sm font-semibold text-text">
                        {t.name}
                      </p>
                      {t.role && (
                        <p className="text-sm text-text-muted mt-0.5">
                          {t.role}
                        </p>
                      )}
                    </div>
                    {t.rating && (
                      <div className="ml-auto">
                        <StarRating rating={t.rating} />
                      </div>
                    )}
                  </div>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Featured({ data }: TestimonialsProps) {
  const [first, ...rest] = data.testimonials;

  return (
    <section id="testimonials" className="py-24 lg:py-32">
      <Container>
        <FadeInOnScroll direction="none">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted mb-12">
            Wat klanten zeggen
          </p>
        </FadeInOnScroll>

        {/* Large featured testimonial */}
        {first && (
          <FadeInOnScroll direction="none" delay={0.1}>
            <div className="relative mb-16 pb-16 border-b border-border">
              {/* Decorative serif quote */}
              <span
                className="absolute -top-16 -left-2 text-[140px] leading-none font-serif text-primary/[0.08] select-none pointer-events-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p className="text-2xl lg:text-3xl xl:text-4xl text-text leading-[1.4] font-light max-w-4xl">
                &ldquo;{first.text}&rdquo;
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div>
                  <p className="font-semibold text-text">{first.name}</p>
                  {first.role && (
                    <p className="text-sm text-text-muted mt-0.5">
                      {first.role}
                    </p>
                  )}
                </div>
                {first.rating && (
                  <div className="ml-4">
                    <StarRating rating={first.rating} />
                  </div>
                )}
              </div>
            </div>
          </FadeInOnScroll>
        )}

        {/* Smaller testimonials side by side */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {rest.slice(0, 2).map((t, i) => (
              <FadeInOnScroll key={i} direction="none" delay={0.2 + i * 0.1}>
                <div>
                  <p className="text-lg text-text leading-relaxed font-light">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-5 flex items-center gap-4">
                    <div>
                      <p className="text-sm font-semibold text-text">
                        {t.name}
                      </p>
                      {t.role && (
                        <p className="text-xs text-text-muted mt-0.5">
                          {t.role}
                        </p>
                      )}
                    </div>
                    {t.rating && (
                      <div className="ml-auto">
                        <StarRating rating={t.rating} />
                      </div>
                    )}
                  </div>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

function CarouselVariant({ data }: TestimonialsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = data.testimonials.length;

  const updateActiveIndex = useCallback(() => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const cardWidth = scrollRef.current.scrollWidth / totalSlides;
    setActiveIndex(Math.round(scrollLeft / cardWidth));
  }, [totalSlides]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateActiveIndex, { passive: true });
    return () => el.removeEventListener("scroll", updateActiveIndex);
  }, [updateActiveIndex]);

  const scrollTo = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.scrollWidth / totalSlides;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section id="testimonials" className="py-24 lg:py-32">
      <Container>
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted mb-4">
              Wat klanten zeggen
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-text tracking-tight">
              Ervaringen van{" "}
              <span className="font-serif italic font-normal">klanten</span>
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => scrollTo("left")}
              className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-text-muted hover:text-text hover:border-text transition-all duration-200"
              aria-label="Vorige"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => scrollTo("right")}
              className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-text-muted hover:text-text hover:border-text transition-all duration-200"
              aria-label="Volgende"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </Container>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 lg:px-8 pb-4 no-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {data.testimonials.map((t, i) => (
          <motion.div
            key={i}
            className="shrink-0 w-[85vw] sm:w-[50vw] lg:w-[38vw] snap-start"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="h-full p-8 md:p-10 border border-border rounded-lg flex flex-col">
              {t.rating && (
                <div className="mb-6">
                  <StarRating rating={t.rating} />
                </div>
              )}
              <p className="text-lg text-text leading-relaxed font-light flex-1">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm font-semibold text-text">{t.name}</p>
                {t.role && (
                  <p className="text-xs text-text-muted mt-1">{t.role}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Indicator dots */}
      <Container>
        <div className="flex justify-center sm:justify-start gap-2 mt-8">
          {data.testimonials.map((_, i) => (
            <button
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-8 bg-primary"
                  : "w-1.5 bg-text-muted/30"
              }`}
              onClick={() => {
                if (!scrollRef.current) return;
                const cardWidth =
                  scrollRef.current.scrollWidth / totalSlides;
                scrollRef.current.scrollTo({
                  left: cardWidth * i,
                  behavior: "smooth",
                });
              }}
              aria-label={`Ga naar review ${i + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Testimonials(props: TestimonialsProps) {
  switch (props.variant) {
    case "featured":
      return <Featured {...props} />;
    case "carousel":
      return <CarouselVariant {...props} />;
    case "stacked":
    default:
      return <Stacked {...props} />;
  }
}
