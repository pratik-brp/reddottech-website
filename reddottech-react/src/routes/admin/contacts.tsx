import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState, useEffect, useMemo } from "react";
import { Trash2, Mail, Calendar, Search, Download, Copy, User, X, Reply } from "lucide-react";
import { toast } from "sonner";
import { getContacts, deleteContact } from "@/lib/api";
import { requireAdminRoute } from "@/lib/auth";
import { BrandSpinner } from "@/components/ui/BrandSpinner";

export const Route = createFileRoute("/admin/contacts")({
  beforeLoad: requireAdminRoute,
  head: () => ({
    meta: [{ title: "Inquiries & Leads | Red Dot Admin" }],
  }),
  component: AdminContactsPage,
});

function AdminContactsPage() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [activeMessage, setActiveMessage] = useState<any | null>(null);

  const loadContacts = async () => {
    setIsLoading(true);
    try {
      const data = await getContacts();
      if (data && Array.isArray(data)) setContacts(data);
    } catch {
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
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
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        (c.first_name && c.first_name.toLowerCase().includes(q)) ||
        (c.last_name && c.last_name.toLowerCase().includes(q)) ||
        (c.email && c.email.toLowerCase().includes(q)) ||
        (c.phone && c.phone.includes(searchQuery)) ||
        (c.message && c.message.toLowerCase().includes(q));

      const matchesSubject =
        selectedSubject === "all" ||
        (c.subject && c.subject.toLowerCase() === selectedSubject.toLowerCase());

      return matchesSearch && matchesSubject;
    });
  }, [contacts, searchQuery, selectedSubject]);

  const handleDelete = async (id: number | string) => {
    if (confirm("Are you sure you want to delete this inquiry?")) {
      try {
        await deleteContact(id);
        setContacts((prev) => prev.filter((c) => String(c.id) !== String(id)));
        if (activeMessage && String(activeMessage.id) === String(id)) {
          setActiveMessage(null);
        }
        toast.info("Inquiry removed.");
      } catch (err) {
        toast.error("Failed to delete inquiry.");
      }
    }
  };

  const handleExportCSV = () => {
    if (contacts.length === 0) {
      toast.error("No inquiries to export.");
      return;
    }
    const headers = [
      "ID",
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "Subject",
      "Message",
      "Date",
    ];
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
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `reddot_inquiries_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Inquiries exported as CSV");
  };

  const copyDetails = (contact: any) => {
    const text = `Name: ${contact.first_name} ${contact.last_name || ""}\nEmail: ${contact.email}\nPhone: ${contact.phone || "N/A"}\nSubject: ${contact.subject || "General"}\nMessage:\n${contact.message}`;
    navigator.clipboard.writeText(text);
    toast.success("Contact details copied to clipboard");
  };

  // Metrics
  const totalCount = contacts.length;
  const recentCount = useMemo(() => {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return contacts.filter((c) => {
      if (!c.created_at) return false;
      const t = new Date(c.created_at).getTime();
      return !isNaN(t) && t >= sevenDaysAgo;
    }).length;
  }, [contacts]);

  return (
    <AdminLayout
      title="Contact Inquiries"
      mobileTitle="Inquiries"
      subtitle="Review and manage inbound inquiries and student communication from the website."
      actions={
        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs px-3 py-2 shadow-xs transition-colors cursor-pointer"
          title="Export CSV"
        >
          <Download className="h-3.5 w-3.5 text-slate-500" />
          <span>Export CSV</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* ── Top Metric Summary ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Total Inquiries</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold tracking-tight text-slate-900">
                  {totalCount}
                </span>
                <span className="text-[11px] text-slate-400 font-normal">All time</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200/80">
              <Mail className="h-5 w-5" />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Recent Leads (7 Days)</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold tracking-tight text-slate-900">
                  {recentCount}
                </span>
                {recentCount > 0 && (
                  <span className="inline-flex items-center text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    New activity
                  </span>
                )}
              </div>
            </div>
            <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200/60">
              <Calendar className="h-5 w-5" />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Inquiry Topics</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold tracking-tight text-slate-900">
                  {subjects.length}
                </span>
                <span className="text-[11px] text-slate-400 font-normal">Categories</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200/60">
              <User className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* ── Table & Search Toolbar ── */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold text-sm text-slate-900">Inbound Messages</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {filteredContacts.length} {filteredContacts.length === 1 ? "inquiry" : "inquiries"}{" "}
                found
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
              {/* Search input */}
              <div className="relative flex-1 sm:w-64">
                <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name, email, keyword..."
                  className="w-full pl-8 pr-8 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-slate-400 font-medium"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Subject Filter */}
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="rounded-lg border border-slate-200 bg-slate-50/50 px-2.5 py-1.5 text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="all">All Topics</option>
                {subjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50/60 text-[11px] font-semibold text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="px-5 py-3">Sender</th>
                  <th className="px-4 py-3">Topic / Subject</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Message Snippet</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-normal">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center">
                      <div className="flex items-center justify-center">
                        <BrandSpinner size="sm" message="Loading inquiries..." />
                      </div>
                    </td>
                  </tr>
                ) : filteredContacts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-slate-400 text-xs">
                      No contact inquiries match your filters.
                    </td>
                  </tr>
                ) : (
                  filteredContacts.map((contact) => (
                    <tr
                      key={contact.id}
                      className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                      onClick={() => setActiveMessage(contact)}
                    >
                      {/* Sender */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200/80 text-slate-700 font-semibold text-xs flex items-center justify-center shrink-0">
                            {contact.first_name ? contact.first_name.charAt(0).toUpperCase() : "U"}
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-slate-900 truncate">
                              {contact.first_name} {contact.last_name || ""}
                            </div>
                            <div className="text-[11px] text-slate-500 truncate">
                              {contact.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Subject */}
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center rounded-md bg-slate-100 text-slate-700 border border-slate-200/60 px-2 py-0.5 text-[11px] font-medium max-w-[160px] truncate">
                          {contact.subject || "General Inquiry"}
                        </span>
                      </td>

                      {/* Phone */}
                      <td className="px-4 py-3.5">
                        {contact.phone ? (
                          <span className="font-mono text-[11px] text-slate-700">
                            {contact.phone}
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400">—</span>
                        )}
                      </td>

                      {/* Message Preview */}
                      <td className="px-4 py-3.5 max-w-xs">
                        <p className="text-xs text-slate-600 truncate">
                          {contact.message || "No content."}
                        </p>
                      </td>

                      {/* Date */}
                      <td className="px-4 py-3.5 text-[11px] text-slate-500 whitespace-nowrap">
                        {contact.created_at ? contact.created_at.split(" ")[0] : "Recent"}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`mailto:${contact.email}?subject=Re: ${encodeURIComponent(
                              contact.subject || "Red Dot Inquiry",
                            )}`}
                            className="p-1.5 rounded-md border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                            title="Reply via email"
                          >
                            <Reply className="h-3.5 w-3.5" />
                          </a>

                          <button
                            type="button"
                            onClick={() => copyDetails(contact)}
                            className="p-1.5 rounded-md border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                            title="Copy details"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(contact.id)}
                            className="p-1.5 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete inquiry"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="block md:hidden divide-y divide-slate-100">
            {isLoading ? (
              <div className="p-8 text-center flex items-center justify-center">
                <BrandSpinner size="sm" message="Loading..." />
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400">
                No inquiries match your filters.
              </div>
            ) : (
              filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="p-4 space-y-2.5 bg-white cursor-pointer"
                  onClick={() => setActiveMessage(contact)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-900 text-xs truncate">
                        {contact.first_name} {contact.last_name || ""}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">{contact.email}</div>
                    </div>
                    <span className="inline-flex items-center rounded-md bg-slate-100 text-slate-700 px-2 py-0.5 text-[10px] font-medium truncate max-w-[130px]">
                      {contact.subject || "Inquiry"}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    {contact.message}
                  </p>

                  <div
                    className="flex items-center justify-between pt-1 text-xs"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-[11px] text-slate-400">
                      {contact.created_at ? contact.created_at.split(" ")[0] : "Recent"}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <a
                        href={`mailto:${contact.email}?subject=Re: ${encodeURIComponent(
                          contact.subject || "Red Dot Inquiry",
                        )}`}
                        className="p-1.5 rounded-md border border-slate-200 text-slate-600"
                      >
                        <Reply className="h-3 w-3" />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleDelete(contact.id)}
                        className="p-1.5 rounded-md text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── Message Detail Slideover / Modal ── */}
      {activeMessage && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-xl p-6 space-y-4 animate-fade-in-up">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-sm flex items-center justify-center shrink-0">
                  {activeMessage.first_name
                    ? activeMessage.first_name.charAt(0).toUpperCase()
                    : "U"}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-base text-slate-900 truncate">
                    {activeMessage.first_name} {activeMessage.last_name || ""}
                  </h3>
                  <p className="text-xs text-slate-500 truncate">{activeMessage.email}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveMessage(null)}
                className="rounded-lg p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Meta Grid */}
            <div className="grid grid-cols-2 gap-3 py-1 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <p className="text-[11px] font-medium text-slate-400">Subject / Topic</p>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {activeMessage.subject || "General Inquiry"}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <p className="text-[11px] font-medium text-slate-400">Phone</p>
                <p className="font-semibold text-slate-800 mt-0.5 font-mono">
                  {activeMessage.phone || "Not provided"}
                </p>
              </div>
            </div>

            {/* Message Body */}
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1.5">Message Content</p>
              <div className="p-3.5 rounded-lg bg-slate-50/70 border border-slate-200/80 text-xs text-slate-800 leading-relaxed max-h-60 overflow-y-auto whitespace-pre-wrap font-normal">
                {activeMessage.message || "No content provided."}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                Received: {activeMessage.created_at || "Recent"}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => copyDetails(activeMessage)}
                  className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 cursor-pointer"
                >
                  Copy
                </button>

                <a
                  href={`mailto:${activeMessage.email}?subject=Re: ${encodeURIComponent(
                    activeMessage.subject || "Red Dot Inquiry",
                  )}`}
                  className="rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-4 py-2 shadow-xs inline-flex items-center gap-1.5 transition-colors"
                >
                  <Reply className="h-3.5 w-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
