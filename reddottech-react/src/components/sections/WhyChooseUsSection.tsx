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
    <section id="why-choose-us" className="section-padding-lg bg-[var(--surface-elevated)] relative overflow-hidden">
      {/* Grid Pattern & Ambient Glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-30"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-20 top-1/3 h-96 w-96 rounded-full opacity-15 blur-[100px]"
        style={{ background: "radial-gradient(circle, var(--brand-red) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 sm:mb-12 text-center mx-auto max-w-3xl space-y-2 sm:space-y-4">
          <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-brand-red/20 bg-brand-red/5 px-3 sm:px-4 py-1 sm:py-1.5 shadow-xs">
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-brand-red animate-glow-pulse" />
            <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.14em] text-brand-red">
              Why Red Dot
            </span>
          </span>
          <h2 className="display-font text-xl sm:text-3xl lg:text-5xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
            Everything You Need to <span className="gradient-text">Accelerate Your Career</span>
          </h2>
          <p className="text-xs sm:text-base text-slate-600 font-medium">
            We combine world-class academic partnerships with practical, career-focused training to deliver an unmatched learning experience.
          </p>
        </div>

        {/* 2-Column Grid Layout - Perfectly Matching Fixed Stable Heights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-stretch">
          {/* Left Column: Interactive Feature Cards List — 2-Column on Mobile, Vertical Stack on Desktop */}
          <div className="lg:col-span-5 grid grid-cols-2 lg:flex lg:flex-col gap-2 sm:gap-3.5 h-full justify-between">
            {features.map((feature, index) => {
              const FIcon = feature.icon;
              const isActive = active === index;
              return (
                <button
                  key={feature.title}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`group relative flex-1 min-h-[96px] sm:min-h-[112px] flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 rounded-xl sm:rounded-2xl p-2.5 sm:px-5 sm:py-3.5 text-left transition-all duration-200 border overflow-hidden cursor-pointer select-none ${isActive
                      ? "bg-white border-brand-red/40 shadow-xs sm:shadow-xl shadow-slate-200/70 ring-1 ring-brand-red/30"
                      : "bg-white/70 border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs"
                    }`}
                >
                  {/* Left Active Glow Indicator Bar */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 transition-colors duration-200 ${isActive ? "bg-brand-red" : "bg-transparent group-hover:bg-slate-300"
                      }`}
                  />

                  {/* Card Thumbnail Image */}
                  <div className="relative h-10 w-full sm:h-16 sm:w-20 shrink-0 overflow-hidden rounded-md sm:rounded-xl border border-slate-200 shadow-xs">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-900/15 group-hover:bg-transparent transition-colors" />
                    <div
                      className={`absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 flex h-4 w-4 sm:h-6 sm:w-6 items-center justify-center rounded sm:rounded-lg transition-colors ${isActive ? "bg-brand-red text-white shadow-xs" : "bg-slate-900/80 text-white"
                        }`}
                    >
                      <FIcon className="h-2 w-2 sm:h-3.5 sm:w-3.5" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 w-full flex flex-col justify-center">
                    <div className="flex items-center justify-between gap-1">
                      <h3
                        className={`display-font text-xs sm:text-base font-extrabold tracking-tight transition-colors duration-200 truncate ${isActive ? "text-brand-red" : "text-brand-ink group-hover:text-brand-red"
                          }`}
                      >
                        {feature.title}
                      </h3>
                      <span
                        className={`text-[8px] sm:text-[10px] font-black transition-colors shrink-0 ${isActive ? "text-brand-red" : "text-slate-400 group-hover:text-brand-red"
                          }`}
                      >
                        {feature.id}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[9px] sm:text-xs text-slate-500 leading-snug line-clamp-2 font-medium min-h-[24px] sm:min-h-[32px]">
                      {feature.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Feature Spotlight Box (7 Cols) - Equal Height */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-[2.25rem] bg-gradient-to-br from-slate-900 via-brand-ink to-slate-950 text-white shadow-2xl border border-slate-800 flex flex-col justify-between h-full min-h-[540px] sm:min-h-[580px] lg:min-h-[560px]">
              {/* Feature Hero Showcase Image Header (Fixed Height) */}
              <div className="relative h-40 sm:h-60 w-full overflow-hidden shrink-0 bg-slate-950">
                <img
                  key={activeFeature.image}
                  src={activeFeature.image}
                  alt={activeFeature.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover animate-fade-in"
                  style={{ animationDuration: "200ms" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

                {/* Badge Overlay */}
                <div className="absolute top-3.5 left-3.5 sm:top-6 sm:left-6 z-10 flex items-center gap-2 sm:gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-red px-2.5 py-0.5 sm:px-3.5 sm:py-1 text-[10px] sm:text-[11px] font-extrabold text-white shadow-lg uppercase tracking-wider">
                    <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    {activeFeature.badge}
                  </span>
                </div>

                <div className="absolute top-3.5 right-3.5 sm:top-6 sm:right-6 z-10">
                  <span className="text-[10px] sm:text-xs font-mono text-slate-300 font-bold bg-slate-900 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-white/15">
                    0{active + 1} / 04
                  </span>
                </div>
              </div>

              {/* Body Content - Stable Heights */}
              <div className="relative z-10 p-4 sm:p-7 space-y-3.5 sm:space-y-4 -mt-6 sm:-mt-8 flex-1 flex flex-col justify-between">
                <div className="space-y-3 sm:space-y-3.5">
                  {/* Feature Title with Fixed Min-Height to Avoid Vertical Movement */}
                  <div className="flex items-center gap-3 min-h-[48px] sm:min-h-[56px]">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-red text-white shadow-lg shadow-red-900/40">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="display-font text-xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                        {activeFeature.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-brand-red font-semibold mt-0.5 truncate">
                        {activeFeature.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Description with Fixed Min-Height */}
                  <div className="min-h-[36px] sm:min-h-[42px] flex items-center">
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal line-clamp-2">
                      {activeFeature.description}
                    </p>
                  </div>

                  {/* Bullet Highlights Grid with Fixed Uniform Card Heights */}
                  <div className="space-y-1.5 pt-1">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                      Key Deliverables &amp; Highlights:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                      {activeFeature.highlights.map((h) => (
                        <div
                          key={h}
                          className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/15 p-2 sm:p-2.5 text-xs font-bold text-slate-200 hover:bg-white/15 transition-colors min-h-[42px] sm:min-h-[48px]"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-brand-red shrink-0" />
                          <span className="leading-tight line-clamp-2">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Footer: Metrics & CTA (Pinned Stably at Bottom) */}
                <div className="pt-3 sm:pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-5 mt-auto">
                  <div className="grid grid-cols-3 gap-4 sm:gap-6 text-center sm:text-left w-full sm:w-auto">
                    <div>
                      <p className="display-font text-lg sm:text-2xl font-extrabold text-brand-red">
                        <AnimatedCounter value={1} suffix="k+" />
                      </p>
                      <p className="text-[9px] sm:text-[10px] text-slate-400 font-extrabold uppercase mt-0.5">Learners</p>
                    </div>
                    <div>
                      <p className="display-font text-lg sm:text-2xl font-extrabold text-brand-red">
                        <AnimatedCounter value={10} suffix="+" />
                      </p>
                      <p className="text-[9px] sm:text-[10px] text-slate-400 font-extrabold uppercase mt-0.5">Certifications</p>
                    </div>

                    <div>
                      <p className="display-font text-lg sm:text-2xl font-extrabold text-brand-red">
                        <AnimatedCounter value={4.9} decimals={1} suffix="★" />
                      </p>
                      <p className="text-[9px] sm:text-[10px] text-slate-400 font-extrabold uppercase mt-0.5">Rating</p>
                    </div>
                  </div>

                  <Magnetic>
                    <Link to="/courses" className="btn-primary text-xs py-3 sm:py-3.5 px-6 shrink-0 w-full sm:w-auto text-center justify-center">
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

