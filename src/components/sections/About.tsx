"use client";

import { motion } from "framer-motion";
import { Container, FadeInOnScroll, AnimatedCounter } from "@/components/ui";
import type { ClientConfig, AboutData } from "@/types/client";

interface AboutProps {
  data: AboutData;
  variant: string;
  config: ClientConfig;
}

function Story({ data, config }: AboutProps) {
  const paragraphs = data.text.split("\n\n").filter(Boolean);

  return (
    <section id="about" className="py-24 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">
          {/* Image — 7 columns, slightly offset */}
          <FadeInOnScroll direction="left" className="lg:col-span-7">
            <div className="relative lg:-ml-8">
              <div className="aspect-[4/5] lg:aspect-[3/4] rounded-lg overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.image || "https://picsum.photos/800/1000?random=20"}
                  alt={`${config.business.owner.firstName} ${config.business.owner.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </FadeInOnScroll>

          {/* Text — 5 columns */}
          <div className="lg:col-span-5 lg:pl-16">
            <FadeInOnScroll direction="none" delay={0.1}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted mb-6">
                Over ons
              </p>
            </FadeInOnScroll>

            <FadeInOnScroll direction="none" delay={0.2}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text tracking-tight leading-[1.05]">
                {data.title.split(" ").map((word, i, arr) =>
                  i === arr.length - 1 ? (
                    <span key={i} className="font-serif italic font-normal">
                      {word}
                    </span>
                  ) : (
                    <span key={i}>{word} </span>
                  )
                )}
              </h2>
            </FadeInOnScroll>

            <div className="mt-8 space-y-5">
              {paragraphs.map((paragraph, i) => (
                <FadeInOnScroll key={i} direction="none" delay={0.3 + i * 0.1}>
                  <p className="text-text-muted leading-[1.8] text-base">
                    {paragraph}
                  </p>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function StatsRow({ data, config }: AboutProps) {
  const paragraphs = data.text.split("\n\n").filter(Boolean);

  return (
    <section id="about" className="py-24 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Image — 5 columns with accent line decoration */}
          <FadeInOnScroll direction="left" className="lg:col-span-5">
            <div className="relative">
              {/* Thin accent-colored line behind the image */}
              <div className="absolute -top-4 -left-4 w-full h-full border border-primary/30 rounded-lg" />
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.image || "https://picsum.photos/600/750?random=20"}
                  alt={`${config.business.owner.firstName} ${config.business.owner.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </FadeInOnScroll>

          {/* Text + stats — 7 columns */}
          <div className="lg:col-span-7 lg:pt-8">
            <FadeInOnScroll direction="none" delay={0.1}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted mb-6">
                Over ons
              </p>
            </FadeInOnScroll>

            <FadeInOnScroll direction="none" delay={0.2}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text tracking-tight leading-[1.05]">
                {data.title.split(" ").map((word, i, arr) =>
                  i === arr.length - 1 ? (
                    <span key={i} className="font-serif italic font-normal">
                      {word}
                    </span>
                  ) : (
                    <span key={i}>{word} </span>
                  )
                )}
              </h2>
            </FadeInOnScroll>

            <div className="mt-8 space-y-5">
              {paragraphs.map((paragraph, i) => (
                <FadeInOnScroll key={i} direction="none" delay={0.3 + i * 0.1}>
                  <p className="text-text-muted leading-[1.8] text-base max-w-xl">
                    {paragraph}
                  </p>
                </FadeInOnScroll>
              ))}
            </div>

            {/* Stats row — separated by thin vertical borders */}
            {data.stats && data.stats.length > 0 && (
              <FadeInOnScroll direction="up" delay={0.4}>
                <div className="mt-12 pt-10 border-t border-border">
                  <div className="flex flex-wrap">
                    {data.stats.map((stat, i) => (
                      <motion.div
                        key={i}
                        className={`flex-1 min-w-[120px] ${
                          i > 0 ? "border-l border-border pl-8" : ""
                        } ${i < (data.stats?.length ?? 0) - 1 ? "pr-8" : ""}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                      >
                        <p className="text-3xl md:text-4xl font-bold text-text tracking-tight">
                          {stat.value}
                        </p>
                        <p className="mt-1 text-sm text-text-muted">
                          {stat.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </FadeInOnScroll>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function About(props: AboutProps) {
  switch (props.variant) {
    case "story":
      return <Story {...props} />;
    case "stats-row":
    default:
      return <StatsRow {...props} />;
  }
}
