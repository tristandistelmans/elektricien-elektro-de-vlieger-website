"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container, FadeInOnScroll } from "@/components/ui";
import type { ClientConfig, ServicesData } from "@/types/client";

const easeOut: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

interface ServicesProps {
  data: ServicesData;
  variant: string;
  config: ClientConfig;
}

/**
 * Renders section heading with one keyword in serif italic
 */
function SectionTitle({ text }: { text: string }) {
  const words = text.split(" ");
  // If single word, just use serif italic on it
  if (words.length === 1) {
    return (
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text tracking-tight leading-[0.95]">
        <span className="font-serif italic">{text}</span>
      </h2>
    );
  }
  // Put last word in serif italic
  const main = words.slice(0, -1).join(" ");
  const accent = words[words.length - 1];
  return (
    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text tracking-tight leading-[0.95]">
      {main}{" "}
      <span className="font-serif italic">{accent}</span>
    </h2>
  );
}

function TwoColumnList({ data }: ServicesProps) {
  return (
    <section id="services" className="py-24 lg:py-32">
      <Container>
        <FadeInOnScroll>
          <SectionTitle text="Onze diensten" />
        </FadeInOnScroll>

        <div className="mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
          {data.services.map((service, i) => (
            <FadeInOnScroll key={i} delay={i * 0.08}>
              <div className="border-t border-border pt-6 pb-10">
                <span className="block text-xs font-mono text-text-muted/40 mb-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl lg:text-2xl font-semibold text-text tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-3 text-text-muted leading-relaxed max-w-md">
                  {service.description}
                </p>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}

function BentoGrid({ data }: ServicesProps) {
  const services = data.services;

  return (
    <section id="services" className="py-24 lg:py-32">
      <Container>
        <FadeInOnScroll>
          <SectionTitle text="Onze diensten" />
        </FadeInOnScroll>

        <div className="mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {services.map((service, i) => {
            // First item spans 2 cols, second-to-last also spans 2 cols for asymmetry
            const isLarge = i === 0;
            const isWide =
              i === services.length - 1 && services.length % 3 !== 0;

            return (
              <FadeInOnScroll key={i} delay={i * 0.06}>
                <div
                  className={`group relative p-8 lg:p-10 rounded-sm bg-text/[0.02] hover:bg-text/[0.05] transition-colors duration-500 ${
                    isLarge
                      ? "sm:col-span-2 lg:col-span-2 lg:row-span-2 flex flex-col justify-end lg:p-14"
                      : isWide
                        ? "sm:col-span-2 lg:col-span-2"
                        : ""
                  }`}
                >
                  <span className="block text-xs font-mono text-text-muted/30 mb-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className={`font-semibold text-text tracking-tight ${
                      isLarge
                        ? "text-2xl lg:text-3xl"
                        : "text-xl lg:text-2xl"
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`mt-4 text-text-muted leading-relaxed ${
                      isLarge ? "max-w-lg text-lg" : "max-w-sm"
                    }`}
                  >
                    {service.description}
                  </p>
                </div>
              </FadeInOnScroll>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function Accordion({ data }: ServicesProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="services" className="py-24 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left — sticky heading */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <FadeInOnScroll>
                <SectionTitle text="Onze diensten" />
              </FadeInOnScroll>
              <FadeInOnScroll delay={0.1}>
                <p className="mt-6 text-text-muted leading-relaxed max-w-sm">
                  Een overzicht van wat we voor u kunnen betekenen.
                </p>
              </FadeInOnScroll>
            </div>
          </div>

          {/* Right — accordion */}
          <div className="lg:col-span-7">
            <div>
              {data.services.map((service, i) => {
                const isOpen = openIndex === i;
                return (
                  <FadeInOnScroll key={i} delay={i * 0.06}>
                    <div className="border-t border-border">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : i)}
                        className="flex items-center justify-between w-full text-left py-7 group"
                      >
                        <div className="flex items-baseline gap-6">
                          <span className="text-xs font-mono text-text-muted/40 tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`text-xl lg:text-2xl font-semibold tracking-tight transition-colors duration-300 ${
                              isOpen
                                ? "text-text"
                                : "text-text-muted group-hover:text-text"
                            }`}
                          >
                            {service.title}
                          </span>
                        </div>

                        {/* Plus/minus toggle */}
                        <div className="relative w-6 h-6 shrink-0 ml-8">
                          <motion.span
                            className="absolute top-1/2 left-0 w-full h-px bg-text-muted"
                            style={{ translateY: "-50%" }}
                          />
                          <motion.span
                            className="absolute top-1/2 left-0 w-full h-px bg-text-muted"
                            animate={{ rotate: isOpen ? 0 : 90 }}
                            transition={{
                              duration: 0.3,
                              ease: easeOut,
                            }}
                            style={{ translateY: "-50%" }}
                          />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              height: {
                                duration: 0.4,
                                ease: easeOut,
                              },
                              opacity: { duration: 0.3, delay: 0.1 },
                            }}
                            className="overflow-hidden"
                          >
                            <p className="pb-8 pl-12 lg:pl-[4.5rem] text-text-muted leading-relaxed max-w-lg">
                              {service.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </FadeInOnScroll>
                );
              })}
              {/* Bottom border for last item */}
              <div className="border-t border-border" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Services(props: ServicesProps) {
  switch (props.variant) {
    case "bento-grid":
      return <BentoGrid {...props} />;
    case "accordion":
      return <Accordion {...props} />;
    case "two-column-list":
    default:
      return <TwoColumnList {...props} />;
  }
}
