import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState, useEffect, useMemo } from "react";
import {
  KeyRound,
  CheckCircle2,
  Copy,
  RefreshCw,
  Search,
  Plus,
  Trash2,
  Mail,
  Clock,
  ShieldCheck,
  Send,
  ExternalLink,
  X,
  AlertCircle,
  Eye,
  Download,
} from "lucide-react";

import { toast } from "sonner";
import { requireAdminRoute, getToken } from "@/lib/auth";
import { BrandSpinner } from "@/components/ui/BrandSpinner";
import {
  getAiLeads,
  createAiLead,
  updateAiLead,
  deleteAiLead,
} from "@/lib/api";
import {
  TRACK_CONFIGS,
  generateAccessCode,
  validateAccessCode,
} from "@/lib/ai-course-utils";

function getResolvedReceiptUrl(rawUrl?: string): string {
  if (!rawUrl) return "";
  const token = getToken();

  // If base64 data URI, return as-is
  if (rawUrl.startsWith("data:")) return rawUrl;

  let url = rawUrl.trim();

  // If stored as legacy /uploads/receipt_... or receipt_..., route to /api/admin/receipts/
  if (url.startsWith("/uploads/")) {
    const filename = url.replace("/uploads/", "");
    url = `/api/admin/receipts/${filename}`;
  } else if (!url.startsWith("http") && !url.startsWith("/api/")) {
    url = `/api/admin/receipts/${url.replace(/^\/+/, "")}`;
  }

  if (token) {
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}token=${encodeURIComponent(token)}`;
  }
  return url;
}

export const Route = createFileRoute("/admin/ai-unlocked")({
  beforeLoad: requireAdminRoute,
  head: () => ({
    meta: [{ title: "AI Course Access & Payment Verifications | Red Dot Admin" }],
  }),
  component: AdminAiUnlockedPage,
});


export interface AiPaymentLead {
  id: string;
  name: string;
  email: string;
  org: string;
  track: "healthcare" | "finance" | "finance-advanced";
  txn: string;
  date: string;
  status: "pending" | "verified" | "rejected";
  accessCode?: string;
  notes?: string;
  emailSent?: boolean;
  emailSentAt?: string;
  receiptUrl?: string;
  receipt_url?: string;
}

/**
 * Sends the access code directly to the candidate's email using FormSubmit AJAX API.
 */
export async function sendAccessCodeEmailViaFormSubmit(
  lead: AiPaymentLead,
  code: string
): Promise<{ success: boolean; error?: string }> {
  const trackName =
    lead.track === "healthcare"
      ? "AI for Healthcare Professionals (Clinical Track)"
      : lead.track === "finance-advanced"
      ? "Advanced AI for Finance Professionals (Level 2 Architecture Track)"
      : "AI for Financial Professionals (Banking Track)";
  const activationUrl = `https://reddottech.com.np/ai-unlocked?track=${lead.track}&view=pay`;

  const payload = {
    _subject: `✓ Payment Verified: Your Access Code for ${trackName} — Red Dot Technologies`,
    _template: "table",
    _captcha: "false",
    _replyto: "info@reddottech.com.np",
    _autoresponse: `Dear ${lead.name},\n\nYour payment for ${trackName} has been verified!\n\nYour Access Code: ${code}\n\nCourse Activation Link: ${activationUrl}\n\nHow to activate:\n1. Open ${activationUrl}\n2. Scroll down to Step 3 (Instant Access Code Unlock)\n3. Enter your unique Access Code: ${code}\n4. Click "Unlock Course Now" to immediately access all modules and generate your official Certificate of Completion.\n\nBest regards,\nRed Dot Technologies Pvt. Ltd.\nKathmandu, Nepal`,
    Payment_Status: "✓ VERIFIED & APPROVED",
    Verification_Notice: `Your payment for ${trackName} has been verified! Here is your detailed course enrolment information and unlock access code.`,
    Your_Access_Code: code,
    Candidate_Name: lead.name,
    Candidate_Email: lead.email,
    Enrolled_Course: trackName,
    Payment_Transaction_Ref: lead.txn || "Confirmed via Fonepay",
    Course_Activation_Link: activationUrl,
    How_To_Unlock_Course: `1. Open the activation link: ${activationUrl}\n2. Scroll down to Step 3 (Instant Access Code Unlock)\n3. Enter your Access Code: ${code}\n4. Click "Unlock Course Now" for lifetime access and certificate issuance.`,
    Academic_Support: "info@reddottech.com.np | Red Dot Technologies Pvt. Ltd., Kathmandu, Nepal",
  };

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(lead.email)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000),
    });

    if (res.ok) {
      return { success: true };
    } else {
      const data = await res.json().catch(() => null);
      return { success: false, error: data?.message || "Email service returned error" };
    }
  } catch (err: any) {
    const isTimeout = err?.name === "TimeoutError" || err?.message?.includes("timed out");
    return {
      success: false,
      error: isTimeout ? "Email service timed out" : err?.message || "Network error",
    };
  }
}

function AdminAiUnlockedPage() {
  const [leads, setLeads] = useState<AiPaymentLead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sendingEmailMap, setSendingEmailMap] = useState<Record<string, boolean>>({});
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const loadLeads = async () => {
    setIsLoading(true);
    try {
      const data = await getAiLeads();
      if (Array.isArray(data)) {
        setLeads(data);
      }
    } catch {
      // Fallback empty
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  // ── Code Generator State ──
  const [genTrack, setGenTrack] = useState<"healthcare" | "finance" | "finance-advanced">("healthcare");
  const [generatedCode, setGeneratedCode] = useState(() =>
    generateAccessCode(TRACK_CONFIGS.healthcare.salt || "RDT-AIHP-2026")
  );
  const [codeCopied, setCodeCopied] = useState(false);

  // ── Code Validator State ──
  const [testCode, setTestCode] = useState("");
  const [validationResult, setValidationResult] = useState<{
    tested: boolean;
    valid: boolean;
    track?: string;
    studentName?: string;
    studentEmail?: string;
    isEnrolled?: boolean;
  }>({ tested: false, valid: false });

  // ── Manual Add Modal State ──
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedReceiptLead, setSelectedReceiptLead] = useState<AiPaymentLead | null>(null);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newOrg, setNewOrg] = useState("");
  const [newTrack, setNewTrack] = useState<"healthcare" | "finance" | "finance-advanced">("healthcare");
  const [newTxn, setNewTxn] = useState("");
  const [autoEmailManual, setAutoEmailManual] = useState(true);

  // ── Filters ──
  const [searchQuery, setSearchQuery] = useState("");
  const [trackFilter, setTrackFilter] = useState<"all" | "healthcare" | "finance" | "finance-advanced">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "verified">("all");

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      if (trackFilter !== "all" && lead.track !== trackFilter) return false;
      if (statusFilter !== "all" && lead.status !== statusFilter) return false;
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        lead.name.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        (lead.org && lead.org.toLowerCase().includes(q)) ||
        (lead.txn && lead.txn.toLowerCase().includes(q)) ||
        (lead.accessCode && lead.accessCode.toLowerCase().includes(q))
      );
    });
  }, [leads, trackFilter, statusFilter, searchQuery]);

  // ── Actions ──
  const handleGenerateCode = (track: "healthcare" | "finance" | "finance-advanced") => {
    const salt =
      track === "healthcare"
        ? TRACK_CONFIGS.healthcare.salt || "RDT-AIHP-2026"
        : track === "finance-advanced"
        ? TRACK_CONFIGS["finance-advanced"]?.salt || "RDT-AIFA-2026"
        : TRACK_CONFIGS.finance.salt || "RDT-AIFP-2026";
    setGeneratedCode(generateAccessCode(salt));
    setCodeCopied(false);
  };

  const handleCopyGeneratedCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCodeCopied(true);
    toast.success("Access code copied to clipboard");
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const handleCopyLeadCode = (lead: AiPaymentLead) => {
    if (!lead.accessCode) return;
    navigator.clipboard.writeText(lead.accessCode);
    setCopiedCodeId(lead.id);
    toast.success(`Copied code: ${lead.accessCode}`);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleVerifyLead = async (lead: AiPaymentLead) => {
    const salt =
      lead.track === "healthcare"
        ? TRACK_CONFIGS.healthcare.salt || "RDT-AIHP-2026"
        : lead.track === "finance-advanced"
        ? TRACK_CONFIGS["finance-advanced"]?.salt || "RDT-AIFA-2026"
        : TRACK_CONFIGS.finance.salt || "RDT-AIFP-2026";

    const newCode = lead.accessCode || generateAccessCode(salt);

    const trackName =
      lead.track === "healthcare"
        ? "AI for Healthcare Professionals"
        : lead.track === "finance-advanced"
        ? "Advanced AI for Finance Professionals (Level 2)"
        : "AI for Financial Professionals";

    const courseUrl = `https://reddottech.com.np/ai-unlocked?track=${lead.track}&view=pay`;
    const messageTemplate = `Dear ${lead.name},\n\nYour payment for ${trackName} (Txn Ref: ${lead.txn || "Confirmed"}) has been verified!\n\nYour Access Code: ${newCode}\n\nTo activate your course, visit:\n${courseUrl}\nand enter your code under Step 3 (Instant Access Code Unlock).\n\nBest regards,\nRed Dot Technologies Pvt. Ltd.\nKathmandu, Nepal`;
    navigator.clipboard.writeText(messageTemplate);

    setSendingEmailMap((prev) => ({ ...prev, [lead.id]: true }));
    toast.info(`Verifying payment and dispatching credentials to ${lead.email}...`);

    const emailResult = await sendAccessCodeEmailViaFormSubmit(lead, newCode);

    await updateAiLead(lead.id, {
      status: "verified",
      accessCode: newCode,
      emailSent: emailResult.success,
      emailSentAt: emailResult.success ? new Date().toISOString() : undefined,
    }).catch(() => {});

    setLeads((prev) =>
      prev.map((l) => {
        if (l.id === lead.id) {
          return {
            ...l,
            status: "verified" as const,
            accessCode: newCode,
            emailSent: emailResult.success,
            emailSentAt: emailResult.success ? new Date().toISOString() : undefined,
          };
        }
        return l;
      })
    );

    setSendingEmailMap((prev) => ({ ...prev, [lead.id]: false }));

    if (emailResult.success) {
      toast.success(`Access code ${newCode} dispatched to ${lead.email}`);
    } else {
      toast.warning(
        `Payment verified & code generated (${newCode}). Automated email failed, but dispatch text was copied to your clipboard.`
      );
    }
  };

  const handleResendEmail = async (lead: AiPaymentLead) => {
    if (!lead.accessCode) {
      toast.error("No access code found for this student.");
      return;
    }

    setSendingEmailMap((prev) => ({ ...prev, [lead.id]: true }));
    toast.info(`Resending access code to ${lead.email}...`);

    const res = await sendAccessCodeEmailViaFormSubmit(lead, lead.accessCode);

    if (res.success) {
      const nowIso = new Date().toISOString();
      await updateAiLead(lead.id, {
        emailSent: true,
        emailSentAt: nowIso,
      }).catch(() => {});

      setLeads((prev) =>
        prev.map((l) =>
          l.id === lead.id ? { ...l, emailSent: true, emailSentAt: nowIso } : l
        )
      );
      toast.success(`Access code resent to ${lead.email}`);
    } else {
      toast.error(`Failed to send email: ${res.error || "Please verify recipient address"}`);
    }

    setSendingEmailMap((prev) => ({ ...prev, [lead.id]: false }));
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to remove this record?")) return;
    try {
      await deleteAiLead(id);
      setLeads((prev) => prev.filter((l) => l.id !== id));
      toast.info("Record removed.");
    } catch (err: any) {
      toast.error(`Failed to delete record: ${err?.message || "Error"}`);
    }
  };

  const handleTestCode = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = testCode.trim().toUpperCase();
    if (!clean) return;

    const isHealth = validateAccessCode(
      clean,
      TRACK_CONFIGS.healthcare.salt || "RDT-AIHP-2026"
    );
    const isFin = validateAccessCode(
      clean,
      TRACK_CONFIGS.finance.salt || "RDT-AIFP-2026"
    );
    const isFinAdv = validateAccessCode(
      clean,
      TRACK_CONFIGS["finance-advanced"]?.salt || "RDT-AIFA-2026"
    );

    const matchingLead = leads.find(
      (l) => l.accessCode?.trim().toUpperCase() === clean && l.status === "verified"
    );

    if (isHealth) {
      setValidationResult({
        tested: true,
        valid: true,
        track: "AI for Healthcare Professionals (Clinical)",
        studentName: matchingLead?.name,
        studentEmail: matchingLead?.email,
        isEnrolled: !!matchingLead,
      });
    } else if (isFin) {
      setValidationResult({
        tested: true,
        valid: true,
        track: "AI for Financial Professionals (Banking)",
        studentName: matchingLead?.name,
        studentEmail: matchingLead?.email,
        isEnrolled: !!matchingLead,
      });
    } else if (isFinAdv) {
      setValidationResult({
        tested: true,
        valid: true,
        track: "Advanced AI for Finance Professionals (Level 2)",
        studentName: matchingLead?.name,
        studentEmail: matchingLead?.email,
        isEnrolled: !!matchingLead,
      });
    } else {
      setValidationResult({ tested: true, valid: false });
    }
  };

  const handleCreateManualLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) {
      toast.error("Name and email are required.");
      return;
    }

    const salt =
      newTrack === "healthcare"
        ? TRACK_CONFIGS.healthcare.salt || "RDT-AIHP-2026"
        : newTrack === "finance-advanced"
        ? TRACK_CONFIGS["finance-advanced"]?.salt || "RDT-AIFA-2026"
        : TRACK_CONFIGS.finance.salt || "RDT-AIFP-2026";

    const generated = generateAccessCode(salt);

    const newLead: AiPaymentLead = {
      id: `lead-${Date.now()}`,
      name: newName.trim(),
      email: newEmail.trim(),
      org: newOrg.trim() || "Individual",
      track: newTrack,
      txn: newTxn.trim() || "MANUAL_ENROLL",
      date: new Date().toISOString(),
      status: "verified",
      accessCode: generated,
    };

    if (autoEmailManual) {
      toast.info(`Dispatching access code to ${newLead.email}...`);
      const emailRes = await sendAccessCodeEmailViaFormSubmit(newLead, generated);
      if (emailRes.success) {
        newLead.emailSent = true;
        newLead.emailSentAt = new Date().toISOString();
        toast.success(`Access code ${generated} sent to ${newLead.email}`);
      } else {
        toast.warning("Student enrolled. Email delivery failed, but code is ready in the table.");
      }
    }

    try {
      await createAiLead(newLead);
      setLeads((prev) => [newLead, ...prev]);
      setShowAddModal(false);
      setNewName("");
      setNewEmail("");
      setNewOrg("");
      setNewTxn("");
      toast.success(`Student enrolled with Access Code ${generated}`);
    } catch (err: any) {
      toast.error(`Database error: ${err?.message || "Could not register enrollment"}`);
    }
  };

  // Metrics
  const pendingCount = leads.filter((l) => l.status === "pending").length;
  const verifiedCount = leads.filter((l) => l.status === "verified").length;

  return (
    <AdminLayout
      title="AI Course Access & Verifications"
      mobileTitle="AI Access"
      subtitle="Manage candidate enrolments, verify Fonepay payments, and issue course access tokens."
      actions={
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-3.5 py-2 shadow-xs transition-all cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Enrolment</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* ── Metric Summary Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Pending Review</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold tracking-tight text-slate-900">
                  {pendingCount}
                </span>
                {pendingCount > 0 && (
                  <span className="inline-flex items-center text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                    Requires action
                  </span>
                )}
              </div>
            </div>
            <div className="h-10 w-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200/60">
              <Clock className="h-5 w-5" />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Active Students</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold tracking-tight text-slate-900">
                  {verifiedCount}
                </span>
                <span className="inline-flex items-center text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Verified &amp; Issued
                </span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200/60">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Total Inquiries</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold tracking-tight text-slate-900">
                  {leads.length}
                </span>
                <span className="text-[11px] text-slate-400 font-normal">All time records</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200/80">
              <KeyRound className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* ── Operational Utilities: Token Generator + Validator ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Box 1: Token Generator (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 justify-between">
                <div className="flex items-center gap-2">
                  <KeyRound className="h-4 w-4 text-slate-700" />
                  <h3 className="font-semibold text-sm text-slate-900">
                    Generate Access Token
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  {genTrack === "healthcare"
                    ? "Salt: AIHP"
                    : genTrack === "finance-advanced"
                    ? "Salt: AIFA (L2)"
                    : "Salt: AIFP (L1)"}
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <label className="text-xs font-medium text-slate-600">
                    Target Track
                  </label>
                  {/* Segmented Control */}
                  <div className="inline-flex p-0.5 rounded-lg bg-slate-100 border border-slate-200/80 text-[11px]">
                    <button
                      type="button"
                      onClick={() => {
                        setGenTrack("healthcare");
                        handleGenerateCode("healthcare");
                      }}
                      className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                        genTrack === "healthcare"
                          ? "bg-white text-slate-900 shadow-2xs"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Healthcare
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setGenTrack("finance");
                        handleGenerateCode("finance");
                      }}
                      className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                        genTrack === "finance"
                          ? "bg-white text-slate-900 shadow-2xs"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Finance L1
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setGenTrack("finance-advanced");
                        handleGenerateCode("finance-advanced");
                      }}
                      className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                        genTrack === "finance-advanced"
                          ? "bg-purple-600 text-white shadow-2xs"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Adv Finance L2
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Access Token
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        readOnly
                        value={generatedCode}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50/60 px-3.5 py-2 font-mono text-sm font-bold tracking-widest text-slate-900 select-all focus:outline-none"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyGeneratedCode}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors cursor-pointer shrink-0"
                    >
                      {codeCopied ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy Token</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleGenerateCode(genTrack)}
                      className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer shrink-0"
                      title="Generate new token"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  setNewTrack(genTrack);
                  setShowAddModal(true);
                }}
                className="text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Enrol Student with this Token</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const trackLabel =
                    genTrack === "healthcare"
                      ? "AI for Healthcare"
                      : genTrack === "finance-advanced"
                      ? "Advanced AI for Finance (Level 2)"
                      : "AI for Finance";
                  const msg = `Dear Learner,\n\nYour payment for ${trackLabel} has been verified.\n\nYour Access Code: ${generatedCode}\n\nUnlock here: https://reddottech.com.np/ai-unlocked?track=${genTrack}&view=pay\n\nBest regards,\nRed Dot Technologies`;
                  navigator.clipboard.writeText(msg);
                  toast.success("Ready dispatch message copied");
                }}
                className="text-brand-red hover:text-red-700 font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Copy className="h-3 w-3" />
                <span>Copy Message Template</span>
              </button>
            </div>
          </div>

          {/* Box 2: Token Validator (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <ShieldCheck className="h-4 w-4 text-slate-700" />
                <h3 className="font-semibold text-sm text-slate-900">
                  Token Verification
                </h3>
              </div>

              <form onSubmit={handleTestCode} className="mt-4 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Inspect Access Code
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={testCode}
                      onChange={(e) => setTestCode(e.target.value)}
                      placeholder="e.g. RDTA8K2..."
                      className="flex-1 rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-mono uppercase focus:bg-white focus:outline-none focus:border-slate-400 font-medium"
                    />
                    <button
                      type="submit"
                      className="rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium px-3.5 py-2 transition-colors cursor-pointer shrink-0"
                    >
                      Verify
                    </button>
                  </div>
                </div>

                {validationResult.tested && (
                  <div
                    className={`p-3 rounded-lg text-xs font-medium flex items-start gap-2 ${
                      validationResult.valid
                        ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                        : "bg-rose-50 border border-rose-200 text-rose-800"
                    }`}
                  >
                    {validationResult.valid ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <p className="font-semibold">Valid Access Token</p>
                          <p className="text-[11px] text-emerald-700">
                            Track: {validationResult.track}
                          </p>
                          {validationResult.isEnrolled ? (
                            <p className="text-[10px] text-emerald-800 font-bold bg-emerald-100/70 px-1.5 py-0.5 rounded inline-block mt-1">
                              ✓ Active Enrolment: {validationResult.studentName} ({validationResult.studentEmail})
                            </p>
                          ) : (
                            <p className="text-[10px] text-slate-500 italic mt-0.5">
                              Cryptographically valid, not yet assigned to an active student in queue.
                            </p>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">Invalid Token</p>
                          <p className="text-[11px] text-rose-700 mt-0.5">
                            Checksum failed or code format is invalid.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </form>
            </div>

            <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-100">
              Validates cryptographic signature against active course salts and cross-references database enrolments.
            </p>
          </div>
        </div>

        {/* ── Main Data Table: Verification Queue ── */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
          {/* Header & Controls Toolbar */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold text-sm text-slate-900">
                Payment Verification Queue
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {filteredLeads.length} {filteredLeads.length === 1 ? "record" : "records"} found
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:w-56">
                <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name, txn, email..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-slate-400 font-medium"
                />
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2">
                <select
                  value={trackFilter}
                  onChange={(e) => setTrackFilter(e.target.value as any)}
                  className="rounded-lg border border-slate-200 bg-slate-50/50 px-2.5 py-1.5 text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value="all">All Tracks</option>
                  <option value="healthcare">Healthcare (AIHP)</option>
                  <option value="finance">Finance L1 (AIFP)</option>
                  <option value="finance-advanced">Adv Finance L2 (AIFA)</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="rounded-lg border border-slate-200 bg-slate-50/50 px-2.5 py-1.5 text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="verified">Verified</option>
                </select>
              </div>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50/60 text-[11px] font-semibold text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="px-5 py-3">Student</th>
                  <th className="px-4 py-3">Track</th>
                  <th className="px-4 py-3">Txn Reference</th>
                  <th className="px-4 py-3">Receipt</th>
                  <th className="px-4 py-3">Status &amp; Token</th>
                  <th className="px-4 py-3">Delivery</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-normal">
                {isLoading ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-12 text-center">
                      <div className="flex items-center justify-center">
                        <BrandSpinner size="sm" message="Loading records..." />
                      </div>
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-10 text-center text-slate-400 text-xs">
                      No records match the selected filters.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {
                    const isVerified = lead.status === "verified";
                    const isSending = !!sendingEmailMap[lead.id];
                    const isCopied = copiedCodeId === lead.id;

                    return (
                      <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                        {/* Student */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200/80 text-slate-700 font-semibold text-xs flex items-center justify-center shrink-0">
                              {lead.name ? lead.name.charAt(0).toUpperCase() : "U"}
                            </div>
                            <div className="min-w-0">
                              <div className="font-semibold text-slate-900 truncate">
                                {lead.name}
                              </div>
                              <div className="text-[11px] text-slate-500 truncate">
                                {lead.email}
                              </div>
                              {lead.org && lead.org !== "Individual" && (
                                <div className="text-[10px] text-slate-400 truncate">
                                  {lead.org}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Track */}
                        <td className="px-4 py-3.5">
                          {lead.track === "healthcare" ? (
                            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2 py-0.5 text-[11px] font-medium">
                              Healthcare
                            </span>
                          ) : lead.track === "finance-advanced" ? (
                            <span className="inline-flex items-center gap-1 rounded-md bg-purple-50 text-purple-800 border border-purple-200/80 px-2 py-0.5 text-[11px] font-medium">
                              Adv Finance L2
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 text-blue-800 border border-blue-200/80 px-2 py-0.5 text-[11px] font-medium">
                              Finance L1
                            </span>
                          )}
                        </td>

                        {/* Txn Reference */}
                        <td className="px-4 py-3.5">
                          <span className="font-mono text-xs font-semibold text-slate-800 bg-slate-50 px-2 py-1 rounded border border-slate-200/60">
                            {lead.txn || "—"}
                          </span>
                        </td>

                        {/* Receipt */}
                        <td className="px-4 py-3.5">
                          {lead.receiptUrl || lead.receipt_url ? (
                            <button
                              type="button"
                              onClick={() => setSelectedReceiptLead(lead)}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-700 transition-colors cursor-pointer group"
                            >
                              <Eye className="h-3 w-3 text-slate-400 group-hover:text-slate-700" />
                              <span>View Slip</span>
                            </button>
                          ) : (
                            <span className="text-[11px] text-slate-400">None</span>
                          )}
                        </td>

                        {/* Status & Code */}
                        <td className="px-4 py-3.5">
                          {isVerified ? (
                            <div className="space-y-1">
                              <span className="inline-flex items-center gap-1 text-emerald-700 text-[11px] font-semibold">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                                Verified
                              </span>
                              {lead.accessCode && (
                                <button
                                  type="button"
                                  onClick={() => handleCopyLeadCode(lead)}
                                  className="group flex items-center gap-1 font-mono text-[11px] font-bold text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded cursor-pointer transition-colors"
                                  title="Click to copy code"
                                >
                                  <span>{lead.accessCode}</span>
                                  {isCopied ? (
                                    <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600 shrink-0" />
                                  ) : (
                                    <Copy className="h-2.5 w-2.5 text-slate-400 group-hover:text-slate-600 shrink-0" />
                                  )}
                                </button>
                              )}
                            </div>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-amber-700 text-[11px] font-semibold">
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                              Pending
                            </span>
                          )}
                        </td>

                        {/* Delivery Status */}
                        <td className="px-4 py-3.5">
                          {lead.emailSent ? (
                            <div className="space-y-0.5">
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-700">
                                <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                                Dispatched
                              </span>
                              {lead.emailSentAt && (
                                <div className="text-[10px] text-slate-400">
                                  {new Date(lead.emailSentAt).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </div>
                              )}
                            </div>
                          ) : isVerified ? (
                            <span className="text-[11px] text-amber-600 font-medium">
                              Not sent
                            </span>
                          ) : (
                            <span className="text-[11px] text-slate-400">—</span>
                          )}
                        </td>

                        {/* Date */}
                        <td className="px-4 py-3.5 text-[11px] text-slate-500 whitespace-nowrap">
                          {new Date(lead.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                          })}
                        </td>

                        {/* Actions Toolbar */}
                        <td className="px-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {!isVerified ? (
                              <button
                                type="button"
                                onClick={() => handleVerifyLead(lead)}
                                disabled={isSending}
                                className="inline-flex items-center gap-1 rounded-md bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-medium text-xs px-2.5 py-1.5 shadow-2xs transition-colors cursor-pointer"
                              >
                                {isSending ? (
                                  <RefreshCw className="h-3 w-3 animate-spin" />
                                ) : (
                                  <Send className="h-3 w-3" />
                                )}
                                <span>{isSending ? "Sending..." : "Approve"}</span>
                              </button>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  onClick={() => handleResendEmail(lead)}
                                  disabled={isSending}
                                  className="p-1.5 rounded-md border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                                  title="Resend email with code"
                                >
                                  {isSending ? (
                                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                                  ) : (
                                    <Mail className="h-3.5 w-3.5" />
                                  )}
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleCopyLeadCode(lead)}
                                  className="p-1.5 rounded-md border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                                  title="Copy access token"
                                >
                                  <Copy className="h-3.5 w-3.5" />
                                </button>

                                <a
                                  href={`mailto:${encodeURIComponent(lead.email)}?subject=${encodeURIComponent(
                                    `Your Access Code for ${
                                      lead.track === "healthcare"
                                        ? "AI for Healthcare Professionals"
                                        : "AI for Financial Professionals"
                                    } — Red Dot Technologies`
                                  )}&body=${encodeURIComponent(
                                    `Dear ${lead.name},\n\nYour payment has been verified!\n\nYour Access Code: ${lead.accessCode}\n\nActivate course: https://reddottech.com.np/ai-unlocked?track=${lead.track}&view=pay\n\nBest regards,\nRed Dot Technologies Pvt. Ltd.`
                                  )}`}
                                  className="p-1.5 rounded-md border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                                  title="Open in email client"
                                >
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                              </>
                            )}

                            <button
                              type="button"
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-1.5 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Delete record"
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

          {/* Mobile Card List View */}
          <div className="block md:hidden divide-y divide-slate-100">
            {isLoading ? (
              <div className="p-8 text-center flex items-center justify-center">
                <BrandSpinner size="sm" message="Loading..." />
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400">
                No records match current filters.
              </div>
            ) : (
              filteredLeads.map((lead) => (
                <div key={lead.id} className="p-4 space-y-3 bg-white">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-900 text-xs truncate">
                        {lead.name}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">{lead.email}</div>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-medium ${
                        lead.track === "healthcare"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200/80"
                          : "bg-blue-50 text-blue-800 border border-blue-200/80"
                      }`}
                    >
                      {lead.track === "healthcare" ? "Healthcare" : "Finance"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                    <div className="font-mono text-[11px] text-slate-700 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200/60">
                      Txn: {lead.txn || "—"}
                    </div>

                    {lead.status === "verified" ? (
                      <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                        {lead.accessCode || "Verified"}
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-amber-700 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                        Pending
                      </span>
                    )}
                  </div>

                  {/* Actions Row */}
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    {lead.status === "pending" ? (
                      <button
                        type="button"
                        onClick={() => handleVerifyLead(lead)}
                        disabled={sendingEmailMap[lead.id]}
                        className="w-full rounded-md bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-medium text-xs py-2 shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        {sendingEmailMap[lead.id] ? (
                          <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Send className="h-3.5 w-3.5" />
                        )}
                        <span>{sendingEmailMap[lead.id] ? "Processing..." : "Approve & Dispatch"}</span>
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => handleResendEmail(lead)}
                          disabled={sendingEmailMap[lead.id]}
                          className="rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 flex items-center gap-1"
                        >
                          <Mail className="h-3 w-3 text-slate-500" />
                          <span>Resend</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCopyLeadCode(lead)}
                          className="rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 flex items-center gap-1"
                        >
                          <Copy className="h-3 w-3 text-slate-500" />
                          <span>Copy</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-1.5 rounded-md text-slate-400 hover:text-rose-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── Manual Enrolment Modal ── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-xl p-6 space-y-4 animate-fade-in-up">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-semibold text-base text-slate-900">
                  New Student Enrolment
                </h3>
                <p className="text-xs text-slate-500">
                  Register offline or corporate-sponsored participants
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateManualLead} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Dr. Aarav Shrestha"
                  required
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-slate-400 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="aarav@hospital.org.np"
                  required
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-slate-400 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Organization / Hospital / Bank
                </label>
                <input
                  type="text"
                  value={newOrg}
                  onChange={(e) => setNewOrg(e.target.value)}
                  placeholder="e.g. Nepal Bank Limited"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-slate-400 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Course Track *
                </label>
                <select
                  value={newTrack}
                  onChange={(e) => setNewTrack(e.target.value as any)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-slate-400 cursor-pointer"
                >
                  <option value="healthcare">AI for Healthcare Professionals (9 Modules)</option>
                  <option value="finance">AI for Financial Professionals — Level 1 (8 Modules)</option>
                  <option value="finance-advanced">Advanced AI for Finance Professionals — Level 2 (12 Modules)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Payment Reference
                </label>
                <input
                  type="text"
                  value={newTxn}
                  onChange={(e) => setNewTxn(e.target.value)}
                  placeholder="e.g. Bank Transfer / Fonepay Ref"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-slate-400 font-medium"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="autoEmailManual"
                  checked={autoEmailManual}
                  onChange={(e) => setAutoEmailManual(e.target.checked)}
                  className="rounded border-slate-300 text-brand-red focus:ring-brand-red h-4 w-4 cursor-pointer"
                />
                <label
                  htmlFor="autoEmailManual"
                  className="text-xs text-slate-600 cursor-pointer"
                >
                  Automatically dispatch access token to student's email
                </label>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-2 text-xs font-medium text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-4 py-2 shadow-xs transition-colors cursor-pointer"
                >
                  Register &amp; Issue Token
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Receipt Lightbox Modal ── */}
      {selectedReceiptLead && (() => {
        const rawReceipt = selectedReceiptLead.receiptUrl || selectedReceiptLead.receipt_url || "";
        const resolvedUrl = getResolvedReceiptUrl(rawReceipt);
        const isPdf = resolvedUrl.toLowerCase().includes(".pdf");

        return (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fade-in-up">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-sm text-slate-900">
                    Payment Slip Preview
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {selectedReceiptLead.name} · Ref: {selectedReceiptLead.txn || "—"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedReceiptLead(null)}
                  className="rounded-lg p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-4 overflow-y-auto flex-1 flex flex-col items-center justify-center bg-slate-50/50">
                {isPdf ? (
                  <div className="w-full h-[55vh] rounded-lg overflow-hidden border border-slate-200 shadow-xs bg-white">
                    <iframe
                      src={resolvedUrl}
                      title="Payment Slip PDF"
                      className="w-full h-full border-0"
                    />
                  </div>
                ) : (
                  <div className="relative max-w-full rounded-lg overflow-hidden border border-slate-200 shadow-xs bg-white flex flex-col items-center justify-center min-h-[220px] p-2">
                    <img
                      src={resolvedUrl}
                      alt="Payment Slip"
                      className="max-h-[55vh] object-contain w-auto rounded"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const fallback = e.currentTarget.parentElement?.querySelector(".img-error-fallback");
                        if (fallback) (fallback as HTMLElement).style.display = "flex";
                      }}
                    />
                    <div className="img-error-fallback hidden flex-col items-center justify-center p-8 text-center">
                      <AlertCircle className="h-8 w-8 text-amber-500 mb-2" />
                      <p className="text-xs font-semibold text-slate-800">Preview Could Not Be Rendered Directly</p>
                      <p className="text-[11px] text-slate-500 mt-1 max-w-sm">
                        The file may be in a format that requires opening directly in a new browser tab.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 mt-3">
                  <a
                    href={resolvedUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-brand-red bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg shadow-2xs transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Open in New Tab</span>
                  </a>
                  <a
                    href={resolvedUrl}
                    download={`receipt_${selectedReceiptLead.txn || selectedReceiptLead.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-brand-red bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg shadow-2xs transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download File</span>
                  </a>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedReceiptLead(null)}
                  className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs px-3.5 py-2 cursor-pointer"
                >
                  Close
                </button>
                {selectedReceiptLead.status === "pending" && (
                  <button
                    type="button"
                    onClick={async () => {
                      const target = selectedReceiptLead;
                      setSelectedReceiptLead(null);
                      await handleVerifyLead(target);
                    }}
                    disabled={sendingEmailMap[selectedReceiptLead.id]}
                    className="rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-medium text-xs px-4 py-2 shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="h-3 w-3" />
                    <span>Approve &amp; Dispatch Token</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })()}

    </AdminLayout>
  );
}
