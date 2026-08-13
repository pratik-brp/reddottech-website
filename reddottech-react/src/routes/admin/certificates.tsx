import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState, useEffect } from "react";
import { Award, Trash2, ShieldCheck, Eye, Plus, X, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { getCertificates, claimCertificate, deleteCertificate } from "@/lib/api";

export const Route = createFileRoute("/admin/certificates")({
  head: () => ({
    meta: [{ title: "Certificates Management | Red Dot Admin" }],
  }),
  component: AdminCertificatesPage,
});

function AdminCertificatesPage() {
  const [certs, setCerts] = useState<any[]>([]);
  const [selectedCert, setSelectedCert] = useState<any | null>(null);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [newCertName, setNewCertName] = useState("");
  const [newCertEmail, setNewCertEmail] = useState("");
  const [newCertSchool, setNewCertSchool] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadCertificates = async () => {
    const data = await getCertificates();
    if (data) {
      setCerts(data);
    }
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  const handleIssueCert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertName || !newCertEmail) {
      toast.error("Student Name and Email are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      await claimCertificate({
        name: newCertName,
        email: newCertEmail,
        school: newCertSchool || "BCS",
      });
      toast.success(`Certificate issued for ${newCertName} and saved to SQLite!`);
      setShowIssueModal(false);
      setNewCertName("");
      setNewCertEmail("");
      setNewCertSchool("");
      loadCertificates();
    } catch (err) {
      toast.error("Failed to issue certificate in database.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number | string) => {
    if (confirm("Delete this certificate record from database?")) {
      try {
        await deleteCertificate(id);
        setCerts((prev) => prev.filter((c) => String(c.id) !== String(id)));
        toast.success("Certificate record removed from SQLite database.");
      } catch (err) {
        toast.error("Failed to remove certificate record from database.");
      }
    }
  };

  return (
    <AdminLayout title="AI Unlocked &amp; PECP Certificates">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Certificates Control Hub</h2>
            <p className="text-xs text-slate-500">
              Manage, preview, issue, and verify student AI Unlocked certificate records in SQLite DB.
            </p>
          </div>
          <button
            onClick={() => setShowIssueModal(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand-red)] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-red-700 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Issue Certificate
          </button>
        </div>

        {/* Certificates Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-6">Recipient Name</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">School / Institution</th>
                <th className="py-3.5 px-4">Completion Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {certs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                    No certificate records found in SQLite database.
                  </td>
                </tr>
              ) : (
                certs.map((cert) => (
                  <tr key={cert.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900 flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-amber-50 text-amber-600 font-bold flex items-center justify-center text-xs shrink-0">
                        <Award className="h-4 w-4" />
                      </div>
                      <span>{cert.name}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-600 font-medium">{cert.email}</td>
                    <td className="py-4 px-4 text-slate-600">{cert.school || "Not specified"}</td>
                    <td className="py-4 px-4 text-slate-600 font-semibold">
                      {cert.completed_at || cert.completedDate || "2026-07-23"}
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200 uppercase">
                        <ShieldCheck className="h-3 w-3" />
                        Verified
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => setSelectedCert(cert)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer"
                        title="Preview Official Certificate"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(cert.id)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-[var(--brand-red)] hover:bg-red-100 transition-colors cursor-pointer"
                        title="Delete Record"
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

      {/* Issue Certificate Modal */}
      {showIssueModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-500" />
                Issue AI Unlocked Certificate
              </h3>
              <button
                onClick={() => setShowIssueModal(false)}
                className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleIssueCert} className="space-y-4 text-xs font-semibold text-slate-700">
              <div>
                <label className="block mb-1 font-bold">Student Name *</label>
                <input
                  type="text"
                  required
                  value={newCertName}
                  onChange={(e) => setNewCertName(e.target.value)}
                  placeholder="e.g. Pratik Chaudhary"
                  className="w-full rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:border-brand-red focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 font-bold">Student Email *</label>
                <input
                  type="email"
                  required
                  value={newCertEmail}
                  onChange={(e) => setNewCertEmail(e.target.value)}
                  placeholder="e.g. pratik@example.com"
                  className="w-full rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:border-brand-red focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 font-bold">School / College / Organization</label>
                <input
                  type="text"
                  value={newCertSchool}
                  onChange={(e) => setNewCertSchool(e.target.value)}
                  placeholder="e.g. Tribhuvan University / BCS"
                  className="w-full rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:border-brand-red focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowIssueModal(false)}
                  className="rounded-xl border border-slate-300 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand-red)] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-red-700 transition-all cursor-pointer"
                >
                  <Award className="h-4 w-4" />
                  <span>{isSubmitting ? "Issuing..." : "Issue & Save to DB"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Official Certificate Preview Modal matching PHP private/certificates/show.blade.php */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl space-y-6 max-h-[95vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">Official Certificate Preview</h3>
                <p className="text-xs text-slate-500">
                  Recipient: <strong className="text-slate-900">{selectedCert.name}</strong> ({selectedCert.email})
                </p>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Certificate Box styled exactly after PHP show.blade.php */}
            <div className="rounded-xl border-[12px] border-[#16264A] p-8 sm:p-12 text-center relative bg-white shadow-xl max-w-2xl mx-auto">
              <div className="absolute inset-3 border-2 border-brand-red pointer-events-none" />
              <img
                src="/images/logo.png"
                alt="Red Dot Technologies"
                className="h-12 w-auto mx-auto mb-4 object-contain"
                onError={(e) => ((e.target as HTMLElement).style.display = "none")}
              />
              <div className="text-[11px] font-black uppercase tracking-[0.25em] text-brand-red mb-1">
                Certificate of Completion
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#16264A] font-bold my-2">
                AI Unlocked
              </h2>
              <div className="text-brand-red font-extrabold text-xs tracking-wider uppercase mb-4">
                HANDS-ON AI LITERACY · 5 LESSONS
              </div>
              <div className="text-slate-500 text-xs my-2 font-medium">This certifies that</div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3864] border-b-2 border-slate-200 inline-block px-8 pb-1 mb-4">
                {selectedCert.name}
              </div>
              <p className="text-slate-700 text-xs max-w-lg mx-auto leading-relaxed mb-8">
                has successfully completed all five lessons of <strong>AI Unlocked</strong>, demonstrating practical skills in understanding, using, creating with, and responsibly navigating artificial intelligence.
              </p>
              <div className="flex justify-between items-end text-[11px] text-slate-500 pt-4 border-t border-slate-200">
                <div className="text-left leading-tight">
                  <strong className="text-[#16264A] block font-bold">Red Dot Technologies Pvt. Ltd.</strong>
                  Baluwatar, Kathmandu, Nepal
                </div>
                <div className="text-right leading-tight">
                  <strong className="text-[#16264A] block font-bold">
                    {selectedCert.completed_at || selectedCert.completedDate || "2026-07-23"}
                  </strong>
                  Date of completion
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedCert(null)}
                className="rounded-xl bg-slate-900 px-6 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-all cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
