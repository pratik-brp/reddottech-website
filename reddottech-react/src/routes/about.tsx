import { createFileRoute, Link } from "@tanstack/react-router";
import { CtaSection } from "@/components/sections/CtaSection";
import { CoreValuesSection } from "@/components/sections/CoreValuesSection";
import { WhatWeDoSection } from "@/components/sections/WhatWeDoSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { Magnetic } from "@/components/motion/Magnetic";
import {
  Award,
  Zap,
  TrendingUp,
  ShieldCheck,
  Target,
  ArrowRight,
  Sparkles,
  GraduationCap,
  PhoneCall,
  Building2,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Red Dot Technologies — Empowering Professionals in Nepal" },
      {
        name: "description",
        content:
          "Learn about Red Dot Technologies Pvt. Ltd., our mission, vision, core values, services, and why learners in Nepal choose our globally recognized certification programs.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Page Hero */}
      <PageHero
        badge="About Red Dot Technologies"
        title="Building Nepal's Premier Talent & Executive Workforce"
        subtitle="Red Dot Technologies Pvt. Ltd. is Kathmandu's premier professional certification hub—empowering engineers, executives, and organizations with globally recognized credentials and workforce-ready skills."
        actions={
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Magnetic>
              <Link to="/courses" className="btn-primary group inline-flex items-center justify-center gap-2 py-3.5 px-7 text-xs sm:text-sm font-extrabold shadow-lg w-full sm:w-auto">
                <span>Explore Our Programs</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-brand-ink font-bold text-xs sm:text-sm py-3.5 px-6 transition-all duration-300 shadow-sm w-full sm:w-auto">
                <PhoneCall className="h-4 w-4 text-brand-red" />
                <span>Speak to Academic Advisor</span>
              </Link>
            </Magnetic>
          </div>
        }
      >
        {/* Feature Pills & Trust Stat Bar */}
        <div className="max-w-4xl mx-auto space-y-8 pt-4">

          {/* Feature Badges Strip — 2-Column Mobile Grid */}
          <div id="partnership" className="grid grid-cols-2 sm:flex items-center justify-center gap-2 sm:gap-3 text-xs font-semibold text-slate-700">
            <span className="col-span-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-2.5 sm:px-3.5 py-1 sm:py-1.5 shadow-xs text-[10px] sm:text-xs truncate">
              <GraduationCap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand-red shrink-0" />
              <span className="truncate">USC Upstate USA</span>
            </span>
            <span className="col-span-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-2.5 sm:px-3.5 py-1 sm:py-1.5 shadow-xs text-[10px] sm:text-xs truncate">
              <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600 shrink-0" />
              <span className="truncate">Six Sigma &amp; PMI®</span>
            </span>
            <span className="col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-2.5 sm:px-3.5 py-1 sm:py-1.5 shadow-xs text-[10px] sm:text-xs">
              <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 shrink-0" />
              <span>Kathmandu HQ &amp; Nationwide Hubs</span>
            </span>
          </div>

          {/* Stat Bar */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-3 sm:p-6 shadow-xs sm:shadow-md grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/60">
            <div className="pt-1.5 sm:pt-0 sm:px-2 space-y-0.5 text-center">
              <div className="display-font text-xl sm:text-3xl font-extrabold text-brand-ink">
                <AnimatedCounter value={12} suffix="k+" />
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium">Alumni &amp; Professionals</p>
            </div>

            <div className="pt-1.5 sm:pt-0 sm:px-2 space-y-0.5 text-center">
              <div className="display-font text-xl sm:text-3xl font-extrabold text-brand-ink">
                <AnimatedCounter value={40} suffix="+" />
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium">Corporate Partners</p>
            </div>

            <div className="pt-1.5 sm:pt-0 sm:px-2 space-y-0.5 text-center">
              <div className="display-font text-xl sm:text-3xl font-extrabold text-emerald-600">
                <AnimatedCounter value={98} suffix="%" />
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium">Career Impact Rate</p>
            </div>

            <div className="pt-1.5 sm:pt-0 sm:px-2 space-y-0.5 text-center">
              <div className="display-font text-xl sm:text-3xl font-extrabold text-brand-red flex items-center justify-center gap-1">
                <AnimatedCounter value={4.9} decimals={1} suffix="★" />
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium">Student Rating</p>
            </div>
          </div>

        </div>
      </PageHero>

      {/* Who We Are (About Intro) */}
      <section id="who-we-are" className="section-padding bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Left Graphic Image */}
            <ScrollReveal direction="left" className="lg:col-span-6">
              <div className="relative flex justify-center">
                <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-brand-red/10 via-amber-500/10 to-brand-red/5 blur-3xl pointer-events-none" />
                <img
                  src="/images/about/about.png"
                  alt="Who We Are - Red Dot Technologies"
                  loading="lazy"
                  decoding="async"
                  className="relative z-10 w-full max-w-xs sm:max-w-lg h-auto object-contain drop-shadow-xl transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </ScrollReveal>

            {/* Right Typography & Copy */}
            <ScrollReveal direction="right" className="lg:col-span-6 space-y-4 sm:space-y-6">
              <div className="space-y-2 sm:space-y-4">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-brand-red/20 bg-brand-red/5 px-3 sm:px-4 py-1 sm:py-1.5 shadow-xs">
                  <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-brand-red animate-pulse" />
                  <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.14em] text-brand-red">
                    Who We Are
                  </span>
                </div>

                <h2 className="display-font text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-ink leading-tight">
                  <span className="text-brand-red">Who</span> We Are
                </h2>
              </div>

              <p className="text-slate-600 text-xs sm:text-base leading-relaxed font-normal">
                Red Dot Technologies Pvt. Ltd. is a Kathmandu-based training and certification provider committed to bridging the gap between education and employability. We design and deliver globally recognized programs that equip learners with the skills, certifications, and confidence required to succeed in today’s competitive workforce.
              </p>

              <p className="text-slate-600 text-xs sm:text-base leading-relaxed font-normal">
                Our focus is on creating opportunities for students, early-career professionals, and working employees to grow, upskill, and succeed in Nepal and beyond.
              </p>

              {/* Core Pillars Feature Grid — 2-Column Mobile Grid */}
              <div id="faculty" className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4 pt-3 sm:pt-6 border-t border-slate-200/80">
                <div className="col-span-1 group rounded-xl sm:rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3 sm:p-4 transition-all duration-300 hover:bg-white hover:border-brand-red/30 hover:shadow-xs">
                  <div className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-brand-red/10 text-brand-red mb-1.5 sm:mb-3 group-hover:bg-brand-red group-hover:text-white transition-colors">
                    <Award className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5 stroke-[2.2]" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-brand-ink tracking-tight">Global Standard</h4>
                  <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 leading-snug font-medium line-clamp-2 sm:line-clamp-none">US institutional tie-ups &amp; verifiable badges.</p>
                </div>

                <div className="col-span-1 group rounded-xl sm:rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3 sm:p-4 transition-all duration-300 hover:bg-white hover:border-amber-400/40 hover:shadow-xs">
                  <div className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-amber-500/10 text-amber-600 mb-1.5 sm:mb-3 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                    <Zap className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5 stroke-[2.2]" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-brand-ink tracking-tight">Practical Mastery</h4>
                  <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 leading-snug font-medium line-clamp-2 sm:line-clamp-none">Live laboratory capstones &amp; case audits.</p>
                </div>

                <div className="col-span-2 sm:col-span-1 group rounded-xl sm:rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3 sm:p-4 transition-all duration-300 hover:bg-white hover:border-emerald-400/40 hover:shadow-xs">
                  <div className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-emerald-500/10 text-emerald-600 mb-1.5 sm:mb-3 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <TrendingUp className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5 stroke-[2.2]" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-brand-ink tracking-tight">Career Outcomes</h4>
                  <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 leading-snug font-medium line-clamp-2 sm:line-clamp-none">Workforce mentorship &amp; direct industry guidance.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Vision & Mission Split Cards */}
      <section id="vision-mission" className="relative py-10 sm:py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 border-y border-slate-200/80">
        {/* Soft background ambient lighting */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute -top-[15%] left-[20%] h-[450px] w-[450px] rounded-full opacity-25 blur-3xl"
            style={{
              background: "radial-gradient(circle, color-mix(in oklab, var(--brand-red) 25%, transparent), transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          {/* Section Header */}
          <div className="mb-8 sm:mb-16 text-center mx-auto max-w-3xl space-y-2 sm:space-y-4">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-brand-red/20 bg-white px-3 sm:px-4 py-1 sm:py-1.5 shadow-xs">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-brand-red animate-pulse" />
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.14em] text-brand-red">
                Purpose &amp; Direction
              </span>
            </div>

            <h2 className="display-font text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-ink leading-tight">
              Guided by <span className="gradient-text">Vision &amp; Mission</span>
            </h2>

            <p className="text-xs sm:text-base text-slate-500 font-medium max-w-2xl mx-auto">
              Establishing Nepal as a premier hub for future-ready talent and globally verified professional credentials.
            </p>
          </div>

          {/* Dual Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 lg:gap-10">
            {/* Our Vision Card */}
            <div id="vision" className="group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-[2.25rem] border border-slate-200/90 bg-white p-5 sm:p-10 shadow-xs sm:shadow-lg transition-all duration-300 hover:shadow-xl hover:border-brand-red/40">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-red via-rose-500 to-amber-500" />
              <span className="pointer-events-none absolute right-4 top-4 sm:right-6 sm:top-6 text-4xl sm:text-7xl font-black text-slate-100 select-none group-hover:text-brand-red/10 transition-colors">
                01
              </span>

              <div className="relative z-10 space-y-4 sm:space-y-6">
                <div className="flex h-11 w-11 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-brand-red/10 border border-brand-red/20 shadow-xs transition-transform duration-300 group-hover:scale-105">
                  <Target className="h-5 w-5 sm:h-8 sm:w-8 text-brand-red stroke-[2.2]" />
                </div>

                <div className="space-y-1.5 sm:space-y-3">
                  <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-brand-red">
                    Strategic Horizon
                  </span>
                  <h3 className="display-font text-xl sm:text-3xl font-extrabold text-brand-ink tracking-tight">
                    Our Vision
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-base leading-relaxed font-medium">
                    To become Nepal’s leading professional training and certification institute, recognized for empowering individuals with globally relevant skills and establishing Nepal as a hub for future-ready talent.
                  </p>
                </div>
              </div>

              <div className="relative z-10 mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-100 flex flex-wrap gap-1.5 sm:gap-2">
                <span className="rounded-full bg-slate-100 border border-slate-200/80 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-extrabold text-slate-600">
                  Nepal&apos;s Benchmark
                </span>
                <span className="rounded-full bg-brand-red/10 border border-brand-red/20 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-extrabold text-brand-red">
                  Global Relevance
                </span>
                <span className="rounded-full bg-slate-100 border border-slate-200/80 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-extrabold text-slate-600">
                  Future-Ready Talent
                </span>
              </div>
            </div>

            {/* Our Mission Card */}
            <div id="mission" className="group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-[2.25rem] border border-slate-200/90 bg-white p-5 sm:p-10 shadow-xs sm:shadow-lg transition-all duration-300 hover:shadow-xl hover:border-brand-red/40">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-500 via-rose-500 to-brand-red" />
              <span className="pointer-events-none absolute right-4 top-4 sm:right-6 sm:top-6 text-4xl sm:text-7xl font-black text-slate-100 select-none group-hover:text-brand-red/10 transition-colors">
                02
              </span>

              <div className="relative z-10 space-y-4 sm:space-y-6">
                <div className="flex h-11 w-11 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-amber-500/10 border border-amber-500/20 shadow-xs transition-transform duration-300 group-hover:scale-105">
                  <Sparkles className="h-5 w-5 sm:h-8 sm:w-8 text-amber-600 stroke-[2.2]" />
                </div>

                <div className="space-y-1.5 sm:space-y-3">
                  <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-amber-600">
                    Core Commitment
                  </span>
                  <h3 className="display-font text-xl sm:text-3xl font-extrabold text-brand-ink tracking-tight">
                    Our Mission
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-base leading-relaxed font-medium">
                    To empower individuals and organizations in Nepal with industry-relevant skills, global certifications, and career-focused training that open doors to opportunities at home and beyond.
                  </p>
                </div>
              </div>

              <div className="relative z-10 mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-100 flex flex-wrap gap-1.5 sm:gap-2">
                <span className="rounded-full bg-slate-100 border border-slate-200/80 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-extrabold text-slate-600">
                  Industry-Relevant Skills
                </span>
                <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-extrabold text-amber-600">
                  Global Certifications
                </span>
                <span className="rounded-full bg-slate-100 border border-slate-200/80 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-extrabold text-slate-600">
                  Career Advancement
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. OUR CORE VALUES: Advanced Bento Grid Section */}
      <CoreValuesSection />

      {/* 2. WHAT WE DO: Advanced 2x2 Bento Stage */}
      <WhatWeDoSection />

      {/* 3. WHY CHOOSE US: Interactive Showcase Section (Same as Homepage) */}
      <WhyChooseUsSection />

      <CtaSection />
    </div>
  );
}
