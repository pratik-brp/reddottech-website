import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  Award,
  Sparkles,
  Globe2,
  TrendingUp,
  Users,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Quote,
  ArrowRight,
} from "lucide-react";

export function CoreValuesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const values = [
    {
      id: "excellence",
      number: "01",
      title: "Excellence",
      badge: "Quality Standard",
      badgeColor: "bg-rose-50 text-brand-red border-rose-200/80",
      tagline: "Setting Nepal's Benchmark for World-Class Executive Training",
      desc: "We uphold uncompromising standards across every course, syllabus design, instructor selection, and certification exam—ensuring learners receive education on par with international tier-1 universities.",
      icon: Award,
      image: "/images/about/international-recognition.png",
      accentColor: "from-rose-500 via-brand-red to-rose-700",
      themeColor: "text-brand-red",
      themeBg: "bg-brand-red",
      glowBg: "bg-brand-red/10 border-brand-red/20",
      pillars: [
        { title: "Curriculum Rigor", desc: "Built alongside USC Upstate academic benchmarks." },
        { title: "Expert Faculty", desc: "Led by industry practitioners & patented professionals." },
        { title: "Quality Audits", desc: "100% course evaluation & verifiable credentials." },
      ],
      quote: "Excellence is not an act, but a habit embedded in every lab, module, and certification we issue.",
    },
    {
      id: "innovation",
      number: "02",
      title: "Innovation",
      badge: "Future-Ready",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200/80",
      tagline: "Adapting to AI, Automation & Emerging Industry Shifts",
      desc: "Technology moves fast. We continuously refresh our program offerings with real-world AI tools, machine learning pipelines, and hands-on capstone laboratory scenarios.",
      icon: Sparkles,
      image: "/images/about/expert-trainers.png",
      accentColor: "from-amber-500 via-orange-500 to-amber-600",
      themeColor: "text-amber-600",
      themeBg: "bg-amber-500",
      glowBg: "bg-amber-500/10 border-amber-500/20",
      pillars: [
        { title: "AI Integration", desc: "Generative & Machine Learning modules embedded in courses." },
        { title: "Live Capstone Labs", desc: "Real corporate scenario simulations instead of pure theory." },
        { title: "Agile Curriculum", desc: "Quarterly updates matching global technology standards." },
      ],
      quote: "We don't teach yesterday's methods; we prepare our learners for tomorrow's tech landscape.",
    },
    {
      id: "accessibility",
      number: "03",
      title: "Accessibility",
      badge: "Local Impact",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
      tagline: "Bringing International Tier-1 Education Directly to Nepal",
      desc: "We believe world-class education should not require leaving Nepal. We break financial and geographical barriers through hybrid schedules and accessible Nepalese rupee tuition rates.",
      icon: Globe2,
      image: "/images/about/flexible-learning.png",
      accentColor: "from-emerald-500 via-teal-500 to-emerald-700",
      themeColor: "text-emerald-600",
      themeBg: "bg-emerald-600",
      glowBg: "bg-emerald-500/10 border-emerald-500/20",
      pillars: [
        { title: "Hybrid Learning", desc: "Live weekend masterclasses & flexible self-paced video modules." },
        { title: "Affordable Tuition", desc: "Premium international certification at local Nepalese rates." },
        { title: "Kathmandu HQ", desc: "Modern physical learning center & nationwide online reach." },
      ],
      quote: "Global credentials, delivered locally—empowering Nepalese professionals right here at home.",
    },
    {
      id: "growth",
      number: "04",
      title: "Growth",
      badge: "Career Momentum",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200/80",
      tagline: "Transforming Knowledge into Promotions, Hires & Leadership Roles",
      desc: "Education is measured by real outcomes. We track and support every learner’s professional progress, connecting them with hiring partners, career counseling, and senior mentorship.",
      icon: TrendingUp,
      image: "/images/about/career-advancement.png",
      accentColor: "from-blue-500 via-indigo-500 to-blue-700",
      themeColor: "text-blue-600",
      themeBg: "bg-blue-600",
      glowBg: "bg-blue-500/10 border-blue-500/20",
      pillars: [
        { title: "Career Referrals", desc: "Direct placement pipeline to 40+ corporate partners." },
        { title: "Leadership Focus", desc: "Management frameworks, DMAIC Six Sigma, & soft skills." },
        { title: "Verifiable Badges", desc: "Sharable digital credentials for LinkedIn & corporate recruiters." },
      ],
      quote: "Our success is measured exclusively by the promotions and breakthroughs of our alumni.",
    },
    {
      id: "community",
      number: "05",
      title: "Community",
      badge: "Network & Alumni",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
      tagline: "A Thriving Ecosystem of 12,000+ Certified Leaders & Mentors",
      desc: "When you join RedDot, you gain a lifelong professional network of engineers, managers, and corporate leaders across Nepal and abroad.",
      icon: Users,
      image: "/images/pecp/batch.png",
      accentColor: "from-purple-500 via-violet-500 to-purple-700",
      themeColor: "text-purple-600",
      themeBg: "bg-purple-600",
      glowBg: "bg-purple-500/10 border-purple-500/20",
      pillars: [
        { title: "12K+ Alumni Network", desc: "Connect with certified professionals across tech and business." },
        { title: "Peer Masterclasses", desc: "Guest lectures, alumni roundtables, and networking events." },
        { title: "Lifelong Access", desc: "Permanent access to course updates and alumni privileges." },
      ],
      quote: "You enter as a learner, and remain forever part of Nepal's premier certified professional network.",
    },
  ];

  const current = values[activeIndex];
  const CurrentIcon = current.icon;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? values.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === values.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-slate-50/80 border-y border-slate-200/80">
      {/* Background Texture & Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-30" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full opacity-20 blur-3xl transition-all duration-700"
          style={{
            background: "radial-gradient(circle, color-mix(in oklab, var(--brand-red) 25%, transparent), transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-12 sm:mb-16 text-center mx-auto max-w-3xl space-y-4">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-white px-4 py-1.5 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-brand-red animate-pulse" />
              <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-red">
                Our Guiding Principles
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="display-font text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-ink leading-tight">
              Our Core <span className="gradient-text">Values</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
              Explore the 5 foundational pillars that guide our training programs, quality benchmarks, and learner community across Nepal.
            </p>
          </ScrollReveal>
        </div>

        {/* Unique Interactive Split Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

          {/* Left Column: Interactive Vertical Timeline Stepper */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            <div className="relative space-y-3">

              {/* Connecting Vertical Track Line */}
              <div className="absolute left-[29px] top-6 bottom-6 w-0.5 bg-slate-200/80 -z-0 hidden sm:block" />

              {values.map((v, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <button
                    key={v.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`group relative w-full text-left rounded-2xl p-3.5 sm:p-4 transition-all duration-300 flex items-center justify-between z-10 ${isActive
                        ? "bg-white border-2 border-brand-red/50 shadow-xl scale-[1.02]"
                        : "bg-white/70 border border-slate-200/70 hover:bg-white hover:border-slate-300 shadow-xs"
                      }`}
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Step Index Badge / Thumbnail Image */}
                      <div
                        className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl overflow-hidden font-extrabold text-sm transition-all duration-300 ${isActive
                            ? `${v.themeBg} text-white shadow-md scale-105`
                            : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                          }`}
                      >
                        <img
                          src={v.image}
                          alt={v.title}
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isActive ? "opacity-30 mix-blend-overlay" : "opacity-20 group-hover:opacity-30"
                            }`}
                        />
                        <span className="relative z-10">{v.number}</span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-extrabold uppercase tracking-wider ${isActive ? v.themeColor : "text-slate-400"
                              }`}
                          >
                            {v.badge}
                          </span>
                        </div>
                        <h4
                          className={`text-base font-extrabold tracking-tight transition-colors ${isActive ? "text-brand-ink" : "text-slate-700 group-hover:text-brand-ink"
                            }`}
                        >
                          {v.title}
                        </h4>
                      </div>
                    </div>

                    {/* Active Chevron Indicator */}
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${isActive
                          ? `${v.glowBg} ${v.themeColor} rotate-0`
                          : "text-slate-300 opacity-0 group-hover:opacity-100 -rotate-45"
                        }`}
                    >
                      <ChevronRight className="h-5 w-5 stroke-[2.5]" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Stage Controls Footer */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-200/80 text-xs font-semibold text-slate-500">
              <span>Pillar {activeIndex + 1} of {values.length}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-xs hover:bg-brand-red hover:text-white hover:border-brand-red transition-all"
                  aria-label="Previous value"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-xs hover:bg-brand-red hover:text-white hover:border-brand-red transition-all"
                  aria-label="Next value"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Glass Spotlight Stage Card with Image */}
          <div className="lg:col-span-7 flex">
            <div className="relative w-full rounded-[2.25rem] border border-slate-200/90 bg-white p-6 sm:p-9 shadow-2xl overflow-hidden flex flex-col justify-between">

              {/* Dynamic Top Accent Gradient Bar */}
              <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${current.accentGradient} transition-all duration-500`} />

              {/* Watermark Index Number */}
              <span className="pointer-events-none absolute right-8 top-6 text-7xl sm:text-9xl font-black text-slate-100/90 select-none">
                {current.number}
              </span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative z-10 space-y-6"
                >
                  {/* Image & Spotlight Header Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">

                    {/* Value Visual Image Showcase Card */}
                    <div className="sm:col-span-5 relative group overflow-hidden rounded-2xl border border-slate-200/80 shadow-md aspect-4/3 sm:aspect-square bg-slate-100">
                      <img
                        src={current.image}
                        alt={current.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                          {current.badge}
                        </span>
                      </div>
                    </div>

                    {/* Header Info */}
                    <div className="sm:col-span-7 space-y-2.5">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${current.glowBg} shadow-xs shrink-0`}>
                          <CurrentIcon className={`h-6 w-6 ${current.themeColor} stroke-[2.2]`} />
                        </div>
                        <div>
                          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${current.badgeColor}`}>
                            {current.badge}
                          </span>
                          <h3 className="display-font text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight mt-0.5">
                            {current.title}
                          </h3>
                        </div>
                      </div>

                      <h4 className={`text-xs sm:text-sm font-extrabold tracking-wide ${current.themeColor}`}>
                        {current.tagline}
                      </h4>
                      <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                        {current.desc}
                      </p>
                    </div>
                  </div>

                  {/* 3 Core Pillars Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    {current.pillars.map((p, pIdx) => (
                      <div
                        key={pIdx}
                        className="rounded-2xl bg-slate-50/90 border border-slate-200/70 p-3.5 space-y-1 transition-all hover:bg-white hover:border-slate-300 hover:shadow-md"
                      >
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className={`h-3.5 w-3.5 ${current.themeColor} shrink-0`} />
                          <h5 className="text-xs font-extrabold text-brand-ink">{p.title}</h5>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium leading-normal">{p.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Highlight Quote Box */}
                  <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-brand-ink to-slate-900 p-4 text-white shadow-xl flex items-start gap-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-red/20 border border-brand-red/30 text-brand-red">
                      <Quote className="h-4 w-4 text-brand-red" />
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-200 italic leading-relaxed pt-0.5">
                      "{current.quote}"
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress Dots Bar at Bottom */}
              <div className="relative z-10 pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {values.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => setActiveIndex(dotIdx)}
                      className={`h-2 rounded-full transition-all duration-300 ${dotIdx === activeIndex ? `w-8 ${current.themeBg}` : "w-2 bg-slate-200 hover:bg-slate-300"
                        }`}
                      aria-label={`Go to pillar ${dotIdx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold text-brand-ink hover:text-brand-red transition-colors"
                >
                  <span>Next Pillar</span>
                  <ArrowRight className="h-3.5 w-3.5 text-brand-red" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
