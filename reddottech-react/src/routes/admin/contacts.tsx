import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState, useEffect } from "react";
import { Trash2, Mail, Phone, Calendar, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { getContacts, deleteContact } from "@/lib/api";

export const Route = createFileRoute("/admin/contacts")({
  head: () => ({
    meta: [{ title: "Contact Submissions | Red Dot Admin" }],
  }),
  component: AdminContactsPage,
});

function AdminContactsPage() {
  const [contacts, setContacts] = useState<any[]>([]);

  const loadContacts = async () => {
    const data = await getContacts();
    if (data) {
      setContacts(data);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleDelete = async (id: number | string) => {
    if (confirm("Delete this contact inquiry submission from SQLite database?")) {
      try {
        await deleteContact(id);
        setContacts((prev) => prev.filter((c) => String(c.id) !== String(id)));
        toast.success("Contact entry deleted from database.");
      } catch (err) {
        toast.error("Failed to delete contact entry from database.");
      }
    }
  };

  return (
    <AdminLayout title="Contact Submissions &amp; Leads">
      <div className="space-y-6">
        <p className="text-xs text-slate-500">
          Inbound student and corporate inquiries submitted via the website contact form (Stored in SQLite DB).
        </p>

        <div className="space-y-4">
          {contacts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center text-slate-400 font-medium text-xs">
              No contact submissions found in database.
            </div>
          ) : (
            contacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="font-bold text-sm text-[#0F172A]">
                      {contact.subject || "General Contact Inquiry"}
                    </h3>
                    <p className="text-xs font-semibold text-slate-700">
                      {contact.first_name} {contact.last_name || ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {contact.created_at || "2026-07-28"}
                    </span>
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="rounded-lg bg-red-50 p-2 text-[var(--brand-red)] hover:bg-red-100 transition-colors cursor-pointer"
                      title="Delete Submission"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Mail className="h-3.5 w-3.5 text-blue-600" />
                    {contact.email}
                  </span>
                  {contact.phone && (
                    <span className="flex items-center gap-1.5 font-medium">
                      <Phone className="h-3.5 w-3.5 text-emerald-600" />
                      {contact.phone}
                    </span>
                  )}
                </div>

                <div className="rounded-xl bg-slate-50 p-4 text-xs text-slate-700 leading-relaxed border border-slate-100 flex items-start gap-2">
                  <MessageSquare className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                  <p>{contact.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
