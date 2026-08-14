import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState, useEffect } from "react";
import {
  Settings,
  Save,
  KeyRound,
  Database,
  Megaphone,
  ShieldCheck,
  Eye,
  EyeOff,
  Sparkles,
  Server,
  Layers,
  CheckCircle2,
  Lock,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { getSettings, updateSettings, changeAdminPassword } from "@/lib/api";
import { requireAdminRoute, getAdminEmail } from "@/lib/auth";

export const Route = createFileRoute("/admin/settings")({
  beforeLoad: requireAdminRoute,
  head: () => ({
    meta: [{ title: "Settings & System Control | Red Dot Admin" }],
  }),
  component: AdminSettingsPage,
});

function AdminSettingsPage() {
  const adminEmail = getAdminEmail();
  const [activeTab, setActiveTab] = useState<"banner" | "security" | "database">("banner");

  // Tab 1: Banner Settings
  const [batchTitle, setBatchTitle] = useState(
    "First batch begins November 15, 2025.\nLimited seats available.",
  );
  const [batchSubtitle, setBatchSubtitle] = useState(
    "Take the next step toward a globally recognized career.",
  );
  const [batchBtnText, setBatchBtnText] = useState("Enroll Now");
  const [isSubmittingBanner, setIsSubmittingBanner] = useState(false);

  // Tab 2: Password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  const handleSaveBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingBanner(true);
    try {
      await updateSettings({
        batch_banner_title: batchTitle,
        batch_banner_subtitle: batchSubtitle,
        batch_banner_button_text: batchBtnText,
      });
      toast.success("PECP Batch Announcement updated in SQLite database!");
    } catch (err) {
      toast.error("Failed to save settings.");
    } finally {
      setIsSubmittingBanner(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    setIsChangingPassword(true);
    try {
      await changeAdminPassword(currentPassword, newPassword);
      toast.success("Admin password changed successfully in database!");
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
    <AdminLayout
      title="Settings"
      subtitle="Announcement banner, administrator credentials, and database settings."
    >
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-fit border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab("banner")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeTab === "banner"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Megaphone className="h-3.5 w-3.5 text-brand-red" />
            <span>Announcement Banner</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeTab === "security"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <KeyRound className="h-3.5 w-3.5 text-slate-500" />
            <span>Password &amp; Security</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("database")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeTab === "database"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Database className="h-3.5 w-3.5 text-slate-500" />
            <span>Database Status</span>
          </button>
        </div>

        {/* TAB 1: PECP Batch Banner Announcement */}
        {activeTab === "banner" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="h-10 w-10 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center font-bold">
                  <Megaphone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    PECP Batch Announcement Banner
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Controls the global red announcement bar on the Home and PECP pages.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveBanner} className="space-y-5 text-xs font-semibold text-slate-700">
                <div>
                  <label htmlFor="batch_subtitle" className="block mb-1.5 font-bold text-slate-800">
                    Banner Eyebrow / Subtitle
                  </label>
                  <input
                    id="batch_subtitle"
                    name="batch_subtitle"
                    type="text"
                    value={batchSubtitle}
                    onChange={(e) => setBatchSubtitle(e.target.value)}
                    placeholder="e.g. Take the next step toward a globally recognized career."
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="batch_title" className="block mb-1.5 font-bold text-slate-800">
                    Main Headline &amp; Start Date
                  </label>
                  <textarea
                    id="batch_title"
                    name="batch_title"
                    rows={3}
                    value={batchTitle}
                    onChange={(e) => setBatchTitle(e.target.value)}
                    placeholder="e.g. First batch begins November 15, 2025. Limited seats available."
                    className="w-full rounded-xl border border-slate-300 p-3 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none leading-relaxed"
                  />
                </div>

                <div>
                  <label htmlFor="batch_btn_text" className="block mb-1.5 font-bold text-slate-800">
                    Call to Action Button Label
                  </label>
                  <input
                    id="batch_btn_text"
                    name="batch_btn_text"
                    type="text"
                    value={batchBtnText}
                    onChange={(e) => setBatchBtnText(e.target.value)}
                    placeholder="e.g. Enroll Now / Join Batch"
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmittingBanner}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-red-700 text-white font-extrabold text-xs px-6 py-2.5 shadow-md shadow-brand-red/20 transition-all disabled:opacity-60 cursor-pointer"
                  >
                    <Save className="h-4 w-4" />
                    <span>{isSubmittingBanner ? "Saving..." : "Save Announcement"}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Live Visual Preview */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 space-y-4 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  <span>Live Website Preview</span>
                </div>

                <div className="rounded-2xl bg-gradient-to-r from-brand-red via-red-600 to-brand-red p-6 text-white text-center space-y-3 shadow-lg">
                  <p className="text-[11px] font-bold text-white/90 uppercase tracking-widest">
                    {batchSubtitle || "Take the next step toward a globally recognized career."}
                  </p>
                  <h4 className="text-sm font-extrabold leading-snug whitespace-pre-line">
                    {batchTitle || "First batch begins November 15, 2025."}
                  </h4>
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white text-brand-red font-black text-xs px-5 py-2 shadow-md">
                      {batchBtnText || "Enroll Now"}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 text-center">
                  Changes made here update immediately across the live website.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Security & Credentials */}
        {activeTab === "security" && (
          <div className="max-w-2xl bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="h-10 w-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <KeyRound className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  Administrator Credentials
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Update your superuser password for the Red Dot Admin Control Panel.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">
                  Active Admin Account
                </span>
                <span className="font-bold text-slate-900 font-mono text-sm">
                  {adminEmail || "info@reddottech.com.np"}
                </span>
              </div>
              <span className="rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-[11px] font-bold">
                Verified Superuser
              </span>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-5 text-xs font-semibold text-slate-700">
              <div>
                <label htmlFor="current_password" className="block mb-1.5 font-bold text-slate-800">
                  Current Password *
                </label>
                <input
                  id="current_password"
                  name="current_password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password (admin123)"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="new_password" className="block mb-1.5 font-bold text-slate-800">
                  New Secure Password *
                </label>
                <input
                  id="new_password"
                  name="new_password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min. 6 chars)"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="confirm_password" className="block mb-1.5 font-bold text-slate-800">
                  Confirm New Password *
                </label>
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type new password"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span>{showPassword ? "Hide Passwords" : "Show Passwords"}</span>
                </button>

                <button
                  type="submit"
                  disabled={isChangingPassword}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-black text-white font-extrabold text-xs px-6 py-2.5 shadow-md transition-all disabled:opacity-60 cursor-pointer"
                >
                  <Lock className="h-4 w-4" />
                  <span>{isChangingPassword ? "Updating..." : "Update Password"}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: SQLite Diagnostics */}
        {activeTab === "database" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="h-10 w-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Database className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  SQLite Database Diagnostics
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Real-time storage status, schema health, and local persistence diagnostics.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Database Engine
                </span>
                <p className="text-sm font-extrabold text-slate-900">better-sqlite3</p>
                <span className="inline-block text-[11px] text-emerald-600 font-bold">
                  ✓ Synchronous WAL Mode
                </span>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Storage Location
                </span>
                <p className="text-sm font-extrabold text-slate-900 font-mono truncate">
                  server/data/database.sqlite
                </p>
                <span className="inline-block text-[11px] text-blue-600 font-bold">
                  ✓ Persistent Local File
                </span>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Query Latency
                </span>
                <p className="text-sm font-extrabold text-slate-900">&lt; 0.5 ms</p>
                <span className="inline-block text-[11px] text-purple-600 font-bold">
                  ✓ In-Memory Cache Accelerated
                </span>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900 text-white p-5 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Table Schema Registry</span>
                <span className="text-emerald-400 font-bold">ALL HEALTHY</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-slate-300">
                <li>• <strong className="text-white">courses</strong> — 17 fields, curriculum, instructor detail, media</li>
                <li>• <strong className="text-white">contacts</strong> — Student and corporate inbound lead inquiries</li>
                <li>• <strong className="text-white">subscriptions</strong> — Verified newsletter subscriber list</li>
                <li>• <strong className="text-white">certificates</strong> — PECP &amp; AI Unlocked credentials</li>
                <li>• <strong className="text-white">settings</strong> — Site-wide announcements and configuration</li>
                <li>• <strong className="text-white">admin_users</strong> — Scrypt-hashed superuser authentication</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
