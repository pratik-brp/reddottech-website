import { createFileRoute, Link } from "@tanstack/react-router";
import { coursesData } from "@/data/courses";
import {
  Clock,
  Award,
  BookOpen,
  CheckCircle,
  ArrowLeft,
  Globe,
  Layers,
  Signal,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ScrollReveal } from "@/components/ScrollReveal";

export const Route = createFileRoute("/courses/$id")({
  head: ({ params }) => {
    const course = coursesData.find((c) => String(c.id) === params.id);
    return {
      meta: [
        { title: `${course ? course.name : "Course Detail"} | RedDot Technologies` },
        { name: "description", content: course?.description || "Course details" },
      ],
    };
  },
  component: CourseDetailPage,
});

function CourseDetailPage() {
  const { id } = Route.useParams();
  const course = coursesData.find((c) => String(c.id) === id) || coursesData[0];
  const [activeTab, setActiveTab] = useState<
    "overview" | "curriculum" | "instructor" | "requirements"
  >("overview");

  const [claimName, setClaimName] = useState("");
  const [claimEmail, setClaimEmail] = useState("");
  const [claimCertId, setClaimCertId] = useState("");

  const handleClaimCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimName || !claimEmail || !claimCertId) {
      toast.error("Please fill in all certificate claim fields.");
      return;
    }
    toast.success(
      "Certificate claim request submitted! We will verify and email your certificate within 24 hours.",
    );
    setClaimName("");
    setClaimEmail("");
    setClaimCertId("");
  };

  const tabs = [
    { key: "overview" as const, label: "Overview" },
    { key: "curriculum" as const, label: "Curriculum" },
    { key: "instructor" as const, label: "Instructor" },
    { key: "requirements" as const, label: "Requirements" },
  ];

  return (
    <div className="pt-28 pb-16 bg-surface-elevated min-h-screen">
      {/* Back button */}
      <div className="mx-auto max-w-7xl px-6 pt-4 pb-2">
        <Link
          to={"/coursess" as any}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-brand-red transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to All Courses
        </Link>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero image with overlay */}
            <ScrollReveal>
              <div className="relative rounded-2xl overflow-hidden shadow-[var(--shadow-card-premium)] border border-slate-100 aspect-video">
                <img
                  src={course.bannerImage || course.thumbnail}
                  alt={course.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {course.category && (
                      <span className="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white border border-white/20">
                        {course.category}
                      </span>
                    )}
                    {course.skillLevel && (
                      <span className="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white border border-white/20 capitalize flex items-center gap-1.5">
                        <Signal className="h-3 w-3" />
                        {course.skillLevel}
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                    {course.name}
                  </h1>
                </div>
              </div>
            </ScrollReveal>

            {/* Course meta bar */}
            <ScrollReveal delay={80}>
              <div className="premium-card-static p-5 flex flex-wrap items-center gap-5 text-xs sm:text-sm font-medium text-slate-600">
                {course.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-brand-red" />
                    <span>{course.duration}</span>
                  </div>
                )}
                {course.delivery && (
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-brand-red" />
                    <span className="capitalize">{course.delivery} Delivery</span>
                  </div>
                )}
                {course.language && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-brand-red" />
                    <span>{course.language}</span>
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* Tabs */}
            <ScrollReveal delay={120}>
              <div className="premium-card-static overflow-hidden">
                <div className="flex border-b border-slate-100 bg-slate-50/50 overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`relative px-6 py-4 text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                        activeTab === tab.key
                          ? "text-brand-red"
                          : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                      }`}
                    >
                      {tab.label}
                      {activeTab === tab.key && (
                        <span className="absolute bottom-0 inset-x-0 h-[2.5px] bg-brand-red rounded-t-full" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="p-6 sm:p-8">
                  {activeTab === "overview" && (
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-brand-red">
                        Course Description
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                        {course.longDescription || course.description}
                      </p>
                    </div>
                  )}

                  {activeTab === "curriculum" && (
                    <div className="space-y-6">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-brand-red">
                        Curriculum & Syllabus
                      </h3>
                      {course.modules ? (
                        <div className="space-y-4">
                          {course.modules.map((mod, idx) => (
                            <div
                              key={idx}
                              className="rounded-xl bg-surface-elevated p-5 border border-slate-100 space-y-3"
                            >
                              <h4 className="font-bold text-brand-ink text-sm sm:text-base flex items-center gap-2">
                                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-red/10 text-brand-red text-[10px] font-extrabold">
                                  {idx + 1}
                                </span>
                                {mod.title}
                              </h4>
                              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 pl-8">
                                {mod.lessons.map((lesson, lIdx) => (
                                  <li key={lIdx} className="flex items-center gap-2">
                                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                                    <span>{lesson}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-slate-600 text-sm whitespace-pre-line">
                          {course.curriculum}
                        </p>
                      )}
                    </div>
                  )}

                  {activeTab === "instructor" && (
                    <div className="space-y-5">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-brand-red">
                        Instructor Details
                      </h3>
                      <div className="flex items-center gap-4">
                        <img
                          src={course.instructorImage || "/images/common/dummy-avatar.jpg"}
                          alt={course.instructorName}
                          className="h-16 w-16 rounded-2xl object-cover border-2 border-white shadow-md"
                        />
                        <div>
                          <h4 className="font-bold text-brand-ink text-lg">
                            {course.instructorName}
                          </h4>
                          <p className="text-xs text-slate-500">{course.instructorTitle}</p>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {course.instructorDetail ||
                          `${course.instructorName} leads this course cohort.`}
                      </p>
                    </div>
                  )}

                  {activeTab === "requirements" && (
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-brand-red">
                        Course Requirements
                      </h3>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        {course.requirements ||
                          "No prerequisites required. Open for learners and working professionals."}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ScrollReveal direction="right">
              <div className="premium-card-static p-6 space-y-6 sticky top-28 relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-red via-brand-red-light to-transparent" />

                <div className="aspect-video overflow-hidden rounded-xl bg-slate-50">
                  <img
                    src={course.thumbnail}
                    alt={course.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500">Course Fee</span>
                    <span className="text-2xl font-extrabold text-brand-ink">
                      {course.price
                        ? typeof course.price === "number"
                          ? `$${course.price.toFixed(2)}`
                          : course.price
                        : "Free"}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Additional 13% VAT applicable</p>
                </div>

                <Link to={"/contactt" as any} className="btn-primary w-full text-center justify-center">
                  Enroll Now
                </Link>

                <div className="space-y-0 text-xs pt-2 border-t border-slate-100">
                  {[
                    { label: "Start Date", value: course.startDate },
                    { label: "Duration", value: course.duration },
                    { label: "Delivery", value: course.delivery },
                    { label: "Mode", value: course.mode },
                    { label: "Language", value: course.language },
                  ]
                    .filter((item) => item.value)
                    .map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0"
                      >
                        <span className="text-slate-500">{item.label}</span>
                        <span className="font-semibold text-slate-800 capitalize">
                          {item.value}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Certificate Claim */}
        <ScrollReveal>
          <div className="mt-12 premium-card-static p-8 md:p-10 max-w-3xl space-y-6 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-ink via-brand-navy to-transparent" />
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-brand-ink flex items-center gap-2">
                <Award className="h-5 w-5 text-brand-red" />
                Claim / Verify Digital Certificate
              </h3>
              <p className="text-xs text-slate-500">
                Enter your full name and student cohort ID to request your official digital
                credential verification.
              </p>
            </div>

            <form onSubmit={handleClaimCertificate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={claimName}
                    onChange={(e) => setClaimName(e.target.value)}
                    placeholder="Full name on certificate"
                    required
                    className="premium-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={claimEmail}
                    onChange={(e) => setClaimEmail(e.target.value)}
                    placeholder="Registered student email"
                    required
                    className="premium-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Certificate ID / Cohort Code
                </label>
                <input
                  type="text"
                  value={claimCertId}
                  onChange={(e) => setClaimCertId(e.target.value)}
                  placeholder="e.g. PECP-2025-AI-018"
                  required
                  className="premium-input"
                />
              </div>

              <button
                type="submit"
                className="rounded-full bg-brand-ink px-8 py-3 text-xs font-bold text-white shadow-md hover:bg-black transition-all"
              >
                Submit Certificate Verification
              </button>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
