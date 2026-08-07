import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, PlayCircle, ChevronDown } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Magnetic } from "@/components/motion/Magnetic";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import hero3d from "@/assets/hero-3d.webp";

export function NewHeroSection() {
  const container = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scene = sceneRef.current;
      if (scene) {
        const tiltX = gsap.quickTo(scene, "rotationX", { duration: 0.5, ease: "power3.out" });
        const tiltY = gsap.quickTo(scene, "rotationY", { duration: 0.5, ease: "power3.out" });
        const onMove = (e: MouseEvent) => {
          const r = scene.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          tiltY(px * 18);
          tiltX(-py * 14);
        };
        const onLeave = () => {
          tiltX(0);
          tiltY(0);
        };
        scene.addEventListener("pointermove", onMove);
        scene.addEventListener("pointerleave", onLeave);
        return () => {
          scene.removeEventListener("pointermove", onMove);
          scene.removeEventListener("pointerleave", onLeave);
        };
      }
    },
    { scope: container },
  );

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".hero-reveal-item, .hero-float-card, .hero-orb", {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }
      gsap.set(".hero-reveal-item", { opacity: 0, y: 30 });
      gsap.set(".hero-float-card", { opacity: 0, scale: 0.8 });
      gsap.set(".hero-orb", { opacity: 0, scale: 0.7 });
      gsap.set(".hero-illust-main", { opacity: 0, scale: 0.7, rotationY: -30, rotationX: 15 });

      const tl = gsap.timeline({ delay: 0.1 });
      tl.to(".hero-orb", { opacity: 1, scale: 1, duration: 1.0, stagger: 0.1, ease: "power3.out" })
        .to(
          ".hero-reveal-item",
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" },
          "<",
        )
        .to(
          ".hero-illust-main",
          {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            duration: 1.0,
            ease: "power3.out",
          },
          "<",
        )
        .to(
          ".hero-float-card",
          { opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.6)" },
          "-=0.4",
        );

      // Mouse parallax
      const moveX = gsap.quickTo(".hero-parallax-layer", "x", {
        duration: 0.8,
        ease: "power3.out",
      });
      const moveY = gsap.quickTo(".hero-parallax-layer", "y", {
        duration: 0.8,
        ease: "power3.out",
      });
      let ticking = false;
      const onMove = (e: MouseEvent) => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const nx = (e.clientX / window.innerWidth - 0.5) * 2;
            const ny = (e.clientY / window.innerHeight - 0.5) * 2;
            moveX(nx * 14);
            moveY(ny * 10);
            ticking = false;
          });
          ticking = true;
        }
      };
      window.addEventListener("mousemove", onMove, { passive: true });
      return () => window.removeEventListener("mousemove", onMove);
    },
    { scope: container },
  );

  return (
    <section
      id="hero"
      ref={container}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden"
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

      <div className="relative z-10 my-auto mx-auto grid w-full max-w-7xl items-center gap-10 px-6 pt-24 pb-16 sm:pt-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:pt-28 lg:pb-16">
        {/* Left content */}
        <div>
          <span className="hero-reveal-item inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-white/70 backdrop-blur-md px-4 py-1.5 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-brand-red animate-glow-pulse" />
            <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-red">
              Nepal&apos;s Certification Hub
            </span>
          </span>

          <h1 className="display-font mt-6 text-[clamp(2.6rem,6.5vw,5.2rem)] font-bold leading-[1.02] tracking-[-0.03em] text-brand-ink">
            <span className="hero-reveal-item block overflow-hidden">
              <span className="block">Grow. Upskill.</span>
            </span>
            <span className="hero-reveal-item block overflow-hidden">
              <span className="gradient-text block">Succeed.</span>
            </span>
          </h1>

          <p className="hero-reveal-item mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-slate-500 font-medium">
            Empowering Nepalese professionals with globally recognized certifications, immersive
            labs and career-ready skills — built in partnership with leading US institutions.
          </p>

          <div className="hero-reveal-item mt-7 sm:mt-8 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Link to={"/coursess" as any} className="btn-primary group">
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link to={"/pecpp" as any} className="btn-secondary group inline-flex items-center gap-2">
                <PlayCircle className="h-4 w-4 text-brand-red" />
                <span>Explore PECP</span>
              </Link>
            </Magnetic>
          </div>

          {/* Stats */}
          <dl className="hero-reveal-item mt-9 sm:mt-10 lg:mt-12 flex flex-wrap gap-10 sm:gap-12">
            {[
              { value: 12, suffix: "k+", label: "Learners trained", decimals: 0 },
              { value: 40, suffix: "+", label: "Global certifications", decimals: 0 },
              { value: 96, suffix: "%", label: "Completion rate", decimals: 0 },
            ].map((s) => (
              <div key={s.label}>
                <dt className="display-font text-3xl sm:text-4xl font-bold text-brand-ink tracking-tight">
                  <AnimatedCounter value={s.value} suffix={s.suffix} decimals={s.decimals} />
                </dt>
                <dd className="mt-1 text-sm text-slate-500 font-semibold">{s.label}</dd>
              </div>
            ))}
          </dl>


        </div>

        {/* Right visual — 3D tilt illustration */}
        <div className="hero-parallax-layer scene-3d relative hidden lg:block" aria-hidden="true">
          <div
            ref={sceneRef}
            className="layer-3d relative mx-auto aspect-square w-full max-w-[620px]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Back layers */}
            <div
              className="animate-spin-slow absolute inset-[8%] rounded-full border border-brand-red/20"
              style={{ transform: "translateZ(-90px)" }}
            />
            <div
              className="absolute inset-[20%] rounded-full"
              style={{
                transform: "translateZ(-140px)",
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--brand-red) 30%, transparent), transparent 70%)",
                filter: "blur(40px)",
              }}
            />

            {/* Core 3D illustration */}
            <img
              src={hero3d}
              alt="3D illustration of a graduation cap with floating glass panels and spheres"
              width={1280}
              height={1280}
              fetchPriority="high"
              decoding="async"
              className="hero-illust-main animate-float relative h-full w-full object-contain"
              style={{ transform: "translateZ(70px)" }}
            />

            {/* Floating glass cards */}
            <div
              className="hero-float-card glass-card animate-float absolute bottom-[12%] right-0 rounded-2xl px-5 py-4 shadow-[var(--shadow-card-premium)] [animation-delay:2.4s]"
              style={{ transform: "translateZ(170px)" }}
            >
              <p className="display-font text-3xl font-bold text-brand-red">4.9★</p>
              <p className="mt-0.5 text-xs font-semibold text-slate-500">Learner rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-reveal-item absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce-gentle">
        <div className="flex flex-col items-center gap-1.5 text-slate-400">
          <span className="text-[10px] font-bold uppercase tracking-widest">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </section>
  );
}
