import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { coursesData } from "@/data/courses";
import {
  BookOpen,
  Mail,
  Bell,
  Award,
  Plus,
  ArrowRight,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { getDashboardStats, getCourses, getContacts } from "@/lib/api";
import { requireAdminRoute } from "@/lib/auth";
import type { Course } from "@/types";

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
  const [recentCourses, setRecentCourses] = useState<any[]>(coursesData);
  const [recentContacts, setRecentContacts] = useState<any[]>([]);

  useEffect(() => {
    getDashboardStats().then((data) => {
      if (data) setStats(data);
    });
    getCourses().then((data) => {
      setRecentCourses(data && data.length > 0 ? (data as Course[]) : coursesData);
    });
    getContacts().then((data) => {
      if (data) setRecentContacts(data.slice(0, 5));
    });
  }, []);

  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Overview of course offerings, student inquiries, and enrollment metrics."
      actions={
        <Link
          to="/admin/courses/create"
          className="inline-flex items-center gap-1.5 rounded-xl bg-brand-red hover:bg-red-700 text-white font-bold text-xs px-4 py-2 shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add Course</span>
        </Link>
      }
    >
      <div className="space-y-6">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Courses */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">Total Courses</span>
              <div className="h-9 w-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <BookOpen className="h-4 w-4" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-slate-900">{stats.coursesCount}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Published &amp; draft modules</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <Link
                to="/admin/courses"
                className="text-xs font-bold text-slate-700 hover:text-brand-red inline-flex items-center gap-1 transition-colors"
              >
                <span>View all</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Contacts */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">Inbound Inquiries</span>
              <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Mail className="h-4 w-4" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-slate-900">{stats.contactsCount}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Website contact submissions</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <Link
                to="/admin/contacts"
                className="text-xs font-bold text-slate-700 hover:text-brand-red inline-flex items-center gap-1 transition-colors"
              >
                <span>View inquiries</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Certificates */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">Certificates Issued</span>
              <div className="h-9 w-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Award className="h-4 w-4" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-slate-900">{stats.certificatesCount}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">PECP &amp; AI credentials</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <Link
                to="/admin/certificates"
                className="text-xs font-bold text-slate-700 hover:text-brand-red inline-flex items-center gap-1 transition-colors"
              >
                <span>Manage certificates</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 4: Subscribers */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">Newsletter Subscribers</span>
              <div className="h-9 w-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Bell className="h-4 w-4" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-slate-900">{stats.subscriptionsCount}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Active email subscribers</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <Link
                to="/admin/subscriptions"
                className="text-xs font-bold text-slate-700 hover:text-brand-red inline-flex items-center gap-1 transition-colors"
              >
                <span>View subscribers</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Content Feeds Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
              {recentCourses.slice(0, 5).map((course) => (
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
              ))}
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
              {recentContacts.length === 0 ? (
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
