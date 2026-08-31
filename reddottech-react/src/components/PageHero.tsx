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

export function PageHero({
  badge,
  title,
  subtitle,
  className = "",
  actions,
  children,
}: PageHeroProps) {
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
      className={`relative overflow-hidden min-h-0 sm:min-h-[48vh] lg:min-h-[56vh] flex flex-col justify-center items-center pt-24 pb-8 sm:pt-32 sm:pb-16 ${className}`}
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
        <span className="pagehero-reveal inline-flex items-center text-center gap-1.5 sm:gap-2 rounded-full border border-brand-red/20 bg-white/95 px-3 sm:px-4 py-1 sm:py-1.5 shadow-xs max-w-[90vw]">
          <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-brand-red animate-glow-pulse shrink-0" />
          <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.12em] text-brand-red leading-tight text-center">
            {badge}
          </span>
        </span>

        <h1 className="pagehero-reveal display-font mt-3 sm:mt-5 text-2xl sm:text-4xl lg:text-[3.5rem] font-bold text-brand-ink leading-tight sm:leading-[1.1] tracking-tight max-w-4xl mx-auto">
          {title}
        </h1>

        {subtitle && (
          <p className="pagehero-reveal mt-2 sm:mt-4 text-xs sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            {subtitle}
          </p>
        )}

        {actions && (
          <div className="pagehero-reveal mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
            {actions}
          </div>
        )}

        {children && <div className="pagehero-reveal mt-4 sm:mt-8 w-full">{children}</div>}
      </div>

      {/* Bottom edge separator */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-300/70 to-transparent" />
    </section>
  );
}
