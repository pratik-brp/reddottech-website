import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

export function TargetAudienceSection() {
  const targetAudiences = [
    {
      title: "Aspiring Graduates",
      desc: "Gain career-ready skills and global certifications.",
      image: "/images/pecp/who_graduates.jpg",
      iconSvg: "/images/pecp/who-1.svg",
      tag: "Graduates",
      link: "/contact",
    },
    {
      title: "Young Professionals & Career Switchers",
      desc: "Upskill or transition into high-demand fields.",
      image: "/images/pecp/who_professionals.jpg",
      iconSvg: "/images/pecp/who-2.svg",
      tag: "Professionals",
      link: "/contact",
    },
    {
      title: "Institutions & Corporates",
      desc: "Partner for bulk enrollments and staff upskilling.",
      image: "/images/pecp/who_corporates.jpg",
      iconSvg: "/images/pecp/who-3.svg",
      tag: "Enterprise",
      link: "/contact",
    },
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-white border-b border-slate-200/80">
      {/* Decorative Atmosphere Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full opacity-[0.14] blur-[150px]"
          style={{
            background: "radial-gradient(circle, var(--brand-red) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal direction="up" className="mb-16 text-center mx-auto max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-red/20 bg-brand-red/5 px-4 py-1.5 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-brand-red animate-pulse" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-brand-red">
              Target Audience
            </span>
          </div>

          <h2 className="display-font text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-brand-ink leading-tight">
            <span className="gradient-text">Who</span> Is It For?
          </h2>
        </ScrollReveal>

        {/* 3 Audience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {targetAudiences.map((aud, idx) => (
            <ScrollReveal
              key={aud.title}
              direction="up"
              delay={idx * 0.1}
              className="h-full"
            >
              <div className="group relative h-full flex flex-col justify-between overflow-hidden rounded-[2.25rem] border border-slate-200/90 bg-white shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-brand-red/40 hover:shadow-2xl">
                {/* Top Accent Gradient Border */}
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-red via-rose-500 to-amber-500 opacity-80 group-hover:opacity-100 transition-opacity z-20" />

                {/* Card Top: Visual Photographic Banner */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                  <img
                    src={aud.image}
                    alt={aud.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15" />

                  {/* Floating Top Tag */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="rounded-full bg-slate-900 border border-white/20 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-sm">
                      {aud.tag}
                    </span>
                  </div>

                  {/* Icon floating on the banner */}
                  <div className="absolute bottom-4 left-6 z-10">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-red shadow-xl shadow-brand-red/40 border border-white/20 transition-transform duration-500 group-hover:scale-110">
                      <img
                        src={aud.iconSvg}
                        alt=""
                        className="h-7 w-7 object-contain drop-shadow"
                      />
                    </div>
                  </div>
                </div>

                {/* Card Bottom: Text Content matching old site */}
                <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black text-brand-ink tracking-tight transition-colors duration-300 group-hover:text-brand-red leading-snug">
                      {aud.title}
                    </h3>
                    <p className="text-base text-slate-600 font-medium leading-relaxed">
                      {aud.desc}
                    </p>
                  </div>

                  {/* Bottom Action Link */}
                  <div className="pt-4 border-t border-slate-100">
                    <Link
                      to={aud.link}
                      className="inline-flex items-center gap-2 text-sm font-black text-brand-red transition-all duration-300 group-hover:translate-x-1"
                    >
                      <span>Explore Pathway</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
