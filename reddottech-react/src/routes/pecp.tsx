import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
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
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Sparkles,
  Check,
  Building2,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/pecp")({
  head: () => ({
    meta: [
      { title: "PECP Program | Professional Executive Certification Program — Red Dot" },
      {
        name: "description",
        content:
          "The flagship Professional Excellence and Certification Program (PECP) jointly offered by Red Dot Technologies and USC Upstate (USA).",
      },
    ],
  }),
  component: PecpPage,
});

function PecpPage() {
  const [activeUscTab, setActiveUscTab] = useState(0);
  const [activePillarIndex, setActivePillarIndex] = useState(0);

  // USC Upstate Interactive Tabs Data
  const uscTabs = [
    {
      id: "faculty",
      label: "Faculty Excellence",
      icon: Award,
      badge: "Pillar 01 • Academic Leadership",
      badgeColor: "bg-brand-red/10 text-brand-red border-brand-red/20",
      accentBorder: "border-brand-red/40",
      title: "Internationally Acclaimed Faculty",
      desc: "with industry expertise and academic excellence",
      subDetail:
        "Learn directly from distinguished USC Upstate professors and international industry leaders holding patents, doctoral degrees, and decades of practical execution.",
      pillStat: "100% US & Global Faculty",
    },
    {
      id: "partnerships",
      label: "Global Mobility",
      icon: Globe2,
      badge: "Pillar 02 • Global Industry Access",
      badgeColor: "bg-amber-50 text-amber-600 border-amber-200",
      accentBorder: "border-amber-500/40",
      title: "Strong Industry Partnerships",
      desc: "across the U.S. that prepare graduates for global careers.",
      subDetail:
        "Leverage strategic corporate networks and international institution ties that give Nepalese graduates direct pathways into multinational tech roles and advanced studies.",
      pillStat: "Global Alumni Network",
    },
    {
      id: "accreditation",
      label: "Top Accreditation",
      icon: ShieldCheck,
      badge: "Pillar 03 • Quality Standards",
      badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
      accentBorder: "border-emerald-500/40",
      title: "Accreditation & Credibility",
      desc: "Accreditation by top educational bodies ensuring quality and credibility.",
      subDetail:
        "Backed by prestigious AACSB & Southern Association of Colleges and Schools (SACSCOC) accreditation standards, ensuring international trust and seamless credit recognition.",
      pillStat: "AACSB Accredited JCBE",
    },
  ];

  // Why PECP 5 Pillars Data
  const whyPecpPillars = [
    {
      number: "01",
      heading: "Global Recognition",
      desc: "Certifications backed by a top U.S. university.",
      icon: Globe2,
      badge: "US Accredited",
      color: "from-rose-500 to-brand-red",
      iconBg: "bg-brand-red/10 text-brand-red border-brand-red/20",
      badgeBg: "bg-rose-50 text-brand-red border-rose-200",
      bgImage: "/images/pecp/global_recognition.png",
      highlights: ["U.S. Accredited Executive Credential", "Joint USC Upstate Faculty Approval"],
    },
    {
      number: "02",
      heading: "Expert Faculty",
      desc: "Delivered by USC Upstate professors and international trainers.",
      icon: Award,
      badge: "World-Class",
      color: "from-amber-500 to-orange-500",
      iconBg: "bg-amber-50 text-amber-600 border-amber-200",
      badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
      bgImage: "/images/pecp/expert_faculty.png",
      highlights: ["World-Class Professors & Trainers", "Real-World Executive Mentorship"],
    },
    {
      number: "03",
      heading: "Local Relevance",
      desc: "Tailored for Nepal’s workforce and economy.",
      icon: ShieldCheck,
      badge: "Nepal Market",
      color: "from-emerald-500 to-teal-500",
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
      badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      bgImage: "/images/pecp/local_relevance.png",
      highlights: ["Nepal Market Case Studies", "High-Demand Local Industry Skills"],
    },
    {
      number: "04",
      heading: "Career Outcomes",
      desc: "Designed to unlock promotions, international jobs, and higher studies.",
      icon: TrendingUp,
      badge: "High Growth",
      color: "from-blue-500 to-indigo-500",
      iconBg: "bg-blue-50 text-blue-600 border-blue-200",
      badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
      bgImage: "/images/pecp/career_outcomes.png",
      highlights: ["Global Career Pathways", "Fast-Track Leadership Promotions"],
    },
    {
      number: "05",
      heading: "Personalized Learning",
      desc: "Small cohorts, mentorship, and interactive sessions.",
      icon: Users,
      badge: "Small Cohorts",
      color: "from-purple-500 to-violet-500",
      iconBg: "bg-purple-50 text-purple-600 border-purple-200",
      badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
      bgImage: "/images/pecp/personalized_learning.png",
      highlights: ["Small Cohort Mentorship", "Interactive 1-on-1 Peer Sessions"],
    },
  ];

  // Target Audiences
  const targetAudiences = [
    {
      title: "Aspiring Graduates",
      desc: "Gain career-ready skills and global certifications to launch your career.",
      icon: GraduationCap,
      badge: "Career Ready",
      color: "from-rose-500 to-brand-red",
      iconBg: "bg-brand-red/10 text-brand-red border-brand-red/20",
      badgeBg: "bg-rose-50 text-brand-red border-rose-200",
      highlights: ["Dual Certificate Credential", "Hands-on Capstone Projects", "Job Placement Assistance"],
    },
    {
      title: "Young Professionals & Career Switchers",
      desc: "Upskill or transition into high-demand tech & business leadership roles.",
      icon: Zap,
      badge: "Skill Upgrade",
      color: "from-amber-500 to-orange-500",
      iconBg: "bg-amber-50 text-amber-600 border-amber-200/80",
      badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
      highlights: ["Flexible Blended Schedules", "Executive 1-on-1 Mentorship", "In-Demand Tech & Business Skills"],
    },
    {
      title: "Institutions & Corporates",
      desc: "Partner for bulk enrollments and enterprise staff upskilling.",
      icon: Briefcase,
      badge: "Enterprise",
      color: "from-emerald-500 to-teal-500",
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200/80",
      badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      highlights: ["Custom Corporate Training", "Bulk Cohort Sponsorships", "Tailored Executive Curricula"],
    },
  ];

  // Program Key Framework Modules
  const programPillars = [
    {
      title: "U.S. Joint Faculty Lectures",
      desc: "Direct instruction & guest lectures from distinguished USC Upstate JCBE faculty.",
      icon: Award,
      badge: "Faculty Led",
    },
    {
      title: "Nepal Enterprise Capstone",
      desc: "Real-world projects focused on solving real business and tech challenges in Nepal.",
      icon: Zap,
      badge: "Practical",
    },
    {
      title: "Joint Certified Credential",
      desc: "Official joint certificate issued by USC Upstate and Red Dot Technologies upon graduation.",
      icon: ShieldCheck,
      badge: "Verified",
    },
    {
      title: "Global Alumni Access",
      desc: "Lifetime connection to corporate networks, tech forums, and placement opportunities.",
      icon: Globe2,
      badge: "Network",
    },
  ];

  const handleDownloadSyllabus = () => {
    toast.success("Downloading full PECP Executive Syllabus PDF...");
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-slate-50 text-brand-ink selection:bg-brand-red selection:text-white">
      {/* Page Hero - Original Site Theme Component */}
      <PageHero
        badge="USC Upstate (USA) × Red Dot Technologies"
        title={
          <>
            Professional Excellence &amp;{" "}
            <span className="gradient-text">Certification Program (PECP)</span>
          </>
        }
        subtitle="A flagship joint initiative bridging U.S. academic standards with Nepal’s market needs. Equip yourself with internationally accredited credentials, expert faculty mentorship, and career placement."
        actions={
          <>
            <Link to="/contact" className="btn-primary text-base px-7 py-3.5 shadow-lg">
              <span>Enroll in Program</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/courses"
              className="btn-secondary text-base px-7 py-3.5 shadow-md bg-white border border-slate-300 text-slate-800 hover:bg-slate-100"
            >
              <BookOpen className="h-4 w-4 text-brand-red" />
              <span>Explore PECP Courses</span>
            </Link>
          </>
        }
      >
        {/* Metric Highlights Pill Bar */}
        <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-slate-200/90 bg-white/90 backdrop-blur-md p-4 shadow-sm text-center space-y-1">
            <div className="text-2xl font-black text-brand-red">100%</div>
            <div className="text-xs font-bold text-slate-600">U.S. Joint Approval</div>
          </div>
          <div className="rounded-2xl border border-slate-200/90 bg-white/90 backdrop-blur-md p-4 shadow-sm text-center space-y-1">
            <div className="text-2xl font-black text-brand-ink">AACSB</div>
            <div className="text-xs font-bold text-slate-600">Accredited JCBE</div>
          </div>
          <div className="rounded-2xl border border-slate-200/90 bg-white/90 backdrop-blur-md p-4 shadow-sm text-center space-y-1">
            <div className="text-2xl font-black text-brand-red">500+</div>
            <div className="text-xs font-bold text-slate-600">Graduates &amp; Leaders</div>
          </div>
          <div className="rounded-2xl border border-slate-200/90 bg-white/90 backdrop-blur-md p-4 shadow-sm text-center space-y-1">
            <div className="text-2xl font-black text-brand-ink">Global</div>
            <div className="text-xs font-bold text-slate-600">Career Placement</div>
          </div>
        </div>
      </PageHero>

      {/* ------------------------------------------------------------- */}
      {/* 1. WHO WE ARE - STRATEGIC JOINT INITIATIVE                     */}
      {/* ------------------------------------------------------------- */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-white">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Text Narrative */}
            <ScrollReveal direction="left" className="lg:col-span-6 space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-red/20 bg-brand-red/5 px-4 py-1.5 shadow-xs">
                  <span className="h-2 w-2 rounded-full bg-brand-red animate-pulse" />
                  <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-red">
                    Strategic Collaboration
                  </span>
                </div>

                <h2 className="display-font text-3xl sm:text-5xl font-black tracking-tight text-brand-ink leading-tight">
                  <span className="gradient-text">Who</span> We Are
                </h2>
              </div>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
                The Professional Excellence and Certification Program (PECP) is a pioneering
                collaboration between USC Upstate’s George Dean Johnson College of Business and
                Economics (USA) and Red Dot Technologies Pvt. Ltd. (Nepal).
              </p>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
                The program equips Nepalese professionals with globally recognized certifications
                and industry-relevant skills, bridging international expertise with local workforce
                needs. Learners gain the best of both worlds—global standards delivered locally.
              </p>

              {/* Verified Features */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3 text-sm font-bold text-slate-800">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  <span>Jointly offered with USC Upstate JCBE faculty (USA)</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-slate-800">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  <span>Globally recognized U.S.-standard executive certification</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-slate-800">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  <span>Tailored for Nepal's growing professional &amp; tech workforce</span>
                </div>
              </div>

              <div className="pt-4">
                <Link to="/contact" className="btn-primary shadow-lg">
                  <span>Explore Admissions</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Right Visual Image Card */}
            <ScrollReveal direction="right" className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/90 shadow-2xl bg-gradient-to-br from-white via-slate-50 to-rose-50/40 p-8 flex items-center justify-center min-h-[400px] sm:min-h-[460px]">
                  <img
                    src="/images/pecp/pecp.png"
                    alt="PECP Global Collaboration"
                    className="max-h-[350px] sm:max-h-[400px] w-auto max-w-full object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Floating Credential Badge */}
                <div className="absolute -bottom-6 -left-4 sm:left-6 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 p-5 shadow-2xl flex items-center gap-4 animate-float">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red text-white font-black text-xl shadow-md">
                    <GraduationCap className="h-6 w-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider text-brand-ink">
                      U.S. Credential Badge
                    </div>
                    <div className="text-[11px] font-bold text-slate-500">
                      USC Upstate Certified
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. ABOUT USC UPSTATE - INTERACTIVE SPOTLIGHT SHOWCASE          */}
      {/* ------------------------------------------------------------- */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/90 text-brand-ink border-y border-slate-200/80">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="mb-14 text-center mx-auto max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-rose-500/20 bg-rose-500/5 px-5 py-2 shadow-xs backdrop-blur-md">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-red animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-brand-red">
                Official U.S. Academic Partner
              </span>
            </div>

            <h2 className="display-font text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-brand-ink leading-tight">
              About <span className="gradient-text">USC Upstate</span>
            </h2>

            <div className="relative mx-auto max-w-3xl rounded-2xl border border-slate-200/80 bg-white/90 p-6 sm:p-7 shadow-sm backdrop-blur-md">
              <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed text-left sm:text-center">
                The University of South Carolina Upstate (USC Upstate) is a leading public university in the United States, part of the respected University of South Carolina system. Located in Spartanburg, South Carolina, USC Upstate is home to over 6,000 students and is known for its strong emphasis on business, technology, and professional studies. The George Dean Johnson Jr. College of Business and Economics (JCBE) is particularly recognized for:
              </p>
            </div>
          </div>

          {/* Interactive Tab Switcher */}
          <div className="mb-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {uscTabs.map((tab, index) => {
              const IconComp = tab.icon;
              const isActive = activeUscTab === index;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveUscTab(index)}
                  className={`group flex items-center gap-3 rounded-full px-6 py-3.5 text-xs sm:text-sm font-black transition-all duration-300 shadow-sm cursor-pointer ${
                    isActive
                      ? "bg-slate-950 text-white shadow-xl scale-105 border border-slate-800"
                      : "bg-white text-slate-700 hover:bg-slate-100 hover:text-brand-ink border border-slate-200/90"
                  }`}
                >
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${
                      isActive ? "bg-brand-red text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <IconComp className="h-4 w-4 stroke-[2.5]" />
                  </div>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Spotlight Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left 7 Columns: Active Tab Stage */}
            <div className="lg:col-span-7 flex flex-col">
              <div className={`relative h-full flex flex-col justify-between rounded-[2.5rem] border ${uscTabs[activeUscTab].accentBorder} bg-white p-8 sm:p-10 shadow-2xl transition-all duration-500`}>
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-black uppercase tracking-wider ${uscTabs[activeUscTab].badgeColor}`}>
                      {uscTabs[activeUscTab].badge}
                    </span>
                    <span className="rounded-full bg-slate-100 border border-slate-200/80 px-3 py-1 text-xs font-black text-slate-700 uppercase tracking-widest">
                      {uscTabs[activeUscTab].pillStat}
                    </span>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red border border-brand-red/20 shadow-xs">
                      {(() => {
                        const IconComponent = uscTabs[activeUscTab].icon;
                        return <IconComponent className="h-8 w-8 stroke-[2.2]" />;
                      })()}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-brand-ink tracking-tight leading-snug">
                      {uscTabs[activeUscTab].title}
                    </h3>
                  </div>

                  <div className="space-y-4 pt-2">
                    <p className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed">
                      {uscTabs[activeUscTab].desc}
                    </p>
                    <p className="text-sm text-slate-600 font-normal leading-relaxed border-l-2 border-brand-red/40 pl-4 py-1 bg-slate-50/60 rounded-r-xl">
                      {uscTabs[activeUscTab].subDetail}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>Tab {activeUscTab + 1} of 3</span>
                  <div className="flex gap-2">
                    {uscTabs.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveUscTab(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          activeUscTab === idx ? "w-8 bg-brand-red" : "w-2 bg-slate-200"
                        }`}
                        aria-label={`Go to tab ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Logo Card */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="relative h-full flex flex-col justify-between rounded-[2.5rem] border border-slate-200/90 bg-white p-8 sm:p-10 shadow-2xl text-slate-900 overflow-hidden group">
                <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-brand-red via-rose-500 to-amber-500" />

                <div className="space-y-6 text-center">
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-white shadow-md">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Authorized Partnership
                  </div>

                  <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/90 shadow-inner flex items-center justify-center min-h-[130px]">
                    <img
                      src="https://uscupstate.edu/wp-content/uploads/2023/10/COLOR_HOR_BLK_Upstate_Logo-1-e1698410030138.png"
                      alt="USC Upstate Logo"
                      className="h-16 sm:h-20 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-lg font-black text-brand-ink tracking-tight">
                      University of South Carolina Upstate
                    </h4>
                    <p className="text-xs font-bold text-slate-500">
                      Spartanburg, South Carolina (USA)
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <div className="relative rounded-2xl bg-gradient-to-r from-rose-50 via-slate-50 to-amber-50/50 border border-slate-200/80 p-6 text-brand-ink shadow-sm space-y-2">
                    <div className="flex items-center gap-2 text-brand-red text-xs font-black uppercase tracking-wider">
                      <GraduationCap className="h-4 w-4" />
                      <span>Impact in Nepal</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed italic">
                      “By partnering with Red Dot Technologies for PECP, USC Upstate extends its academic excellence and global credibility to learners in Nepal, making the U.S.-standard certification accessible and affordable locally.”
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. WHY PECP? - 3D STAGGERED BENTO GRID                         */}
      {/* ------------------------------------------------------------- */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-slate-50/90 text-brand-ink border-y border-slate-200/80">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[750px] w-[1050px] rounded-full opacity-[0.16] blur-[170px]"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--brand-red) 30%, transparent) 0%, transparent 70%)",
            }}
          />
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16 text-center mx-auto max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-red/20 bg-brand-red/5 px-5 py-2 shadow-xs backdrop-blur-md">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-red animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-brand-red">
                Program Advantages
              </span>
            </div>

            <h2 className="display-font text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-brand-ink leading-tight">
              Why <span className="gradient-text">PECP ?</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
              Learners gain the best of both worlds—global standards delivered locally.
            </p>
          </div>

          {/* 3D Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {whyPecpPillars.map((p, idx) => {
              const IconComp = p.icon;
              const isHero = idx === 0;

              return (
                <div
                  key={p.number}
                  className={`group relative overflow-hidden rounded-[2.5rem] border border-slate-200/90 bg-white p-8 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-brand-red/40 hover:shadow-2xl flex flex-col justify-between ${
                    isHero ? "md:col-span-2 lg:col-span-2 min-h-[340px]" : "md:col-span-1 lg:col-span-1 min-h-[340px]"
                  }`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-20 group-hover:opacity-35"
                    style={{ backgroundImage: `url('${p.bgImage}')` }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/85 to-white/45" />

                  <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${p.color}`} />

                  <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${p.iconBg} shadow-xs backdrop-blur-md transition-transform duration-500 group-hover:scale-110`}
                      >
                        <IconComp className="h-7 w-7 stroke-[2.2]" />
                      </div>

                      <span className="rounded-full bg-slate-100 border border-slate-200/90 px-3.5 py-1 text-xs font-black text-slate-800 tracking-widest shadow-xs">
                        {p.number}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 border text-[10px] font-black uppercase tracking-widest shadow-xs ${p.badgeBg}`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-red animate-pulse" />
                        <span>{p.badge}</span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-black text-brand-ink tracking-tight leading-snug group-hover:text-brand-red transition-colors">
                        {p.heading}
                      </h3>

                      <p className="text-sm sm:text-base font-semibold text-slate-600 leading-relaxed">
                        {p.desc}
                      </p>

                      {isHero && p.highlights && (
                        <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-slate-100">
                          {p.highlights.map((hl, hIdx) => (
                            <div key={hIdx} className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                              <span>{hl}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. TARGET AUDIENCE - WHO IS IT FOR?                            */}
      {/* ------------------------------------------------------------- */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-white">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center mx-auto max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-red/20 bg-brand-red/5 px-5 py-2 shadow-xs">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-red animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-brand-red">
                Target Audience
              </span>
            </div>

            <h2 className="display-font text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-brand-ink leading-tight">
              <span className="gradient-text">Who</span> Is It For?
            </h2>

            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
              Empowering diverse career pathways across Nepal with tailored executive learning tracks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {targetAudiences.map((aud, idx) => {
              const IconComp = aud.icon;
              return (
                <div
                  key={aud.title}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-slate-200/90 bg-white p-8 shadow-xl transition-all duration-500 hover:shadow-2xl hover:border-brand-red/40 hover:-translate-y-2"
                >
                  <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${aud.color}`} />

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-16 w-16 items-center justify-center rounded-2xl border ${aud.iconBg} shadow-md transition-transform duration-500 group-hover:scale-110`}
                      >
                        <IconComp className="h-8 w-8 stroke-[2.2]" />
                      </div>

                      <span className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 border text-[10px] font-black uppercase tracking-widest ${aud.badgeBg}`}>
                        <span>{aud.badge}</span>
                      </span>
                    </div>

                    <div className="space-y-3">
                      <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                        Track 0{idx + 1}
                      </span>
                      <h3 className="text-2xl font-black text-brand-ink tracking-tight transition-colors group-hover:text-brand-red">
                        {aud.title}
                      </h3>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">
                        {aud.desc}
                      </p>
                    </div>

                    <div className="pt-3 space-y-2 border-t border-slate-100">
                      {aud.highlights.map((hl, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2.5 text-xs font-bold text-slate-700">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-black text-brand-red">
                    <span>Applications Open</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. PROGRAM FRAMEWORK & BLUEPRINT                               */}
      {/* ------------------------------------------------------------- */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/90 text-brand-ink border-y border-slate-200/80">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center mx-auto max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-red/20 bg-brand-red/5 px-5 py-2 shadow-xs">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-red animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-brand-red">
                Curriculum Blueprint
              </span>
            </div>

            <h2 className="display-font text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-brand-ink leading-tight">
              Program <span className="gradient-text">Framework</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
              Built on academic rigor, industry execution, and global accreditation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {programPillars.map((pillar, pIdx) => {
              const IconComponent = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="group relative rounded-[2.25rem] border border-slate-200/90 bg-white p-7 shadow-lg transition-all duration-500 hover:shadow-2xl hover:border-brand-red/40 hover:-translate-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red border border-brand-red/20 shadow-xs transition-transform duration-500 group-hover:scale-110">
                        <IconComponent className="h-7 w-7 stroke-[2.2]" />
                      </div>
                      <span className="rounded-full bg-slate-100 border border-slate-200/80 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-700">
                        {pillar.badge}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Module 0{pIdx + 1}
                      </div>
                      <h3 className="text-xl font-black text-brand-ink tracking-tight group-hover:text-brand-red transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. UPCOMING BATCHES SECTION                                    */}
      {/* ------------------------------------------------------------- */}
      <PecpBatchSection />

      {/* ------------------------------------------------------------- */}
      {/* 7. CONVERSION CALL TO ACTION                                   */}
      {/* ------------------------------------------------------------- */}
      <CtaSection />
    </div>
  );
}
