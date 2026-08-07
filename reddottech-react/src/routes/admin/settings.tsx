import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState } from "react";
import { Settings, Save } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [{ title: "System Settings | RedDot Admin" }],
  }),
  component: AdminSettingsPage,
});

function AdminSettingsPage() {
  const [batchTitle, setBatchTitle] = useState("PECP Upcoming Cohort Intake 2025/2026");
  const [batchSubtitle, setBatchSubtitle] = useState(
    "Joint International Certification in Artificial Intelligence, Business Analytics & Project Management with USC Upstate, USA.",
  );
  const [batchBtnText, setBatchBtnText] = useState("Reserve Seats Now");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("System settings updated successfully!");
  };

  return (
    <AdminLayout title="Site & Batch Settings">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="h-10 w-10 rounded-xl bg-red-50 text-[var(--brand-red)] flex items-center justify-center">
            <Settings className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#0F172A]">Batch Banner Controls</h3>
            <p className="text-xs text-slate-500">
              Configure global batch announcement banner texts shown across home and PECP pages.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Batch Banner Title
            </label>
            <input
              type="text"
              value={batchTitle}
              onChange={(e) => setBatchTitle(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs bg-slate-50 focus:outline-none focus:border-[var(--brand-red)]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Batch Banner Subtitle
            </label>
            <textarea
              rows={3}
              value={batchSubtitle}
              onChange={(e) => setBatchSubtitle(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs bg-slate-50 focus:outline-none focus:border-[var(--brand-red)]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">CTA Button Text</label>
            <input
              type="text"
              value={batchBtnText}
              onChange={(e) => setBatchBtnText(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs bg-slate-50 focus:outline-none focus:border-[var(--brand-red)]"
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand-red)] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-red-700 transition-all"
            >
              <Save className="h-4 w-4" />
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
