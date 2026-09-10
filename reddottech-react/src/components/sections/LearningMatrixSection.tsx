import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Layers,
  ArrowRight,
  CheckCircle2,
  Award,
  Globe2,
  Check,
} from "lucide-react";
import { TiltCard } from "@/components/motion/TiltCard";
import { Magnetic } from "@/components/motion/Magnetic";

const pillars = [
  {
    id: "pecp",
    title: "Professional Excellence & Certification Program (PECP)",
    subtitle: "Joint Credentials with USC Upstate (USA)",
    badge: "Flagship Executive Program",
    badgeColor: "bg-brand-red text-white",
    icon: GraduationCap,
    gradient: "from-slate-900 via-brand-ink to-slate-950",
    accentColor: "text-brand-red",
    borderGlow: "border-brand-red/30 hover:border-brand-red/60",
    link: "/pecp",
    description:
      "A joint initiative between USC Upstate and Red Dot Technologies, bringing globally recognized credentials and practical, career-ready learning to Nepal through flexible online, self-paced programs.",
    stats: [
      { label: "Duration", val: "6-8 Weeks" },
      { label: "Format", val: "Online / Self-Paced" },
      { label: "Eligibility", val: "Open for All" },
    ],
    features: [
      "Globally Recognized Joint Credentials",
      "Courses Developed with International Faculty",
      "Practical Projects & Workplace Discussions",
      "Workplace-Ready Professional Skills",
    ],
    isFeatured: true,
  },
  {
    id: "bootcamp",
    title: "Live Hands-on Bootcamps",
    subtitle: "Immersive Cohort Training & Capstones",
    badge: "High Intensity",
    badgeColor: "bg-amber-500 text-slate-950",
    icon: Layers,
    gradient: "from-amber-950/20 via-white to-white",
    accentColor: "text-amber-500",
    borderGlow: "border-amber-400/40 hover:border-amber-500",
    link: "/courses",
    description:
      "Fast-track your career with live weekend sessions, hands-on lab environments, and 1-on-1 mentorship. Build portfolio-ready capstones guided by industry leaders.",
    stats: [
      { label: "Cohorts", val: "Bi-Weekly" },
      { label: "Mentorship", val: "1-on-1 Weekly" },
      { label: "Partners", val: "40+ Companies" },
    ],
    features: [
      "Scenario-based Laboratory Simulations",
      "Direct Code & Case Study Reviews",
      "Career Placement Engine & Portfolio Review",
    ],
    isFeatured: false,
  },
  {
    id: "courses",
    title: "On-Demand Skill Courses",
    subtitle: "Targeted Skill Upgrades & Certification",
    badge: "Self-Paced & Lifetime Access",
    badgeColor: "bg-indigo-600 text-white",
    icon: BookOpen,
    gradient: "from-indigo-950/20 via-white to-white",
    accentColor: "text-indigo-600",
    borderGlow: "border-indigo-400/40 hover:border-indigo-600",
    link: "/courses",
    description:
      "Master machine learning, supervisor management, and financial forecasting with modular video lessons, downloadable guides, and syllabus checklists.",
    stats: [
      { label: "Courses", val: "40+ Modules" },
      { label: "Format", val: "Self-Paced" },
      { label: "Access", val: "Lifetime" },
    ],
    features: [
      "Business Analytics & Monte Carlo Risk Modeling",
      "Supervision Fundamentals & Team Motivation",
      "Downloadable Checklists & Syllabus",
    ],
    isFeatured: false,
  },
  {
    id: "ai-unlocked",
    title: "AI Unlocked & Applied Hub",
    subtitle: "Multi-Track Applied AI & Agile: Engineering, Healthcare, Finance & Management",
    badge: "Free + Professional Tracks",
    badgeColor: "bg-emerald-600 text-white",
    icon: Sparkles,
    gradient: "from-emerald-950/20 via-white to-white",
    accentColor: "text-emerald-600",
    borderGlow: "border-emerald-400/40 hover:border-emerald-600",
    link: "/ai-unlocked",
    description:
      "Explore interactive multi-track applied learning: Agile Methodologies for Developers & Managers, Healthcare, Banking & Finance, Educators, and General AI Literacy with instant verifiable credentials.",
    stats: [
      { label: "Tracks", val: "8 Sector Tracks" },
      { label: "Credentials", val: "Verified Certificates" },
      { label: "Modules", val: "82 In-Depth Modules" },
    ],
    features: [
      "Agile Sprints, TDD, CI/CD & Extreme Programming",
      "Clinical Diagnostics, Medical Risk & Triage Track",
      "Banking Credit Scoring, Fraud AML & NRB AI Guidelines",
    ],
    isFeatured: false,
  },
];

export function LearningMatrixSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const featuredPillar = pillars.find((p) => p.isFeatured) || pillars[0];
  const gridPillars = pillars.filter((p) => !p.isFeatured);

  return (
    <section className="section-padding-lg bg-[var(--color-background)] relative overflow-hidden">
      {/* Background Lighting */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="animate-float absolute top-[20%] right-[10%] h-96 w-96 rounded-full opacity-20 blur-[100px]"
          style={{
            background: "radial-gradient(circle, rgba(217, 31, 38, 0.4) 0%, transparent 70%)",
          }}
        />
        <div
          className="animate-float absolute bottom-[10%] left-[5%] h-80 w-80 rounded-full opacity-20 blur-[90px]"
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, transparent 70%)",
            animationDelay: "2s",
          }}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 sm:mb-12 text-center mx-auto max-w-3xl space-y-2 sm:space-y-4">
          <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-brand-red/20 bg-brand-mist px-3 sm:px-4 py-1 sm:py-1.5 shadow-xs">
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-brand-red animate-glow-pulse" />
            <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.14em] text-brand-red">
              Learning Ecosystem
            </span>
          </span>
          <h2 className="display-font text-xl sm:text-3xl lg:text-5xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
            Explore Our <span className="gradient-text">4 Pillars</span> of Professional Education
          </h2>
          <p className="text-xs sm:text-base text-slate-600 font-medium max-w-2xl mx-auto">
            Choose the exact learning format aligned with your career goals, timeline, and
            professional depth.
          </p>
        </div>

        {/* Bento Matrix Grid */}
        <div className="space-y-3.5 sm:space-y-8">
          {/* Main Hero Bento Card (PECP Flagship) */}
          <div className="w-full">
            <TiltCard maxTilt={3}>
              <div
                onMouseEnter={() => setHoveredId(featuredPillar.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative overflow-hidden rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-10 lg:p-12 text-white shadow-xl sm:shadow-2xl border border-white/15 transition-all duration-500 hover:shadow-brand-red/25"
              >
                {/* Background Image with Zoom & Dark Gradient Overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src="/images/pecp-hero-card-bg.png"
                    alt="PECP Executive Education"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Gradient overlay for optimal readability & executive ambiance */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/90 to-slate-900/80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
                </div>

                {/* Background Pattern & Ambient Glow */}
                <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-20 z-0" />
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full opacity-35 blur-[100px] z-0"
                  style={{
                    background: "radial-gradient(circle, var(--brand-red) 0%, transparent 70%)",
                  }}
                />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-12 items-center">
                  <div className="lg:col-span-7 space-y-3 sm:space-y-6">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
                      <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-brand-red px-2.5 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-xs font-extrabold uppercase tracking-wider text-white shadow-md shadow-red-900/40">
                        <Award className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        {featuredPillar.badge}
                      </span>
                      <span className="text-[9px] sm:text-xs font-bold text-amber-300/90 bg-amber-500/10 border border-amber-400/20 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
                        {featuredPillar.subtitle}
                      </span>
                    </div>

                    <h3 className="display-font text-lg sm:text-3xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                      {featuredPillar.title}
                    </h3>

                    <p className="text-slate-300 text-xs sm:text-base leading-relaxed font-normal">
                      {featuredPillar.description}
                    </p>

                    {/* Features Checklist */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-3 pt-1">
                      {featuredPillar.features.map((feat) => (
                        <div
                          key={feat}
                          className="flex items-center gap-1.5 sm:gap-2.5 text-xs sm:text-sm font-semibold text-slate-200"
                        >
                          <div className="flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-brand-red/30 text-brand-red shrink-0">
                            <Check className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 stroke-[3]" />
                          </div>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
                      <Magnetic>
                        <Link
                          to={featuredPillar.link as any}
                          className="btn-primary group py-2.5 sm:py-3.5 px-5 sm:px-8 text-xs sm:text-sm w-full sm:w-auto text-center justify-center"
                        >
                          <span>Explore PECP Credentials</span>
                          <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </Magnetic>
                    </div>
                  </div>

                  {/* Right Column: Stats Matrix Card */}
                  <div className="lg:col-span-5">
                    <div className="rounded-xl sm:rounded-3xl border border-white/15 bg-slate-900/85 p-3.5 sm:p-8 space-y-3 sm:space-y-6 shadow-xl">
                      <div className="flex items-center justify-between gap-3">
                        {/* PECP Logo with clean white background */}
                        <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-white p-1.5 sm:p-2 shrink-0 shadow-md border border-white/20">
                          <img
                            src="/images/pecp/pecp.png"
                            alt="PECP Logo"
                            className="h-full w-full object-contain"
                          />
                        </div>

                        {/* RDT x USC Upstate Logos Beside with matching white background */}
                        <div className="flex items-center gap-2 sm:gap-3 bg-white px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl shadow-md border border-white/20">
                          <img
                            src="/logo.png"
                            alt="Red Dot Technologies"
                            className="h-5 sm:h-7 w-auto object-contain"
                          />
                          <span className="text-slate-400 text-xs sm:text-sm font-bold">×</span>
                          <img
                            src="https://uscupstate.edu/wp-content/uploads/2023/10/COLOR_HOR_BLK_Upstate_Logo-1-e1698410030138.png"
                            alt="USC Upstate Logo"
                            className="h-4 sm:h-6 w-auto object-contain"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-1.5 sm:gap-3 border-y border-white/10 py-2.5 sm:py-5">
                        {featuredPillar.stats.map((s) => (
                          <div key={s.label}>
                            <p className="text-[9px] sm:text-[11px] text-slate-400 font-medium leading-tight">
                              {s.label}
                            </p>
                            <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-sm font-extrabold text-white">
                              {s.val}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5 sm:gap-3 text-[10px] sm:text-xs text-slate-300">
                        <Globe2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand-red shrink-0" />
                        <span>Joint USC Upstate &amp; Red Dot Credential</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Secondary 2-Column Mobile / 3-Column Desktop Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 lg:gap-8 items-stretch">
            {gridPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isHovered = hoveredId === pillar.id;
              const isLastCard = idx === gridPillars.length - 1;

              return (
                <div
                  key={pillar.id}
                  className={`col-span-1 ${isLastCard ? "col-span-2 lg:col-span-1" : ""}`}
                >
                  <TiltCard maxTilt={4} className="h-full">
                    <div
                      onMouseEnter={() => setHoveredId(pillar.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className={`h-full flex flex-col justify-between rounded-xl sm:rounded-[2rem] border bg-white p-3 sm:p-6 lg:p-7 shadow-xs sm:shadow-sm transition-all duration-300 relative overflow-hidden ${
                        isHovered
                          ? `${pillar.borderGlow} shadow-md -translate-y-0.5`
                          : "border-slate-200/80 hover:border-slate-300"
                      }`}
                    >
                      {/* Card Content Area */}
                      <div className="space-y-2.5 sm:space-y-5">
                        <div className="flex items-center justify-between gap-1">
                          <div
                            className={`flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-2xl bg-slate-100 ${pillar.accentColor} transition-transform duration-300 group-hover:scale-105 shrink-0`}
                          >
                            <Icon className="h-4 w-4 sm:h-6 sm:w-6 stroke-[2.2]" />
                          </div>
                          <span
                            className={`rounded-full px-1.5 py-0.5 sm:px-3 sm:py-1 text-[8px] sm:text-[10px] font-extrabold uppercase tracking-wider truncate max-w-[120px] sm:max-w-none ${pillar.badgeColor}`}
                          >
                            {pillar.badge}
                          </span>
                        </div>

                        <div>
                          <h3 className="display-font text-xs sm:text-xl font-extrabold text-brand-ink leading-tight">
                            {pillar.title}
                          </h3>
                          <p className="text-[9px] sm:text-xs font-semibold text-slate-400 mt-0.5 sm:mt-1 truncate">
                            {pillar.subtitle}
                          </p>
                        </div>

                        <p className="text-[10px] sm:text-sm text-slate-600 leading-snug sm:leading-relaxed font-normal line-clamp-3 sm:line-clamp-none">
                          {pillar.description}
                        </p>

                        {/* Features List */}
                        <div className="space-y-1 sm:space-y-2 pt-2 border-t border-slate-100">
                          {pillar.features.map((feat) => (
                            <div
                              key={feat}
                              className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-xs font-semibold text-slate-700"
                            >
                              <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-500 shrink-0" />
                              <span className="truncate sm:whitespace-normal">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-3 sm:mt-6 pt-2.5 sm:pt-4 border-t border-slate-100">
                        <Magnetic>
                          <Link
                            to={pillar.link as any}
                            className="group inline-flex items-center gap-1 sm:gap-2 rounded-full border border-slate-200 bg-slate-50/80 px-2.5 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-extrabold text-brand-ink transition-all duration-300 hover:bg-brand-red hover:text-white hover:border-brand-red shadow-xs w-full justify-center text-center"
                          >
                            <span>Explore Offering</span>
                            <span className="flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-slate-200/80 text-brand-ink transition-colors group-hover:bg-white/25 group-hover:text-white shrink-0">
                              <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 stroke-[2.5]" />
                            </span>
                          </Link>
                        </Magnetic>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
