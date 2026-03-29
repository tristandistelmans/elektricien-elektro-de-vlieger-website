"use client";

interface MarqueeProps {
  text: string;
  speed?: number;
  className?: string;
}

export function Marquee({ text, speed = 20, className = "" }: MarqueeProps) {
  const repeated = Array.from({ length: 8 }, () => text).join(" \u2014 ");

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className="inline-block animate-marquee"
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        <span className="inline-block pr-12">{repeated} &mdash;&nbsp;</span>
        <span className="inline-block pr-12">{repeated} &mdash;&nbsp;</span>
      </div>
    </div>
  );
}
