import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";

function LenisBridge() {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    (window as any).__lenis = lenis;
    let unsubscribe: (() => void) | undefined;
    let cancelled = false;
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      if (cancelled) return;
      const update = () => ScrollTrigger.update();
      lenis.on("scroll", update);
      unsubscribe = () => lenis.off("scroll", update);
    });
    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, [lenis]);
  return null;
}

function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root autoRaf>
      <LenisBridge />
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;
