"use client";

import { motion } from "framer-motion";

export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}) {
  const offsets = { up: { x: 0, y: 40 }, left: { x: -40, y: 0 }, right: { x: 40, y: 0 }, none: { x: 0, y: 0 } };
  const o = offsets[direction];
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: o.x, y: o.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
