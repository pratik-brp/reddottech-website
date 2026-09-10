import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, BookOpen, CheckCircle, ArrowLeft, Globe, Layers } from "lucide-react";
import { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { fetchApi } from "@/lib/api";
import { BrandSpinner } from "@/components/ui/BrandSpinner";
import { sanitizeHtml, stripHtml } from "@/lib/sanitize";

export const Route = createFileRoute("/courses/$id")({
  loader: async ({ params }) => {
    try {
      const course = await fetchApi<any>(`/courses/${params.id}`);
      return { course: course || null };
    } catch {
      return { course: null };
    }
  },
  head: ({ loaderData }) => {
    const course = loaderData?.course;
    const title = course?.name
      ? `${course.name} | Red Dot Technologies`
      : "Course Details | Red Dot Technologies";
    const desc =
      stripHtml(course?.description || course?.longDescription) ||
      "Professional IT & Business Certification Cohort delivered by Red Dot Technologies.";
    const banner = course?.bannerImage || course?.thumbnail || "/og-image.png";

    return {
      meta: [
        { title },
        { name: "description", content: desc.slice(0, 160) },
        { property: "og:title", content: title },
        { property: "og:description", content: desc.slice(0, 200) },
        {
          property: "og:image",
          content: banner.startsWith("http") ? banner : `https://reddottech.com.np${banner}`,
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc.slice(0, 200) },
        {
          name: "twitter:image",
          content: banner.startsWith("http") ? banner : `https://reddottech.com.np${banner}`,
        },
      ],
    };
  },
  component: CourseDetailPage,
});

function CourseDetailPage() {
  const { id } = Route.useParams();
  const loaderData = Route.useLoaderData();
  const [course, setCourse] = useState<any | null>(loaderData?.course || null);
  const [loading, setLoading] = useState(!loaderData?.course);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!course) {
      fetchApi<any>(`/courses/${id}`)
        .then((data) => {
          if (data) {
            setCourse(data);
          }
        })
        .catch(() => {
          setCourse(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center pt-28">
        <BrandSpinner size="md" message="Loading course curriculum & details..." />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Course Not Found</h1>
        <p className="text-sm text-slate-500 mb-6">
          The requested course could not be found or may have been removed.
        </p>
        <Link to="/courses" className="btn-primary">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Courses
        </Link>
      </div>
    );
  }

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "curriculum", label: "Curriculum" },
    { key: "instructor", label: "Instructor" },
    { key: "requirements", label: "Requirements" },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] pt-24 sm:pt-28 lg:pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <ScrollReveal>
          <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-600">
            <Link to="/" className="hover:text-brand-red transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/courses" className="hover:text-brand-red transition-colors">
              Courses
            </Link>
            <span>/</span>
            <span className="text-slate-700 truncate max-w-[200px]">{course.name}</span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Header & Badges */}
            <ScrollReveal>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-red/10 border border-brand-red/20 px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-extrabold text-brand-red">
                    <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    {course.category || "Professional Course"}
                  </span>
                  {course.certification && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold text-emerald-700">
                      USC Upstate Certified
                    </span>
                  )}
                </div>

                <h1 className="display-font text-xl sm:text-4xl lg:text-[2.6rem] font-black text-brand-ink leading-[1.15] tracking-tight">
                  {course.name}
                </h1>
              </div>
            </ScrollReveal>

            {/* Course Banner Showcase */}
            <ScrollReveal delay={40}>
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-sm sm:shadow-lg border border-slate-200/90 aspect-video bg-slate-900">
                <img
                  src={
                    course.bannerImage ||
                    course.thumbnail ||
                    "/storage/courses/banners/LYjIFUq6UfrNkit4gpGjtDnzeOrtTRCZYnTI0njh.jpg"
                  }
                  alt={course.name}
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "/storage/courses/banners/LYjIFUq6UfrNkit4gpGjtDnzeOrtTRCZYnTI0njh.jpg";
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>

            {/* Course meta bar */}
            <ScrollReveal delay={80}>
              <div className="premium-card-static p-3 sm:p-5 flex flex-wrap items-center gap-3 sm:gap-5 text-xs sm:text-sm font-medium text-slate-600">
                {course.duration && (
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand-red" />
                    <span>{course.duration}</span>
                  </div>
                )}
                {course.delivery && (
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Layers className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand-red" />
                    <span className="capitalize">{course.delivery} Delivery</span>
                  </div>
                )}
                {course.language && (
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand-red" />
                    <span>{course.language}</span>
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* Tabs */}
            <ScrollReveal delay={120}>
              <div className="premium-card-static overflow-hidden rounded-xl sm:rounded-2xl">
                <div className="flex border-b border-slate-100 bg-slate-50/50 overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`relative px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
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

                <div className="p-4 sm:p-8">
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
                              dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
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
                                dangerouslySetInnerHTML={{ __html: sanitizeHtml(curriculum) }}
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
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/images/common/dummy-avatar.jpg";
                          }}
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
                              dangerouslySetInnerHTML={{ __html: sanitizeHtml(detail) }}
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
                              dangerouslySetInnerHTML={{ __html: sanitizeHtml(reqs) }}
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
