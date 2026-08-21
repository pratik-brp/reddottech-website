import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, PlayCircle, ChevronDown } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import hero3d from "@/assets/hero-3d.webp";

export function NewHeroSection() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".hero-reveal-item, .hero-float-card, .hero-orb, .hero-illust-main", {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }
      gsap.set(".hero-reveal-item", { opacity: 0, y: 25 });
      gsap.set(".hero-float-card", { opacity: 0, scale: 0.9 });
      gsap.set(".hero-orb", { opacity: 0, scale: 0.8 });
      gsap.set(".hero-illust-main", { opacity: 0, scale: 0.95 });

      const tl = gsap.timeline({ delay: 0.1 });
      tl.to(".hero-orb", { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" })
        .to(
          ".hero-reveal-item",
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power2.out" },
          "<",
        )
        .to(
          ".hero-illust-main",
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "<",
        )
        .to(
          ".hero-float-card",
          { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
          "-=0.3",
        );
    },
    { scope: container },
  );

  return (
    <section
      id="hero"
      ref={container}
      className="relative flex min-h-[100dvh] min-h-screen flex-col justify-center overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="hero-orb animate-orb absolute -left-[8%] top-[10%] h-[36vw] max-h-[460px] w-[36vw] max-w-[460px] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--brand-red) 30%, transparent) 0%, transparent 70%)",
          }}
        />
        <div
          className="hero-orb animate-orb absolute -right-[10%] top-[6%] h-[32vw] max-h-[420px] w-[32vw] max-w-[420px] rounded-full opacity-30 [animation-delay:3s]"
          style={{
            background: "radial-gradient(circle, oklch(0.82 0.05 240 / 0.6) 0%, transparent 70%)",
          }}
        />
        <div
          className="hero-orb animate-orb absolute bottom-[4%] left-[28%] h-[26vw] max-h-[340px] w-[26vw] max-w-[340px] rounded-full opacity-25 [animation-delay:6s]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--brand-red) 24%, transparent) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 my-auto mx-auto grid w-full max-w-7xl items-center gap-8 sm:gap-10 px-4 sm:px-6 pt-20 pb-12 sm:pt-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:pt-28 lg:pb-16">
        {/* Left content */}
        <div>
          <span className="hero-reveal-item inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-white px-3.5 sm:px-4 py-1.5 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-brand-red animate-glow-pulse" />
            <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.14em] text-brand-red">
              Nepal&apos;s Certification Hub
            </span>
          </span>

          <h1 className="display-font mt-4 sm:mt-6 text-[clamp(2.2rem,6.5vw,5.2rem)] font-bold leading-[1.04] tracking-[-0.03em] text-brand-ink">
            <span className="hero-reveal-item block overflow-hidden">
              <span className="block">Grow. Upskill.</span>
            </span>
            <span className="hero-reveal-item block overflow-hidden">
              <span className="gradient-text block">Succeed.</span>
            </span>
          </h1>

          <p className="hero-reveal-item mt-4 sm:mt-5 max-w-xl text-sm sm:text-lg leading-relaxed text-slate-500 font-medium">
            Empowering Nepalese professionals with globally recognized certifications, immersive
            labs and career-ready skills — built in partnership with leading US institutions.
          </p>

          <div className="hero-reveal-item mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link to="/courses" className="btn-primary group py-3 sm:py-3.5 px-6 sm:px-7 text-xs sm:text-sm">
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link to="/pecp" className="btn-secondary group inline-flex items-center gap-2 py-3 sm:py-3.5 px-5 sm:px-6 text-xs sm:text-sm">
              <PlayCircle className="h-4 w-4 text-brand-red" />
              <span>Explore PECP</span>
            </Link>
          </div>

          {/* Stats */}
          <dl className="hero-reveal-item mt-8 sm:mt-10 lg:mt-12 flex flex-wrap items-center gap-6 sm:gap-12">
            {[
              { value: 12, suffix: "k+", label: "Learners trained", decimals: 0 },
              { value: 40, suffix: "+", label: "Global certifications", decimals: 0 },
              { value: 96, suffix: "%", label: "Completion rate", decimals: 0 },
            ].map((s) => (
              <div key={s.label}>
                <dt className="display-font text-2xl sm:text-4xl font-bold text-brand-ink tracking-tight">
                  <AnimatedCounter value={s.value} suffix={s.suffix} decimals={s.decimals} />
                </dt>
                <dd className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-slate-500 font-semibold">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right visual — Static 3D Hero Illustration */}
        <div className="relative w-full mt-6 sm:mt-8 lg:mt-0 flex justify-center" aria-hidden="true">
          <div
            className="relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[440px] lg:max-w-[620px]"
          >
            {/* Ambient Background Glow (Static) */}
            <div
              className="absolute inset-[20%] rounded-full opacity-60 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--brand-red) 25%, transparent) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />

            {/* Core 3D illustration (Completely Static) */}
            <img
              src={hero3d}
              alt="3D illustration of a graduation cap with floating glass panels and spheres"
              width={1280}
              height={1280}
              fetchPriority="high"
              decoding="async"
              className="hero-illust-main relative h-full w-full object-contain select-none pointer-events-none"
            />

            {/* Floating glass card (Static Position) */}
            <div
              className="hero-float-card glass-card absolute bottom-[6%] right-0 rounded-2xl px-3.5 py-2.5 sm:px-5 sm:py-4 shadow-xl"
            >
              <p className="display-font text-xl sm:text-3xl font-bold text-brand-red">4.9★</p>
              <p className="mt-0.5 text-[9px] sm:text-xs font-semibold text-slate-500">Learner rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-reveal-item absolute bottom-4 sm:bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce-gentle">
        <div className="flex flex-col items-center gap-1 text-slate-400">
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">Scroll</span>
          <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </div>
      </div>
    </section>
  );
}
