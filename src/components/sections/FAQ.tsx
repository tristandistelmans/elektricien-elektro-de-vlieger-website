"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container, FadeInOnScroll } from "@/components/ui";
import type { ClientConfig, FAQData } from "@/types/client";

interface FAQProps {
  data: FAQData;
  variant: string;
  config: ClientConfig;
}

export function FAQ({ data }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Heading — left column, sticky on desktop */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            <FadeInOnScroll direction="none">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted mb-6">
                FAQ
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-text tracking-tight leading-[1.05]">
                Veelgestelde{" "}
                <span className="font-serif italic font-normal">vragen</span>
              </h2>
              <p className="mt-6 text-text-muted leading-relaxed">
                Vind hier het antwoord op de meest voorkomende vragen. Staat uw
                vraag er niet bij? Neem gerust contact op.
              </p>
            </FadeInOnScroll>
          </div>

          {/* Accordion — right column */}
          <div className="lg:col-span-8">
            <div>
              {data.items.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <FadeInOnScroll key={i} direction="none" delay={i * 0.05}>
                    <div
                      className={`${
                        i > 0 ? "border-t border-border" : ""
                      }`}
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : i)}
                        className="flex items-center justify-between w-full text-left py-7 group gap-6"
                      >
                        <span className="text-lg font-medium text-text group-hover:text-primary transition-colors duration-200">
                          {item.question}
                        </span>
                        <motion.div
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors duration-200"
                        >
                          <svg
                            className="w-3.5 h-3.5 text-text-muted group-hover:text-primary transition-colors duration-200"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                        </motion.div>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              height: { duration: 0.35, ease: "easeInOut" },
                              opacity: { duration: 0.25, delay: isOpen ? 0.1 : 0 },
                            }}
                            className="overflow-hidden"
                          >
                            <p className="pb-7 text-text-muted leading-[1.8] max-w-2xl pr-14">
                              {item.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </FadeInOnScroll>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
