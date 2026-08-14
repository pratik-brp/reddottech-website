import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState, useEffect, useMemo } from "react";
import {
  Trash2,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Search,
  Download,
  Copy,
  ExternalLink,
  User,
  X,
  Reply,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { getContacts, deleteContact } from "@/lib/api";
import { requireAdminRoute } from "@/lib/auth";

export const Route = createFileRoute("/admin/contacts")({
  beforeLoad: requireAdminRoute,
  head: () => ({
    meta: [{ title: "Inquiries & Leads | Red Dot Admin" }],
  }),
  component: AdminContactsPage,
});

function AdminContactsPage() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [activeMessage, setActiveMessage] = useState<any | null>(null);

  const loadContacts = async () => {
    const data = await getContacts();
    if (data) setContacts(data);
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const subjects = useMemo(() => {
    const set = new Set<string>();
    contacts.forEach((c) => {
      if (c.subject) set.add(c.subject);
    });
    return Array.from(set);
  }, [contacts]);

  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      const matchesSearch =
        !searchQuery ||
        (c.first_name && c.first_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (c.last_name && c.last_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (c.email && c.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (c.phone && c.phone.includes(searchQuery)) ||
        (c.message && c.message.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesSubject =
        selectedSubject === "all" || (c.subject && c.subject.toLowerCase() === selectedSubject.toLowerCase());

      return matchesSearch && matchesSubject;
    });
  }, [contacts, searchQuery, selectedSubject]);

  const handleDelete = async (id: number | string) => {
    if (confirm("Delete this contact inquiry from SQLite database?")) {
      try {
        await deleteContact(id);
        setContacts((prev) => prev.filter((c) => String(c.id) !== String(id)));
        if (activeMessage && String(activeMessage.id) === String(id)) {
          setActiveMessage(null);
        }
        toast.success("Contact entry removed.");
      } catch (err) {
        toast.error("Failed to delete contact.");
      }
    }
  };

  const handleExportCSV = () => {
    if (contacts.length === 0) {
      toast.error("No inquiries to export.");
      return;
    }
    const headers = ["ID", "First Name", "Last Name", "Email", "Phone", "Subject", "Message", "Date"];
    const rows = contacts.map((c) => [
      c.id,
      `"${c.first_name || ""}"`,
      `"${c.last_name || ""}"`,
      `"${c.email || ""}"`,
      `"${c.phone || ""}"`,
      `"${c.subject || ""}"`,
      `"${(c.message || "").replace(/"/g, '""')}"`,
      `"${c.created_at || ""}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `reddot_inquiries_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Inquiries exported as CSV!");
  };

  const copyDetails = (contact: any) => {
    const text = `Name: ${contact.first_name} ${contact.last_name || ""}\nEmail: ${contact.email}\nPhone: ${contact.phone || "N/A"}\nSubject: ${contact.subject || "General"}\nMessage:\n${contact.message}`;
    navigator.clipboard.writeText(text);
    toast.success("Contact details copied to clipboard!");
  };

  return (
    <AdminLayout
      title="Contact Inquiries"
      subtitle="Inbound messages and inquiries from the website contact form."
      actions={
        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs px-3.5 py-2 shadow-xs transition-colors cursor-pointer"
        >
          <Download className="h-4 w-4 text-slate-500" />
          <span>Export CSV</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* Search and Filters Toolbar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search leads by name, email, phone, or keyword..."
                className="w-full rounded-2xl border border-slate-200 pl-10 pr-4 py-2 text-xs font-semibold text-slate-800 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
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

            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="appearance-none rounded-2xl border border-slate-200 pl-3.5 pr-8 py-2 text-xs font-semibold text-slate-700 bg-slate-50/70 hover:border-slate-300 focus:bg-white focus:border-brand-red focus:outline-none cursor-pointer"
            >
              <option value="all">All Topics</option>
              {subjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          <span className="text-xs text-slate-500 font-semibold text-right sm:text-left">
            Total Leads: <strong className="text-slate-900">{contacts.length}</strong>
          </span>
        </div>

        {/* Inquiries Stream Grid */}
        <div className="space-y-4">
          {filteredContacts.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 border border-slate-200 text-center text-slate-400 font-medium text-xs">
              No inquiries found matching your filters.
            </div>
          ) : (
            filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-brand-red transition-colors">
                          {contact.first_name} {contact.last_name || ""}
                        </h3>
                        <span className="rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 px-2.5 py-0.5 text-[10px] font-bold">
                          {contact.subject || "General Inquiry"}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {contact.created_at || "Recent"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${contact.email}?subject=Re: ${encodeURIComponent(contact.subject || "Red Dot Inquiry")}`}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-brand-red text-white px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer shadow-xs"
                    >
                      <Reply className="h-3.5 w-3.5" />
                      <span>Reply</span>
                    </a>

                    <button
                      onClick={() => copyDetails(contact)}
                      className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Copy Full Details"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>

                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 p-2 transition-colors cursor-pointer"
                      title="Delete Submission"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Email & Phone Tags */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
                  <a
                    href={`mailto:${contact.email}`}
                    className="inline-flex items-center gap-1.5 hover:text-blue-600 font-mono transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5 text-blue-500" />
                    <span>{contact.email}</span>
                  </a>

                  {contact.phone && (
                    <a
                      href={`tel:${contact.phone}`}
                      className="inline-flex items-center gap-1.5 hover:text-emerald-600 font-mono transition-colors"
                    >
                      <Phone className="h-3.5 w-3.5 text-emerald-500" />
                      <span>{contact.phone}</span>
                    </a>
                  )}
                </div>

                {/* Message Body */}
                <div className="rounded-2xl bg-slate-50/80 p-4 border border-slate-100 text-xs text-slate-800 leading-relaxed">
                  <p className="whitespace-pre-wrap">{contact.message || "No message content provided."}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
