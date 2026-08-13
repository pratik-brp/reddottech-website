import { useEffect, useRef, useState } from "react";
import hero3d from "@/assets/hero-3d.webp";
import { ChevronDown } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Hero3D() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      setTilt({ x: -py * 14, y: px * 18 });
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={sceneRef}
      className="scene-3d relative min-h-screen overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Ambient background orbs for dynamic visual glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Top Left: Warm Amber/Peach Glow */}
        <div
          className="animate-float absolute -left-[10%] top-[5%] h-[42vw] max-h-[540px] w-[42vw] max-w-[540px] rounded-full opacity-70 blur-[90px]"
          style={{
            background:
              "radial-gradient(circle, rgba(251, 146, 60, 0.45) 0%, rgba(254, 215, 170, 0.25) 50%, transparent 70%)",
            animationDelay: "0s",
          }}
        />
        {/* Top Right: Luminous Sky Cyan Glow */}
        <div
          className="animate-float absolute -right-[10%] top-[2%] h-[38vw] max-h-[480px] w-[38vw] max-w-[480px] rounded-full opacity-65 blur-[85px]"
          style={{
            background:
              "radial-gradient(circle, rgba(125, 211, 252, 0.6) 0%, rgba(56, 189, 248, 0.3) 50%, transparent 70%)",
            animationDelay: "2.5s",
          }}
        />
        {/* Bottom Left: Rich Periwinkle & Violet Aura */}
        <div
          className="animate-float absolute -left-[5%] bottom-[2%] h-[40vw] max-h-[500px] w-[40vw] max-w-[500px] rounded-full opacity-75 blur-[95px]"
          style={{
            background:
              "radial-gradient(circle, rgba(147, 197, 253, 0.75) 0%, rgba(99, 102, 241, 0.4) 55%, transparent 75%)",
            animationDelay: "4.5s",
          }}
        />
        {/* Bottom Right: Warm Sunset Coral & Amber Glow */}
        <div
          className="animate-float absolute bottom-[5%] -right-[5%] h-[35vw] max-h-[440px] w-[35vw] max-w-[440px] rounded-full opacity-65 blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, rgba(253, 186, 116, 0.6) 0%, rgba(251, 146, 60, 0.35) 50%, transparent 70%)",
            animationDelay: "7s",
          }}
        />
      </div>

      {/* Main Grid Container */}
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-6 pb-24 pt-28 sm:pt-36 lg:grid-cols-[1.05fr_1fr] lg:pt-36">
        <div className="layer-3d">
          <span className="animate-rise badge-brand">
            <span className="h-2 w-2 rounded-full bg-brand-red animate-glow-pulse" />
            Nepal&apos;s certification hub
          </span>

          <h1 className="animate-rise mt-7 text-[clamp(2.8rem,7vw,5.6rem)] font-extrabold leading-[0.92] tracking-[-0.02em] text-brand-ink [animation-delay:80ms]">
            Grow. Upskill.
            <br />
            <span className="gradient-text">Succeed.</span>
          </h1>

          <p className="animate-rise mt-6 max-w-lg text-lg leading-relaxed text-brand-ink/65 [animation-delay:160ms]">
            Empowering Nepalese professionals with globally recognized certifications, immersive
            labs and career-ready skills.
          </p>

          <div className="animate-rise mt-9 flex flex-wrap gap-4 [animation-delay:240ms]">
            <Link to="/courses" className="btn-primary" style={{ boxShadow: "var(--shadow-3d)" }}>
              Get Started
            </Link>
            <Link to="/courses" className="btn-secondary">
              Explore Courses
            </Link>
          </div>

          {/* Stats */}
          <dl className="animate-rise mt-14 flex flex-wrap gap-8 sm:gap-12 [animation-delay:320ms]">
            {[
              ["12k+", "Learners trained"],
              ["40+", "Global certifications"],
              ["96%", "Completion rate"],
            ].map(([v, k]) => (
              <div key={k} className="group">
                <dt className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight">
                  {v}
                </dt>
                <dd className="mt-1 text-sm text-brand-ink/50 font-medium">{k}</dd>
              </div>
            ))}
          </dl>


        </div>

        {/* 3D Illustration */}
        <div
          className="layer-3d relative mx-auto aspect-square w-full max-w-[620px]"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: "transform 400ms cubic-bezier(0.16,1,0.3,1)",
          }}
        >
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

          <img
            src={hero3d}
            alt="3D illustration of a graduation cap with floating glass panels and spheres"
            width={1280}
            height={1280}
            className="animate-float relative h-full w-full object-contain drop-shadow-2xl"
            style={{ transform: "translateZ(70px)" }}
          />

          {/* Floating glass cards */}
          <div
            className="glass-card animate-float absolute bottom-[12%] right-0 rounded-2xl px-5 py-4 [animation-delay:2.4s]"
            style={{ transform: "translateZ(170px)" }}
          >
            <p className="text-2xl font-extrabold text-brand-red">4.9★</p>
            <p className="text-xs text-brand-ink/60">Learner rating</p>
          </div>

          <div
            className="glass-card animate-float absolute top-[18%] left-0 rounded-2xl px-4 py-3 [animation-delay:4s]"
            style={{ transform: "translateZ(130px)" }}
          >
            <p className="text-lg font-extrabold text-brand-ink">40+</p>
            <p className="text-[11px] text-brand-ink/50">Courses available</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce-gentle">
        <div className="flex flex-col items-center gap-1.5 text-brand-ink/30">
          <span className="text-[10px] font-semibold uppercase tracking-widest">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </section>
  );
}
