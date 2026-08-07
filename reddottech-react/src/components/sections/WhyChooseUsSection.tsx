import { useState } from "react";
import { GraduationCap, Users, Globe, Briefcase, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { Link } from "@tanstack/react-router";
import { Magnetic } from "@/components/motion/Magnetic";

const features = [
  {
    id: "01",
    icon: GraduationCap,
    svg: "/images/about/choose-us-1.svg",
    image: "/images/about/international-recognition.png",
    title: "International Recognition",
    badge: "GLOBAL CREDENTIALS",
    description:
      "Programs backed by world-class global institutions such as University of South Carolina Upstate (USA).",
    highlights: ["Dual digital badges", "Verifiable credential URLs", "USC Upstate Transcripts"],
    tagline: "Certified by U.S. University standard with verifiable digital credentials.",
  },
  {
    id: "02",
    icon: Users,
    svg: "/images/about/choose-us-2.svg",
    image: "/images/about/expert-trainers.png",
    title: "Expert Trainers",
    badge: "WORLD-CLASS FACULTY",
    description:
      "Instructors with deep industry expertise, global credentials, and international corporate exposure.",
    highlights: ["International authors", "Patent holders & practitioners", "1-on-1 mentorship"],
    tagline: "Learn directly from authors, PMP® credential holders, and industry leaders.",
  },
  {
    id: "03",
    icon: Globe,
    svg: "/images/about/choose-us-3.svg",
    image: "/images/about/career-advancement.png",
    title: "Career Advancement",
    badge: "CAREER ACCELERATION",
    description:
      "Courses tailored to help learners secure better jobs, promotions, or international opportunities.",
    highlights: ["Global hiring network", "Interview prep & resume coaching", "Alumni network"],
    tagline: "Designed specifically to unlock promotions and international hiring pipelines.",
  },
  {
    id: "04",
    icon: Briefcase,
    svg: "/images/about/choose-us-4.svg",
    image: "/images/about/flexible-learning.png",
    title: "Flexible Learning Models",
    badge: "WORK-LIFE BALANCED",
    description:
      "Instructor-led, online, and hybrid options specifically designed for working professionals.",
    highlights: ["Weekend live sessions", "Interactive digital labs", "Lifetime course access"],
    tagline: "Study on weekends with live instructor interactions and hands-on digital labs.",
  },
];

export function WhyChooseUsSection() {
  const [active, setActive] = useState(0);
  const activeFeature = features[active];
  const Icon = activeFeature.icon;

  return (
    <section className="section-padding-lg bg-[var(--surface-elevated)] relative overflow-hidden">
      {/* Grid Pattern & Ambient Glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-30"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-20 top-1/3 h-96 w-96 rounded-full opacity-15 blur-[100px]"
        style={{ background: "radial-gradient(circle, var(--brand-red) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-14 text-center mx-auto max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/5 px-4 py-1.5 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-brand-red animate-glow-pulse" />
            <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-red">
              Why RedDot
            </span>
          </span>
          <h2 className="display-font text-3xl sm:text-5xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
            Everything You Need to <span className="gradient-text">Accelerate Your Career</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            We combine world-class academic partnerships with practical, career-focused training to deliver an unmatched learning experience.
          </p>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Interactive Feature Cards List (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3.5 h-full">
            {features.map((feature, index) => {
              const FIcon = feature.icon;
              const isActive = active === index;
              return (
                <button
                  key={feature.title}
                  onClick={() => setActive(index)}
                  className={`group relative flex items-center gap-4 rounded-2xl p-4 sm:p-5 text-left transition-all duration-400 border overflow-hidden ${
                    isActive
                      ? "bg-white border-brand-red/40 shadow-xl shadow-slate-200/60 scale-[1.02]"
                      : "bg-white/70 border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-md"
                  }`}
                >
                  {/* Left Active Glow Indicator Bar */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 ${
                      isActive ? "bg-brand-red" : "bg-transparent group-hover:bg-slate-300"
                    }`}
                  />

                  {/* Card Thumbnail Image */}
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors" />
                    <div
                      className={`absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-lg ${
                        isActive ? "bg-brand-red text-white" : "bg-slate-900/80 text-white"
                      }`}
                    >
                      <FIcon className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`display-font text-base font-extrabold tracking-tight transition-colors duration-300 ${isActive ? "text-brand-red" : "text-brand-ink group-hover:text-brand-red"}`}>
                        {feature.title}
                      </h3>
                      <span className="text-[10px] font-black text-slate-400 group-hover:text-brand-red">
                        {feature.id}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500 leading-relaxed line-clamp-2 font-medium">
                      {feature.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Feature Spotlight Box (7 Cols) */}
          <div className="lg:col-span-7">
            <div
              key={active}
              className="relative overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-slate-900 via-brand-ink to-slate-950 text-white shadow-2xl border border-slate-800 flex flex-col justify-between h-full"
            >
              {/* Feature Hero Showcase Image Header */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                <img
                  src={activeFeature.image}
                  alt={activeFeature.title}
                  className="h-full w-full object-cover animate-scale-in"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

                {/* Badge Overlay */}
                <div className="absolute top-6 left-6 z-10 flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-brand-red/90 backdrop-blur-md px-3.5 py-1 text-[11px] font-extrabold text-white shadow-lg uppercase tracking-wider">
                    <Sparkles className="h-3.5 w-3.5" />
                    {activeFeature.badge}
                  </span>
                </div>

                <div className="absolute top-6 right-6 z-10">
                  <span className="text-xs font-mono text-slate-300 font-bold bg-slate-950/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    0{active + 1} / 04
                  </span>
                </div>
              </div>

              {/* Body Content */}
              <div className="relative z-10 p-6 sm:p-8 space-y-5 -mt-8">
                {/* Feature Title */}
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-red text-white shadow-lg shadow-red-900/40">
                    <Icon className="h-6 w-6 stroke-[2]" />
                  </div>
                  <div>
                    <h3 className="display-font text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                      {activeFeature.title}
                    </h3>
                    <p className="text-xs text-brand-red font-semibold mt-0.5">
                      {activeFeature.tagline}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {activeFeature.description}
                </p>

                {/* Bullet Highlights Grid */}
                <div className="space-y-2.5 pt-1">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                    Key Deliverables &amp; Highlights:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {activeFeature.highlights.map((h) => (
                      <div
                        key={h}
                        className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 p-2.5 text-xs font-bold text-slate-200 backdrop-blur-md hover:bg-white/10 transition-colors"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand-red shrink-0" />
                        <span className="leading-tight">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Footer: Metrics & CTA */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5">
                  <div className="grid grid-cols-3 gap-6 text-center sm:text-left">
                    <div>
                      <p className="display-font text-xl sm:text-2xl font-extrabold text-brand-red">
                        <AnimatedCounter value={12} suffix="k+" />
                      </p>
                      <p className="text-[10px] text-slate-400 font-extrabold uppercase mt-0.5">Learners</p>
                    </div>
                    <div>
                      <p className="display-font text-xl sm:text-2xl font-extrabold text-brand-red">
                        <AnimatedCounter value={40} suffix="+" />
                      </p>
                      <p className="text-[10px] text-slate-400 font-extrabold uppercase mt-0.5">Certifications</p>
                    </div>
                    <div>
                      <p className="display-font text-xl sm:text-2xl font-extrabold text-brand-red">
                        <AnimatedCounter value={4.9} decimals={1} suffix="★" />
                      </p>
                      <p className="text-[10px] text-slate-400 font-extrabold uppercase mt-0.5">Rating</p>
                    </div>
                  </div>

                  <Magnetic>
                    <Link to={"/coursess" as any} className="btn-primary text-xs py-3.5 px-6 shrink-0 w-full sm:w-auto text-center">
                      <span>Explore Programs</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Magnetic>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

