import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState, useEffect } from "react";
import { Trash2, Download, Bell, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { getSubscriptions, subscribeNewsletter, deleteSubscription } from "@/lib/api";

export const Route = createFileRoute("/admin/subscriptions")({
  head: () => ({
    meta: [{ title: "Newsletter Subscriptions | Red Dot Admin" }],
  }),
  component: AdminSubscriptionsPage,
});

function AdminSubscriptionsPage() {
  const [subs, setSubs] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadSubscriptions = async () => {
    const data = await getSubscriptions();
    if (data) {
      setSubs(data);
    }
  };

  useEffect(() => {
    loadSubscriptions();
  }, []);

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
    if (confirm("Delete this subscriber from database?")) {
      try {
        await deleteSubscription(id);
        setSubs((prev) => prev.filter((s) => String(s.id) !== String(id)));
        toast.success("Subscriber removed from SQLite database.");
      } catch (err) {
        toast.error("Failed to remove subscriber from database.");
      }
    }
  };

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8,ID,Email,CreatedDate\n" +
      subs.map((s) => `${s.id},${s.email},${s.created_at || s.date || ""}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "reddot_newsletter_subscribers.csv");
    document.body.appendChild(link);
    link.click();
    toast.success("Subscribers list exported as CSV.");
  };

  return (
    <AdminLayout title="Newsletter Subscriptions">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Subscribers who opted in for tech course announcements and workshops (Stored in SQLite DB).
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand-red)] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-red-700 transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Add Subscriber
            </button>
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-black transition-all cursor-pointer"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-6">Subscriber Email</th>
                <th className="py-3.5 px-4">Subscribed Date</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {subs.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-12 text-center text-slate-400 font-medium">
                    No subscribers found in database.
                  </td>
                </tr>
              ) : (
                subs.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900 flex items-center gap-2">
                      <Bell className="h-4 w-4 text-purple-600 shrink-0" />
                      <span>{sub.email}</span>
                    </td>

                    <td className="py-4 px-4 text-slate-600 font-medium">
                      {sub.created_at || sub.date || "2026-07-29"}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDelete(sub.id)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-[var(--brand-red)] hover:bg-red-100 transition-colors cursor-pointer"
                        title="Remove Subscriber"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Subscriber Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Bell className="h-5 w-5 text-purple-600" />
                Add Newsletter Subscriber
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubscriber} className="space-y-4 text-xs font-semibold text-slate-700">
              <div>
                <label className="block mb-1 font-bold">Subscriber Email *</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="e.g. subscriber@example.com"
                  className="w-full rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:border-brand-red focus:outline-none"
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
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand-red)] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-red-700 transition-all cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>{isSubmitting ? "Adding..." : "Add to SQLite DB"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
