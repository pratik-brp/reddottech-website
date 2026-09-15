import { useState, useEffect, useRef, useCallback } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Search,
  AlertCircle,
  Copy,
  Check,
  Share2,
  Award,
  Building2,
  GraduationCap,
  Calendar,
  User,
  ArrowRight,
  ExternalLink,
  Lock,
  QrCode,
  Printer,
} from "lucide-react";
import { verifyCertificate } from "@/lib/api";
import { BrandSpinner } from "@/components/ui/BrandSpinner";
import { ScrollReveal } from "@/components/ScrollReveal";
import { printOfficialCertificate } from "@/lib/certificate-print";
import { ShareOnLinkedInButton } from "@/components/ShareOnLinkedInButton";
import { getCertificateShareUrl } from "@/lib/linkedin-share";

interface VerifySearch {
  id?: string;
  code?: string;
  q?: string;
}

export const Route = createFileRoute("/verify")({
  validateSearch: (search: Record<string, unknown>): VerifySearch => ({
    id: typeof search.id === "string" ? search.id : undefined,
    code: typeof search.code === "string" ? search.code : undefined,
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  loaderDeps: ({ search: { id, code, q } }) => ({ id, code, q }),
  loader: async ({ deps }) => {
    const query = (deps.id || deps.code || deps.q || "").trim();
    if (!query) return { cert: null };
    try {
      const res = await verifyCertificate(query);
      return { cert: res || null };
    } catch {
      return { cert: null };
    }
  },
  head: ({ loaderData }) => {
    const cert = loaderData?.cert;
    const title = cert?.courseName
      ? `Certificate of Completion: ${cert.courseName} | Red Dot Technologies`
      : "Official Certificate Verification Portal | Red Dot Technologies";
    const recipient = cert?.name ? `awarded to ${cert.name}` : "issued by Red Dot Technologies";
    const certId = cert?.certificateId ? ` (Ref: ${cert.certificateId})` : "";
    const desc = `Officially verified digital credential ${recipient}${certId} in academic collaboration with University of South Carolina Upstate (USA).`;
    const image = "https://reddottech.com.np/certificate-og-banner.jpg";
    const canonical = cert?.certificateId
      ? `https://reddottech.com.np/verify?id=${encodeURIComponent(cert.certificateId)}`
      : "https://reddottech.com.np/verify";

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:site_name", content: "Red Dot Technologies" },
        { property: "og:type", content: "article" },
        { property: "og:url", content: canonical },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:image", content: image },
        { property: "og:image:secure_url", content: image },
        { property: "og:image:type", content: "image/jpeg" },
        { property: "og:image:width", content: "1280" },
        { property: "og:image:height", content: "720" },
        { property: "og:image:alt", content: `Certificate of Completion - ${cert?.courseName || "Red Dot Technologies"}` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: canonical }],
    };
  },
  component: CertificateVerificationPage,
});

interface VerifiedData {
  id: number | string;
  name: string;
  email: string;
  school?: string;
  track?: string;
  courseName?: string;
  certificateId?: string;
  organization?: string;
  role?: string;
  department?: string;
  completedAt?: string;
  issuedAt?: string;
  issuer?: string;
  status?: string;
  verificationUrl?: string;
}

function CertificateVerificationPage() {
  const searchParams = Route.useSearch();
  const loaderData = Route.useLoaderData();
  const initialQuery = searchParams.id || searchParams.code || searchParams.q || "";

  const [queryInput, setQueryInput] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerifiedData | null>(loaderData?.cert || null);
  const [notFound, setNotFound] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleVerify = useCallback(async (searchQuery: string) => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    setLoading(true);
    setNotFound(false);
    setResult(null);

    try {
      const data = await verifyCertificate(trimmed);
      if (data && (data.id || data.certificateId)) {
        setResult(data);
        setNotFound(false);
        // Smooth scroll to result
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      } else {
        setNotFound(true);
        setResult(null);
      }
    } catch {
      setNotFound(true);
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-verify on mount if URL parameter is present (e.g. from QR code scan)
  useEffect(() => {
    if (initialQuery) {
      handleVerify(initialQuery);
    }
  }, [initialQuery, handleVerify]);

  const copyCertId = () => {
    if (!result?.certificateId) return;
    navigator.clipboard.writeText(result.certificateId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const copyShareLink = () => {
    const certId = result?.certificateId || String(result?.id || "");
    const url =
      getCertificateShareUrl(certId) ||
      `${window.location.origin}/verify?id=${encodeURIComponent(certId)}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrintCertificate = () => {
    if (!result) return;
    printOfficialCertificate({
      name: result.name,
      certificateId:
        result.certificateId || `RDT-${String(result.track || "AI").toUpperCase()}-${result.id}`,
      track: result.track,
      courseName: result.courseName,
      organization: result.organization || result.school,
      role: result.role,
      department: result.department,
      completedAt: result.completedAt,
      issuedAt: result.issuedAt,
    });
  };

  const formattedDate = (dateStr?: string) => {
    if (!dateStr) return "Officially Validated";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pt-24 sm:pt-28 pb-20">
      {/* ── 1. Hero & Search Banner ── */}
      <section className="relative overflow-hidden py-10 sm:py-16 bg-gradient-to-b from-white via-slate-50 to-slate-100/70 border-b border-slate-200/80">
        {/* Soft Background Ambient Lights */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute -top-[20%] left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--brand-red) 25%, transparent), transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-3.5 py-1.5 shadow-xs mb-4">
              <ShieldCheck className="h-4 w-4 text-emerald-600 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.14em] text-emerald-800">
                Official Credential Registry
              </span>
            </div>

            <h1 className="display-font text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-3">
              Verify an Official <span className="text-brand-red">Certificate</span>
            </h1>

            <p className="text-slate-600 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed font-medium mb-8">
              Authenticate credentials issued by <strong>Red Dot Technologies</strong> in academic
              partnership with the <strong>University of South Carolina Upstate (USA)</strong>.
            </p>
          </ScrollReveal>

          {/* Verification Search Bar Form */}
          <ScrollReveal direction="up" delay={0.1}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleVerify(queryInput);
              }}
              className="mx-auto max-w-2xl"
            >
              <div className="relative flex items-center rounded-2xl bg-white p-2 border-2 border-slate-200 shadow-xl focus-within:border-brand-red focus-within:ring-4 focus-within:ring-brand-red/10 transition-all duration-300">
                <div className="flex items-center justify-center pl-3 pr-2 text-slate-400">
                  <Search className="h-5 w-5 text-brand-red" />
                </div>

                <input
                  type="text"
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  placeholder="Enter Certificate ID (e.g. RDT-FOUNDATIONS-2), Email, or Name..."
                  className="w-full bg-transparent px-2 py-2 text-xs sm:text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  autoFocus
                />

                <button
                  type="submit"
                  disabled={loading || !queryInput.trim()}
                  className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-brand-ink hover:bg-brand-red text-white px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-extrabold shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? (
                    <>
                      <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4" />
                      <span>Verify Now</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 2. Verification Results Section ── */}
      <div ref={resultRef} className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
        {loading && (
          <div className="py-16 text-center space-y-3">
            <BrandSpinner size="md" message="Querying official cryptographic registry..." />
          </div>
        )}

        {/* ── CASE A: VERIFIED CERTIFICATE CARD ── */}
        {!loading && result && (
          <ScrollReveal direction="up">
            <div className="rounded-3xl bg-white border border-slate-200/90 shadow-2xl overflow-hidden animate-fade-in-up">
              {/* Top Verified Header Bar */}
              <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-6 sm:px-8 py-4 sm:py-5 text-white flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                    <ShieldCheck className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black uppercase tracking-wider text-emerald-200">
                        Official Status
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-ping" />
                    </div>
                    <h3 className="text-base sm:text-xl font-black text-white leading-tight">
                      Valid &amp; Authenticated Credential
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <ShareOnLinkedInButton
                    variant="pill"
                    certificateTitle={result.courseName}
                    certificateId={result.certificateId || (result.id ? `RDT-AI-${result.id}` : undefined)}
                    recipientName={result.name}
                    issueDate={result.completedAt || result.issuedAt}
                    label="Share on LinkedIn"
                  />
                  <button
                    onClick={copyShareLink}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 px-3 py-1.5 text-xs font-extrabold text-white transition-colors cursor-pointer"
                  >
                    {copiedLink ? (
                      <Check className="h-3.5 w-3.5 text-emerald-300" />
                    ) : (
                      <Share2 className="h-3.5 w-3.5" />
                    )}
                    <span>{copiedLink ? "Link Copied!" : "Share Link"}</span>
                  </button>
                  <button
                    onClick={handlePrintCertificate}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 px-3.5 py-1.5 text-xs font-black transition-colors shadow-sm cursor-pointer"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    <span>Print Official Certificate</span>
                  </button>
                </div>
              </div>

              {/* Certificate Details Content */}
              <div className="p-6 sm:p-10 space-y-6 sm:space-y-8">
                {/* Institution Branding */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/logo/logo-reddot.png"
                      alt="Red Dot Technologies"
                      className="h-9 sm:h-11 w-auto object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                    <div className="h-8 w-px bg-slate-200" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                        Red Dot Technologies Pvt. Ltd.
                      </h4>
                      <p className="text-[10px] sm:text-xs text-slate-500 font-semibold">
                        In Academic Partnership with USC Upstate (USA)
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 rounded-2xl bg-slate-50 border border-slate-200/80 px-3.5 py-2">
                    <QrCode className="h-5 w-5 text-slate-700" />
                    <div className="text-left">
                      <div className="text-[9px] font-black text-slate-400 uppercase">
                        Cryptographic ID
                      </div>
                      <div className="text-xs font-mono font-bold text-brand-ink">
                        {result.certificateId || `RDT-AI-${result.id}`}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recipient Spotlight */}
                <div className="rounded-2xl bg-gradient-to-br from-slate-50 via-white to-slate-50 border border-slate-200/80 p-6 text-center space-y-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-red/10 border border-brand-red/20 px-3 py-0.5 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-brand-red">
                    <Award className="h-3 w-3" />
                    <span>Verified Recipient</span>
                  </span>

                  <h2 className="display-font text-2xl sm:text-4xl font-black text-brand-ink tracking-tight">
                    {result.name}
                  </h2>

                  <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
                    Has successfully satisfied all academic assessments, laboratory benchmarks, and
                    curriculum requirements for the completion of:
                  </p>

                  <div className="pt-2">
                    <div className="inline-block rounded-2xl bg-brand-ink text-white px-5 py-3 shadow-lg">
                      <h3 className="text-sm sm:text-lg font-black tracking-tight text-white">
                        {result.courseName || "AI Foundations: General AI Literacy"}
                      </h3>
                      {result.track && (
                        <div className="text-[10px] sm:text-xs font-bold text-[#F0DCB4] uppercase tracking-widest mt-0.5">
                          Track: {result.track}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Information Metadata Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                  {/* Certificate ID */}
                  <div className="rounded-2xl bg-slate-50 border border-slate-200/70 p-4 space-y-1">
                    <div className="flex items-center justify-between text-slate-400">
                      <span className="text-[10px] font-black uppercase tracking-wider">
                        Reference Code
                      </span>
                      <button
                        onClick={copyCertId}
                        title="Copy Certificate ID"
                        className="text-slate-400 hover:text-brand-red transition-colors cursor-pointer"
                      >
                        {copiedId ? (
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                    <div className="font-mono text-xs sm:text-sm font-extrabold text-slate-900 break-all">
                      {result.certificateId || `RDT-AI-${result.id}`}
                    </div>
                  </div>

                  {/* Completion Date */}
                  <div className="rounded-2xl bg-slate-50 border border-slate-200/70 p-4 space-y-1">
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Issue / Completion Date</span>
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold text-slate-900">
                      {formattedDate(result.completedAt || result.issuedAt)}
                    </div>
                  </div>

                  {/* Issuer Authority */}
                  <div className="rounded-2xl bg-slate-50 border border-slate-200/70 p-4 space-y-1">
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <Building2 className="h-3 w-3" />
                      <span>Issuing Authority</span>
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                      Red Dot Technologies &amp; USC Upstate
                    </div>
                  </div>

                  {/* Institution / Role if available */}
                  {(result.school || result.organization || result.role) && (
                    <div className="sm:col-span-2 md:col-span-3 rounded-2xl bg-slate-50 border border-slate-200/70 p-4 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-slate-400" />
                        <span className="text-xs text-slate-600 font-medium">
                          Affiliation / Organization:
                        </span>
                        <strong className="text-xs font-bold text-slate-900">
                          {[result.role, result.department, result.school || result.organization]
                            .filter(Boolean)
                            .join(" — ")}
                        </strong>
                      </div>
                    </div>
                  )}
                </div>

                {/* Prominent Print & Share Action Card */}
                <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-brand-ink to-slate-950 p-4 sm:p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                  <div className="space-y-1 text-center sm:text-left">
                    <h4 className="text-sm sm:text-base font-extrabold text-white">
                      Download Official Digital Parchment
                    </h4>
                    <p className="text-xs text-slate-300 font-medium max-w-md">
                      Generate an authentic, high-resolution A4 landscape certificate suitable for
                      LinkedIn, PDF archival, or executive printing.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full sm:w-auto">
                    <button
                      onClick={handlePrintCertificate}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-brand-red hover:bg-red-700 text-white px-5 py-2.5 text-xs sm:text-sm font-extrabold shadow-md transition-all cursor-pointer"
                    >
                      <Printer className="h-4 w-4" />
                      <span>Print / Save as PDF</span>
                    </button>
                    <ShareOnLinkedInButton
                      variant="primary"
                      certificateTitle={result.courseName}
                      certificateId={result.certificateId || (result.id ? `RDT-AI-${result.id}` : undefined)}
                      recipientName={result.name}
                      issueDate={result.completedAt || result.issuedAt}
                      label="Share on LinkedIn"
                      className="flex-1 sm:flex-initial"
                    />
                    <button
                      onClick={copyShareLink}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-3.5 py-2.5 text-xs font-bold text-white transition-colors cursor-pointer"
                      title="Copy public verification link"
                    >
                      {copiedLink ? (
                        <Check className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Share2 className="h-4 w-4" />
                      )}
                      <span className="hidden sm:inline">{copiedLink ? "Copied!" : "Share"}</span>
                    </button>
                  </div>
                </div>

                {/* Security Verification Stamp */}
                <div className="rounded-2xl bg-emerald-50/70 border border-emerald-200/70 p-4 sm:p-5 flex items-start gap-3.5">
                  <div className="h-8 w-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                    <Lock className="h-4 w-4" />
                  </div>
                  <div className="space-y-0.5 text-xs">
                    <h5 className="font-extrabold text-emerald-950">
                      Tamper-Proof Digital Authenticity
                    </h5>
                    <p className="text-emerald-800 leading-relaxed font-medium">
                      This credential has been cryptographically signed and recorded in Red Dot
                      Technologies&apos; central verification database. Employers and institutions
                      can independently verify this certificate at any time using the reference
                      identifier above.
                    </p>
                  </div>
                </div>

                {/* Bottom CTA Actions */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                  <Link
                    to="/ai-unlocked"
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-700 hover:text-brand-red transition-colors"
                  >
                    <span>Explore All AI Tracks</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <Link
                    to="/pecp"
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-brand-red hover:underline"
                  >
                    <span>Discover PECP Executive Program (USC Upstate)</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* ── CASE B: NOT FOUND STATE ── */}
        {!loading && notFound && (
          <ScrollReveal direction="up">
            <div className="rounded-3xl bg-white border border-rose-200 shadow-xl p-8 sm:p-12 text-center space-y-4 animate-fade-in-up">
              <div className="h-16 w-16 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-brand-red mx-auto shadow-xs">
                <AlertCircle className="h-8 w-8" />
              </div>

              <div className="space-y-1.5 max-w-md mx-auto">
                <h3 className="display-font text-xl sm:text-2xl font-black text-slate-900">
                  Certificate Record Not Found
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  We could not find an official certificate record matching{" "}
                  <strong className="text-slate-900">&ldquo;{queryInput}&rdquo;</strong>.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 max-w-lg mx-auto text-left text-xs text-slate-600 space-y-2">
                <h5 className="font-extrabold text-slate-900">Suggestions for Verification:</h5>
                <ul className="list-disc pl-4 space-y-1">
                  <li>
                    Check for typographical errors in the Certificate Reference ID (e.g.{" "}
                    <code>RDT-AI-2026-...</code>).
                  </li>
                  <li>
                    Try searching using the exact <strong>Email Address</strong> registered during
                    the course.
                  </li>
                  <li>
                    Try searching using the recipient&apos;s <strong>Full Legal Name</strong>.
                  </li>
                </ul>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setQueryInput("");
                    setNotFound(false);
                  }}
                  className="rounded-xl bg-slate-100 hover:bg-slate-200 px-4 py-2 text-xs font-extrabold text-slate-800 transition-colors"
                >
                  Clear &amp; Try Another Query
                </button>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 rounded-xl bg-brand-red text-white hover:bg-red-700 px-4 py-2 text-xs font-extrabold transition-colors shadow-sm"
                >
                  <span>Contact Registry Support</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>

      {/* ── 3. Educational & Enterprise Verification Info ── */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="rounded-2xl bg-white border border-slate-200/80 p-5 space-y-2 shadow-xs">
            <div className="h-9 w-9 rounded-xl bg-blue-50 border border-blue-200/60 text-blue-600 flex items-center justify-center mb-2">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-extrabold text-slate-900">For Employers &amp; HR</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Easily confirm candidate qualifications and verify authenticity before hiring or
              granting executive promotions.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200/80 p-5 space-y-2 shadow-xs">
            <div className="h-9 w-9 rounded-xl bg-emerald-50 border border-emerald-200/60 text-emerald-600 flex items-center justify-center mb-2">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-extrabold text-slate-900">Global Academic Standard</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Curricula and executive programs built in academic partnership with the University of
              South Carolina Upstate (USA).
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200/80 p-5 space-y-2 shadow-xs">
            <div className="h-9 w-9 rounded-xl bg-rose-50 border border-rose-200/60 text-brand-red flex items-center justify-center mb-2">
              <Lock className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-extrabold text-slate-900">Cryptographic Security</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Every certificate carries an unforgeable reference ID synchronized with our secure
              central database.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
