interface SectionDividerProps {
  direction?: "left" | "right" | "wavy";
  fillColor?: string;
  className?: string;
}

export function SectionDivider({
  direction = "wavy",
  fillColor = "#F8F8F6",
  className = "",
}: SectionDividerProps) {
  const paths: Record<string, string> = {
    left: "M0,80 L1440,0 L1440,80 Z",
    right: "M0,0 L1440,80 L0,80 Z",
    wavy: "M0,50 C180,80 360,20 540,50 C720,80 900,20 1080,50 C1260,80 1440,20 1440,50 L1440,80 L0,80 Z",
  };

  return (
    <div className={`relative w-full -my-px ${className}`}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="block w-full h-[4vw] min-h-[30px] max-h-[80px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={paths[direction]} fill={fillColor} />
      </svg>
    </div>
  );
}
