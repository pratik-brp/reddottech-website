import type { ReactNode } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface PageHeroProps {
  badge: string;
  title: ReactNode;
  subtitle?: string;
  className?: string;
  actions?: ReactNode;
  children?: ReactNode;
}

export function PageHero({ badge, title, subtitle, className = "", actions, children }: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const items = ref.current?.querySelectorAll(".pagehero-reveal");
      if (!items?.length) return;
      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", delay: 0.2 },
      );
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden min-h-[75dvh] sm:min-h-[80vh] flex flex-col justify-center items-center pt-24 sm:pt-36 pb-14 sm:pb-20 ${className}`}
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-50"
        aria-hidden="true"
      />
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="animate-float absolute -right-[8%] top-[2%] h-[32vw] max-h-[380px] w-[32vw] max-w-[380px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--brand-red) 40%, transparent) 0%, transparent 70%)",
          }}
        />
        <div
          className="animate-float absolute -left-[6%] bottom-[5%] h-[24vw] max-h-[280px] w-[24vw] max-w-[280px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, oklch(0.88 0.04 240 / 0.6) 0%, transparent 70%)",
            animationDelay: "3s",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 text-center my-auto flex flex-col items-center justify-center">
        <span className="pagehero-reveal inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-white/70 px-3.5 sm:px-4 py-1.5 backdrop-blur-md shadow-sm">
          <span className="h-2 w-2 rounded-full bg-brand-red animate-glow-pulse" />
          <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.14em] text-brand-red">
            {badge}
          </span>
        </span>

        <h1 className="pagehero-reveal display-font mt-5 sm:mt-6 text-3xl sm:text-5xl lg:text-[3.75rem] font-bold text-brand-ink leading-[1.08] tracking-tight max-w-4xl mx-auto">
          {title}
        </h1>

        {subtitle && (
          <p className="pagehero-reveal mt-4 sm:mt-5 text-xs sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            {subtitle}
          </p>
        )}

        {actions && (
          <div className="pagehero-reveal mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {actions}
          </div>
        )}

        {children && (
          <div className="pagehero-reveal mt-8 sm:mt-10 w-full">
            {children}
          </div>
        )}
      </div>

      {/* Bottom edge separator */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-300/70 to-transparent" />
    </section>
  );
}
