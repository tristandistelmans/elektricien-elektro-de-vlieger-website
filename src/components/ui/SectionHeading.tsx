"use client";

import { FadeInOnScroll } from "./FadeInOnScroll";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <FadeInOnScroll direction="up">
      <div className={`${alignClass} ${className}`}>
        <h2 className="text-3xl sm:text-4xl font-bold text-text tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-lg text-text-muted max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </FadeInOnScroll>
  );
}
