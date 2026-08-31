import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Award, ArrowRight, CheckCircle2, Zap } from "lucide-react";
import { TiltCard } from "@/components/motion/TiltCard";
import { Magnetic } from "@/components/motion/Magnetic";

const features = [
  {
    id: "faculty",
    title: "USC Upstate Faculty",
    badge: "Top U.S. Faculty",
    icon: "/images/hero/upstate-faculty.svg",
    description: "Courses taught by USC Upstate faculty with international experience",
    highlights: [
      "Direct mentorship from senior U.S. university professors",
      "Real-world case studies & executive masterclasses",
      "Global industry exposure tailored for Nepalese workforce",
    ],
    statsLabel: "Mentorship",
    statsVal: "1-on-1 Weekly",
    accentColor: "from-brand-red to-rose-600",
    glowColor: "rgba(217, 31, 38, 0.4)",
    badgeBg: "bg-red-50 text-brand-red border-brand-red/20",
  },
  {
    id: "format",
    title: "Flexible Formate",
    badge: "Live & On-Demand",
    icon: "/images/hero/flexible-format.svg",
    description: "Online or Instructor-led for working professionals",
    highlights: [
      "Live weekend interactive online masterclasses",
      "On-demand video recordings & downloadable study guides",
      "Designed for full-time engineers, managers & executives",
    ],
    statsLabel: "Schedule",
    statsVal: "Weekend / Live",
    accentColor: "from-amber-500 to-orange-600",
    glowColor: "rgba(245, 158, 11, 0.4)",
    badgeBg: "bg-amber-50 text-amber-600 border-amber-500/20",
  },
  {
    id: "recognition",
    title: "Global Recognization",
    badge: "US Certified Credentials",
    icon: "/images/hero/global-recognization.svg",
    description: "Certification-backed learning with global recognition",
    highlights: [
      "Official credentials issued with USC Upstate (USA)",
      "Verifiable digital badge for LinkedIn & resume verification",
      "Accepted by multinational employers and overseas universities",
    ],
    statsLabel: "Accreditation",
    statsVal: "US University",
    accentColor: "from-indigo-600 to-blue-600",
    glowColor: "rgba(99, 102, 241, 0.4)",
    badgeBg: "bg-indigo-50 text-indigo-600 border-indigo-500/20",
  },
];

export function FeaturesSection() {
  const [activeId, setActiveId] = useState<string>("faculty");
  const activeFeature = features.find((f) => f.id === activeId) || features[0];

  return (
    <section className="section-padding-lg bg-[var(--surface-elevated)] relative overflow-hidden">
      {/* Dynamic Ambient Background Orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="animate-float absolute top-[10%] left-[15%] h-96 w-96 rounded-full opacity-25 blur-[100px] transition-all duration-700"
          style={{
            background: `radial-gradient(circle, ${activeFeature.glowColor} 0%, transparent 70%)`,
          }}
        />
        <div
          className="animate-float absolute bottom-[10%] right-[10%] h-80 w-80 rounded-full opacity-20 blur-[90px]"
          style={{
            background: "radial-gradient(circle, rgba(125, 211, 252, 0.3) 0%, transparent 70%)",
            animationDelay: "2.5s",
          }}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-15" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header Section */}
        <div className="mb-6 sm:mb-12 text-center mx-auto max-w-3xl space-y-2 sm:space-y-4">
          <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-brand-red/20 bg-brand-red/5 px-3 sm:px-4 py-1 sm:py-1.5 shadow-xs">
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-brand-red animate-glow-pulse" />
            <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.14em] text-brand-red">
              PECP Key Highlights
            </span>
          </span>

          <h2 className="display-font text-xl sm:text-3xl lg:text-5xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
            Professional <span className="gradient-text">Excellence and Certification</span> Program
            (PECP)
          </h2>

          <p className="text-xs sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            PECP is a flagship collaboration between Red Dot Technologies and University of South
            Carolina Upstate (USA), designed to bridge global expertise with local relevance.
          </p>
        </div>

        {/* Subtitle */}
        <div className="mb-6 sm:mb-8 text-center">
          <h3 className="display-font text-lg sm:text-2xl font-extrabold text-brand-ink">
            Check Out Key <span className="gradient-text">Features</span>
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-0.5 sm:mt-1">
            Click any feature below to inspect detailed curriculum benefits
          </p>
        </div>

        {/* 3 Interactive Feature Cards — 2-Column Mobile Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-6 items-stretch mb-4 sm:mb-10">
          {features.map((item, index) => {
            const isActive = activeId === item.id;
            const isLastCard = index === features.length - 1;

            return (
              <div
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className={`cursor-pointer ${isLastCard ? "col-span-2 md:col-span-1" : "col-span-1"}`}
              >
                <TiltCard maxTilt={5} className="h-full">
                  <div
                    className={`group relative h-full overflow-hidden rounded-xl sm:rounded-[2.25rem] border p-3 sm:p-8 transition-all duration-300 flex flex-col justify-between ${
                      isActive
                        ? "bg-white border-brand-red/40 shadow-md sm:shadow-xl scale-[1.01] ring-2 ring-brand-red/20"
                        : "bg-white/90 border-slate-200/80 hover:bg-white hover:border-slate-300 shadow-xs sm:shadow-sm"
                    }`}
                  >
                    {/* Top Glow Accent Bar */}
                    <div
                      className={`absolute inset-x-0 top-0 h-1 sm:h-1.5 bg-gradient-to-r ${item.accentColor} transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                    />

                    {/* Card Header: Watermark Number & Badge */}
                    <div className="space-y-2.5 sm:space-y-5">
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 sm:px-3 sm:py-1 text-[8px] sm:text-[11px] font-extrabold uppercase tracking-wider truncate max-w-[110px] sm:max-w-none ${item.badgeBg}`}
                        >
                          <Zap className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0" />
                          <span className="truncate">{item.badge}</span>
                        </span>
                        <span className="display-font text-lg sm:text-3xl font-extrabold text-slate-200 group-hover:text-brand-red/30 transition-colors shrink-0">
                          0{index + 1}
                        </span>
                      </div>

                      {/* Icon Pedestal */}
                      <div
                        className={`flex h-8 w-8 sm:h-16 sm:w-16 items-center justify-center rounded-lg sm:rounded-2xl p-1.5 sm:p-3.5 transition-all duration-300 shadow-xs ${
                          isActive
                            ? "bg-brand-red text-white scale-105 shadow-md shadow-red-900/30 ring-2 ring-brand-red/20"
                            : "bg-slate-900 text-white group-hover:bg-brand-red group-hover:scale-105"
                        }`}
                      >
                        <img
                          src={item.icon}
                          alt={item.title}
                          className="h-4 w-4 sm:h-8 sm:w-8 object-contain filter brightness-0 invert transition-all duration-300"
                        />
                      </div>

                      {/* Title & Description */}
                      <div>
                        <h4 className="display-font text-xs sm:text-xl font-extrabold text-brand-ink mb-0.5 sm:mb-1.5">
                          {item.title}
                        </h4>
                        <p className="text-slate-600 text-[10px] sm:text-sm leading-snug sm:leading-relaxed font-medium line-clamp-2 sm:line-clamp-none">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>

        {/* Feature Spotlight Drawer / Interactive Showcase Card */}
        <div className="rounded-2xl sm:rounded-[2.5rem] border border-slate-200/80 bg-white p-5 sm:p-8 lg:p-9 shadow-lg relative overflow-hidden min-h-[360px] sm:min-h-[380px] lg:min-h-[340px] flex flex-col justify-center">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-red via-amber-500 to-indigo-600" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center h-full">
            {/* Left Info */}
            <div className="lg:col-span-8 space-y-3.5 sm:space-y-4 flex flex-col justify-between">
              <div className="flex items-center gap-2 sm:gap-3 min-h-[24px]">
                <span className="badge-brand">Spotlight Feature</span>
                <span className="text-xs font-bold text-slate-400">|</span>
                <span className="text-xs font-extrabold text-brand-red uppercase tracking-wider">
                  {activeFeature.title}
                </span>
              </div>

              <div className="min-h-[36px] sm:min-h-[44px] flex items-center">
                <h4 className="display-font text-2xl sm:text-3xl font-extrabold text-brand-ink">
                  Why {activeFeature.title} Sets PECP Apart
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
                {activeFeature.highlights.map((h) => (
                  <div
                    key={h}
                    className="flex items-start gap-3 bg-slate-50 p-3 sm:p-3.5 rounded-2xl border border-slate-100 min-h-[52px] sm:min-h-[56px]"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-700 leading-snug line-clamp-2">
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Action */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-5 sm:p-6 rounded-3xl bg-slate-950 text-white space-y-3 sm:space-y-4 text-center shadow-xl relative overflow-hidden h-full min-h-[260px]">
              <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-20" />
              <div className="relative z-10 space-y-2.5 sm:space-y-3">
                <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-brand-red text-white mx-auto shadow-lg shadow-red-900/40">
                  <Award className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h5 className="text-sm font-extrabold text-white">USC Upstate (USA) Partnership</h5>
                <p className="text-xs text-slate-300 font-medium max-w-xs">
                  Globally recognized certification programs with limited executive cohort seats.
                </p>
                <Magnetic>
                  <Link
                    to="/pecp"
                    className="btn-primary group text-xs py-2.5 sm:py-3 px-6 w-full justify-center"
                  >
                    <span>Enroll In PECP Batch</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
