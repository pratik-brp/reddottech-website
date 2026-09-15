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
  Download,
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
  Loader2,
  Briefcase,
  Code2,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import {
  claimCertificate,
  verifyCertificate,
  createAiLead,
  uploadPaymentReceipt,
  verifyAiAccessCode,
  checkAiAccessStatus,
  fetchAiLesson,
} from "@/lib/api";
import { PageHero } from "@/components/PageHero";
import { sanitizeHtml } from "@/lib/sanitize";
import { PecpNextStepBanner } from "@/components/ai/PecpNextStepBanner";
import { TiltCard } from "@/components/motion/TiltCard";

import { foundationsLessons } from "@/data/ai-foundations-data";
import { healthcareLessons } from "@/data/ai-healthcare-data";
import { financeLessons } from "@/data/ai-finance-data";
import { financeAdvancedLessons } from "@/data/ai-finance-advanced-data";
import { educationLessons } from "@/data/ai-education-data";
import { managementLessons } from "@/data/ai-management-data";
import { agileDevelopersLessons } from "@/data/ai-agile-developers-data";
import { agileManagersLessons } from "@/data/ai-agile-managers-data";
import type { Lesson } from "@/data/ai-healthcare-data";
import {
  TRACK_CONFIGS,
  TRACK_READINESS_CALLOUTS,
  generateCertificateReference,
  renderSvgDiagram,
  DIAGRAM_CAPTIONS,
  HEALTHCARE_SOURCES,
  FINANCE_SOURCES,
  FINANCE_ADVANCED_SOURCES,
  EDUCATION_SOURCES,
  MANAGEMENT_SOURCES,
  AGILE_DEVELOPERS_SOURCES,
  AGILE_MANAGERS_SOURCES,
  type TrackConfig,
} from "@/lib/ai-course-utils";
import { printOfficialCertificate, downloadOfficialCertificatePdf } from "@/lib/certificate-print";
import { ShareOnLinkedInButton } from "@/components/ShareOnLinkedInButton";

interface AiUnlockedSearch {
  track?:
  | "foundations"
  | "healthcare"
  | "finance"
  | "finance-advanced"
  | "education"
  | "management"
  | "agile-developers"
  | "agile-managers";
  lesson?: string;
  view?: string;
}

export const Route = createFileRoute("/ai-unlocked")({
  validateSearch: (search: Record<string, unknown>): AiUnlockedSearch => {
    return {
      track:
        (search.track as
          | "foundations"
          | "healthcare"
          | "finance"
          | "finance-advanced"
          | "education"
          | "management"
          | "agile-developers"
          | "agile-managers") || undefined,
      lesson: (search.lesson as string) || undefined,
      view: (search.view as string) || undefined,
    };
  },
  head: () => ({
    meta: [
      {
        title: "AI Unlocked — Multi-Track Applied AI Learning Hub | Red Dot Technologies",
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

interface AiTrackCard {
  id:
  | "foundations"
  | "healthcare"
  | "finance"
  | "finance-advanced"
  | "education"
  | "management"
  | "agile-developers"
  | "agile-managers";
  title: string;
  category: string;
  filterCategory: "Free" | "Healthcare" | "Finance" | "Leadership" | "Agile";
  badge: string;
  badgeBg: string;
  ribbon?: string;
  ribbonBg?: string;
  cardBorder: string;
  iconBg: string;
  iconColor: string;
  desc: string;
  duration: string;
  modulesCount: number;
  certLabel: string;
  isPaid: boolean;
  price: string;
  wasPrice?: string;
  previewLabel: string;
  icon: any;
  ctaText: string;
  ctaBg: string;
  bottomBg: string;
}

const AI_TRACK_CATALOG: AiTrackCard[] = [
  {
    id: "foundations",
    title: "AI Foundations & Literacy",
    category: "AI & Digital Literacy",
    filterCategory: "Free",
    badge: "100% Free · Community",
    badgeBg: "bg-slate-100 text-slate-800 border-slate-200",
    cardBorder: "border border-slate-200 hover:border-slate-400",
    iconBg: "bg-slate-900",
    iconColor: "text-red-400",
    desc: "Essential artificial intelligence concepts, prompt engineering, multimodal creation, study systems, and critical AI safety.",
    duration: "2 Hours",
    modulesCount: 5,
    certLabel: "Free Digital Certificate",
    isPaid: false,
    price: "Enrolment: Free",
    previewLabel: "Free Digital Certificate",
    icon: Brain,
    ctaText: "Start Free Foundations Track",
    ctaBg: "bg-slate-900 hover:bg-brand-red",
    bottomBg: "bg-slate-50 border-slate-100",
  },
  {
    id: "healthcare",
    title: "AI for Healthcare Professionals",
    category: "Clinical Medicine & Health",
    filterCategory: "Healthcare",
    badge: "Clinical Applied Track",
    badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
    ribbon: "⭐ Highly Recommended for Clinicians",
    ribbonBg: "bg-emerald-600 text-white",
    cardBorder: "border-2 border-emerald-500 hover:border-emerald-600",
    iconBg: "bg-emerald-950",
    iconColor: "text-emerald-400",
    desc: "Clinical decision support, diagnostic deep learning, ambient scribes, healthcare ethics, and the 10-20-70 implementation framework.",
    duration: "7+ Hours",
    modulesCount: 9,
    certLabel: "Clinical Credential",
    isPaid: true,
    price: "NPR 1,499",
    wasPrice: "NPR 2,999",
    previewLabel: "Module 1 Free Preview",
    icon: Stethoscope,
    ctaText: "Explore Healthcare Track",
    ctaBg: "bg-emerald-700 hover:bg-emerald-800",
    bottomBg: "bg-emerald-50/60 border-emerald-100",
  },
  {
    id: "finance",
    title: "AI for Financial Professionals",
    category: "Banking & FinTech",
    filterCategory: "Finance",
    badge: "Level 1 · Banking & FinTech",
    badgeBg: "bg-blue-50 text-blue-800 border-blue-200",
    ribbon: "⭐ Highly Recommended for Banking & FinTech",
    ribbonBg: "bg-blue-600 text-white",
    cardBorder: "border-2 border-blue-500 hover:border-blue-600",
    iconBg: "bg-blue-950",
    iconColor: "text-blue-400",
    desc: "Credit scoring ML, fraud AML graph detection, generative banking & RAG, model risk governance, and Nepal Rastra Bank AI Guidelines.",
    duration: "7+ Hours",
    modulesCount: 8,
    certLabel: "Finance Credential",
    isPaid: true,
    price: "NPR 1,499",
    wasPrice: "NPR 2,999",
    previewLabel: "Module 1 Free Preview",
    icon: Building2,
    ctaText: "Explore Finance Track (Level 1)",
    ctaBg: "bg-blue-700 hover:bg-blue-800",
    bottomBg: "bg-blue-50/60 border-blue-100",
  },
  {
    id: "finance-advanced",
    title: "Advanced AI for Finance Professionals",
    category: "Enterprise Architecture",
    filterCategory: "Finance",
    badge: "Level 2 · Executive & Architecture",
    badgeBg: "bg-purple-50 text-purple-800 border-purple-200",
    ribbon: "🏆 Advanced Level 2 · Architecture & Leadership",
    ribbonBg: "bg-purple-700 text-white",
    cardBorder: "border-2 border-purple-500 hover:border-purple-600",
    iconBg: "bg-purple-950",
    iconColor: "text-purple-400",
    desc: "Advanced follow-on covering capability stacks, MRM validation, deep XAI, multi-agent systems, systemic risk, and target operating models.",
    duration: "10.5+ Hours",
    modulesCount: 12,
    certLabel: "Executive Credential",
    isPaid: true,
    price: "NPR 2,499",
    wasPrice: "NPR 3,999",
    previewLabel: "Module 1 Free Preview",
    icon: Sparkles,
    ctaText: "Explore Advanced Finance Track (Level 2)",
    ctaBg: "bg-purple-700 hover:bg-purple-800",
    bottomBg: "bg-purple-50/60 border-purple-100",
  },
  {
    id: "education",
    title: "AI for Teachers & Educators",
    category: "Pedagogy & Classroom",
    filterCategory: "Leadership",
    badge: "Pedagogy & Education Track",
    badgeBg: "bg-teal-50 text-teal-800 border-teal-200",
    ribbon: "⭐ Highly Recommended for Teachers & Educators",
    ribbonBg: "bg-teal-600 text-white",
    cardBorder: "border-2 border-teal-500 hover:border-teal-600",
    iconBg: "bg-teal-950",
    iconColor: "text-teal-400",
    desc: "Cognitive science, teacher workload reduction, lesson differentiation, feedback, academic integrity, and school-wide AI leadership.",
    duration: "7+ Hours",
    modulesCount: 12,
    certLabel: "Educator Credential",
    isPaid: true,
    price: "NPR 1,499",
    wasPrice: "NPR 2,999",
    previewLabel: "Module 1 Free Preview",
    icon: GraduationCap,
    ctaText: "Explore Education Track",
    ctaBg: "bg-teal-700 hover:bg-teal-800",
    bottomBg: "bg-teal-50/60 border-teal-100",
  },
  {
    id: "management",
    title: "AI for Management Professionals",
    category: "Executive & Leadership",
    filterCategory: "Leadership",
    badge: "Executive & Management Track",
    badgeBg: "bg-amber-50 text-amber-800 border-amber-200",
    ribbon: "⭐ Highly Recommended for CXOs & Management",
    ribbonBg: "bg-amber-600 text-white",
    cardBorder: "border-2 border-amber-500 hover:border-amber-600",
    iconBg: "bg-amber-950",
    iconColor: "text-amber-400",
    desc: "The executive mental model of AI, business strategy alignment, decision rights, use-case ROI, change management, and a 12-month roadmap.",
    duration: "7+ Hours",
    modulesCount: 12,
    certLabel: "Leadership Credential",
    isPaid: true,
    price: "NPR 2,499",
    wasPrice: "NPR 3,999",
    previewLabel: "Module 1 Free Preview",
    icon: Briefcase,
    ctaText: "Explore Management Track",
    ctaBg: "bg-amber-700 hover:bg-amber-800",
    bottomBg: "bg-amber-50/60 border-amber-100",
  },
  {
    id: "agile-developers",
    title: "Agile for Software Developers",
    category: "Software Engineering & Scrum",
    filterCategory: "Agile",
    badge: "Engineering & Scrum Track",
    badgeBg: "bg-sky-50 text-sky-800 border-sky-200",
    ribbon: "⚡ Applied Agile & Scrum for Developers",
    ribbonBg: "bg-sky-600 text-white",
    cardBorder: "border-2 border-sky-500 hover:border-sky-600",
    iconBg: "bg-sky-950",
    iconColor: "text-sky-400",
    desc: "Waterfall vs Iterative flow, Scrum roles & sprint execution, User stories & DoD, TDD, CI/CD, XP practices, and Agile team dynamics.",
    duration: "7+ Hours",
    modulesCount: 12,
    certLabel: "Engineering Credential",
    isPaid: true,
    price: "NPR 999",
    wasPrice: "NPR 1,999",
    previewLabel: "Module 1 Free Preview",
    icon: Code2,
    ctaText: "Explore Agile Developers Track",
    ctaBg: "bg-sky-700 hover:bg-sky-800",
    bottomBg: "bg-sky-50/60 border-sky-100",
  },
  {
    id: "agile-managers",
    title: "Agile Methodologies for Managers",
    category: "Agile Governance & Leadership",
    filterCategory: "Agile",
    badge: "Governance & Leadership Track",
    badgeBg: "bg-teal-50 text-teal-800 border-teal-200",
    ribbon: "⭐ Agile Transformation & Governance",
    ribbonBg: "bg-teal-600 text-white",
    cardBorder: "border-2 border-teal-500 hover:border-teal-600",
    iconBg: "bg-teal-950",
    iconColor: "text-teal-400",
    desc: "Agile mindset vs mechanics, approach selection (Scrum, Kanban, XP), team design, budgeting & contracts, metrics, risk, and scaling.",
    duration: "7+ Hours",
    modulesCount: 12,
    certLabel: "Agile Leadership Credential",
    isPaid: true,
    price: "NPR 1,999",
    wasPrice: "NPR 3,499",
    previewLabel: "Module 1 Free Preview",
    icon: Users,
    ctaText: "Explore Agile Managers Track",
    ctaBg: "bg-teal-700 hover:bg-teal-800",
    bottomBg: "bg-teal-50/60 border-teal-100",
  },
];

const CATALOG_FILTERS = [
  { id: "All", label: "All Disciplines", icon: ShieldCheck },
  { id: "Free", label: "Free Community", icon: Sparkles },
  { id: "Agile", label: "Agile & Engineering", icon: Code2 },
  { id: "Healthcare", label: "Clinical & Health", icon: Stethoscope },
  { id: "Finance", label: "Banking & Finance", icon: Building2 },
  { id: "Leadership", label: "Executive & Education", icon: Briefcase },
];

function AiUnlockedPage() {
  const search = useSearch({ from: "/ai-unlocked" });
  const navigateRouter = useNavigate({ from: "/ai-unlocked" });
  const [catalogFilter, setCatalogFilter] = useState<string>("All");

  // Single source of truth from router search params
  const currentTrackId:
    | "foundations"
    | "healthcare"
    | "finance"
    | "finance-advanced"
    | "education"
    | "management"
    | "agile-developers"
    | "agile-managers"
    | null = search.track || null;

  const [mobileSideOpen, setMobileSideOpen] = useState(false);

  // Track config for active track (if selected)
  const activeTrackConfig: TrackConfig | null = currentTrackId
    ? TRACK_CONFIGS[currentTrackId] || null
    : null;

  const currentLessons: Lesson[] = useMemo(() => {
    if (currentTrackId === "healthcare") return healthcareLessons;
    if (currentTrackId === "finance") return financeLessons;
    if (currentTrackId === "finance-advanced") return financeAdvancedLessons;
    if (currentTrackId === "education") return educationLessons;
    if (currentTrackId === "management") return managementLessons;
    if (currentTrackId === "agile-developers") return agileDevelopersLessons;
    if (currentTrackId === "agile-managers") return agileManagersLessons;
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
        certificateId?: string;
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
    const trackKeys = [
      "foundations",
      "healthcare",
      "finance",
      "finance-advanced",
      "education",
      "management",
      "agile-developers",
      "agile-managers",
    ];
    trackKeys.forEach((tid) => {
      const cfg = TRACK_CONFIGS[tid];
      if (cfg) {
        loaded[tid] = { done: {}, answers: {}, unlocked: !cfg.isPaid };
      }
    });
    return loaded;
  });

  // Hydrate stored progress and unlock state from localStorage after initial render
  useEffect(() => {
    const trackKeys = [
      "foundations",
      "healthcare",
      "finance",
      "finance-advanced",
      "education",
      "management",
      "agile-developers",
      "agile-managers",
    ];
    const loaded: TrackStateMap = {};
    let hasStored = false;

    trackKeys.forEach((tid) => {
      const cfg = TRACK_CONFIGS[tid];
      if (!cfg) return;
      const raw = localStorage.getItem(cfg.storageKey);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (cfg.isPaid && !parsed.unlocked) {
            loaded[tid] = { done: {}, answers: {}, unlocked: false };
            try {
              localStorage.setItem(cfg.storageKey, JSON.stringify(loaded[tid]));
            } catch { }
          } else {
            loaded[tid] = parsed;
            hasStored = true;
          }
        } catch {
          loaded[tid] = { done: {}, answers: {}, unlocked: !cfg.isPaid };
        }
      } else {
        loaded[tid] = { done: {}, answers: {}, unlocked: !cfg.isPaid };
      }
    });

    if (hasStored) {
      setTrackStates(loaded);
    }
  }, []);

  // Save changes to localStorage
  const updateTrackState = (
    trackId: string,
    updater: (prev: (typeof trackStates)[string]) => (typeof trackStates)[string],
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
        } catch { }
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

  const isTrackUnlocked =
    !activeTrackConfig?.isPaid ||
    (Boolean(currentTrackState.unlocked) && Boolean(currentTrackState.accessCode));

  const isLessonLocked = (lessonId: string) => {
    if (!activeTrackConfig) return false;
    if (isTrackUnlocked) return false;
    return !activeTrackConfig.freePreviewIds?.includes(lessonId);
  };

  // ── Dynamic Full Lesson Cache (Server-Side Gated Delivery) ──
  const [loadedLessons, setLoadedLessons] = useState<Record<string, Lesson>>({});
  const [isLoadingLesson, setIsLoadingLesson] = useState(false);
  const [lessonFetchError, setLessonFetchError] = useState<string | null>(null);

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

  // Dynamic lesson content loader effect
  useEffect(() => {
    if (!currentTrackId) return;
    const targetId = rawActiveView.startsWith("q_") ? rawActiveView.slice(2) : rawActiveView;
    if (
      !targetId ||
      targetId === "home" ||
      targetId === "sources" ||
      targetId === "pay" ||
      targetId === "cert"
    ) {
      return;
    }

    const cacheKey = `${currentTrackId}:${targetId}`;
    if (loadedLessons[cacheKey] && loadedLessons[cacheKey].sections?.length > 0) {
      return;
    }

    // Check if base lesson in manifest already has full sections (e.g. preview lessons or foundations)
    const baseLesson = currentLessons.find((l) => l.id === targetId);
    if (
      baseLesson &&
      baseLesson.sections &&
      baseLesson.sections.length > 0 &&
      (!activeTrackConfig?.isPaid || isTrackUnlocked)
    ) {
      setLoadedLessons((prev) => ({ ...prev, [cacheKey]: baseLesson }));
      return;
    }

    // If paid and locked, paywall intercept handles it
    if (activeTrackConfig?.isPaid && !isTrackUnlocked && isLessonLocked(targetId)) {
      return;
    }

    let isMounted = true;
    setIsLoadingLesson(true);
    setLessonFetchError(null);

    fetchAiLesson(currentTrackId, targetId, currentTrackState.accessCode)
      .then((res: any) => {
        if (!isMounted) return;
        const lessonData = res?.sections ? res : res?.data?.sections ? res.data : null;
        if (lessonData && lessonData.sections && lessonData.sections.length > 0) {
          setLoadedLessons((prev) => ({ ...prev, [cacheKey]: lessonData }));
        } else if (res && res.locked) {
          updateTrackState(currentTrackId, (prev) => ({
            ...prev,
            unlocked: false,
            accessCode: undefined,
          }));
          navigateView("pay");
        } else {
          setLessonFetchError(res?.error || "Failed to load lesson from server.");
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        const msg = err instanceof Error ? err.message : String(err);
        if (
          msg.includes("403") ||
          msg.includes("Access denied") ||
          msg.includes("enrollment required") ||
          msg.includes("Invalid, revoked")
        ) {
          updateTrackState(currentTrackId, (prev) => ({
            ...prev,
            unlocked: false,
            accessCode: undefined,
          }));
          navigateView("pay");
          return;
        }
        setLessonFetchError(msg || "Server connection error.");
      })
      .finally(() => {
        if (isMounted) setIsLoadingLesson(false);
      });

    return () => {
      isMounted = false;
    };
  }, [
    currentTrackId,
    rawActiveView,
    currentTrackState.accessCode,
    isTrackUnlocked,
    currentLessons,
    activeTrackConfig,
  ]);

  const openCourse = (
    track: NonNullable<AiUnlockedSearch["track"]>,
    initialView: string = "home",
  ) => {
    const isSpecial =
      initialView === "home" ||
      initialView === "sources" ||
      initialView === "pay" ||
      initialView === "cert";
    navigateRouter({
      search: {
        track,
        view: isSpecial ? initialView : undefined,
        lesson: !isSpecial ? initialView : undefined,
      },
    });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
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
    const cacheKey = `${currentTrackId}:${lessonId}`;
    const lesson = loadedLessons[cacheKey] || currentLessons.find((l) => l.id === lessonId);
    if (!lesson || !lesson.quiz || lesson.quiz.length === 0) return;

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
  const [receiptLocalPreview, setReceiptLocalPreview] = useState("");
  const [isUploadingReceipt, setIsUploadingReceipt] = useState(false);
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);
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

    // If marked unlocked on a paid track but missing an accessCode (e.g. localStorage tampering), revoke unlock immediately
    if (activeTrackConfig?.isPaid && currentTrackState.unlocked && !currentTrackState.accessCode) {
      updateTrackState(currentTrackId, () => ({
        done: {},
        answers: {},
        unlocked: false,
        accessCode: undefined,
        lead: undefined,
        requestedLead: undefined,
      }));
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
          if (res && res.success && res.active === false && (res as any).revoked) {
            // Only revoke if server explicitly confirmed revocation
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
            toast.warning(
              "Course access has been revoked by the administrator.",
            );
            navigateView("pay");
          }
        })
        .catch(() => {
          // Network offline fallback continues gracefully without wiping state
        });

      return () => {
        isMounted = false;
      };
    }
  }, [
    currentTrackId,
    currentTrackState.unlocked,
    currentTrackState.accessCode,
    activeTrackConfig?.isPaid,
  ]);

  const handleReceiptFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be under 10MB");
      return;
    }
    const localUrl = URL.createObjectURL(file);
    setReceiptLocalPreview(localUrl);
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
    const cleanCode = enteredCode.trim().toUpperCase();
    if (!cleanCode) {
      toast.error("Please enter an access code.");
      return;
    }

    setIsVerifyingCode(true);
    try {
      const res = await verifyAiAccessCode(currentTrackId, cleanCode);
      if (res && res.valid) {
        setLoadedLessons({}); // Reset cache so freshly verified modules load from server
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
        toast.error(
          res?.error ||
          "Access code is invalid, revoked, or no active verified enrolment was found.",
        );
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

    setIsSubmittingPayment(true);

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

    const newEntry = {
      id: `lead-${Date.now()}`,
      name: requestName.trim(),
      email: requestEmail.trim(),
      org: requestOrg.trim(),
      track: currentTrackId,
      txn: requestTxn.trim() || "FONEPAY-SUBMITTED",
      receiptUrl: requestReceiptUrl || undefined,
      receipt_url: requestReceiptUrl || undefined,
      date: new Date().toISOString(),
      status: "pending",
    };

    try {
      // 1. Save directly to MySQL database via backend API
      await createAiLead(newEntry);

      // 2. Synchronize to localStorage backup
      if (typeof window !== "undefined") {
        try {
          const existingLeads = JSON.parse(localStorage.getItem("rdt_ai_payment_leads") || "[]");
          localStorage.setItem(
            "rdt_ai_payment_leads",
            JSON.stringify([newEntry, ...existingLeads.filter((l: any) => l.id !== newEntry.id)]),
          );
        } catch { }
      }

      // 3. Notify Red Dot admin team via FormSubmit
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
      }).catch(() => { });

      setRequestSubmitted(true);
      toast.success(
        "Payment details submitted! Admin will verify your transaction ref and email your unlock code.",
      );
    } catch (err: any) {
      console.error("[Submit Payment Error]", err);
      toast.error(err?.message || "Failed to save payment details to server. Please try again.");
    } finally {
      setIsSubmittingPayment(false);
    }
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

    // If certificate is claimed locally, check with database using certificate ID
    if (trackLead && trackLead.captured && (trackLead.certificateId || trackLead.email)) {
      let isMounted = true;
      const lookupTerm = trackLead.certificateId;
      if (lookupTerm) {
        verifyCertificate(lookupTerm)
          .then((res) => {
            if (!isMounted) return;
            // Only if API explicitly confirmed record was removed from registry
            if (res && (res as any).verified === false) {
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
      }

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
      new Date().toISOString(),
    );

    let finalRef = generatedRef;
    try {
      const res = await claimCertificate({
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
      if (res && (res as any).certificate_id) {
        finalRef = (res as any).certificate_id;
      }
    } catch (err: any) {
      if (activeTrackConfig.isPaid) {
        toast.error(
          err?.message ||
          "Certificate claim failed. Please make sure you are using the verified email registered with your enrolment.",
        );
        return;
      }
    }

    const leadData = {
      name: certName.trim(),
      email: certEmail.trim(),
      org: certOrg.trim(),
      role: certRole.trim(),
      dept: certDept.trim(),
      date: new Date().toISOString(),
      captured: true,
      certificateId: finalRef,
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
    return (
      currentTrackState.lead?.certificateId ||
      generateCertificateReference(
        activeTrackConfig.certCodePrefix,
        certName || "Candidate",
        certEmail || "email@example.com",
        currentTrackState.lead?.date,
      )
    );
  }, [
    activeTrackConfig,
    certName,
    certEmail,
    currentTrackState.lead?.date,
    currentTrackState.lead?.certificateId,
  ]);

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
              <span>Explore 8 Applied Tracks</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          }
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-4xl mx-auto pt-2 sm:pt-4 w-full">
            <div className="bg-white/90 border border-slate-200/90 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 shadow-2xs backdrop-blur-xs text-center">
              <div className="text-lg sm:text-2xl font-black text-brand-ink">8</div>
              <div className="text-[10px] sm:text-xs text-slate-500 font-bold mt-0.5">
                Specialized Tracks
              </div>
            </div>
            <div className="bg-white/90 border border-slate-200/90 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 shadow-2xs backdrop-blur-xs text-center">
              <div className="text-lg sm:text-2xl font-black text-brand-ink">58</div>
              <div className="text-[10px] sm:text-xs text-slate-500 font-bold mt-0.5">
                In-Depth Modules
              </div>
            </div>
            <div className="bg-white/90 border border-slate-200/90 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 shadow-2xs backdrop-blur-xs text-center">
              <div className="text-lg sm:text-2xl font-black text-brand-ink">150+</div>
              <div className="text-[10px] sm:text-xs text-slate-500 font-bold mt-0.5">
                Quiz Questions
              </div>
            </div>
            <div className="bg-white/90 border border-slate-200/90 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 shadow-2xs backdrop-blur-xs text-center">
              <div className="text-lg sm:text-2xl font-black text-emerald-600">100%</div>
              <div className="text-[10px] sm:text-xs text-slate-500 font-bold mt-0.5">
                Verified Certs
              </div>
            </div>
          </div>
        </PageHero>

        {/* ── Course Catalog Grid Section (Medium Cards & Filter Tabs) ── */}
        <section
          id="course-catalog"
          className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 py-10 sm:py-16"
        >
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-8 sm:mb-10">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-brand-red bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full">
              Applied Industry Catalog
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Select Your Learning Track
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mx-auto">
              Choose from 6 industry-tailored tracks: General AI Literacy, Clinical Healthcare,
              Banking &amp; Finance (Levels 1 &amp; 2), Teachers &amp; Educators, and Executive Management.
            </p>
          </div>

          {/* Category Filter Pills (Matches the sleek Courses page design) */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 overflow-x-auto pb-3 mb-8 scrollbar-none select-none">
            {CATALOG_FILTERS.map((cat) => {
              const count =
                cat.id === "All"
                  ? AI_TRACK_CATALOG.length
                  : AI_TRACK_CATALOG.filter((t) => t.filterCategory === cat.id).length;
              const isActive = catalogFilter === cat.id;
              const FilterIcon = cat.icon;

              return (
                <button
                  key={cat.id}
                  onClick={() => setCatalogFilter(cat.id)}
                  aria-pressed={isActive}
                  className={`group relative shrink-0 flex items-center gap-1.5 sm:gap-2 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-bold transition-all duration-300 cursor-pointer ${isActive
                    ? "bg-slate-950 text-white shadow-md shadow-slate-950/20 scale-[1.02] border border-slate-800"
                    : "bg-white text-slate-600 border border-slate-200/90 hover:border-slate-300 hover:text-brand-ink hover:bg-slate-50"
                    }`}
                >
                  <FilterIcon
                    className={`h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-300 ${isActive
                      ? "text-brand-red scale-110"
                      : "text-slate-400 group-hover:text-brand-ink group-hover:scale-110"
                      }`}
                  />
                  <span>{cat.label}</span>
                  <span
                    className={`inline-flex items-center justify-center min-w-[18px] sm:min-w-[20px] h-4 sm:h-5 px-1 sm:px-1.5 rounded-full text-[9px] sm:text-[10px] font-black transition-colors ${isActive
                      ? "bg-brand-red text-white"
                      : "bg-slate-100 border border-slate-200/80 text-slate-600 group-hover:bg-slate-200"
                      }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 6 Medium-Sized Course Cards Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch max-w-7xl mx-auto">
            {AI_TRACK_CATALOG.filter(
              (t) => catalogFilter === "All" || t.filterCategory === catalogFilter,
            ).map((track) => {
              const TrackIcon = track.icon;
              return (
                <TiltCard key={track.id} maxTilt={3} className="h-full">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => openCourse(track.id, "home")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openCourse(track.id, "home");
                      }
                    }}
                    aria-label={`Open ${track.title} course`}
                    className={`bg-white rounded-2xl sm:rounded-3xl ${track.cardBorder} shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group relative h-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red select-none`}
                  >
                    {/* Optional Top Ribbon */}
                    {track.ribbon && (
                      <div
                        className={`${track.ribbonBg} text-center py-1 px-3 text-[9px] sm:text-[10px] font-black uppercase tracking-widest shrink-0`}
                      >
                        {track.ribbon}
                      </div>
                    )}

                    {/* Card Content Area */}
                    <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Header Row: Badge & Duration */}
                        <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 mb-2.5">
                          <span
                            className={`text-[9.5px] sm:text-[10.5px] font-black uppercase tracking-wider border px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 ${track.badgeBg}`}
                          >
                            <TrackIcon className="h-3 w-3 shrink-0" />
                            <span>{track.badge}</span>
                          </span>
                          <span className="text-xs font-bold text-slate-500 flex items-center gap-1 shrink-0 ml-auto">
                            <Clock className="h-3.5 w-3.5 text-slate-400" /> {track.duration}
                          </span>
                        </div>

                        {/* Domain Icon & Title & Description */}
                        <div className="space-y-2">
                          <div
                            className={`h-10 w-10 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl ${track.iconBg} flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform`}
                          >
                            <TrackIcon className={`h-5 w-5 sm:h-5.5 sm:w-5.5 ${track.iconColor}`} />
                          </div>

                          <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-brand-red transition-colors leading-snug line-clamp-2">
                            {track.title}
                          </h3>

                          <p className="text-xs sm:text-[13px] text-slate-600 font-medium leading-relaxed line-clamp-2 sm:line-clamp-3">
                            {track.desc}
                          </p>
                        </div>
                      </div>

                      {/* Compact Specs Row (Replaces the big 5-module list with clean medium badges) */}
                      <div className="pt-2.5 border-t border-slate-100 grid grid-cols-2 gap-1.5 text-[10px] sm:text-[11px] font-bold text-slate-600 text-center">
                        <div className="flex items-center justify-center gap-1 p-1.5 rounded-lg bg-slate-50 border border-slate-100">
                          <Layers className="h-3 w-3 text-slate-500 shrink-0" />
                          <span className="text-brand-ink font-extrabold">{track.modulesCount} Modules</span>
                        </div>
                        <div className="flex items-center justify-center gap-1 p-1.5 rounded-lg bg-slate-50 border border-slate-100">
                          <Award className="h-3 w-3 text-emerald-600 shrink-0" />
                          <span className="text-brand-ink font-extrabold leading-tight">{track.certLabel}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Pricing & Action Section */}
                    <div className={`p-3.5 sm:p-4 ${track.bottomBg} border-t flex flex-col gap-2`}>
                      <div className="flex items-center justify-between text-xs">
                        {track.isPaid ? (
                          <div>
                            <span className="font-black text-slate-900 text-xs sm:text-sm">{track.price}</span>{" "}
                            {track.wasPrice && (
                              <span className="line-through text-slate-400 text-[10px] sm:text-[11px]">
                                {track.wasPrice}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="font-black text-slate-900">{track.price}</span>
                        )}

                        <span className="font-bold text-emerald-700 bg-white border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] flex items-center gap-1">
                          <Check className="h-3 w-3" /> {track.previewLabel}
                        </span>
                      </div>

                      <div
                        className={`w-full rounded-xl ${track.ctaBg} text-white text-xs sm:text-sm font-black py-2.5 shadow-xs group-hover:shadow-md group-hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer`}
                      >
                        <span>{track.ctaText}</span>
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
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
                Not just theory—practical blueprints engineered for immediate workplace and clinical
                impact.
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
                    Curricula engineered specifically for hospital diagnostic workflows, clinical
                    decision support, credit underwriting, and fraud detection.
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
                    Visual animated architectures demonstrating neural layers, RAG retrieval
                    pipelines, EHR linkage, and triage decision trees.
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
                    Module-by-module quizzes with instant explanatory feedback and scenario-based
                    testing to solidify conceptual understanding.
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
                    Earn high-resolution digital certificates complete with unique reference IDs,
                    cryptographic verification, and PDF print layout.
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
    <div className="min-h-screen bg-slate-50 font-sans pt-16 sm:pt-20 pb-16 sm:pb-20 text-slate-900 selection:bg-brand-red selection:text-white">
      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 pt-2 pb-16 w-full min-w-0">
        {/* ── Top Course Navigation Bar ── */}
        <div className="mb-3 sm:mb-4">
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs p-2.5 sm:p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            {/* Back button + Track Title */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={backToCatalog}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 px-2.5 py-1 text-[11px] sm:text-xs font-bold text-slate-700 transition-colors cursor-pointer shrink-0"
                title="Return to AI Unlocked Courses"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>All Courses</span>
              </button>

              <div className="h-4 w-px bg-slate-200" />

              <div className="min-w-0">
                <span className="text-[9px] font-black uppercase tracking-wider text-brand-red block leading-none">
                  Active Track
                </span>
                <h2 className="text-xs sm:text-sm font-black text-slate-900 leading-tight line-clamp-2">
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
                <span>
                  Course Syllabus &amp; Modules ({completedCount}/{totalLessons} Done)
                </span>
              </div>
              <span className="text-[10px] font-black text-slate-300 bg-white/10 px-2 py-0.5 rounded-md">
                {progressPercent}%
              </span>
            </button>
          </div>
        </div>

        {/* Backdrop on mobile when drawer is open */}
        {mobileSideOpen && (
          <div
            onClick={() => setMobileSideOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden"
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 items-start w-full min-w-0">
          {/* ── Left Sidebar (Mobile Drawer / Desktop Sticky Sidebar) ── */}
          <aside
            data-lenis-prevent
            className={[
              "rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white custom-scrollbar course-sidebar-sticky",
              mobileSideOpen
                ? "fixed inset-x-3 top-16 bottom-4 z-50 overflow-y-auto block shadow-2xl lg:shadow-2xs lg:col-span-1"
                : "hidden lg:block lg:col-span-1 lg:shadow-2xs",
            ].join(" ")}
          >
            {/* Sidebar header */}
            <div className="sticky top-0 z-10 px-3.5 sm:px-4 py-3 bg-slate-50/95 backdrop-blur-xs border-b border-slate-100">
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
                <span className="truncate font-extrabold text-xs">Programme Overview</span>
              </button>

              {/* Modules List */}
              {currentLessons.map((lesson, idx) => {
                const isLocked = isLessonLocked(lesson.id);
                const isDone =
                  isTrackUnlocked && !isLocked && !!currentTrackState.done?.[lesson.id];
                const isActive = activeView === lesson.id || activeView === `q_${lesson.id}`;

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
                        ) : activeTrackConfig.isPaid && activeTrackConfig.freePreviewIds?.includes(lesson.id) ? (
                          <span className="text-[8px] bg-emerald-100 text-emerald-800 px-1 rounded font-bold">
                            FREE PREVIEW
                          </span>
                        ) : null}
                      </div>
                      <p className="break-words line-clamp-2 font-bold leading-tight text-[11px]">
                        {lesson.title}
                      </p>
                    </div>

                    <ChevronRight
                      className={[
                        "h-3 w-3 shrink-0 transition-opacity",
                        isActive ? "opacity-90" : "opacity-30 group-hover:opacity-60",
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
                    <p className="font-extrabold text-xs leading-snug">Sources &amp; Reading</p>
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
                    <p className="font-extrabold text-xs leading-snug">Unlock Full Access</p>
                    <p className="text-[9px] font-medium opacity-80 leading-snug">
                      {activeTrackConfig.price?.currency} {activeTrackConfig.price?.amount}
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
                    <p className="font-extrabold text-xs leading-snug">Certificate</p>
                    {isCourseComplete ? (
                      <span className="text-[8px] bg-white text-emerald-800 px-1 py-0.2 rounded font-black">
                        READY
                      </span>
                    ) : (
                      <Lock className="h-2.5 w-2.5 opacity-50" />
                    )}
                  </div>
                  <p className="text-[9px] font-normal opacity-70 leading-snug">
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
              "lg:col-span-3 transition-opacity duration-150 space-y-4 sm:space-y-5 w-full min-w-0 overflow-hidden",
              contentVisible ? "opacity-100" : "opacity-0",
            ].join(" ")}
          >
            {/* ══════════════════════════════════════════════════════════
                1. OVERVIEW / HOME VIEW
            ══════════════════════════════════════════════════════════ */}
            {activeView === "home" && (
              <div
                className="space-y-4 sm:space-y-5 animate-fade-in-up w-full min-w-0"
                style={{ animationDuration: "0.3s" }}
              >
                {/* Hero card */}
                <div
                  className={[
                    "relative overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 text-slate-900 border shadow-2xs flex flex-col justify-center w-full min-w-0",
                    currentTrackId === "healthcare"
                      ? "bg-gradient-to-br from-emerald-50/90 via-white to-white border-emerald-200"
                      : currentTrackId === "finance-advanced"
                        ? "bg-gradient-to-br from-purple-50/90 via-white to-white border-purple-200"
                        : currentTrackId === "finance"
                          ? "bg-gradient-to-br from-blue-50/90 via-white to-white border-blue-200"
                          : currentTrackId === "education"
                            ? "bg-gradient-to-br from-teal-50/90 via-white to-white border-teal-200"
                            : currentTrackId === "management"
                              ? "bg-gradient-to-br from-amber-50/90 via-white to-white border-amber-200"
                              : currentTrackId === "agile-developers"
                                ? "bg-gradient-to-br from-sky-50/90 via-white to-white border-sky-200"
                                : currentTrackId === "agile-managers"
                                  ? "bg-gradient-to-br from-teal-50/90 via-white to-white border-teal-200"
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
                          : currentTrackId === "finance-advanced"
                            ? "radial-gradient(circle, #8b5cf6 0%, transparent 70%)"
                            : currentTrackId === "finance"
                              ? "radial-gradient(circle, #3b82f6 0%, transparent 70%)"
                              : currentTrackId === "education"
                                ? "radial-gradient(circle, #0d9488 0%, transparent 70%)"
                                : currentTrackId === "management"
                                  ? "radial-gradient(circle, #d97706 0%, transparent 70%)"
                                  : currentTrackId === "agile-developers"
                                    ? "radial-gradient(circle, #0284c7 0%, transparent 70%)"
                                    : currentTrackId === "agile-managers"
                                      ? "radial-gradient(circle, #0f766e 0%, transparent 70%)"
                                      : "radial-gradient(circle, var(--brand-red, #C8102E) 0%, transparent 70%)",
                    }}
                  />

                  <div className="relative z-10 space-y-3 sm:space-y-4 min-w-0 w-full">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white border border-slate-200/90 px-2.5 py-0.5 text-[10px] sm:text-xs font-bold text-slate-800 shadow-2xs shrink-0">
                        <span
                          className={`h-1.5 w-1.5 rounded-full animate-pulse ${currentTrackId === "healthcare"
                            ? "bg-emerald-500"
                            : currentTrackId === "finance-advanced"
                              ? "bg-purple-500"
                              : currentTrackId === "finance"
                                ? "bg-blue-500"
                                : currentTrackId === "education"
                                  ? "bg-teal-500"
                                  : currentTrackId === "management"
                                    ? "bg-amber-500"
                                    : currentTrackId === "agile-developers"
                                      ? "bg-sky-500"
                                      : currentTrackId === "agile-managers"
                                        ? "bg-teal-600"
                                        : "bg-brand-red"
                            }`}
                        />
                        {activeTrackConfig.badge}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white border border-slate-200/90 px-2.5 py-0.5 text-[10px] sm:text-xs font-bold text-slate-700 shadow-2xs shrink-0">
                        <Zap className="h-3 w-3 text-amber-500" />
                        {activeTrackConfig.durationLabel}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white border border-slate-200/90 px-2.5 py-0.5 text-[10px] sm:text-xs font-bold text-slate-700 shadow-2xs shrink-0">
                        <Award className="h-3 w-3 text-amber-500" />
                        Verified Credential
                      </span>
                    </div>

                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-black leading-tight tracking-tight text-slate-900 break-words">
                      {activeTrackConfig.name}
                    </h1>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl font-medium break-words">
                      {activeTrackConfig.description}
                    </p>

                    {/* Track Readiness Callout Card */}
                    {currentTrackId && TRACK_READINESS_CALLOUTS[currentTrackId] && (
                      <div
                        className="rounded-xl p-3 sm:p-3.5 my-1 max-w-2xl border shadow-xs transition-all"
                        style={{
                          backgroundColor: TRACK_READINESS_CALLOUTS[currentTrackId].bgColor,
                          borderColor: TRACK_READINESS_CALLOUTS[currentTrackId].borderColor,
                        }}
                      >
                        <span
                          className="font-bold text-[11px] sm:text-xs uppercase tracking-wide mr-2 inline"
                          style={{ color: TRACK_READINESS_CALLOUTS[currentTrackId].titleColor }}
                        >
                          {TRACK_READINESS_CALLOUTS[currentTrackId].title}
                        </span>
                        <span className="text-xs sm:text-[13px] text-[#E7EEF9] font-normal leading-relaxed">
                          {TRACK_READINESS_CALLOUTS[currentTrackId].text}
                        </span>
                      </div>
                    )}

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

                {/* 3 Pillar Features Responsive Cards (Stacked on Mobile, 3-column Grid on Desktop) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 w-full min-w-0">
                  {currentTrackId === "healthcare" ? (
                    <>
                      <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2 min-w-0">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0">
                          <Stethoscope className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1 min-w-0">
                          <h3 className="font-black text-xs sm:text-xs md:text-sm text-slate-900 leading-tight">
                            Built for Clinical Practice
                          </h3>
                          <p className="text-[11px] sm:text-[11px] md:text-xs text-slate-600 leading-snug sm:leading-relaxed font-medium">
                            Applied directly to diagnosis, radiology, triage, clinical workflows,
                            and patient safety in Nepal.
                          </p>
                        </div>
                      </div>
                      <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2 min-w-0">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold shrink-0">
                          <Brain className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1 min-w-0">
                          <h3 className="font-black text-xs sm:text-xs md:text-sm text-slate-900 leading-tight">
                            Real-World Deployments
                          </h3>
                          <p className="text-[11px] sm:text-[11px] md:text-xs text-slate-600 leading-snug sm:leading-relaxed font-medium">
                            Case studies in TB X-ray screening, diabetic retinopathy, ambient
                            scribes, and neonatal cry analysis.
                          </p>
                        </div>
                      </div>
                      <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2 min-w-0">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold shrink-0">
                          <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1 min-w-0">
                          <h3 className="font-black text-xs sm:text-xs md:text-sm text-slate-900 leading-tight">
                            Governance &amp; 10-20-70 Rule
                          </h3>
                          <p className="text-[11px] sm:text-[11px] md:text-xs text-slate-600 leading-snug sm:leading-relaxed font-medium">
                            Evaluate clinical AI safety, dataset shift, and submit defensible
                            proposals to hospital committees.
                          </p>
                        </div>
                      </div>
                    </>
                  ) : currentTrackId === "finance-advanced" ? (
                    <>
                      <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2 min-w-0">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold shrink-0">
                          <Layers className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1 min-w-0">
                          <h3 className="font-black text-xs sm:text-xs md:text-sm text-slate-900 leading-tight">
                            Capability Architecture Stack
                          </h3>
                          <p className="text-[11px] sm:text-[11px] md:text-xs text-slate-600 leading-snug sm:leading-relaxed font-medium">
                            Architect 4-layer institutional capability across engagement, AI
                            decisioning, core data, and operating model.
                          </p>
                        </div>
                      </div>
                      <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2 min-w-0">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-red-50 text-brand-red flex items-center justify-center font-bold shrink-0">
                          <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1 min-w-0">
                          <h3 className="font-black text-xs sm:text-xs md:text-sm text-slate-900 leading-tight">
                            Advanced MRM &amp; Deep XAI
                          </h3>
                          <p className="text-[11px] sm:text-[11px] md:text-xs text-slate-600 leading-snug sm:leading-relaxed font-medium">
                            Risk tiering, independent validation rigor, and context-aware
                            explainability for supervisors and audit.
                          </p>
                        </div>
                      </div>
                      <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2 min-w-0">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold shrink-0">
                          <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1 min-w-0">
                          <h3 className="font-black text-xs sm:text-xs md:text-sm text-slate-900 leading-tight">
                            Agents &amp; Systemic Risk
                          </h3>
                          <p className="text-[11px] sm:text-[11px] md:text-xs text-slate-600 leading-snug sm:leading-relaxed font-medium">
                            Multi-agent governance boundaries, BIS model herding analysis, and
                            target operating model transformation.
                          </p>
                        </div>
                      </div>
                    </>
                  ) : currentTrackId === "finance" ? (
                    <>
                      <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2 min-w-0">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold shrink-0">
                          <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1 min-w-0">
                          <h3 className="font-black text-xs sm:text-xs md:text-sm text-slate-900 leading-tight">
                            Board &amp; Supervisory Ready
                          </h3>
                          <p className="text-[11px] sm:text-[11px] md:text-xs text-slate-600 leading-snug sm:leading-relaxed font-medium">
                            Grounded in Nepal Rastra Bank AI Guidelines, placing ultimate
                            accountability on management and boards.
                          </p>
                        </div>
                      </div>
                      <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2 min-w-0">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-red-50 text-brand-red flex items-center justify-center font-bold shrink-0">
                          <Brain className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1 min-w-0">
                          <h3 className="font-black text-xs sm:text-xs md:text-sm text-slate-900 leading-tight">
                            Credit Scoring &amp; Fraud AML
                          </h3>
                          <p className="text-[11px] sm:text-[11px] md:text-xs text-slate-600 leading-snug sm:leading-relaxed font-medium">
                            Supervised credit ML vs scorecards, mule account network detection,
                            precision vs recall trade-offs.
                          </p>
                        </div>
                      </div>
                      <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2 min-w-0">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold shrink-0">
                          <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1 min-w-0">
                          <h3 className="font-black text-xs sm:text-xs md:text-sm text-slate-900 leading-tight">
                            Generative Banking &amp; RAG
                          </h3>
                          <p className="text-[11px] sm:text-[11px] md:text-xs text-slate-600 leading-snug sm:leading-relaxed font-medium">
                            Deterministic core + LLM interface architecture, policy RAG search, and
                            avoiding model hallucination.
                          </p>
                        </div>
                      </div>
                    </>
                  ) : currentTrackId === "education" ? (
                    <>
                      <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2 min-w-0">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold shrink-0">
                          <GraduationCap className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1 min-w-0">
                          <h3 className="font-black text-xs sm:text-xs md:text-sm text-slate-900 leading-tight">
                            Cognitive Science of Learning
                          </h3>
                          <p className="text-[11px] sm:text-[11px] md:text-xs text-slate-600 leading-snug sm:leading-relaxed font-medium">
                            Protect the student's cognitive effort: "the process is the purpose"
                            applied to AI-assisted classrooms.
                          </p>
                        </div>
                      </div>
                      <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2 min-w-0">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0">
                          <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1 min-w-0">
                          <h3 className="font-black text-xs sm:text-xs md:text-sm text-slate-900 leading-tight">
                            Reclaim Teacher Workload
                          </h3>
                          <p className="text-[11px] sm:text-[11px] md:text-xs text-slate-600 leading-snug sm:leading-relaxed font-medium">
                            Automate administrative overhead: differentiated worksheets, rubrics,
                            and lesson plans without lowering standards.
                          </p>
                        </div>
                      </div>
                      <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2 min-w-0">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold shrink-0">
                          <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1 min-w-0">
                          <h3 className="font-black text-xs sm:text-xs md:text-sm text-slate-900 leading-tight">
                            Assessment Redesign &amp; Integrity
                          </h3>
                          <p className="text-[11px] sm:text-[11px] md:text-xs text-slate-600 leading-snug sm:leading-relaxed font-medium">
                            Move beyond unreliable AI detectors to conversational assessment,
                            student AI literacy, and school safeguarding.
                          </p>
                        </div>
                      </div>
                    </>
                  ) : currentTrackId === "management" ? (
                    <>
                      <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2 min-w-0">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold shrink-0">
                          <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1 min-w-0">
                          <h3 className="font-black text-xs sm:text-xs md:text-sm text-slate-900 leading-tight">
                            The Executive Mental Model
                          </h3>
                          <p className="text-[11px] sm:text-[11px] md:text-xs text-slate-600 leading-snug sm:leading-relaxed font-medium">
                            ML predicts, GenAI produces, Agentic AI acts. Clear terminology and
                            decision rights for boards and management teams.
                          </p>
                        </div>
                      </div>
                      <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2 min-w-0">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-red-50 text-brand-red flex items-center justify-center font-bold shrink-0">
                          <Target className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1 min-w-0">
                          <h3 className="font-black text-xs sm:text-xs md:text-sm text-slate-900 leading-tight">
                            ROI, Budgeting &amp; Use Cases
                          </h3>
                          <p className="text-[11px] sm:text-[11px] md:text-xs text-slate-600 leading-snug sm:leading-relaxed font-medium">
                            Prioritise high-value use cases, budget for true integration costs, and
                            avoid the 80% data readiness bottleneck.
                          </p>
                        </div>
                      </div>
                      <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2 min-w-0">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0">
                          <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1 min-w-0">
                          <h3 className="font-black text-xs sm:text-xs md:text-sm text-slate-900 leading-tight">
                            12-Month Transformation Plan
                          </h3>
                          <p className="text-[11px] sm:text-[11px] md:text-xs text-slate-600 leading-snug sm:leading-relaxed font-medium">
                            Stage-gated pilot-to-production discipline, risk tiering, and leading
                            people through cultural AI change.
                          </p>
                        </div>
                      </div>
                    </>
                  ) : currentTrackId === "agile-developers" ? (
                    <>
                      <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2 min-w-0">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center font-bold shrink-0">
                          <Code2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1 min-w-0">
                          <h3 className="font-black text-xs sm:text-xs md:text-sm text-slate-900 leading-tight">
                            Iterative Delivery &amp; Sprints
                          </h3>
                          <p className="text-[11px] sm:text-[11px] md:text-xs text-slate-600 leading-snug sm:leading-relaxed font-medium">
                            Understand why waterfall fails in software, master 2-week sprints, user
                            stories, Definition of Done, and velocity forecasting.
                          </p>
                        </div>
                      </div>
                      <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2 min-w-0">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0">
                          <Target className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1 min-w-0">
                          <h3 className="font-black text-xs sm:text-xs md:text-sm text-slate-900 leading-tight">
                            TDD &amp; XP Engineering Practices
                          </h3>
                          <p className="text-[11px] sm:text-[11px] md:text-xs text-slate-600 leading-snug sm:leading-relaxed font-medium">
                            Extreme Programming core practices: Test-Driven Development (Red-Green-Refactor),
                            automated CI/CD pipelines, and continuous integration.
                          </p>
                        </div>
                      </div>
                      <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2 min-w-0">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold shrink-0">
                          <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1 min-w-0">
                          <h3 className="font-black text-xs sm:text-xs md:text-sm text-slate-900 leading-tight">
                            Pairing, PR Reviews &amp; Retros
                          </h3>
                          <p className="text-[11px] sm:text-[11px] md:text-xs text-slate-600 leading-snug sm:leading-relaxed font-medium">
                            Code review etiquette, pair programming patterns, effective standups,
                            and actionable retrospectives for continuous team growth.
                          </p>
                        </div>
                      </div>
                    </>
                  ) : currentTrackId === "agile-managers" ? (
                    <>
                      <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2 min-w-0">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold shrink-0">
                          <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1 min-w-0">
                          <h3 className="font-black text-xs sm:text-xs md:text-sm text-slate-900 leading-tight">
                            Mindset &amp; Servant Leadership
                          </h3>
                          <p className="text-[11px] sm:text-[11px] md:text-xs text-slate-600 leading-snug sm:leading-relaxed font-medium">
                            Doing Agile vs Being Agile, Cynefin complexity decision-making, and transitioning
                            from command-and-control to impediment removal.
                          </p>
                        </div>
                      </div>
                      <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2 min-w-0">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold shrink-0">
                          <Target className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1 min-w-0">
                          <h3 className="font-black text-xs sm:text-xs md:text-sm text-slate-900 leading-tight">
                            Budgeting, Contracts &amp; Metrics
                          </h3>
                          <p className="text-[11px] sm:text-[11px] md:text-xs text-slate-600 leading-snug sm:leading-relaxed font-medium">
                            Value-driven dynamic funding vs fixed contracts, lead/cycle time metrics
                            over vanity targets, and continuous audit compliance.
                          </p>
                        </div>
                      </div>
                      <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2 min-w-0">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-red-50 text-brand-red flex items-center justify-center font-bold shrink-0">
                          <Layers className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1 min-w-0">
                          <h3 className="font-black text-xs sm:text-xs md:text-sm text-slate-900 leading-tight">
                            Team Design &amp; Enterprise Scaling
                          </h3>
                          <p className="text-[11px] sm:text-[11px] md:text-xs text-slate-600 leading-snug sm:leading-relaxed font-medium">
                            Cross-functional team dedication, navigating scaling models (SAFe, LeSS,
                            Spotify), and executing a 12-month change roadmap.
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2 min-w-0">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-red-50 text-brand-red flex items-center justify-center font-bold shrink-0">
                          <Brain className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1 min-w-0">
                          <h3 className="font-black text-xs sm:text-xs md:text-sm text-slate-900 leading-tight">
                            Neural Foundations
                          </h3>
                          <p className="text-[11px] sm:text-[11px] md:text-xs text-slate-600 leading-snug sm:leading-relaxed font-medium">
                            Understand how models learn from weights, parameters, tokens, and
                            inference without confusing jargon.
                          </p>
                        </div>
                      </div>
                      <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2 min-w-0">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0">
                          <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1 min-w-0">
                          <h3 className="font-black text-xs sm:text-xs md:text-sm text-slate-900 leading-tight">
                            Advanced Prompting
                          </h3>
                          <p className="text-[11px] sm:text-[11px] md:text-xs text-slate-600 leading-snug sm:leading-relaxed font-medium">
                            Master role steering, few-shot conditioning, multimodal image/audio
                            prompting, and context management.
                          </p>
                        </div>
                      </div>
                      <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2 min-w-0">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold shrink-0">
                          <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1 min-w-0">
                          <h3 className="font-black text-xs sm:text-xs md:text-sm text-slate-900 leading-tight">
                            Free Verified Credential
                          </h3>
                          <p className="text-[11px] sm:text-[11px] md:text-xs text-slate-600 leading-snug sm:leading-relaxed font-medium">
                            Pass 5 short mastery quizzes to earn a shareable, verified Red Dot
                            Technologies digital certificate.
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Course Curriculum List */}
                <div className="space-y-3 w-full min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 px-0.5">
                    <div className="min-w-0 flex-1">
                      <h2 className="text-sm sm:text-base font-black text-slate-900 leading-snug line-clamp-2">
                        {activeTrackConfig.name} Curriculum
                      </h2>
                      <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-snug">
                        {currentLessons.length} structured modules designed for real-world mastery
                      </p>
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-full shadow-2xs shrink-0">
                      {currentLessons.length} Modules •{" "}
                      {currentLessons.reduce((acc, l) => {
                        const cacheKey = `${currentTrackId}:${l.id}`;
                        const loaded = loadedLessons[cacheKey];
                        return acc + (loaded?.quiz?.length || l.quiz?.length || 4);
                      }, 0)}{" "}
                      Questions
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5 w-full min-w-0">
                    {currentLessons.map((lesson, idx) => {
                      const isLocked = isLessonLocked(lesson.id);
                      const isDone =
                        isTrackUnlocked && !isLocked && !!currentTrackState.done?.[lesson.id];
                      const cacheKey = `${currentTrackId}:${lesson.id}`;
                      const lessonQuizCount =
                        loadedLessons[cacheKey]?.quiz?.length || lesson.quiz?.length || 4;

                      return (
                        <div
                          key={lesson.id}
                          className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-slate-300 transition-all w-full min-w-0 overflow-hidden"
                        >
                          <div className="flex items-start gap-2.5 sm:gap-3 min-w-0 w-full flex-1">
                            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-700 text-xs shrink-0 border border-slate-200 mt-0.5 sm:mt-0">
                              {idx + 1}
                            </div>
                            <div className="space-y-1 min-w-0 flex-1 overflow-hidden">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-brand-red shrink-0">
                                  {lesson.tag}
                                </span>
                                <span className="text-slate-300">•</span>
                                <span className="text-[10px] sm:text-[11px] text-slate-500 flex items-center gap-1 font-medium shrink-0">
                                  <Clock className="h-3 w-3" />
                                  {lesson.time}
                                </span>
                                {isDone ? (
                                  <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 text-[9px] font-black shrink-0">
                                    <Check className="h-2.5 w-2.5" /> Done
                                  </span>
                                ) : isLocked ? (
                                  <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.2 text-[9px] font-bold shrink-0">
                                    <Lock className="h-2.5 w-2.5" /> Locked
                                  </span>
                                ) : !activeTrackConfig.isPaid ? null : (
                                  <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 text-[9px] font-bold shrink-0">
                                    Free Preview
                                  </span>
                                )}
                              </div>
                              <h3 className="font-black text-slate-900 text-xs sm:text-sm leading-snug break-words">
                                {lesson.title}
                              </h3>
                              <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-medium line-clamp-2 break-words">
                                {lesson.summary}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 sm:border-none">
                            {isLocked ? (
                              <button
                                onClick={() => navigateView("pay")}
                                className="w-full sm:w-auto rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs px-3.5 py-2 transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
                              >
                                <Lock className="h-3.5 w-3.5" />
                                <span>Unlock Module</span>
                              </button>
                            ) : (
                              <>
                                <button
                                  onClick={() => navigateView(lesson.id)}
                                  className="flex-1 sm:flex-none rounded-lg bg-slate-900 hover:bg-brand-red text-white font-extrabold text-xs px-3.5 py-2 transition-colors cursor-pointer text-center"
                                >
                                  Read Module
                                </button>
                                <button
                                  onClick={() => navigateView(`q_${lesson.id}`)}
                                  className="flex-1 sm:flex-none rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-extrabold text-xs px-3 py-2 transition-colors cursor-pointer text-center"
                                >
                                  Quiz ({lessonQuizCount}Q)
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ── The Next Step: PECP Progression Banner (Bottom of Programme Overview) ── */}
                <PecpNextStepBanner trackId={currentTrackId} className="mt-4 sm:mt-6" />
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════
                2. INDIVIDUAL LESSON CONTENT VIEW
            ══════════════════════════════════════════════════════════ */}
            {currentLessons.map((lesson, idx) => {
              if (activeView !== lesson.id && activeView !== `q_${lesson.id}`) return null;
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
                        This module is part of the full verified{" "}
                        <span className="font-bold text-slate-900">{activeTrackConfig.name}</span>{" "}
                        programme. Please unlock full access using your verified Access Code to
                        access all lessons, quizzes, and digital credential.
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

              const cacheKey = `${currentTrackId}:${lesson.id}`;
              const fullLesson = loadedLessons[cacheKey] || lesson;
              const hasFullSections = fullLesson.sections && fullLesson.sections.length > 0;

              if (isLoadingLesson && !hasFullSections) {
                return (
                  <div key={lesson.id} className="space-y-4 animate-pulse">
                    <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6 space-y-3">
                      <div className="h-5 w-28 bg-slate-200 rounded-full" />
                      <div className="h-7 w-3/4 bg-slate-200 rounded-lg" />
                      <div className="h-4 w-1/2 bg-slate-200 rounded-md" />
                    </div>
                    <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6 space-y-3">
                      <div className="h-4 w-48 bg-slate-200 rounded" />
                      <div className="h-16 bg-slate-100 rounded-xl" />
                      <div className="h-16 bg-slate-100 rounded-xl" />
                    </div>
                  </div>
                );
              }

              if (lessonFetchError && !hasFullSections) {
                return (
                  <div
                    key={lesson.id}
                    className="bg-white rounded-2xl border border-red-200 p-8 text-center space-y-4 max-w-xl mx-auto my-6"
                  >
                    <div className="h-12 w-12 mx-auto rounded-full bg-red-50 text-red-600 flex items-center justify-center">
                      <X className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-black text-slate-900 text-lg">
                        Unable to load module content
                      </h3>
                      <p className="text-xs text-slate-600 font-medium">{lessonFetchError}</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 pt-2">
                      <button
                        onClick={() => {
                          setLessonFetchError(null);
                          setIsLoadingLesson(true);
                          fetchAiLesson(currentTrackId!, lesson.id, currentTrackState.accessCode)
                            .then((res: any) => {
                              const lessonData = res?.sections ? res : res?.data?.sections ? res.data : null;
                              if (lessonData && lessonData.sections && lessonData.sections.length > 0) {
                                setLoadedLessons((prev) => ({ ...prev, [cacheKey]: lessonData }));
                              } else if (res && res.locked) {
                                updateTrackState(currentTrackId!, (prev) => ({
                                  ...prev,
                                  unlocked: false,
                                  accessCode: undefined,
                                }));
                                navigateView("pay");
                              } else {
                                setLessonFetchError(res?.error || "Failed to load.");
                              }
                            })
                            .catch((err) => {
                              const msg = err instanceof Error ? err.message : String(err);
                              if (
                                msg.includes("403") ||
                                msg.includes("Access denied") ||
                                msg.includes("enrollment required")
                              ) {
                                updateTrackState(currentTrackId!, (prev) => ({
                                  ...prev,
                                  unlocked: false,
                                  accessCode: undefined,
                                }));
                                navigateView("pay");
                                return;
                              }
                              setLessonFetchError(msg || "Failed to load.");
                            })
                            .finally(() => setIsLoadingLesson(false));
                        }}
                        className="rounded-xl bg-slate-900 hover:bg-brand-red text-white font-bold text-xs px-4 py-2.5 transition-colors cursor-pointer"
                      >
                        Try Again
                      </button>
                      <button
                        onClick={() => navigateView("pay")}
                        className="rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs px-4 py-2.5 transition-colors cursor-pointer"
                      >
                        Access Code Form
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
                          {fullLesson.tag}
                        </span>
                        <span className="text-[10px] sm:text-xs text-slate-500 font-medium flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {fullLesson.time}
                        </span>
                      </div>

                      {/* Mode switch pills (Material vs Quiz) */}
                      <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                        <button
                          onClick={() => navigateView(fullLesson.id)}
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
                          onClick={() => navigateView(`q_${fullLesson.id}`)}
                          className={[
                            "px-3 py-1 rounded-md text-[11px] sm:text-xs font-extrabold transition-all cursor-pointer",
                            isQuizMode
                              ? "bg-brand-red text-white shadow-2xs"
                              : "text-slate-600 hover:text-slate-900",
                          ].join(" ")}
                        >
                          Practice Quiz ({(fullLesson.quiz || []).length}Q)
                        </button>
                      </div>
                    </div>

                    <h1 className="text-lg sm:text-2xl font-black text-slate-900 leading-tight">
                      {fullLesson.title}
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      {fullLesson.summary}
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
                          {fullLesson.objectives.map((obj, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Interactive Animated SVG Diagram */}
                      {renderSvgDiagram(fullLesson.id) && (
                        <div className="rounded-xl sm:rounded-2xl bg-slate-950 p-2.5 sm:p-6 border border-slate-800 shadow-2xs overflow-hidden">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: sanitizeHtml(renderSvgDiagram(fullLesson.id)),
                            }}
                            className="overflow-x-auto"
                          />
                          {DIAGRAM_CAPTIONS[fullLesson.id] && (
                            <p className="mt-2 text-center text-[10px] sm:text-xs text-slate-400 font-medium">
                              {DIAGRAM_CAPTIONS[fullLesson.id]}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Content Sections */}
                      <div className="space-y-3 sm:space-y-4">
                        {(fullLesson.sections || []).map((section, sIdx) => (
                          <div
                            key={sIdx}
                            className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs p-3.5 sm:p-6 space-y-2"
                          >
                            <h2 className="text-sm sm:text-lg font-black text-slate-900 flex items-baseline gap-2">
                              <span className="text-sm sm:text-lg font-black text-brand-red shrink-0">
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
                      {fullLesson.practitioner && (
                        <div className="rounded-xl sm:rounded-2xl bg-blue-50/90 border border-blue-200 p-3.5 sm:p-5 space-y-1.5 shadow-2xs">
                          <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                            {fullLesson.practitioner.title}
                          </h3>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: sanitizeHtml(fullLesson.practitioner.text),
                            }}
                            className="text-xs sm:text-sm text-blue-950 leading-relaxed font-medium"
                          />
                        </div>
                      )}

                      {/* Hands-on Workplace Activity */}
                      {fullLesson.activity && (
                        <div className="rounded-xl sm:rounded-2xl bg-amber-50/90 border border-amber-200 p-3.5 sm:p-5 space-y-1.5 shadow-2xs">
                          <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                            <Lightbulb className="h-3.5 w-3.5 text-amber-600" />
                            {fullLesson.activity.title}
                          </h3>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: sanitizeHtml(fullLesson.activity.text),
                            }}
                            className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium"
                          />
                        </div>
                      )}

                      {/* Key Takeaways */}
                      {(fullLesson.takeaways || []).length > 0 && (
                        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-6 space-y-2.5">
                          <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                            <FileCheck className="h-3.5 w-3.5 text-brand-red" />
                            Key Takeaways
                          </h3>
                          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 font-medium">
                            {fullLesson.takeaways.map((t, i) => (
                              <li key={i} className="flex items-start gap-2.5">
                                <span className="h-4.5 w-4.5 rounded-full bg-red-50 text-brand-red text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5 border border-red-200">
                                  {i + 1}
                                </span>
                                <span className="leading-snug">{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

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
                            Full access unlocks all remaining modules, diagnostic/banking case
                            studies, mastery assessments, and your verified digital certificate of
                            completion for {activeTrackConfig.price?.currency}{" "}
                            {activeTrackConfig.price?.amount}.
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
                          onClick={() => navigateView(`q_${fullLesson.id}`)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-brand-red hover:bg-red-700 text-white text-xs font-black px-4 sm:px-5 py-2 sm:py-2.5 shadow-xs hover:shadow-md transition-all cursor-pointer"
                        >
                          <span>Take {fullLesson.tag} Assessment</span>
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
                            {fullLesson.tag} Mastery Assessment
                          </h2>
                          <p className="text-xs text-slate-500 mt-0.5 font-medium">
                            Select the correct answer for each of the{" "}
                            {(fullLesson.quiz || []).length} questions below. All questions must be
                            correct to complete the module.
                          </p>
                        </div>

                        {(fullLesson.quiz || []).map((qItem, qIdx) => {
                          const selectedOption = (currentTrackState.answers?.[fullLesson.id] || {})[
                            qIdx
                          ];
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
                                      onClick={() => handleQuizAnswer(fullLesson.id, qIdx, oIdx)}
                                      className={`w-full text-left p-2.5 sm:p-3 rounded-lg sm:rounded-xl border text-xs sm:text-sm transition-all flex items-center gap-2.5 cursor-pointer ${btnStyle}`}
                                    >
                                      <span
                                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[10px] font-black ${isAnswered && oIdx === qItem.a
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
                                  className={`p-2.5 sm:p-3 rounded-lg sm:rounded-xl text-xs font-semibold flex items-start gap-2 ${isCorrect
                                    ? "bg-emerald-50 border border-emerald-200 text-emerald-900"
                                    : "bg-red-50 border border-red-200 text-red-900"
                                    }`}
                                >
                                  <span className="font-bold text-xs leading-none">
                                    {isCorrect ? "✓" : "✗"}
                                  </span>
                                  <span>
                                    <strong>{isCorrect ? "Correct!" : "Not quite:"}</strong>{" "}
                                    {qItem.fb}
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}

                        {/* Bottom navigation */}
                        <div className="flex items-center justify-between pt-1">
                          <button
                            onClick={() => navigateView(fullLesson.id)}
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
              <div
                className="space-y-4 sm:space-y-5 animate-fade-in-up"
                style={{ animationDuration: "0.3s" }}
              >
                <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-6 space-y-2">
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                    Academic &amp; Industry Citations
                  </span>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                    Sources &amp; Further Reading
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    This programme has been developed by Red Dot Technologies and draws on published
                    research, white papers, and regulatory guidelines from leading global
                    institutions, applied directly to Nepal and developing economies.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {(currentTrackId === "finance-advanced"
                    ? FINANCE_ADVANCED_SOURCES
                    : currentTrackId === "finance"
                      ? FINANCE_SOURCES
                      : currentTrackId === "education"
                        ? EDUCATION_SOURCES
                        : currentTrackId === "management"
                          ? MANAGEMENT_SOURCES
                          : currentTrackId === "agile-developers"
                            ? AGILE_DEVELOPERS_SOURCES
                            : currentTrackId === "agile-managers"
                              ? AGILE_MANAGERS_SOURCES
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
                  <strong>Notice on citations:</strong> Statistics and findings are reproduced for
                  professional educational purposes. Figures reflect the study periods and should be
                  treated as indicative of direction. Participants must verify regulatory and
                  ethical requirements with their institution and the relevant national authorities.
                </div>

                {/* ── The Next Step: PECP Progression Banner ── */}
                <PecpNextStepBanner trackId={currentTrackId} className="mt-4 sm:mt-6" />
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════
                4. PAYWALL & ACCESS UNLOCK SCREEN
            ══════════════════════════════════════════════════════════ */}
            {activeView === "pay" && (
              <div
                className="space-y-4 sm:space-y-5 animate-fade-in-up"
                style={{ animationDuration: "0.3s" }}
              >
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
                    You have been exploring the free preview of {activeTrackConfig.name}. Unlock
                    full access to all {totalLessons} in-depth modules, practitioner case studies,
                    interactive assessments, and your official Certificate of Completion.
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
                        Scan the official QR code using any Nepali mobile banking app or digital
                        wallet (eSewa, Khalti, ConnectIPS, Mobile Banking).
                      </p>

                      <div className="p-3.5 bg-slate-50/90 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-center">
                        {/* Fonepay Merchant Header */}
                        <div className="flex items-center justify-center gap-2 mb-2.5">
                          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-[#c8102e] text-white font-black text-[11px] sm:text-xs tracking-tight shadow-xs">
                            fonepay
                          </span>
                          <span className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight">
                            Red Dot Technologies
                          </span>
                        </div>

                        {/* Official QR Code */}
                        <img
                          src="/fonepay-qr.png"
                          alt="Red Dot Technologies Fonepay QR"
                          className="h-36 w-36 sm:h-44 sm:w-44 object-contain rounded-xl border border-slate-200/90 shadow-2xs bg-white p-1"
                        />

                        {/* Regulatory & Usage Notes */}
                        <div className="mt-2.5 space-y-0.5">
                          <div className="text-[10px] sm:text-[11px] font-semibold text-slate-600">
                            Scan with any Nepali mobile banking or wallet app
                          </div>
                          <div className="text-[10px] sm:text-[11px] font-semibold text-slate-600">
                            नेपाल राष्ट्र बैंकबाट अनुमति प्राप्त
                          </div>
                          <div className="pt-1 text-[9px] sm:text-[10px] text-slate-400 font-medium">
                            Remark: {activeTrackConfig.shortName}
                          </div>
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
                        Fill in your name and transaction reference so our team can verify and
                        dispatch your access code.
                      </p>

                      {requestSubmitted ? (
                        <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 space-y-1.5 text-xs">
                          <p className="font-bold">✓ Details Received!</p>
                          <p className="text-[11px] sm:text-xs">
                            Thank you, {requestName}. We will verify your transaction (Txn:{" "}
                            {requestTxn || "Submitted"}) and email your unlock code to{" "}
                            <strong>{requestEmail}</strong> promptly.
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
                            {requestReceiptUrl || receiptLocalPreview ? (
                              <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-2 flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 min-w-0">
                                  <img
                                    src={receiptLocalPreview || requestReceiptUrl}
                                    alt="Payment Screenshot"
                                    className="h-9 w-9 object-cover rounded-md border border-emerald-300 shrink-0"
                                  />
                                  <div className="min-w-0">
                                    <span className="text-[11px] font-bold text-emerald-800 block truncate">
                                      ✓ Screenshot Attached
                                    </span>
                                    <a
                                      href={receiptLocalPreview || requestReceiptUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-[10px] text-brand-red hover:underline block truncate font-medium"
                                    >
                                      Preview Image
                                    </a>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setRequestReceiptUrl("");
                                    setReceiptLocalPreview("");
                                  }}
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
                                    <span className="text-[11px]">
                                      Upload payment receipt screenshot
                                    </span>
                                  </div>
                                )}
                              </label>
                            )}
                          </div>

                          <button
                            type="submit"
                            disabled={isSubmittingPayment}
                            className="w-full rounded-lg bg-slate-900 hover:bg-brand-red disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-bold py-2 transition-colors cursor-pointer flex items-center justify-center gap-2"
                          >
                            {isSubmittingPayment ? (
                              <>
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                <span>Submitting Details...</span>
                              </>
                            ) : (
                              <span>Submit Verification Request →</span>
                            )}
                          </button>
                        </form>
                      )}

                      <div className="pt-2 text-center text-[10.5px] sm:text-[11px] text-slate-500 font-medium border-t border-slate-100 flex flex-col items-center gap-0.5">
                        <div>
                          Questions?{" "}
                          <a
                            href="mailto:info@reddottech.com.np"
                            className="font-bold text-slate-800 hover:text-brand-red hover:underline"
                          >
                            info@reddottech.com.np
                          </a>
                        </div>
                        <div className="whitespace-nowrap">
                          <a
                            href="tel:014535691"
                            className="font-bold text-slate-800 hover:text-brand-red"
                          >
                            01 4535691
                          </a>{" "}
                          /{" "}
                          <a
                            href="tel:014516390"
                            className="font-bold text-slate-800 hover:text-brand-red"
                          >
                            4516390
                          </a>
                        </div>
                      </div>
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
                        Already have an access code? Enter it below for immediate offline activation
                        in this browser.
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
              <div
                className="space-y-4 sm:space-y-5 animate-fade-in-up"
                style={{ animationDuration: "0.3s" }}
              >
                {!isTrackUnlocked && activeTrackConfig.isPaid ? (
                  <div className="bg-white rounded-xl sm:rounded-2xl border border-amber-200 p-6 sm:p-10 text-center space-y-4 shadow-2xs max-w-2xl mx-auto">
                    <div className="mx-auto h-16 w-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl shadow-inner text-amber-600">
                      <Lock className="h-8 w-8 text-amber-600" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-black text-slate-900">
                      Certificate Locked — Enrolment Required
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed font-medium">
                      Official Certificate issuance is available only to verified students enrolled
                      in <span className="font-bold text-slate-800">{activeTrackConfig.name}</span>.
                      Please unlock the course with your Access Code to proceed.
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
                      Complete all {totalLessons} module mastery quizzes to unlock your verified
                      credential. You have finished{" "}
                      <span className="font-extrabold text-slate-900">
                        {completedCount} of {totalLessons}
                      </span>{" "}
                      modules.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                      {currentLessons.map((l) => (
                        <div
                          key={l.id}
                          className={`h-2.5 w-2.5 rounded-full transition-colors ${currentTrackState.done?.[l.id] ? "bg-emerald-500" : "bg-slate-200"
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
                        Enter your full legal name and details as you would like them to appear on
                        your official digital certificate.
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
                          onClick={async () => {
                            if (!activeTrackConfig) return;
                            const tId = toast.loading("Generating high-resolution landscape certificate...");
                            try {
                              await downloadOfficialCertificatePdf({
                                name: certName.trim() || "Candidate Name",
                                certificateId: certReference,
                                track: currentTrackId,
                                courseName: activeTrackConfig.certTitle,
                                organization: certOrg.trim() || "Red Dot Technologies",
                                role: certRole.trim(),
                                department: certDept.trim(),
                                completedAt: new Date().toISOString(),
                              });
                              toast.success("Certificate PDF downloaded in landscape orientation!", { id: tId });
                            } catch (err) {
                              console.error("PDF download error:", err);
                              toast.error("Could not generate certificate PDF.", { id: tId });
                            }
                          }}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-brand-red hover:bg-red-700 text-white text-xs font-bold px-4 py-2 transition-colors cursor-pointer shadow-2xs"
                          title="Download true A4 landscape PDF file"
                        >
                          <Download className="h-3.5 w-3.5" />
                          <span>Download PDF (Landscape)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (!activeTrackConfig) return;
                            printOfficialCertificate({
                              name: certName.trim() || "Candidate Name",
                              certificateId: certReference,
                              track: currentTrackId,
                              courseName: activeTrackConfig.certTitle,
                              organization: certOrg.trim() || "Red Dot Technologies",
                              role: certRole.trim(),
                              department: certDept.trim(),
                              completedAt: new Date().toISOString(),
                            });
                          }}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold px-3 py-2 transition-colors cursor-pointer shadow-2xs"
                          title="Print or Save via browser dialog"
                        >
                          <Printer className="h-3.5 w-3.5" />
                          <span>Print</span>
                        </button>

                        <ShareOnLinkedInButton
                          variant="primary"
                          certificateTitle={activeTrackConfig?.certTitle || "AI Course Certificate"}
                          certificateId={certReference}
                          recipientName={certName.trim() || undefined}
                          issueDate={new Date().toISOString()}
                          label="Share on LinkedIn"
                        />
                      </div>
                    </div>

                    {/* Official Certificate Parchment */}
                    <div className="overflow-x-auto pb-3 -mx-1 sm:mx-0 px-1 sm:px-0">
                      <div
                        id="official-certificate"
                        className="relative mx-auto min-w-[320px] max-w-[860px] w-full bg-white border-2 border-[#0F1E3D] p-0 shadow-[0_10px_34px_rgba(15,30,61,0.13)]"
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
                            className="text-2xl sm:text-[28px] text-[#0F1E3D] my-2 leading-tight tracking-tight font-serif font-medium"
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
                            className="text-xl sm:text-[28px] font-medium text-[#1B3566] border-b border-slate-300 inline-block px-6 sm:px-10 pb-1.5 mb-1.5 font-serif"
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
                              <div className="mb-1 flex items-end">
                                <img
                                  src="/reddotstamp.png"
                                  alt="Red Dot Technologies Pvt. Ltd. Official Stamp"
                                  className="h-12 sm:h-16 w-auto object-contain pointer-events-none select-none drop-shadow-xs ml-5 sm:ml-7"
                                  onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).src = "/images/reddotstamp.png";
                                  }}
                                />
                              </div>
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
                              <div className="pt-1.5 min-w-[180px]">
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

                          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[10.5px] text-[#6B7C96] tracking-[0.8px] font-mono border-t border-slate-100 pt-3">
                            <span>Certificate reference: {certReference}</span>
                            <Link
                              to="/verify"
                              search={{ id: certReference }}
                              className="inline-flex items-center gap-1 text-brand-red font-bold hover:underline"
                            >
                              <ShieldCheck className="h-3.5 w-3.5" />
                              <span>Verify on Official Registry ↗</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ── The Next Step: PECP Progression Banner ── */}
                    <PecpNextStepBanner trackId={currentTrackId} className="print:hidden mt-4 sm:mt-6" />
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
