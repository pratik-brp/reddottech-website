import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { coursesData } from "@/data/courses";
import { Plus, Trash2, Edit, ExternalLink } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/courses/")({
  head: () => ({
    meta: [{ title: "Course Management | RedDot Admin" }],
  }),
  component: AdminCoursesIndexPage,
});

function AdminCoursesIndexPage() {
  const [courses, setCourses] = useState(coursesData);

  const handleDeleteCourse = (id: string) => {
    if (confirm("Are you sure you want to delete this course record?")) {
      setCourses(courses.filter((c) => c.id !== id));
      toast.success("Course deleted successfully.");
    }
  };

  return (
    <AdminLayout title="Course Management">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Manage, create, and edit all 5 professional catalog courses.
          </p>
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
                        src={course.thumbnail}
                        alt={course.name}
                        className="h-10 w-14 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="block truncate font-bold text-slate-900">
                          {course.name}
                        </span>
                        <span className="text-[11px] text-slate-400 capitalize">
                          {course.category || "General"}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-slate-600 font-medium">{course.instructorName}</td>

                  <td className="py-4 px-4 font-extrabold text-slate-900">
                    {course.price
                      ? typeof course.price === "number"
                        ? `$${course.price.toFixed(2)}`
                        : course.price
                      : "Free"}
                  </td>

                  <td className="py-4 px-4 text-slate-600">{course.duration}</td>

                  <td className="py-4 px-4">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                      Published
                    </span>
                  </td>

                  <td className="py-4 px-6 text-right space-x-2">
                    <Link
                      to="/courses/$id"
                      params={{ id: String(course.id) }}
                      target="_blank"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                      title="View Course Page"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>

                    <button
                      onClick={() => handleDeleteCourse(course.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-[var(--brand-red)] hover:bg-red-100 transition-colors"
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
    </AdminLayout>
  );
}
