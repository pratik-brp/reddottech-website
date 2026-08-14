import { useEffect, useRef, type ReactNode, type MouseEvent } from "react";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export function Magnetic({ children, strength = 0.35, className = "" }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const setTransform = (x: number, y: number) => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const onMouseEnter = () => {
    const el = ref.current;
    if (!el) return;
    rectRef.current = el.getBoundingClientRect();
    el.style.transition = "none";
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = rectRef.current;
    if (!rect) return;
    posRef.current = { x: e.clientX, y: e.clientY };
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const { x, y } = posRef.current;
      setTransform(
        (x - (rect.left + rect.width / 2)) * strength,
        (y - (rect.top + rect.height / 2)) * strength,
      );
    });
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    rectRef.current = null;
    el.style.transition = "";
    setTransform(0, 0);
  };

  useEffect(() => {
    const el = ref.current;
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      if (el) el.style.transform = "";
    };
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`inline-block transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
