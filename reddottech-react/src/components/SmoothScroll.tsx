import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";

function LenisBridge() {
  const lenis = useLenis();
  useEffect(() => {
    (window as any).__lenis = lenis;
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
