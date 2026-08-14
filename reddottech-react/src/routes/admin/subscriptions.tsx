import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState, useEffect, useMemo } from "react";
import {
  Trash2,
  Download,
  Bell,
  Plus,
  X,
  Search,
  Mail,
  Calendar,
  CheckCircle2,
  UserCheck,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import { getSubscriptions, subscribeNewsletter, deleteSubscription } from "@/lib/api";
import { requireAdminRoute } from "@/lib/auth";

export const Route = createFileRoute("/admin/subscriptions")({
  beforeLoad: requireAdminRoute,
  head: () => ({
    meta: [{ title: "Newsletter Audience | Red Dot Admin" }],
  }),
  component: AdminSubscriptionsPage,
});

function AdminSubscriptionsPage() {
  const [subs, setSubs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadSubscriptions = async () => {
    const data = await getSubscriptions();
    if (data) setSubs(data);
  };

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const filteredSubs = useMemo(() => {
    return subs.filter((s) => {
      if (!searchQuery) return true;
      return s.email && s.email.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [subs, searchQuery]);

  const handleAddSubscriber = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;

    setIsSubmitting(true);
    try {
      await subscribeNewsletter(newEmail);
      toast.success(`Subscriber ${newEmail} added to SQLite database!`);
      setNewEmail("");
      setShowAddModal(false);
      loadSubscriptions();
    } catch (err) {
      toast.error("Failed to add subscriber to database.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number | string) => {
    if (confirm("Delete this subscriber from SQLite database?")) {
      try {
        await deleteSubscription(id);
        setSubs((prev) => prev.filter((s) => String(s.id) !== String(id)));
        toast.success("Subscriber removed.");
      } catch (err) {
        toast.error("Failed to remove subscriber.");
      }
    }
  };

  const handleExportCSV = () => {
    if (subs.length === 0) {
      toast.error("No subscribers to export.");
      return;
    }
    const headers = ["ID", "Email", "Subscribed Date", "Status"];
    const rows = subs.map((s) => [s.id, `"${s.email || ""}"`, `"${s.created_at || s.date || ""}"`, '"Active"']);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `reddot_subscribers_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Subscribers list exported as CSV!");
  };

  return (
    <AdminLayout
      title="Newsletter Subscribers"
      subtitle="Email subscribers opted in for course announcements and workshops."
      actions={
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs px-3.5 py-2 shadow-xs transition-colors cursor-pointer"
          >
            <Download className="h-4 w-4 text-slate-500" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand-red hover:bg-red-700 text-white font-bold text-xs px-4 py-2 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add Subscriber</span>
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Search Toolbar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search subscribers by email..."
              className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2 text-xs font-semibold text-slate-800 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
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

          <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
            <span>Total Audience: <strong className="text-slate-900">{subs.length}</strong></span>
            <span className="h-4 w-[1px] bg-slate-200" />
            <span className="text-purple-600 flex items-center gap-1 font-bold">
              <UserCheck className="h-4 w-4" /> 100% Opted-In
            </span>
          </div>
        </div>

        {/* Subscribers Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Subscriber Email</th>
                  <th className="py-4 px-6">Opt-In Date</th>
                  <th className="py-4 px-6">Delivery Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {filteredSubs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-400 font-medium">
                      No subscribers found in database.
                    </td>
                  </tr>
                ) : (
                  filteredSubs.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/70 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold shrink-0">
                            <Mail className="h-4 w-4" />
                          </div>
                          <span className="font-bold text-slate-900 font-mono text-xs group-hover:text-brand-red transition-colors">
                            {sub.email}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-6 text-slate-500 font-mono text-[11px]">
                        {sub.created_at || sub.date || "Recent"}
                      </td>

                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                          <CheckCircle2 className="h-3 w-3" /> Active Lead
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center gap-2">
                          <a
                            href={`mailto:${sub.email}?subject=Red Dot Technologies Announcement`}
                            className="rounded-xl border border-slate-200 p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                            title="Compose Email"
                          >
                            <Send className="h-3.5 w-3.5" />
                          </a>
                          <button
                            onClick={() => handleDelete(sub.id)}
                            className="rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 p-2 transition-colors cursor-pointer"
                            title="Unsubscribe / Remove"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Subscriber Modal */}
      {showAddModal && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden border border-slate-200">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/70">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold shadow-xs">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">Add Lead Email</h3>
                  <p className="text-xs text-slate-500">Insert verified newsletter subscriber.</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-full bg-slate-200/70 p-1.5 text-slate-600 hover:bg-slate-300 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubscriber} className="p-6 space-y-4 text-xs font-semibold text-slate-700">
              <div>
                <label htmlFor="subscriber_email" className="block mb-1.5">Subscriber Email *</label>
                <input
                  id="subscriber_email"
                  name="subscriber_email"
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="e.g. executive@corporate.com"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl border border-slate-300 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-brand-red hover:bg-red-700 text-white font-extrabold text-xs px-6 py-2.5 shadow-md disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? "Adding..." : "Add to Database"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
