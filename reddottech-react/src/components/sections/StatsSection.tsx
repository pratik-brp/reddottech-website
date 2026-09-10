import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { Reveal } from "@/components/motion/Reveal";
import { GraduationCap, Bot, Route, Clock, Sparkles } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { getCourses, getCachedCourses } from "@/lib/api";

export function StatsSection() {
  const [coursesCount, setCoursesCount] = useState<number>(() => {
    const cached = getCachedCourses();
    return Array.isArray(cached) && cached.length > 0 ? cached.length : 9;
  });

  useEffect(() => {
    getCourses().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setCoursesCount(data.length);
      }
    });

    const handleCoursesUpdated = () => {
      getCourses().then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCoursesCount(data.length);
        }
      });
    };

    window.addEventListener("courses-updated", handleCoursesUpdated);
    return () => window.removeEventListener("courses-updated", handleCoursesUpdated);
  }, []);

  const stats = useMemo(
    () => [
      {
        value: coursesCount,
        suffix: "",
        label: "PECP Courses",
        description: "Specialized courses designed around professional and industry needs",
        icon: GraduationCap,
        glow: "rgba(251, 146, 60, 0.25)",
        border: "rgba(251, 146, 60, 0.3)",
        badge: "Professional",
        decimals: 0,
      },
      {
        value: 4,
        suffix: "",
        label: "AI Unlocked Courses",
        description: "Practical AI learning pathways for different levels and career goals",
        icon: Bot,
        glow: "rgba(200, 16, 46, 0.25)",
        border: "rgba(200, 16, 46, 0.3)",
        badge: "Future-Ready",
        decimals: 0,
      },
      {
        value: 10,
        suffix: "+",
        label: "Career Pathways",
        description: "Structured learning pathways to help you build relevant, future-ready skills",
        icon: Route,
        glow: "rgba(56, 189, 248, 0.25)",
        border: "rgba(56, 189, 248, 0.3)",
        badge: "High Support",
        decimals: 0,
      },
      {
        value: 24,
        suffix: "/7",
        label: "Course Access",
        description: "Learn at your own pace with flexible access to online course content",
        icon: Clock,
        glow: "rgba(245, 158, 11, 0.25)",
        border: "rgba(245, 158, 11, 0.3)",
        badge: "Flexible",
        decimals: 0,
      },
    ],
    [coursesCount],
  );

  return (
    <section className="relative overflow-hidden py-8 sm:py-16 lg:py-24 px-3 sm:px-6">
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
      </div>

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <div className="text-center mx-auto max-w-2xl mb-8 sm:mb-16 space-y-2 sm:space-y-4">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-brand-red/20 bg-brand-red/5 px-3 sm:px-4 py-1 sm:py-1.5 shadow-xs">
              <Sparkles className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 text-brand-red animate-pulse" />
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.14em] text-brand-red">
                Key Metrics
              </span>
            </span>
            <h2 className="display-font text-xl sm:text-3xl lg:text-5xl font-extrabold tracking-tight text-brand-ink">
              Real Impact, Real <span className="gradient-text">Results</span>
            </h2>
            <p className="text-xs sm:text-base text-slate-600 font-medium max-w-lg mx-auto">
              Our numbers reflect the commitment to excellence, international quality standards, and
              student success.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.label} delay={idx * 0.1}>
                <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl sm:rounded-3xl border border-slate-200/90 bg-white/90 p-4 sm:p-7 shadow-xs hover:shadow-xl hover:border-brand-red/30 transition-all duration-300 backdrop-blur-xs h-full">
                  {/* Hover Glow */}
                  <div
                    className="absolute -right-8 -top-8 h-24 sm:h-32 w-24 sm:w-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
                    style={{ background: s.glow }}
                  />

                  <div className="space-y-2 sm:space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div
                        className="flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-2xl shadow-xs transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: s.glow,
                          border: `1px solid ${s.border}`,
                        }}
                      >
                        <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-brand-ink" />
                      </div>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[8px] sm:text-[10px] font-bold text-slate-600">
                        {s.badge}
                      </span>
                    </div>

                    <div className="display-font text-2xl sm:text-5xl font-black tracking-tight text-brand-ink group-hover:text-brand-red transition-colors duration-300">
                      <AnimatedCounter value={s.value} suffix={s.suffix} decimals={s.decimals} />
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-xs sm:text-base leading-snug">
                      {s.label}
                    </h3>
                  </div>

                  <p className="mt-2 sm:mt-4 text-[10px] sm:text-xs text-slate-500 leading-relaxed font-medium relative z-10 border-t border-slate-100 pt-2 sm:pt-4">
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
