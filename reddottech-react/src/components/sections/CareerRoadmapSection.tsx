import {
  GraduationCap,
  Zap,
  Award,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Compass,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Magnetic } from "@/components/motion/Magnetic";

export function CareerRoadmapSection() {
  const steps = [
    {
      number: "01",
      title: "Enroll & Skill Assessment",
      icon: GraduationCap,
      phase: "PHASE 01: ONBOARDING",
      shortDesc: "Personalized skill matrix evaluation to map your ideal trajectory.",
      highlights: ["Skill Gap Analysis", "Personalized Roadmap", "Instructor Matching"],
      gradient: "from-rose-500 to-brand-red",
      iconBg: "bg-rose-50 text-brand-red border-rose-200/80",
    },
    {
      number: "02",
      title: "Hands-on Live Labs & Capstones",
      icon: Zap,
      phase: "PHASE 02: IMMERSIVE TRAINING",
      shortDesc: "Scenario-based simulations and real corporate capstones.",
      highlights: ["Live Weekend Sessions", "Real Corporate Datasets", "1-on-1 Code Reviews"],
      gradient: "from-amber-500 to-orange-500",
      iconBg: "bg-amber-50 text-amber-600 border-amber-200/80",
    },
    {
      number: "03",
      title: "Global Certification",
      icon: Award,
      phase: "PHASE 03: ACCREDITATION",
      shortDesc: "Dual credentials co-certified with premier US university partners.",
      highlights: ["Dual Digital Badges", "Verifiable Credential URL", "US Transcript"],
      gradient: "from-emerald-500 to-teal-500",
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200/80",
    },
    {
      number: "04",
      title: "Career Accelerator",
      icon: Briefcase,
      phase: "PHASE 04: PLACEMENT & GROWTH",
      shortDesc: "Spotlighting your profile to 40+ corporate hiring partners.",
      highlights: ["Executive Resume Makeover", "Direct Corporate Referrals", "Alumni Network"],
      gradient: "from-blue-500 to-indigo-500",
      iconBg: "bg-blue-50 text-blue-600 border-blue-200/80",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/70 to-white py-16 sm:py-24 border-y border-slate-200/80">
      {/* Background Soft Orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-[10%] right-[15%] h-[450px] w-[450px] rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, color-mix(in oklab, var(--brand-red) 20%, transparent), transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-[10%] left-[10%] h-[400px] w-[400px] rounded-full opacity-15 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(56, 189, 248, 0.2), transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 text-center mx-auto max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-white px-4 py-1.5 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-brand-red animate-pulse" />
            <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-red">
              Career Transformation Path
            </span>
          </div>

          <h2 className="display-font text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-brand-ink leading-tight">
            Your 4-Step Journey to <span className="gradient-text">Global Excellence</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            A structured, high-impact progression engineered to transform ambition into verified industry leadership.
          </p>
        </div>

        {/* 4 Connected Cards Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Top Connecting Line for Desktop */}
          <div className="hidden lg:block absolute left-12 right-12 top-16 h-0.5 bg-gradient-to-r from-brand-red/40 via-amber-400/40 to-blue-500/40 z-0" />

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-7 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-brand-red/40 hover:-translate-y-1 z-10"
              >
                {/* Top Accent Gradient Bar */}
                <div
                  className={`absolute inset-x-0 top-0 h-1.5 rounded-t-3xl bg-gradient-to-r ${step.gradient}`}
                />

                <div>
                  {/* Card Header: Icon + Step Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${step.iconBg} shadow-xs transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="h-7 w-7 stroke-[2]" />
                    </div>

                    <span className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-black tracking-wider text-white shadow-xs">
                      STEP {step.number}
                    </span>
                  </div>

                  {/* Phase Label */}
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-red">
                    {step.phase}
                  </span>

                  {/* Title */}
                  <h3 className="mt-1.5 text-lg font-extrabold text-brand-ink tracking-tight transition-colors group-hover:text-brand-red">
                    {step.title}
                  </h3>

                  {/* Short Description */}
                  <p className="mt-2.5 text-xs text-slate-500 leading-relaxed font-medium">
                    {step.shortDesc}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="mt-6 pt-5 border-t border-slate-100 space-y-2">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">
                      Key Deliverables:
                    </p>
                    {step.highlights.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-brand-red" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red">
              <Compass className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-extrabold text-brand-ink">
                Ready to begin Step 01 of your trajectory?
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Connect with an academic counselor for a free 1-on-1 strategy session.
              </p>
            </div>
          </div>

          <Magnetic>
            <Link to={"/contactt" as any} className="btn-primary shrink-0 px-6 py-3.5 text-xs">
              <span>Schedule Free Advice</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
