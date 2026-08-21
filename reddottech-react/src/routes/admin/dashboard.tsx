import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  BookOpen,
  Mail,
  Bell,
  Award,
  Plus,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { getDashboardStats, getCourses, getContacts } from "@/lib/api";
import { requireAdminRoute } from "@/lib/auth";
import { BrandSpinner } from "@/components/ui/BrandSpinner";

export const Route = createFileRoute("/admin/dashboard")({
  beforeLoad: requireAdminRoute,
  head: () => ({
    meta: [{ title: "Dashboard | Red Dot Admin" }],
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
  const [recentCourses, setRecentCourses] = useState<any[]>([]);
  const [recentContacts, setRecentContacts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      getDashboardStats(),
      getCourses(),
      getContacts(),
    ])
      .then(([statsData, coursesData, contactsData]) => {
        if (statsData) setStats(statsData);
        if (coursesData) setRecentCourses(coursesData);
        if (contactsData) setRecentContacts(contactsData.slice(0, 5));
      })
      .catch((err) => {
        console.error("Dashboard data load failed:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Overview of course offerings, student inquiries, and enrollment metrics."
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
      <div className="space-y-4 sm:space-y-6">
        {/* Metric Cards 2-Column Mobile Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {/* Card 1: Courses */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-[10px] sm:text-xs font-semibold text-slate-500 truncate">Total Courses</span>
              <div className="h-7 w-7 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>
            </div>
            <div>
              <p className="text-xl sm:text-3xl font-extrabold text-slate-900">{stats.coursesCount}</p>
              <p className="text-[9px] sm:text-[11px] text-slate-400 mt-0.5 truncate">Published &amp; draft</p>
            </div>
            <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-100 flex items-center justify-between">
              <Link
                to="/admin/courses"
                className="text-[10px] sm:text-xs font-bold text-slate-700 hover:text-brand-red inline-flex items-center gap-0.5 sm:gap-1 transition-colors"
              >
                <span>View all</span>
                <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Contacts */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-[10px] sm:text-xs font-semibold text-slate-500 truncate">Inquiries</span>
              <div className="h-7 w-7 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>
            </div>
            <div>
              <p className="text-xl sm:text-3xl font-extrabold text-slate-900">{stats.contactsCount}</p>
              <p className="text-[9px] sm:text-[11px] text-slate-400 mt-0.5 truncate">Form submissions</p>
            </div>
            <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-100 flex items-center justify-between">
              <Link
                to="/admin/contacts"
                className="text-[10px] sm:text-xs font-bold text-slate-700 hover:text-brand-red inline-flex items-center gap-0.5 sm:gap-1 transition-colors"
              >
                <span>View inquiries</span>
                <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Certificates */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-[10px] sm:text-xs font-semibold text-slate-500 truncate">Certificates</span>
              <div className="h-7 w-7 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>
            </div>
            <div>
              <p className="text-xl sm:text-3xl font-extrabold text-slate-900">{stats.certificatesCount}</p>
              <p className="text-[9px] sm:text-[11px] text-slate-400 mt-0.5 truncate">Issued credentials</p>
            </div>
            <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-100 flex items-center justify-between">
              <Link
                to="/admin/certificates"
                className="text-[10px] sm:text-xs font-bold text-slate-700 hover:text-brand-red inline-flex items-center gap-0.5 sm:gap-1 transition-colors"
              >
                <span>Manage</span>
                <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 4: Subscribers */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-[10px] sm:text-xs font-semibold text-slate-500 truncate">Subscribers</span>
              <div className="h-7 w-7 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Bell className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>
            </div>
            <div>
              <p className="text-xl sm:text-3xl font-extrabold text-slate-900">{stats.subscriptionsCount}</p>
              <p className="text-[9px] sm:text-[11px] text-slate-400 mt-0.5 truncate">Email subscribers</p>
            </div>
            <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-100 flex items-center justify-between">
              <Link
                to="/admin/subscriptions"
                className="text-[10px] sm:text-xs font-bold text-slate-700 hover:text-brand-red inline-flex items-center gap-0.5 sm:gap-1 transition-colors"
              >
                <span>View all</span>
                <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Content Feeds Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Courses Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Course Catalog</h3>
                <p className="text-xs text-slate-400 font-normal">Active course offerings</p>
              </div>
              <Link
                to="/admin/courses"
                className="text-xs font-bold text-brand-red hover:underline inline-flex items-center gap-1"
              >
                View all courses
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {isLoading ? (
                <div className="py-12 text-center flex items-center justify-center">
                  <BrandSpinner size="sm" message="Loading course catalog..." />
                </div>
              ) : recentCourses.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-xs">No courses available.</div>
              ) : (
                recentCourses.slice(0, 5).map((course) => (
                  <div key={course.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={course.thumbnail}
                        alt={course.name}
                        className="h-10 w-14 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/courses/course-ai.jpg";
                        }}
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">{course.name}</h4>
                        <p className="text-[11px] text-slate-500 truncate">
                          {course.instructor_name || course.instructorName || "Instructor"} • {course.duration || "6 weeks"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="text-xs font-bold text-slate-800">${course.price || "250.00"}</span>
                      <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded capitalize">
                        {course.delivery || "online"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Inquiries Feed */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Recent Inquiries</h3>
                <p className="text-xs text-slate-400 font-normal">Latest submissions</p>
              </div>
              <Link
                to="/admin/contacts"
                className="text-xs font-bold text-slate-700 hover:text-brand-red inline-flex items-center gap-1"
              >
                All
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {isLoading ? (
                <div className="py-12 text-center flex items-center justify-center">
                  <BrandSpinner size="sm" message="Loading inquiries..." />
                </div>
              ) : recentContacts.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-xs">No recent inquiries.</div>
              ) : (
                recentContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 truncate">
                        {contact.first_name} {contact.last_name || ""}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {contact.created_at ? contact.created_at.split(" ")[0] : "Recent"}
                      </span>
                    </div>
                    <p className="text-slate-600 line-clamp-1 text-[11px]">
                      {contact.message || contact.subject || "Inquiry"}
                    </p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-[11px] text-blue-600 hover:underline font-mono inline-block pt-0.5"
                    >
                      {contact.email}
                    </a>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
