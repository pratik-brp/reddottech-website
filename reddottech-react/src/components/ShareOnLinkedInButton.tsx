import { useState } from "react";
import { Linkedin } from "lucide-react";
import { toast } from "sonner";
import {
  shareCertificateOnLinkedIn,
  getCertificateShareUrl,
  buildLinkedInShareText,
  type LinkedInShareOptions,
} from "@/lib/linkedin-share";

export interface ShareOnLinkedInButtonProps extends LinkedInShareOptions {
  className?: string;
  variant?: "primary" | "secondary" | "pill" | "compact" | "badge";
  label?: string;
  disabled?: boolean;
}

/**
 * Direct 1-Click "Share on LinkedIn" button for verified certificates.
 *
 * Directly opens LinkedIn's post composer in a new tab with a customized,
 * professional caption, certificate details, and verification link prefilled.
 */
export function ShareOnLinkedInButton({
  certificateTitle,
  certificateId,
  recipientName,
  customUrl,
  className = "",
  variant = "primary",
  label = "Share on LinkedIn",
  disabled = false,
}: ShareOnLinkedInButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (disabled || loading) return;

    const shareUrl = getCertificateShareUrl(certificateId, customUrl);
    if (!shareUrl && !certificateId) {
      toast.error("Certificate verification link is unavailable.");
      return;
    }

    setLoading(true);

    const caption = buildLinkedInShareText(
      certificateTitle,
      recipientName,
      shareUrl || undefined,
      certificateId,
    );

    // Also copy caption to clipboard for user convenience (if they want to paste or edit)
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(caption).catch(() => {});
    }

    const success = shareCertificateOnLinkedIn(
      {
        certificateTitle,
        certificateId,
        recipientName,
        customUrl,
      },
      "feed",
    );

    if (success) {
      toast.success("Opening LinkedIn with your custom post caption!");
    } else {
      toast.error("Could not open LinkedIn. Please check your browser popup settings.");
    }

    setTimeout(() => setLoading(false), 1000);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-[#0A66C2] hover:bg-[#004182] text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-98";
      case "secondary":
        return "bg-white hover:bg-slate-50 text-[#0A66C2] border border-[#0A66C2]/30 hover:border-[#0A66C2] font-bold text-xs px-3.5 py-2 rounded-xl transition-colors shadow-2xs";
      case "pill":
        return "bg-white/15 hover:bg-[#0A66C2] text-white border border-white/30 hover:border-transparent font-extrabold text-xs px-3.5 py-1.5 rounded-xl transition-all shadow-2xs";
      case "compact":
        return "bg-[#0A66C2] hover:bg-[#004182] text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors shadow-2xs";
      case "badge":
        return "bg-blue-50 hover:bg-blue-100 text-[#0A66C2] border border-blue-200 font-semibold text-[11px] px-2.5 py-1 rounded-lg transition-colors";
      default:
        return "bg-[#0A66C2] hover:bg-[#004182] text-white font-bold text-xs px-4 py-2 rounded-xl";
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || loading}
      aria-label={label}
      title="Share your certificate achievement directly on LinkedIn with a custom caption"
      className={`inline-flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all ${getVariantStyles()} ${className}`}
    >
      <Linkedin className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 fill-current" />
      <span>{label}</span>
    </button>
  );
}
