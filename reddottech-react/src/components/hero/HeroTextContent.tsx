import { Link } from "@tanstack/react-router";

export function HeroTextContent() {
  return (
    <div className="layer-3d">
      <span className="animate-rise badge-brand">
        <span className="h-2 w-2 rounded-full bg-brand-red animate-glow-pulse" />
        Nepal&apos;s certification hub
      </span>

      <h1 className="animate-rise mt-7 text-[clamp(2.8rem,7vw,5.6rem)] font-extrabold leading-[0.92] tracking-[-0.02em] text-brand-ink [animation-delay:80ms]">
        <span className="hero-line block" style={{ overflow: "hidden" }}>
          <span className="inline-block">Grow. Upskill.</span>
        </span>
        <span className="hero-line block gradient-text" style={{ overflow: "hidden" }}>
          {"Succeed.".split("").map((char, index) => (
            <span key={index} className="hero-letter inline-block">
              {char === " " ? " " : char}
            </span>
          ))}
        </span>
      </h1>

      <p className="hero-paragraph animate-rise mt-6 max-w-lg text-lg leading-relaxed text-brand-ink/65 [animation-delay:160ms]">
        Empowering Nepalese professionals with globally recognized certifications, immersive labs
        and career-ready skills.
      </p>

      <div className="hero-buttons animate-rise mt-9 flex flex-wrap gap-4 [animation-delay:240ms]">
        <Link to={"/coursess" as any} className="btn-primary" style={{ boxShadow: "var(--shadow-3d)" }}>
          Get Started
        </Link>
        <Link to={"/coursess" as any} className="btn-secondary">
          Explore Courses
        </Link>
      </div>

      {/* Stats */}
      <dl className="hero-stats animate-rise mt-14 flex flex-wrap gap-8 sm:gap-12 [animation-delay:320ms]">
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
  );
}
