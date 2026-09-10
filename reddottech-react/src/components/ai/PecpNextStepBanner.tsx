import { Link } from "@tanstack/react-router";

interface PecpNextStepBannerProps {
  trackId?: string;
  className?: string;
}

export function PecpNextStepBanner({ trackId, className = "" }: PecpNextStepBannerProps) {
  const audienceText =
    trackId === "education"
      ? "working professionals and education teams."
      : trackId === "healthcare"
        ? "working professionals and healthcare leadership teams."
        : "working professionals and management teams.";

  return (
    <div
      className={`rounded-xl sm:rounded-2xl bg-[#0E1E3B] border border-[#1E3765] p-6 sm:p-8 lg:p-9 text-white shadow-xl relative overflow-hidden ${className}`}
    >
      {/* Subtle ambient lighting gradients */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#C89332]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-600/10 rounded-full blur-2xl pointer-events-none -ml-16 -mb-16" />

      <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-3.5">
        <div>
          <span className="inline-block border border-[#9C782B] rounded-[3px] px-2.5 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[2px] text-[#E8BD65] bg-transparent">
            CONTINUE YOUR DEVELOPMENT
          </span>
        </div>

        <h2 className="text-2xl sm:text-[28px] font-bold text-white tracking-tight leading-tight">
          The next step: PECP
        </h2>

        <p className="text-xs sm:text-[14.5px] text-[#CFDCEF] leading-relaxed font-normal">
          This programme pairs naturally with the{" "}
          <strong className="text-white font-bold">
            Professional Excellence &amp; Certification Program (PECP)
          </strong>{" "}
          from Red Dot Technologies, in partnership with the{" "}
          <strong className="text-white font-semibold">University of South Carolina Upstate</strong>{" "}
          — instructor-led, cohort-based professional certification in project management, business
          analytics, quality and leadership, designed for {audienceText}
        </p>

        <div className="pt-2 sm:pt-3 flex flex-wrap items-center gap-3">
          <Link
            to="/pecp"
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#C89332] hover:bg-[#b58327] text-white font-bold text-xs sm:text-sm px-5 py-2.5 shadow-sm transition-colors cursor-pointer"
          >
            <span>Explore PECP →</span>
          </Link>

          <Link
            to="/contact"
            search={{ subject: "In-House PECP Cohort Inquiry" }}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#0E1E3B] hover:bg-[#162D58] text-white font-bold text-xs sm:text-sm px-5 py-2.5 border border-[#2E4F84] hover:border-slate-300 transition-colors cursor-pointer"
          >
            <span>Enquire about in-house cohorts</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
