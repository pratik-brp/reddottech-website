import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState } from "react";
import { Trash2, Download, Bell } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/subscriptions")({
  head: () => ({
    meta: [{ title: "Newsletter Subscriptions | RedDot Admin" }],
  }),
  component: AdminSubscriptionsPage,
});

const mockSubscriptions = [
  { id: 1, email: "student.one@example.com", date: "2026-07-29" },
  { id: 2, email: "tech.enthusiast@domain.com", date: "2026-07-27" },
  { id: 3, email: "manager.lead@corp.np", date: "2026-07-24" },
  { id: 4, email: "anita.gurung@mail.com", date: "2026-07-22" },
];

function AdminSubscriptionsPage() {
  const [subs, setSubs] = useState(mockSubscriptions);

  const handleDelete = (id: number) => {
    if (confirm("Delete this newsletter subscriber?")) {
      setSubs(subs.filter((s) => s.id !== id));
      toast.success("Subscriber removed.");
    }
  };

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8,ID,Email,SubscribedDate\n" +
      subs.map((s) => `${s.id},${s.email},${s.date}`).join("\n");
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
            Subscribers who opted in for tech course announcements and workshops.
          </p>
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-black transition-all"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
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
              {subs.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-800 flex items-center gap-2">
                    <Bell className="h-3.5 w-3.5 text-purple-600" />
                    {sub.email}
                  </td>
                  <td className="py-4 px-4 text-slate-500 font-medium">{sub.date}</td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleDelete(sub.id)}
                      className="h-8 w-8 rounded-lg bg-red-50 text-[var(--brand-red)] inline-flex items-center justify-center hover:bg-red-100 transition-colors"
                      title="Remove Subscriber"
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
