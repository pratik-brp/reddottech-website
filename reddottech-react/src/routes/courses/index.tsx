import { createFileRoute } from "@tanstack/react-router";
import { CourseCard } from "@/components/CourseCard";
import { CtaSection } from "@/components/sections/CtaSection";
import { ScrollReveal, RevealGroup } from "@/components/ScrollReveal";
import { useState, useMemo, useEffect, useRef } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  LayoutGrid,
  Sparkles,
  ShieldCheck,
  Users,
  Briefcase,
  Bot,
  TrendingUp,
  BookOpen,
  Award,
} from "lucide-react";
import { getCourses } from "@/lib/api";
import { BrandSpinner } from "@/components/ui/BrandSpinner";
import type { Course } from "@/types";

interface CoursesSearch {
  category?: string;
  q?: string;
}

export const Route = createFileRoute("/courses/")({
  validateSearch: (search: Record<string, unknown>): CoursesSearch => ({
    category: typeof search.category === "string" ? search.category : undefined,
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Course Catalog | Red Dot Technologies — Professional IT & Business Credentials" },
      {
        name: "description",
        content:
          "Explore globally recognized IT, AI, Analytics, and Management certification cohorts designed by Red Dot Technologies and international partners.",
      },
    ],
  }),
  component: CoursesPage,
});

const CATEGORY_CONFIG: Record<string, { icon: typeof ShieldCheck; label: string }> = {
  All: { icon: ShieldCheck, label: "All Disciplines" },
  "Artificial Intelligence": { icon: Bot, label: "Artificial Intelligence" },
  "Project Management": { icon: Briefcase, label: "Project Management" },
  "Executive & Leadership": { icon: Users, label: "Executive & Leadership" },
  "Analytics & Data": { icon: TrendingUp, label: "Analytics & Data" },
  "Quality Management": { icon: Award, label: "Quality Management" },
};

function CoursesPage() {
  const searchParams = Route.useSearch();
  const [coursesList, setCoursesList] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.category || "All");
  const [searchQuery, setSearchQuery] = useState(searchParams.q || "");
  const [isFiltering, setIsFiltering] = useState(false);
  const prevFilterRef = useRef({ cat: "All", q: "" });
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchParams.category) {
      setSelectedCategory(searchParams.category);
    }
    if (searchParams.q) {
      setSearchQuery(searchParams.q);
    }
  }, [searchParams.category, searchParams.q]);

  useEffect(() => {
    getCourses()
      .then((data) => {
        if (data) {
          setCoursesList(data);
        }
      })
      .catch(() => {
        setCoursesList([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Keyboard shortcut (Cmd/Ctrl + K) to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Dynamically extract unique categories with curated ordering
  const allCategories = useMemo(() => {
    const PREFERRED_ORDER = [
      "All",
      "Artificial Intelligence",
      "Project Management",
      "Executive & Leadership",
      "Analytics & Data",
      "Quality Management",
    ];
    const rawCats = Array.from(new Set(coursesList.map((c) => c.category).filter(Boolean))) as string[];
    const sorted = rawCats.sort((a, b) => {
      const idxA = PREFERRED_ORDER.indexOf(a);
      const idxB = PREFERRED_ORDER.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });
    return ["All", ...sorted];
  }, [coursesList]);

  const filteredCourses = useMemo(() => {
    return coursesList.filter((c) => {
      const matchesCat = selectedCategory === "All" || c.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        (c.name && c.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (c.description && c.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (c.category && c.category.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [coursesList, selectedCategory, searchQuery]);

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
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-slate-50 text-brand-ink selection:bg-brand-red selection:text-white">
      {/* ── Clean Centered Courses Hero Section ── */}
      <section className="relative overflow-hidden pt-24 pb-8 sm:pt-36 sm:pb-18 border-b border-slate-200/80 bg-gradient-to-b from-slate-50 via-white to-slate-50/70">
        {/* Soft Ambient Background Lighting & Grid */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute -top-32 left-1/2 -translate-x-1/2 h-[450px] w-[750px] rounded-full opacity-[0.14] blur-[150px]"
            style={{
              background: "radial-gradient(circle, var(--brand-red) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-1/2 right-[10%] h-[350px] w-[350px] rounded-full opacity-[0.10] blur-[130px]"
            style={{
              background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)",
            }}
          />
          <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-brand-red/20 bg-white px-3 sm:px-4 py-1 sm:py-1.5 shadow-xs">
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-brand-red animate-pulse" />
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.14em] text-brand-red">
              World-Class Course Catalog
            </span>
          </div>

          {/* Heading */}
          <h1 className="display-font mt-3 sm:mt-6 text-2xl sm:text-5xl lg:text-6xl font-black text-brand-ink leading-[1.1] tracking-tight max-w-4xl mx-auto">
            Master In-Demand Skills with{" "}
            <span className="gradient-text">Global Certifications</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-2 sm:mt-4 text-xs sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Choose from our industry-led certification cohorts co-developed with university
            professors and senior tech leaders.
          </p>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* ───────────────────────────────────────────────────────────── */}
      {/* ── REDESIGNED PREMIUM STICKY FILTER & COMMAND TOOLBAR ──       */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="catalog" className="sticky top-[4.25rem] z-30 bg-white/95 border-b border-slate-200/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] will-change-transform transform-gpu">
        <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 py-2.5 sm:py-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5 sm:gap-3.5">
            {/* Search Bar Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="h-4 w-4 text-brand-red absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                ref={searchInputRef}
                id="course-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses, topics, skills..."
                className="w-full rounded-full border border-slate-200/90 bg-slate-100/80 pl-9 pr-16 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-brand-ink placeholder:text-slate-400 focus:outline-none focus:border-brand-red focus:bg-white focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--brand-red)_12%,transparent)] transition-all duration-200"
              />

              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="h-5 w-5 flex items-center justify-center rounded-full bg-slate-200 text-slate-500 hover:bg-slate-300 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="h-3 w-3" />
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-black uppercase text-slate-400 bg-white/90 border border-slate-200/90 rounded shadow-2xs select-none">
                    ⌘K
                  </kbd>
                )}
              </div>
            </div>

            {/* Results Count & Clear Button */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100/90 border border-slate-200/80 px-3 py-1.5 text-xs font-bold text-slate-700">
                <LayoutGrid className="h-3.5 w-3.5 text-slate-400" />
                <span>
                  <strong className="text-brand-ink">{filteredCourses.length}</strong>{" "}
                  {filteredCourses.length === 1 ? "Program" : "Programs"}
                </span>
              </div>

              {isActiveFilter && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 border border-rose-200 px-3.5 py-1.5 text-xs font-black text-brand-red hover:bg-rose-100 transition-colors cursor-pointer"
                >
                  <X className="h-3 w-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills (Scrollable & Responsive) */}
          <div className="mt-2 pt-2 sm:mt-3 sm:pt-3 border-t border-slate-100/80 flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
            {allCategories.map((cat) => {
              const count =
                cat === "All"
                  ? coursesList.length
                  : coursesList.filter((c) => c.category === cat).length;
              const isActive = selectedCategory === cat;
              const config = CATEGORY_CONFIG[cat as string] || { icon: BookOpen, label: cat };
              const IconComponent = config.icon;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat as string)}
                  aria-pressed={isActive}
                  className={`group relative shrink-0 flex items-center gap-1.5 sm:gap-2 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-bold transition-all duration-300 select-none cursor-pointer ${
                    isActive
                      ? "bg-slate-950 text-white shadow-md shadow-slate-950/20 scale-[1.02] border border-slate-800"
                      : "bg-white text-slate-600 border border-slate-200/90 hover:border-slate-300 hover:text-brand-ink hover:bg-slate-50"
                  }`}
                >
                  <IconComponent
                    className={`h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-300 ${
                      isActive
                        ? "text-brand-red scale-110"
                        : "text-slate-400 group-hover:text-brand-ink group-hover:scale-110"
                    }`}
                  />
                  <span>{cat}</span>
                  <span
                    className={`inline-flex items-center justify-center min-w-[18px] sm:min-w-[20px] h-4 sm:h-5 px-1 sm:px-1.5 rounded-full text-[9px] sm:text-[10px] font-black transition-colors ${
                      isActive
                        ? "bg-brand-red text-white"
                        : "bg-slate-100 border border-slate-200/80 text-slate-600 group-hover:bg-slate-200"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}

            {/* Mobile Clear Action */}
            {isActiveFilter && (
              <button
                onClick={clearFilters}
                className="lg:hidden shrink-0 inline-flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200 px-2.5 py-1.5 text-[11px] font-bold text-brand-red hover:bg-rose-100 transition-colors"
              >
                <X className="h-3 w-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Courses Grid (2-Column Mobile Grid) ── */}
      <section id="courses-grid" className="section-padding bg-surface-elevated flex-1">
        <div className="mx-auto max-w-7xl px-3.5 sm:px-6">
          {/* Mobile results count */}
          <div className="sm:hidden mb-3 flex items-center justify-between">
            <p className="text-[11px] font-bold text-slate-500">
              <span className="text-brand-ink tabular-nums font-black">
                {filteredCourses.length}
              </span>{" "}
              {filteredCourses.length === 1 ? "program" : "programs"} available
            </p>
            {isActiveFilter && (
              <button
                onClick={clearFilters}
                className="text-[11px] font-bold text-brand-red hover:underline flex items-center gap-0.5"
              >
                <X className="h-3 w-3" /> Clear filters
              </button>
            )}
          </div>

          {loading ? (
            <div className="py-28 text-center flex items-center justify-center">
              <BrandSpinner size="md" message="Loading course catalog from database..." />
            </div>
          ) : filteredCourses.length > 0 ? (
            <div
              className={`transition-opacity duration-300 ${isFiltering ? "opacity-0" : "opacity-100"}`}
            >
              <RevealGroup className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-8">
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
