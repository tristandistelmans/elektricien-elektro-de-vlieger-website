"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, animate } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  label,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl sm:text-5xl font-bold text-text tracking-tight">
        {prefix}
        {displayValue}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-text-muted">{label}</p>
    </div>
  );
}
