import { ReactLenis } from "lenis/react";
import { type ReactNode } from "react";

function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      onInit={(lenis) => {
        (window as any).__lenis = lenis;
      }}
    >
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;
