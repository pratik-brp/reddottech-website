import { createFileRoute, useNavigate, useSearch, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo, useRef } from "react";
import {
  Award,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Lock,
  ChevronRight,
  Menu,
  X,
  Printer,
  GraduationCap,
  Zap,
  Brain,
  ChevronLeft,
  Sparkles,
  Check,
  Clock,
  Target,
  Lightbulb,
  FileCheck,
  ShieldCheck,
  QrCode,
  BookMarked,
  Stethoscope,
  Building2,
  LayoutGrid,
  Layers,
  CheckCircle,
  Upload,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import {
  claimCertificate,
  verifyCertificate,
  createAiLead,
  uploadPaymentReceipt,
  verifyAiAccessCode,
  checkAiAccessStatus,
} from "@/lib/api";
import { PageHero } from "@/components/PageHero";
import { sanitizeHtml } from "@/lib/sanitize";

import { foundationsLessons } from "@/data/ai-foundations-data";
import { healthcareLessons } from "@/data/ai-healthcare-data";
import { financeLessons } from "@/data/ai-finance-data";
import type { Lesson } from "@/data/ai-healthcare-data";
import {
  TRACK_CONFIGS,
  validateAccessCode,
  generateCertificateReference,
  renderSvgDiagram,
  DIAGRAM_CAPTIONS,
  HEALTHCARE_SOURCES,
  FINANCE_SOURCES,
  type TrackConfig,
} from "@/lib/ai-course-utils";

interface AiUnlockedSearch {
  track?: "foundations" | "healthcare" | "finance";
  lesson?: string;
  view?: string;
}

export const Route = createFileRoute("/ai-unlocked")({
  validateSearch: (search: Record<string, unknown>): AiUnlockedSearch => {
    return {
      track: (search.track as "foundations" | "healthcare" | "finance") || undefined,
      lesson: (search.lesson as string) || undefined,
      view: (search.view as string) || undefined,
    };
  },
  head: () => ({
    meta: [
      {
        title:
          "AI Unlocked — Multi-Track Applied AI Learning Hub | Red Dot Technologies",
      },
      {
        name: "description",
        content:
          "Explore domain-specific applied AI courses: General AI Literacy (Free), AI for Healthcare Professionals, and AI for Financial & Banking Professionals. Practical modules, interactive assessments, and verified certificates.",
      },
    ],
  }),
  component: AiUnlockedPage,
});

/* ── Tab transition fade helper ── */
function useTabFade(key: string) {
  const [visible, setVisible] = useState(true);
  const prevKey = useRef(key);

  useEffect(() => {
    if (prevKey.current !== key) {
      setVisible(false);
      const t = setTimeout(() => {
        setVisible(true);
        prevKey.current = key;
        if (!key.startsWith("catalog_")) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 80);
      return () => clearTimeout(t);
    }
  }, [key]);

  return visible;
}

function AiUnlockedPage() {
  const search = useSearch({ from: "/ai-unlocked" });
  const navigateRouter = useNavigate({ from: "/ai-unlocked" });

  // Single source of truth from router search params
  const currentTrackId: "foundations" | "healthcare" | "finance" | null = search.track || null;

  const [mobileSideOpen, setMobileSideOpen] = useState(false);

  // Track config for active track (if selected)
  const activeTrackConfig: TrackConfig | null = currentTrackId
    ? TRACK_CONFIGS[currentTrackId] || null
    : null;

  const currentLessons: Lesson[] = useMemo(() => {
    if (currentTrackId === "healthcare") return healthcareLessons;
    if (currentTrackId === "finance") return financeLessons;
    if (currentTrackId === "foundations") return foundationsLessons;
    return [];
  }, [currentTrackId]);

  // ── Persistent States per Track ──
  type TrackStateMap = {
    [trackId: string]: {
      done: { [lessonId: string]: boolean };
      answers: { [lessonId: string]: { [qIdx: number]: number } };
      unlocked: boolean;
      accessCode?: string;
      lead?: {
        name: string;
        email: string;
        org?: string;
        role?: string;
        dept?: string;
        date: string;
        captured: boolean;
      };
      requestedLead?: {
        name: string;
        email: string;
        org: string;
        txn: string;
      };
    };
  };

  const [trackStates, setTrackStates] = useState<TrackStateMap>(() => {
    const loaded: TrackStateMap = {};
    if (typeof window === "undefined") {
      ["foundations", "healthcare", "finance"].forEach((tid) => {
        const cfg = TRACK_CONFIGS[tid];
        loaded[tid] = { done: {}, answers: {}, unlocked: !cfg.isPaid };
      });
      return loaded;
    }
    ["foundations", "healthcare", "finance"].forEach((tid) => {
      const cfg = TRACK_CONFIGS[tid];
      const raw = localStorage.getItem(cfg.storageKey);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          // If paid track is not actively unlocked, completely wipe any progress or answers
          if (cfg.isPaid && !parsed.unlocked) {
            loaded[tid] = { done: {}, answers: {}, unlocked: false };
            try {
              localStorage.setItem(cfg.storageKey, JSON.stringify(loaded[tid]));
            } catch {}
          } else {
            loaded[tid] = parsed;
          }
        } catch {
          loaded[tid] = { done: {}, answers: {}, unlocked: !cfg.isPaid };
        }
      } else {
        loaded[tid] = { done: {}, answers: {}, unlocked: !cfg.isPaid };
      }
    });
    return loaded;
  });

  // Save changes to localStorage
  const updateTrackState = (
    trackId: string,
    updater: (prev: (typeof trackStates)[string]) => (typeof trackStates)[string]
  ) => {
    setTrackStates((prev) => {
      const current = prev[trackId] || {
        done: {},
        answers: {},
        unlocked: !TRACK_CONFIGS[trackId]?.isPaid,
      };
      const updated = updater(current);
      const next = { ...prev, [trackId]: updated };
      const cfg = TRACK_CONFIGS[trackId];
      if (cfg && typeof window !== "undefined") {
        try {
          localStorage.setItem(cfg.storageKey, JSON.stringify(updated));
        } catch {}
      }
      return next;
    });
  };

  const currentTrackState = currentTrackId
    ? trackStates[currentTrackId] || {
        done: {},
        answers: {},
        unlocked: !activeTrackConfig?.isPaid,
      }
    : { done: {}, answers: {}, unlocked: false };

  const isTrackUnlocked = !activeTrackConfig?.isPaid || !!currentTrackState.unlocked;

  const isLessonLocked = (lessonId: string) => {
    if (!activeTrackConfig) return false;
    if (isTrackUnlocked) return false;
    return !activeTrackConfig.freePreviewIds.includes(lessonId);
  };

  const rawActiveView = search.lesson || search.view || "home";
  const activeView = useMemo(() => {
    if (!activeTrackConfig) return "home";
    const targetId = rawActiveView.startsWith("q_") ? rawActiveView.slice(2) : rawActiveView;
    if (
      activeTrackConfig.isPaid &&
      !isTrackUnlocked &&
      targetId !== "home" &&
      targetId !== "sources" &&
      (isLessonLocked(targetId) || rawActiveView === "cert")
    ) {
      return "pay";
    }
    return rawActiveView;
  }, [rawActiveView, activeTrackConfig, isTrackUnlocked]);

  const openCourse = (track: "foundations" | "healthcare" | "finance", initialView: string = "home") => {
    const isSpecial = initialView === "home" || initialView === "sources" || initialView === "pay" || initialView === "cert";
    navigateRouter({
      search: {
        track,
        view: isSpecial ? initialView : undefined,
        lesson: !isSpecial ? initialView : undefined,
      },
    });
  };

  const backToCatalog = () => {
    setMobileSideOpen(false);
    navigateRouter({
      search: {},
    });
    setTimeout(() => {
      const catalogEl = document.getElementById("course-catalog");
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 120);
  };

  const navigateView = (view: string) => {
    if (!currentTrackId) return;
    setMobileSideOpen(false);

    // Paywall intercept for locked modules
    const targetId = view.startsWith("q_") ? view.slice(2) : view;
    if (
      activeTrackConfig?.isPaid &&
      !isTrackUnlocked &&
      targetId !== "home" &&
      targetId !== "sources" &&
      (isLessonLocked(targetId) || view === "cert")
    ) {
      navigateRouter({
        search: { track: currentTrackId, view: "pay", lesson: undefined },
      });
      toast.info("This module is part of the full programme. Unlock access below.");
      return;
    }

    const isSpecial = view === "home" || view === "sources" || view === "pay" || view === "cert";
    navigateRouter({
      search: {
        track: currentTrackId,
        view: isSpecial ? view : undefined,
        lesson: !isSpecial ? view : undefined,
      },
    });
  };

  const contentVisible = useTabFade(`${currentTrackId || "catalog"}_${activeView}`);

  // Progress metrics: When a paid track is locked, progress and passed status are strictly reset to 0
  const totalLessons = currentLessons.length;
  const completedCount = isTrackUnlocked
    ? Object.values(currentTrackState.done || {}).filter(Boolean).length
    : 0;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const isCourseComplete = isTrackUnlocked && totalLessons > 0 && completedCount === totalLessons;

  // ── Quiz Option Selection ──
  const handleQuizAnswer = (lessonId: string, qIndex: number, optionIndex: number) => {
    if (!currentTrackId || isLessonLocked(lessonId)) return;
    const lesson = currentLessons.find((l) => l.id === lessonId);
    if (!lesson) return;

    const newAnswersForLesson = {
      ...(currentTrackState.answers?.[lessonId] || {}),
      [qIndex]: optionIndex,
    };

    const allAnswered = lesson.quiz.every((_, idx) => newAnswersForLesson[idx] !== undefined);
    const allCorrect = lesson.quiz.every((q, idx) => newAnswersForLesson[idx] === q.a);

    updateTrackState(currentTrackId, (prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [lessonId]: newAnswersForLesson,
      },
      done: {
        ...prev.done,
        [lessonId]: allAnswered && allCorrect,
      },
    }));

    if (allAnswered && allCorrect) {
      toast.success(`✓ ${lesson.tag} Assessment Mastered! Module completed.`);
    }
  };

  // ── Paywall & Code Unlock Form State ──
  const [enteredCode, setEnteredCode] = useState("");
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [requestName, setRequestName] = useState("");
  const [requestEmail, setRequestEmail] = useState("");
  const [requestOrg, setRequestOrg] = useState("");
  const [requestTxn, setRequestTxn] = useState("");
  const [requestReceiptUrl, setRequestReceiptUrl] = useState("");
  const [isUploadingReceipt, setIsUploadingReceipt] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  // ── Auto-Synchronize & Re-verify Course Access with Server Database ──
  // If an administrator deletes the student/lead from the Payment Verification Queue in the admin panel,
  // this hook detects that the access code is no longer valid in MySQL and immediately revokes & resets all course access!
  useEffect(() => {
    if (!currentTrackId || !activeTrackConfig?.isPaid) return;

    // If marked unlocked but no accessCode is present for paid track, reset immediately
    if (currentTrackState.unlocked && !currentTrackState.accessCode) {
      updateTrackState(currentTrackId, () => ({
        done: {},
        answers: {},
        unlocked: false,
        accessCode: undefined,
        lead: undefined,
        requestedLead: undefined,
      }));
      setCertClaimed(false);
      setCertName("");
      setCertEmail("");
      return;
    }

    // If not unlocked on a paid track, ensure done and answers are wiped clean
    if (!currentTrackState.unlocked) {
      const hasDone = Object.keys(currentTrackState.done || {}).length > 0;
      const hasAnswers = Object.keys(currentTrackState.answers || {}).length > 0;
      if (hasDone || hasAnswers) {
        updateTrackState(currentTrackId, (prev) => ({
          ...prev,
          done: {},
          answers: {},
          unlocked: false,
        }));
      }
    }

    // If accessCode is present, check live verification status against MySQL database
    if (currentTrackState.accessCode) {
      let isMounted = true;
      checkAiAccessStatus(currentTrackId, currentTrackState.accessCode)
        .then((res) => {
          if (!isMounted) return;
          if (!res || !res.active) {
            // Access revoked / deleted by admin -> FULLY WIPE ALL PROGRESS & LOCK COURSE
            updateTrackState(currentTrackId, () => ({
              done: {},
              answers: {},
              unlocked: false,
              accessCode: undefined,
              lead: undefined,
              requestedLead: undefined,
            }));
            setCertClaimed(false);
            setCertName("");
            setCertEmail("");
            setCertOrg("");
            setCertRole("");
            setCertDept("");
            toast.warning("Course access has been revoked or removed by the administrator. All progress has been fully reset.");
            // Redirect to paywall view
            navigateView("pay");
          }
        })
        .catch(() => {
          // Network offline fallback continues gracefully
        });

      return () => {
        isMounted = false;
      };
    }
  }, [currentTrackId, currentTrackState.unlocked, currentTrackState.accessCode, activeTrackConfig?.isPaid]);

  const handleReceiptFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be under 10MB");
      return;
    }
    setIsUploadingReceipt(true);
    try {
      const url = await uploadPaymentReceipt(file);
      setRequestReceiptUrl(url);
      toast.success("Payment screenshot attached successfully!");
    } catch {
      toast.error("Failed to upload screenshot. Please try again.");
    } finally {
      setIsUploadingReceipt(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTrackId || !activeTrackConfig) return;
    const salt = activeTrackConfig.salt || "";
    const cleanCode = enteredCode.trim().toUpperCase();
    if (!cleanCode) {
      toast.error("Please enter an access code.");
      return;
    }

    if (!validateAccessCode(cleanCode, salt)) {
      toast.error("Invalid access code format or checksum mismatch.");
      return;
    }

    setIsVerifyingCode(true);
    try {
      const res = await verifyAiAccessCode(currentTrackId, cleanCode);
      if (res && res.valid) {
        updateTrackState(currentTrackId, (prev) => ({
          ...prev,
          unlocked: true,
          accessCode: cleanCode,
          ...(res.lead
            ? {
                lead: {
                  name: res.lead.name || prev.lead?.name || "",
                  email: res.lead.email || prev.lead?.email || "",
                  org: res.lead.org || prev.lead?.org || "",
                  role: prev.lead?.role || "",
                  dept: prev.lead?.dept || "",
                  date: new Date().toISOString(),
                  captured: false,
                },
              }
            : {}),
        }));
        toast.success(`✓ Full Access Unlocked for ${activeTrackConfig.name}!`);
        setEnteredCode("");
        navigateView("home");
      } else {
        toast.error(res?.error || "Access code is invalid, revoked, or no active verified enrolment was found.");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to verify access code with server. Please try again.");
    } finally {
      setIsVerifyingCode(false);
    }
  };

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTrackId) return;
    if (!requestName.trim() || !requestEmail.trim() || !requestOrg.trim()) {
      toast.error("Please fill in your name, email, and institution.");
      return;
    }

    const payload = {
      name: requestName.trim(),
      email: requestEmail.trim(),
      org: requestOrg.trim(),
      txn: requestTxn.trim(),
      receiptUrl: requestReceiptUrl || undefined,
    };

    updateTrackState(currentTrackId, (prev) => ({
      ...prev,
      requestedLead: payload,
    }));

    // Synchronize to Admin Payment Verifications Queue
    try {
      const newEntry = {
        id: `lead-${Date.now()}`,
        name: requestName.trim(),
        email: requestEmail.trim(),
        org: requestOrg.trim(),
        track: currentTrackId as "healthcare" | "finance",
        txn: requestTxn.trim() || "FONEPAY-SUBMITTED",
        receiptUrl: requestReceiptUrl || undefined,
        receipt_url: requestReceiptUrl || undefined,
        date: new Date().toISOString(),
        status: "pending",
      };

      // Save directly to MySQL database
      createAiLead(newEntry).catch(() => {});

      // Synchronize to localStorage backup
      if (typeof window !== "undefined") {
        try {
          const existingLeads = JSON.parse(
            localStorage.getItem("rdt_ai_payment_leads") || "[]"
          );
          localStorage.setItem(
            "rdt_ai_payment_leads",
            JSON.stringify([newEntry, ...existingLeads])
          );
        } catch {}
      }

      // Notify Red Dot admin team via FormSubmit
      fetch("https://formsubmit.co/ajax/info@reddottech.com.np", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New Fonepay Payment: ${requestName} (${activeTrackConfig?.name || currentTrackId})`,
          _template: "table",
          _captcha: "false",
          Applicant_Name: requestName.trim(),
          Applicant_Email: requestEmail.trim(),
          Institution: requestOrg.trim(),
          Course_Track: activeTrackConfig?.name || currentTrackId,
          Fonepay_Txn_Ref: requestTxn.trim() || "FONEPAY-SUBMITTED",
          Payment_Receipt_Url: requestReceiptUrl || "None provided",
          Submitted_At: new Date().toISOString(),
          Admin_Verification_Url: "https://reddottech.com.np/admin/ai-unlocked",
        }),
        signal: AbortSignal.timeout(4000),
      }).catch(() => {});
    } catch {
      // Fallback continues gracefully
    }

    setRequestSubmitted(true);
    toast.success("Payment details submitted! Admin will verify your transaction ref and email your unlock code.");
  };

  // ── Certificate Claim State (Track-Scoped) ──
  const [certName, setCertName] = useState(currentTrackState.lead?.name || "");
  const [certEmail, setCertEmail] = useState(currentTrackState.lead?.email || "");
  const [certOrg, setCertOrg] = useState(currentTrackState.lead?.org || "");
  const [certRole, setCertRole] = useState(currentTrackState.lead?.role || "");
  const [certDept, setCertDept] = useState(currentTrackState.lead?.dept || "");
  const [certClaimed, setCertClaimed] = useState(!!currentTrackState.lead?.captured);

  // Re-synchronize certificate state and auto-validate with database
  // If an admin deletes the certificate in database/admin panel, automatically reset local state!
  useEffect(() => {
    if (!currentTrackId) return;
    const trackLead = currentTrackState.lead;
    setCertName(trackLead?.name || "");
    setCertEmail(trackLead?.email || "");
    setCertOrg(trackLead?.org || "");
    setCertRole(trackLead?.role || "");
    setCertDept(trackLead?.dept || "");
    setCertClaimed(Boolean(trackLead && trackLead.captured));

    // If certificate is claimed locally, check with database
    if (trackLead && trackLead.captured && (trackLead.email || trackLead.name)) {
      let isMounted = true;
      const lookupTerm = trackLead.email || trackLead.name;
      verifyCertificate(lookupTerm)
        .then((res) => {
          if (!isMounted) return;
          // If deleted by admin from database (not found)
          if (!res || !res.id) {
            updateTrackState(currentTrackId, (prev) => ({
              ...prev,
              lead: undefined,
            }));
            setCertClaimed(false);
            setCertName("");
            setCertEmail("");
            setCertOrg("");
            setCertRole("");
            setCertDept("");
          }
        })
        .catch(() => {
          // Network offline fallback
        });

      return () => {
        isMounted = false;
      };
    }
  }, [currentTrackId, currentTrackState.lead]);

  const handleClaimCertificateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTrackId || !activeTrackConfig) return;
    if (!certName.trim() || !certEmail.trim()) {
      toast.error("Please provide your full legal name and email address.");
      return;
    }

    const generatedRef = generateCertificateReference(
      activeTrackConfig.certCodePrefix,
      certName.trim() || "Candidate",
      certEmail.trim() || "email@example.com",
      new Date().toISOString()
    );

    try {
      await claimCertificate({
        name: certName.trim(),
        email: certEmail.trim(),
        school: certOrg.trim() || `${activeTrackConfig.name} Graduate`,
        track: currentTrackId,
        course_name: activeTrackConfig.certTitle || activeTrackConfig.name,
        certificate_id: generatedRef,
        organization: certOrg.trim(),
        role: certRole.trim(),
        department: certDept.trim(),
      });
    } catch {
      // Local fallback continues gracefully
    }

    const leadData = {
      name: certName.trim(),
      email: certEmail.trim(),
      org: certOrg.trim(),
      role: certRole.trim(),
      dept: certDept.trim(),
      date: new Date().toISOString(),
      captured: true,
    };

    updateTrackState(currentTrackId, (prev) => ({
      ...prev,
      lead: leadData,
    }));

    setCertClaimed(true);
    toast.success(`✓ ${activeTrackConfig.name} Certificate issued and stored in database!`);
  };

  const handleResetCertificate = () => {
    if (!currentTrackId) return;
    if (confirm("Reset this certificate recipient info so you can re-enter new details?")) {
      updateTrackState(currentTrackId, (prev) => ({
        ...prev,
        lead: undefined,
      }));
      setCertName("");
      setCertEmail("");
      setCertOrg("");
      setCertRole("");
      setCertDept("");
      setCertClaimed(false);
      toast.success("Certificate details reset. You can now claim with new recipient details.");
    }
  };

  const LETTERS = ["A", "B", "C", "D"];

  const certReference = useMemo(() => {
    if (!activeTrackConfig) return "";
    return generateCertificateReference(
      activeTrackConfig.certCodePrefix,
      certName || "Candidate",
      certEmail || "email@example.com",
      currentTrackState.lead?.date
    );
  }, [activeTrackConfig, certName, certEmail, currentTrackState.lead?.date]);

  // ════════════════════════════════════════════════════════════════════
  // 1. HUB LANDING / COURSE CATALOG VIEW (When no course is active)
  // ════════════════════════════════════════════════════════════════════
  if (!currentTrackId || !activeTrackConfig) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans pb-20 text-slate-900 selection:bg-brand-red selection:text-white">
        {/* ── Main PageHero Section ── */}
        <PageHero
          badge="Applied AI Academy · Multi-Track"
          title={
            <>
              Master Applied AI for{" "}
              <span className="gradient-text block sm:inline mt-1 sm:mt-0">
                Clinical, Banking &amp; Career
              </span>
            </>
          }
          subtitle="Domain-specific AI programmes developed by Red Dot Technologies with interactive labs, assessments, and verified credentials."
          actions={
            <a
              href="#course-catalog"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-red hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm px-5 sm:px-7 py-2.5 sm:py-3 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <LayoutGrid className="h-4 w-4" />
              <span>Explore 3 Applied Tracks</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          }
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-4xl mx-auto pt-2 sm:pt-4 w-full">
            <div className="bg-white/90 border border-slate-200/90 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 shadow-2xs backdrop-blur-xs text-center">
              <div className="text-lg sm:text-2xl font-black text-brand-ink">3</div>
              <div className="text-[10px] sm:text-xs text-slate-500 font-bold mt-0.5">Specialized Tracks</div>
            </div>
            <div className="bg-white/90 border border-slate-200/90 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 shadow-2xs backdrop-blur-xs text-center">
              <div className="text-lg sm:text-2xl font-black text-brand-ink">22</div>
              <div className="text-[10px] sm:text-xs text-slate-500 font-bold mt-0.5">In-Depth Modules</div>
            </div>
            <div className="bg-white/90 border border-slate-200/90 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 shadow-2xs backdrop-blur-xs text-center">
              <div className="text-lg sm:text-2xl font-black text-brand-ink">100+</div>
              <div className="text-[10px] sm:text-xs text-slate-500 font-bold mt-0.5">Quiz Questions</div>
            </div>
            <div className="bg-white/90 border border-slate-200/90 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 shadow-2xs backdrop-blur-xs text-center">
              <div className="text-lg sm:text-2xl font-black text-emerald-600">100%</div>
              <div className="text-[10px] sm:text-xs text-slate-500 font-bold mt-0.5">Verified Certs</div>
            </div>
          </div>
        </PageHero>

        {/* ── Course Catalog Grid Section ── */}
        <section id="course-catalog" className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-8 sm:mb-12">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-brand-red bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full">
              Industry-Specific Curricula
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Select Your Learning Track
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mx-auto">
              Choose from foundational general literacy, clinical diagnostics for healthcare, or regulated financial AI for banking professionals.
            </p>
          </div>

          {/* 3 Course Cards Modern Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch max-w-6xl mx-auto">
            {/* Card 1: Foundations */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 hover:border-slate-400 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group">
              <div className="p-4 sm:p-6 space-y-3.5 sm:space-y-4">
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200 px-2.5 py-0.5 rounded-full">
                    100% Free · Community
                  </span>
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> 2 Hours
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                    <Brain className="h-5 w-5 sm:h-5.5 sm:w-5.5 text-red-400" />
                  </div>
                  <h3 className="text-base sm:text-xl font-black text-slate-900 group-hover:text-brand-red transition-colors leading-snug">
                    AI Foundations &amp; Literacy
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 font-medium leading-relaxed">
                    Essential artificial intelligence concepts, prompt engineering, multimodal creation, study systems, and critical AI safety.
                  </p>
                </div>

                {/* Modules list preview */}
                <div className="space-y-1.5 pt-2.5 border-t border-slate-100">
                  <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center justify-between">
                    <span>5 Core Modules</span>
                    <span className="text-slate-400">All Free</span>
                  </div>
                  <ul className="space-y-1 text-xs text-slate-700 font-medium">
                    <li className="flex items-center gap-2">
                      <span className="h-4.5 w-4.5 rounded-md bg-red-50 text-brand-red text-[10px] font-black flex items-center justify-center shrink-0 border border-red-100">
                        1
                      </span>
                      <span className="truncate">Neural Networks, Transformers &amp; LLMs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-4.5 w-4.5 rounded-md bg-red-50 text-brand-red text-[10px] font-black flex items-center justify-center shrink-0 border border-red-100">
                        2
                      </span>
                      <span className="truncate">Prompt Engineering &amp; Role Conditioning</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-4.5 w-4.5 rounded-md bg-red-50 text-brand-red text-[10px] font-black flex items-center justify-center shrink-0 border border-red-100">
                        3
                      </span>
                      <span className="truncate">Multimodal Image, Audio &amp; Video Gen</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-4.5 w-4.5 rounded-md bg-red-50 text-brand-red text-[10px] font-black flex items-center justify-center shrink-0 border border-red-100">
                        4
                      </span>
                      <span className="truncate">AI for Productivity &amp; Research</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-4.5 w-4.5 rounded-md bg-red-50 text-brand-red text-[10px] font-black flex items-center justify-center shrink-0 border border-red-100">
                        5
                      </span>
                      <span className="truncate">Ethics, Hallucinations &amp; AI Safety</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-3.5 sm:p-5 bg-slate-50 border-t border-slate-100 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-black text-slate-900">Enrolment: Free</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1 text-[11px] sm:text-xs">
                    <Check className="h-3.5 w-3.5" /> Free Digital Certificate
                  </span>
                </div>
                <button
                  onClick={() => openCourse("foundations", "home")}
                  className="w-full rounded-xl bg-slate-900 hover:bg-brand-red text-white text-xs sm:text-sm font-black py-2.5 shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Start Free Foundations Track</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Card 2: Healthcare (Featured) */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-emerald-500 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group relative">
              <div className="bg-emerald-600 text-white text-center py-0.5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest">
                ⭐ Highly Recommended for Clinicians
              </div>

              <div className="p-4 sm:p-6 space-y-3.5 sm:space-y-4">
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Stethoscope className="h-3 w-3 text-emerald-700" />
                    Clinical Applied Track
                  </span>
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> 7+ Hours
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-emerald-950 text-white flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                    <Stethoscope className="h-5 w-5 sm:h-5.5 sm:w-5.5 text-emerald-400" />
                  </div>
                  <h3 className="text-base sm:text-xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                    AI for Healthcare Professionals
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 font-medium leading-relaxed">
                    Clinical decision support, diagnostic deep learning, ambient scribes, healthcare ethics, and the 10-20-70 implementation framework.
                  </p>
                </div>

                {/* Highlights */}
                <div className="space-y-1.5 pt-2.5 border-t border-slate-100">
                  <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center justify-between">
                    <span>9 Clinical Modules</span>
                    <span className="text-emerald-700 font-bold">Module 1 Free Preview</span>
                  </div>
                  <ul className="space-y-1 text-xs text-slate-700 font-medium">
                    <li className="flex items-center gap-2">
                      <span className="h-4.5 w-4.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-black flex items-center justify-center shrink-0 border border-emerald-200">
                        1
                      </span>
                      <span className="truncate">Clinical AI &amp; Diagnostic CNN Foundations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-4.5 w-4.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-black flex items-center justify-center shrink-0 border border-emerald-200">
                        2
                      </span>
                      <span className="truncate">Electronic Health Records &amp; Data Realities</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-4.5 w-4.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-black flex items-center justify-center shrink-0 border border-emerald-200">
                        3
                      </span>
                      <span className="truncate">Case Studies: TB X-ray, Retinopathy &amp; Cry</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-4.5 w-4.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-black flex items-center justify-center shrink-0 border border-emerald-200">
                        4
                      </span>
                      <span className="truncate">Ambient Generative Clinical Scribing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-4.5 w-4.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-black flex items-center justify-center shrink-0 border border-emerald-200">
                        5
                      </span>
                      <span className="truncate">10-20-70 Deployment &amp; Hospital Governance</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-3.5 sm:p-5 bg-emerald-50/60 border-t border-emerald-100 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-black text-slate-900 text-xs sm:text-sm">NPR 1,499</span>{" "}
                    <span className="line-through text-slate-400 text-[10px] sm:text-[11px]">NPR 2,999</span>
                  </div>
                  <span className="font-bold text-emerald-700 bg-white border border-emerald-200 px-2 py-0.5 rounded-full text-[10px]">
                    Module 1 Free
                  </span>
                </div>
                <button
                  onClick={() => openCourse("healthcare", "home")}
                  className="w-full rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-black py-2.5 shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Healthcare Track</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Card 3: Finance */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 hover:border-blue-400 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group md:col-span-2 lg:col-span-1 max-w-lg md:mx-auto lg:max-w-none w-full">
              <div className="p-4 sm:p-6 space-y-3.5 sm:space-y-4">
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Building2 className="h-3 w-3 text-blue-700" />
                    Banking &amp; FinTech Track
                  </span>
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> 7+ Hours
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-blue-950 text-white flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                    <Building2 className="h-5 w-5 sm:h-5.5 sm:w-5.5 text-blue-400" />
                  </div>
                  <h3 className="text-base sm:text-xl font-black text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                    AI for Financial Professionals
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 font-medium leading-relaxed">
                    Credit scoring ML, fraud AML graph detection, generative banking &amp; RAG, model risk governance, and Nepal Rastra Bank AI Guidelines.
                  </p>
                </div>

                {/* Highlights */}
                <div className="space-y-1.5 pt-2.5 border-t border-slate-100">
                  <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center justify-between">
                    <span>8 Financial Modules</span>
                    <span className="text-blue-700 font-bold">Module 1 Free Preview</span>
                  </div>
                  <ul className="space-y-1 text-xs text-slate-700 font-medium">
                    <li className="flex items-center gap-2">
                      <span className="h-4.5 w-4.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-black flex items-center justify-center shrink-0 border border-blue-200">
                        1
                      </span>
                      <span className="truncate">Banking AI Foundations &amp; Value Levers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-4.5 w-4.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-black flex items-center justify-center shrink-0 border border-blue-200">
                        2
                      </span>
                      <span className="truncate">Credit Risk ML vs Traditional Scorecards</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-4.5 w-4.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-black flex items-center justify-center shrink-0 border border-blue-200">
                        3
                      </span>
                      <span className="truncate">Real-Time Fraud &amp; Mule Account Graphs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-4.5 w-4.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-black flex items-center justify-center shrink-0 border border-blue-200">
                        4
                      </span>
                      <span className="truncate">Generative Banking &amp; Policy RAG Search</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-4.5 w-4.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-black flex items-center justify-center shrink-0 border border-blue-200">
                        5
                      </span>
                      <span className="truncate">Model Risk Management &amp; NRB Compliance</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-3.5 sm:p-5 bg-blue-50/60 border-t border-blue-100 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-black text-slate-900 text-xs sm:text-sm">NPR 1,499</span>{" "}
                    <span className="line-through text-slate-400 text-[10px] sm:text-[11px]">NPR 2,999</span>
                  </div>
                  <span className="font-bold text-blue-700 bg-white border border-blue-200 px-2 py-0.5 rounded-full text-[10px]">
                    Module 1 Free
                  </span>
                </div>
                <button
                  onClick={() => openCourse("finance", "home")}
                  className="w-full rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs sm:text-sm font-black py-2.5 shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Finance Track</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Key Advantages Grid Section ── */}
        <section className="bg-white border-y border-slate-200/90 py-10 sm:py-16">
          <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-8 sm:mb-12">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-brand-red bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full">
                Applied AI Advantage
              </span>
              <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Why Professionals Choose Red Dot Applied AI
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Not just theory—practical blueprints engineered for immediate workplace and clinical impact.
              </p>
            </div>

            {/* 2-Column Responsive Feature Grid */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 max-w-5xl mx-auto">
              {/* Feature 1 */}
              <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-red-300 hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-2 sm:space-y-3 group">
                <div className="flex items-center justify-between">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-red-50 text-brand-red flex items-center justify-center font-bold border border-red-100 shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                    <Brain className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span className="text-[9px] sm:text-xs font-mono font-black text-slate-400 bg-white border border-slate-200 px-1.5 py-0.2 rounded-full">
                    01
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-black text-xs sm:text-base text-slate-900 group-hover:text-brand-red transition-colors leading-tight">
                    Domain-Specific Focus
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-600 leading-snug sm:leading-relaxed font-medium">
                    Curricula engineered specifically for hospital diagnostic workflows, clinical decision support, credit underwriting, and fraud detection.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-2 sm:space-y-3 group">
                <div className="flex items-center justify-between">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold border border-emerald-100 shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                    <Layers className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span className="text-[9px] sm:text-xs font-mono font-black text-slate-400 bg-white border border-slate-200 px-1.5 py-0.2 rounded-full">
                    02
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-black text-xs sm:text-base text-slate-900 group-hover:text-emerald-700 transition-colors leading-tight">
                    Interactive Visual Labs
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-600 leading-snug sm:leading-relaxed font-medium">
                    Visual animated architectures demonstrating neural layers, RAG retrieval pipelines, EHR linkage, and triage decision trees.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-2 sm:space-y-3 group">
                <div className="flex items-center justify-between">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold border border-blue-100 shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span className="text-[9px] sm:text-xs font-mono font-black text-slate-400 bg-white border border-slate-200 px-1.5 py-0.2 rounded-full">
                    03
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-black text-xs sm:text-base text-slate-900 group-hover:text-blue-700 transition-colors leading-tight">
                    Mastery Assessment Engine
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-600 leading-snug sm:leading-relaxed font-medium">
                    Module-by-module quizzes with instant explanatory feedback and scenario-based testing to solidify conceptual understanding.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-300 hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-2 sm:space-y-3 group">
                <div className="flex items-center justify-between">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold border border-amber-100 shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                    <Award className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span className="text-[9px] sm:text-xs font-mono font-black text-slate-400 bg-white border border-slate-200 px-1.5 py-0.2 rounded-full">
                    04
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-black text-xs sm:text-base text-slate-900 group-hover:text-amber-700 transition-colors leading-tight">
                    Verifiable Credentials
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-600 leading-snug sm:leading-relaxed font-medium">
                    Earn high-resolution digital certificates complete with unique reference IDs, cryptographic verification, and PDF print layout.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════
  // 2. DEDICATED COURSE PLAYER VIEW (When a course track is selected)
  // ════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-slate-50 font-sans pt-20 sm:pt-24 pb-16 sm:pb-20 text-slate-900 selection:bg-brand-red selection:text-white">
      {/* ── Top Course Navigation Bar ── */}
      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 pt-1 sm:pt-2 pb-2 sm:pb-3">
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs p-2.5 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {/* Back button + Track Title */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={backToCatalog}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 px-2.5 py-1 text-[11px] sm:text-xs font-bold text-slate-700 transition-colors cursor-pointer shrink-0"
              title="Return to AI Unlocked 3 Courses"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>All Courses</span>
            </button>

            <div className="h-4 w-px bg-slate-200" />

            <div className="min-w-0">
              <span className="text-[9px] font-black uppercase tracking-wider text-brand-red block leading-none">
                Active Track
              </span>
              <h2 className="text-xs sm:text-sm font-black text-slate-900 leading-tight truncate">
                {activeTrackConfig.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Single Mobile Syllabus Drawer Trigger (Visible on screens < lg) */}
        <div className="mt-2 flex items-center justify-between gap-2 lg:hidden">
          <button
            onClick={() => setMobileSideOpen(true)}
            className="w-full inline-flex items-center justify-between rounded-xl bg-slate-900 hover:bg-brand-red text-white px-3 py-2 text-xs font-bold shadow-2xs transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Menu className="h-3.5 w-3.5 text-red-400" />
              <span>Course Syllabus &amp; Modules ({completedCount}/{totalLessons} Done)</span>
            </div>
            <span className="text-[10px] font-black text-slate-300 bg-white/10 px-2 py-0.5 rounded-md">
              {progressPercent}%
            </span>
          </button>
        </div>
      </div>

      {/* ── Main Course Layout: Left Syllabus Sidebar + Right Content Area ── */}
      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 pt-1 pb-16">
        {/* Backdrop on mobile when drawer is open */}
        {mobileSideOpen && (
          <div
            onClick={() => setMobileSideOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden"
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 items-start">
          {/* ── Left Sidebar (Mobile Drawer / Desktop Sticky Sidebar) ── */}
          <aside
            className={[
              "rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/90 bg-white",
              mobileSideOpen
                ? "fixed inset-x-3 top-16 bottom-4 z-50 overflow-y-auto block shadow-2xl lg:relative lg:inset-auto lg:top-28 lg:bottom-auto lg:z-auto lg:max-h-none lg:shadow-2xs lg:col-span-1 lg:sticky"
                : "hidden lg:block lg:col-span-1 lg:sticky lg:top-28 lg:shadow-2xs",
            ].join(" ")}
          >
            {/* Sidebar header */}
            <div className="px-3.5 sm:px-4 py-3 bg-slate-50/90 border-b border-slate-100">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-brand-red">
                    {activeTrackConfig.shortName}
                  </span>
                  <p className="text-xs font-black text-slate-800 flex items-center gap-1.5 mt-0.5">
                    <GraduationCap className="h-3.5 w-3.5 text-slate-700" />
                    Course Syllabus
                  </p>
                </div>

                <button
                  onClick={() => setMobileSideOpen(false)}
                  aria-label="Toggle lessons menu"
                  className="lg:hidden flex items-center gap-1 rounded-lg bg-white border border-slate-200 px-2 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                  Close
                </button>
              </div>

              {/* Progress bar */}
              <div className="mt-2 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span className="text-slate-500">Progress</span>
                  <span className="text-slate-900 font-black">
                    {completedCount}/{totalLessons} ({progressPercent}%)
                  </span>
                </div>
                <div className="relative h-1.5 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-red to-rose-600 transition-all duration-700"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Navigation links */}
            <nav className="p-2 space-y-1">
              {/* Overview */}
              <button
                onClick={() => navigateView("home")}
                className={[
                  "w-full flex items-center gap-2 rounded-lg sm:rounded-xl px-2.5 py-1.5 text-xs font-bold transition-all text-left cursor-pointer",
                  activeView === "home"
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                ].join(" ")}
              >
                <span
                  className={[
                    "flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-md text-[11px] font-black",
                    activeView === "home"
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-600",
                  ].join(" ")}
                >
                  <BookOpen className="h-3 w-3" />
                </span>
                <span className="truncate font-extrabold text-xs">
                  Programme Overview
                </span>
              </button>

              {/* Modules List */}
              {currentLessons.map((lesson, idx) => {
                const isLocked = isLessonLocked(lesson.id);
                const isDone = isTrackUnlocked && !isLocked && !!currentTrackState.done?.[lesson.id];
                const isActive =
                  activeView === lesson.id || activeView === `q_${lesson.id}`;

                return (
                  <button
                    key={lesson.id}
                    onClick={() => navigateView(lesson.id)}
                    className={[
                      "w-full flex items-center gap-2 rounded-lg sm:rounded-xl px-2.5 py-1.5 text-xs font-bold transition-all text-left group cursor-pointer",
                      isActive
                        ? "bg-brand-red text-white shadow-2xs"
                        : isDone
                          ? "bg-emerald-50 text-emerald-900 border border-emerald-100"
                          : isLocked
                            ? "text-slate-500 hover:bg-slate-50 opacity-90"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-md text-[10px] font-black transition-colors",
                        isLocked
                          ? "bg-amber-50 text-amber-600 border border-amber-200/60"
                          : isDone
                            ? "bg-emerald-500 text-white"
                            : isActive
                              ? "bg-white text-brand-red"
                              : "bg-slate-100 text-slate-600 group-hover:bg-slate-200",
                      ].join(" ")}
                    >
                      {isLocked ? (
                        <Lock className="h-2.5 w-2.5 text-amber-600" />
                      ) : isDone ? (
                        <Check className="h-3 w-3 stroke-[3]" />
                      ) : (
                        idx + 1
                      )}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[9px] font-extrabold uppercase tracking-wider opacity-75">
                          {lesson.tag}
                        </span>
                        {isLocked ? (
                          <span className="inline-flex items-center gap-0.5 text-[8px] bg-amber-50 text-amber-700 border border-amber-200/70 px-1 py-0.2 rounded font-bold">
                            <Lock className="h-2 w-2" /> LOCKED
                          </span>
                        ) : isDone ? (
                          <span className="text-[8px] bg-emerald-600 text-white px-1 py-0.2 rounded font-black">
                            PASSED
                          </span>
                        ) : !activeTrackConfig.isPaid ? null : (
                          <span className="text-[8px] bg-emerald-100 text-emerald-800 px-1 rounded font-bold">
                            FREE
                          </span>
                        )}
                      </div>
                      <p className="truncate font-bold leading-tight text-[11px]">
                        {lesson.title}
                      </p>
                    </div>

                    <ChevronRight
                      className={[
                        "h-3 w-3 shrink-0 transition-opacity",
                        isActive
                          ? "opacity-90"
                          : "opacity-30 group-hover:opacity-60",
                      ].join(" ")}
                    />
                  </button>
                );
              })}

              {/* Research Sources Tab (for Healthcare and Finance) */}
              {activeTrackConfig.isPaid && (
                <button
                  onClick={() => navigateView("sources")}
                  className={[
                    "w-full flex items-center gap-2 rounded-lg sm:rounded-xl px-2.5 py-1.5 text-xs font-bold transition-all text-left cursor-pointer",
                    activeView === "sources"
                      ? "bg-slate-900 text-white shadow-2xs"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-md text-xs font-black",
                      activeView === "sources"
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-600",
                    ].join(" ")}
                  >
                    <BookMarked className="h-3 w-3" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-extrabold truncate text-xs">
                      Sources &amp; Reading
                    </p>
                  </div>
                </button>
              )}

              {/* Paywall Link if not unlocked */}
              {activeTrackConfig.isPaid && !isTrackUnlocked && (
                <button
                  onClick={() => navigateView("pay")}
                  className={[
                    "w-full flex items-center gap-2 rounded-lg sm:rounded-xl px-2.5 py-1.5 text-xs font-bold transition-all text-left cursor-pointer",
                    activeView === "pay"
                      ? "bg-amber-600 text-white shadow-2xs"
                      : "bg-amber-50 text-amber-900 border border-amber-200/80 hover:bg-amber-100/70",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-md text-xs font-black",
                      activeView === "pay"
                        ? "bg-white/20 text-white"
                        : "bg-amber-200 text-amber-900",
                    ].join(" ")}
                  >
                    <QrCode className="h-3 w-3" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-extrabold truncate text-xs">
                      Unlock Full Access
                    </p>
                    <p className="text-[9px] font-medium opacity-80 truncate">
                      {activeTrackConfig.price?.currency}{" "}
                      {activeTrackConfig.price?.amount}
                    </p>
                  </div>
                </button>
              )}

              {/* Divider */}
              <div className="my-1 border-t border-slate-100" />

              {/* Certificate */}
              <button
                onClick={() => navigateView("cert")}
                className={[
                  "w-full flex items-center gap-2 rounded-lg sm:rounded-xl px-2.5 py-1.5 text-xs font-bold transition-all text-left cursor-pointer",
                  activeView === "cert"
                    ? "bg-slate-900 text-white shadow-2xs"
                    : isCourseComplete
                      ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-2xs"
                      : "text-slate-400 hover:bg-slate-50",
                ].join(" ")}
              >
                <span
                  className={[
                    "flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-md text-xs font-black",
                    activeView === "cert" || isCourseComplete
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-400",
                  ].join(" ")}
                >
                  <Award className="h-3 w-3" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-extrabold truncate text-xs">
                      Certificate
                    </p>
                    {isCourseComplete ? (
                      <span className="text-[8px] bg-white text-emerald-800 px-1 py-0.2 rounded font-black">
                        READY
                      </span>
                    ) : (
                      <Lock className="h-2.5 w-2.5 opacity-50" />
                    )}
                  </div>
                  <p className="text-[9px] font-normal opacity-70 truncate">
                    {isCourseComplete
                      ? "Ready to claim"
                      : `${completedCount}/${totalLessons} completed`}
                  </p>
                </div>
              </button>
            </nav>
          </aside>

          {/* ── Right Content Area ── */}
          <main
            className={[
              "lg:col-span-3 transition-opacity duration-150 space-y-4 sm:space-y-5",
              contentVisible ? "opacity-100" : "opacity-0",
            ].join(" ")}
          >
            {/* ══════════════════════════════════════════════════════════
                1. OVERVIEW / HOME VIEW
            ══════════════════════════════════════════════════════════ */}
            {activeView === "home" && (
              <div className="space-y-4 sm:space-y-5 animate-fade-in-up" style={{ animationDuration: "0.3s" }}>
                {/* Hero card */}
                <div
                  className={[
                    "relative overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 text-slate-900 border shadow-2xs flex flex-col justify-center",
                    currentTrackId === "healthcare"
                      ? "bg-gradient-to-br from-emerald-50/90 via-white to-white border-emerald-200"
                      : currentTrackId === "finance"
                        ? "bg-gradient-to-br from-blue-50/90 via-white to-white border-blue-200"
                        : "bg-gradient-to-br from-red-50/70 via-white to-white border-red-200",
                  ].join(" ")}
                >
                  {/* Ambient spotlight */}
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-20 blur-3xl"
                    style={{
                      background:
                        currentTrackId === "healthcare"
                          ? "radial-gradient(circle, #10b981 0%, transparent 70%)"
                          : currentTrackId === "finance"
                            ? "radial-gradient(circle, #3b82f6 0%, transparent 70%)"
                            : "radial-gradient(circle, var(--brand-red, #C8102E) 0%, transparent 70%)",
                    }}
                  />

                  <div className="relative z-10 space-y-3 sm:space-y-4">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white border border-slate-200/90 px-2.5 py-0.5 text-[10px] sm:text-xs font-bold text-slate-800 shadow-2xs">
                        <span
                          className={`h-1.5 w-1.5 rounded-full animate-pulse ${
                            currentTrackId === "healthcare"
                              ? "bg-emerald-500"
                              : currentTrackId === "finance"
                                ? "bg-blue-500"
                                : "bg-brand-red"
                          }`}
                        />
                        {activeTrackConfig.badge}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white border border-slate-200/90 px-2.5 py-0.5 text-[10px] sm:text-xs font-bold text-slate-700 shadow-2xs">
                        <Zap className="h-3 w-3 text-amber-500" />
                        {activeTrackConfig.durationLabel}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white border border-slate-200/90 px-2.5 py-0.5 text-[10px] sm:text-xs font-bold text-slate-700 shadow-2xs">
                        <Award className="h-3 w-3 text-amber-500" />
                        Verified Credential
                      </span>
                    </div>

                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-black leading-tight tracking-tight text-slate-900">
                      {activeTrackConfig.name}
                    </h1>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl font-medium">
                      {activeTrackConfig.description}
                    </p>

                    <div className="pt-1 flex flex-wrap items-center gap-2 sm:gap-2.5">
                      <button
                        onClick={() => navigateView(currentLessons[0].id)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-brand-red hover:bg-red-700 text-white font-black text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 shadow-xs hover:shadow-md transition-all cursor-pointer"
                      >
                        <span>
                          {isTrackUnlocked
                            ? `Begin ${currentLessons[0].tag}`
                            : `Start Free Preview (${currentLessons[0].tag})`}
                        </span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>

                      {activeTrackConfig.isPaid && !isTrackUnlocked && (
                        <button
                          onClick={() => navigateView("pay")}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm px-3.5 sm:px-4 py-2 sm:py-2.5 shadow-2xs transition-colors cursor-pointer"
                        >
                          <QrCode className="h-3.5 w-3.5" />
                          <span>
                            Unlock Track · {activeTrackConfig.price?.currency}{" "}
                            {activeTrackConfig.price?.amount}
                          </span>
                        </button>
                      )}

                      {activeTrackConfig.isPaid && (
                        <button
                          onClick={() => navigateView("sources")}
                          className="inline-flex items-center gap-1 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5 border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                        >
                          <BookMarked className="h-3.5 w-3.5 text-blue-600" />
                          <span>Research &amp; Sources</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* 3 Pillar Features Responsive Cards (3-column Grid on Mobile & Desktop) */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3.5">
                  {currentTrackId === "healthcare" ? (
                    <>
                      <div className="bg-white p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0">
                          <Stethoscope className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1">
                          <h3 className="font-black text-[11px] sm:text-xs md:text-sm text-slate-900 leading-tight">
                            Built for Clinical Practice
                          </h3>
                          <p className="text-[10px] sm:text-[11px] md:text-xs text-slate-600 leading-tight sm:leading-relaxed font-medium">
                            Applied directly to diagnosis, radiology, triage, clinical workflows, and patient safety in Nepal.
                          </p>
                        </div>
                      </div>
                      <div className="bg-white p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold shrink-0">
                          <Brain className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1">
                          <h3 className="font-black text-[11px] sm:text-xs md:text-sm text-slate-900 leading-tight">
                            Real-World Deployments
                          </h3>
                          <p className="text-[10px] sm:text-[11px] md:text-xs text-slate-600 leading-tight sm:leading-relaxed font-medium">
                            Case studies in TB X-ray screening, diabetic retinopathy, ambient scribes, and neonatal cry analysis.
                          </p>
                        </div>
                      </div>
                      <div className="bg-white p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold shrink-0">
                          <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1">
                          <h3 className="font-black text-[11px] sm:text-xs md:text-sm text-slate-900 leading-tight">
                            Governance &amp; 10-20-70 Rule
                          </h3>
                          <p className="text-[10px] sm:text-[11px] md:text-xs text-slate-600 leading-tight sm:leading-relaxed font-medium">
                            Evaluate clinical AI safety, dataset shift, and submit defensible proposals to hospital committees.
                          </p>
                        </div>
                      </div>
                    </>
                  ) : currentTrackId === "finance" ? (
                    <>
                      <div className="bg-white p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold shrink-0">
                          <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1">
                          <h3 className="font-black text-[11px] sm:text-xs md:text-sm text-slate-900 leading-tight">
                            Board &amp; Supervisory Ready
                          </h3>
                          <p className="text-[10px] sm:text-[11px] md:text-xs text-slate-600 leading-tight sm:leading-relaxed font-medium">
                            Grounded in Nepal Rastra Bank AI Guidelines, placing ultimate accountability on management and boards.
                          </p>
                        </div>
                      </div>
                      <div className="bg-white p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-red-50 text-brand-red flex items-center justify-center font-bold shrink-0">
                          <Brain className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1">
                          <h3 className="font-black text-[11px] sm:text-xs md:text-sm text-slate-900 leading-tight">
                            Credit Scoring &amp; Fraud AML
                          </h3>
                          <p className="text-[10px] sm:text-[11px] md:text-xs text-slate-600 leading-tight sm:leading-relaxed font-medium">
                            Supervised credit ML vs scorecards, mule account network detection, precision vs recall trade-offs.
                          </p>
                        </div>
                      </div>
                      <div className="bg-white p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold shrink-0">
                          <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1">
                          <h3 className="font-black text-[11px] sm:text-xs md:text-sm text-slate-900 leading-tight">
                            Generative Banking &amp; RAG
                          </h3>
                          <p className="text-[10px] sm:text-[11px] md:text-xs text-slate-600 leading-tight sm:leading-relaxed font-medium">
                            Deterministic core + LLM interface architecture, policy RAG search, and avoiding model hallucination.
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-white p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-red-50 text-brand-red flex items-center justify-center font-bold shrink-0">
                          <Brain className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1">
                          <h3 className="font-black text-[11px] sm:text-xs md:text-sm text-slate-900 leading-tight">
                            Neural Foundations
                          </h3>
                          <p className="text-[10px] sm:text-[11px] md:text-xs text-slate-600 leading-tight sm:leading-relaxed font-medium">
                            Understand how models learn from weights, parameters, tokens, and inference without confusing jargon.
                          </p>
                        </div>
                      </div>
                      <div className="bg-white p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0">
                          <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1">
                          <h3 className="font-black text-[11px] sm:text-xs md:text-sm text-slate-900 leading-tight">
                            Advanced Prompting
                          </h3>
                          <p className="text-[10px] sm:text-[11px] md:text-xs text-slate-600 leading-tight sm:leading-relaxed font-medium">
                            Master role steering, few-shot conditioning, multimodal image/audio prompting, and context management.
                          </p>
                        </div>
                      </div>
                      <div className="bg-white p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold shrink-0">
                          <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1">
                          <h3 className="font-black text-[11px] sm:text-xs md:text-sm text-slate-900 leading-tight">
                            Free Verified Credential
                          </h3>
                          <p className="text-[10px] sm:text-[11px] md:text-xs text-slate-600 leading-tight sm:leading-relaxed font-medium">
                            Pass 5 short mastery quizzes to earn a shareable, verified Red Dot Technologies digital certificate.
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Course Curriculum List */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 px-0.5">
                    <div>
                      <h2 className="text-sm sm:text-base font-black text-slate-900">
                        {activeTrackConfig.name} Curriculum
                      </h2>
                      <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                        {currentLessons.length} structured modules designed for real-world mastery
                      </p>
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-full shadow-2xs">
                      {currentLessons.length} Modules • {currentLessons.reduce((acc, l) => acc + l.quiz.length, 0)} Questions
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {currentLessons.map((lesson, idx) => {
                      const isLocked = isLessonLocked(lesson.id);
                      const isDone = isTrackUnlocked && !isLocked && !!currentTrackState.done?.[lesson.id];

                      return (
                        <div
                          key={lesson.id}
                          className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 hover:border-slate-300 transition-all"
                        >
                          <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-700 text-xs shrink-0 border border-slate-200">
                              {idx + 1}
                            </div>
                            <div className="space-y-0.5 min-w-0">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-brand-red">
                                  {lesson.tag}
                                </span>
                                <span className="text-slate-300">•</span>
                                <span className="text-[10px] sm:text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                                  <Clock className="h-3 w-3" />
                                  {lesson.time}
                                </span>
                                {isDone ? (
                                  <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 text-[9px] font-black">
                                    <Check className="h-2.5 w-2.5" /> Done
                                  </span>
                                ) : isLocked ? (
                                  <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.2 text-[9px] font-bold">
                                    <Lock className="h-2.5 w-2.5" /> Locked
                                  </span>
                                ) : !activeTrackConfig.isPaid ? null : (
                                  <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 text-[9px] font-bold">
                                    Free Preview
                                  </span>
                                )}
                              </div>
                              <h3 className="font-black text-slate-900 text-xs sm:text-sm leading-snug truncate">
                                {lesson.title}
                              </h3>
                              <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-medium line-clamp-2">
                                {lesson.summary}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end shrink-0 pt-0.5 sm:pt-0">
                            {isLocked ? (
                              <button
                                onClick={() => navigateView("pay")}
                                className="flex-1 sm:flex-none rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs px-3 py-1.5 transition-colors cursor-pointer text-center flex items-center justify-center gap-1"
                              >
                                <Lock className="h-3 w-3" />
                                <span>Unlock Module</span>
                              </button>
                            ) : (
                              <>
                                <button
                                  onClick={() => navigateView(lesson.id)}
                                  className="flex-1 sm:flex-none rounded-lg bg-slate-900 hover:bg-brand-red text-white font-extrabold text-xs px-3 py-1.5 transition-colors cursor-pointer text-center"
                                >
                                  Read Module
                                </button>
                                <button
                                  onClick={() => navigateView(`q_${lesson.id}`)}
                                  className="flex-1 sm:flex-none rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-extrabold text-xs px-2.5 py-1.5 transition-colors cursor-pointer text-center"
                                >
                                  Quiz ({lesson.quiz.length}Q)
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════
                2. INDIVIDUAL LESSON CONTENT VIEW
            ══════════════════════════════════════════════════════════ */}
            {currentLessons.map((lesson, idx) => {
              if (activeView !== lesson.id && activeView !== `q_${lesson.id}`)
                return null;
              const isQuizMode = activeView === `q_${lesson.id}`;
              const isLocked = isLessonLocked(lesson.id);

              if (isLocked) {
                return (
                  <div
                    key={lesson.id}
                    className="bg-white rounded-2xl border border-amber-200/90 shadow-sm p-6 sm:p-10 text-center space-y-4 max-w-2xl mx-auto my-6 animate-fade-in-up"
                  >
                    <div className="h-16 w-16 mx-auto rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center text-3xl shadow-inner">
                      <Lock className="h-8 w-8 text-amber-600" />
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full">
                        {lesson.tag} · Module Locked
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                        {lesson.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-medium">
                        This module is part of the full verified <span className="font-bold text-slate-900">{activeTrackConfig.name}</span> programme. Please unlock full access using your verified Access Code to access all lessons, quizzes, and digital credential.
                      </p>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        onClick={() => navigateView("pay")}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-brand-red text-white font-extrabold text-xs sm:text-sm px-6 py-3 shadow-md transition-all cursor-pointer"
                      >
                        <Lock className="h-4 w-4 text-amber-400" />
                        <span>Unlock Full Course Access</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => navigateView("home")}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm px-4 py-3 transition-colors cursor-pointer"
                      >
                        <span>Course Overview</span>
                      </button>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={lesson.id}
                  className="space-y-4 sm:space-y-5 animate-fade-in-up"
                  style={{ animationDuration: "0.3s" }}
                >
                  {/* Lesson Header Card */}
                  <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs p-3.5 sm:p-6 space-y-2.5 sm:space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-red-50 text-brand-red border border-red-200 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-black uppercase tracking-wider">
                          {lesson.tag}
                        </span>
                        <span className="text-[10px] sm:text-xs text-slate-500 font-medium flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {lesson.time}
                        </span>
                      </div>

                      {/* Mode switch pills (Material vs Quiz) */}
                      <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                        <button
                          onClick={() => navigateView(lesson.id)}
                          className={[
                            "px-3 py-1 rounded-md text-[11px] sm:text-xs font-extrabold transition-all cursor-pointer",
                            !isQuizMode
                              ? "bg-white text-slate-900 shadow-2xs"
                              : "text-slate-600 hover:text-slate-900",
                          ].join(" ")}
                        >
                          Material
                        </button>
                        <button
                          onClick={() => navigateView(`q_${lesson.id}`)}
                          className={[
                            "px-3 py-1 rounded-md text-[11px] sm:text-xs font-extrabold transition-all cursor-pointer",
                            isQuizMode
                              ? "bg-brand-red text-white shadow-2xs"
                              : "text-slate-600 hover:text-slate-900",
                          ].join(" ")}
                        >
                          Practice Quiz ({lesson.quiz.length}Q)
                        </button>
                      </div>
                    </div>

                    <h1 className="text-lg sm:text-2xl font-black text-slate-900 leading-tight">
                      {lesson.title}
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      {lesson.summary}
                    </p>
                  </div>

                  {/* ── Reading Material View ── */}
                  {!isQuizMode && (
                    <div className="space-y-3.5 sm:space-y-4">
                      {/* Learning Objectives Box */}
                      <div className="rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 p-3.5 sm:p-5 space-y-2 sm:space-y-2.5 shadow-2xs">
                        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-black uppercase tracking-wider text-brand-red">
                          <Target className="h-3.5 w-3.5" />
                          <span>What you will learn in this module</span>
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2.5 text-xs sm:text-[13px] text-slate-700 font-medium leading-relaxed">
                          {lesson.objectives.map((obj, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Interactive Animated SVG Diagram */}
                      {renderSvgDiagram(lesson.id) && (
                        <div className="rounded-xl sm:rounded-2xl bg-slate-950 p-2.5 sm:p-6 border border-slate-800 shadow-2xs overflow-hidden">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: sanitizeHtml(renderSvgDiagram(lesson.id)),
                            }}
                            className="overflow-x-auto"
                          />
                          {DIAGRAM_CAPTIONS[lesson.id] && (
                            <p className="mt-2 text-center text-[10px] sm:text-xs text-slate-400 font-medium">
                              {DIAGRAM_CAPTIONS[lesson.id]}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Content Sections */}
                      <div className="space-y-3 sm:space-y-4">
                        {lesson.sections.map((section, sIdx) => (
                          <div
                            key={sIdx}
                            className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs p-3.5 sm:p-6 space-y-2"
                          >
                            <h2 className="text-sm sm:text-lg font-black text-slate-900 flex items-baseline gap-1.5">
                              <span className="text-xs font-bold text-slate-400">
                                {sIdx + 1}.
                              </span>
                              <span>{section.h}</span>
                            </h2>
                            <div
                              dangerouslySetInnerHTML={{ __html: sanitizeHtml(section.html) }}
                              className="text-slate-700 leading-relaxed text-xs sm:text-sm space-y-2 sm:space-y-2.5 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_.callout]:my-2.5 [&_.callout]:p-3 sm:[&_.callout]:p-4 [&_.callout]:rounded-xl [&_.callout.note]:bg-blue-50/70 [&_.callout.note]:border-l-4 [&_.callout.note]:border-blue-500 [&_.callout.warn]:bg-amber-50/70 [&_.callout.warn]:border-l-4 [&_.callout.warn]:border-amber-500 [&_.evid]:my-3 [&_.evid]:p-3 sm:[&_.evid]:p-4 [&_.evid]:rounded-xl [&_.evid]:bg-slate-900 [&_.evid]:text-white [&_.evid_.src]:text-red-400 [&_.evid_.src]:text-[11px] [&_.evid_.src]:font-bold [&_.term]:text-red-600 [&_.term]:font-bold [&_.term]:bg-red-50 [&_.term]:px-1 [&_.term]:py-0.2 [&_.term]:rounded text-[11px] sm:text-xs"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Practitioner's Note */}
                      {lesson.practitioner && (
                        <div className="rounded-xl sm:rounded-2xl bg-blue-50/90 border border-blue-200 p-3.5 sm:p-5 space-y-1.5 shadow-2xs">
                          <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                            {lesson.practitioner.title}
                          </h3>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: sanitizeHtml(lesson.practitioner.text),
                            }}
                            className="text-xs sm:text-sm text-blue-950 leading-relaxed font-medium"
                          />
                        </div>
                      )}

                      {/* Hands-on Workplace Activity */}
                      {lesson.activity && (
                        <div className="rounded-xl sm:rounded-2xl bg-amber-50/90 border border-amber-200 p-3.5 sm:p-5 space-y-1.5 shadow-2xs">
                          <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                            <Lightbulb className="h-3.5 w-3.5 text-amber-600" />
                            {lesson.activity.title}
                          </h3>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: sanitizeHtml(lesson.activity.text),
                            }}
                            className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium"
                          />
                        </div>
                      )}

                      {/* Key Takeaways */}
                      <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-6 space-y-2.5">
                        <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                          <FileCheck className="h-3.5 w-3.5 text-brand-red" />
                          Key Takeaways
                        </h3>
                        <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 font-medium">
                          {lesson.takeaways.map((t, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <span className="h-4.5 w-4.5 rounded-full bg-red-50 text-brand-red text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5 border border-red-200">
                                {i + 1}
                              </span>
                              <span className="leading-snug">{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Paywall CTA Card at end of Free Preview for Paid Tracks */}
                      {activeTrackConfig.isPaid && !isTrackUnlocked && (
                        <div className="bg-gradient-to-r from-amber-900 to-slate-900 text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-amber-500/30 space-y-2.5">
                          <span className="text-[9px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full">
                            End of Free Preview
                          </span>
                          <h3 className="text-base sm:text-xl font-black">
                            Unlock All {totalLessons} Modules &amp; Your Official Certificate
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-200 max-w-2xl font-medium leading-relaxed">
                            Full access unlocks all remaining modules, diagnostic/banking case studies, mastery assessments, and your verified digital certificate of completion for {activeTrackConfig.price?.currency} {activeTrackConfig.price?.amount}.
                          </p>
                          <button
                            onClick={() => navigateView("pay")}
                            className="inline-flex items-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm px-4 py-2.5 shadow-xs transition-all cursor-pointer"
                          >
                            <QrCode className="h-3.5 w-3.5" />
                            <span>Unlock Full Access Now</span>
                          </button>
                        </div>
                      )}

                      {/* Footer Navigation */}
                      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
                        <button
                          onClick={() => {
                            if (idx > 0) navigateView(currentLessons[idx - 1].id);
                            else navigateView("home");
                          }}
                          className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold px-3 py-2 transition-colors cursor-pointer"
                        >
                          <ChevronLeft className="h-3.5 w-3.5" />
                          <span>Previous</span>
                        </button>

                        <button
                          onClick={() => navigateView(`q_${lesson.id}`)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-brand-red hover:bg-red-700 text-white text-xs font-black px-4 sm:px-5 py-2 sm:py-2.5 shadow-xs hover:shadow-md transition-all cursor-pointer"
                        >
                          <span>Take {lesson.tag} Assessment</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── Quiz Mode View ── */}
                  {isQuizMode && (
                    <div className="space-y-4">
                      <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-6 space-y-4">
                        <div className="border-b border-slate-100 pb-3">
                          <h2 className="text-base sm:text-lg font-black text-slate-900">
                            {lesson.tag} Mastery Assessment
                          </h2>
                          <p className="text-xs text-slate-500 mt-0.5 font-medium">
                            Select the correct answer for each of the {lesson.quiz.length} questions below. All questions must be correct to complete the module.
                          </p>
                        </div>

                        {lesson.quiz.map((qItem, qIdx) => {
                          const selectedOption = (currentTrackState.answers?.[lesson.id] || {})[qIdx];
                          const isAnswered = selectedOption !== undefined;
                          const isCorrect = isAnswered && selectedOption === qItem.a;

                          return (
                            <div
                              key={qIdx}
                              className="p-3.5 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2.5"
                            >
                              <div className="flex items-start gap-2">
                                <span className="h-5 w-5 rounded-md bg-slate-900 text-white text-[10px] font-black flex items-center justify-center shrink-0">
                                  {qIdx + 1}
                                </span>
                                <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug">
                                  {qItem.q}
                                </h3>
                              </div>

                              <div className="grid grid-cols-1 gap-1.5 pt-0.5">
                                {qItem.opts.map((optText, oIdx) => {
                                  const isThisSelected = selectedOption === oIdx;
                                  let btnStyle =
                                    "bg-white border-slate-200 text-slate-700 hover:border-slate-300";
                                  if (isAnswered) {
                                    if (oIdx === qItem.a) {
                                      btnStyle =
                                        "bg-emerald-50 border-emerald-300 text-emerald-900 font-bold";
                                    } else if (isThisSelected && !isCorrect) {
                                      btnStyle = "bg-red-50 border-red-300 text-red-900";
                                    }
                                  }

                                  return (
                                    <button
                                      key={oIdx}
                                      onClick={() => handleQuizAnswer(lesson.id, qIdx, oIdx)}
                                      className={`w-full text-left p-2.5 sm:p-3 rounded-lg sm:rounded-xl border text-xs sm:text-sm transition-all flex items-center gap-2.5 cursor-pointer ${btnStyle}`}
                                    >
                                      <span
                                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[10px] font-black ${
                                          isAnswered && oIdx === qItem.a
                                            ? "bg-emerald-500 text-white"
                                            : isThisSelected && !isCorrect
                                              ? "bg-red-500 text-white"
                                              : "bg-slate-100 text-slate-600"
                                        }`}
                                      >
                                        {LETTERS[oIdx]}
                                      </span>
                                      <span className="flex-1 font-medium">{optText}</span>
                                      {isAnswered && oIdx === qItem.a && (
                                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                                      )}
                                    </button>
                                  );
                                })}
                              </div>

                              {isAnswered && (
                                <div
                                  className={`p-2.5 sm:p-3 rounded-lg sm:rounded-xl text-xs font-semibold flex items-start gap-2 ${
                                    isCorrect
                                      ? "bg-emerald-50 border border-emerald-200 text-emerald-900"
                                      : "bg-red-50 border border-red-200 text-red-900"
                                  }`}
                                >
                                  <span className="font-bold text-xs leading-none">
                                    {isCorrect ? "✓" : "✗"}
                                  </span>
                                  <span>
                                    <strong>{isCorrect ? "Correct!" : "Not quite:"}</strong> {qItem.fb}
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}

                        {/* Bottom navigation */}
                        <div className="flex items-center justify-between pt-1">
                          <button
                            onClick={() => navigateView(lesson.id)}
                            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold px-3 py-2 transition-colors cursor-pointer"
                          >
                            <ChevronLeft className="h-3.5 w-3.5" />
                            <span>Re-read Material</span>
                          </button>

                          {idx < currentLessons.length - 1 ? (
                            <button
                              onClick={() => navigateView(currentLessons[idx + 1].id)}
                              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-brand-red text-white text-xs font-black px-4 sm:px-5 py-2 sm:py-2.5 transition-colors cursor-pointer"
                            >
                              <span>Next Module</span>
                              <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                          ) : (
                            <button
                              onClick={() => navigateView("cert")}
                              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-4 sm:px-5 py-2 sm:py-2.5 shadow-xs transition-all cursor-pointer"
                            >
                              <Award className="h-3.5 w-3.5" />
                              <span>Claim Certificate</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* ══════════════════════════════════════════════════════════
                3. SOURCES & RESEARCH VIEW
            ══════════════════════════════════════════════════════════ */}
            {activeView === "sources" && (
              <div className="space-y-4 sm:space-y-5 animate-fade-in-up" style={{ animationDuration: "0.3s" }}>
                <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-6 space-y-2">
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                    Academic &amp; Industry Citations
                  </span>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                    Sources &amp; Further Reading
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    This programme has been developed by Red Dot Technologies and draws on published research, white papers, and regulatory guidelines from leading global institutions, applied directly to Nepal and developing economies.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {(currentTrackId === "finance"
                    ? FINANCE_SOURCES
                    : HEALTHCARE_SOURCES
                  ).map((source, sIdx) => (
                    <div
                      key={sIdx}
                      className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs flex flex-col justify-between space-y-2"
                    >
                      <div className="space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-wider text-brand-red bg-red-50 border border-red-100 px-2 py-0.2 rounded-full">
                          {source.org}
                        </span>
                        <h3 className="font-extrabold text-xs sm:text-sm text-slate-900">
                          {source.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                          {source.summary}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50/80 rounded-xl border border-blue-200 p-3.5 sm:p-4 text-xs text-blue-900 leading-relaxed">
                  <strong>Notice on citations:</strong> Statistics and findings are reproduced for professional educational purposes. Figures reflect the study periods and should be treated as indicative of direction. Participants must verify regulatory and ethical requirements with their institution and the relevant national authorities.
                </div>
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════
                4. PAYWALL & ACCESS UNLOCK SCREEN
            ══════════════════════════════════════════════════════════ */}
            {activeView === "pay" && (
              <div className="space-y-4 sm:space-y-5 animate-fade-in-up" style={{ animationDuration: "0.3s" }}>
                {/* Paywall Hero Banner */}
                <div className="bg-gradient-to-br from-amber-50/80 via-white to-amber-50/40 text-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-7 border border-amber-200 shadow-2xs space-y-2">
                  <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200 px-2.5 py-0.5 rounded-full">
                    <Sparkles className="h-3 w-3 text-amber-600" />
                    Full Programme Enrolment
                  </span>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900">
                    Unlock All {totalLessons} Modules &amp; Verified Credential
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed font-medium">
                    You have been exploring the free preview of {activeTrackConfig.name}. Unlock full access to all {totalLessons} in-depth modules, practitioner case studies, interactive assessments, and your official Certificate of Completion.
                  </p>

                  <div className="flex flex-wrap items-baseline gap-2.5 pt-1">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900">
                      {activeTrackConfig.price?.currency} {activeTrackConfig.price?.amount}
                    </span>
                    {activeTrackConfig.price?.was && (
                      <span className="text-xs line-through text-slate-400 font-bold">
                        {activeTrackConfig.price?.currency} {activeTrackConfig.price?.was}
                      </span>
                    )}
                    <span className="text-[10px] sm:text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      One-time payment • Lifetime access
                    </span>
                  </div>
                </div>

                {/* 3 Step Interactive Unlock Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
                  {/* Step 1: Scan Fonepay QR */}
                  <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 space-y-3 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full bg-red-50 text-brand-red font-black text-[11px] flex items-center justify-center border border-red-200">
                          1
                        </span>
                        <h3 className="font-extrabold text-xs sm:text-sm text-slate-900">
                          Scan &amp; Pay via Fonepay
                        </h3>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-medium">
                        Scan the official QR code using any Nepali mobile banking app or digital wallet (eSewa, Khalti, ConnectIPS, Mobile Banking).
                      </p>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center">
                        <img
                          src="/fonepay-qr.png"
                          alt="Red Dot Technologies Fonepay QR"
                          className="h-36 w-36 sm:h-40 sm:w-40 object-contain rounded-lg border border-slate-200 shadow-2xs"
                        />
                        <div className="mt-2 text-[10px] sm:text-[11px] font-extrabold text-slate-800">
                          Red Dot Technologies Pvt. Ltd.
                        </div>
                        <div className="text-[9px] sm:text-[10px] text-slate-500">
                          Remark: {activeTrackConfig.shortName}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Submit Payment Details */}
                  <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 space-y-3 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full bg-blue-50 text-blue-600 font-black text-[11px] flex items-center justify-center border border-blue-200">
                          2
                        </span>
                        <h3 className="font-extrabold text-xs sm:text-sm text-slate-900">
                          Submit Payment Details
                        </h3>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-medium">
                        Fill in your name and transaction reference so our team can verify and dispatch your access code.
                      </p>

                      {requestSubmitted ? (
                        <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 space-y-1.5 text-xs">
                          <p className="font-bold">✓ Details Received!</p>
                          <p className="text-[11px] sm:text-xs">
                            Thank you, {requestName}. We will verify your transaction (Txn: {requestTxn || "Submitted"}) and email your unlock code to <strong>{requestEmail}</strong> promptly.
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleRequestCode} className="space-y-2.5 pt-0.5">
                          <div>
                            <label className="block text-[9px] sm:text-[10px] font-black uppercase text-slate-600 mb-0.5">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              value={requestName}
                              onChange={(e) => setRequestName(e.target.value)}
                              placeholder="Dr. / Mr. / Ms."
                              required
                              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs focus:bg-white focus:outline-none focus:border-brand-red font-medium"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] sm:text-[10px] font-black uppercase text-slate-600 mb-0.5">
                              Work Email *
                            </label>
                            <input
                              type="email"
                              value={requestEmail}
                              onChange={(e) => setRequestEmail(e.target.value)}
                              placeholder="name@hospital.org.np"
                              required
                              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs focus:bg-white focus:outline-none focus:border-brand-red font-medium"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] sm:text-[10px] font-black uppercase text-slate-600 mb-0.5">
                              Institution / Org *
                            </label>
                            <input
                              type="text"
                              value={requestOrg}
                              onChange={(e) => setRequestOrg(e.target.value)}
                              placeholder="Hospital / Bank Name"
                              required
                              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs focus:bg-white focus:outline-none focus:border-brand-red font-medium"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] sm:text-[10px] font-black uppercase text-slate-600 mb-0.5">
                              Fonepay Transaction Ref
                            </label>
                            <input
                              type="text"
                              value={requestTxn}
                              onChange={(e) => setRequestTxn(e.target.value)}
                              placeholder="e.g. 9841234567 / Ref#"
                              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs focus:bg-white focus:outline-none focus:border-brand-red font-medium"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] sm:text-[10px] font-black uppercase text-slate-600 mb-0.5">
                              Upload Payment Screenshot / Receipt
                            </label>
                            {requestReceiptUrl ? (
                              <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-2 flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 min-w-0">
                                  <img
                                    src={requestReceiptUrl}
                                    alt="Payment Screenshot"
                                    className="h-9 w-9 object-cover rounded-md border border-emerald-300 shrink-0"
                                  />
                                  <div className="min-w-0">
                                    <span className="text-[11px] font-bold text-emerald-800 block truncate">
                                      ✓ Screenshot Attached
                                    </span>
                                    <a
                                      href={requestReceiptUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-[10px] text-brand-red hover:underline block truncate"
                                    >
                                      Preview Image
                                    </a>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setRequestReceiptUrl("")}
                                  className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                                  title="Remove screenshot"
                                >
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            ) : (
                              <label className="flex flex-col items-center justify-center border border-dashed border-slate-300 hover:border-brand-red rounded-lg p-2.5 bg-slate-50 hover:bg-white transition-colors cursor-pointer text-center">
                                <input
                                  type="file"
                                  accept="image/png, image/jpeg, image/webp"
                                  onChange={handleReceiptFileChange}
                                  className="hidden"
                                />
                                {isUploadingReceipt ? (
                                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                    <span className="h-3 w-3 border-2 border-slate-400 border-t-brand-red rounded-full animate-spin" />
                                    <span>Uploading screenshot...</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                                    <Upload className="h-3.5 w-3.5 text-brand-red" />
                                    <span className="text-[11px]">Upload payment receipt screenshot</span>
                                  </div>
                                )}
                              </label>
                            )}
                          </div>

                          <button
                            type="submit"
                            className="w-full rounded-lg bg-slate-900 hover:bg-brand-red text-white text-xs font-bold py-2 transition-colors cursor-pointer"
                          >
                            Submit Verification Request →
                          </button>
                        </form>
                      )}
                    </div>
                  </div>

                  {/* Step 3: Enter Access Code & Unlock */}
                  <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 space-y-3 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 font-black text-[11px] flex items-center justify-center border border-emerald-200">
                          3
                        </span>
                        <h3 className="font-extrabold text-xs sm:text-sm text-slate-900">
                          Instant Access Code Unlock
                        </h3>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-medium">
                        Already have an access code? Enter it below for immediate offline activation in this browser.
                      </p>

                      <form onSubmit={handleVerifyCode} className="space-y-2.5 pt-1">
                        <div>
                          <label className="block text-[9px] sm:text-[10px] font-black uppercase text-slate-600 mb-0.5">
                            Access Code (e.g. RDT...)
                          </label>
                          <input
                            type="text"
                            value={enteredCode}
                            onChange={(e) => setEnteredCode(e.target.value)}
                            placeholder="RDTA8K2..."
                            required
                            className="w-full rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-xs sm:text-sm font-mono uppercase tracking-widest text-center focus:bg-white focus:outline-none focus:border-emerald-600 font-black"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isVerifyingCode}
                          className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-xs sm:text-sm font-extrabold py-2.5 shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          {isVerifyingCode ? (
                            <>
                              <RotateCcw className="h-4 w-4 animate-spin" />
                              <span>Verifying Code...</span>
                            </>
                          ) : (
                            <span>Verify &amp; Unlock Course →</span>
                          )}
                        </button>
                      </form>

                      <div className="p-2.5 bg-slate-50 rounded-lg text-[10px] text-slate-500 font-medium space-y-0.5 mt-2">
                        <p>💡 Access persists automatically in this browser.</p>
                        <p>Support: info@reddottech.com.np</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════
                5. CERTIFICATE VIEW
            ══════════════════════════════════════════════════════════ */}
            {activeView === "cert" && (
              <div className="space-y-4 sm:space-y-5 animate-fade-in-up" style={{ animationDuration: "0.3s" }}>
                {!isTrackUnlocked && activeTrackConfig.isPaid ? (
                  <div className="bg-white rounded-xl sm:rounded-2xl border border-amber-200 p-6 sm:p-10 text-center space-y-4 shadow-2xs max-w-2xl mx-auto">
                    <div className="mx-auto h-16 w-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl shadow-inner text-amber-600">
                      <Lock className="h-8 w-8 text-amber-600" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-black text-slate-900">
                      Certificate Locked — Enrolment Required
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed font-medium">
                      Official Certificate issuance is available only to verified students enrolled in <span className="font-bold text-slate-800">{activeTrackConfig.name}</span>. Please unlock the course with your Access Code to proceed.
                    </p>
                    <button
                      onClick={() => navigateView("pay")}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-brand-red text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 shadow-xs transition-all cursor-pointer"
                    >
                      <Lock className="h-3.5 w-3.5 text-amber-400" />
                      <span>Unlock Course with Access Code</span>
                    </button>
                  </div>
                ) : !isCourseComplete ? (
                  <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 p-6 sm:p-10 text-center space-y-4 shadow-2xs">
                    <div className="mx-auto h-16 w-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl shadow-inner">
                      🔒
                    </div>
                    <h2 className="text-lg sm:text-xl font-black text-slate-900">
                      Certificate Unlocks After All {totalLessons} Modules
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed font-medium">
                      Complete all {totalLessons} module mastery quizzes to unlock your verified credential. You have finished{" "}
                      <span className="font-extrabold text-slate-900">
                        {completedCount} of {totalLessons}
                      </span>{" "}
                      modules.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                      {currentLessons.map((l) => (
                        <div
                          key={l.id}
                          className={`h-2.5 w-2.5 rounded-full transition-colors ${
                            currentTrackState.done?.[l.id]
                              ? "bg-emerald-500"
                              : "bg-slate-200"
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        const next =
                          currentLessons.find((l) => !currentTrackState.done?.[l.id]) ||
                          currentLessons[0];
                        navigateView(next.id);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-brand-red hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 shadow-xs transition-all cursor-pointer"
                    >
                      <span>Continue Next Module</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ) : !certClaimed ? (
                  <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
                    <div className="bg-emerald-600 text-white p-4 sm:p-6 flex items-center gap-3">
                      <div className="h-11 w-11 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
                        <Award className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.2 rounded-full">
                          All {totalLessons} Modules Mastered ✓
                        </span>
                        <h2 className="text-lg sm:text-xl font-black mt-0.5">
                          Claim Your {activeTrackConfig.name} Certificate
                        </h2>
                      </div>
                    </div>

                    <div className="p-4 sm:p-6">
                      <p className="text-xs sm:text-sm text-slate-600 mb-4 font-medium">
                        Enter your full legal name and details as you would like them to appear on your official digital certificate.
                      </p>

                      <form onSubmit={handleClaimCertificateSubmit} className="space-y-3 max-w-lg">
                        <div>
                          <label className="block text-[11px] font-black text-slate-700 uppercase mb-0.5">
                            Full Legal Name <span className="text-brand-red">*</span>
                          </label>
                          <input
                            type="text"
                            value={certName}
                            onChange={(e) => setCertName(e.target.value)}
                            placeholder="e.g. Dr. Aarav Shrestha"
                            required
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-emerald-600 font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-black text-slate-700 uppercase mb-0.5">
                            Email Address <span className="text-brand-red">*</span>
                          </label>
                          <input
                            type="email"
                            value={certEmail}
                            onChange={(e) => setCertEmail(e.target.value)}
                            placeholder="aarav@hospital.org.np"
                            required
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-emerald-600 font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-black text-slate-700 uppercase mb-0.5">
                            Institution / Organization
                          </label>
                          <input
                            type="text"
                            value={certOrg}
                            onChange={(e) => setCertOrg(e.target.value)}
                            placeholder="e.g. Kathmandu, Nepal"
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-emerald-600 font-medium"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-[11px] font-black text-slate-700 uppercase mb-0.5">
                              Designation
                            </label>
                            <input
                              type="text"
                              value={certRole}
                              onChange={(e) => setCertRole(e.target.value)}
                              placeholder="e.g. Medical Officer / Analyst"
                              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-emerald-600 font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-black text-slate-700 uppercase mb-0.5">
                              Department
                            </label>
                            <input
                              type="text"
                              value={certDept}
                              onChange={(e) => setCertDept(e.target.value)}
                              placeholder="e.g. Clinical / Risk"
                              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-emerald-600 font-medium"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm py-2.5 shadow-xs hover:shadow-md transition-all cursor-pointer"
                        >
                          Generate Official Certificate →
                        </button>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Action Bar */}
                    <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 p-3.5 sm:p-5 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
                      <div className="flex items-center gap-2.5">
                        <span className="rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-0.5 text-[11px] font-bold">
                          🏆 Track Completed
                        </span>
                        <h2 className="text-base sm:text-lg font-black text-slate-900">
                          Your Official Digital Certificate
                        </h2>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setCertClaimed(false)}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold px-3.5 py-2 transition-colors cursor-pointer shadow-2xs"
                        >
                          <span>Edit Details</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleResetCertificate}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-brand-red text-xs font-bold px-3.5 py-2 transition-colors cursor-pointer shadow-2xs"
                          title="Clear local certificate and enter new details"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          <span>Reset / Re-issue</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-brand-red text-white text-xs font-bold px-4 py-2 transition-colors cursor-pointer shadow-2xs"
                        >
                          <Printer className="h-3.5 w-3.5" />
                          <span>Print / Save PDF</span>
                        </button>
                      </div>
                    </div>

                    {/* Official Certificate Parchment */}
                    <div className="overflow-x-auto pb-3 -mx-1 sm:mx-0 px-1 sm:px-0">
                      <div
                        id="official-certificate"
                        className="relative mx-auto min-w-[320px] max-w-[840px] bg-white border-2 border-[#0F1E3D] p-0 shadow-[0_10px_34px_rgba(15,30,61,0.13)]"
                      >
                        <div className="border border-[#B8892B] m-2 sm:m-2.5 p-6 sm:p-10 text-center relative bg-white">
                          <img
                            src="/logo.png"
                            alt="Red Dot Technologies"
                            className="h-10 sm:h-12 w-auto mx-auto mb-4 object-contain"
                          />
                          <div className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[3.5px] sm:tracking-[4.5px] text-[#B8892B]">
                            Certificate of Completion
                          </div>
                          <h2
                            className="text-2xl sm:text-[32px] text-[#0F1E3D] my-2 leading-tight tracking-tight font-serif"
                            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                          >
                            {activeTrackConfig.certTitle}
                          </h2>
                          <div className="text-[#C8102E] font-bold text-[10px] sm:text-[11.5px] uppercase tracking-[1.6px]">
                            {activeTrackConfig.certSubtitle}
                          </div>

                          <div className="text-[#6B7C96] text-xs sm:text-[13px] italic mt-5 mb-1">
                            This is to certify that
                          </div>

                          <div
                            className="text-xl sm:text-[30px] font-medium text-[#1B3566] border-b border-slate-300 inline-block px-6 sm:px-10 pb-1.5 mb-1.5 font-serif"
                            style={{ fontFamily: "Georgia, serif" }}
                          >
                            {certName || "Candidate Name"}
                          </div>

                          <div className="text-xs sm:text-[13.5px] text-[#6B7C96] mb-4 font-medium">
                            {certOrg ? certOrg : "Red Dot Technologies"}
                            {certRole ? ` · ${certRole}` : ""}
                            {certDept ? ` (${certDept})` : ""}
                          </div>

                          <div className="max-w-[620px] mx-auto text-[#1A233A] text-xs sm:text-[13.5px] leading-relaxed">
                            {activeTrackConfig.certDesc}
                          </div>

                          {/* Module badges */}
                          <div className="flex flex-wrap gap-1.5 justify-center mt-5 mb-2 max-w-[660px] mx-auto">
                            {activeTrackConfig.modules.map((m, idx) => (
                              <span
                                key={idx}
                                className="text-[9.5px] sm:text-[10.5px] bg-[#F1F4F9] text-[#1B3566] px-2.5 py-1 rounded-xs font-semibold"
                              >
                                {m}
                              </span>
                            ))}
                          </div>

                          {/* Authority Signature & Date Row */}
                          <div className="flex flex-wrap justify-between items-end mt-7 text-xs text-[#6B7C96] gap-4 pt-2">
                            <div className="text-left">
                              <div className="border-t border-[#0F1E3D] pt-1.5 min-w-[180px]">
                                <b className="text-[#0F1E3D] text-xs sm:text-[13px] block">
                                  Red Dot Technologies Pvt. Ltd.
                                </b>
                                <span className="text-[10px] sm:text-[11px] text-[#6B7C96]">
                                  Baluwatar, Kathmandu, Nepal
                                </span>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="border-t border-[#0F1E3D] pt-1.5 min-w-[180px]">
                                <b className="text-[#0F1E3D] text-xs sm:text-[13px] block">
                                  {new Date().toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  })}
                                </b>
                                <span className="text-[10px] sm:text-[11px] text-[#6B7C96]">
                                  Date of completion
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 text-[10px] sm:text-[10.5px] text-[#6B7C96] tracking-[0.8px] font-mono">
                            Certificate reference: {certReference}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ── PECP Next Step Banner (From Zip ctaband) ── */}
                    <div className="print:hidden rounded-2xl bg-gradient-to-br from-[#0F1E3D] via-[#162A53] to-[#24406F] p-6 sm:p-9 text-white shadow-xl border border-white/10 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
                      <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#B8892B]/10 rounded-full blur-2xl pointer-events-none -ml-16 -mb-16" />

                      <div className="relative z-10 max-w-3xl space-y-3">
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#F0DCB4]">
                          <span>★ Continue Your Development</span>
                        </div>

                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                          The Next Step: <span className="text-[#FFD8DD]">PECP</span>
                        </h2>

                        <p className="text-xs sm:text-sm text-[#CFDCEF] leading-relaxed">
                          This programme is a gateway to the <strong>Professional Excellence &amp; Certification Program (PECP)</strong> from Red Dot Technologies, in partnership with the <strong>University of South Carolina Upstate</strong> — instructor-led, cohort-based professional certification in project management, business analytics, quality, and leadership, designed for working professionals.
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-3">
                          <Link
                            to="/pecp"
                            className="inline-flex items-center gap-2 rounded-xl bg-brand-red hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 shadow-md transition-all cursor-pointer"
                          >
                            <span>Explore PECP</span>
                            <ArrowRight className="h-4 w-4" />
                          </Link>

                          <Link
                            to="/contact"
                            search={{ subject: "In-House PECP Cohort Inquiry" }}
                            className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm px-5 py-2.5 transition-all cursor-pointer"
                          >
                            <span>Enquire About In-House Cohorts</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
