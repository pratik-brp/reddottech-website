import { useEffect, useRef, type ReactNode, type ElementType } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "scale";
  delay?: number;
  threshold?: number;
  as?: ElementType;
}

/**
 * Lightweight scroll-triggered reveal wrapper.
 * Uses IntersectionObserver to add a `.visible` class when the element enters viewport.
 * CSS transitions in styles.css handle the animation (`.reveal` → `.reveal.visible`).
 */
export function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  threshold = 0.05,
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if element is already visible in viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "50px 0px -20px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const directionClass =
    direction === "left"
      ? "reveal-left"
      : direction === "right"
        ? "reveal-right"
        : direction === "scale"
          ? "reveal-scale"
          : "";

  return (
    <Tag
      ref={ref}
      className={`reveal ${directionClass} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
}

/**
 * Container that staggers its direct `.reveal` children via CSS (`.reveal-stagger`).
 */
export function RevealGroup({ children, className = "" }: RevealGroupProps) {
  return <div className={`reveal-stagger ${className}`}>{children}</div>;
}
