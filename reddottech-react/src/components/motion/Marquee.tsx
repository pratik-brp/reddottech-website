import type { ReactNode } from "react";

interface MarqueeProps {
  items: ReactNode[];
  reverse?: boolean;
  speed?: number;
  className?: string;
  itemClassName?: string;
}

export function Marquee({
  items,
  reverse = false,
  speed = 32,
  className = "",
  itemClassName = "",
}: MarqueeProps) {
  const row = [...items, ...items];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="animate-marquee flex w-max items-center gap-0 will-change-transform"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {row.map((item, idx) => (
          <div key={idx} className={`flex items-center ${itemClassName}`}>
            {item}
          </div>
        ))}
      </div>
      {/* Edge fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--color-background)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--color-background)] to-transparent" />
    </div>
  );
}
