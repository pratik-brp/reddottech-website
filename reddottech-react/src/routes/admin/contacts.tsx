import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState } from "react";
import { Trash2, Mail, Phone, Calendar } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/contacts")({
  head: () => ({
    meta: [{ title: "Contact Submissions | RedDot Admin" }],
  }),
  component: AdminContactsPage,
});

const mockContacts = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "9841234567",
    subject: "PECP AI & ML Enrollment Query",
    message:
      "I would like to inquire about the next batch start date for the AI & Machine Learning certification program with USC Upstate.",
    date: "2026-07-28",
  },
  {
    id: 2,
    name: "Sunita Shrestha",
    email: "sunita.s@example.com",
    phone: "9801987654",
    subject: "Corporate Business Analytics Training",
    message:
      "We are interested in conducting custom Power BI & SQL training for our team of 15 data analysts.",
    date: "2026-07-25",
  },
  {
    id: 3,
    name: "Rohan Thapa",
    email: "rohan.thapa@example.com",
    phone: "9851098765",
    subject: "Project Management PMP Workshop",
    message:
      "Does the PMP Prep course include official PMI contact hours certificate upon completion?",
    date: "2026-07-20",
  },
];

function AdminContactsPage() {
  const [contacts, setContacts] = useState(mockContacts);

  const handleDelete = (id: number) => {
    if (confirm("Delete this contact inquiry submission?")) {
      setContacts(contacts.filter((c) => c.id !== id));
      toast.success("Contact entry deleted.");
    }
  };

  return (
    <AdminLayout title="Contact Submissions">
      <div className="space-y-6">
        <p className="text-xs text-slate-500">
          Inbound student and corporate inquiries submitted via the website contact form.
        </p>

        <div className="space-y-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-sm text-[#0F172A]">{contact.subject}</h3>
                  <p className="text-xs text-slate-500">{contact.name}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {contact.date}
                  </span>
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="h-8 w-8 rounded-lg bg-red-50 text-[var(--brand-red)] flex items-center justify-center hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                "{contact.message}"
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-1 text-xs font-medium text-slate-500">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-1.5 hover:text-[var(--brand-red)]"
                >
                  <Mail className="h-3.5 w-3.5" />
                  {contact.email}
                </a>
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-1.5 hover:text-[var(--brand-red)]"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {contact.phone}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
