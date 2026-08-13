import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { coursesData } from "@/data/courses";
import { Plus, Trash2, Edit, ExternalLink, X, Save, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getCourses, deleteCourse, updateCourse } from "@/lib/api";

export const Route = createFileRoute("/admin/courses/")({
  head: () => ({
    meta: [{ title: "Course Management | Red Dot Admin" }],
  }),
  component: AdminCoursesIndexPage,
});

function AdminCoursesIndexPage() {
  const [courses, setCourses] = useState<any[]>(coursesData);
  const [editingCourse, setEditingCourse] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadCourses = async () => {
    const data = await getCourses();
    if (data && data.length > 0) {
      setCourses(data);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleDeleteCourse = async (id: string) => {
    if (confirm("Are you sure you want to delete this course record?")) {
      try {
        await deleteCourse(id);
        setCourses((prev) => prev.filter((c) => String(c.id) !== String(id)));
        toast.success("Course deleted from database successfully.");
      } catch (err) {
        toast.error("Failed to delete course from database.");
      }
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;

    setIsSubmitting(true);
    try {
      await updateCourse(String(editingCourse.id), editingCourse);
      setCourses((prev) =>
        prev.map((c) => (String(c.id) === String(editingCourse.id) ? editingCourse : c)),
      );
      toast.success(`Course "${editingCourse.name}" updated successfully in SQLite database!`);
      setEditingCourse(null);
    } catch (err) {
      toast.error("Failed to update course in database.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout title="Course Management Studio">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Manage Courses Catalog</h2>
            <p className="text-xs text-slate-500">
              Create, view, edit, or remove professional training programs &amp; PECP modules stored in SQLite DB.
            </p>
          </div>
          <Link
            to="/admin/courses/create"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand-red)] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-red-700 transition-all"
          >
            <Plus className="h-4 w-4" />
            Create Course
          </Link>
        </div>

        {/* Courses Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-6">Course Name</th>
                <th className="py-3.5 px-4">Instructor</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Duration</th>
                <th className="py-3.5 px-4">Delivery</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-900">
                    <div className="flex items-center gap-3">
                      <img
                        src={course.thumbnail || "/images/courses/course-ai.jpg"}
                        alt={course.name}
                        className="h-10 w-14 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/courses/course-ai.jpg";
                        }}
                      />
                      <div className="min-w-0">
                        <span className="block truncate font-bold text-slate-900">
                          {course.name}
                        </span>
                        <span className="text-[11px] text-slate-400 capitalize">
                          {course.category || "Professional Certification"}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-slate-600 font-medium">{course.instructorName || course.instructor_name || "Faculty Lead"}</td>

                  <td className="py-4 px-4 font-extrabold text-slate-900">
                    {course.price
                      ? typeof course.price === "number"
                        ? `$${course.price.toFixed(2)}`
                        : course.price
                      : "Free"}
                  </td>

                  <td className="py-4 px-4 text-slate-600">{course.duration || "4 weeks"}</td>

                  <td className="py-4 px-4 capitalize text-slate-600 font-semibold">{course.delivery || "online"}</td>

                  <td className="py-4 px-4">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200 uppercase">
                      {course.status || "published"}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => setEditingCourse({ ...course })}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors cursor-pointer"
                      title="Edit Course Details"
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </button>

                    <Link
                      to="/courses/$id"
                      params={{ id: String(course.id) }}
                      target="_blank"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                      title="View Public Course Page"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>

                    <button
                      onClick={() => handleDeleteCourse(String(course.id))}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-[var(--brand-red)] hover:bg-red-100 transition-colors cursor-pointer"
                      title="Delete Course"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Course Modal */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <Edit className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">Edit Course Information</h3>
                  <p className="text-xs text-slate-500">
                    Update course metadata in the SQLite database.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingCourse(null)}
                className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs font-semibold text-slate-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-bold">Course Title</label>
                  <input
                    type="text"
                    required
                    value={editingCourse.name || ""}
                    onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:border-brand-red focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold">Instructor Name</label>
                  <input
                    type="text"
                    value={editingCourse.instructorName || editingCourse.instructor_name || ""}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        instructorName: e.target.value,
                        instructor_name: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:border-brand-red focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold">Price (USD / NPR)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingCourse.price || 0}
                    onChange={(e) => setEditingCourse({ ...editingCourse, price: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:border-brand-red focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold">Duration</label>
                  <input
                    type="text"
                    value={editingCourse.duration || ""}
                    onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:border-brand-red focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold">Delivery Mode</label>
                  <select
                    value={editingCourse.delivery || "online"}
                    onChange={(e) => setEditingCourse({ ...editingCourse, delivery: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:border-brand-red focus:outline-none"
                  >
                    <option value="online">Online</option>
                    <option value="physical">Physical</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-bold">Skill Level</label>
                  <select
                    value={editingCourse.skillLevel || editingCourse.skill_level || "beginner"}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        skillLevel: e.target.value,
                        skill_level: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:border-brand-red focus:outline-none"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-bold">Certification Type</label>
                  <input
                    type="text"
                    value={editingCourse.certification || ""}
                    onChange={(e) => setEditingCourse({ ...editingCourse, certification: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:border-brand-red focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold">Status</label>
                  <select
                    value={editingCourse.status || "published"}
                    onChange={(e) => setEditingCourse({ ...editingCourse, status: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:border-brand-red focus:outline-none"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1 font-bold">Course Description</label>
                <textarea
                  rows={3}
                  value={editingCourse.description || ""}
                  onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:border-brand-red focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="rounded-xl border border-slate-300 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand-red)] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-red-700 transition-all cursor-pointer"
                >
                  <Save className="h-4 w-4" />
                  <span>{isSubmitting ? "Saving Changes..." : "Save Changes to DB"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
