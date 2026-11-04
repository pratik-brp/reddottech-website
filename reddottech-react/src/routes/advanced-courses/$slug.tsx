import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Clock,
  BookOpen,
  CheckCircle,
  CheckCircle2,
  ArrowLeft,
  Layers,
  Award,
  Users,
  Sparkles,
  ShieldAlert,
  Download,
  Building2,
  TrendingUp,
  Stethoscope,
  Code2,
  Briefcase,
  GraduationCap,
  ChevronDown,
  Monitor,
  Video,
  FileSpreadsheet,
  PieChart,
  Bot,
  Presentation,
} from "lucide-react";
import { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  getAdvancedCourseBySlug,
  formatNprPrice,
  type AdvancedCourse,
} from "@/data/advanced-courses-data";
import { sanitizeHtml } from "@/lib/sanitize";

export const Route = createFileRoute("/advanced-courses/$slug")({
  loader: ({ params }) => {
    const course = getAdvancedCourseBySlug(params.slug);
    return { course: course || null };
  },
  head: ({ loaderData }) => {
    const course = loaderData?.course;
    if (!course) {
      return {
        meta: [
          { title: "Course Not Found | Red Dot Technologies" },
          { name: "description", content: "The requested course could not be found." },
        ],
      };
    }

    const title = `${course.title} | Advanced Courses | Red Dot Technologies`;
    // ~155 chars meta description
    const desc =
      course.shortDescription.length > 155
        ? `${course.shortDescription.slice(0, 152)}...`
        : course.shortDescription;
    const ogImg = course.ogImage.startsWith("http")
      ? course.ogImage
      : `https://reddottech.com.np${course.ogImage}`;
    const canonical = `https://reddottech.com.np/advanced-courses/${course.slug}`;

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:image", content: ogImg },
        { property: "og:url", content: canonical },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: ogImg },
      ],
      links: [{ rel: "canonical", href: canonical }],
    };
  },
  component: AdvancedCourseDetailPage,
});

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "curriculum", label: "Curriculum" },
  { key: "tools", label: "Tools" },
  { key: "audience", label: "Who It's For" },
  { key: "faculty", label: "Faculty" },
  { key: "requirements", label: "Requirements" },
  { key: "faq", label: "FAQ" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const TOOL_ICONS: Record<string, typeof FileSpreadsheet> = {
  "Microsoft Excel": FileSpreadsheet,
  "Power BI": PieChart,
  "Microsoft Copilot": Bot,
  PowerPoint: Presentation,
  Zoom: Video,
  "Blackboard Ultra": Monitor,
};

const INDUSTRY_ICONS: Record<string, typeof Building2> = {
  "Banking & Financial Services": Building2,
  "Business & Management": Briefcase,
  "Information Technology": Code2,
  "Healthcare & Pharmaceuticals": Stethoscope,
  "Sales, Marketing & Retail": TrendingUp,
  "Students & Early Professionals": GraduationCap,
};

function AdvancedCourseDetailPage() {
  const { slug } = Route.useParams();
  const loaderData = Route.useLoaderData();
  const [course, setCourse] = useState<AdvancedCourse | null>(
    loaderData?.course || getAdvancedCourseBySlug(slug) || null,
  );
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const found = getAdvancedCourseBySlug(slug);
    setCourse(found || null);
  }, [slug]);

  if (!course) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-slate-50">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Course Not Found</h1>
        <p className="text-sm text-slate-500 mb-6">
          The requested course could not be found or may have been removed.
        </p>
        <Link to="/advanced-courses" className="btn-primary">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Advanced Courses
        </Link>
      </div>
    );
  }

  const fallbackThumb = "/storage/courses/thumbnails/rB9PeE8IXEHOxY0LH0WwUNCsPvfSsPScZwI7kQAg.jpg";

  return (
    <div className="min-h-screen bg-[var(--color-background)] pt-24 sm:pt-28 lg:pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <ScrollReveal>
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-600"
          >
            <Link to="/" className="hover:text-brand-red transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/advanced-courses" className="hover:text-brand-red transition-colors">
              Advanced Courses
            </Link>
            <span>/</span>
            <span className="text-slate-800 truncate max-w-[200px] sm:max-w-md">
              {course.title}
            </span>
          </nav>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 items-start">
          {/* ───────────────────────────────────────────────────────────── */}
          {/* Main Content Column (2 of 3)                                  */}
          {/* ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Header & Badges */}
            <ScrollReveal>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-red/10 border border-brand-red/20 px-3 py-1 text-[10px] sm:text-xs font-extrabold text-brand-red">
                    <Sparkles className="h-3.5 w-3.5 text-brand-red" />
                    {course.badge || "PECP Hallmark Course"}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[10px] sm:text-xs font-bold text-emerald-700">
                    <Award className="h-3.5 w-3.5" />
                    USC Upstate Joint Initiative
                  </span>
                </div>

                <div>
                  <h1 className="display-font text-2xl sm:text-4xl lg:text-[2.65rem] font-black text-brand-ink leading-[1.15] tracking-tight">
                    {course.title}
                  </h1>
                  <p className="mt-1.5 text-sm sm:text-lg font-bold text-slate-700">
                    {course.fullTitle}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm font-semibold text-brand-red">
                    {course.tagline}
                  </p>
                </div>

                <p className="text-xs sm:text-base text-slate-600 leading-relaxed font-medium">
                  {course.shortDescription}
                </p>
              </div>
            </ScrollReveal>

            {/* Quick-Facts Bar */}
            <ScrollReveal delay={40}>
              <div className="premium-card-static p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                    <Clock className="h-3.5 w-3.5 text-brand-red" />
                    Duration
                  </div>
                  <div className="text-xs sm:text-sm font-black text-brand-ink">
                    {course.duration}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                    <Layers className="h-3.5 w-3.5 text-brand-red" />
                    Delivery
                  </div>
                  <div className="text-xs sm:text-sm font-black text-brand-ink truncate">
                    Blackboard Ultra
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                    <Award className="h-3.5 w-3.5 text-brand-red" />
                    Certificate
                  </div>
                  <div className="text-xs sm:text-sm font-black text-brand-ink truncate">
                    Professional Cert
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                    <Users className="h-3.5 w-3.5 text-brand-red" />
                    Intake
                  </div>
                  <div className="text-xs sm:text-sm font-black text-brand-ink">Monthly Starts</div>
                </div>
              </div>
            </ScrollReveal>

            {/* Program Delivery 3-Block Feature Cards */}
            <ScrollReveal delay={80}>
              <div className="space-y-3">
                <div className="text-xs font-black uppercase tracking-wider text-brand-red flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  Program Delivery Model
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
                  {course.programDelivery.map((block, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl bg-white border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-2 hover:border-brand-red/30 transition-all"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-red/10 text-brand-red font-black text-xs">
                        0{idx + 1}
                      </div>
                      <h4 className="font-extrabold text-brand-ink text-sm leading-snug">
                        {block.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-medium">
                        {block.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Interactive Tabbed Content Section */}
            <ScrollReveal delay={120}>
              <div className="premium-card-static overflow-hidden rounded-xl sm:rounded-2xl">
                {/* Tab Navigation Header (Scrollable & Keyboard Accessible) */}
                <div
                  role="tablist"
                  aria-label="Course Sections"
                  className="flex border-b border-slate-100 bg-slate-50/70 overflow-x-auto no-scrollbar scroll-smooth"
                >
                  {TABS.map((tab) => (
                    <button
                      key={tab.key}
                      role="tab"
                      id={`tab-${tab.key}`}
                      aria-controls={`panel-${tab.key}`}
                      aria-selected={activeTab === tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`relative px-4 py-3 sm:px-5 sm:py-3.5 text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap cursor-pointer ${
                        activeTab === tab.key
                          ? "text-brand-red bg-white"
                          : "text-slate-600 hover:text-brand-ink hover:bg-slate-100/60"
                      }`}
                    >
                      {tab.label}
                      {activeTab === tab.key && (
                        <span className="absolute bottom-0 inset-x-0 h-[2.5px] bg-brand-red rounded-t-full" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Tab Panels */}
                <div className="p-4 sm:p-7 sm:p-8">
                  {/* ────────────────────────────────── */}
                  {/* TAB 1: OVERVIEW                    */}
                  {/* ────────────────────────────────── */}
                  {activeTab === "overview" && (
                    <div
                      role="tabpanel"
                      id="panel-overview"
                      aria-labelledby="tab-overview"
                      className="space-y-6 sm:space-y-8 animate-fade-in"
                    >
                      {/* Overview Paragraphs */}
                      <div className="space-y-3">
                        <h3 className="text-xs font-black uppercase tracking-wider text-brand-red">
                          Course Overview
                        </h3>
                        {course.overview.map((para, pIdx) => {
                          const isHtml = /<[a-z][\s\S]*>/i.test(para);
                          if (isHtml) {
                            return (
                              <div
                                key={pIdx}
                                className="text-slate-700 leading-relaxed text-sm sm:text-base font-normal"
                                dangerouslySetInnerHTML={{ __html: sanitizeHtml(para) }}
                              />
                            );
                          }
                          return (
                            <p
                              key={pIdx}
                              className="text-slate-700 leading-relaxed text-sm sm:text-base font-normal"
                            >
                              {para}
                            </p>
                          );
                        })}
                      </div>

                      {/* 7 Learning Objectives */}
                      <div className="space-y-4 pt-2 border-t border-slate-100">
                        <h3 className="text-xs font-black uppercase tracking-wider text-brand-red">
                          Key Learning Objectives (7)
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                          {course.objectives.map((obj, oIdx) => (
                            <div
                              key={oIdx}
                              className="flex items-start gap-2.5 rounded-xl bg-slate-50 border border-slate-100 p-3 sm:p-3.5"
                            >
                              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                                {obj}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Assessment Highlights Box */}
                      <div className="rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 p-4 sm:p-6 space-y-2">
                        <div className="flex items-center gap-2 text-amber-800 font-extrabold text-sm sm:text-base">
                          <BookOpen className="h-4 w-4 text-amber-600 shrink-0" />
                          <span>Practical Assessment Model</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                          {course.assessment}
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium">
                          Each submission receives qualitative guidance from USC Upstate professors,
                          allowing learners to iteratively refine real workplace assets.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* ────────────────────────────────── */}
                  {/* TAB 2: CURRICULUM                  */}
                  {/* ────────────────────────────────── */}
                  {activeTab === "curriculum" && (
                    <div
                      role="tabpanel"
                      id="panel-curriculum"
                      aria-labelledby="tab-curriculum"
                      className="space-y-6 animate-fade-in"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black uppercase tracking-wider text-brand-red">
                          Syllabus &amp; Module Progression
                        </h3>
                        <span className="text-xs font-bold text-slate-500">
                          {course.curriculum.length} Modules Total
                        </span>
                      </div>

                      <div className="space-y-4">
                        {course.curriculum.map((mod) => (
                          <div
                            key={mod.moduleNumber}
                            className="rounded-xl sm:rounded-2xl bg-surface-elevated p-4 sm:p-6 border border-slate-200/80 space-y-4 hover:border-brand-red/30 transition-all"
                          >
                            {/* Module Header */}
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                              <h4 className="font-extrabold text-brand-ink text-sm sm:text-base flex items-center gap-2.5">
                                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-red/10 text-brand-red text-xs font-black shrink-0">
                                  {mod.moduleNumber}
                                </span>
                                <span>{mod.title}</span>
                              </h4>
                              <span className="rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[10px] sm:text-xs font-black text-slate-700">
                                {mod.coreApp}
                              </span>
                            </div>

                            {/* Topics List */}
                            <div className="space-y-2">
                              <div className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-400">
                                Topics &amp; Core Concepts:
                              </div>
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                                {mod.topics.map((topic, tIdx) => (
                                  <li key={tIdx} className="flex items-start gap-2">
                                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                    <span>{topic}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Practical Assignment Block */}
                            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-slate-200/60 text-xs">
                              <div className="p-2.5 rounded-lg bg-white border border-slate-100">
                                <span className="font-bold text-brand-red uppercase text-[10px] tracking-wider block mb-0.5">
                                  Assignment
                                </span>
                                <span className="font-extrabold text-brand-ink">
                                  {mod.assignment}
                                </span>
                              </div>
                              <div className="p-2.5 rounded-lg bg-white border border-slate-100">
                                <span className="font-bold text-emerald-700 uppercase text-[10px] tracking-wider block mb-0.5">
                                  Learning Outcome
                                </span>
                                <span className="text-slate-600 font-medium">{mod.outcome}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ────────────────────────────────── */}
                  {/* TAB 3: TOOLS                       */}
                  {/* ────────────────────────────────── */}
                  {activeTab === "tools" && (
                    <div
                      role="tabpanel"
                      id="panel-tools"
                      aria-labelledby="tab-tools"
                      className="space-y-6 animate-fade-in"
                    >
                      <h3 className="text-xs font-black uppercase tracking-wider text-brand-red">
                        Applications &amp; Technologies Covered
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {course.tools.map((tool) => {
                          const IconComp = TOOL_ICONS[tool] || Monitor;
                          return (
                            <div
                              key={tool}
                              className="rounded-xl border border-slate-200/80 bg-white p-4 space-y-2 hover:border-brand-red/30 transition-all shadow-2xs"
                            >
                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
                                <IconComp className="h-5 w-5" />
                              </div>
                              <h4 className="font-black text-brand-ink text-sm sm:text-base">
                                {tool}
                              </h4>
                              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                {tool === "Microsoft Excel" &&
                                  "Primary data tool for spreadsheet fundamentals, logical formulas, SUM summaries, and analytical tables."}
                                {tool === "Power BI" &&
                                  "Business intelligence application for data modeling, visualization, charts, and interactive dashboards."}
                                {tool === "Microsoft Copilot" &&
                                  "AI productivity assistant for automated data analysis, pattern interpretation, and strategic storytelling."}
                                {tool === "PowerPoint" &&
                                  "Presentation tool for designing executive narratives, visual hierarchies, and board-ready decks."}
                                {tool === "Zoom" &&
                                  "Interactive live closing session for cohort Q&A, faculty discussion, and graduation remarks."}
                                {tool === "Blackboard Ultra" &&
                                  "USC Upstate's secure digital learning management system hosting modules, syllabus, and assignment reviews."}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* ────────────────────────────────── */}
                  {/* TAB 4: WHO IT'S FOR                */}
                  {/* ────────────────────────────────── */}
                  {activeTab === "audience" && (
                    <div
                      role="tabpanel"
                      id="panel-audience"
                      aria-labelledby="tab-audience"
                      className="space-y-8 animate-fade-in"
                    >
                      {/* Target Audience List */}
                      <div className="space-y-4">
                        <h3 className="text-xs font-black uppercase tracking-wider text-brand-red">
                          Target Audience &amp; Cohort Profiles
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                          {course.targetAudience.map((aud, aIdx) => (
                            <div
                              key={aIdx}
                              className="flex items-center gap-2.5 rounded-xl bg-slate-50 border border-slate-100 p-3 sm:p-3.5"
                            >
                              <CheckCircle2 className="h-4 w-4 text-brand-red shrink-0" />
                              <span className="text-xs sm:text-sm font-bold text-slate-800">
                                {aud}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 6 Industry Applications */}
                      <div className="space-y-4 pt-4 border-t border-slate-100">
                        <div>
                          <h3 className="text-xs font-black uppercase tracking-wider text-brand-red">
                            Industry Applications (6 Sectors)
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5">
                            How analyzing and presenting data creates measurable impact across
                            disciplines:
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {course.industries.map((ind) => {
                            const IndIcon = INDUSTRY_ICONS[ind.name] || Building2;
                            return (
                              <div
                                key={ind.name}
                                className="rounded-xl border border-slate-200/80 bg-white p-4 space-y-2.5 shadow-2xs"
                              >
                                <div className="flex items-center gap-2 text-brand-ink font-black text-sm">
                                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-red/10 text-brand-red shrink-0">
                                    <IndIcon className="h-4 w-4" />
                                  </div>
                                  <span>{ind.name}</span>
                                </div>
                                <ul className="space-y-1.5 text-xs text-slate-600 pl-2 border-l-2 border-slate-100">
                                  {ind.applications.map((app, appIdx) => (
                                    <li key={appIdx} className="leading-snug">
                                      • {app}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ────────────────────────────────── */}
                  {/* TAB 5: FACULTY                     */}
                  {/* ────────────────────────────────── */}
                  {activeTab === "faculty" && (
                    <div
                      role="tabpanel"
                      id="panel-faculty"
                      aria-labelledby="tab-faculty"
                      className="space-y-6 animate-fade-in"
                    >
                      <h3 className="text-xs font-black uppercase tracking-wider text-brand-red">
                        USC Upstate Academic Faculty
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {course.faculty.map((fac, fIdx) => (
                          <div
                            key={fIdx}
                            className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 space-y-4 shadow-sm"
                          >
                            <div className="flex items-center gap-4">
                              <img
                                src={fac.image}
                                alt={fac.name}
                                loading="lazy"
                                decoding="async"
                                onError={(e) => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src = "/images/common/dummy-avatar.jpg";
                                }}
                                className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover border-2 border-slate-100 shadow-sm shrink-0"
                              />
                              <div>
                                <h4 className="font-black text-brand-ink text-base sm:text-lg leading-snug">
                                  {fac.name}
                                </h4>
                                <p className="text-xs font-bold text-brand-red mt-0.5">
                                  {fac.institution}
                                </p>
                                <p className="text-[11px] text-slate-500 font-medium leading-tight mt-1 line-clamp-2">
                                  {fac.role}
                                </p>
                              </div>
                            </div>
                            <div className="text-xs text-slate-600 bg-slate-50 rounded-xl p-3 border border-slate-100 leading-relaxed font-medium">
                              <span className="font-bold text-slate-800 block text-[10px] uppercase tracking-wider mb-1">
                                Academic Focus &amp; Expertise:
                              </span>
                              {fac.focus}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ────────────────────────────────── */}
                  {/* TAB 6: REQUIREMENTS                */}
                  {/* ────────────────────────────────── */}
                  {activeTab === "requirements" && (
                    <div
                      role="tabpanel"
                      id="panel-requirements"
                      aria-labelledby="tab-requirements"
                      className="space-y-6 animate-fade-in"
                    >
                      <h3 className="text-xs font-black uppercase tracking-wider text-brand-red">
                        Technical &amp; Course Requirements
                      </h3>
                      <div className="space-y-3">
                        {course.requirements.items.map((item, rIdx) => (
                          <div
                            key={rIdx}
                            className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100"
                          >
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="text-xs sm:text-sm font-semibold text-slate-700">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Credential security alert */}
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-800">
                        <ShieldAlert className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-black">Account Security Policy:</strong>{" "}
                          <span>{course.requirements.note}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ────────────────────────────────── */}
                  {/* TAB 7: FAQ                         */}
                  {/* ────────────────────────────────── */}
                  {activeTab === "faq" && (
                    <div
                      role="tabpanel"
                      id="panel-faq"
                      aria-labelledby="tab-faq"
                      className="space-y-4 animate-fade-in"
                    >
                      <h3 className="text-xs font-black uppercase tracking-wider text-brand-red mb-2">
                        Frequently Asked Questions
                      </h3>
                      <div className="space-y-3">
                        {course.faq.map((item, idx) => (
                          <div
                            key={idx}
                            className="rounded-xl border border-slate-200/80 bg-white overflow-hidden transition-colors"
                          >
                            <button
                              type="button"
                              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                              className="w-full flex items-center justify-between p-4 text-left font-extrabold text-xs sm:text-sm text-brand-ink hover:text-brand-red cursor-pointer"
                            >
                              <span>{item.question}</span>
                              <ChevronDown
                                className={`h-4 w-4 text-slate-400 transition-transform ${
                                  openFaq === idx ? "rotate-180 text-brand-red" : ""
                                }`}
                              />
                            </button>
                            {openFaq === idx && (
                              <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal border-t border-slate-100 bg-slate-50/50">
                                {item.answer}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* ───────────────────────────────────────────────────────────── */}
          {/* Sticky Sidebar Column (1 of 3)                                */}
          {/* ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-1">
            <ScrollReveal direction="right">
              <div className="premium-card-static p-5 sm:p-6 space-y-6 sticky top-28 overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-red via-brand-red-light to-amber-400" />

                {/* Course Thumbnail */}
                <div className="aspect-video overflow-hidden rounded-xl bg-slate-900 border border-slate-100 relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = fallbackThumb;
                    }}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="rounded-full bg-slate-900/90 backdrop-blur-md px-2.5 py-0.5 text-[9px] font-black text-white uppercase tracking-wider">
                      PECP Advanced
                    </span>
                  </div>
                </div>

                {/* Pricing Box (Strict en-NP formatting, Struck-through original, VAT note, NO computed total) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Tuition Fee
                    </span>
                    <span className="text-xs text-slate-400 line-through font-bold">
                      {formatNprPrice(course.price.original)}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl sm:text-3xl font-black text-brand-ink">
                      {formatNprPrice(course.price.offer)}
                    </span>
                    <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-[10px] font-black">
                      Save NPR 5,000
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-slate-500 pt-0.5">
                    {`+ ${course.price.vatPercent}% VAT (borne by client)`}
                  </p>
                </div>

                {/* Primary CTA: Enroll Now */}
                <Link
                  to="/contact"
                  search={{ course: course.slug }}
                  className="btn-primary w-full text-center justify-center py-3.5 text-sm font-black shadow-lg"
                >
                  Enroll Now
                </Link>

                {/* Optional Brochure Button */}
                {course.brochureUrl && (
                  <a
                    href={course.brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full text-center justify-center py-2.5 text-xs font-bold"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download Brochure</span>
                  </a>
                )}

                {/* Key Program Specifications List */}
                <div className="space-y-0 text-xs pt-3 border-t border-slate-100">
                  {[
                    { label: "Duration", value: course.duration },
                    { label: "Delivery", value: "Online (Blackboard Ultra)" },
                    { label: "Closing", value: "Live Zoom Session" },
                    { label: "Intake", value: "Monthly Cohort Starts" },
                    { label: "Certificate", value: "Professional Certificate" },
                    { label: "Institution", value: "USC Upstate × Red Dot" },
                    { label: "Language", value: "English" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0"
                    >
                      <span className="text-slate-500 font-medium">{item.label}</span>
                      <span className="font-extrabold text-slate-800 text-right truncate max-w-[170px]">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Help / Contact Box */}
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-3.5 space-y-1 text-xs">
                  <div className="font-black text-brand-ink">Have Questions?</div>
                  <p className="text-slate-500 text-[11px]">
                    Call admissions at{" "}
                    <a
                      href={`tel:${course.contact.phone.replace(/\s+/g, "")}`}
                      className="font-bold text-brand-red hover:underline"
                    >
                      {course.contact.phone}
                    </a>{" "}
                    or email{" "}
                    <a
                      href={`mailto:${course.contact.email}`}
                      className="font-bold text-brand-red hover:underline"
                    >
                      {course.contact.email}
                    </a>
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
