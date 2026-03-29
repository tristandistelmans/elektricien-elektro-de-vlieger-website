"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ShadcnButton } from "@/components/ui/shadcn-button";

interface AnimatedHeroProps {
  backgroundImageUrl: string;
  logo: React.ReactNode;
  title: string;
  description: string;
  ctaButton: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const AnimatedHero = ({
  backgroundImageUrl,
  logo,
  title,
  description,
  ctaButton,
  secondaryCta,
  className,
}: AnimatedHeroProps) => {
  const glassButtonClassName =
    "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors";

  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden",
        className
      )}
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-start justify-center text-left px-6 md:px-12 max-w-4xl w-full text-white"
      >
        {/* Logo */}
        <motion.div variants={itemVariants} className="mb-8">
          {logo}
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-2xl text-lg leading-8 text-white/80"
        >
          {description}
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="mt-10 flex items-center gap-x-4"
        >
          <a href={ctaButton.href}>
            <ShadcnButton size="lg" className={glassButtonClassName}>
              {ctaButton.text}
            </ShadcnButton>
          </a>
          {secondaryCta && (
            <a href={secondaryCta.href}>
              <ShadcnButton size="lg" className={glassButtonClassName}>
                {secondaryCta.text}
              </ShadcnButton>
            </a>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};
