"use client";

import { motion } from "framer-motion";
import { Container, Button } from "@/components/ui";
import type { ClientConfig, HeroData } from "@/types/client";

interface HeroProps {
  data: HeroData;
  variant: string;
  config: ClientConfig;
}

/**
 * Splits a headline so that one keyword gets wrapped in <span class="font-serif italic">.
 * Picks the last "meaningful" word (skipping short words like in, de, het, van, voor, uw, je).
 */
function renderHeadlineWithSerif(headline: string) {
  const skip = new Set([
    "in", "de", "het", "van", "voor", "uw", "je", "en", "of", "op", "te", "een", "met",
  ]);
  const words = headline.split(" ");
  // Find last word longer than 3 chars that isn't in skip list
  let targetIdx = -1;
  for (let i = words.length - 1; i >= 0; i--) {
    if (words[i].length > 3 && !skip.has(words[i].toLowerCase())) {
      targetIdx = i;
      break;
    }
  }
  // Fallback: just use the last word
  if (targetIdx === -1) targetIdx = words.length - 1;

  return (
    <>
      {words.map((word, i) => (
        <span key={i}>
          {i === targetIdx ? (
            <span className="font-serif italic">{word}</span>
          ) : (
            word
          )}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

// Stagger animation config
const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const easeOut: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easeOut,
    },
  },
};

function AsymmetricImage({ data, config }: HeroProps) {
  return (
    <section id="hero" className="relative py-24 lg:py-32 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center min-h-[75vh]">
          {/* Text — left side, 5 columns */}
          <motion.div
            className="lg:col-span-5 space-y-8"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-3 text-sm tracking-widest uppercase text-text-muted">
                <span className="w-10 h-px bg-primary" />
                {config.business.region}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-text leading-[0.95] tracking-tight"
            >
              {renderHeadlineWithSerif(data.headline)}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-text-muted leading-relaxed max-w-md"
            >
              {data.subline}
            </motion.p>

            <motion.div variants={fadeUp}>
              <Button href={data.cta.href} size="lg">
                {data.cta.text}
              </Button>
            </motion.div>
          </motion.div>

          {/* Image — right side, 7 columns, overflows */}
          <motion.div
            className="lg:col-span-7 relative"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.9,
              ease: easeOut,
              delay: 0.3,
            }}
          >
            <div className="relative lg:-mr-20 xl:-mr-28">
              <div className="aspect-[3/4] lg:aspect-[4/5] overflow-hidden rounded-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.image || "https://picsum.photos/800/1000?random=1"}
                  alt={config.business.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="hidden lg:flex justify-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs tracking-widest uppercase text-text-muted/50">
              Scroll
            </span>
            <motion.div
              className="w-px h-12 bg-text-muted/30 origin-top"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{
                delay: 1.5,
                duration: 0.8,
                ease: easeOut,
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 0.5,
              }}
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function FullBleed({ data, config }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-end overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.image || "https://picsum.photos/1600/900?random=1"}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      </div>

      <Container className="relative z-10 pb-20 lg:pb-32 pt-48">
        <motion.div
          className="max-w-3xl"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-3 text-sm tracking-widest uppercase text-white/50">
              <span className="w-10 h-px bg-white/30" />
              {config.business.region}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-8 text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight"
          >
            {renderHeadlineWithSerif(data.headline)}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 text-lg md:text-xl text-white/70 leading-relaxed max-w-lg"
          >
            {data.subline}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10">
            <a
              href={data.cta.href}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-black bg-white rounded-full hover:bg-white/90 transition-colors duration-300"
            >
              {data.cta.text}
            </a>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          className="w-px h-16 bg-white/30 origin-top"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{
            delay: 1.5,
            duration: 0.8,
            ease: easeOut,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0.5,
          }}
        />
      </motion.div>
    </section>
  );
}

function Split({ data, config }: HeroProps) {
  return (
    <section id="hero" className="relative py-24 lg:py-0 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Text side */}
        <div className="flex items-center">
          <motion.div
            className="px-6 sm:px-12 lg:px-16 xl:px-24 py-24 lg:py-32 max-w-2xl ml-auto space-y-8"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-3 text-sm tracking-widest uppercase text-text-muted">
                <span className="w-10 h-px bg-primary" />
                {config.business.region}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl xl:text-7xl font-bold text-text leading-[0.95] tracking-tight"
            >
              {renderHeadlineWithSerif(data.headline)}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg text-text-muted leading-relaxed max-w-md"
            >
              {data.subline}
            </motion.p>

            <motion.div variants={fadeUp}>
              <Button href={data.cta.href} size="lg">
                {data.cta.text}
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Image side — full height with offset */}
        <motion.div
          className="relative lg:h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.9,
            ease: easeOut,
            delay: 0.2,
          }}
        >
          <div className="h-[60vh] lg:h-full lg:pt-12 lg:pb-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.image || "https://picsum.photos/800/1200?random=1"}
              alt={config.business.name}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Hero(props: HeroProps) {
  switch (props.variant) {
    case "full-bleed":
      return <FullBleed {...props} />;
    case "split":
      return <Split {...props} />;
    case "asymmetric-image":
    default:
      return <AsymmetricImage {...props} />;
  }
}
