import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CtaSection } from "@/components/sections/CtaSection";
import { CoreValuesSection } from "@/components/sections/CoreValuesSection";
import { WhatWeDoSection } from "@/components/sections/WhatWeDoSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal, RevealGroup } from "@/components/ScrollReveal";
import { SectionHeader } from "@/components/SectionHeader";
import { GradientBackground } from "@/components/GradientBackground";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { Magnetic } from "@/components/motion/Magnetic";
import {
  Award,
  ShieldCheck,
  Target,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Users,
  TrendingUp,
  Globe2,
  BookOpen,
  CheckCircle2,
  Zap,
  Briefcase,
  Clock,
  GraduationCap,
  PhoneCall,
  Star,
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
  // 5 Core Values from PHP elements/about/about-values.blade.php
  const values = [
    {
      number: "01",
      title: "Excellence",
      desc: "We uphold the highest standards in training, certification, and learner experience.",
      icon: Award,
      badge: "Quality Standard",
      badgeColor: "text-brand-red",
      color: "from-rose-500 to-brand-red",
      glow: "hover:border-brand-red/40 hover:shadow-xl",
      iconBg: "bg-brand-red/10 text-brand-red border-brand-red/20",
    },
    {
      number: "02",
      title: "Innovation",
      desc: "We adapt our programs to evolving industry trends and technological advancements.",
      icon: Sparkles,
      badge: "Future-Ready",
      badgeColor: "text-amber-600",
      color: "from-amber-500 to-orange-500",
      glow: "hover:border-amber-400/40 hover:shadow-xl",
      iconBg: "bg-amber-50 text-amber-600 border-amber-200/80",
    },
    {
      number: "03",
      title: "Accessibility",
      desc: "We make world-class education attainable for learners in Nepal.",
      icon: Globe2,
      badge: "Local Impact",
      badgeColor: "text-emerald-600",
      color: "from-emerald-500 to-teal-500",
      glow: "hover:border-emerald-400/40 hover:shadow-xl",
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200/80",
    },
    {
      number: "04",
      title: "Growth",
      desc: "We are committed to the professional and personal growth of every learner.",
      icon: TrendingUp,
      badge: "Career Momentum",
      badgeColor: "text-blue-600",
      color: "from-blue-500 to-indigo-500",
      glow: "hover:border-blue-400/40 hover:shadow-xl",
      iconBg: "bg-blue-50 text-blue-600 border-blue-200/80",
    },
    {
      number: "05",
      title: "Community",
      desc: "We foster a collaborative environment where learners, trainers, and industry experts connect.",
      icon: Users,
      badge: "Network & Alumni",
      badgeColor: "text-purple-600",
      color: "from-purple-500 to-violet-500",
      glow: "hover:border-purple-400/40 hover:shadow-xl",
      iconBg: "bg-purple-50 text-purple-600 border-purple-200/80",
    },
  ];

  // What We Do from PHP elements/about/about-what-we-do.blade.php
  const whatWeDo = [
    {
      number: "01",
      title: "Global Recognition",
      icon: Globe2,
      badge: "Worldwide Standard",
      desc: "Deliver globally recognized training programs in IT, business, and professional development.",
      tag: "US & International Credentials",
      color: "from-rose-500 to-brand-red",
      iconBg: "bg-brand-red/10 text-brand-red border-brand-red/20",
    },
    {
      number: "02",
      title: "Real Preparation",
      icon: Zap,
      badge: "Practical Mastery",
      desc: "Offer hands-on, practical learning that prepares learners for real-world corporate challenges.",
      tag: "Live Workshops & Capstones",
      color: "from-amber-500 to-orange-500",
      iconBg: "bg-amber-50 text-amber-600 border-amber-200/80",
    },
    {
      number: "03",
      title: "Global Partnership",
      icon: Award,
      badge: "Academic Ties",
      desc: "Partner with international institutions to bring world-class programs like the Professional Excellence and Certification Program (PECP) to Nepal.",
      tag: "USC Upstate Collaboration",
      color: "from-emerald-500 to-teal-500",
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200/80",
    },
    {
      number: "04",
      title: "Career Excellence",
      icon: Briefcase,
      badge: "Workforce Support",
      desc: "Support individuals and organizations in achieving professional excellence through mentorship, guidance, and career-focused outcomes.",
      tag: "Corporate Hiring Referrals",
      color: "from-blue-500 to-indigo-500",
      iconBg: "bg-blue-50 text-blue-600 border-blue-200/80",
    },
  ];

  // Why Choose Us from PHP elements/about/about-why-choose-us.blade.php
  const whyChooseUs = [
    {
      number: "01",
      title: "International Recognition",
      icon: ShieldCheck,
      badge: "Global Backing",
      desc: "Programs backed by global institutions like University of South Carolina Upstate.",
      color: "from-rose-500 to-brand-red",
      iconBg: "bg-brand-red/10 text-brand-red border-brand-red/20",
    },
    {
      number: "02",
      title: "Expert Trainers",
      icon: GraduationCap,
      badge: "Top Faculty",
      desc: "Instructors with deep industry expertise, patents, and international exposure.",
      color: "from-amber-500 to-orange-500",
      iconBg: "bg-amber-50 text-amber-600 border-amber-200/80",
    },
    {
      number: "03",
      title: "Career Advancement",
      icon: TrendingUp,
      badge: "High Impact",
      desc: "Courses tailored to help learners secure better jobs, promotions, or international opportunities.",
      color: "from-emerald-500 to-teal-500",
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200/80",
    },
    {
      number: "04",
      title: "Flexible Learning Models",
      icon: Clock,
      badge: "Weekend & Online",
      desc: "Instructor-led, online, and hybrid options for working professionals.",
      color: "from-blue-500 to-indigo-500",
      iconBg: "bg-blue-50 text-blue-600 border-blue-200/80",
    },
  ];

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

          {/* Feature Badges Strip */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs font-semibold text-slate-700">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/80 px-3.5 py-1.5 shadow-xs backdrop-blur-md">
              <GraduationCap className="h-4 w-4 text-brand-red" />
              <span>USC Upstate USA Academic Partner</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/80 px-3.5 py-1.5 shadow-xs backdrop-blur-md">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Six Sigma &amp; PMI® Frameworks</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/80 px-3.5 py-1.5 shadow-xs backdrop-blur-md">
              <Building2 className="h-4 w-4 text-blue-600" />
              <span>Kathmandu HQ &amp; Nationwide Hubs</span>
            </span>
          </div>

          {/* Stat Bar */}
          <div className="rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-xl p-4 sm:p-6 shadow-md grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/60">
            <div className="pt-2 sm:pt-0 sm:px-2 space-y-0.5 text-center">
              <div className="display-font text-2xl sm:text-3xl font-extrabold text-brand-ink">
                <AnimatedCounter value={12} suffix="k+" />
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">Alumni &amp; Professionals</p>
            </div>

            <div className="pt-2 sm:pt-0 sm:px-2 space-y-0.5 text-center">
              <div className="display-font text-2xl sm:text-3xl font-extrabold text-brand-ink">
                <AnimatedCounter value={40} suffix="+" />
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">Corporate Partners</p>
            </div>

            <div className="pt-2 sm:pt-0 sm:px-2 space-y-0.5 text-center">
              <div className="display-font text-2xl sm:text-3xl font-extrabold text-emerald-600">
                <AnimatedCounter value={98} suffix="%" />
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">Career Impact Rate</p>
            </div>

            <div className="pt-2 sm:pt-0 sm:px-2 space-y-0.5 text-center">
              <div className="display-font text-2xl sm:text-3xl font-extrabold text-brand-red flex items-center justify-center gap-1">
                <AnimatedCounter value={4.9} decimals={1} suffix="★" />
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">Student Rating</p>
            </div>
          </div>

        </div>
      </PageHero>

      {/* Who We Are (About Intro) */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Graphic Image */}
            <ScrollReveal direction="left" className="lg:col-span-6">
              <div className="relative flex justify-center">
                <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-brand-red/10 via-amber-500/10 to-brand-red/5 blur-3xl pointer-events-none" />
                <img
                  src="/images/about/about.png"
                  alt="Who We Are - Red Dot Technologies"
                  loading="lazy"
                  decoding="async"
                  className="relative z-10 w-full max-w-lg h-auto object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </ScrollReveal>

            {/* Right Typography & Copy */}
            <ScrollReveal direction="right" className="lg:col-span-6 space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/5 px-4 py-1.5 shadow-xs">
                  <span className="h-2 w-2 rounded-full bg-brand-red animate-pulse" />
                  <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-red">
                    Who We Are
                  </span>
                </div>

                <h2 className="display-font text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-ink leading-tight">
                  <span className="text-brand-red">Who</span> We Are
                </h2>
              </div>

              <p className="text-slate-600 text-base md:text-lg leading-relaxed font-normal">
                Red Dot Technologies Pvt. Ltd. is a Kathmandu-based training and certification provider committed to bridging the gap between education and employability. We design and deliver globally recognized programs that equip learners with the skills, certifications, and confidence required to succeed in today’s competitive workforce.
              </p>

              <p className="text-slate-600 text-base md:text-lg leading-relaxed font-normal">
                Our focus is on creating opportunities for students, early-career professionals, and working employees to grow, upskill, and succeed in Nepal and beyond.
              </p>

              {/* Core Pillars Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-slate-200/80">
                <div className="group rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 transition-all duration-300 hover:bg-white hover:border-brand-red/30 hover:shadow-md">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red mb-3 group-hover:bg-brand-red group-hover:text-white transition-colors">
                    <Award className="h-4.5 w-4.5 stroke-[2.2]" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-brand-ink tracking-tight">Global Standard</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-snug font-medium">US institutional tie-ups &amp; verifiable digital badges.</p>
                </div>

                <div className="group rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 transition-all duration-300 hover:bg-white hover:border-amber-400/40 hover:shadow-md">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 mb-3 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                    <Zap className="h-4.5 w-4.5 stroke-[2.2]" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-brand-ink tracking-tight">Practical Mastery</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-snug font-medium">Live laboratory capstones &amp; corporate case audits.</p>
                </div>

                <div className="group rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 transition-all duration-300 hover:bg-white hover:border-emerald-400/40 hover:shadow-md">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 mb-3 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <TrendingUp className="h-4.5 w-4.5 stroke-[2.2]" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-brand-ink tracking-tight">Career Outcomes</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-snug font-medium">Workforce mentorship &amp; direct industry guidance.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Vision & Mission Split Cards */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 border-y border-slate-200/80">
        {/* Soft background ambient lighting */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute -top-[15%] left-[20%] h-[450px] w-[450px] rounded-full opacity-25 blur-3xl"
            style={{
              background: "radial-gradient(circle, color-mix(in oklab, var(--brand-red) 25%, transparent), transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          {/* Section Header */}
          <div className="mb-14 sm:mb-18 text-center mx-auto max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-white px-4 py-1.5 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-brand-red animate-pulse" />
              <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-red">
                Purpose &amp; Direction
              </span>
            </div>

            <h2 className="display-font text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-ink leading-tight">
              Guided by <span className="gradient-text">Vision &amp; Mission</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-500 font-medium max-w-2xl mx-auto">
              Establishing Nepal as a premier hub for future-ready talent and globally verified professional credentials.
            </p>
          </div>

          {/* Dual Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* Our Vision Card */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-[2.25rem] border border-slate-200/90 bg-white p-8 sm:p-10 shadow-lg transition-all duration-500 hover:shadow-2xl hover:border-brand-red/40 hover:-translate-y-1">
              <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-brand-red via-rose-500 to-amber-500" />
              <span className="pointer-events-none absolute right-6 top-6 text-7xl font-black text-slate-100 select-none group-hover:text-brand-red/10 transition-colors">
                01
              </span>

              <div className="relative z-10 space-y-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-red/10 border border-brand-red/20 shadow-xs transition-transform duration-300 group-hover:scale-110">
                  <Target className="h-8 w-8 text-brand-red stroke-[2.2]" />
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-brand-red">
                    Strategic Horizon
                  </span>
                  <h3 className="display-font text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight">
                    Our Vision
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed font-medium">
                    To become Nepal’s leading professional training and certification institute, recognized for empowering individuals with globally relevant skills and establishing Nepal as a hub for future-ready talent.
                  </p>
                </div>
              </div>

              <div className="relative z-10 mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-2">
                <span className="rounded-full bg-slate-100 border border-slate-200/80 px-3 py-1 text-xs font-extrabold text-slate-600">
                  Nepal&apos;s Benchmark
                </span>
                <span className="rounded-full bg-brand-red/10 border border-brand-red/20 px-3 py-1 text-xs font-extrabold text-brand-red">
                  Global Relevance
                </span>
                <span className="rounded-full bg-slate-100 border border-slate-200/80 px-3 py-1 text-xs font-extrabold text-slate-600">
                  Future-Ready Talent
                </span>
              </div>
            </div>

            {/* Our Mission Card */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-[2.25rem] border border-slate-200/90 bg-white p-8 sm:p-10 shadow-lg transition-all duration-500 hover:shadow-2xl hover:border-brand-red/40 hover:-translate-y-1">
              <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-amber-500 via-rose-500 to-brand-red" />
              <span className="pointer-events-none absolute right-6 top-6 text-7xl font-black text-slate-100 select-none group-hover:text-brand-red/10 transition-colors">
                02
              </span>

              <div className="relative z-10 space-y-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 shadow-xs transition-transform duration-300 group-hover:scale-110">
                  <Sparkles className="h-8 w-8 text-amber-600 stroke-[2.2]" />
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600">
                    Core Commitment
                  </span>
                  <h3 className="display-font text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight">
                    Our Mission
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed font-medium">
                    To empower individuals and organizations in Nepal with industry-relevant skills, global certifications, and career-focused training that open doors to opportunities at home and beyond.
                  </p>
                </div>
              </div>

              <div className="relative z-10 mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-2">
                <span className="rounded-full bg-slate-100 border border-slate-200/80 px-3 py-1 text-xs font-extrabold text-slate-600">
                  Industry-Relevant Skills
                </span>
                <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-extrabold text-amber-600">
                  Global Certifications
                </span>
                <span className="rounded-full bg-slate-100 border border-slate-200/80 px-3 py-1 text-xs font-extrabold text-slate-600">
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
