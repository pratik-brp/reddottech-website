import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState, useEffect } from "react";
import {
  Save,
  KeyRound,
  Megaphone,
  Eye,
  EyeOff,
  Sparkles,
  Lock,
  ArrowRight,
  Smartphone,
  Monitor,
  Phone,
  MapPin,
  Share2,
} from "lucide-react";
import { toast } from "sonner";
import {
  getAdminSettings,
  updateSettings,
  changeAdminPassword,
  changeAdminEmail,
} from "@/lib/api";
import { requireAdminRoute, getAdminEmail } from "@/lib/auth";

export const Route = createFileRoute("/admin/settings")({
  beforeLoad: requireAdminRoute,
  head: () => ({
    meta: [{ title: "Settings & System Control | Red Dot Admin" }],
  }),
  component: AdminSettingsPage,
});

type SettingsTab = "banner" | "contact" | "security";

function AdminSettingsPage() {
  const [activeAdminEmail, setActiveAdminEmail] = useState<string>(
    () => getAdminEmail() || ""
  );
  const [activeTab, setActiveTab] = useState<SettingsTab>("banner");

  // Tab 1: Banner Settings
  const [batchTitle, setBatchTitle] = useState(
    "First batch begins November 15, 2025.\nLimited seats available."
  );
  const [batchSubtitle, setBatchSubtitle] = useState(
    "Take the next step toward a globally recognized career."
  );
  const [batchBtnText, setBatchBtnText] = useState("Enroll Now");
  const [isSubmittingBanner, setIsSubmittingBanner] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");

  // Tab 2: Contact & Social Info
  const [contactPhone, setContactPhone] = useState("+977 9801234567");
  const [contactSecondaryPhone, setContactSecondaryPhone] = useState("+977 01-4455667");
  const [contactEmail, setContactEmail] = useState("info@reddottech.com.np");
  const [admissionsEmail, setAdmissionsEmail] = useState("admissions@reddottech.com.np");
  const [whatsappNumber, setWhatsappNumber] = useState("+977 9801234567");
  const [officeAddress, setOfficeAddress] = useState("Tinkune, Kathmandu, Nepal");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("https://maps.google.com");
  const [officeHours, setOfficeHours] = useState("Sun - Fri: 9:00 AM - 6:00 PM");
  const [socialFacebook, setSocialFacebook] = useState("https://facebook.com/reddottechnepal");
  const [socialInstagram, setSocialInstagram] = useState("https://instagram.com/reddottech");
  const [socialLinkedin, setSocialLinkedin] = useState("https://linkedin.com/company/reddottech");
  const [socialTiktok, setSocialTiktok] = useState("https://tiktok.com/@reddottech");
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  // Tab 3: Password & Security
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Change Admin Email State
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [emailAuthPassword, setEmailAuthPassword] = useState("");
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [showEmailChangeModal, setShowEmailChangeModal] = useState(false);

  // Load Settings on Mount
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAdminSettings();
        if (data) {
          if (data.batch_banner_title)
            setBatchTitle(data.batch_banner_title.replace(/<br\s*\/?>/gi, "\n"));
          if (data.batch_banner_subtitle) setBatchSubtitle(data.batch_banner_subtitle);
          if (data.batch_banner_button_text) setBatchBtnText(data.batch_banner_button_text);

          if (data.contact_phone) setContactPhone(data.contact_phone);
          if (data.contact_phone_secondary) setContactSecondaryPhone(data.contact_phone_secondary);
          if (data.contact_email) setContactEmail(data.contact_email);
          if (data.admissions_email) setAdmissionsEmail(data.admissions_email);
          if (data.whatsapp_number) setWhatsappNumber(data.whatsapp_number);
          if (data.office_address) setOfficeAddress(data.office_address);
          if (data.google_maps_url) setGoogleMapsUrl(data.google_maps_url);
          if (data.office_hours) setOfficeHours(data.office_hours);

          if (data.social_facebook) setSocialFacebook(data.social_facebook);
          if (data.social_instagram) setSocialInstagram(data.social_instagram);
          if (data.social_linkedin) setSocialLinkedin(data.social_linkedin);
          if (data.social_tiktok) setSocialTiktok(data.social_tiktok);
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      }
    }
    loadData();
  }, []);

  // Tab 1 Save Handler (Banner)
  const handleSaveBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingBanner(true);
    try {
      await updateSettings({
        batch_banner_title: batchTitle,
        batch_banner_subtitle: batchSubtitle,
        batch_banner_button_text: batchBtnText,
      });
      toast.success("PECP Batch Announcement updated successfully!");
    } catch (err) {
      toast.error("Failed to save banner settings.");
    } finally {
      setIsSubmittingBanner(false);
    }
  };

  // Tab 2 Save Handler (Contact & Social)
  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingContact(true);
    try {
      await updateSettings({
        contact_phone: contactPhone,
        contact_phone_secondary: contactSecondaryPhone,
        contact_email: contactEmail,
        admissions_email: admissionsEmail,
        whatsapp_number: whatsappNumber,
        office_address: officeAddress,
        google_maps_url: googleMapsUrl,
        office_hours: officeHours,
        social_facebook: socialFacebook,
        social_instagram: socialInstagram,
        social_linkedin: socialLinkedin,
        social_tiktok: socialTiktok,
      });
      toast.success("Contact info and social links updated successfully!");
    } catch (err) {
      toast.error("Failed to save contact settings.");
    } finally {
      setIsSubmittingContact(false);
    }
  };

  // Tab 3 Change Password
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
      toast.success("Admin password changed successfully!");
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

  // Change Superuser Email
  const handleChangeAdminEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail || !newAdminEmail.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!emailAuthPassword) {
      toast.error("Current password is required to verify your identity.");
      return;
    }

    setIsChangingEmail(true);
    try {
      const res = await changeAdminEmail(newAdminEmail, emailAuthPassword);
      toast.success("Superuser email updated successfully!");
      if (res?.email) setActiveAdminEmail(res.email);
      setNewAdminEmail("");
      setEmailAuthPassword("");
      setShowEmailChangeModal(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update admin email.";
      toast.error(message);
    } finally {
      setIsChangingEmail(false);
    }
  };

  return (
    <AdminLayout
      title="Settings & System Control"
      mobileTitle="Settings"
      subtitle="Announcement banners, direct contact information, social links, and superuser security."
    >
      <div className="space-y-6 max-w-5xl">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-fit border border-slate-200 overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => setActiveTab("banner")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === "banner"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Megaphone className="h-3.5 w-3.5 text-brand-red" />
            <span>Announcement Banner</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("contact")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === "contact"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Phone className="h-3.5 w-3.5 text-blue-600" />
            <span>Contact &amp; Social</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === "security"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <KeyRound className="h-3.5 w-3.5 text-slate-700" />
            <span>Security &amp; Auth</span>
          </button>
        </div>

        {/* TAB 1: PECP Batch Banner Announcement */}
        {activeTab === "banner" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="h-9 w-9 rounded-lg bg-red-50 text-brand-red flex items-center justify-center font-bold">
                  <Megaphone className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">
                    PECP Batch Announcement Banner
                  </h3>
                  <p className="text-xs text-slate-500">
                    Controls the global announcement bar shown on the Home and PECP pages.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveBanner} className="space-y-4 text-xs font-medium text-slate-700">
                <div>
                  <label htmlFor="batch_subtitle" className="block mb-1 text-slate-700">
                    Banner Eyebrow / Subtitle
                  </label>
                  <input
                    id="batch_subtitle"
                    name="batch_subtitle"
                    type="text"
                    value={batchSubtitle}
                    onChange={(e) => setBatchSubtitle(e.target.value)}
                    placeholder="e.g. Take the next step toward a globally recognized career."
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-slate-400 font-medium"
                  />
                </div>

                <div>
                  <label htmlFor="batch_title" className="block mb-1 text-slate-700">
                    Main Headline &amp; Start Date
                  </label>
                  <textarea
                    id="batch_title"
                    name="batch_title"
                    rows={3}
                    value={batchTitle}
                    onChange={(e) => setBatchTitle(e.target.value)}
                    placeholder="e.g. First batch begins November 15, 2025. Limited seats available."
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-slate-400 font-medium leading-relaxed"
                  />
                </div>

                <div>
                  <label htmlFor="batch_btn_text" className="block mb-1 text-slate-700">
                    Call to Action Button Label
                  </label>
                  <input
                    id="batch_btn_text"
                    name="batch_btn_text"
                    type="text"
                    value={batchBtnText}
                    onChange={(e) => setBatchBtnText(e.target.value)}
                    placeholder="e.g. Enroll Now / Join Batch"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-slate-400 font-medium"
                  />
                </div>

                <div className="pt-2 border-t border-slate-100 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmittingBanner}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-4 py-2 shadow-xs transition-colors disabled:opacity-60 cursor-pointer"
                  >
                    <Save className="h-3.5 w-3.5" />
                    <span>{isSubmittingBanner ? "Saving..." : "Save Announcement"}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Live Visual Preview */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 space-y-4 shadow-sm">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                    <span>Live Website Preview</span>
                  </div>

                  <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-md">
                    <button
                      type="button"
                      onClick={() => setPreviewDevice("desktop")}
                      className={`p-1 rounded ${
                        previewDevice === "desktop" ? "bg-slate-700 text-white" : "text-slate-400"
                      }`}
                      title="Desktop view"
                    >
                      <Monitor className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice("mobile")}
                      className={`p-1 rounded ${
                        previewDevice === "mobile" ? "bg-slate-700 text-white" : "text-slate-400"
                      }`}
                      title="Mobile view"
                    >
                      <Smartphone className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                <div
                  className={`rounded-xl bg-gradient-to-r from-brand-red via-red-600 to-brand-red text-white text-center space-y-3 shadow-md mx-auto transition-all ${
                    previewDevice === "mobile" ? "max-w-xs p-4" : "p-6"
                  }`}
                >
                  <p className="text-[10px] font-semibold text-white/90 uppercase tracking-widest">
                    {batchSubtitle || "Take the next step toward a globally recognized career."}
                  </p>
                  <h4 className="text-sm font-bold leading-snug whitespace-pre-line">
                    {batchTitle || "First batch begins November 15, 2025."}
                  </h4>
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white text-brand-red font-bold text-xs px-4 py-1.5 shadow-sm">
                      {batchBtnText || "Enroll Now"}
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 text-center">
                  Changes saved here apply immediately across the live site.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Contact Information & Social Media */}
        {activeTab === "contact" && (
          <form onSubmit={handleSaveContact} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Channels */}
              <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                  <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">Direct Contact Details</h3>
                    <p className="text-xs text-slate-500">Phone numbers, emails, and WhatsApp</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs font-medium text-slate-700">
                  <div>
                    <label className="block mb-1 text-slate-700">Primary Phone Number *</label>
                    <input
                      type="text"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+977 9801234567"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-slate-400 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-slate-700">Secondary / Landline Phone</label>
                    <input
                      type="text"
                      value={contactSecondaryPhone}
                      onChange={(e) => setContactSecondaryPhone(e.target.value)}
                      placeholder="+977 01-4455667"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-slate-400 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-slate-700">General Support Email *</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="info@reddottech.com.np"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-slate-400 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-slate-700">Admissions Desk Email</label>
                    <input
                      type="email"
                      value={admissionsEmail}
                      onChange={(e) => setAdmissionsEmail(e.target.value)}
                      placeholder="admissions@reddottech.com.np"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-slate-400 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-slate-700">WhatsApp Support Number</label>
                    <input
                      type="text"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      placeholder="+977 9801234567"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-slate-400 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Physical Location & Social Media */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                    <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-sm">Location &amp; Office Hours</h3>
                      <p className="text-xs text-slate-500">Physical address and timings</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs font-medium text-slate-700">
                    <div>
                      <label className="block mb-1 text-slate-700">Campus / Office Address *</label>
                      <input
                        type="text"
                        value={officeAddress}
                        onChange={(e) => setOfficeAddress(e.target.value)}
                        placeholder="Tinkune, Kathmandu, Nepal"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-slate-400 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 text-slate-700">Office Working Hours</label>
                      <input
                        type="text"
                        value={officeHours}
                        onChange={(e) => setOfficeHours(e.target.value)}
                        placeholder="Sun - Fri: 9:00 AM - 6:00 PM"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-slate-400 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 text-slate-700">Google Maps Link / URL</label>
                      <input
                        type="text"
                        value={googleMapsUrl}
                        onChange={(e) => setGoogleMapsUrl(e.target.value)}
                        placeholder="https://maps.google.com/..."
                        className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-slate-400 font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                    <div className="h-8 w-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                      <Share2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-sm">Official Social Profiles</h3>
                      <p className="text-xs text-slate-500">Footer and contact page links</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs font-medium text-slate-700">
                    <div>
                      <label className="block mb-1 text-slate-700">Facebook Page URL</label>
                      <input
                        type="text"
                        value={socialFacebook}
                        onChange={(e) => setSocialFacebook(e.target.value)}
                        placeholder="https://facebook.com/..."
                        className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-slate-400 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 text-slate-700">Instagram Profile URL</label>
                      <input
                        type="text"
                        value={socialInstagram}
                        onChange={(e) => setSocialInstagram(e.target.value)}
                        placeholder="https://instagram.com/..."
                        className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-slate-400 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 text-slate-700">LinkedIn Organization URL</label>
                      <input
                        type="text"
                        value={socialLinkedin}
                        onChange={(e) => setSocialLinkedin(e.target.value)}
                        placeholder="https://linkedin.com/company/..."
                        className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-slate-400 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 text-slate-700">TikTok Handle URL</label>
                      <input
                        type="text"
                        value={socialTiktok}
                        onChange={(e) => setSocialTiktok(e.target.value)}
                        placeholder="https://tiktok.com/@..."
                        className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-slate-400 font-medium"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSubmittingContact}
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-5 py-2.5 shadow-xs transition-colors disabled:opacity-60 cursor-pointer"
              >
                <Save className="h-3.5 w-3.5" />
                <span>{isSubmittingContact ? "Saving..." : "Save Contact & Social Info"}</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: Superuser Credentials & Security */}
        {activeTab === "security" && (
          <div className="max-w-2xl bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <KeyRound className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">
                    Administrator Credentials
                  </h3>
                  <p className="text-xs text-slate-500">
                    Manage superuser login email and access password.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowEmailChangeModal(true)}
                className="text-xs font-medium text-blue-600 hover:text-blue-800 underline cursor-pointer"
              >
                Change Email
              </button>
            </div>

            <div className="rounded-lg bg-slate-50 p-4 border border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block">
                  Active Superuser Account
                </span>
                <span className="font-bold text-slate-900 font-mono text-xs sm:text-sm">
                  {activeAdminEmail || "info@reddottech.com.np"}
                </span>
              </div>
              <span className="rounded-md bg-emerald-100 text-emerald-800 px-2.5 py-0.5 text-[11px] font-semibold">
                Verified Superuser
              </span>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4 text-xs font-medium text-slate-700">
              <div>
                <label htmlFor="current_password" className="block mb-1 text-slate-800 font-semibold">
                  Current Password *
                </label>
                <input
                  id="current_password"
                  name="current_password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-slate-400 font-medium"
                />
              </div>

              <div>
                <label htmlFor="new_password" className="block mb-1 text-slate-800 font-semibold">
                  New Secure Password *
                </label>
                <input
                  id="new_password"
                  name="new_password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min. 6 characters)"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-slate-400 font-medium"
                />
              </div>

              <div>
                <label htmlFor="confirm_password" className="block mb-1 text-slate-800 font-semibold">
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
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-slate-400 font-medium"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1.5 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  <span>{showPassword ? "Hide Passwords" : "Show Passwords"}</span>
                </button>

                <button
                  type="submit"
                  disabled={isChangingPassword}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-5 py-2.5 shadow-xs transition-colors disabled:opacity-60 cursor-pointer"
                >
                  <Lock className="h-3.5 w-3.5" />
                  <span>{isChangingPassword ? "Updating..." : "Update Password"}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Change Superuser Email Modal */}
      {showEmailChangeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-xl p-6 space-y-4 animate-fade-in-up">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-semibold text-base text-slate-900">Change Superuser Email</h3>
                <p className="text-xs text-slate-500">Update your primary administrative login address</p>
              </div>
            </div>

            <form onSubmit={handleChangeAdminEmail} className="space-y-4 text-xs font-medium text-slate-700">
              <div>
                <label className="block text-slate-700 mb-1">New Superuser Email *</label>
                <input
                  type="email"
                  required
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  placeholder="e.g. director@reddottech.com.np"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-slate-400 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Current Password (Identity Verification) *</label>
                <input
                  type="password"
                  required
                  value={emailAuthPassword}
                  onChange={(e) => setEmailAuthPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-slate-400 font-medium"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowEmailChangeModal(false)}
                  className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-2 text-xs font-medium text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isChangingEmail}
                  className="rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-4 py-2 shadow-xs disabled:opacity-60 cursor-pointer"
                >
                  {isChangingEmail ? "Updating..." : "Update Email"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
