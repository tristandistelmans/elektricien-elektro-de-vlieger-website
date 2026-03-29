"use client";

import { motion } from "framer-motion";
import { Container, FadeInOnScroll } from "@/components/ui";
import type { ClientConfig, HowItWorksData } from "@/types/client";

interface HowItWorksProps {
  data: HowItWorksData;
  variant: string;
  config: ClientConfig;
}

export function HowItWorks({ data }: HowItWorksProps) {
  return (
    <section id="werkwijze" className="py-24 lg:py-32">
      <Container>
        <FadeInOnScroll direction="none">
          <div className="text-center mb-20 lg:mb-28">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted mb-6">
              Werkwijze
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text tracking-tight leading-[1.05]">
              Hoe werkt{" "}
              <span className="font-serif italic font-normal">het?</span>
            </h2>
          </div>
        </FadeInOnScroll>

        <div className="max-w-5xl mx-auto relative">
          {/* Thin connecting line — centered on desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          {/* Mobile connecting line — left side */}
          <div className="lg:hidden absolute left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-20 lg:space-y-28">
            {data.steps.map((step, i) => {
              const isEven = i % 2 === 1;

              return (
                <motion.div
                  key={i}
                  className="relative"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                >
                  {/* Desktop: alternating layout */}
                  <div
                    className={`hidden lg:grid lg:grid-cols-2 lg:gap-20 items-center ${
                      isEven ? "" : ""
                    }`}
                  >
                    {/* Left side */}
                    <div
                      className={`${isEven ? "lg:order-2" : "lg:order-1"} ${
                        isEven ? "lg:pl-20" : "lg:text-right lg:pr-20"
                      }`}
                    >
                      {/* Large decorative number */}
                      <span className="text-[120px] leading-none font-serif text-primary/[0.08] select-none block mb-[-40px]">
                        {String(step.number).padStart(2, "0")}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-semibold text-text tracking-tight">
                        {step.title}
                      </h3>
                      <p className="mt-4 text-text-muted leading-[1.8] max-w-md inline-block">
                        {step.description}
                      </p>
                    </div>

                    {/* Right side — empty for visual balance */}
                    <div
                      className={`${
                        isEven ? "lg:order-1" : "lg:order-2"
                      }`}
                    />

                    {/* Center dot on the line */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary border-4 border-bg z-10" />
                  </div>

                  {/* Mobile: vertical layout */}
                  <div className="lg:hidden flex gap-8 pl-0">
                    {/* Dot on the line */}
                    <div className="relative shrink-0">
                      <div className="w-[17px] h-[17px] rounded-full bg-primary border-4 border-bg ml-[0.5px]" />
                    </div>

                    <div className="pt-[-2px] flex-1">
                      <span className="text-7xl leading-none font-serif text-primary/[0.08] select-none block mb-[-20px]">
                        {String(step.number).padStart(2, "0")}
                      </span>
                      <h3 className="text-xl font-semibold text-text tracking-tight">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-text-muted leading-[1.8]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
