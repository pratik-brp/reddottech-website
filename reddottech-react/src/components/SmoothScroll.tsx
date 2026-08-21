import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";

declare global {
  interface Window {
    __lenis?: unknown;
  }
}

function LenisBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    window.__lenis = lenis;

    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.replace("#", "");
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          (lenis as any).scrollTo(targetEl, { offset: -90, duration: 1.1 });
        }
      }
    };

    // Multi-stage check to handle layout shifts / image loads gracefully
    const t1 = setTimeout(handleHashScroll, 80);
    const t2 = setTimeout(handleHashScroll, 300);
    const t3 = setTimeout(handleHashScroll, 600);

    window.addEventListener("hashchange", handleHashScroll);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("hashchange", handleHashScroll);
      if (window.__lenis === lenis) {
        delete window.__lenis;
      }
    };
  }, [lenis]);

  return null;
}

/**
 * Ultra-performance Smooth Scroll Provider.
 * Optimized with lightweight interpolation, zero forced layout thrashing,
 * and native touch pass-through so mobile and desktop both run at buttery 60/120fps.
 */
function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 0.9,
        smoothWheel: true,
        syncTouch: false, // Prevents touch lag on mobile/tablets
        touchMultiplier: 1,
        wheelMultiplier: 1,
        autoRaf: true,
      }}
    >
      <LenisBridge />
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;
