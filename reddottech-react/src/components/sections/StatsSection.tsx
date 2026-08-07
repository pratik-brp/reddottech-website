import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { Reveal } from "@/components/motion/Reveal";
import { Users, Award, Target, Star, Sparkles } from "lucide-react";

const stats = [
  {
    value: 12,
    suffix: "k+",
    label: "Learners trained",
    description: "Professionals & graduates upskilled across Nepal",
    icon: Users,
    glow: "rgba(251, 146, 60, 0.25)",
    border: "rgba(251, 146, 60, 0.3)",
    badge: "12,000+ Alumni",
    decimals: 0,
  },
  {
    value: 40,
    suffix: "+",
    label: "Global certifications",
    description: "Accredited by USC Upstate, AWS, Cisco & Microsoft",
    icon: Award,
    glow: "rgba(200, 16, 46, 0.25)",
    border: "rgba(200, 16, 46, 0.3)",
    badge: "U.S. Accredited",
    decimals: 0,
  },
  {
    value: 96,
    suffix: "%",
    label: "Completion rate",
    description: "Industry-leading student retention & satisfaction",
    icon: Target,
    glow: "rgba(56, 189, 248, 0.25)",
    border: "rgba(56, 189, 248, 0.3)",
    badge: "High Support",
    decimals: 0,
  },
  {
    value: 4.9,
    suffix: "★",
    label: "Learner rating",
    description: "Average score across 2,400+ student reviews",
    icon: Star,
    glow: "rgba(245, 158, 11, 0.25)",
    border: "rgba(245, 158, 11, 0.3)",
    badge: "Top Rated",
    decimals: 1,
  },
];

export function StatsSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {/* Background Mesh Lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="animate-float absolute left-[15%] top-[10%] h-[35vw] max-h-[420px] w-[35vw] max-w-[420px] rounded-full opacity-50 blur-[100px]"
          style={{
            background: "radial-gradient(circle, rgba(251, 146, 60, 0.35) 0%, transparent 70%)",
          }}
        />
        <div
          className="animate-float absolute right-[10%] bottom-[15%] h-[30vw] max-h-[380px] w-[30vw] max-w-[380px] rounded-full opacity-60 blur-[90px]"
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, transparent 70%)",
            animationDelay: "3s",
          }}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Title */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-mist px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-red">
              <Sparkles className="h-3.5 w-3.5" />
              Measurable Impact &amp; Global Credibility
            </span>
            <h2 className="display-font mt-4 text-3xl sm:text-5xl font-extrabold text-brand-ink tracking-tight">
              Empowering Professionals with <span className="gradient-text">Proven Results</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              In collaboration with the University of South Carolina Upstate (USA), RedDot
              Technologies delivers world-class learning with measurable career outcomes.
            </p>
          </div>
        </Reveal>

        {/* 4 Interactive Glass Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.label} delay={idx * 0.1} direction="up">
                <div
                  className="group relative overflow-hidden rounded-3xl bg-white/70 p-8 backdrop-blur-xl border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                  style={{
                    borderColor: "rgba(226, 232, 240, 0.8)",
                    boxShadow: "0 10px 30px -10px rgba(15, 23, 42, 0.05)",
                  }}
                >
                  {/* Subtle hover gradient background overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at top right, ${s.glow}, transparent 70%)`,
                    }}
                  />

                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-md border transition-transform duration-500 group-hover:scale-110"
                      style={{ borderColor: s.border }}
                    >
                      <Icon className="h-6 w-6 text-brand-red" />
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      {s.badge}
                    </span>
                  </div>

                  <p className="display-font text-4xl sm:text-5xl font-extrabold tracking-tight text-brand-ink">
                    <AnimatedCounter
                      value={s.value}
                      suffix={s.suffix}
                      decimals={s.decimals}
                      className="text-brand-ink group-hover:text-brand-red transition-colors duration-300"
                    />
                  </p>

                  <h3 className="mt-3 text-base font-bold text-slate-900">{s.label}</h3>
                  <p className="mt-1.5 text-xs font-medium text-slate-500 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
