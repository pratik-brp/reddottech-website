import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { coursesData } from "@/data/courses";
import { BookOpen, Mail, Bell, Award, Plus, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { getDashboardStats, getCourses } from "@/lib/api";
import { requireAdminRoute } from "@/lib/auth";
import type { Course } from "@/types";

export const Route = createFileRoute("/admin/dashboard")({
  beforeLoad: requireAdminRoute,
  head: () => ({
    meta: [{ title: "Admin Dashboard | Red Dot Technologies" }],
  }),
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const [stats, setStats] = useState({
    coursesCount: 0,
    contactsCount: 0,
    subscriptionsCount: 0,
    certificatesCount: 0,
  });
  const [recentCourses, setRecentCourses] = useState<Course[]>([]);

  useEffect(() => {
    getDashboardStats().then((data) => {
      if (data) {
        setStats(data);
      }
    });
    getCourses().then((data) => {
      setRecentCourses(data && data.length > 0 ? (data as Course[]) : coursesData);
    });
  }, []);

  return (
    <AdminLayout title="Dashboard Overview">
      <div className="space-y-8">
        {/* Metric Cards Grid matching old PHP dashboard.blade.php */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Contacts Card */}
          <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-xl transform hover:scale-[1.02] transition duration-300 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-1">
                  Total Contacts
                </p>
                <h3 className="text-4xl font-extrabold">{stats.contactsCount}</h3>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 text-white">
                <Mail className="h-8 w-8" />
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-blue-400/40 flex items-center justify-between">
              <Link
                to="/admin/contacts"
                className="text-xs font-bold text-white hover:underline inline-flex items-center gap-1"
              >
                <span>View all contacts</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <span className="text-[10px] bg-blue-700/60 px-2 py-0.5 rounded-full font-semibold text-blue-100">
                Live SQLite
              </span>
            </div>
          </div>

          {/* Subscriptions Card */}
          <div className="bg-purple-600 rounded-2xl p-6 text-white shadow-xl transform hover:scale-[1.02] transition duration-300 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-xs font-bold uppercase tracking-wider mb-1">
                  Active Subscriptions
                </p>
                <h3 className="text-4xl font-extrabold">{stats.subscriptionsCount}</h3>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 text-white">
                <Bell className="h-8 w-8" />
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-purple-400/40 flex items-center justify-between">
              <Link
                to="/admin/subscriptions"
                className="text-xs font-bold text-white hover:underline inline-flex items-center gap-1"
              >
                <span>Manage subscriptions</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <span className="text-[10px] bg-purple-700/60 px-2 py-0.5 rounded-full font-semibold text-purple-100">
                Live SQLite
              </span>
            </div>
          </div>

          {/* Certificates Card */}
          <div className="bg-amber-500 rounded-2xl p-6 text-white shadow-xl transform hover:scale-[1.02] transition duration-300 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-xs font-bold uppercase tracking-wider mb-1">
                  Certificates Issued
                </p>
                <h3 className="text-4xl font-extrabold">{stats.certificatesCount}</h3>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 text-white">
                <Award className="h-8 w-8" />
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-amber-300/40 flex items-center justify-between">
              <Link
                to="/admin/certificates"
                className="text-xs font-bold text-white hover:underline inline-flex items-center gap-1"
              >
                <span>View certificates</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <span className="text-[10px] bg-amber-600/60 px-2 py-0.5 rounded-full font-semibold text-amber-100">
                AI Unlocked
              </span>
            </div>
          </div>

          {/* Courses Card */}
          <div className="bg-emerald-600 rounded-2xl p-6 text-white shadow-xl transform hover:scale-[1.02] transition duration-300 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-xs font-bold uppercase tracking-wider mb-1">
                  Total Courses
                </p>
                <h3 className="text-4xl font-extrabold">{stats.coursesCount}</h3>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 text-white">
                <BookOpen className="h-8 w-8" />
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-emerald-400/40 flex items-center justify-between">
              <Link
                to="/admin/courses"
                className="text-xs font-bold text-white hover:underline inline-flex items-center gap-1"
              >
                <span>Browse courses</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <span className="text-[10px] bg-emerald-700/60 px-2 py-0.5 rounded-full font-semibold text-emerald-100">
                Published
              </span>
            </div>
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
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {recentCourses.map((course) => (
                <div key={course.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={course.thumbnail}
                      alt={course.name}
                      className="h-10 w-14 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 truncate">{course.name}</h4>
                      <p className="text-[11px] text-slate-500 truncate">{course.instructorName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-extrabold text-[var(--brand-red)]">
                      ${course.price}
                    </span>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                      {course.certification}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-[#0F172A]">Quick Admin Shortcuts</h3>
              <div className="space-y-2">
                <Link
                  to="/admin/courses/create"
                  className="flex items-center justify-between rounded-xl bg-red-50 p-3 text-xs font-bold text-[var(--brand-red)] hover:bg-red-100 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add New Course
                  </span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <Link
                  to="/admin/certificates"
                  className="flex items-center justify-between rounded-xl bg-amber-50 p-3 text-xs font-bold text-amber-800 hover:bg-amber-100 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Issue &amp; Verify Certificates
                  </span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <Link
                  to="/admin/settings"
                  className="flex items-center justify-between rounded-xl bg-slate-100 p-3 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Batch Banner Controls
                  </span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
