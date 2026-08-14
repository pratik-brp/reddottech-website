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
import { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { fetchApi } from "@/lib/api";

export const Route = createFileRoute("/courses/$id")({
  head: ({ params }) => {
    const course = coursesData.find((c) => String(c.id) === params.id || c.slug === params.id);
    return {
      meta: [
        { title: `${course ? course.name : "Course Detail"} | Red Dot Technologies` },
        { name: "description", content: course?.description || "Course details" },
      ],
    };
  },
  component: CourseDetailPage,
});

function CourseDetailPage() {
  const { id } = Route.useParams();
  const fallback = coursesData.find((c) => String(c.id) === id || c.slug === id) || coursesData[0];
  const [course, setCourse] = useState<any>(fallback);
  const [activeTab, setActiveTab] = useState<
    "overview" | "curriculum" | "instructor" | "requirements"
  >("overview");

  useEffect(() => {
    fetchApi<any>(`/courses/${id}`).then((data) => {
      if (data) {
        setCourse(data);
      }
    });
  }, [id]);

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
          to="/courses"
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
            {/* Course Title and Category Badges Header */}
            <ScrollReveal>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  {course.category && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-red/10 border border-brand-red/20 px-3.5 py-1 text-xs font-black text-brand-red">
                      <Award className="h-3.5 w-3.5" />
                      {course.category}
                    </span>
                  )}
                  {course.skillLevel && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-bold text-slate-700 capitalize">
                      <Signal className="h-3.5 w-3.5 text-emerald-600" />
                      {course.skillLevel}
                    </span>
                  )}
                  {course.certification && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-700">
                      USC Upstate Certified
                    </span>
                  )}
                </div>

                <h1 className="display-font text-2xl sm:text-4xl lg:text-[2.6rem] font-black text-brand-ink leading-[1.15] tracking-tight">
                  {course.name}
                </h1>
              </div>
            </ScrollReveal>

            {/* Course Banner Showcase */}
            <ScrollReveal delay={40}>
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/90 aspect-video bg-slate-900">
                <img
                  src={course.bannerImage || course.thumbnail}
                  alt={course.name}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
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
                      {(() => {
                        const content = course.longDescription || course.description;
                        if (!content) return null;
                        const isHtml = /<[a-z][\s\S]*>/i.test(content);
                        if (isHtml) {
                          return (
                            <div
                              className="prose prose-sm max-w-none text-slate-600 leading-relaxed space-y-3 [&_p]:mb-3 [&_strong]:text-brand-ink [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1"
                              dangerouslySetInnerHTML={{ __html: content }}
                            />
                          );
                        }
                        return (
                          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                            {content}
                          </p>
                        );
                      })()}
                    </div>
                  )}

                  {activeTab === "curriculum" && (
                    <div className="space-y-6">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-brand-red">
                        Curriculum &amp; Syllabus
                      </h3>
                      {course.modules ? (
                        <div className="space-y-4">
                          {course.modules.map((mod: any, idx: number) => (
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
                                {mod.lessons.map((lesson: string, lIdx: number) => (
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
                        (() => {
                          const curriculum = course.curriculum;
                          if (!curriculum)
                            return (
                              <p className="text-slate-500 text-sm">
                                Curriculum details available upon enrollment.
                              </p>
                            );
                          const isHtml = /<[a-z][\s\S]*>/i.test(curriculum);
                          if (isHtml) {
                            return (
                              <div
                                className="prose prose-sm max-w-none text-slate-600 leading-relaxed space-y-3 [&_p]:mb-3 [&_strong]:text-brand-ink [&_strong]:block [&_strong]:text-sm [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1"
                                dangerouslySetInnerHTML={{ __html: curriculum }}
                              />
                            );
                          }
                          return (
                            <p className="text-slate-600 text-sm whitespace-pre-line leading-relaxed">
                              {curriculum}
                            </p>
                          );
                        })()
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
                          loading="lazy"
                          decoding="async"
                          className="h-16 w-16 rounded-2xl object-cover border-2 border-white shadow-md"
                        />
                        <div>
                          <h4 className="font-bold text-brand-ink text-lg">
                            {course.instructorName}
                          </h4>
                          <p className="text-xs text-slate-500">{course.instructorTitle}</p>
                        </div>
                      </div>
                      {(() => {
                        const detail = course.instructorDetail;
                        if (!detail) {
                          return (
                            <p className="text-slate-600 text-sm leading-relaxed">
                              {`${course.instructorName} leads this course cohort.`}
                            </p>
                          );
                        }
                        const isHtml = /<[a-z][\s\S]*>/i.test(detail);
                        if (isHtml) {
                          return (
                            <div
                              className="prose prose-sm max-w-none text-slate-600 leading-relaxed space-y-3 [&_p]:mb-3 [&_strong]:text-brand-ink"
                              dangerouslySetInnerHTML={{ __html: detail }}
                            />
                          );
                        }
                        return <p className="text-slate-600 text-sm leading-relaxed">{detail}</p>;
                      })()}
                    </div>
                  )}

                  {activeTab === "requirements" && (
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-brand-red">
                        Course Requirements
                      </h3>
                      {(() => {
                        const reqs = course.requirements;
                        if (!reqs) {
                          return (
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                              No prerequisites required. Open for learners and working
                              professionals.
                            </p>
                          );
                        }
                        const isHtml = /<[a-z][\s\S]*>/i.test(reqs);
                        if (isHtml) {
                          return (
                            <div
                              className="prose prose-sm max-w-none text-slate-600 leading-relaxed space-y-3 [&_p]:mb-3 [&_strong]:text-brand-ink [&_ul]:list-none [&_li]:mb-1.5 [&_a]:text-brand-ink [&_a]:font-bold [&_a]:no-underline"
                              dangerouslySetInnerHTML={{ __html: reqs }}
                            />
                          );
                        }
                        return (
                          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                            {reqs}
                          </p>
                        );
                      })()}
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
                    loading="lazy"
                    decoding="async"
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

                <Link to="/contact" className="btn-primary w-full text-center justify-center">
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
      </div>
    </div>
  );
}
