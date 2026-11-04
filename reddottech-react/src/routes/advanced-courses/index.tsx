import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Clock,
  ArrowRight,
  Layers,
  Award,
  Globe2,
  CheckCircle2,
  Sparkles,
  Users,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CtaSection } from "@/components/sections/CtaSection";
import { TiltCard } from "@/components/motion/TiltCard";
import { Magnetic } from "@/components/motion/Magnetic";
import { advancedCourses, formatNprPrice, type AdvancedCourse } from "@/data/advanced-courses-data";

export const Route = createFileRoute("/advanced-courses/")({
  head: () => ({
    meta: [
      {
        title: "Advanced Courses | Faculty-Led Programs — Red Dot Technologies × USC Upstate",
      },
      {
        name: "description",
        content:
          "Explore faculty-led advanced PECP certification programs developed in collaboration with USC Upstate. Master Excel, Power BI, Copilot, and executive data presentation.",
      },
      {
        property: "og:title",
        content: "Advanced Courses | Faculty-Led Programs — Red Dot Technologies × USC Upstate",
      },
      {
        property: "og:description",
        content:
          "Faculty-led professional certification courses with USC Upstate faculty mentorship and practical, assignment-based learning.",
      },
      {
        property: "og:image",
        content: "https://reddottech.com.np/images/courses/apd/og.jpg",
      },
      {
        property: "og:url",
        content: "https://reddottech.com.np/advanced-courses",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Advanced Courses | Faculty-Led Programs — Red Dot Technologies × USC Upstate",
      },
      {
        name: "twitter:description",
        content:
          "Faculty-led professional certification courses with USC Upstate faculty mentorship and practical, assignment-based learning.",
      },
      {
        name: "twitter:image",
        content: "https://reddottech.com.np/images/courses/apd/og.jpg",
      },
    ],
  }),
  component: AdvancedCoursesPage,
});

const whyPecpPoints = [
  {
    icon: Globe2,
    title: "International Collaboration",
    desc: "Joint curriculum developed in direct collaboration with University of South Carolina Upstate faculty, bridging international academic standards with regional market needs.",
  },
  {
    icon: Users,
    title: "Expert-Led Learning",
    desc: "Direct mentorship and qualitative assignment reviews by distinguished USC Upstate professors holding doctoral credentials and decades of research experience.",
  },
  {
    icon: Zap,
    title: "Practical Career-Relevant Skills",
    desc: "100% workplace-focused competency building across Microsoft Excel, Power BI, Copilot, and executive presentation storytelling. No rote exams.",
  },
  {
    icon: ShieldCheck,
    title: "Flexible Learning",
    desc: "Asynchronous module pacing hosted on USC Upstate's Blackboard Ultra platform, designed to accommodate busy work schedules with live interactive closing sessions.",
  },
];

function AdvancedCourseCard({ course }: { course: AdvancedCourse }) {
  const fallbackImg = "/storage/courses/thumbnails/rB9PeE8IXEHOxY0LH0WwUNCsPvfSsPScZwI7kQAg.jpg";

  return (
    <TiltCard maxTilt={4} className="h-full">
      <Link
        to="/advanced-courses/$slug"
        params={{ slug: course.slug }}
        className="group relative flex h-full flex-col overflow-hidden rounded-xl sm:rounded-[2.25rem] bg-white border border-slate-200/90 shadow-2xs sm:shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-brand-red/30 cursor-pointer block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
      >
        {/* Top Image Banner Area */}
        <div className="relative h-32 sm:h-52 w-full overflow-hidden bg-slate-100 border-b border-slate-100">
          <img
            src={course.thumbnail}
            alt={course.title}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallbackImg;
            }}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-2.5 left-3 sm:bottom-3 sm:left-4">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-md px-2.5 py-0.5 text-[9px] sm:text-[10px] font-black text-brand-ink uppercase tracking-wider shadow-xs">
              <Sparkles className="h-3 w-3 text-brand-red" />
              USC Upstate Collaboration
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="relative z-10 flex h-full flex-col p-4 sm:p-6 flex-1 justify-between space-y-3 sm:space-y-4">
          <div>
            {/* Header Badge & Price Row */}
            <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
              <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-brand-red/10 border border-brand-red/20 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-[11px] font-extrabold text-brand-red min-w-0">
                <Award className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 text-brand-red shrink-0" />
                <span className="line-clamp-1 leading-tight">
                  {course.badge || "Advanced PECP"}
                </span>
              </span>

              {/* Price display with Struck-through original and VAT note */}
              <div className="text-right shrink-0">
                <div className="flex items-baseline gap-1.5 justify-end">
                  <span className="text-[10px] sm:text-xs text-slate-400 line-through font-semibold">
                    {formatNprPrice(course.price.original)}
                  </span>
                  <span className="rounded-full bg-slate-900 px-2 py-0.5 sm:px-2.5 sm:py-0.5 text-[10px] sm:text-xs font-black text-white shadow-xs">
                    {formatNprPrice(course.price.offer)}
                  </span>
                </div>
                <div className="text-[9px] font-bold text-slate-500 mt-0.5">
                  {`+ ${course.price.vatPercent}% VAT`}
                </div>
              </div>
            </div>

            {/* Title */}
            <h3 className="display-font text-base sm:text-xl font-extrabold text-brand-ink leading-snug tracking-tight line-clamp-2 group-hover:text-brand-red transition-colors duration-200">
              {course.title}
            </h3>

            {/* Short Description */}
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium line-clamp-3">
              {course.shortDescription}
            </p>

            {/* Tools Pill Strip */}
            <div className="mt-3 flex flex-wrap gap-1">
              {course.tools.slice(0, 4).map((tool) => (
                <span
                  key={tool}
                  className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold text-slate-600 border border-slate-200/60"
                >
                  {tool}
                </span>
              ))}
              {course.tools.length > 4 && (
                <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold text-slate-500 border border-slate-200/60">
                  +{course.tools.length - 4} more
                </span>
              )}
            </div>
          </div>

          <div>
            {/* Spec Badges Row */}
            <div className="pt-2 sm:pt-4 border-t border-slate-100 grid grid-cols-2 gap-1.5 sm:gap-2 text-[9px] sm:text-[11px] font-bold text-slate-600 text-center">
              <div className="flex items-center justify-center gap-1 p-1 sm:p-2 rounded-md sm:rounded-xl bg-slate-50 border border-slate-100">
                <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-brand-red shrink-0" />
                <span className="text-brand-ink font-extrabold">{course.duration}</span>
              </div>

              <div className="flex items-center justify-center gap-1 p-1 sm:p-2 rounded-md sm:rounded-xl bg-slate-50 border border-slate-100">
                <Layers className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-slate-500 shrink-0" />
                <span className="text-brand-ink font-extrabold capitalize truncate">
                  Faculty-Led
                </span>
              </div>
            </div>

            {/* Faculty Avatars & Action Link Row */}
            <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-slate-100 flex items-center justify-between gap-2 sm:gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex -space-x-2 shrink-0">
                  {course.faculty.map((f, i) => (
                    <img
                      key={i}
                      src={f.image}
                      alt={f.name}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/images/common/dummy-avatar.jpg";
                      }}
                      className="h-7 w-7 sm:h-8 sm:w-8 rounded-full object-cover border-2 border-white shadow-xs"
                    />
                  ))}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs font-extrabold text-brand-ink truncate leading-tight">
                    USC Upstate Faculty
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-slate-500 font-semibold truncate leading-tight mt-0.5">
                    Individual Feedback
                  </p>
                </div>
              </div>

              <Magnetic>
                <div
                  className="flex h-7 w-7 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-brand-red/10 text-brand-red transition-all duration-200 group-hover:bg-brand-red group-hover:text-white group-hover:scale-105 shadow-2xs"
                  aria-label={`View ${course.title}`}
                >
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
              </Magnetic>
            </div>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}

function AdvancedCoursesPage() {
  const featuredCourse = advancedCourses[0];

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-slate-50 text-brand-ink selection:bg-brand-red selection:text-white">
      {/* ── 1. Page Hero Section ── */}
      <PageHero
        badge="PECP Advanced Series • USC Upstate × Red Dot"
        title={
          <>
            Faculty-Led <span className="gradient-text">Advanced Courses</span>
          </>
        }
        subtitle="Specialized executive and professional development programs delivered in direct collaboration with University of South Carolina Upstate faculty. Build data fluency, business intelligence, and AI-assisted presentation skills."
        actions={
          <>
            <a
              href="#featured-course"
              className="btn-primary text-xs sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 shadow-lg"
            >
              <span>Explore Featured Course</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/contact"
              className="btn-secondary text-xs sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 shadow-md bg-white border border-slate-300 text-slate-800 hover:bg-slate-100"
            >
              <Users className="h-4 w-4 text-brand-red" />
              <span>Talk to Admissions</span>
            </Link>
          </>
        }
      >
        {/* Breadcrumb row under hero */}
        <div className="pt-4 sm:pt-6 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
          <Link to="/" className="hover:text-brand-red transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-brand-ink font-bold">Advanced Courses</span>
        </div>
      </PageHero>

      {/* ── 2. Featured Course Banner Section ── */}
      {featuredCourse && (
        <section
          id="featured-course"
          className="relative py-12 sm:py-20 lg:py-24 bg-white border-b border-slate-200/80 overflow-hidden"
        >
          {/* Subtle decorative background blur */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div
              className="absolute -top-24 right-1/4 h-80 w-80 rounded-full opacity-[0.08] blur-[100px]"
              style={{
                background: "radial-gradient(circle, var(--brand-red) 0%, transparent 70%)",
              }}
            />
            <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="relative overflow-hidden rounded-2xl sm:rounded-[2.5rem] border border-slate-200/90 bg-gradient-to-br from-slate-900 via-slate-900 to-[#1e1b24] p-6 sm:p-10 lg:p-14 text-white shadow-2xl">
                {/* Ambient glow in card */}
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-25 blur-3xl"
                  style={{
                    background: "radial-gradient(circle, var(--brand-red) 0%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left Column: Course Details */}
                  <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-red/20 border border-brand-red/40 px-3 py-1 text-[10px] sm:text-xs font-black uppercase tracking-widest text-brand-red-light">
                        <Sparkles className="h-3 w-3 text-amber-300" />
                        {featuredCourse.badge || "PECP Hallmark Course"}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/10 border border-white/15 px-2.5 py-1 text-[10px] sm:text-xs font-bold text-slate-200">
                        USC Upstate × Red Dot
                      </span>
                    </div>

                    <div>
                      <h2 className="display-font text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                        {featuredCourse.title}
                      </h2>
                      <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-300">
                        {featuredCourse.fullTitle}
                      </p>
                      <p className="mt-1 text-[11px] sm:text-xs font-medium text-amber-300/90">
                        {featuredCourse.tagline}
                      </p>
                    </div>

                    <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-normal">
                      {featuredCourse.shortDescription}
                    </p>

                    {/* Quick Facts Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-2">
                      <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                        <Clock className="h-4 w-4 text-brand-red-light mx-auto mb-1" />
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          Duration
                        </div>
                        <div className="text-xs sm:text-sm font-extrabold text-white mt-0.5">
                          {featuredCourse.duration}
                        </div>
                      </div>

                      <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                        <Layers className="h-4 w-4 text-brand-red-light mx-auto mb-1" />
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          Delivery
                        </div>
                        <div className="text-xs sm:text-sm font-extrabold text-white mt-0.5 truncate">
                          Blackboard Ultra
                        </div>
                      </div>

                      <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                        <Award className="h-4 w-4 text-brand-red-light mx-auto mb-1" />
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          Credential
                        </div>
                        <div className="text-xs sm:text-sm font-extrabold text-white mt-0.5 truncate">
                          USC Cert
                        </div>
                      </div>

                      <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                        <Users className="h-4 w-4 text-brand-red-light mx-auto mb-1" />
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          Intake
                        </div>
                        <div className="text-xs sm:text-sm font-extrabold text-white mt-0.5">
                          Monthly Starts
                        </div>
                      </div>
                    </div>

                    {/* Tools badges */}
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                        Software &amp; Tools Covered:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {featuredCourse.tools.map((tool) => (
                          <span
                            key={tool}
                            className="rounded-lg bg-white/10 border border-white/15 px-2.5 py-1 text-xs font-semibold text-slate-200"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Price Box, Visual & CTAs */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                    <div className="rounded-2xl bg-white/10 border border-white/15 p-5 sm:p-7 backdrop-blur-md space-y-5">
                      <div className="flex items-center justify-between pb-4 border-b border-white/10">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block">
                            Tuition Investment
                          </span>
                          <span className="text-[11px] text-slate-400">Fixed cohort fee</span>
                        </div>
                        <div className="text-right">
                          <div className="text-xs sm:text-sm text-slate-400 line-through font-semibold">
                            {formatNprPrice(featuredCourse.price.original)}
                          </div>
                          <div className="text-2xl sm:text-3xl font-black text-white">
                            {formatNprPrice(featuredCourse.price.offer)}
                          </div>
                          <div className="text-[10px] font-bold text-amber-300 mt-0.5">
                            {`+ ${featuredCourse.price.vatPercent}% VAT`}
                          </div>
                        </div>
                      </div>

                      {/* Key highlights checklist */}
                      <div className="space-y-2 text-xs sm:text-sm text-slate-200">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                          <span>5 workplace-simulated assignments</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                          <span>Direct qualitative faculty feedback</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                          <span>Live faculty closing Zoom session</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                          <span>Professional completion certificate</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-2 flex flex-col sm:flex-row gap-3">
                        <Link
                          to="/advanced-courses/$slug"
                          params={{ slug: featuredCourse.slug }}
                          className="btn-primary flex-1 text-center justify-center text-xs sm:text-sm py-3"
                        >
                          <span>View Course Details</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                          to="/contact"
                          search={{ course: featuredCourse.slug }}
                          className="btn-secondary flex-1 text-center justify-center text-xs sm:text-sm py-3 bg-white/10 text-white border-white/25 hover:bg-white/20"
                        >
                          <span>Enroll Now</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ── 3. Course Grid Section ── */}
      <section id="catalog" className="py-12 sm:py-20 lg:py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Program Catalog"
            title={
              <>
                Explore Our <span className="gradient-text">Advanced Cohorts</span>
              </>
            }
            subtitle="Explore our faculty-led advanced course catalog. Designed to scale seamlessly with upcoming executive and data masterclasses."
          />

          <div className="mt-10 sm:mt-14">
            <div
              className={`grid gap-6 sm:gap-8 ${
                advancedCourses.length === 1
                  ? "grid-cols-1 max-w-xl mx-auto"
                  : advancedCourses.length === 2
                    ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {advancedCourses.map((course) => (
                <AdvancedCourseCard key={course.slug} course={course} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Why PECP Section ── */}
      <section className="py-12 sm:py-20 lg:py-24 bg-white border-y border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="The PECP Difference"
            title={
              <>
                Why Choose <span className="gradient-text">PECP Advanced</span>?
              </>
            }
            subtitle="Bridging international university excellence with regional industry execution."
          />

          <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {whyPecpPoints.map((point, idx) => {
              const Icon = point.icon;
              return (
                <ScrollReveal key={idx} delay={idx * 60}>
                  <div className="h-full rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-slate-50/70 p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all duration-300 hover:border-brand-red/30 hover:-translate-y-1 flex flex-col justify-between">
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red border border-brand-red/20">
                        <Icon className="h-6 w-6 stroke-[2]" />
                      </div>
                      <h3 className="display-font text-lg font-extrabold text-brand-ink leading-snug">
                        {point.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                        {point.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. Call to Action ── */}
      <CtaSection />
    </div>
  );
}
