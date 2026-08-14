import { ScrollReveal } from "@/components/ScrollReveal";
import {
  Globe2,
  Zap,
  Award,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

export function WhatWeDoSection() {
  const services = [
    {
      number: "01",
      title: "Global Recognition",
      desc: "Deliver globally recognized training programs in IT, business, and professional development.",
      badge: "Worldwide Standard",
      icon: Globe2,
      color: "from-rose-500 via-brand-red to-rose-700",
      badgeStyle: "bg-rose-50 text-brand-red border-rose-200/80",
      iconBg: "bg-brand-red/10 text-brand-red border-brand-red/20",
      glowBorder: "hover:border-brand-red/40 hover:shadow-xl hover:shadow-brand-red/10",
      link: "/pecp",
    },
    {
      number: "02",
      title: "Real Preparation",
      desc: "Offer hands-on, practical learning that prepares learners for real-world challenges.",
      badge: "Practical Mastery",
      icon: Zap,
      color: "from-amber-500 via-orange-500 to-amber-600",
      badgeStyle: "bg-amber-50 text-amber-700 border-amber-200/80",
      iconBg: "bg-amber-500/10 text-amber-600 border-amber-500/20",
      glowBorder: "hover:border-amber-400/50 hover:shadow-xl hover:shadow-amber-500/10",
      link: "/courses",
    },
    {
      number: "03",
      title: "Global Partnership",
      desc: "Partner with international institutions to bring world-class programs like the Professional Excellence and Certification Program (PECP) to Nepal.",
      badge: "Academic Ties",
      icon: Award,
      color: "from-emerald-500 via-teal-500 to-emerald-700",
      badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
      iconBg: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      glowBorder: "hover:border-emerald-400/50 hover:shadow-xl hover:shadow-emerald-500/10",
      link: "/pecp",
    },
    {
      number: "04",
      title: "Career Excellence",
      desc: "Support individuals and organizations in achieving professional excellence through mentorship, guidance, and career-focused outcomes.",
      badge: "Workforce Support",
      icon: Briefcase,
      color: "from-blue-500 via-indigo-500 to-blue-700",
      badgeStyle: "bg-blue-50 text-blue-700 border-blue-200/80",
      iconBg: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      glowBorder: "hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-500/10",
      link: "/contact",
    },
  ];

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-slate-50/80 border-y border-slate-200/80">
      {/* Background Lighting & Subtle Grid Texture */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-30" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--brand-red) 25%, transparent), transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-18 text-center mx-auto max-w-3xl space-y-4">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-white px-4 py-1.5 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-brand-red animate-pulse" />
              <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-red">
                Services &amp; Offerings
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="display-font text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-ink leading-tight">
              What <span className="gradient-text">We Do</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
              Bridging higher education and workforce employability in Nepal with high-impact programs and globally recognized credentials.
            </p>
          </ScrollReveal>
        </div>

        {/* Crisp Modern 4-Card Stage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, idx) => {
            const IconComp = s.icon;
            return (
              <ScrollReveal
                key={s.number}
                direction="up"
                delay={0.1 * idx}
                className="flex"
              >
                <Link
                  to="/contact"
                  className={`group relative flex flex-col justify-between w-full overflow-hidden rounded-[2rem] border border-slate-200/90 bg-white p-7 shadow-xs transition-all duration-400 hover:-translate-y-1.5 cursor-pointer ${s.glowBorder}`}
                >
                  {/* Top Gradient Accent Rail */}
                  <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${s.color}`} />

                  {/* Watermark Number */}
                  <span className="pointer-events-none absolute right-6 top-4 text-5xl sm:text-6xl font-black text-slate-100/90 select-none transition-all duration-400 group-hover:text-slate-200/80 group-hover:scale-105">
                    {s.number}
                  </span>

                  <div>
                    {/* Header Row: Icon & Badge */}
                    <div className="flex items-center justify-between gap-3 mb-6 relative z-10">
                      <div
                        className={`flex h-13 w-13 items-center justify-center rounded-2xl border ${s.iconBg} shadow-xs transition-transform duration-300 group-hover:scale-110`}
                      >
                        <IconComp className="h-6 w-6 stroke-[2.2]" />
                      </div>

                      <span
                        className={`rounded-full border px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider ${s.badgeStyle}`}
                      >
                        {s.badge}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-2 relative z-10">
                      <h3 className="display-font text-xl sm:text-2xl font-extrabold text-brand-ink tracking-tight transition-colors group-hover:text-brand-red">
                        {s.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed pt-1">
                        {s.desc}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Footer Action Link */}
                  <div className="mt-8 pt-4 border-t border-slate-100 relative z-10 flex items-center justify-between text-xs font-bold text-slate-500">
                    <span className="group-hover:text-brand-red transition-colors font-extrabold">Learn More</span>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 group-hover:bg-brand-red group-hover:text-white transition-colors duration-300">
                      <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
