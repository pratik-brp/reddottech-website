import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const displayedValRef = useRef<number>(0);
  const hasAnimatedRef = useRef<boolean>(false);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targetVal = Number(value) || 0;

    // Prefers reduced motion: directly display the value without animation
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.textContent = `${prefix}${targetVal.toFixed(decimals)}${suffix}`;
      displayedValRef.current = targetVal;
      hasAnimatedRef.current = true;
      return;
    }

    const animateTransition = (fromVal: number, toVal: number) => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }

      if (fromVal === toVal) {
        el.textContent = `${prefix}${toVal.toFixed(decimals)}${suffix}`;
        displayedValRef.current = toVal;
        return;
      }

      const duration = 1200; // ms
      const startTime = performance.now();

      const update = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing: easeOutCubic
        const ease = 1 - Math.pow(1 - progress, 3);
        const currentVal = fromVal + (toVal - fromVal) * ease;

        if (el) {
          el.textContent = `${prefix}${currentVal.toFixed(decimals)}${suffix}`;
        }
        displayedValRef.current = currentVal;

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(update);
        } else {
          if (el) {
            el.textContent = `${prefix}${toVal.toFixed(decimals)}${suffix}`;
          }
          displayedValRef.current = toVal;
          animFrameRef.current = null;
        }
      };

      animFrameRef.current = requestAnimationFrame(update);
    };

    // If the counter has already appeared and animated once, smoothly transition from current to new value
    if (hasAnimatedRef.current) {
      animateTransition(displayedValRef.current, targetVal);
      return () => {
        if (animFrameRef.current !== null) {
          cancelAnimationFrame(animFrameRef.current);
          animFrameRef.current = null;
        }
      };
    }

    if (typeof IntersectionObserver === "undefined") {
      hasAnimatedRef.current = true;
      animateTransition(0, targetVal);
      return () => {
        if (animFrameRef.current !== null) {
          cancelAnimationFrame(animFrameRef.current);
          animFrameRef.current = null;
        }
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hasAnimatedRef.current = true;
          animateTransition(displayedValRef.current, targetVal);
          observer.disconnect();
        }
      },
      { rootMargin: "50px" },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [value, decimals, prefix, suffix]);

  return (
    <span ref={ref} className={className} suppressHydrationWarning>
      {prefix}
      {(Number(value) || 0).toFixed(decimals)}
      {suffix}
    </span>
  );
}
