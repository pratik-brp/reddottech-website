import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface SplitRevealProps {
  children: ReactNode;
  className?: string;
  mode?: "lines" | "words" | "chars";
  delay?: number;
  stagger?: number;
}

function splitWords(text: string) {
  return text.split(" ").map((w, i) => ({ text: w, key: i }));
}

export function SplitReveal({
  children,
  className = "",
  mode = "words",
  delay = 0,
  stagger = 0.045,
}: SplitRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.fromTo(
        el.querySelectorAll<HTMLElement>(".sr-unit"),
        { yPercent: 120, opacity: 0, rotate: 4 },
        {
          yPercent: 0,
          opacity: 1,
          rotate: 0,
          duration: 1,
          stagger,
          delay,
          ease: "power4.out",
        },
      );
    },
    { scope: ref },
  );

  // Only run split logic for string children
  if (typeof children !== "string") {
    return (
      <span ref={ref} className={className}>
        {children}
      </span>
    );
  }

  const units = splitWords(children);

  return (
    <span ref={ref} className={className}>
      {units.map((u) => (
        <span
          key={u.key}
          className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom"
        >
          <span className="sr-unit inline-block will-change-transform">{u.text}</span>
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </span>
  );
}
