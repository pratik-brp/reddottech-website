import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Award,
  Zap,
  Globe2,
  Check,
} from "lucide-react";
import { TiltCard } from "@/components/motion/TiltCard";
import { Magnetic } from "@/components/motion/Magnetic";

const pillars = [
  {
    id: "pecp",
    title: "PECP Executive Certifications",
    subtitle: "Joint Credentials with USC Upstate (USA)",
    badge: "Flagship Executive Program",
    badgeColor: "bg-brand-red text-white",
    icon: GraduationCap,
    gradient: "from-slate-900 via-brand-ink to-slate-950",
    accentColor: "text-brand-red",
    borderGlow: "border-brand-red/30 hover:border-brand-red/60",
    link: "/pecpp",
    description:
      "Designed for senior managers, quality engineers, and project leaders seeking international recognition. 6-week structured modules with live masterclasses and university credentials.",
    stats: [
      { label: "Duration", val: "6 Weeks" },
      { label: "Credential", val: "USC Upstate USA" },
      { label: "Format", val: "Hybrid / Weekend" },
    ],
    features: [
      "Six Sigma Total Quality DMAIC Framework",
      "PMP® & CAPM® Project Management Principles",
      "Executive Leadership & Industrial Psychology",
      "Verifiable International Credentials",
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
    link: "/coursess",
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
    link: "/coursess",
    description:
      "Master machine learning, supervisor management, and financial forecasting with modular video lessons, downloadable guides, and syllabus checklists.",
    stats: [
      { label: "Courses", val: "40+ Modules" },
      { label: "Skill Level", val: "Beginner to Advanced" },
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
    title: "AI Unlocked & FREE Hub",
    subtitle: "0-Cost Community Artificial Intelligence Initiative",
    badge: "100% Free Certificate",
    badgeColor: "bg-emerald-600 text-white",
    icon: Sparkles,
    gradient: "from-emerald-950/20 via-white to-white",
    accentColor: "text-emerald-600",
    borderGlow: "border-emerald-400/40 hover:border-emerald-600",
    link: "/ai-unlockedd",
    description:
      "Access 0-cost video masterclasses, interactive prompt builders, AI knowledge assessment quizzes, and instant verifiable certificates of completion.",
    stats: [
      { label: "Cost", val: "100% Free" },
      { label: "Certificate", val: "Instant Verifiable" },
      { label: "Modules", val: "12 Masterclasses" },
    ],
    features: [
      "Hands-on AI Sandbox & Prompt Engineering",
      "Free Cheat Sheets & Resource Guides",
      "Instant Editable Certificate Generator",
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

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-14 text-center mx-auto max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-mist px-4 py-1.5 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-brand-red animate-glow-pulse" />
            <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-red">
              Learning Ecosystem
            </span>
          </span>
          <h2 className="display-font text-3xl sm:text-5xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
            Explore Our <span className="gradient-text">4 Pillars</span> of Professional Education
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            Choose the exact learning format aligned with your career goals, timeline, and
            professional depth.
          </p>
        </div>

        {/* Bento Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Hero Bento Card (PECP Flagship) */}
          <div className="lg:col-span-12">
            <TiltCard maxTilt={3}>
              <div
                onMouseEnter={() => setHoveredId(featuredPillar.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative overflow-hidden rounded-[2.5rem] p-8 sm:p-12 text-white shadow-2xl border border-white/15 transition-all duration-500 hover:shadow-brand-red/25"
              >
                {/* Background Image with Zoom & Dark Gradient Overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src="/images/pecp-hero-card-bg.png"
                    alt="PECP Executive Education"
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Gradient overlay for optimal readability & executive ambiance */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/90 to-slate-900/80 backdrop-blur-[2px]" />
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

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-red px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg shadow-red-900/40">
                        <Award className="h-3.5 w-3.5" />
                        {featuredPillar.badge}
                      </span>
                      <span className="text-xs font-bold text-amber-300/90 bg-amber-500/10 border border-amber-400/20 px-3 py-1 rounded-full backdrop-blur-xs">
                        {featuredPillar.subtitle}
                      </span>
                    </div>

                    <h3 className="display-font text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                      {featuredPillar.title}
                    </h3>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                      {featuredPillar.description}
                    </p>

                    {/* Features Checklist */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {featuredPillar.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-200">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-red/30 text-brand-red shrink-0">
                            <Check className="h-3.5 w-3.5 stroke-[3]" />
                          </div>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <Magnetic>
                        <Link to={featuredPillar.link as any} className="btn-primary group py-3.5 px-8 text-sm">
                          <span>Explore PECP Credentials</span>
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </Magnetic>
                    </div>
                  </div>

                  {/* Right Column: Stats Matrix Card */}
                  <div className="lg:col-span-5">
                    <div className="rounded-3xl border border-white/15 bg-white/5 p-6 sm:p-8 backdrop-blur-md space-y-6 shadow-2xl">
                      <div className="flex items-center justify-between">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-red text-white shadow-lg shadow-red-900/40">
                          <GraduationCap className="h-7 w-7 stroke-[2.2]" />
                        </div>
                        <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 text-[11px] font-extrabold text-emerald-400">
                          Official US Badge
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-3 border-y border-white/10 py-5">
                        {featuredPillar.stats.map((s) => (
                          <div key={s.label}>
                            <p className="text-[11px] text-slate-400 font-medium">{s.label}</p>
                            <p className="mt-1 text-xs sm:text-sm font-extrabold text-white">
                              {s.val}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-300">
                        <Globe2 className="h-4 w-4 text-brand-red shrink-0" />
                        <span>USC Upstate (USA) University Accreditation</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Secondary 3-Card Grid */}
          {gridPillars.map((pillar) => {
            const Icon = pillar.icon;
            const isHovered = hoveredId === pillar.id;

            return (
              <div key={pillar.id} className="lg:col-span-4">
                <TiltCard maxTilt={4}>
                  <div
                    onMouseEnter={() => setHoveredId(pillar.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={`h-full flex flex-col justify-between rounded-[2rem] border bg-white p-7 shadow-xl transition-all duration-300 relative overflow-hidden ${
                      isHovered
                        ? `${pillar.borderGlow} shadow-2xl -translate-y-1.5`
                        : "border-slate-200/80 hover:border-slate-300"
                    }`}
                  >
                    {/* Top Accent Bar */}
                    <div className="space-y-5">
                      <div className="flex items-center justify-between">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 ${pillar.accentColor} transition-transform duration-300 group-hover:scale-110`}
                        >
                          <Icon className="h-6 w-6 stroke-[2.2]" />
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider ${pillar.badgeColor}`}
                        >
                          {pillar.badge}
                        </span>
                      </div>

                      <div>
                        <h3 className="display-font text-xl font-extrabold text-brand-ink leading-tight">
                          {pillar.title}
                        </h3>
                        <p className="text-xs font-semibold text-slate-400 mt-1">
                          {pillar.subtitle}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {pillar.description}
                      </p>

                      {/* Features List */}
                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        {pillar.features.map((feat) => (
                          <div key={feat} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <Magnetic>
                        <Link
                          to={pillar.link as any}
                          className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50/80 px-4 py-2 text-xs font-extrabold text-brand-ink transition-all duration-300 hover:bg-brand-red hover:text-white hover:border-brand-red shadow-xs"
                        >
                          <span>Explore Offering</span>
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200/80 text-brand-ink transition-colors group-hover:bg-white/25 group-hover:text-white">
                            <ArrowRight className="h-3 w-3 stroke-[2.5]" />
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
    </section>
  );
}

