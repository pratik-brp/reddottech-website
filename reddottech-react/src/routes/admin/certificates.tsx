import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState } from "react";
import { Award, CheckCircle, Trash2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/certificates")({
  head: () => ({
    meta: [{ title: "Certificates Management | RedDot Admin" }],
  }),
  component: AdminCertificatesPage,
});

const mockCertificates = [
  {
    id: 1,
    studentName: "Prashant Karki",
    email: "prashant.karki@example.com",
    courseName: "Artificial Intelligence & Machine Learning Certification",
    certId: "PECP-2025-AI-018",
    completedDate: "2025-10-28",
    status: "verified",
  },
  {
    id: 2,
    studentName: "Bishal Regmi",
    email: "bishal.regmi@example.com",
    courseName: "Six Sigma: Total Quality Applications",
    certId: "PECP-2025-SS-004",
    completedDate: "2025-11-05",
    status: "verified",
  },
  {
    id: 3,
    studentName: "Sabina Maharjan",
    email: "sabina.m@example.com",
    courseName: "Fundamentals of Supervision and Management",
    certId: "PECP-2025-MG-012",
    completedDate: "2026-02-14",
    status: "pending",
  },
];

function AdminCertificatesPage() {
  const [certs, setCerts] = useState(mockCertificates);

  const handleApprove = (id: number) => {
    setCerts(certs.map((c) => (c.id === id ? { ...c, status: "verified" } : c)));
    toast.success("Certificate request verified and approved!");
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this certificate entry?")) {
      setCerts(certs.filter((c) => c.id !== id));
      toast.success("Certificate record removed.");
    }
  };

  return (
    <AdminLayout title="Digital Certificates Management">
      <div className="space-y-6">
        <p className="text-xs text-slate-500">
          Issued credentials and student digital certificate claim verification requests.
        </p>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-6">Student Name</th>
                <th className="py-3.5 px-4">Course Program</th>
                <th className="py-3.5 px-4">Certificate ID</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {certs.map((cert) => (
                <tr key={cert.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900">
                    <div>
                      <span>{cert.studentName}</span>
                      <span className="block text-[11px] font-normal text-slate-400">
                        {cert.email}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-700 font-medium">{cert.courseName}</td>
                  <td className="py-4 px-4 font-mono font-bold text-[var(--brand-red)]">
                    {cert.certId}
                  </td>
                  <td className="py-4 px-4 text-slate-500">{cert.completedDate}</td>
                  <td className="py-4 px-4">
                    {cert.status === "verified" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                        <ShieldCheck className="h-3 w-3" />
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-700">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    {cert.status !== "verified" && (
                      <button
                        onClick={() => handleApprove(cert.id)}
                        className="inline-flex h-8 px-3 items-center gap-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 transition-colors"
                      >
                        <CheckCircle className="h-3.5 w-3.5" />
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(cert.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-[var(--brand-red)] hover:bg-red-100 transition-colors"
                      title="Delete Record"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
