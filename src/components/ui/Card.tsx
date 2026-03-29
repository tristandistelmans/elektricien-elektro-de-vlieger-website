import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-border bg-bg p-6 ${
        hover
          ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
