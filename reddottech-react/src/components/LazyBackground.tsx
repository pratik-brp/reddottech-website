import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

interface LazyBackgroundProps {
  src: string;
  className?: string;
  style?: CSSProperties;
  rootMargin?: string;
  children?: ReactNode;
}

/**
 * Renders a div whose `background-image` is only set once the element is
 * close to the viewport, so heavy CSS background PNGs (e.g. the PECP pillar
 * cards) are not fetched until they are about to be seen.
 */
export function LazyBackground({
  src,
  className = "",
  style,
  rootMargin = "300px",
  children,
}: LazyBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setLoaded(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, ...(loaded ? { backgroundImage: `url('${src}')` } : undefined) }}
    >
      {children}
    </div>
  );
}
