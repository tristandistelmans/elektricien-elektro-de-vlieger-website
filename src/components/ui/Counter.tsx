"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, animate } from "framer-motion";

export function Counter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
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
        <span className="text-accent">{suffix}</span>
      </p>
      <p className="mt-2 text-sm text-text-muted uppercase tracking-widest">{label}</p>
    </div>
  );
}
