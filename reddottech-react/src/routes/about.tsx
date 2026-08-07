import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal, RevealGroup } from "@/components/ScrollReveal";
import { SectionHeader } from "@/components/SectionHeader";
import { GradientBackground } from "@/components/GradientBackground";
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
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | RedDot Technologies — Empowering Professionals in Nepal" },
      {
        name: "description",
        content:
          "Learn about RedDot Technologies Pvt. Ltd., our mission, vision, core values, services, and why learners in Nepal choose our globally recognized certification programs.",
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
        badge="About RedDot Technologies"
        title={
          <>
            Bridging Education &amp; <span className="gradient-text">Employability in Nepal</span>
          </>
        }
        subtitle="Red Dot Technologies Pvt. Ltd. is a Kathmandu-based training and certification provider committed to bridging the gap between education and employability."
        actions={
          <Link to={"/coursess" as any} className="btn-primary">
            <span>Explore Our Programs</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

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
                  alt="Who We Are - RedDot Technologies"
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

              {/* Key Stats Bar */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-100">
                <div>
                  <span className="block text-2xl sm:text-4xl font-black text-brand-ink tracking-tight">
                    12k+
                  </span>
                  <span className="text-xs font-semibold text-slate-400">Learners Trained</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-4xl font-black text-brand-red tracking-tight">
                    40+
                  </span>
                  <span className="text-xs font-semibold text-slate-400">Certifications</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-4xl font-black text-brand-ink tracking-tight">
                    96%
                  </span>
                  <span className="text-xs font-semibold text-slate-400">Completion Rate</span>
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

      {/* 1. OUR CORE VALUES: Crisp White 5-Pillar Connected Grid */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 sm:mb-18 text-center mx-auto max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/5 px-4 py-1.5 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-brand-red animate-pulse" />
              <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-red">
                Our Guiding Principles
              </span>
            </div>

            <h2 className="display-font text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-ink leading-tight">
              Our Core <span className="gradient-text">Values</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-500 font-medium max-w-2xl mx-auto">
              The foundational beliefs shaping our training, certification, and learner community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {values.map((v) => {
              const IconComp = v.icon;
              return (
                <div
                  key={v.number}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-7 shadow-sm transition-all duration-400 hover:-translate-y-1 ${v.glow}`}
                >
                  <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${v.color}`} />

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${v.iconBg} shadow-xs transition-transform duration-300 group-hover:scale-110`}>
                        <IconComp className="h-6 w-6 stroke-[2.2]" />
                      </div>

                      <span className="rounded-full bg-slate-100 border border-slate-200/80 px-3 py-1 text-xs font-black text-slate-700 tracking-wider">
                        {v.number}
                      </span>
                    </div>

                    <div className="space-y-1 mb-3">
                      <span className={`text-[10px] font-extrabold uppercase tracking-wider ${v.badgeColor}`}>
                        {v.badge}
                      </span>
                      <h3 className="text-xl font-extrabold text-brand-ink tracking-tight transition-colors group-hover:text-brand-red">
                        {v.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. WHAT WE DO: Deep Tech Dark Showfloor Stage */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-slate-950 text-white border-y border-slate-800">
        {/* Background ambient radial glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full opacity-25 blur-3xl"
            style={{
              background: "radial-gradient(circle, color-mix(in oklab, var(--brand-red) 35%, transparent), transparent 70%)",
            }}
          />
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="mb-14 sm:mb-18 text-center mx-auto max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/30 bg-brand-red/10 px-4 py-1.5 backdrop-blur-md shadow-sm">
              <span className="h-2 w-2 rounded-full bg-brand-red animate-pulse" />
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-red">
                Services &amp; Offerings
              </span>
            </div>

            <h2 className="display-font text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              What <span className="gradient-text">We Do</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-400 font-medium max-w-2xl mx-auto">
              Bridging higher education and workforce employability with high-impact programs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatWeDo.map((w) => {
              const IconComp = w.icon;
              return (
                <div
                  key={w.number}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 shadow-2xl transition-all duration-500 hover:border-brand-red/60 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(200,16,46,0.25)] hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-brand-red/20 text-brand-red border border-brand-red/30 shadow-md transition-transform duration-300 group-hover:scale-110">
                        <IconComp className="h-6 w-6 stroke-[2]" />
                      </div>

                      <span className="rounded-full bg-brand-red/20 border border-brand-red/40 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-brand-red">
                        {w.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-white tracking-tight transition-colors group-hover:text-brand-red">
                      {w.title}
                    </h3>

                    <p className="mt-2.5 text-xs text-slate-300 leading-relaxed font-medium">
                      {w.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-bold text-slate-400">
                    <span className="text-slate-300">{w.tag}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-brand-red transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US: Asymmetric 2-Column Split Showcase */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-slate-50/80">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Sticky Spotlight Card */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-brand-ink to-slate-950 p-8 sm:p-10 text-white shadow-2xl border border-slate-800 space-y-6">
                <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-15" />
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-30 blur-3xl"
                  style={{
                    background: "radial-gradient(circle, var(--brand-red) 0%, transparent 70%)",
                  }}
                />

                <div className="relative z-10 space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/20 px-3.5 py-1 backdrop-blur-md">
                    <span className="h-2 w-2 rounded-full bg-brand-red animate-pulse" />
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-red">
                      Key Advantages
                    </span>
                  </div>

                  <h2 className="display-font text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                    Why <span className="gradient-text">Choose Us?</span>
                  </h2>

                  <p className="text-sm text-slate-300 font-medium leading-relaxed">
                    Designed to prepare you for real-world career success in competitive global markets.
                  </p>
                </div>

                <div className="relative z-10 space-y-3 pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-red/20 text-brand-red font-black text-sm">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-white">100% Live Mentorship</h4>
                      <p className="text-[10px] text-slate-400">Interactive weekend &amp; online cohorts</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-red/20 text-brand-red font-black text-sm">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-white">Dual US Credentials</h4>
                      <p className="text-[10px] text-slate-400">Co-developed with USC Upstate</p>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 pt-2">
                  <Link to={"/contactt" as any} className="btn-primary w-full text-center py-3.5 text-xs">
                    <span>Schedule Free Advice</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: 4 Stacked Floating Advantage Cards */}
            <div className="lg:col-span-7 space-y-4">
              {whyChooseUs.map((c) => {
                const IconComp = c.icon;
                return (
                  <div
                    key={c.number}
                    className="group relative flex items-start gap-5 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:shadow-xl hover:border-brand-red/40 hover:translate-x-1"
                  >
                    <div className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border ${c.iconBg} shadow-xs transition-transform duration-300 group-hover:scale-110`}>
                      <IconComp className="h-6 w-6 stroke-[2]" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-brand-red">
                          ADVANTAGE {c.number}
                        </span>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-500">
                          {c.badge}
                        </span>
                      </div>

                      <h3 className="text-lg font-extrabold text-brand-ink tracking-tight transition-colors group-hover:text-brand-red">
                        {c.title}
                      </h3>

                      <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        {c.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
