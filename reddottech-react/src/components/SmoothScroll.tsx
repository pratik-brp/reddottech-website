import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";

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

function NativeMobileHashScroll() {
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.replace("#", "");
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          const navHeight = 80;
          const top = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    };

    const t1 = setTimeout(handleHashScroll, 100);
    window.addEventListener("hashchange", handleHashScroll);

    return () => {
      clearTimeout(t1);
      window.removeEventListener("hashchange", handleHashScroll);
    };
  }, []);

  return null;
}

/**
 * Ultra-performance Smooth Scroll Provider.
 * - On mobile/touch devices: Uses 100% native momentum scrolling (0ms input latency, no scroll trapping).
 * - On desktop: Enables silky mouse-wheel interpolation via Lenis.
 */
function SmoothScroll({ children }: { children: ReactNode }) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches ||
        window.innerWidth < 1024);

    setIsTouchDevice(Boolean(isTouch));
  }, []);

  if (isTouchDevice) {
    return (
      <>
        <NativeMobileHashScroll />
        {children}
      </>
    );
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 0.9,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1,
        wheelMultiplier: 1,
        autoRaf: true,
        allowNestedScroll: true,
      }}
    >
      <LenisBridge />
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;
