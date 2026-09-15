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
  Search,
  Download,
  Printer,
  Copy,
  Stethoscope,
  Building2,
  Sparkles,
  GraduationCap,
  Briefcase,
  Code2,
  Users,
  Check,
  Layers,
  Brain,
  Linkedin,
} from "lucide-react";
import { toast } from "sonner";
import { getCertificates, claimCertificate, deleteCertificate } from "@/lib/api";
import { requireAdminRoute } from "@/lib/auth";
import { BrandSpinner } from "@/components/ui/BrandSpinner";
import { printOfficialCertificate } from "@/lib/certificate-print";
import { ShareOnLinkedInButton } from "@/components/ShareOnLinkedInButton";
import { shareCertificateOnLinkedIn } from "@/lib/linkedin-share";

export const Route = createFileRoute("/admin/certificates")({
  beforeLoad: requireAdminRoute,
  head: () => ({
    meta: [{ title: "Certificates Hub | Red Dot Admin" }],
  }),
  component: AdminCertificatesPage,
});

export type CertTrackKey =
  | "healthcare"
  | "finance"
  | "finance-advanced"
  | "foundations"
  | "education"
  | "management"
  | "agile-developers"
  | "agile-managers"
  | "pecp";

export interface CertTrackConfig {
  key: CertTrackKey;
  title: string;
  subtitle: string;
  moduleCount: number;
  badge: string;
  accentColor: string;
  borderAccent: string;
  modules: string[];
  descriptionTemplate: (name: string, school: string) => string;
}

export const CERT_TRACK_CONFIGS: Record<CertTrackKey, CertTrackConfig> = {
  healthcare: {
    key: "healthcare",
    title: "AI for Healthcare Professionals",
    subtitle: "Professional Certificate Programme · ~8 Hours",
    moduleCount: 9,
    badge: "Clinical Track",
    accentColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    borderAccent: "#B8892B",
    modules: [
      "AI in Healthcare: Foundations & Clinical Realities",
      "Data, Systems & the Clinical Record",
      "Diagnosis & Clinical Decision Support",
      "Real-World Deployments in Patient Care",
      "Generative AI in Healthcare",
      "Clinical Risk, Safety & Pitfalls",
      "Health Equity & Low-Resource Settings",
      "Governance, Ethics & Regulation",
      "Implementation, Change & Future Outlook",
    ],
    descriptionTemplate: (_name, _school) =>
      `has successfully completed all 9 modules and assessments of AI for Healthcare Professionals, an applied programme covering artificial intelligence in clinical diagnosis and decision support, real-world deployments in patient care, clinical risk and patient safety, health equity, and the governance of AI in health systems.`,
  },
  finance: {
    key: "finance",
    title: "AI for Financial Professionals",
    subtitle: "Professional Certificate Programme · ~8 Hours",
    moduleCount: 8,
    badge: "Banking Track",
    accentColor: "text-blue-700 bg-blue-50 border-blue-200",
    borderAccent: "#B8892B",
    modules: [
      "AI Landscape for Finance & Banking",
      "Data Infrastructure & Model Feasibility",
      "AI in Credit Risk & Underwriting",
      "AI in Fraud Detection & Financial Crime",
      "Generative AI in Financial Operations",
      "AI Risk Management & Model Governance",
      "Regulatory Frameworks & NRB Guidelines",
      "Strategy, Implementation & Future Outlook",
    ],
    descriptionTemplate: (_name, _school) =>
      `has successfully completed all eight modules and assessments of AI for Financial Professionals, an applied programme covering artificial intelligence in credit risk, financial crime, banking operations, AI risk management and governance aligned to the regulatory expectations of Nepal's financial sector.`,
  },
  "finance-advanced": {
    key: "finance-advanced",
    title: "Advanced AI for Finance Professionals",
    subtitle: "Executive Certificate Programme · Advanced Level 2",
    moduleCount: 12,
    badge: "Level 2 Track",
    accentColor: "text-purple-700 bg-purple-50 border-purple-200",
    borderAccent: "#B8892B",
    modules: [
      "From Practitioner to Architect: The Advanced Landscape",
      "The AI Capability Stack for Financial Institutions",
      "Advanced Model Risk Management & Validation",
      "Explainability in Regulated Environments (XAI)",
      "Foundation Models & the Modern AI Stack",
      "Agentic AI & Multi-Agent Systems in Finance",
      "Advanced Credit Risk, Capital & Stress Testing",
      "Financial Crime at Network Scale",
      "Target Operating Model & Enterprise Governance",
      "Systemic Risk, Macroprudential Policy & the Regulatory Frontier",
      "The Economics of AI: Value Realisation & Portfolio Management",
      "Leading Transformation in a Nepali Institution & Capstone Strategy",
    ],
    descriptionTemplate: (_name, _school) =>
      `has successfully completed all twelve advanced modules and assessments of Advanced AI for Finance Professionals, demonstrating mastery in enterprise AI capability architectures, advanced model risk validation, explainability frameworks, agentic workflow governance, and target operating models for financial institutions.`,
  },
  foundations: {
    key: "foundations",
    title: "AI Foundations: General AI Literacy",
    subtitle: "Foundation Certificate Programme · Open Curriculum",
    moduleCount: 5,
    badge: "AI Foundations",
    accentColor: "text-red-700 bg-red-50 border-red-200",
    borderAccent: "#B8892B",
    modules: [
      "Demystifying Artificial Intelligence",
      "Machine Learning vs Deep Learning vs GenAI",
      "Generative AI & Prompt Engineering Masterclass",
      "Ethical AI, Productivity & Future Careers",
      "Applied AI Capstone & Practical Assessment",
    ],
    descriptionTemplate: (_name, _school) =>
      `has successfully completed all modules and practical assessments of AI Foundations: General AI Literacy, an applied foundation programme covering machine learning paradigms, deep learning, generative AI, prompt engineering, and ethical AI stewardship.`,
  },
  education: {
    key: "education",
    title: "AI for Teachers and Educators",
    subtitle: "Professional Certificate Programme · 12 Modules",
    moduleCount: 12,
    badge: "Education Track",
    accentColor: "text-amber-700 bg-amber-50 border-amber-200",
    borderAccent: "#B8892B",
    modules: [
      "AI Foundations for Educators",
      "Prompt Engineering Masterclass",
      "Lesson Planning & Curriculum Design",
      "Assessment, Rubrics & Feedback",
      "Differentiated & Special Education",
      "AI for STEM Education",
      "AI for Humanities & Languages",
      "AI Literacy & Student Guidance",
      "Academic Integrity & Detection",
      "Administrative Productivity",
      "Ethics, Bias & Digital Safety",
      "Future-Ready Schools & Capstone",
    ],
    descriptionTemplate: (_name, _school) =>
      `has successfully completed all 12 modules and assessments of AI for Teachers and Educators, an applied professional programme covering prompt engineering pedagogy, automated lesson & curriculum design, rubrics and feedback, AI in STEM and Humanities, academic integrity frameworks, and ethical AI stewardship in learning institutions.`,
  },
  management: {
    key: "management",
    title: "AI for Management Professionals",
    subtitle: "Executive Certificate Programme · 12 Modules",
    moduleCount: 12,
    badge: "Management Track",
    accentColor: "text-indigo-700 bg-indigo-50 border-indigo-200",
    borderAccent: "#B8892B",
    modules: [
      "AI Foundations for Modern Managers",
      "The Modern AI Technology Stack",
      "Strategic Alignment & Opportunity Assessment",
      "Building the AI Business Case & ROI",
      "AI in Operations, Supply Chain & CX",
      "AI in Marketing, Sales & Growth",
      "AI in HR, People Analytics & Talent",
      "Data Governance, Quality & Architecture",
      "Enterprise AI Risk, Security & Compliance",
      "Managing AI Teams, Culture & Change",
      "Vendor Evaluation, Build vs. Buy & Pilots",
      "The Capstone AI Strategic Roadmap",
    ],
    descriptionTemplate: (_name, _school) =>
      `has successfully completed all 12 executive modules and assessments of AI for Management Professionals, demonstrating mastery in strategic AI alignment, business case and ROI modeling, operations & customer experience automation, data governance, vendor evaluation, and leading enterprise AI transformations.`,
  },
  "agile-developers": {
    key: "agile-developers",
    title: "Agile Methodologies for Software Developers",
    subtitle: "Professional Engineering Certificate Programme · ~8 Hours",
    moduleCount: 12,
    badge: "Developer Track",
    accentColor: "text-sky-700 bg-sky-50 border-sky-200",
    borderAccent: "#0284c7",
    modules: [
      "Why Agile Exists",
      "The Agile Manifesto in Plain Language",
      "Scrum: Roles, Events and Artefacts",
      "Your First Sprint",
      "User Stories and Definition of Done",
      "Estimation and Velocity",
      "Kanban and Flow",
      "Extreme Programming: The Technical Practices",
      "Testing and Test-Driven Development",
      "Continuous Integration and Delivery",
      "Code Review, Pairing and Working in a Team",
      "Retrospectives and Your First 90 Days",
    ],
    descriptionTemplate: (_name, _school) =>
      `has successfully completed all 12 modules and practical assessments of Agile Methodologies for Software Developers, demonstrating practical competence in iterative delivery, Scrum sprint events, user story refinement, estimation, Kanban flow, test-driven development, continuous integration, pair programming, and agile team retrospectives.`,
  },
  "agile-managers": {
    key: "agile-managers",
    title: "Agile Methodologies for Managers",
    subtitle: "Executive Certificate Programme in Agile Leadership · ~8 Hours",
    moduleCount: 12,
    badge: "Agile Leadership Track",
    accentColor: "text-teal-700 bg-teal-50 border-teal-200",
    borderAccent: "#0f766e",
    modules: [
      "What Agile Actually Is — and What It Is Not",
      "When Agile Works — and When It Does Not",
      "Choosing an Approach: Scrum, Kanban, XP and Hybrids",
      "The Manager's New Role",
      "Team Design, Structure and Dedication",
      "Planning, Estimation and Forecasting",
      "Funding, Budgeting and Contracts",
      "Metrics That Matter — and Metrics That Destroy",
      "Governance, Risk and Compliance",
      "Scaling: Frameworks, Trade-offs and Traps",
      "Leading the Change",
      "Your Adoption Plan",
    ],
    descriptionTemplate: (_name, _school) =>
      `has successfully completed all 12 modules and assessments of Agile Methodologies for Managers, an applied executive programme covering adaptive leadership, agile suitability and framework selection, team design and dedication, forecasting and estimation, value-driven procurement and budgeting, governance and compliance, scaling frameworks, and organizational adoption roadmaps.`,
  },
  pecp: {
    key: "pecp",
    title: "Professional Executive Certificate",
    subtitle: "PECP Executive Credential · Advanced Cohort",
    moduleCount: 6,
    badge: "Executive PECP",
    accentColor: "text-amber-700 bg-amber-50 border-amber-200",
    borderAccent: "#B8892B",
    modules: [
      "Strategic Technology Management",
      "Enterprise Systems & Cloud Integration",
      "Data Governance & Applied AI Leadership",
      "Professional Executive Capstone Project",
    ],
    descriptionTemplate: (_name, school) =>
      `has successfully completed the Professional Executive Certificate Program at ${school || "Red Dot Technologies in collaboration with USC Upstate"}, demonstrating strategic execution, modern technology adoption, and organizational leadership.`,
  },
};

function getInitials(name?: string) {
  if (!name) return "ST";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const AVATAR_COLORS = [
  "from-blue-600 to-indigo-700 text-white",
  "from-emerald-600 to-teal-700 text-white",
  "from-purple-600 to-indigo-700 text-white",
  "from-rose-600 to-red-700 text-white",
  "from-amber-600 to-orange-700 text-white",
  "from-sky-600 to-cyan-700 text-white",
];

function getAvatarColor(name?: string) {
  if (!name) return AVATAR_COLORS[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

function getTrackIcon(trackKey: CertTrackKey, className = "h-3.5 w-3.5") {
  switch (trackKey) {
    case "healthcare":
      return <Stethoscope className={className} />;
    case "finance":
      return <Building2 className={className} />;
    case "finance-advanced":
      return <Sparkles className={className} />;
    case "education":
      return <GraduationCap className={className} />;
    case "management":
      return <Briefcase className={className} />;
    case "agile-developers":
      return <Code2 className={className} />;
    case "agile-managers":
      return <Users className={className} />;
    case "foundations":
      return <Brain className={className} />;
    case "pecp":
      return <Award className={className} />;
    default:
      return <Award className={className} />;
  }
}

function AdminCertificatesPage() {
  const [certs, setCerts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState<any | null>(null);
  const [activePreviewTrack, setActivePreviewTrack] = useState<CertTrackKey>("foundations");
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [trackFilter, setTrackFilter] = useState<"all" | CertTrackKey>("all");
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(code);
    toast.success(`Copied certificate code: ${code}`);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const [newCertName, setNewCertName] = useState("");
  const [newCertEmail, setNewCertEmail] = useState("");
  const [newCertSchool, setNewCertSchool] = useState("");
  const [newCertTrack, setNewCertTrack] = useState<CertTrackKey>("foundations");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadCertificates = async () => {
    setIsLoading(true);
    try {
      const data = await getCertificates();
      if (Array.isArray(data)) {
        const formatted = data.map((c: any) => ({
          ...c,
          track: c.track || detectTrack(c),
        }));
        setCerts(formatted);
      } else {
        setCerts([]);
      }
    } catch {
      setCerts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  const detectTrack = (cert: any): CertTrackKey => {
    if (cert.track && CERT_TRACK_CONFIGS[cert.track as CertTrackKey]) {
      return cert.track as CertTrackKey;
    }
    const txt =
      `${cert.course_name || ""} ${cert.school || ""} ${cert.certificate_id || ""} ${cert.code || ""}`.toLowerCase();
    if (
      txt.includes("advanced") ||
      txt.includes("aifa") ||
      txt.includes("level 2") ||
      txt.includes("level-2") ||
      txt.includes("level 02") ||
      txt.includes("architect") ||
      txt.includes("finance-advanced")
    )
      return "finance-advanced";
    if (
      txt.includes("health") ||
      txt.includes("aihp") ||
      txt.includes("clinical") ||
      txt.includes("hospital") ||
      txt.includes("doctor") ||
      txt.includes("nurse") ||
      txt.includes("medical")
    )
      return "healthcare";
    if (
      txt.includes("finance") ||
      txt.includes("aifp") ||
      txt.includes("bank") ||
      txt.includes("banking") ||
      txt.includes("fintech") ||
      txt.includes("credit")
    )
      return "finance";
    if (
      txt.includes("teacher") ||
      txt.includes("educat") ||
      txt.includes("aied") ||
      txt.includes("classroom")
    )
      return "education";
    if (
      txt.includes("agile-dev") ||
      txt.includes("agsd") ||
      txt.includes("software developer") ||
      (txt.includes("agile") && (txt.includes("developer") || txt.includes("software")))
    )
      return "agile-developers";
    if (
      txt.includes("agile-man") ||
      txt.includes("agmg") ||
      (txt.includes("agile") && (txt.includes("manage") || txt.includes("leader")))
    )
      return "agile-managers";
    if (
      txt.includes("manage") ||
      txt.includes("leadership") ||
      txt.includes("aimp") ||
      txt.includes("strategy") ||
      txt.includes("operations")
    )
      return "management";
    if (txt.includes("pecp") || txt.includes("executive")) return "pecp";
    return "foundations";
  };

  const filteredCerts = useMemo(() => {
    return certs.filter((cert) => {
      const cTrack = detectTrack(cert);
      if (trackFilter !== "all" && cTrack !== trackFilter) return false;
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        (cert.name && cert.name.toLowerCase().includes(q)) ||
        (cert.email && cert.email.toLowerCase().includes(q)) ||
        (cert.school && cert.school.toLowerCase().includes(q)) ||
        (cert.course_name && cert.course_name.toLowerCase().includes(q)) ||
        (cert.certificate_id && cert.certificate_id.toLowerCase().includes(q)) ||
        (cert.code && cert.code.toLowerCase().includes(q))
      );
    });
  }, [certs, searchQuery, trackFilter]);

  const trackCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    certs.forEach((c) => {
      const t = detectTrack(c);
      counts[t] = (counts[t] || 0) + 1;
    });
    return counts;
  }, [certs]);

  const uniqueInstitutionsCount = useMemo(() => {
    const set = new Set(
      certs
        .map((c) => (c.school || c.organization || "").trim())
        .filter(Boolean)
    );
    return Math.max(set.size, certs.length > 0 ? 1 : 0);
  }, [certs]);

  const topTrackKey = useMemo(() => {
    let topKey: CertTrackKey = "foundations";
    let max = -1;
    for (const [k, v] of Object.entries(trackCounts)) {
      if (v > max) {
        max = v;
        topKey = k as CertTrackKey;
      }
    }
    return topKey;
  }, [trackCounts]);

  const handleOpenPreview = (cert: any) => {
    const detected = detectTrack(cert);
    setActivePreviewTrack(detected);
    setSelectedCert(cert);
  };

  const handleIssueCert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertName.trim() || !newCertEmail.trim()) {
      toast.error("Student Name and Email are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const trackPrefix =
        newCertTrack === "healthcare"
          ? "RDT-AIHP"
          : newCertTrack === "finance-advanced"
            ? "RDT-AIFA"
            : newCertTrack === "finance"
              ? "RDT-AIFP"
              : newCertTrack === "education"
                ? "RDT-AIED"
                : newCertTrack === "management"
                  ? "RDT-AIMP"
                  : newCertTrack === "agile-developers"
                    ? "RDT-AGSD"
                    : newCertTrack === "agile-managers"
                      ? "RDT-AGMG"
                      : newCertTrack === "foundations"
                        ? "RDT-AIFOUND"
                        : "RDT-PECP";

      const certCode = `${trackPrefix}-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

      const res = await claimCertificate({
        name: newCertName.trim(),
        email: newCertEmail.trim(),
        school: newCertSchool.trim() || "Red Dot Technologies",
        track: newCertTrack,
        course_name: CERT_TRACK_CONFIGS[newCertTrack]?.title || "Certificate Programme",
        certificate_id: certCode,
        organization: newCertSchool.trim() || "Red Dot Technologies",
      });

      const newRecord = {
        id: res?.id || Date.now(),
        name: newCertName.trim(),
        email: newCertEmail.trim(),
        school: newCertSchool.trim() || "Red Dot Technologies",
        track: newCertTrack,
        certificate_id: certCode,
        created_at: new Date().toISOString().split("T")[0],
      };

      setCerts([newRecord, ...certs]);
      toast.success(`✓ Official Certificate issued for ${newCertName}!`);
      setShowIssueModal(false);
      setNewCertName("");
      setNewCertEmail("");
      setNewCertSchool("");
    } catch (err) {
      toast.error("Failed to issue certificate in database.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number | string) => {
    if (confirm("Delete this certificate record from database?")) {
      try {
        await deleteCertificate(id);
        setCerts((prev) => prev.filter((c) => String(c.id) !== String(id)));
        toast.success("Certificate record removed.");
      } catch (err) {
        setCerts((prev) => prev.filter((c) => String(c.id) !== String(id)));
        toast.info("Certificate record removed from view.");
      }
    }
  };

  const handleExportCSV = () => {
    if (certs.length === 0) {
      toast.error("No certificate data to export.");
      return;
    }
    const headers = [
      "ID",
      "Student Name",
      "Email",
      "Institution",
      "Course Track",
      "Certificate Code",
      "Issued Date",
    ];
    const rows = certs.map((c) => [
      c.id,
      `"${c.name || ""}"`,
      `"${c.email || ""}"`,
      `"${c.school || ""}"`,
      `"${detectTrack(c)}"`,
      `"${c.certificate_id || c.code || ""}"`,
      `"${c.created_at || ""}"`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `reddot_certificates_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Certificate registry exported as CSV!");
  };

  const formatDisplayDate = (d?: string) => {
    if (!d)
      return new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    try {
      const parsed = new Date(d);
      if (isNaN(parsed.getTime())) return d;
      return parsed.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    } catch {
      return d;
    }
  };

  const handlePrintCertificate = () => {
    if (!selectedCert) return;
    const certTrack = detectTrack(selectedCert);
    printOfficialCertificate({
      name: selectedCert.name,
      certificateId:
        selectedCert.certificate_id ||
        selectedCert.code ||
        `RDT-${certTrack.toUpperCase()}-${selectedCert.id}`,
      track: certTrack,
      courseName: selectedCert.course_name,
      organization: selectedCert.school || selectedCert.organization,
      role: selectedCert.role,
      department: selectedCert.department,
      completedAt: selectedCert.completed_at,
      issuedAt: selectedCert.created_at,
    });
  };

  const previewTrackConfig =
    CERT_TRACK_CONFIGS[activePreviewTrack] || CERT_TRACK_CONFIGS.foundations;

  return (
    <AdminLayout
      title="Certificates Registry"
      mobileTitle="Certificates"
      subtitle="Issue, preview in all 8 AI & Applied course tracks + PECP format, and download official credentials."
      actions={
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1 sm:gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-[11px] sm:text-xs px-2.5 sm:px-3.5 py-1.5 sm:py-2 shadow-2xs transition-colors cursor-pointer shrink-0"
            title="Export CSV"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span className="hidden sm:inline">Export CSV</span>
            <span className="inline sm:hidden">CSV</span>
          </button>
          <button
            onClick={() => setShowIssueModal(true)}
            className="inline-flex items-center gap-1 sm:gap-1.5 rounded-xl bg-brand-red hover:bg-red-700 text-white font-bold text-[11px] sm:text-xs px-2.5 sm:px-4 py-1.5 sm:py-2 shadow-2xs transition-colors cursor-pointer shrink-0"
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Issue Certificate</span>
            <span className="inline sm:hidden">Issue</span>
          </button>
        </div>
      }
    >
      <div className="space-y-4 sm:space-y-6">
        {/* ── 1. Executive KPI Cards (2x2 Grid on Mobile, 4 Columns on Desktop) ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          {/* Card 1: Total Credentials */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
            <div className="flex items-start justify-between gap-1.5">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 block leading-snug">
                Total Credentials
              </span>
              <div className="h-7 w-7 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-red-50 text-brand-red flex items-center justify-center font-bold shrink-0 border border-red-100">
                <Award className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
              </div>
            </div>
            <div className="mt-1.5 sm:mt-3">
              <div className="text-xl sm:text-3xl font-black text-slate-900 leading-tight">
                {isLoading ? "—" : certs.length}
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-snug mt-0.5">
                Verified credentials
              </p>
            </div>
          </div>

          {/* Card 2: Curriculum Tracks */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
            <div className="flex items-start justify-between gap-1.5">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 block leading-snug">
                Curriculum
              </span>
              <div className="h-7 w-7 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold shrink-0 border border-indigo-100">
                <Layers className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
              </div>
            </div>
            <div className="mt-1.5 sm:mt-3">
              <div className="text-xl sm:text-3xl font-black text-slate-900 leading-tight">
                9 Tracks
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-snug mt-0.5">
                8 AI + 1 Executive
              </p>
            </div>
          </div>

          {/* Card 3: Partner Organizations */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
            <div className="flex items-start justify-between gap-1.5">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 block leading-snug">
                Organizations
              </span>
              <div className="h-7 w-7 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0 border border-emerald-100">
                <Building2 className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
              </div>
            </div>
            <div className="mt-1.5 sm:mt-3">
              <div className="text-xl sm:text-3xl font-black text-slate-900 leading-tight">
                {isLoading ? "—" : uniqueInstitutionsCount}
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-snug mt-0.5">
                Institutions &amp; partners
              </p>
            </div>
          </div>

          {/* Card 4: Top Track */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
            <div className="flex items-start justify-between gap-1.5">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 block leading-snug">
                Top Track
              </span>
              <div className="h-7 w-7 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold shrink-0 border border-amber-100">
                <Sparkles className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
              </div>
            </div>
            <div className="mt-1.5 sm:mt-3">
              <div
                className="text-base sm:text-xl font-black text-slate-900 truncate leading-tight"
                title={CERT_TRACK_CONFIGS[topTrackKey]?.title}
              >
                {CERT_TRACK_CONFIGS[topTrackKey]?.badge || "AI Foundations"}
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium truncate mt-0.5">
                {trackCounts[topTrackKey] || 0} issued
              </p>
            </div>
          </div>
        </div>

        {/* ── 2. Track Segmented Switcher Tabs ── */}
        <div className="bg-white rounded-2xl p-1.5 sm:p-2 border border-slate-200/90 shadow-2xs">
          <div
            data-lenis-prevent
            className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 px-0.5 custom-scrollbar overscroll-x-contain touch-pan-x"
          >
            <button
              onClick={() => setTrackFilter("all")}
              className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer select-none ${
                trackFilter === "all"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Layers className="h-3.5 w-3.5 shrink-0" />
              <span>All Tracks</span>
              <span
                className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                  trackFilter === "all"
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {certs.length}
              </span>
            </button>

            <div className="h-5 w-px bg-slate-200 shrink-0 mx-0.5 sm:mx-1" />

            {(
              [
                "healthcare",
                "finance",
                "finance-advanced",
                "education",
                "management",
                "agile-developers",
                "agile-managers",
                "foundations",
                "pecp",
              ] as CertTrackKey[]
            ).map((tKey) => {
              const cfg = CERT_TRACK_CONFIGS[tKey];
              const count = trackCounts[tKey] || 0;
              const isSelected = trackFilter === tKey;
              return (
                <button
                  key={tKey}
                  onClick={() => setTrackFilter(isSelected ? "all" : tKey)}
                  className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer select-none ${
                    isSelected
                      ? "bg-brand-red text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {getTrackIcon(
                    tKey,
                    isSelected ? "h-3.5 w-3.5 text-white shrink-0" : "h-3.5 w-3.5 text-slate-500 shrink-0",
                  )}
                  <span className="whitespace-nowrap">{cfg.badge}</span>
                  <span
                    className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-white/25 text-white"
                        : count > 0
                          ? "bg-slate-200 text-slate-800"
                          : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 3. Search & Filter Toolbar ── */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidates, tracks, institutions, IDs..."
              className="w-full rounded-xl border border-slate-200 pl-9 pr-8 py-2 text-sm sm:text-xs font-semibold text-slate-800 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer rounded-full hover:bg-slate-100"
                title="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 justify-between sm:justify-end text-xs">
            <span className="text-slate-500 font-medium text-[11px] sm:text-xs">
              Showing <b className="text-slate-900 font-extrabold">{filteredCerts.length}</b> of{" "}
              <b className="text-slate-900 font-extrabold">{certs.length}</b>
            </span>

            {(trackFilter !== "all" || searchQuery) && (
              <button
                onClick={() => {
                  setTrackFilter("all");
                  setSearchQuery("");
                }}
                className="text-[11px] font-bold text-brand-red hover:underline ml-2 cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* ── 4. Polished Registry Table & Mobile Card View ── */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
          {/* Mobile Card List View (< md) */}
          <div className="block md:hidden divide-y divide-slate-100">
            {isLoading ? (
              <div className="p-10 text-center flex items-center justify-center">
                <BrandSpinner size="sm" message="Loading certificates..." />
              </div>
            ) : filteredCerts.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 space-y-2">
                <p>No certificate records found matching your filters.</p>
                {(trackFilter !== "all" || searchQuery) && (
                  <button
                    onClick={() => {
                      setTrackFilter("all");
                      setSearchQuery("");
                    }}
                    className="inline-flex items-center gap-1 text-xs text-brand-red font-bold hover:underline cursor-pointer"
                  >
                    View all certificates ({certs.length})
                  </button>
                )}
              </div>
            ) : (
              filteredCerts.map((cert) => {
                const cTrack = detectTrack(cert);
                const cfg = CERT_TRACK_CONFIGS[cTrack];
                const certCode =
                  cert.certificate_id || cert.code || `RDT-${cTrack.toUpperCase()}-${cert.id}`;

                return (
                  <div key={cert.id} className="p-3.5 space-y-2.5 bg-white">
                    {/* Candidate Identity Row */}
                    <div className="flex items-start justify-between gap-2.5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`h-9 w-9 rounded-full bg-gradient-to-br ${getAvatarColor(cert.name)} flex items-center justify-center font-black text-xs shrink-0 shadow-2xs`}
                        >
                          {getInitials(cert.name)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                            {cert.name}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate">
                            {cert.email || "—"}
                          </div>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Verified
                      </span>
                    </div>

                    {/* Track Badge & Organization */}
                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-black ${cfg.accentColor} shrink-0`}
                      >
                        {getTrackIcon(cTrack, "h-2.5 w-2.5 shrink-0")}
                        <span className="truncate max-w-[140px]">{cfg.badge}</span>
                      </span>
                      <div className="text-[10px] text-slate-500 truncate flex items-center gap-1 min-w-0">
                        <Building2 className="h-3 w-3 text-slate-400 shrink-0" />
                        <span className="truncate">{cert.school || cert.organization || "Red Dot"}</span>
                      </div>
                    </div>

                    {/* Certificate Code & Action Buttons */}
                    <div className="flex items-center justify-between gap-1.5 pt-2 border-t border-slate-100 text-[11px]">
                      <div className="flex items-center gap-1 min-w-0">
                        <button
                          onClick={() => handleCopyCode(certCode)}
                          className="inline-flex items-center gap-1 font-mono font-bold text-slate-800 text-[10px] bg-slate-50 hover:bg-slate-100 active:scale-95 px-1.5 py-1 rounded border border-slate-200 transition-all cursor-pointer min-w-0"
                          title="Copy certificate ID"
                        >
                          <span className="truncate max-w-[110px] xs:max-w-[150px]">{certCode}</span>
                          {copiedCodeId === certCode ? (
                            <Check className="h-3 w-3 text-emerald-600 stroke-[3] shrink-0" />
                          ) : (
                            <Copy className="h-3 w-3 text-slate-400 shrink-0" />
                          )}
                        </button>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleOpenPreview(cert)}
                          className="rounded-lg bg-slate-900 hover:bg-brand-red text-white font-bold text-[10px] px-2 py-1.5 transition-colors cursor-pointer inline-flex items-center gap-1 shadow-2xs"
                        >
                          <Eye className="h-3 w-3" />
                          <span>Preview</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedCert(cert);
                            printOfficialCertificate({
                              name: cert.name,
                              certificateId: certCode,
                              track: cTrack,
                              courseName: cert.course_name,
                              organization: cert.school || cert.organization,
                              role: cert.role,
                              department: cert.department,
                              completedAt: cert.completed_at,
                              issuedAt: cert.created_at,
                            });
                          }}
                          className="rounded-lg border border-slate-200 hover:bg-slate-100 p-1.5 text-slate-600 transition-colors cursor-pointer"
                          title="Direct Print PDF"
                        >
                          <Printer className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            const success = shareCertificateOnLinkedIn({
                              certificateTitle: cert.course_name,
                              certificateId: certCode,
                              recipientName: cert.name,
                            });
                            if (!success) {
                              toast.error("Certificate link is unavailable to share.");
                            } else {
                              toast.success("Opening LinkedIn share dialog in a new tab...");
                            }
                          }}
                          className="rounded-lg border border-slate-200 hover:border-[#0A66C2] hover:bg-blue-50 p-1.5 text-slate-600 hover:text-[#0A66C2] transition-colors cursor-pointer"
                          title="Share on LinkedIn"
                        >
                          <Linkedin className="h-3.5 w-3.5 fill-current" />
                        </button>
                        <button
                          onClick={() => handleDelete(cert.id)}
                          className="rounded-lg p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete record"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Desktop Table (Visible on md and above) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50/80 text-[10px] font-black uppercase tracking-wider text-slate-500 border-b border-slate-200/80">
                <tr>
                  <th className="px-5 py-3.5">Candidate / Scholar</th>
                  <th className="px-4 py-3.5">Affiliation / Institution</th>
                  <th className="px-4 py-3.5">Course Track</th>
                  <th className="px-4 py-3.5">Certificate ID</th>
                  <th className="px-4 py-3.5">Issued Date</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center">
                      <div className="flex items-center justify-center">
                        <BrandSpinner size="sm" message="Loading certificates from database..." />
                      </div>
                    </td>
                  </tr>
                ) : filteredCerts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-16 text-center text-slate-400 font-medium space-y-2"
                    >
                      <div className="max-w-sm mx-auto space-y-2.5">
                        <div className="h-11 w-11 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                          <Award className="h-5 w-5" />
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm">No certificates found</h4>
                        <p className="text-xs text-slate-500">
                          {searchQuery || trackFilter !== "all"
                            ? "Try adjusting your search query or selected track filter."
                            : "No certificates have been issued yet."}
                        </p>
                        {(searchQuery || trackFilter !== "all") && (
                          <button
                            onClick={() => {
                              setTrackFilter("all");
                              setSearchQuery("");
                            }}
                            className="inline-flex items-center gap-1 text-xs text-brand-red font-bold hover:underline cursor-pointer pt-1"
                          >
                            Reset filters
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredCerts.map((cert) => {
                    const cTrack = detectTrack(cert);
                    const cfg = CERT_TRACK_CONFIGS[cTrack];
                    const certCode =
                      cert.certificate_id || cert.code || `RDT-${cTrack.toUpperCase()}-${cert.id}`;

                    return (
                      <tr key={cert.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div
                              className={`h-8 w-8 rounded-full bg-gradient-to-br ${getAvatarColor(cert.name)} flex items-center justify-center font-black text-[11px] shrink-0 shadow-2xs`}
                            >
                              {getInitials(cert.name)}
                            </div>
                            <div className="min-w-0">
                              <div className="font-bold text-slate-900 text-xs truncate">
                                {cert.name}
                              </div>
                              <div className="text-[11px] text-slate-500 truncate">
                                {cert.email || "—"}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3.5 text-xs text-slate-700 font-medium">
                          <div className="flex items-center gap-1.5 max-w-[190px]">
                            <Building2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                            <span className="truncate" title={cert.school || cert.organization || "Red Dot Technologies"}>
                              {cert.school || cert.organization || "Red Dot Technologies"}
                            </span>
                          </div>
                        </td>

                        <td className="px-4 py-3.5">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold ${cfg.accentColor}`}
                          >
                            {getTrackIcon(cTrack, "h-3 w-3 shrink-0")}
                            <span className="truncate max-w-[210px]" title={cfg.title}>
                              {cfg.title}
                            </span>
                          </span>
                        </td>

                        <td className="px-4 py-3.5 font-mono text-[11px] font-bold text-slate-900">
                          <div className="inline-flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
                            <span>{certCode}</span>
                            <button
                              onClick={() => handleCopyCode(certCode)}
                              className="text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer transition-colors"
                              title="Copy certificate ID"
                            >
                              {copiedCodeId === certCode ? (
                                <Check className="h-3 w-3 text-emerald-600 stroke-[3]" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </button>
                          </div>
                        </td>

                        <td className="px-4 py-3.5 text-[11px] text-slate-600 font-medium whitespace-nowrap">
                          {formatDisplayDate(cert.created_at)}
                        </td>

                        <td className="px-4 py-3.5">
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Verified
                          </span>
                        </td>

                        <td className="px-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenPreview(cert)}
                              className="rounded-lg bg-slate-900 hover:bg-brand-red text-white font-bold text-[11px] px-2.5 py-1.5 shadow-2xs transition-colors cursor-pointer inline-flex items-center gap-1"
                              title="Preview certificate parchment"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>Preview</span>
                            </button>

                            <button
                              onClick={() => {
                                setSelectedCert(cert);
                                printOfficialCertificate({
                                  name: cert.name,
                                  certificateId: certCode,
                                  track: cTrack,
                                  courseName: cert.course_name,
                                  organization: cert.school || cert.organization,
                                  role: cert.role,
                                  department: cert.department,
                                  completedAt: cert.completed_at,
                                  issuedAt: cert.created_at,
                                });
                              }}
                              className="rounded-lg border border-slate-200 hover:bg-slate-100 p-1.5 text-slate-600 transition-colors cursor-pointer"
                              title="Direct Print Official PDF"
                            >
                              <Printer className="h-3.5 w-3.5" />
                            </button>

                            <button
                              onClick={() => handleDelete(cert.id)}
                              className="rounded-lg p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
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
        </div>
      </div>

      {showIssueModal && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-3 sm:p-4 backdrop-blur-xs overflow-y-auto"
        >
          <div className="relative w-full max-w-lg rounded-2xl sm:rounded-3xl bg-white shadow-2xl overflow-hidden border border-slate-200 animate-fade-in-up max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between px-4 py-3.5 sm:px-6 sm:py-5 border-b border-slate-100 bg-slate-50/70 shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl bg-red-50 text-brand-red flex items-center justify-center font-bold shadow-2xs shrink-0">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    Issue Official Certificate
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500">
                    Record a verified course completion credential.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowIssueModal(false)}
                className="rounded-full bg-slate-200/70 p-1.5 text-slate-600 hover:bg-slate-300 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form
              onSubmit={handleIssueCert}
              className="p-4 sm:p-6 space-y-3.5 sm:space-y-4 text-xs font-semibold text-slate-700 overflow-y-auto flex-1"
            >
              <div>
                <label className="block mb-1 text-slate-900 font-bold">Candidate Full Name *</label>
                <input
                  type="text"
                  required
                  value={newCertName}
                  onChange={(e) => setNewCertName(e.target.value)}
                  placeholder="e.g. Dr. Aarav Shrestha"
                  className="w-full rounded-xl border border-slate-300 p-2.5 sm:p-2.5 text-sm sm:text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-900 font-bold">Candidate Email *</label>
                <input
                  type="email"
                  required
                  value={newCertEmail}
                  onChange={(e) => setNewCertEmail(e.target.value)}
                  placeholder="aarav@hospital.org.np"
                  className="w-full rounded-xl border border-slate-300 p-2.5 sm:p-2.5 text-sm sm:text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-900 font-bold">
                  Institution / Hospital / Bank
                </label>
                <input
                  type="text"
                  value={newCertSchool}
                  onChange={(e) => setNewCertSchool(e.target.value)}
                  placeholder="e.g. Bir Hospital / Nabil Bank / TU"
                  className="w-full rounded-xl border border-slate-300 p-2.5 sm:p-2.5 text-sm sm:text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-900 font-bold">Select Course Track *</label>
                <select
                  value={newCertTrack}
                  onChange={(e) => setNewCertTrack(e.target.value as CertTrackKey)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 sm:p-2.5 text-sm sm:text-xs font-bold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none cursor-pointer"
                >
                  <option value="agile-developers">
                    Agile Methodologies for Software Developers (12 Modules)
                  </option>
                  <option value="agile-managers">
                    Agile Methodologies for Managers (12 Modules)
                  </option>
                  <option value="healthcare">AI for Healthcare Professionals (9 Modules)</option>
                  <option value="finance">
                    AI for Financial Professionals (Level 1 · 8 Modules)
                  </option>
                  <option value="finance-advanced">
                    Advanced AI for Finance Professionals (Level 2 · 12 Modules)
                  </option>
                  <option value="education">
                    AI for Teachers and Educators (12 Modules)
                  </option>
                  <option value="management">
                    AI for Management Professionals (12 Modules)
                  </option>
                  <option value="foundations">AI Unlocked — AI Foundations (5 Modules)</option>
                  <option value="pecp">PECP — Professional Executive Certificate Program</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 sm:gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowIssueModal(false)}
                  className="flex-1 sm:flex-none rounded-xl border border-slate-300 px-4 sm:px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none rounded-xl bg-brand-red hover:bg-red-700 text-white font-extrabold text-xs px-4 sm:px-6 py-2.5 shadow-md disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? "Issuing..." : "Issue Official Certificate"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedCert && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-2 sm:p-4 backdrop-blur-xs overflow-y-auto"
        >
          <div className="relative w-full max-w-4xl rounded-2xl sm:rounded-3xl bg-white shadow-2xl border border-slate-200 p-3 sm:p-8 space-y-3 sm:space-y-6 my-1 sm:my-8 max-h-[95vh] overflow-y-auto animate-fade-in-up">
            <div className="flex items-center justify-between gap-2 sm:gap-4 border-b border-slate-100 pb-2.5 sm:pb-4">
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600 shrink-0" />
                <div className="min-w-0">
                  <h3 className="font-extrabold text-slate-900 text-xs sm:text-base truncate">
                    Official Certificate Verification
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium truncate">
                    Verified Digital Credential · Red Dot Technologies
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  onClick={handlePrintCertificate}
                  className="inline-flex items-center gap-1 sm:gap-1.5 rounded-xl bg-slate-900 hover:bg-brand-red text-white text-[11px] sm:text-xs font-bold px-2.5 sm:px-4 py-1.5 sm:py-2 shadow-2xs transition-colors cursor-pointer"
                  title="Print or Save Certificate as High-Res PDF"
                >
                  <Printer className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Download / Print PDF</span>
                  <span className="inline sm:hidden">Print PDF</span>
                </button>

                <button
                  onClick={() => setSelectedCert(null)}
                  className="rounded-full bg-slate-100 p-1.5 sm:p-2 text-slate-500 hover:bg-slate-200 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Track Switcher Bar in Preview Modal */}
            <div
              data-lenis-prevent
              className="flex items-center gap-1.5 overflow-x-auto pb-1.5 border-b border-slate-100 custom-scrollbar touch-pan-x"
            >
              <span className="text-[10px] font-bold uppercase text-slate-400 mr-1 shrink-0">
                Preview Track:
              </span>
              {(
                [
                  "healthcare",
                  "finance",
                  "finance-advanced",
                  "education",
                  "management",
                  "agile-developers",
                  "agile-managers",
                  "foundations",
                  "pecp",
                ] as CertTrackKey[]
              ).map((k) => (
                <button
                  key={k}
                  onClick={() => setActivePreviewTrack(k)}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors cursor-pointer shrink-0 whitespace-nowrap ${
                    activePreviewTrack === k
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {CERT_TRACK_CONFIGS[k].badge}
                </button>
              ))}
            </div>

            <div
              id="admin-certificate-parchment"
              className="relative mx-auto w-full max-w-[860px] bg-white border-2 border-[#0F1E3D] p-0 shadow-[0_10px_34px_rgba(15,30,61,0.13)] overflow-hidden"
            >
              <div className="border border-[#B8892B] m-1 sm:m-2.5 p-3 sm:p-10 text-center relative bg-white">
                <img
                  src="/logo.png"
                  alt="Red Dot Technologies"
                  className="h-8 sm:h-12 w-auto mx-auto mb-2 sm:mb-4 object-contain"
                />
                <div className="text-[9px] sm:text-[11px] font-extrabold uppercase tracking-[2.5px] sm:tracking-[4.5px] text-[#B8892B]">
                  Certificate of Completion
                </div>
                <h2
                  className="text-lg sm:text-[28px] text-[#0F1E3D] my-1.5 sm:my-2 leading-tight tracking-tight font-serif font-medium"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  {previewTrackConfig.title}
                </h2>
                <div className="text-[#C8102E] font-bold text-[9.5px] sm:text-[11.5px] uppercase tracking-[1.2px] sm:tracking-[1.6px]">
                  {previewTrackConfig.subtitle}
                </div>

                <div className="text-[#6B7C96] text-[11px] sm:text-[13px] italic mt-3 sm:mt-5 mb-1">
                  This is to certify that
                </div>

                <div
                  className="text-lg sm:text-[28px] font-medium text-[#1B3566] border-b border-slate-300 inline-block px-4 sm:px-10 pb-1 mb-1 font-serif max-w-full truncate"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {selectedCert.name || "Candidate Name"}
                </div>

                {selectedCert.school && (
                  <div className="text-[11px] sm:text-[13.5px] text-[#6B7C96] mb-2.5 sm:mb-4 font-medium truncate">
                    {selectedCert.school}
                  </div>
                )}

                <div className="max-w-[620px] mx-auto text-[#1A233A] text-[11px] sm:text-[13.5px] leading-relaxed">
                  {previewTrackConfig.descriptionTemplate(
                    selectedCert.name,
                    selectedCert.school || "Red Dot Technologies",
                  )}
                </div>

                {/* Module badges */}
                <div className="flex flex-wrap gap-1 sm:gap-1.5 justify-center mt-3 sm:mt-5 mb-2 max-w-[660px] mx-auto">
                  {previewTrackConfig.modules.map((m, idx) => (
                    <span
                      key={idx}
                      className="text-[8.5px] sm:text-[10.5px] bg-[#F1F4F9] text-[#1B3566] px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-xs font-semibold"
                    >
                      {m}
                    </span>
                  ))}
                </div>

                {/* Authority Signature & Date Row (Side-by-side on all screens) */}
                <div className="flex flex-row justify-between items-end mt-4 sm:mt-7 text-xs text-[#6B7C96] gap-2 sm:gap-4 pt-2">
                  <div className="text-left flex-1 min-w-0">
                    <div className="border-t border-[#0F1E3D] pt-1">
                      <b className="text-[#0F1E3D] text-[10px] sm:text-[13px] block truncate">
                        Red Dot Technologies
                      </b>
                      <span className="text-[8.5px] sm:text-[11px] text-[#6B7C96] block truncate">
                        Baluwatar, Kathmandu
                      </span>
                    </div>
                  </div>

                  <div className="text-right flex-1 min-w-0">
                    <div className="pt-1">
                      <b className="text-[#0F1E3D] text-[10px] sm:text-[13px] block truncate">
                        {formatDisplayDate(selectedCert.created_at || selectedCert.completed_at)}
                      </b>
                      <span className="text-[8.5px] sm:text-[11px] text-[#6B7C96] block truncate">
                        Date of completion
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 sm:mt-4 text-[8.5px] sm:text-[10.5px] text-[#6B7C96] tracking-[0.5px] sm:tracking-[0.8px] font-mono truncate">
                  Certificate reference:{" "}
                  {selectedCert.certificate_id ||
                    selectedCert.code ||
                    `RDT-${activePreviewTrack.toUpperCase()}-${selectedCert.id}`}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 pt-1 sm:pt-2">
              <div className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">
                Recipient:{" "}
                <strong className="text-slate-800">
                  {selectedCert.email || selectedCert.name}
                </strong>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <ShareOnLinkedInButton
                  variant="secondary"
                  certificateTitle={selectedCert.course_name}
                  certificateId={
                    selectedCert.certificate_id ||
                    selectedCert.code ||
                    `RDT-${detectTrack(selectedCert).toUpperCase()}-${selectedCert.id}`
                  }
                  recipientName={selectedCert.name}
                  issueDate={selectedCert.created_at || selectedCert.completed_at}
                  label="Share on LinkedIn"
                  className="flex-1 sm:flex-none justify-center px-3.5 sm:px-4 py-2.5"
                />
                <button
                  onClick={handlePrintCertificate}
                  className="flex-1 sm:flex-none justify-center rounded-xl bg-brand-red hover:bg-red-700 text-white font-bold text-xs px-4 sm:px-5 py-2.5 shadow-2xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Printer className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>Print PDF</span>
                </button>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="flex-1 sm:flex-none justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 sm:px-5 py-2.5 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
