import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState, useEffect } from "react";
import { Settings, Save, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { getSettings, updateSettings, changeAdminPassword } from "@/lib/api";
import { requireAdminRoute } from "@/lib/auth";

export const Route = createFileRoute("/admin/settings")({
  beforeLoad: requireAdminRoute,
  head: () => ({
    meta: [{ title: "Batch Banner Settings | Red Dot Admin" }],
  }),
  component: AdminSettingsPage,
});

function AdminSettingsPage() {
  const [batchTitle, setBatchTitle] = useState(
    "First batch begins November 15, 2025.\nLimited seats available.",
  );
  const [batchSubtitle, setBatchSubtitle] = useState(
    "Take the next step toward a globally recognized career.",
  );
  const [batchBtnText, setBatchBtnText] = useState("Enroll Now");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    getSettings().then((data) => {
      if (data) {
        if (data.batch_banner_title)
          setBatchTitle(data.batch_banner_title.replace(/<br\s*\/?>/gi, "\n"));
        if (data.batch_banner_subtitle) setBatchSubtitle(data.batch_banner_subtitle);
        if (data.batch_banner_button_text) setBatchBtnText(data.batch_banner_button_text);
      }
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateSettings({
        batch_banner_title: batchTitle,
        batch_banner_subtitle: batchSubtitle,
        batch_banner_button_text: batchBtnText,
      });
      toast.success("Batch banner settings saved to SQLite database successfully!");
    } catch (err) {
      toast.error("Failed to save settings to database.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    setIsChangingPassword(true);
    try {
      await changeAdminPassword(currentPassword, newPassword);
      toast.success("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update password.";
      toast.error(message);
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <AdminLayout title="PECP Batch Announcement Settings">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="h-10 w-10 rounded-xl bg-red-50 text-[var(--brand-red)] flex items-center justify-center">
            <Settings className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#0F172A]">Batch Banner Settings</h3>
            <p className="text-xs text-slate-500">
              Manage the PECP batch start date announcement shown on the Home and PECP pages.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Batch Subtitle</label>
            <input
              type="text"
              value={batchSubtitle}
              onChange={(e) => setBatchSubtitle(e.target.value)}
              required
              placeholder="Take the next step toward a globally recognized career."
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs bg-slate-50 focus:outline-none focus:border-[var(--brand-red)]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Batch Title (Main Announcement Text)
            </label>
            <textarea
              rows={3}
              value={batchTitle}
              onChange={(e) => setBatchTitle(e.target.value)}
              required
              placeholder="First batch begins November 15, 2025. Limited seats available."
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs bg-slate-50 focus:outline-none focus:border-[var(--brand-red)]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Button Text</label>
            <input
              type="text"
              value={batchBtnText}
              onChange={(e) => setBatchBtnText(e.target.value)}
              required
              placeholder="Enroll Now"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs bg-slate-50 focus:outline-none focus:border-[var(--brand-red)]"
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand-red)] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-red-700 transition-all cursor-pointer"
            >
              <Save className="h-4 w-4" />
              Save Settings
            </button>
          </div>
        </form>

        {/* Live Banner Preview matching old PHP private/settings/index.blade.php */}
        <div className="mt-6 p-6 rounded-2xl bg-slate-900 text-white space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
            <span>Live Home &amp; PECP Banner Preview</span>
            <span className="text-emerald-400">● Active</span>
          </div>
          <div className="text-center space-y-2 py-4 border border-white/10 rounded-xl bg-slate-950/60 p-6">
            <p className="text-xs text-slate-400 font-semibold">{batchSubtitle}</p>
            <h4 className="text-xl font-black text-white whitespace-pre-line">{batchTitle}</h4>
            <div className="pt-2">
              <span className="inline-block rounded-lg bg-[var(--brand-red)] px-4 py-1.5 text-xs font-bold text-white shadow-md">
                {batchBtnText}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="max-w-3xl mx-auto mt-6 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="h-10 w-10 rounded-xl bg-red-50 text-[var(--brand-red)] flex items-center justify-center">
            <KeyRound className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#0F172A]">Change Password</h3>
            <p className="text-xs text-slate-500">
              Update the password used to sign in to this admin panel. Other active sessions are
              signed out.
            </p>
          </div>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="Enter your current password"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs bg-slate-50 focus:outline-none focus:border-[var(--brand-red)]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="At least 8 characters"
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs bg-slate-50 focus:outline-none focus:border-[var(--brand-red)]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="Re-enter new password"
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs bg-slate-50 focus:outline-none focus:border-[var(--brand-red)]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={isChangingPassword}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand-red)] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-red-700 transition-all cursor-pointer disabled:opacity-60"
            >
              <KeyRound className="h-4 w-4" />
              {isChangingPassword ? "Updating Password..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
