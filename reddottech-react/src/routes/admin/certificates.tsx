import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState, useEffect, useMemo } from "react";
import {
  Award,
  Trash2,
  ShieldCheck,
  Eye,
  Plus,
  X,
  CheckCircle2,
  Search,
  Download,
  School,
  Mail,
  Calendar,
  Sparkles,
  ExternalLink,
  Copy,
} from "lucide-react";
import { toast } from "sonner";
import { getCertificates, claimCertificate, deleteCertificate } from "@/lib/api";
import { requireAdminRoute } from "@/lib/auth";

export const Route = createFileRoute("/admin/certificates")({
  beforeLoad: requireAdminRoute,
  head: () => ({
    meta: [{ title: "Certificates Hub | Red Dot Admin" }],
  }),
  component: AdminCertificatesPage,
});

function AdminCertificatesPage() {
  const [certs, setCerts] = useState<any[]>([]);
  const [selectedCert, setSelectedCert] = useState<any | null>(null);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [newCertName, setNewCertName] = useState("");
  const [newCertEmail, setNewCertEmail] = useState("");
  const [newCertSchool, setNewCertSchool] = useState("BCS");
  const [newCertCourse, setNewCertCourse] = useState("PECP - Professional Executive Certificate");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadCertificates = async () => {
    const data = await getCertificates();
    if (data) setCerts(data);
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  const filteredCerts = useMemo(() => {
    return certs.filter((cert) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        (cert.name && cert.name.toLowerCase().includes(q)) ||
        (cert.email && cert.email.toLowerCase().includes(q)) ||
        (cert.school && cert.school.toLowerCase().includes(q)) ||
        (cert.certificate_id && cert.certificate_id.toLowerCase().includes(q)) ||
        (cert.code && cert.code.toLowerCase().includes(q))
      );
    });
  }, [certs, searchQuery]);

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
      toast.success(`Official Certificate issued for ${newCertName}!`);
      setShowIssueModal(false);
      setNewCertName("");
      setNewCertEmail("");
      setNewCertSchool("BCS");
      loadCertificates();
    } catch (err) {
      toast.error("Failed to issue certificate in database.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number | string) => {
    if (confirm("Delete this certificate record from SQLite database?")) {
      try {
        await deleteCertificate(id);
        setCerts((prev) => prev.filter((c) => String(c.id) !== String(id)));
        toast.success("Certificate record removed.");
      } catch (err) {
        toast.error("Failed to remove certificate.");
      }
    }
  };

  const handleExportCSV = () => {
    if (certs.length === 0) {
      toast.error("No certificate data to export.");
      return;
    }
    const headers = ["ID", "Student Name", "Email", "Institution", "Certificate Code", "Issued Date"];
    const rows = certs.map((c) => [
      c.id,
      `"${c.name || ""}"`,
      `"${c.email || ""}"`,
      `"${c.school || ""}"`,
      `"${c.certificate_id || c.code || ""}"`,
      `"${c.created_at || ""}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `reddot_certificates_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Certificate registry exported as CSV!");
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`Copied code: ${code}`);
  };

  return (
    <AdminLayout
      title="Certificates"
      subtitle="Issue, verify, and manage student course completion certificates."
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
            onClick={() => setShowIssueModal(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand-red hover:bg-red-700 text-white font-bold text-xs px-4 py-2 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Issue Certificate</span>
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student name, email, school, or certificate code..."
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
            <span>Total Issued: <strong className="text-slate-900">{certs.length}</strong></span>
          </div>
        </div>

        {/* Certificates Data Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Student Credential</th>
                  <th className="py-4 px-6">Institution / Cohort</th>
                  <th className="py-4 px-6">Verification Code</th>
                  <th className="py-4 px-6">Issued Date</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {filteredCerts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400 font-medium">
                      No certificate records found in SQLite database.
                    </td>
                  </tr>
                ) : (
                  filteredCerts.map((cert) => {
                    const certCode = cert.certificate_id || cert.code || `PECP-${cert.id}`;
                    return (
                      <tr key={cert.id} className="hover:bg-slate-50/70 transition-colors group">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold shrink-0">
                              <Award className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-900 text-sm group-hover:text-brand-red transition-colors">
                                {cert.name}
                              </h4>
                              <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                                <Mail className="h-3 w-3" /> {cert.email}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-6 font-semibold text-slate-800">
                          <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[11px]">
                            <School className="h-3.5 w-3.5 text-slate-500" />
                            <span>{cert.school || "BCS / Red Dot"}</span>
                          </div>
                        </td>

                        <td className="py-4 px-6">
                          <div className="inline-flex items-center gap-1.5 rounded-xl bg-slate-50 border border-slate-200 px-3 py-1 font-mono text-[11px] text-slate-800 font-bold">
                            <span>{certCode}</span>
                            <button
                              onClick={() => copyCode(certCode)}
                              className="text-slate-400 hover:text-slate-700 cursor-pointer"
                              title="Copy Certificate Code"
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                          </div>
                        </td>

                        <td className="py-4 px-6 text-slate-500 font-mono text-[11px]">
                          {cert.created_at || "Verified"}
                        </td>

                        <td className="py-4 px-6 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => setSelectedCert(cert)}
                              className="inline-flex items-center gap-1 rounded-xl bg-slate-900 hover:bg-brand-red text-white px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer shadow-xs"
                              title="Inspect &amp; Preview Certificate"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>Preview</span>
                            </button>

                            <button
                              onClick={() => handleDelete(cert.id)}
                              className="rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 p-2 transition-colors cursor-pointer"
                              title="Revoke / Delete Record"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Issue Certificate Modal */}
      {showIssueModal && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden border border-slate-200">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/70">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold shadow-xs">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">Issue New Certificate</h3>
                  <p className="text-xs text-slate-500">Record a verified student completion badge.</p>
                </div>
              </div>
              <button
                onClick={() => setShowIssueModal(false)}
                className="rounded-full bg-slate-200/70 p-1.5 text-slate-600 hover:bg-slate-300 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleIssueCert} className="p-6 space-y-4 text-xs font-semibold text-slate-700">
              <div>
                <label htmlFor="student_name" className="block mb-1.5">Student Full Name *</label>
                <input
                  id="student_name"
                  name="student_name"
                  type="text"
                  required
                  value={newCertName}
                  onChange={(e) => setNewCertName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="student_email" className="block mb-1.5">Student Email *</label>
                <input
                  id="student_email"
                  name="student_email"
                  type="email"
                  required
                  value={newCertEmail}
                  onChange={(e) => setNewCertEmail(e.target.value)}
                  placeholder="e.g. student@example.com"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="student_school" className="block mb-1.5">Institution / Cohort / School</label>
                <input
                  id="student_school"
                  name="student_school"
                  type="text"
                  value={newCertSchool}
                  onChange={(e) => setNewCertSchool(e.target.value)}
                  placeholder="e.g. BCS, Kathmandu University, Apex College"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="program_track" className="block mb-1.5">Program Track</label>
                <input
                  id="program_track"
                  name="program_track"
                  type="text"
                  value={newCertCourse}
                  onChange={(e) => setNewCertCourse(e.target.value)}
                  placeholder="e.g. PECP Professional Certification"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
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
                  className="rounded-xl bg-brand-red hover:bg-red-700 text-white font-extrabold text-xs px-6 py-2.5 shadow-md disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? "Issuing..." : "Issue & Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Certificate Visual Preview Modal */}
      {selectedCert && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl overflow-hidden border border-slate-200 p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <h3 className="font-extrabold text-slate-900 text-base">Verified Credential Record</h3>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="rounded-full bg-slate-100 p-1.5 text-slate-500 hover:bg-slate-200 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Credential Parchment Frame */}
            <div className="rounded-2xl border-4 border-double border-amber-200 bg-gradient-to-b from-amber-50/40 via-white to-amber-50/40 p-8 text-center space-y-4 shadow-inner relative">
              <div className="inline-flex items-center gap-2 text-brand-red font-black text-xs tracking-widest uppercase">
                <span className="h-2 w-2 rounded-full bg-brand-red animate-ping" />
                Red Dot Technologies • Official Credential
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Certificate of Professional Completion
              </h2>

              <p className="text-xs text-slate-500 font-medium">This is officially certified to</p>

              <p className="text-2xl sm:text-3xl font-black text-slate-900 font-serif border-b border-slate-300 pb-2 inline-block px-8">
                {selectedCert.name}
              </p>

              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                For successfully fulfilling all academic, project assessment, and professional requirements for the cohort program at <strong>{selectedCert.school || "Red Dot Academy"}</strong>.
              </p>

              <div className="pt-4 flex items-center justify-between border-t border-amber-200/80 text-[11px] text-slate-500 font-mono">
                <span>Code: <strong className="text-slate-900">{selectedCert.certificate_id || selectedCert.code || `PECP-${selectedCert.id}`}</strong></span>
                <span>Date: {selectedCert.created_at || "Verified"}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedCert(null)}
                className="rounded-xl bg-slate-900 text-white font-bold text-xs px-6 py-2.5 hover:bg-slate-800 cursor-pointer"
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
