import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { coursesData } from "@/data/courses";
import { BookOpen, Mail, Bell, Award, Plus, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [{ title: "Admin Dashboard | RedDot Technologies" }],
  }),
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const coursesCount = coursesData.length;
  const contactsCount = 14;
  const subscriptionsCount = 42;
  const certificatesCount = 9;

  return (
    <AdminLayout title="Dashboard Overview">
      <div className="space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Courses
              </span>
              <div className="h-10 w-10 rounded-xl bg-red-50 text-[var(--brand-red)] flex items-center justify-center">
                <BookOpen className="h-5 w-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-[#0F172A]">{coursesCount}</p>
            <p className="text-xs text-emerald-600 font-medium">Active & Published</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Contact Inquiries
              </span>
              <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Mail className="h-5 w-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-[#0F172A]">{contactsCount}</p>
            <p className="text-xs text-slate-500 font-medium">Submitted Form Leads</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Subscribers
              </span>
              <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Bell className="h-5 w-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-[#0F172A]">{subscriptionsCount}</p>
            <p className="text-xs text-slate-500 font-medium">Newsletter Audience</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Certificates
              </span>
              <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Award className="h-5 w-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-[#0F172A]">{certificatesCount}</p>
            <p className="text-xs text-emerald-600 font-medium">Issued Digital Badges</p>
          </div>
        </div>

        {/* Quick Actions & Recent Courses Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-bold text-[#0F172A]">Active Courses Catalog</h3>
              <Link
                to="/admin/courses"
                className="text-xs font-semibold text-[var(--brand-red)] hover:underline flex items-center gap-1"
              >
                View All Courses
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {coursesData.map((course) => (
                <div key={course.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={course.thumbnail}
                      alt={course.name}
                      className="h-10 w-14 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 truncate">{course.name}</h4>
                      <p className="text-[11px] text-slate-500">
                        {course.instructorName} • {course.duration}
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 shrink-0">
                    Published
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-[#0F172A] pb-4 border-b border-slate-100">
              Quick Administrative Actions
            </h3>
            <div className="space-y-3">
              <Link
                to="/admin/courses/create"
                className="flex items-center gap-3 w-full rounded-xl bg-[var(--brand-red)] px-4 py-3 text-xs font-semibold text-white shadow-sm hover:bg-red-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add New Course
              </Link>

              <Link
                to="/admin/contacts"
                className="flex items-center justify-between w-full rounded-xl bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                <span>View Contact Messages</span>
                <Mail className="h-4 w-4 text-slate-400" />
              </Link>

              <Link
                to="/admin/certificates"
                className="flex items-center justify-between w-full rounded-xl bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                <span>Student Certificate Requests</span>
                <Award className="h-4 w-4 text-slate-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
