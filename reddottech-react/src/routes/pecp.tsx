import { createFileRoute, Link } from "@tanstack/react-router";
import { CtaSection } from "@/components/sections/CtaSection";
import { PecpBatchSection } from "@/components/sections/PecpBatchSection";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  CheckCircle2,
  ArrowRight,
  Award,
  GraduationCap,
  Download,
  ShieldCheck,
  Zap,
  Globe2,
  TrendingUp,
  Users,
  Briefcase,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/pecp")({
  head: () => ({
    meta: [
      { title: "PECP Program | Professional Executive Certification Program — RedDot" },
      {
        name: "description",
        content:
          "The flagship Professional Excellence and Certification Program (PECP) jointly offered by RedDot Technologies and USC Upstate (USA).",
      },
    ],
  }),
  component: PecpPage,
});

function PecpPage() {
  // 1. Why PECP (5 Pillars from elements/pecp/why-pecp.blade.php)
  const whyPecpPillars = [
    {
      number: "01",
      heading: "Global Recognition",
      desc: "Certifications backed by a U.S. university.",
      icon: Globe2,
      badge: "US Accredited",
      color: "from-rose-500 to-brand-red",
      iconBg: "bg-brand-red/10 text-brand-red border-brand-red/20",
    },
    {
      number: "02",
      heading: "Expert Faculty",
      desc: "Delivered by USC Upstate professors and international trainers.",
      icon: Award,
      badge: "World-Class",
      color: "from-amber-500 to-orange-500",
      iconBg: "bg-amber-50 text-amber-600 border-amber-200/80",
    },
    {
      number: "03",
      heading: "Local Relevance",
      desc: "Tailored for Nepal’s workforce and economy.",
      icon: ShieldCheck,
      badge: "Nepal Market",
      color: "from-emerald-500 to-teal-500",
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200/80",
    },
    {
      number: "04",
      heading: "Career Outcomes",
      desc: "Designed to unlock promotions, international jobs, and higher studies.",
      icon: TrendingUp,
      badge: "High Growth",
      color: "from-blue-500 to-indigo-500",
      iconBg: "bg-blue-50 text-blue-600 border-blue-200/80",
    },
    {
      number: "05",
      heading: "Personalized Learning",
      desc: "Small cohorts, mentorship, and interactive sessions.",
      icon: Users,
      badge: "Small Cohorts",
      color: "from-purple-500 to-violet-500",
      iconBg: "bg-purple-50 text-purple-600 border-purple-200/80",
    },
  ];

  // 2. Who Is It For? (3 Target Audiences from elements/pecp/pecp-why.blade.php)
  const targetAudiences = [
    {
      title: "Aspiring Graduates",
      desc: "Gain career-ready skills and global certifications.",
      icon: GraduationCap,
      badge: "Career Ready",
      color: "from-rose-500 to-brand-red",
      iconBg: "bg-brand-red/10 text-brand-red border-brand-red/20",
    },
    {
      title: "Young Professionals & Career Switchers",
      desc: "Upskill or transition into high-demand fields.",
      icon: Zap,
      badge: "Skill Upgrade",
      color: "from-amber-500 to-orange-500",
      iconBg: "bg-amber-50 text-amber-600 border-amber-200/80",
    },
    {
      title: "Institutions & Corporates",
      desc: "Partner for bulk enrollments and staff upskilling.",
      icon: Briefcase,
      badge: "Enterprise",
      color: "from-emerald-500 to-teal-500",
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200/80",
    },
  ];

  const handleDownloadSyllabus = () => {
    toast.success("Downloading full PECP Executive Syllabus PDF...");
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Page Hero */}
      <PageHero
        badge="Flagship Executive Certification Program"
        title={
          <>
            Professional Excellence &amp;{" "}
            <span className="gradient-text">Certification Program (PECP)</span>
          </>
        }
        subtitle="PECP is a flagship collaboration between Red Dot Technologies and University of South Carolina Upstate (USA), designed to bridge global expertise with local relevance."
        actions={
          <>
            <Link to={"/contactt" as any} className="btn-primary">
              <span>Apply for Next Cohort</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button onClick={handleDownloadSyllabus} className="btn-secondary">
              <Download className="h-4 w-4" />
              <span>Download Syllabus</span>
            </button>
          </>
        }
      />

      {/* 1. WHO WE ARE (elements/pecp/about-pecp.blade.php) - Clean Light Glass Split Showcase */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]" />
          <div
            className="absolute -right-[10%] top-[10%] h-[350px] w-[350px] rounded-full opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--brand-red) 35%, transparent) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column Text */}
            <ScrollReveal direction="left" className="lg:col-span-6 space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/5 px-4 py-1.5 shadow-xs">
                  <span className="h-2 w-2 rounded-full bg-brand-red animate-pulse" />
                  <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-red">
                    Global Collaboration
                  </span>
                </div>

                <h2 className="display-font text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-ink leading-tight">
                  <span className="gradient-text">Who</span> We Are
                </h2>
              </div>

              <p className="text-slate-600 text-base md:text-lg leading-relaxed font-normal">
                The Professional Excellence and Certification Program (PECP) is a pioneering
                collaboration between USC Upstate’s George Dean Johnson College of Business and
                Economics (USA) and Red Dot Technologies Pvt. Ltd. (Nepal).
              </p>

              <p className="text-slate-600 text-base md:text-lg leading-relaxed font-normal">
                The program equips Nepalese professionals with globally recognized certifications
                and industry-relevant skills, bridging international expertise with local workforce
                needs. Learners gain the best of both worlds—global standards delivered locally.
              </p>

              <div className="pt-4 flex items-center gap-4">
                <Link to={"/contactt" as any} className="btn-primary">
                  <span>Explore Admissions</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Right Column Image Graphic */}
            <ScrollReveal direction="right" className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative overflow-hidden rounded-[2.25rem] border border-slate-200/90 shadow-2xl bg-gradient-to-br from-white via-slate-50 to-rose-50/30 p-6 sm:p-8 flex items-center justify-center min-h-[380px] sm:min-h-[440px]">
                  <img
                    src="/images/pecp/pecp.png"
                    alt="PECP Global Collaboration"
                    className="max-h-[340px] sm:max-h-[380px] w-auto max-w-full object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Floating Glass Credential Badge */}
                <div className="absolute -bottom-6 -left-4 sm:left-6 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 p-4 sm:p-5 shadow-2xl flex items-center gap-4 animate-float">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red text-white font-black text-xl shadow-md">
                    <GraduationCap className="h-6 w-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider text-brand-ink">
                      U.S. Credential Badge
                    </div>
                    <div className="text-[11px] font-medium text-slate-500">
                      USC Upstate Certified
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. ABOUT USC UPSTATE (elements/pecp/about-usc.blade.php) - Deep Dark Academic Stage */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-slate-950 text-white border-y border-slate-800">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full opacity-25 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--brand-red) 35%, transparent), transparent 70%)",
            }}
          />
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center mx-auto max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/30 bg-brand-red/10 px-4 py-1.5 backdrop-blur-md shadow-sm">
              <span className="h-2 w-2 rounded-full bg-brand-red animate-pulse" />
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-red">
                U.S. Academic Partner
              </span>
            </div>

            <h2 className="display-font text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              About <span className="gradient-text">USC Upstate</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">
              The University of South Carolina Upstate (USC Upstate) is a leading public university
              in the United States, part of the respected University of South Carolina system.
              Located in Spartanburg, South Carolina, USC Upstate is home to over 6,000 students
              and is known for its strong emphasis on business, technology, and professional
              studies. The George Dean Johnson Jr. College of Business and Economics (JCBE) is
              particularly recognized for:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
            {/* Left Column Checklist */}
            <div className="lg:col-span-7 space-y-4">
              <div className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all hover:bg-white/10 hover:border-brand-red/40">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-red/20 text-brand-red border border-brand-red/30">
                  <CheckCircle2 className="h-5 w-5 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-white">
                    Internationally Acclaimed Faculty
                  </h4>
                  <p className="text-xs text-slate-300 font-medium mt-1">
                    Instructors with deep industry expertise, patents, and academic excellence.
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all hover:bg-white/10 hover:border-brand-red/40">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-red/20 text-brand-red border border-brand-red/30">
                  <CheckCircle2 className="h-5 w-5 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-white">
                    Strong Industry Partnerships
                  </h4>
                  <p className="text-xs text-slate-300 font-medium mt-1">
                    Corporate ties across the U.S. that prepare graduates for global career mobility.
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all hover:bg-white/10 hover:border-brand-red/40">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-red/20 text-brand-red border border-brand-red/30">
                  <CheckCircle2 className="h-5 w-5 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-white">
                    Top Educational Accreditation
                  </h4>
                  <p className="text-xs text-slate-300 font-medium mt-1">
                    Accreditation by top U.S. educational bodies ensuring quality, credibility, and trust.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column Logo Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white p-8 sm:p-10 shadow-2xl text-center space-y-4">
                <img
                  src="https://uscupstate.edu/wp-content/uploads/2023/10/COLOR_HOR_BLK_Upstate_Logo-1-e1698410030138.png"
                  alt="USC Upstate Logo"
                  className="mx-auto h-20 w-auto object-contain"
                />
                <div className="pt-4 border-t border-slate-100 space-y-1">
                  <h4 className="text-sm font-extrabold text-slate-900">
                    University of South Carolina Upstate
                  </h4>
                  <p className="text-xs font-semibold text-slate-500">
                    Spartanburg, South Carolina (USA)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center max-w-3xl mx-auto">
            <p className="text-sm text-slate-400 font-medium leading-relaxed">
              By partnering with Red Dot Technologies for PECP, USC Upstate extends its academic
              excellence and global credibility to learners in Nepal, making the U.S.-standard
              certification accessible and affordable locally.
            </p>
          </div>
        </div>
      </section>

      {/* 3. WHY PECP? (elements/pecp/why-pecp.blade.php) - 5 Bento Grid Cards */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-slate-50/80">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.08]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center mx-auto max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-white px-4 py-1.5 shadow-xs backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-brand-red animate-pulse" />
              <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-red">
                Program Advantages
              </span>
            </div>

            <h2 className="display-font text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-ink leading-tight">
              Why <span className="gradient-text">PECP?</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-500 font-medium max-w-2xl mx-auto">
              Learners gain the best of both worlds—global standards delivered locally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {whyPecpPillars.map((p) => {
              const IconComp = p.icon;
              return (
                <div
                  key={p.number}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-7 shadow-sm transition-all duration-400 hover:shadow-xl hover:border-brand-red/40 hover:-translate-y-1"
                >
                  <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${p.color}`} />

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${p.iconBg} shadow-xs transition-transform duration-300 group-hover:scale-110`}
                      >
                        <IconComp className="h-6 w-6 stroke-[2.2]" />
                      </div>

                      <span className="rounded-full bg-slate-100 border border-slate-200/80 px-3 py-1 text-xs font-black text-slate-700 tracking-wider">
                        {p.number}
                      </span>
                    </div>

                    <div className="space-y-1 mb-3">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-red">
                        {p.badge}
                      </span>
                      <h3 className="text-xl font-extrabold text-brand-ink tracking-tight transition-colors group-hover:text-brand-red">
                        {p.heading}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. WHO IS IT FOR? (elements/pecp/pecp-why.blade.php) - 3 Target Audience Glass Cards */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-white">
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center mx-auto max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/5 px-4 py-1.5 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-brand-red animate-pulse" />
              <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-red">
                Target Audience
              </span>
            </div>

            <h2 className="display-font text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-ink leading-tight">
              <span className="gradient-text">Who</span> Is It For?
            </h2>

            <p className="text-base sm:text-lg text-slate-500 font-medium max-w-2xl mx-auto">
              Empowering diverse career pathways across Nepal with tailored learning tracks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {targetAudiences.map((aud, idx) => {
              const IconComp = aud.icon;
              return (
                <div
                  key={aud.title}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[2.25rem] border border-slate-200/90 bg-white p-8 shadow-lg transition-all duration-400 hover:shadow-2xl hover:border-brand-red/40 hover:-translate-y-1"
                >
                  <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${aud.color}`} />

                  <div className="space-y-6">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl border ${aud.iconBg} shadow-md transition-transform duration-300 group-hover:scale-110`}
                    >
                      <IconComp className="h-8 w-8 stroke-[2.2]" />
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-brand-red">
                        Audience 0{idx + 1} • {aud.badge}
                      </span>
                      <h3 className="text-xl font-extrabold text-brand-ink tracking-tight transition-colors group-hover:text-brand-red">
                        {aud.title}
                      </h3>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">
                        {aud.desc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-red">
                    <span>Enrolling Now</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. PECP BATCH SECTION (elements/pecp/pecp-batch.blade.php) */}
      <PecpBatchSection />

      {/* 6. CTA SECTION (elements/common/app-cta.blade.php) */}
      <CtaSection />
    </div>
  );
}
