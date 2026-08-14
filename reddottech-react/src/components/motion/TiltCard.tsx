import { useEffect, useRef, type ReactNode, type MouseEvent } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({ children, className = "", maxTilt = 10 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const setTransform = (rx: number, ry: number) => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
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
      const px = (x - rect.left) / rect.width;
      const py = (y - rect.top) / rect.height;
      setTransform((0.5 - py) * maxTilt, (px - 0.5) * maxTilt);
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
      className={`transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
