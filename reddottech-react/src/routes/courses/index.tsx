import { createFileRoute } from "@tanstack/react-router";
import { coursesData } from "@/data/courses";
import { CourseCard } from "@/components/CourseCard";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal, RevealGroup } from "@/components/ScrollReveal";
import { useState, useMemo, useEffect, useRef } from "react";
import { Search, SlidersHorizontal, X, LayoutGrid, Sparkles } from "lucide-react";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title: "Course Catalog | RedDot Technologies — Professional IT & Business Credentials" },
      {
        name: "description",
        content:
          "Explore globally recognized IT, AI, Analytics, and Management certification cohorts designed by RedDot Technologies and international partners.",
      },
    ],
  }),
  component: CoursesPage,
});

const CATEGORY_ICONS: Record<string, string> = {
  All: "✦",
  Technology: "💻",
  Business: "📊",
  AI: "🤖",
  Analytics: "📈",
  Management: "🎯",
  Design: "🎨",
  Cybersecurity: "🔐",
  "Data Science": "🧪",
  Cloud: "☁️",
};

function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const prevFilterRef = useRef({ cat: "All", q: "" });

  // Dynamically extract unique categories
  const allCategories = useMemo(() => {
    const cats = Array.from(new Set(coursesData.map((c) => c.category).filter(Boolean)));
    return ["All", ...cats];
  }, []);

  const filteredCourses = useMemo(() => {
    return coursesData.filter((c) => {
      const matchesCat = selectedCategory === "All" || c.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.category && c.category.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Trigger flash animation when filter changes
  useEffect(() => {
    const prev = prevFilterRef.current;
    if (prev.cat !== selectedCategory || prev.q !== searchQuery) {
      setIsFiltering(true);
      const t = setTimeout(() => setIsFiltering(false), 350);
      prevFilterRef.current = { cat: selectedCategory, q: searchQuery };
      return () => clearTimeout(t);
    }
  }, [selectedCategory, searchQuery]);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
  };

  const isActiveFilter = selectedCategory !== "All" || searchQuery;

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <PageHero
        badge="World-Class Course Catalog"
        title={
          <>
            Master In-Demand Skills with{" "}
            <span className="gradient-text">Global Certifications</span>
          </>
        }
        subtitle="Choose from our industry-led certification cohorts co-developed with university professors and senior tech leaders."
      />

      {/* ── Sticky Filter Bar ── */}
      <section className="sticky top-[4.25rem] z-30 bg-white/95 backdrop-blur-xl border-b border-slate-100/80 shadow-[0_2px_20px_oklch(0.15_0.015_255/0.06)]">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-col gap-4">

            {/* Top row: search + result count */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-sm">
                <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="course-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses, skills, topics…"
                  className="w-full rounded-full border border-slate-200 bg-surface-elevated pl-10 pr-10 py-2.5 text-xs font-semibold text-brand-ink placeholder:text-slate-400 focus:outline-none focus:border-brand-red focus:bg-white focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--brand-red)_12%,transparent)] transition-all duration-200"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center rounded-full bg-slate-200 text-slate-500 hover:bg-slate-300 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>

              {/* Results count */}
              <div className="hidden sm:flex items-center gap-2 ml-auto">
                <LayoutGrid className="h-3.5 w-3.5 text-slate-400" />
                <span className="text-xs font-bold text-slate-500">
                  <span className="text-brand-ink tabular-nums">{filteredCourses.length}</span>{" "}
                  {filteredCourses.length === 1 ? "program" : "programs"}
                </span>
                {isActiveFilter && (
                  <button
                    onClick={clearFilters}
                    className="ml-2 flex items-center gap-1 rounded-full bg-brand-red/8 border border-brand-red/20 px-3 py-1 text-[11px] font-bold text-brand-red hover:bg-brand-red/15 transition-colors"
                  >
                    <X className="h-3 w-3" />
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
              {allCategories.map((cat) => {
                const count =
                  cat === "All"
                    ? coursesData.length
                    : coursesData.filter((c) => c.category === cat).length;
                const isActive = selectedCategory === cat;
                const icon = CATEGORY_ICONS[cat as string] || "◆";

                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat as string)}
                    aria-pressed={isActive}
                    className={[
                      "group relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-250 select-none",
                      isActive
                        ? "bg-brand-ink text-white shadow-[0_4px_14px_oklch(0.15_0.015_255/0.25)] scale-[1.04]"
                        : "bg-surface-elevated text-slate-600 border border-slate-200/80 hover:border-slate-300 hover:bg-white hover:shadow-sm",
                    ].join(" ")}
                  >
                    <span className={`transition-transform duration-200 ${isActive ? "" : "group-hover:scale-110"}`}>
                      {icon}
                    </span>
                    <span>{cat}</span>
                    <span
                      className={[
                        "inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-black transition-colors",
                        isActive
                          ? "bg-brand-red text-white"
                          : "bg-slate-200/80 text-slate-500 group-hover:bg-slate-200",
                      ].join(" ")}
                    >
                      {count}
                    </span>

                    {/* Active underline glow */}
                    {isActive && (
                      <span className="absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-brand-red opacity-70" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Courses Grid ── */}
      <section className="section-padding bg-surface-elevated flex-1">
        <div className="mx-auto max-w-7xl px-6">

          {/* Mobile results count */}
          <div className="sm:hidden mb-6 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-500">
              <span className="text-brand-ink tabular-nums">{filteredCourses.length}</span>{" "}
              {filteredCourses.length === 1 ? "program" : "programs"} found
            </p>
            {isActiveFilter && (
              <button onClick={clearFilters} className="text-xs font-bold text-brand-red hover:underline flex items-center gap-1">
                <X className="h-3 w-3" /> Clear filters
              </button>
            )}
          </div>

          {filteredCourses.length > 0 ? (
            <div
              className={`transition-opacity duration-300 ${isFiltering ? "opacity-0" : "opacity-100"}`}
            >
              <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course, idx) => (
                  <ScrollReveal key={course.id} delay={idx * 60}>
                    <CourseCard course={course} />
                  </ScrollReveal>
                ))}
              </RevealGroup>
            </div>
          ) : (
            /* ── Empty State ── */
            <div
              className="flex flex-col items-center justify-center py-28 animate-fade-in-up"
              style={{ animationDuration: "0.5s" }}
            >
              {/* Ambient glow */}
              <div
                className="absolute h-64 w-64 rounded-full opacity-25 pointer-events-none blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in oklab, var(--brand-red) 30%, transparent) 0%, transparent 70%)",
                }}
              />

              <div className="relative glass-card-static rounded-3xl p-10 max-w-sm w-full text-center space-y-5 shadow-[var(--shadow-card-premium)]">
                {/* Icon */}
                <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200 flex items-center justify-center shadow-sm">
                  <SlidersHorizontal className="h-7 w-7 text-slate-400" />
                </div>

                <div className="space-y-2">
                  <h3 className="display-font text-lg font-extrabold text-brand-ink">
                    No courses found
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-[220px] mx-auto">
                    Try a different category or clear your search to explore all programs.
                  </p>
                </div>

                <button
                  onClick={clearFilters}
                  className="btn-primary text-xs py-2.5 px-6 inline-flex items-center gap-2"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Show All Courses
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
