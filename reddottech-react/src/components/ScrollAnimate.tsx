import { type ReactNode } from "react";

interface ScrollAnimateProps {
  children: ReactNode;
  className?: string;
}

export function ScrollAnimate({ children, className }: ScrollAnimateProps) {
  return <div className={className}>{children}</div>;
}
