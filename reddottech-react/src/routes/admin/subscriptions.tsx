import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState, useEffect, useMemo } from "react";
import {
  Trash2,
  Download,
  Plus,
  X,
  Search,
  Mail,
  CheckCircle2,
  Send,
  Copy,
  Users,
  Calendar,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { getSubscriptions, subscribeNewsletter, deleteSubscription } from "@/lib/api";
import { requireAdminRoute } from "@/lib/auth";
import { BrandSpinner } from "@/components/ui/BrandSpinner";

export const Route = createFileRoute("/admin/subscriptions")({
  beforeLoad: requireAdminRoute,
  head: () => ({
    meta: [{ title: "Newsletter Audience | Red Dot Admin" }],
  }),
  component: AdminSubscriptionsPage,
});

function AdminSubscriptionsPage() {
  const [subs, setSubs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadSubscriptions = async () => {
    setIsLoading(true);
    try {
      const data = await getSubscriptions();
      if (data && Array.isArray(data)) setSubs(data);
    } catch {
      setSubs([]);
    } finally {
      setIsLoading(false);
    }
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

  // Metrics
  const totalCount = subs.length;
  const recentSignups = useMemo(() => {
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    return subs.filter((s) => {
      const dateStr = s.created_at || s.date;
      if (!dateStr) return false;
      const t = new Date(dateStr).getTime();
      return !isNaN(t) && t >= thirtyDaysAgo;
    }).length;
  }, [subs]);

  const handleAddSubscriber = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = newEmail.trim();
    if (!email) return;

    // Check duplicate
    if (subs.some((s) => s.email && s.email.toLowerCase() === email.toLowerCase())) {
      toast.error("This email is already in your subscriber list.");
      return;
    }

    setIsSubmitting(true);
    try {
      await subscribeNewsletter(email);
      toast.success(`Subscriber ${email} added successfully`);
      setNewEmail("");
      setShowAddModal(false);
      loadSubscriptions();
    } catch (err) {
      toast.error("Failed to add subscriber.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number | string) => {
    if (confirm("Are you sure you want to remove this subscriber from the database?")) {
      try {
        await deleteSubscription(id);
        setSubs((prev) => prev.filter((s) => String(s.id) !== String(id)));
        toast.info("Subscriber removed.");
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
    toast.success("Subscribers exported as CSV");
  };

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    toast.success("Email copied to clipboard");
  };

  const copyAllEmails = () => {
    if (filteredSubs.length === 0) {
      toast.error("No emails to copy.");
      return;
    }
    const allEmails = filteredSubs.map((s) => s.email).filter(Boolean).join(", ");
    navigator.clipboard.writeText(allEmails);
    toast.success(`Copied ${filteredSubs.length} email addresses to clipboard`);
  };

  const broadcastUrl = useMemo(() => {
    const emails = filteredSubs.map((s) => s.email).filter(Boolean).join(",");
    return `mailto:info@reddottech.com.np?bcc=${encodeURIComponent(emails)}&subject=${encodeURIComponent(
      "Red Dot Technologies Update"
    )}`;
  }, [filteredSubs]);

  return (
    <AdminLayout
      title="Newsletter Subscribers"
      mobileTitle="Subscribers"
      subtitle="Manage your audience directory, export email campaigns, and review opt-in leads."
      actions={
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={copyAllEmails}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs px-3 py-2 shadow-xs transition-colors cursor-pointer"
            title="Copy all filtered emails as comma-separated list for BCC"
          >
            <Copy className="h-3.5 w-3.5 text-slate-500" />
            <span className="hidden sm:inline">Copy All Emails</span>
            <span className="inline sm:hidden">Copy All</span>
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs px-3 py-2 shadow-xs transition-colors cursor-pointer"
            title="Export CSV"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-3.5 py-2 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Subscriber</span>
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* ── Top Metric Summary ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Total Audience</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold tracking-tight text-slate-900">
                  {totalCount}
                </span>
                <span className="text-[11px] text-slate-400 font-normal">Active subscribers</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200/80">
              <Users className="h-5 w-5" />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">New (Past 30 Days)</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold tracking-tight text-slate-900">
                  {recentSignups}
                </span>
                {recentSignups > 0 && (
                  <span className="inline-flex items-center text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    + Growth
                  </span>
                )}
              </div>
            </div>
            <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200/60">
              <Calendar className="h-5 w-5" />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Audience Quality</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold tracking-tight text-slate-900">
                  100%
                </span>
                <span className="inline-flex items-center text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Opt-In Verified
                </span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200/60">
              <Sparkles className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* ── Table & Search Toolbar ── */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold text-sm text-slate-900">
                Audience Directory
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {filteredSubs.length} {filteredSubs.length === 1 ? "subscriber" : "subscribers"} found
              </p>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by email..."
                  className="w-full pl-8 pr-8 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-slate-400 font-medium"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {filteredSubs.length > 0 && (
                <a
                  href={broadcastUrl}
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-3 py-1.5 text-xs font-medium transition-colors"
                  title="Open email composer with all filtered recipients in BCC"
                >
                  <Send className="h-3 w-3 text-slate-500" />
                  <span>BCC Email</span>
                </a>
              )}
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50/60 text-[11px] font-semibold text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="px-5 py-3">Subscriber Email</th>
                  <th className="px-4 py-3">Opt-In Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-normal">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-12 text-center">
                      <div className="flex items-center justify-center">
                        <BrandSpinner size="sm" message="Loading subscriber directory..." />
                      </div>
                    </td>
                  </tr>
                ) : filteredSubs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-10 text-center text-slate-400 text-xs">
                      No subscribers match your search filter.
                    </td>
                  </tr>
                ) : (
                  filteredSubs.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200/80 text-slate-700 font-semibold text-xs flex items-center justify-center shrink-0">
                            {sub.email ? sub.email.charAt(0).toUpperCase() : "S"}
                          </div>
                          <span className="font-semibold text-slate-900 font-mono text-xs">
                            {sub.email}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-3.5 text-slate-500 font-mono text-[11px]">
                        {sub.created_at || sub.date || "Recent"}
                      </td>

                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center gap-1 text-emerald-700 text-[11px] font-medium bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                          Subscribed
                        </span>
                      </td>

                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => copyEmail(sub.email)}
                            className="p-1.5 rounded-md border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                            title="Copy email address"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>

                          <a
                            href={`mailto:${sub.email}?subject=Red Dot Technologies Update`}
                            className="p-1.5 rounded-md border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                            title="Send email"
                          >
                            <Mail className="h-3.5 w-3.5" />
                          </a>

                          <button
                            type="button"
                            onClick={() => handleDelete(sub.id)}
                            className="p-1.5 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Remove subscriber"
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

          {/* Mobile Card View */}
          <div className="block md:hidden divide-y divide-slate-100">
            {isLoading ? (
              <div className="p-8 text-center flex items-center justify-center">
                <BrandSpinner size="sm" message="Loading..." />
              </div>
            ) : filteredSubs.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400">
                No subscribers found.
              </div>
            ) : (
              filteredSubs.map((sub) => (
                <div key={sub.id} className="p-4 flex items-center justify-between gap-3 bg-white">
                  <div className="min-w-0">
                    <span className="font-semibold text-slate-900 font-mono text-xs block truncate">
                      {sub.email}
                    </span>
                    <div className="flex items-center gap-2 pt-0.5 text-[11px] text-slate-400">
                      <span>{sub.created_at || sub.date || "Recent"}</span>
                      <span>·</span>
                      <span className="text-emerald-700 font-medium">Subscribed</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => copyEmail(sub.email)}
                      className="p-1.5 rounded-md border border-slate-200 text-slate-600"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                    <a
                      href={`mailto:${sub.email}?subject=Red Dot Technologies Update`}
                      className="p-1.5 rounded-md border border-slate-200 text-slate-600"
                    >
                      <Mail className="h-3 w-3" />
                    </a>
                    <button
                      type="button"
                      onClick={() => handleDelete(sub.id)}
                      className="p-1.5 rounded-md text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Add Subscriber Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-xl p-6 space-y-4 animate-fade-in-up">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-semibold text-base text-slate-900">
                  Add Subscriber
                </h3>
                <p className="text-xs text-slate-500">Insert verified audience email address</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubscriber} className="space-y-4 text-xs font-medium text-slate-700">
              <div>
                <label htmlFor="subscriber_email" className="block text-xs font-medium text-slate-700 mb-1">
                  Subscriber Email *
                </label>
                <input
                  id="subscriber_email"
                  name="subscriber_email"
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="e.g. executive@corporate.com"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-slate-400 font-medium"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-2 text-xs font-medium text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-4 py-2 shadow-xs disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? "Adding..." : "Add Subscriber"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
