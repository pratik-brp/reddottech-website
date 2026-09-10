import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import {
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  X,
  Search,
  LayoutGrid,
  List,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { getCourses, deleteCourse, updateCourse, reorderCourses } from "@/lib/api";
import { requireAdminRoute } from "@/lib/auth";
import { BrandSpinner } from "@/components/ui/BrandSpinner";

const POPULAR_CATEGORIES = [
  "Artificial Intelligence",
  "Programming & Software",
  "Web Development",
  "Digital Marketing",
  "Project Management",
  "Executive & Leadership",
  "Analytics & Data",
  "Quality Management",
];

export const Route = createFileRoute("/admin/courses/")({
  beforeLoad: requireAdminRoute,
  head: () => ({
    meta: [{ title: "Course Studio | Red Dot Admin" }],
  }),
  component: AdminCoursesIndexPage,
});

function AdminCoursesIndexPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReordering, setIsReordering] = useState(false);

  // Filters and View Mode
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const loadCourses = async () => {
    setIsLoading(true);
    try {
      const data = await getCourses();
      if (Array.isArray(data)) {
        setCourses(data);
      }
    } catch {
      setCourses([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  // Filtered Courses
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        !searchQuery ||
        (course.name && course.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (course.instructor_name &&
          course.instructor_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (course.instructorName &&
          course.instructorName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (course.category && course.category.toLowerCase().includes(searchQuery.toLowerCase()));

      const courseCategory = course.category || "Professional Certification";
      const matchesCategory =
        selectedCategory === "all" ||
        courseCategory.toLowerCase() === selectedCategory.toLowerCase();

      const courseStatus = course.status || "published";
      const matchesStatus =
        selectedStatus === "all" || courseStatus.toLowerCase() === selectedStatus.toLowerCase();

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [courses, searchQuery, selectedCategory, selectedStatus]);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    courses.forEach((c) => {
      if (c.category) set.add(c.category);
    });
    return Array.from(set);
  }, [courses]);

  // Reordering handlers (Up / Down)
  const handleMoveCourse = async (courseId: string | number, direction: "up" | "down") => {
    if (searchQuery || selectedCategory !== "all" || selectedStatus !== "all") {
      toast.info("Clearing active filters to reorder courses accurately across the entire catalog.");
      setSearchQuery("");
      setSelectedCategory("all");
      setSelectedStatus("all");
    }

    const currentIndex = courses.findIndex((c) => String(c.id) === String(courseId));
    if (currentIndex === -1) return;
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= courses.length) return;

    const newCourses = [...courses];
    const [moved] = newCourses.splice(currentIndex, 1);
    newCourses.splice(targetIndex, 0, moved);

    const updatedWithOrder = newCourses.map((c, idx) => ({
      ...c,
      sortOrder: idx + 1,
    }));

    setCourses(updatedWithOrder);
    setIsReordering(true);

    try {
      const orders = updatedWithOrder.map((c) => ({
        id: c.id,
        sortOrder: c.sortOrder,
      }));
      await reorderCourses(orders);
      toast.success(`Moved "${moved.name}" to position #${targetIndex + 1}!`);
    } catch {
      toast.error("Failed to save reordered courses.");
      loadCourses();
    } finally {
      setIsReordering(false);
    }
  };

  const handleDelete = async (id: number | string) => {
    if (confirm("Are you sure you want to delete this course from the database?")) {
      try {
        await deleteCourse(id);
        setCourses((prev) => prev.filter((c) => String(c.id) !== String(id)));
        toast.success("Course deleted successfully from database.");
      } catch {
        toast.error("Failed to delete course from database.");
      }
    }
  };

  const handleToggleStatus = async (course: any) => {
    const currentStatus = course.status || "published";
    const nextStatus = currentStatus === "published" ? "draft" : "published";
    try {
      await updateCourse(course.id, {
        ...course,
        status: nextStatus,
      });
      setCourses((prev) =>
        prev.map((c) => (String(c.id) === String(course.id) ? { ...c, status: nextStatus } : c)),
      );
      toast.success(`Course status set to "${nextStatus.toUpperCase()}"!`);
    } catch {
      toast.error("Failed to update course status.");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;

    setIsSubmitting(true);
    try {
      await updateCourse(editingCourse.id, {
        name: editingCourse.name,
        category: editingCourse.category,
        instructorName: editingCourse.instructorName || editingCourse.instructor_name,
        instructorTitle: editingCourse.instructorTitle || editingCourse.instructor_title,
        instructorDetail: editingCourse.instructorDetail || editingCourse.instructor_detail,
        price: Number(editingCourse.price) || 0,
        startDate: editingCourse.startDate || editingCourse.start_date,
        duration: editingCourse.duration,
        delivery: editingCourse.delivery,
        mode: editingCourse.mode,
        language: editingCourse.language,
        skillLevel: editingCourse.skillLevel || editingCourse.skill_level,
        certification: editingCourse.certification,
        status: editingCourse.status,
        sortOrder: Number(editingCourse.sortOrder) || 0,
        thumbnail: editingCourse.thumbnail !== undefined ? editingCourse.thumbnail : "",
        bannerImage:
          editingCourse.bannerImage !== undefined
            ? editingCourse.bannerImage
            : editingCourse.banner_image || "",
        instructorImage:
          editingCourse.instructorImage !== undefined
            ? editingCourse.instructorImage
            : editingCourse.instructor_image || "",
        description: editingCourse.description,
        requirements: editingCourse.requirements,
        curriculum: editingCourse.curriculum,
      });

      toast.success(`Course "${editingCourse.name}" updated successfully in database!`);
      setEditingCourse(null);
      loadCourses();
    } catch {
      toast.error("Failed to save changes.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout
      title="Courses"
      mobileTitle="Courses"
      subtitle="Manage course offerings, arrange display sequence, customize categories, and edit curriculum."
      actions={
        <Link
          to="/admin/courses/create"
          className="inline-flex items-center gap-1 sm:gap-1.5 rounded-xl bg-brand-red hover:bg-red-700 text-white font-bold text-[11px] sm:text-xs px-2.5 sm:px-4 py-1.5 sm:py-2 shadow-2xs transition-colors cursor-pointer shrink-0"
        >
          <Plus className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Add Course</span>
          <span className="inline sm:hidden">Add</span>
        </Link>
      }
    >
      <div className="space-y-6">
        {/* Search, Filter & View Mode Toolbar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by course name, instructor, or category..."
                className="w-full rounded-2xl border border-slate-200 pl-10 pr-4 py-2 text-xs font-semibold text-slate-800 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-auto appearance-none rounded-2xl border border-slate-200 pl-3.5 pr-8 py-2 text-xs font-semibold text-slate-700 bg-slate-50/70 hover:border-slate-300 focus:bg-white focus:border-brand-red focus:outline-none cursor-pointer"
              >
                <option value="all">All Categories ({courses.length})</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Dropdown */}
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full sm:w-auto appearance-none rounded-2xl border border-slate-200 pl-3.5 pr-8 py-2 text-xs font-semibold text-slate-700 bg-slate-50/70 hover:border-slate-300 focus:bg-white focus:border-brand-red focus:outline-none cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="published">Published Only</option>
                <option value="draft">Drafts Only</option>
              </select>
            </div>
          </div>

          {/* View Mode Toggle Switcher & Reorder status */}
          <div className="flex items-center justify-between sm:justify-end gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
            <span className="text-xs text-slate-500 font-semibold">
              {isReordering ? (
                <span className="text-brand-red animate-pulse">Saving sequence...</span>
              ) : (
                <>
                  Showing <strong className="text-slate-800">{filteredCourses.length}</strong>{" "}
                  courses
                </>
              )}
            </span>

            <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200/80">
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === "table"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                title="Table View (with Sequence Order Controls)"
              >
                <List className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                title="Cards Grid View"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 1. List / Row View (Table with Reorder Buttons) */}
        {viewMode === "table" && (
          <div className="space-y-2.5 sm:space-y-3">
            {isLoading ? (
              <div className="py-16 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 text-center flex items-center justify-center">
                <BrandSpinner size="sm" message="Loading course catalog..." />
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="py-14 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 text-center text-slate-400 text-xs font-medium">
                No courses found matching your criteria.
              </div>
            ) : (
              filteredCourses.map((course, index) => {
                const isPublished = (course.status || "published") === "published";
                const isFirst = index === 0;
                const isLast = index === courses.length - 1;

                return (
                  <div
                    key={course.id}
                    className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
                  >
                    {/* Left: Reorder Up/Down & Sequence Badge & Info */}
                    <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1 w-full sm:w-auto">
                      {/* Order Controls */}
                      <div className="flex flex-col items-center justify-center gap-0.5 shrink-0 bg-slate-50 p-1 sm:p-1.5 rounded-lg border border-slate-200/80">
                        <button
                          type="button"
                          onClick={() => handleMoveCourse(course.id, "up")}
                          disabled={isFirst}
                          className={`p-1 rounded-md transition-colors cursor-pointer ${
                            isFirst
                              ? "text-slate-300 cursor-not-allowed"
                              : "text-slate-600 hover:bg-white hover:text-brand-red hover:shadow-2xs"
                          }`}
                          title={isFirst ? "First item" : "Move course up in order"}
                        >
                          <ArrowUp className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        </button>

                        <span className="text-[9px] sm:text-[10px] font-black font-mono text-slate-700 bg-white px-1.5 py-0.5 rounded border border-slate-200/80 shadow-3xs">
                          #{index + 1}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleMoveCourse(course.id, "down")}
                          disabled={isLast}
                          className={`p-1 rounded-md transition-colors cursor-pointer ${
                            isLast
                              ? "text-slate-300 cursor-not-allowed"
                              : "text-slate-600 hover:bg-white hover:text-brand-red hover:shadow-2xs"
                          }`}
                          title={isLast ? "Last item" : "Move course down in order"}
                        >
                          <ArrowDown className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        </button>
                      </div>

                      {/* Course Thumbnail */}
                      <div className="relative h-14 w-20 sm:h-16 sm:w-24 rounded-lg sm:rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                        <img
                          src={course.thumbnail}
                          alt={course.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/storage/courses/thumbnails/rB9PeE8IXEHOxY0LH0WwUNCsPvfSsPScZwI7kQAg.jpg";
                          }}
                        />
                      </div>

                      <div className="min-w-0 flex-1 space-y-0.5">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                          <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-brand-red bg-brand-red/5 px-2 py-0.5 rounded-full border border-brand-red/20 truncate max-w-[140px] sm:max-w-none">
                            {course.category || "Professional Certification"}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(course)}
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8px] sm:text-[9px] font-bold transition-all cursor-pointer ${
                              isPublished
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-amber-50 text-amber-700 border border-amber-200"
                            }`}
                            title="Click to toggle status"
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${isPublished ? "bg-emerald-500" : "bg-amber-500"}`}
                            />
                            <span className="capitalize">{course.status || "published"}</span>
                          </button>
                        </div>

                        <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm truncate group-hover:text-brand-red transition-colors">
                          {course.name}
                        </h4>

                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-slate-500">
                          <span className="font-semibold text-slate-700 truncate max-w-[110px] sm:max-w-none">
                            {course.instructor_name || course.instructorName || "Lead Faculty"}
                          </span>
                          <span>•</span>
                          <span>{course.duration || "6 weeks"}</span>
                          <span>•</span>
                          <span className="capitalize">{course.delivery || "online"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Price & Actions */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
                      <div className="text-left sm:text-right">
                        <span className="text-xs sm:text-base font-extrabold text-slate-900">
                          ${course.price || "250.00"}
                        </span>
                        <span className="block text-[8px] sm:text-[9px] text-slate-400 font-mono">
                          tuition
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Link
                          to="/courses/$id"
                          params={{ id: String(course.id) }}
                          target="_blank"
                          className="rounded-lg sm:rounded-xl border border-slate-200 p-1.5 sm:p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                          title="View Public Course Details"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>

                        <button
                          onClick={() => setEditingCourse(course)}
                          className="inline-flex items-center gap-1 rounded-lg sm:rounded-xl bg-slate-900 hover:bg-brand-red text-white px-2.5 py-1.5 sm:px-3 sm:py-2 text-[11px] sm:text-xs font-bold transition-colors cursor-pointer shadow-xs"
                        >
                          <Edit className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => handleDelete(course.id)}
                          className="rounded-lg sm:rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 p-1.5 sm:p-2 transition-colors cursor-pointer"
                          title="Delete Course"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* 2. Visual Bento Cards Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
            {isLoading ? (
              <div className="col-span-full py-16 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 text-center flex items-center justify-center">
                <BrandSpinner size="sm" message="Loading course cards..." />
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="col-span-full py-16 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 text-center text-slate-400 text-xs font-medium">
                No courses found matching your criteria.
              </div>
            ) : (
              filteredCourses.map((course, index) => {
                const isPublished = (course.status || "published") === "published";
                const isFirst = index === 0;
                const isLast = index === courses.length - 1;

                return (
                  <div
                    key={course.id}
                    className="rounded-xl sm:rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Card Thumbnail */}
                      <div className="relative h-24 sm:h-44 w-full bg-slate-100 overflow-hidden">
                        <img
                          src={course.thumbnail}
                          alt={course.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/storage/courses/thumbnails/rB9PeE8IXEHOxY0LH0WwUNCsPvfSsPScZwI7kQAg.jpg";
                          }}
                        />
                        <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 flex items-center gap-1">
                          <span className="rounded-full bg-slate-900/90 text-white font-mono px-2 py-0.5 text-[8px] sm:text-[10px] font-black backdrop-blur-md">
                            #{index + 1}
                          </span>
                          <span
                            className={`rounded-full px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 text-[8px] sm:text-[10px] font-bold shadow-xs backdrop-blur-md ${
                              isPublished
                                ? "bg-emerald-500/90 text-white"
                                : "bg-amber-500/90 text-white"
                            }`}
                          >
                            {course.status || "published"}
                          </span>
                        </div>
                        <span className="absolute bottom-1.5 right-1.5 sm:bottom-3 sm:right-3 rounded-md sm:rounded-xl bg-white/95 text-slate-900 px-1.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-extrabold shadow-xs sm:shadow-md backdrop-blur-md">
                          ${course.price || "250.00"}
                        </span>
                      </div>

                      {/* Card Body */}
                      <div className="p-2.5 sm:p-5 space-y-1.5 sm:space-y-3">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-brand-red bg-brand-red/5 px-2 py-0.5 rounded-full border border-brand-red/20 truncate">
                            {course.category || "Professional"}
                          </span>
                          {/* Quick Up/Down */}
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleMoveCourse(course.id, "up")}
                              disabled={isFirst}
                              className={`p-1 rounded text-xs ${isFirst ? "text-slate-300" : "text-slate-600 hover:text-brand-red hover:bg-slate-100"}`}
                              title="Move up"
                            >
                              <ArrowUp className="h-3 w-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveCourse(course.id, "down")}
                              disabled={isLast}
                              className={`p-1 rounded text-xs ${isLast ? "text-slate-300" : "text-slate-600 hover:text-brand-red hover:bg-slate-100"}`}
                              title="Move down"
                            >
                              <ArrowDown className="h-3 w-3" />
                            </button>
                          </div>
                        </div>

                        <h4 className="font-extrabold text-slate-900 text-xs sm:text-base line-clamp-2 group-hover:text-brand-red transition-colors leading-snug">
                          {course.name}
                        </h4>

                        <p className="text-[10px] sm:text-xs text-slate-500 font-medium truncate">
                          {course.instructor_name || course.instructorName || "Faculty Lead"}
                        </p>
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="p-2.5 sm:p-5 pt-0 flex items-center justify-between gap-2 border-t border-slate-100 mt-2">
                      <div className="flex items-center gap-1">
                        <Link
                          to="/courses/$id"
                          params={{ id: String(course.id) }}
                          target="_blank"
                          className="rounded-lg border border-slate-200 p-1 text-slate-400 hover:text-slate-800 transition-colors"
                          title="View public page"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(course)}
                          className="text-[9px] font-bold text-slate-500 hover:text-slate-800"
                        >
                          Toggle
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setEditingCourse(course)}
                          className="inline-flex items-center gap-1 rounded-lg bg-slate-900 hover:bg-brand-red text-white px-2 py-1 text-[10px] sm:text-xs font-bold transition-colors cursor-pointer"
                        >
                          <Edit className="h-3 w-3" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(course.id)}
                          className="rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 p-1 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Global Category Datalist */}
      <datalist id="category-suggestions">
        {POPULAR_CATEGORIES.map((cat) => (
          <option key={cat} value={cat} />
        ))}
      </datalist>

      {/* Complete Edit Course Modal */}
      {editingCourse && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm overflow-y-auto"
        >
          <div
            data-lenis-prevent
            className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-200"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-slate-100 bg-slate-50/70 shrink-0">
              <div className="flex items-center gap-3.5">
                <div className="h-11 w-11 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center font-bold shadow-xs">
                  <Edit className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">
                    Edit Course Studio
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Modify curriculum, instructor bio, sequence order, media, and enrollment metadata.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingCourse(null)}
                className="rounded-full bg-slate-200/70 p-2 text-slate-600 hover:bg-slate-300 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <form
              onSubmit={handleEditSubmit}
              data-lenis-prevent
              className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8 space-y-7"
            >
              {/* 1. Core Info & Pricing */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-brand-red flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand-red" />
                  General &amp; Pricing Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="course_name"
                      className="block text-xs font-bold text-slate-700 mb-1.5"
                    >
                      Course Name <span className="text-brand-red">*</span>
                    </label>
                    <input
                      id="course_name"
                      name="course_name"
                      type="text"
                      required
                      value={editingCourse.name || ""}
                      onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })}
                      placeholder="e.g. Executive Artificial Intelligence"
                      className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="course_category"
                      className="block text-xs font-bold text-slate-700 mb-1.5"
                    >
                      Category
                    </label>
                    <input
                      id="course_category"
                      name="course_category"
                      type="text"
                      list="category-suggestions"
                      value={editingCourse.category || ""}
                      onChange={(e) =>
                        setEditingCourse({ ...editingCourse, category: e.target.value })
                      }
                      placeholder="e.g. Web Development"
                      className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="instructor_name"
                      className="block text-xs font-bold text-slate-700 mb-1.5"
                    >
                      Instructor Name
                    </label>
                    <input
                      id="instructor_name"
                      name="instructor_name"
                      type="text"
                      value={editingCourse.instructorName || editingCourse.instructor_name || ""}
                      onChange={(e) =>
                        setEditingCourse({
                          ...editingCourse,
                          instructorName: e.target.value,
                          instructor_name: e.target.value,
                        })
                      }
                      placeholder="e.g. Tony Swaim, PMP"
                      className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="instructor_title"
                      className="block text-xs font-bold text-slate-700 mb-1.5"
                    >
                      Instructor Title
                    </label>
                    <input
                      id="instructor_title"
                      name="instructor_title"
                      type="text"
                      value={editingCourse.instructorTitle || editingCourse.instructor_title || ""}
                      onChange={(e) =>
                        setEditingCourse({
                          ...editingCourse,
                          instructorTitle: e.target.value,
                          instructor_title: e.target.value,
                        })
                      }
                      placeholder="e.g. Faculty Lead"
                      className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="course_price"
                      className="block text-xs font-bold text-slate-700 mb-1.5"
                    >
                      Price ($ USD / NPR)
                    </label>
                    <input
                      id="course_price"
                      name="course_price"
                      type="number"
                      step="0.01"
                      value={editingCourse.price || ""}
                      onChange={(e) =>
                        setEditingCourse({ ...editingCourse, price: e.target.value })
                      }
                      placeholder="e.g. 250.00"
                      className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="course_start_date"
                      className="block text-xs font-bold text-slate-700 mb-1.5"
                    >
                      Start Date
                    </label>
                    <input
                      id="course_start_date"
                      name="course_start_date"
                      type="text"
                      value={editingCourse.startDate || editingCourse.start_date || ""}
                      onChange={(e) =>
                        setEditingCourse({
                          ...editingCourse,
                          startDate: e.target.value,
                          start_date: e.target.value,
                        })
                      }
                      placeholder="e.g. Rolling Admission / Nov 15, 2026"
                      className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="course_duration"
                      className="block text-xs font-bold text-slate-700 mb-1.5"
                    >
                      Duration
                    </label>
                    <input
                      id="course_duration"
                      name="course_duration"
                      type="text"
                      value={editingCourse.duration || ""}
                      onChange={(e) =>
                        setEditingCourse({ ...editingCourse, duration: e.target.value })
                      }
                      placeholder="e.g. 6 weeks / 24 Hours"
                      className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="course_sort_order"
                      className="block text-xs font-bold text-slate-700 mb-1.5"
                    >
                      Display Sequence (# Order)
                    </label>
                    <input
                      id="course_sort_order"
                      name="course_sort_order"
                      type="number"
                      value={editingCourse.sortOrder !== undefined ? editingCourse.sortOrder : 0}
                      onChange={(e) =>
                        setEditingCourse({
                          ...editingCourse,
                          sortOrder: Number(e.target.value),
                        })
                      }
                      placeholder="1, 2, 3..."
                      className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Format & Classification */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  Format, Mode &amp; Classification
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  <div>
                    <label
                      htmlFor="course_delivery"
                      className="block text-xs font-bold text-slate-700 mb-1.5"
                    >
                      Delivery Mode
                    </label>
                    <select
                      id="course_delivery"
                      name="course_delivery"
                      value={editingCourse.delivery || "online"}
                      onChange={(e) =>
                        setEditingCourse({ ...editingCourse, delivery: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                    >
                      <option value="online">Online</option>
                      <option value="physical">Physical</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="course_mode"
                      className="block text-xs font-bold text-slate-700 mb-1.5"
                    >
                      Mode
                    </label>
                    <input
                      id="course_mode"
                      name="course_mode"
                      type="text"
                      value={editingCourse.mode || "Instructor-led"}
                      onChange={(e) => setEditingCourse({ ...editingCourse, mode: e.target.value })}
                      placeholder="e.g. Instructor-led"
                      className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="course_language"
                      className="block text-xs font-bold text-slate-700 mb-1.5"
                    >
                      Language
                    </label>
                    <input
                      id="course_language"
                      name="course_language"
                      type="text"
                      value={editingCourse.language || "English"}
                      onChange={(e) =>
                        setEditingCourse({ ...editingCourse, language: e.target.value })
                      }
                      placeholder="e.g. English"
                      className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="course_certification"
                      className="block text-xs font-bold text-slate-700 mb-1.5"
                    >
                      Certification
                    </label>
                    <input
                      id="course_certification"
                      name="course_certification"
                      type="text"
                      value={editingCourse.certification || "PECP"}
                      onChange={(e) =>
                        setEditingCourse({ ...editingCourse, certification: e.target.value })
                      }
                      placeholder="e.g. PECP / Red Dot Certified"
                      className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label
                    htmlFor="course_status"
                    className="block text-xs font-bold text-slate-700 mb-1.5"
                  >
                    Catalog Visibility Status
                  </label>
                  <select
                    id="course_status"
                    name="course_status"
                    value={editingCourse.status || "published"}
                    onChange={(e) => setEditingCourse({ ...editingCourse, status: e.target.value })}
                    className="w-full max-w-xs rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                  >
                    <option value="published">Published (Visible on site &amp; Navbar)</option>
                    <option value="draft">Draft (Hidden from public catalog)</option>
                  </select>
                </div>
              </div>

              {/* 3. Media Uploads */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  Visual Media &amp; Imagery
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <ImageUploadField
                    label="Course Thumbnail Image"
                    value={editingCourse.thumbnail || ""}
                    onChange={(url) => setEditingCourse({ ...editingCourse, thumbnail: url })}
                  />

                  <ImageUploadField
                    label="Course Banner Image"
                    value={editingCourse.bannerImage || editingCourse.banner_image || ""}
                    onChange={(url) =>
                      setEditingCourse({
                        ...editingCourse,
                        bannerImage: url,
                        banner_image: url,
                      })
                    }
                  />

                  <ImageUploadField
                    label="Instructor Avatar Photo"
                    value={editingCourse.instructorImage || editingCourse.instructor_image || ""}
                    onChange={(url) =>
                      setEditingCourse({
                        ...editingCourse,
                        instructorImage: url,
                        instructor_image: url,
                      })
                    }
                  />
                </div>
              </div>

              {/* 4. Course Overview / Description */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  Course Description &amp; Summary
                </h4>

                <RichTextEditor
                  label="Course Summary / Overview"
                  value={editingCourse.description || ""}
                  onChange={(val) => setEditingCourse({ ...editingCourse, description: val })}
                  placeholder="Enter detailed course overview, objectives, and value proposition..."
                />
              </div>

              {/* 5. Requirements */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  Requirements &amp; Prerequisites
                </h4>

                <RichTextEditor
                  label="Technical & Hardware Requirements"
                  value={editingCourse.requirements || ""}
                  onChange={(val) => setEditingCourse({ ...editingCourse, requirements: val })}
                  placeholder="List hardware, software, browser requirements, and prerequisites..."
                />
              </div>

              {/* 6. Curriculum / Syllabus */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  Curriculum &amp; Syllabus Breakdown
                </h4>

                <RichTextEditor
                  label="Course Curriculum (Lessons & Modules)"
                  value={editingCourse.curriculum || ""}
                  onChange={(val) => setEditingCourse({ ...editingCourse, curriculum: val })}
                  placeholder="Enter detailed lesson by lesson syllabus breakdown..."
                />
              </div>

              {/* 7. Instructor Biography */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  Instructor Detailed Biography
                </h4>

                <RichTextEditor
                  label="Instructor Background & Credentials"
                  value={editingCourse.instructorDetail || editingCourse.instructor_detail || ""}
                  onChange={(val) =>
                    setEditingCourse({
                      ...editingCourse,
                      instructorDetail: val,
                      instructor_detail: val,
                    })
                  }
                  placeholder="Enter instructor qualifications, career achievements, and background..."
                />
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-brand-red hover:bg-red-700 px-6 py-2.5 text-xs font-extrabold text-white shadow-md shadow-red-900/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Saving Course..." : "Save Course to Database"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
