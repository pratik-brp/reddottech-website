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
  Save,
  Search,
  LayoutGrid,
  List,
  Clock,
  Globe,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { getCourses, deleteCourse, updateCourse } from "@/lib/api";
import { requireAdminRoute } from "@/lib/auth";
import { BrandSpinner } from "@/components/ui/BrandSpinner";

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

  // Filters and View Mode
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const loadCourses = async () => {
    setIsLoading(true);
    try {
      const data = await getCourses();
      if (data) {
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
        (course.instructor_name && course.instructor_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (course.instructorName && course.instructorName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (course.category && course.category.toLowerCase().includes(searchQuery.toLowerCase()));

      const courseCategory = course.category || "Professional Certification";
      const matchesCategory =
        selectedCategory === "all" || courseCategory.toLowerCase() === selectedCategory.toLowerCase();

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

  const handleDelete = async (id: number | string) => {
    if (confirm("Are you sure you want to delete this course from the database?")) {
      try {
        await deleteCourse(id);
        setCourses((prev) => prev.filter((c) => String(c.id) !== String(id)));
        toast.success("Course deleted successfully from database.");
      } catch (err) {
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
        thumbnail: editingCourse.thumbnail !== undefined ? editingCourse.thumbnail : "",
        bannerImage: editingCourse.bannerImage !== undefined ? editingCourse.bannerImage : (editingCourse.banner_image || ""),
        instructorImage: editingCourse.instructorImage !== undefined ? editingCourse.instructorImage : (editingCourse.instructor_image || ""),
        description: editingCourse.description,
        requirements: editingCourse.requirements,
        curriculum: editingCourse.curriculum,
      });

      toast.success(`Course "${editingCourse.name}" updated successfully in database!`);
      setEditingCourse(null);
      loadCourses();
    } catch (err) {
      toast.error("Failed to save changes.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout
      title="Courses"
      mobileTitle="Courses"
      subtitle="Manage course offerings, pricing, instructors, and curriculum content."
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
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
                <option value="all">All Categories</option>
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

          {/* View Mode Toggle Switcher */}
          <div className="flex items-center justify-between sm:justify-end gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
            <span className="text-xs text-slate-400 font-semibold">
              Showing <strong className="text-slate-800">{filteredCourses.length}</strong> modules
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
                title="Table View"
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

        {/* 1. List / Row View (Left Toggle Icon) */}
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
              filteredCourses.map((course) => {
                const isPublished = (course.status || "published") === "published";
                return (
                  <div
                    key={course.id}
                    className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
                  >
                    {/* Left: Thumbnail & Info */}
                    <div className="flex items-center gap-3 min-w-0 flex-1 w-full sm:w-auto">
                      <div className="relative h-14 w-20 sm:h-16 sm:w-24 rounded-lg sm:rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                        <img
                          src={course.thumbnail}
                          alt={course.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/courses/course-ai.jpg";
                          }}
                        />
                      </div>

                      <div className="min-w-0 flex-1 space-y-0.5">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                          <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-brand-red bg-brand-red/5 px-2 py-0.5 rounded-full border border-brand-red/20 truncate max-w-[120px] sm:max-w-none">
                            {course.category || "Professional"}
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
                            <span className={`h-1.5 w-1.5 rounded-full ${isPublished ? "bg-emerald-500" : "bg-amber-500"}`} />
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
                        <span className="block text-[8px] sm:text-[9px] text-slate-400 font-mono">tuition</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {course.slug && (
                          <Link
                            to={`/courses/${course.slug}` as any}
                            target="_blank"
                            className="rounded-lg sm:rounded-xl border border-slate-200 p-1.5 sm:p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                            title="View Public Course"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Link>
                        )}

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

        {/* 2. Visual Bento Cards Grid View (Right Toggle Icon) */}
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
              filteredCourses.map((course) => {
                const isPublished = (course.status || "published") === "published";
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
                            (e.target as HTMLImageElement).src = "/images/courses/course-ai.jpg";
                          }}
                        />
                        <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 flex items-center gap-1">
                          <span
                            className={`rounded-full px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 text-[8px] sm:text-[10px] font-bold shadow-xs backdrop-blur-md ${
                              isPublished
                                ? "bg-emerald-500/90 text-white"
                                : "bg-amber-500/90 text-white"
                            }`}
                          >
                            {course.status || "published"}
                          </span>
                          <span className="rounded-full bg-slate-900/80 text-white px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 text-[8px] sm:text-[10px] font-bold backdrop-blur-md truncate max-w-[80px] sm:max-w-none">
                            {course.category || "Professional"}
                          </span>
                        </div>
                        <span className="absolute bottom-1.5 right-1.5 sm:bottom-3 sm:right-3 rounded-md sm:rounded-xl bg-white/95 text-slate-900 px-1.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-extrabold shadow-xs sm:shadow-md backdrop-blur-md">
                          ${course.price || "250.00"}
                        </span>
                      </div>

                      {/* Card Body */}
                      <div className="p-2.5 sm:p-5 space-y-1.5 sm:space-y-3">
                        <h4 className="font-extrabold text-slate-900 text-xs sm:text-base line-clamp-2 group-hover:text-brand-red transition-colors leading-snug">
                          {course.name}
                        </h4>

                        <p className="text-[10px] sm:text-xs text-slate-500 font-medium truncate">
                          {course.instructor_name || course.instructorName || "Faculty Lead"}
                        </p>

                        <div className="flex flex-wrap items-center gap-1 sm:gap-2 pt-0.5 text-[9px] sm:text-[11px] text-slate-500">
                          <span className="inline-flex items-center gap-0.5 bg-slate-100 px-1.5 py-0.5 rounded text-[9px] sm:text-[11px]">
                            <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> {course.duration || "6w"}
                          </span>
                          <span className="inline-flex items-center gap-0.5 bg-slate-100 px-1.5 py-0.5 rounded text-[9px] sm:text-[11px] capitalize">
                            <Globe className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> {course.delivery || "online"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="p-2 sm:p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <button
                          onClick={() => setEditingCourse(course)}
                          className="inline-flex items-center gap-1 rounded-lg sm:rounded-xl bg-slate-900 hover:bg-brand-red text-white px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-bold transition-colors cursor-pointer shadow-xs"
                        >
                          <Edit className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                          <span>Edit</span>
                        </button>
                        {course.slug && (
                          <Link
                            to={`/courses/${course.slug}` as any}
                            target="_blank"
                            className="rounded-lg sm:rounded-xl border border-slate-200 p-1 sm:p-1.5 text-slate-400 hover:text-slate-800 hover:bg-white transition-colors"
                          >
                            <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          </Link>
                        )}
                      </div>

                      <button
                        onClick={() => handleDelete(course.id)}
                        className="rounded-lg sm:rounded-xl p-1 sm:p-1.5 text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete Course"
                      >
                        <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Complete 17-Field Edit Course Modal with WYSIWYG & Manual Image Upload */}
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
                  <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">Edit Course Studio</h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Modify curriculum, instructor bio, requirements, media, and enrollment metadata.
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
                    <label htmlFor="course_name" className="block text-xs font-bold text-slate-700 mb-1.5">
                      Course Name <span className="text-brand-red">*</span>
                    </label>
                    <input
                      id="course_name"
                      name="course_name"
                      type="text"
                      required
                      value={editingCourse.name || ""}
                      onChange={(e) =>
                        setEditingCourse({ ...editingCourse, name: e.target.value })
                      }
                      placeholder="e.g. Executive Artificial Intelligence"
                      className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="course_category" className="block text-xs font-bold text-slate-700 mb-1.5">
                      Category
                    </label>
                    <input
                      id="course_category"
                      name="course_category"
                      type="text"
                      value={editingCourse.category || "Professional Certification"}
                      onChange={(e) =>
                        setEditingCourse({ ...editingCourse, category: e.target.value })
                      }
                      placeholder="e.g. Artificial Intelligence"
                      className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="instructor_name" className="block text-xs font-bold text-slate-700 mb-1.5">
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
                    <label htmlFor="instructor_title" className="block text-xs font-bold text-slate-700 mb-1.5">
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
                    <label htmlFor="course_price" className="block text-xs font-bold text-slate-700 mb-1.5">
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
                    <label htmlFor="course_start_date" className="block text-xs font-bold text-slate-700 mb-1.5">
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
                    <label htmlFor="course_duration" className="block text-xs font-bold text-slate-700 mb-1.5">
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
                </div>
              </div>

              {/* 2. Format & Classification */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  Format, Mode &amp; Classification
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5">
                  <div>
                    <label htmlFor="course_delivery" className="block text-xs font-bold text-slate-700 mb-1.5">
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
                    <label htmlFor="course_mode" className="block text-xs font-bold text-slate-700 mb-1.5">
                      Mode
                    </label>
                    <input
                      id="course_mode"
                      name="course_mode"
                      type="text"
                      value={editingCourse.mode || "Instructor-led"}
                      onChange={(e) =>
                        setEditingCourse({ ...editingCourse, mode: e.target.value })
                      }
                      placeholder="e.g. Instructor-led"
                      className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="course_language" className="block text-xs font-bold text-slate-700 mb-1.5">
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
                    <label htmlFor="course_skill_level" className="block text-xs font-bold text-slate-700 mb-1.5">
                      Skill Level
                    </label>
                    <select
                      id="course_skill_level"
                      name="course_skill_level"
                      value={editingCourse.skillLevel || editingCourse.skill_level || "beginner"}
                      onChange={(e) =>
                        setEditingCourse({
                          ...editingCourse,
                          skillLevel: e.target.value,
                          skill_level: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="course_certification" className="block text-xs font-bold text-slate-700 mb-1.5">
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
                      placeholder="PECP / Reddot"
                      className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="course_status" className="block text-xs font-bold text-slate-700 mb-1.5">
                      Status
                    </label>
                    <select
                      id="course_status"
                      name="course_status"
                      value={editingCourse.status || "published"}
                      onChange={(e) =>
                        setEditingCourse({ ...editingCourse, status: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 3. Media & Thumbnails - Direct Device Upload & Database Save */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-brand-red" />
                    Media &amp; Visual Assets (Direct Upload &amp; Database Storage)
                  </h4>
                  <span className="text-[11px] text-slate-400 font-medium">
                    Uploads save automatically to MySQL
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  <ImageUploadField
                    label="Course Thumbnail Image"
                    value={editingCourse.thumbnail || ""}
                    onChange={(url) => setEditingCourse({ ...editingCourse, thumbnail: url })}
                    placeholder="https://... or /uploads/thumbnail.jpg"
                    aspectRatio="16/9"
                    description="Displays on course cards, listings & catalog"
                  />

                  <ImageUploadField
                    label="Course Hero Banner Image"
                    value={
                      editingCourse.bannerImage !== undefined
                        ? editingCourse.bannerImage
                        : (editingCourse.banner_image || "")
                    }
                    onChange={(url) =>
                      setEditingCourse({
                        ...editingCourse,
                        bannerImage: url,
                        banner_image: url,
                      })
                    }
                    placeholder="https://... or /uploads/banner.jpg"
                    aspectRatio="banner"
                    description="Hero panoramic header on course details page"
                  />

                  <ImageUploadField
                    label="Instructor Avatar Photo"
                    value={
                      editingCourse.instructorImage !== undefined
                        ? editingCourse.instructorImage
                        : (editingCourse.instructor_image || "")
                    }
                    onChange={(url) =>
                      setEditingCourse({
                        ...editingCourse,
                        instructorImage: url,
                        instructor_image: url,
                      })
                    }
                    placeholder="https://... or /uploads/instructor.jpg"
                    aspectRatio="square"
                    description="Lead faculty portrait headshot"
                  />
                </div>
              </div>

              {/* 4. Full Course Content & Rich Text WYSIWYG Editors */}
              <div className="space-y-6 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  Detailed Course Content &amp; Rich Text WYSIWYG Editors
                </h4>

                {/* Description */}
                <RichTextEditor
                  label="Description"
                  value={editingCourse.description || ""}
                  onChange={(val) =>
                    setEditingCourse({ ...editingCourse, description: val })
                  }
                  placeholder="Give yourself an employment advantage by developing analytical skills..."
                  minHeight="140px"
                />

                {/* Instructor Detail */}
                <RichTextEditor
                  label="Instructor Detail"
                  value={editingCourse.instructorDetail || editingCourse.instructor_detail || ""}
                  onChange={(val) =>
                    setEditingCourse({
                      ...editingCourse,
                      instructorDetail: val,
                      instructor_detail: val,
                    })
                  }
                  placeholder="Matt Crabtree, CFP ®, earned his Bachelor of Science in Business..."
                  minHeight="180px"
                />

                {/* Requirements */}
                <RichTextEditor
                  label="Requirements"
                  value={editingCourse.requirements || ""}
                  onChange={(val) =>
                    setEditingCourse({ ...editingCourse, requirements: val })
                  }
                  placeholder="Hardware Requirements:&#10;→This course can be taken on either a PC, Mac, or Chromebook..."
                  minHeight="180px"
                />

                {/* Curriculum */}
                <RichTextEditor
                  label="Curriculum"
                  value={editingCourse.curriculum || ""}
                  onChange={(val) =>
                    setEditingCourse({ ...editingCourse, curriculum: val })
                  }
                  placeholder="Lesson 1 – Problem Solving and Decision-Making: ...&#10;Lesson 2 – Introduction to Probability: ..."
                  minHeight="220px"
                />
              </div>

              {/* Modal Sticky Bottom Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-200 sticky bottom-0 bg-white/95 backdrop-blur-sm -mx-6 sm:-mx-8 px-6 sm:px-8 py-3">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="rounded-xl border border-slate-300 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-red hover:bg-red-700 text-white font-extrabold text-xs tracking-wider uppercase px-7 py-2.5 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60 cursor-pointer"
                >
                  <Save className="h-4 w-4" />
                  <span>{isSubmitting ? "SAVING..." : "UPDATE COURSE"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
