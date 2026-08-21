import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
  Target,
  ShieldCheck,
  CheckCircle2,
  Globe2,
  ChevronRight,
} from "lucide-react";
import { TiltCard } from "@/components/motion/TiltCard";
import { Magnetic } from "@/components/motion/Magnetic";

const tabs = [
  {
    id: "story",
    label: "Who We Are",
    icon: Sparkles,
    badge: "Professional Education Hub",
    title: "Your Partner in Professional Growth and Career Advancement",
    subtitle:
      "Red Dot Technologies Pvt. Ltd. is an emerging IT and professional skills training provider in Nepal, equipping learners with practical, industry-relevant skills and globally recognized certifications.",
    points: [
      "Emerging IT and professional skills training provider in Nepal",
      "Practical, industry-relevant skills and globally recognized certifications",
      "Global credibility combined with local accessibility",
    ],
  },
  {
    id: "partnership",
    label: "US Academic Partnership",
    icon: Globe2,
    badge: "USC Upstate (USA)",
    title: "High-Quality Programs Co-Developed with US University Faculty",
    subtitle:
      "Through academic partnerships with global institutions like University of South Carolina Upstate (USA), we deliver high-quality programs combining global credibility with local accessibility.",
    points: [
      "Transcripts & badging co-developed with US university faculty",
      "Dual certification for PECP & Six Sigma Black Belt graduates",
      "Direct pathway for global higher education and overseas careers",
    ],
  },
  {
    id: "excellence",
    label: "Our Commitment",
    icon: ShieldCheck,
    badge: "Local Accessibility",
    title: "Equipping Learners for Local & International Tech Opportunities",
    subtitle:
      "Our focus is creating opportunities for students, early-career professionals, and working employees to upskill, earn credentials, and thrive in competitive domestic & global tech markets.",
    points: [
      "100% live instructor-led weekend & online cohorts",
      "Comprehensive downloadable study guides & toolkits",
      "Free AI Unlocked community initiatives across Nepal",
    ],
  },
];

const pillars = [
  {
    svg: "/images/about/vision.svg",
    icon: Target,
    label: "Our Vision",
    text: "To become Nepal’s leading professional training and certification institute, recognized for empowering individuals with globally relevant skills and establishing Nepal as a hub for future-ready talent.",
    color: "from-brand-red to-rose-600",
  },
  {
    svg: "/images/about/mission.svg",
    icon: Sparkles,
    label: "Our Mission",
    text: "To empower individuals and organizations in Nepal with industry-relevant skills, global certifications, and career-focused training that open doors to opportunities at home and beyond.",
    color: "from-amber-500 to-orange-600",
  },
];

export function HomeAboutSection() {
  const [activeTab, setActiveTab] = useState("story");
  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section className="section-padding-lg bg-[var(--color-background)] relative overflow-hidden">
      {/* Background Orbs & Ambient Gradients */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="animate-float absolute top-[15%] left-[5%] h-80 w-80 rounded-full opacity-30 blur-[90px]"
          style={{
            background: "radial-gradient(circle, rgba(251, 146, 60, 0.4) 0%, transparent 70%)",
          }}
        />
        <div
          className="animate-float absolute bottom-[15%] right-[5%] h-96 w-96 rounded-full opacity-25 blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--brand-red) 50%, transparent) 0%, transparent 70%)",
            animationDelay: "2.5s",
          }}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-25" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-14 text-center mx-auto max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-mist px-4 py-1.5 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-brand-red animate-glow-pulse" />
            <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-red">
              About Red Dot Technologies
            </span>
          </span>
          <h2 className="display-font text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
            Your Partner in Professional <br />
            <span className="gradient-text">Growth and Career Advancement</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            Red Dot Technologies Pvt. Ltd. is an emerging IT and professional skills training
            provider in Nepal equipping learners with practical, industry-relevant skills.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Composite Image & Floating Glass Badges */}
          <div className="lg:col-span-6 relative">
            <TiltCard maxTilt={4}>
              <div className="relative">
                {/* Glowing Backlight */}
                <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-tr from-brand-red/30 via-amber-500/20 to-indigo-500/15 blur-3xl opacity-80" />

                {/* Primary Showcase Card Container */}
                <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/90 bg-gradient-to-br from-slate-900 via-brand-ink to-slate-950 p-3 shadow-2xl">
                  <div className="relative w-full aspect-square sm:aspect-[4/3] overflow-hidden rounded-[2rem] bg-slate-950">
                    <img
                      src="/images/about/about-hero.png"
                      alt="Red Dot Technologies — Global Masterclass & Certification"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />

                    {/* Bottom Spotlight Bar */}
                    <div className="absolute bottom-4 left-4 right-4 z-20 p-4 rounded-2xl bg-slate-900 border border-white/15 flex items-center justify-between text-white shadow-2xl">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-red text-white shadow-md">
                          <Globe2 className="h-5 w-5 stroke-[2]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-extrabold text-white truncate">
                            International Recognition
                          </p>
                          <p className="text-[10px] text-slate-300 font-medium truncate mt-0.5">
                            Co-Certified with U.S. University Standard
                          </p>
                        </div>
                      </div>
                      <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 shrink-0">
                        VERIFIED
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Tabbed Interactive Storytelling */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-5 sm:space-y-6">
            {/* Tab Selector Buttons */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 p-1 sm:p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200/80 w-full sm:w-fit select-none">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-extrabold transition-all duration-200 text-center cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? "bg-white text-brand-ink shadow-md"
                        : "text-slate-600 hover:text-brand-ink hover:bg-white/50"
                    }`}
                  >
                    <Icon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 ${isActive ? "text-brand-red" : "text-slate-400"}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Tab Panel (Fixed Stable Height Box) */}
            <div className="rounded-[2rem] sm:rounded-[2.25rem] border border-slate-200/90 bg-white p-5 sm:p-8 pb-6 sm:pb-8 shadow-xl relative overflow-hidden flex flex-col justify-between gap-4 sm:gap-5 min-h-[460px] sm:min-h-[480px] lg:min-h-[475px]">
              <div className="space-y-3 sm:space-y-3.5 flex-1 flex flex-col justify-between">
                {/* Badge area with fixed min-height */}
                <div className="flex items-center gap-2 min-h-[26px]">
                  <span className="badge-brand">{currentTab.badge}</span>
                </div>

                {/* Title area with fixed min-height */}
                <div className="min-h-[52px] sm:min-h-[64px] flex items-center">
                  <h3 className="display-font text-xl sm:text-3xl font-extrabold text-brand-ink leading-snug">
                    {currentTab.title}
                  </h3>
                </div>

                {/* Subtitle with fixed min-height */}
                <div className="min-h-[58px] sm:min-h-[68px] flex items-center">
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium line-clamp-3">
                    {currentTab.subtitle}
                  </p>
                </div>

                {/* Bullet Points with uniform row heights */}
                <div className="space-y-2 sm:space-y-2.5 pt-2 sm:pt-3 border-t border-slate-100 min-h-[105px] sm:min-h-[115px]">
                  {currentTab.points.map((pt) => (
                    <div key={pt} className="flex items-start gap-2.5 sm:gap-3 min-h-[26px] sm:min-h-[28px]">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-semibold text-slate-700 leading-snug line-clamp-2">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions Row (Pinned Stably at Bottom) */}
              <div className="pt-3 sm:pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2.5 sm:gap-4 shrink-0 mt-auto">
                <Magnetic>
                  <Link to="/about" className="btn-primary group text-xs sm:text-sm py-3 px-6 justify-center w-full sm:w-auto text-center">
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-extrabold text-brand-ink hover:text-brand-red transition-colors py-2 px-3 w-full sm:w-auto text-center"
                  >
                    <span>Speak to Academic Advisor</span>
                    <ChevronRight className="h-4 w-4 text-brand-red" />
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Vision & Mission Cards */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-4 sm:p-6 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
              >
                <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${item.color}`} />
                <div className="flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-brand-red/8 text-brand-red transition-all duration-300 group-hover:bg-brand-red group-hover:text-white group-hover:scale-110 mb-2.5 sm:mb-4 p-1.5 sm:p-2.5">
                  {item.svg ? (
                    <img src={item.svg} alt={item.label} className="h-4 w-4 sm:h-6 sm:w-6 object-contain" />
                  ) : (
                    <Icon className="h-4 w-4 sm:h-6 sm:w-6 stroke-[2.2]" />
                  )}
                </div>
                <h3 className="display-font text-sm sm:text-lg font-bold text-brand-ink">{item.label}</h3>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm leading-relaxed text-slate-500 font-medium">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}



