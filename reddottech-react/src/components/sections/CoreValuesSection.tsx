import { useState, useEffect, useCallback, useRef } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  Award,
  Sparkles,
  Globe2,
  TrendingUp,
  Users,
  CheckCircle2,
  Quote,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

export function CoreValuesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const TOTAL_VALUES = 5;
  const AUTO_CYCLE_MS = 4000;

  // Auto-cycle through values
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TOTAL_VALUES);
    }, AUTO_CYCLE_MS);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  // Reset timer on manual click
  const handleSelect = (idx: number) => {
    setActiveIndex(idx);
    startTimer();
  };

  const values = [
    {
      id: "excellence",
      number: "01",
      title: "Excellence",
      badge: "Quality Learning",
      tagline: "Quality Learning, Built with Purpose",
      desc: "We focus on creating structured learning experiences that combine relevant knowledge, practical application, and clear learning outcomes.",
      icon: Award,
      image: "/images/about/core-excellence.jpg",
      accentGradient: "from-rose-500 via-brand-red to-rose-700",
      themeColor: "text-brand-red",
      themeBg: "bg-brand-red",
      badgeStyle: "bg-rose-50 text-brand-red border-rose-200/80",
      glowBg: "bg-brand-red/10 border-brand-red/20",
      pillars: [
        {
          title: "Practical Content",
          desc: "Relevant concepts and workplace applications.",
        },
        {
          title: "Structured Learning",
          desc: "Clear courses and learning pathways.",
        },
        {
          title: "Quality Resources",
          desc: "Accessible learning materials and supporting resources.",
        },
      ],
      quote:
        "We believe professional learning should be practical, relevant, and built to a high standard.",
    },
    {
      id: "innovation",
      number: "02",
      title: "Innovation",
      badge: "Future-Ready",
      tagline: "Preparing for a Changing Workplace",
      desc: "Technology and industries continue to evolve. We focus on emerging technologies and relevant skills that help learners stay adaptable and prepared for what comes next.",
      icon: Sparkles,
      image: "/images/about/core-innovation.png",
      accentGradient: "from-amber-500 via-orange-500 to-amber-600",
      themeColor: "text-amber-600",
      themeBg: "bg-amber-500",
      badgeStyle: "bg-amber-50 text-amber-700 border-amber-200/80",
      glowBg: "bg-amber-500/10 border-amber-500/20",
      pillars: [
        {
          title: "Emerging Technologies",
          desc: "Learning pathways covering relevant technologies and modern tools.",
        },
        {
          title: "AI & Digital Skills",
          desc: "Dedicated learning through AI Unlocked and technology-focused programs.",
        },
        {
          title: "Continuous Learning",
          desc: "Programs designed to support ongoing professional development.",
        },
      ],
      quote:
        "We prepare learners to keep learning as technology and workplaces evolve.",
    },
    {
      id: "accessibility",
      number: "03",
      title: "Accessibility",
      badge: "Local Impact",
      tagline: "International Learning, Accessible Locally",
      desc: "We bring international academic collaboration and globally oriented learning opportunities to learners in Nepal through accessible online programs.",
      icon: Globe2,
      image: "/images/about/core-accessibility.png",
      accentGradient: "from-emerald-500 via-teal-500 to-emerald-700",
      themeColor: "text-emerald-600",
      themeBg: "bg-emerald-600",
      badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
      glowBg: "bg-emerald-500/10 border-emerald-500/20",
      pillars: [
        {
          title: "Online Access",
          desc: "Learn from anywhere through online, self-paced programs.",
        },
        {
          title: "Local Accessibility",
          desc: "Programs designed for learners in Nepal.",
        },
        {
          title: "Flexible Learning",
          desc: "Study around work, education, and other commitments.",
        },
      ],
      quote:
        "Global learning opportunities should be accessible to learners in Nepal.",
    },
    {
      id: "growth",
      number: "04",
      title: "Growth",
      badge: "Career Momentum",
      tagline: "Turning Learning into Professional Growth",
      desc: "We believe professional development is an ongoing journey. Our programs help learners build relevant skills, earn credentials, and prepare for new responsibilities and opportunities.",
      icon: TrendingUp,
      image: "/images/about/core-growth.png",
      accentGradient: "from-blue-500 via-indigo-500 to-blue-700",
      themeColor: "text-blue-600",
      themeBg: "bg-blue-600",
      badgeStyle: "bg-blue-50 text-blue-700 border-blue-200/80",
      glowBg: "bg-blue-500/10 border-blue-500/20",
      pillars: [
        {
          title: "Workplace Skills",
          desc: "Build knowledge and skills relevant to today’s workplace.",
        },
        {
          title: "Professional Development",
          desc: "Continue growing through structured learning pathways.",
        },
        {
          title: "Recognized Credentials",
          desc: "Earn credentials that validate your learning and development.",
        },
      ],
      quote:
        "Learning should help people keep moving forward.",
    },
    {
      id: "community",
      number: "05",
      title: "Community",
      badge: "Learning Community",
      tagline: "Creating Connections Through Learning",
      desc: "We believe learning is strengthened through shared ideas, discussions, and opportunities to stay connected with others on a similar professional journey.",
      icon: Users,
      image: "/images/about/core-community.png",
      accentGradient: "from-purple-500 via-violet-500 to-purple-700",
      themeColor: "text-purple-600",
      themeBg: "bg-purple-600",
      badgeStyle: "bg-purple-50 text-purple-700 border-purple-200/80",
      glowBg: "bg-purple-500/10 border-purple-500/20",
      pillars: [
        {
          title: "Peer Learning",
          desc: "Exchange perspectives and ideas through learning discussions.",
        },
        {
          title: "Knowledge Sharing",
          desc: "Learn from different experiences, approaches, and viewpoints.",
        },
        {
          title: "Continued Learning",
          desc: "Stay connected with new programs, resources, and learning opportunities.",
        },
      ],
      quote:
        "Learning doesn’t end with a course - it can be the beginning of continued growth and connection.",
    },
  ];

  const current = values[activeIndex];
  const CurrentIcon = current.icon;

  const handlePrev = () => {
    handleSelect(activeIndex === 0 ? values.length - 1 : activeIndex - 1);
  };

  const handleNext = () => {
    handleSelect((activeIndex + 1) % values.length);
  };

  return (
    <section
      id="values"
      className="relative py-12 sm:py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 border-t border-slate-200/80"
    >
      {/* Background Texture & Ambient Radial Glows */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-30"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--brand-red) 25%, transparent), transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 sm:mb-14 text-center mx-auto max-w-3xl space-y-2 sm:space-y-4">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-brand-red/20 bg-white px-3 sm:px-4 py-1 sm:py-1.5 shadow-xs">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-brand-red animate-pulse" />
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.14em] text-brand-red">
                Our Guiding Principles
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="display-font text-xl sm:text-3xl lg:text-5xl font-extrabold tracking-tight text-brand-ink leading-tight">
              Our Guiding <span className="gradient-text">Principles</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-xs sm:text-base text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
              Explore the 5 foundational principles that guide our training programs, quality
              benchmarks, and learner community across Nepal.
            </p>
          </ScrollReveal>
        </div>

        {/* Top 5 Pillar Nav Ribbon */}
        <div className="mb-6 flex items-center justify-between gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none">
          {values.map((v, idx) => {
            const isActive = idx === activeIndex;
            const Icon = v.icon;

            return (
              <button
                key={v.id}
                onClick={() => handleSelect(idx)}
                className={`group flex-1 min-w-[105px] sm:min-w-[140px] text-center rounded-xl sm:rounded-2xl p-2.5 sm:p-4 transition-all duration-300 border flex flex-col items-center gap-1.5 sm:gap-2 ${
                  isActive
                    ? "bg-white border-2 border-brand-red/50 shadow-md scale-[1.02]"
                    : "bg-white/70 border-slate-200/70 hover:bg-white hover:border-slate-300 shadow-xs"
                }`}
              >
                <div
                  className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl font-extrabold text-xs transition-all duration-300 ${
                    isActive
                      ? `${v.themeBg} text-white shadow-xs scale-105`
                      : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                  }`}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.2]" />
                </div>

                <div>
                  <span
                    className={`text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest block ${
                      isActive ? v.themeColor : "text-slate-400"
                    }`}
                  >
                    {v.number} • {v.badge}
                  </span>
                  <h4
                    className={`text-[11px] sm:text-sm font-extrabold tracking-tight transition-colors ${
                      isActive ? "text-brand-ink" : "text-slate-700 group-hover:text-brand-ink"
                    }`}
                  >
                    {v.title}
                  </h4>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Stage Showcase Box */}
        <div className="relative rounded-2xl sm:rounded-[2.25rem] border border-slate-200/90 bg-white p-4 sm:p-10 shadow-lg sm:shadow-2xl overflow-hidden">
          {/* Top Accent Bar */}
          <div
            className={`absolute inset-x-0 top-0 h-1.5 sm:h-2 bg-gradient-to-r ${current.accentGradient} transition-all duration-500`}
          />

          {/* Watermark Index Number */}
          <span className="pointer-events-none absolute right-4 top-3 sm:right-8 sm:top-6 text-5xl sm:text-9xl font-black text-slate-100/90 select-none">
            {current.number}
          </span>

          <div
            key={current.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center relative z-10 animate-fade-in"
          >
            {/* Left Column: Visual Showcase Image Card (5 Cols) */}
            <div className="lg:col-span-5 relative space-y-3 sm:space-y-4">
              <div className="relative group overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs aspect-16/10 sm:aspect-square bg-slate-100">
                <img
                  src={current.image}
                  alt={current.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-white">
                  <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest bg-slate-900 px-2.5 py-0.5 rounded-full border border-white/20">
                    {current.badge}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-300">
                    Principle {current.number} / 05
                  </span>
                </div>
              </div>

              {/* Floating Quote Box */}
              <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-900 via-brand-ink to-slate-900 p-3 sm:p-4 text-white shadow-md flex items-start gap-2.5 sm:gap-3">
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-brand-red/20 border border-brand-red/30 text-brand-red">
                  <Quote className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand-red" />
                </div>
                <p className="text-[11px] sm:text-xs font-semibold text-slate-200 italic leading-relaxed pt-0.5">
                  "{current.quote}"
                </p>
              </div>
            </div>

            {/* Right Column: Detailed Info & Deliverables Grid (7 Cols) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              {/* Header Row */}
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div
                    className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl border ${current.glowBg} shadow-xs shrink-0`}
                  >
                    <CurrentIcon
                      className={`h-5 w-5 sm:h-6 sm:w-6 ${current.themeColor} stroke-[2.2]`}
                    />
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider ${current.badgeStyle}`}
                    >
                      {current.badge}
                    </span>
                    <h3 className="display-font text-xl sm:text-3xl font-extrabold text-brand-ink tracking-tight mt-0.5">
                      {current.title}
                    </h3>
                  </div>
                </div>

                <h4
                  className={`text-xs sm:text-sm font-extrabold tracking-wide ${current.themeColor} pt-1`}
                >
                  {current.tagline}
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                  {current.desc}
                </p>
              </div>

              {/* 3 Core Pillars Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {current.pillars.map((p, pIdx) => (
                  <div
                    key={pIdx}
                    className="rounded-2xl bg-slate-50/90 border border-slate-200/70 p-3.5 space-y-1 transition-all hover:bg-white hover:border-slate-300 hover:shadow-md"
                  >
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className={`h-4 w-4 ${current.themeColor} shrink-0`} />
                      <h5 className="text-xs font-extrabold text-brand-ink">{p.title}</h5>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium leading-normal pt-0.5">
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Stage Controls & Navigation Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-xs hover:bg-brand-red hover:text-white hover:border-brand-red transition-all cursor-pointer"
                    aria-label="Previous principle"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-xs hover:bg-brand-red hover:text-white hover:border-brand-red transition-all cursor-pointer"
                    aria-label="Next principle"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-ink px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-brand-red cursor-pointer"
                >
                  <span>Next Principle</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
