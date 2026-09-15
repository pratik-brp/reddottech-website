/**
 * LinkedIn Certificate Sharing Utilities
 *
 * Provides functions to generate professional share links and directly trigger
 * LinkedIn's post sharing and profile attachment flows.
 */

export interface LinkedInShareOptions {
  certificateTitle?: string;
  certificateId?: string;
  recipientName?: string;
  customUrl?: string;
  issueDate?: string | Date;
}

/**
 * Derives the canonical public verification URL for a given certificate.
 * Returns null if no valid ID or URL is available.
 */
export function getCertificateShareUrl(certificateId?: string, customUrl?: string): string | null {
  if (customUrl && customUrl.trim()) {
    const trimmed = customUrl.trim();
    if (trimmed.includes("localhost") || trimmed.includes("127.0.0.1")) {
      try {
        const u = new URL(trimmed);
        return `https://reddottech.com.np${u.pathname}${u.search}`;
      } catch {
        return "https://reddottech.com.np/verify";
      }
    }
    return trimmed;
  }

  const cleanId = String(certificateId || "").trim();
  if (!cleanId) return null;

  // LinkedIn's scraper is a cloud bot on the public internet.
  // It CANNOT scrape http://localhost or private local IP addresses.
  // When tested in dev or staging on localhost, we MUST use the public production domain
  // https://reddottech.com.np so LinkedIn can crawl and attach the certificate preview card.
  const isLocalOrigin =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname.endsWith(".local"));

  const origin =
    isLocalOrigin || typeof window === "undefined"
      ? "https://reddottech.com.np"
      : window.location.origin;

  return `${origin}/verify?id=${encodeURIComponent(cleanId)}`;
}

/**
 * Builds a professional, engaging default message for LinkedIn sharing.
 */
export function buildLinkedInShareText(
  title?: string,
  recipientName?: string,
  shareUrl?: string,
  certificateId?: string,
): string {
  const cleanTitle = (title || "").trim() || "Professional Certification";
  const nameLine = recipientName?.trim() ? `Awarded to: ${recipientName.trim()}\n` : "";
  const idLine = certificateId?.trim() ? `Credential ID: ${certificateId.trim()}\n` : "";

  let message = `🎓 Excited to share that I have successfully completed the "${cleanTitle}" programme with Red Dot Technologies in academic collaboration with the University of South Carolina Upstate (USA)!\n\n${nameLine}${idLine}Equipped with practical industry skills and workforce-ready expertise.\n\nVerify official credential:`;

  if (shareUrl) {
    message += `\n${shareUrl}`;
  }

  message += `\n\n#RedDotTechnologies #Certification #ProfessionalGrowth #LifelongLearning`;

  return message;
}

/**
 * Opens LinkedIn's post creator in a new secure window/tab with the certificate
 * verification URL and professional message prefilled.
 *
 * @param options Certificate options (title, ID, recipient, url)
 * @param mode "feed" (feed composer with prefilled text) | "dialog" (official share offsite card)
 * @returns true if opened successfully, false if the certificate link was unavailable.
 */
export function shareCertificateOnLinkedIn(
  options: LinkedInShareOptions,
  mode: "feed" | "dialog" = "feed",
): boolean {
  const shareUrl = getCertificateShareUrl(options.certificateId, options.customUrl);

  if (!shareUrl && !options.certificateId) {
    return false;
  }

  let targetUrl: string;

  if (mode === "dialog") {
    // Official LinkedIn Share Offsite dialog (attaches rich card preview)
    targetUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      shareUrl || "",
    )}`;
  } else {
    // LinkedIn feed post composer with prefilled celebratory text and verification link
    const shareText = buildLinkedInShareText(
      options.certificateTitle,
      options.recipientName,
      shareUrl || undefined,
      options.certificateId,
    );
    targetUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(
      shareText,
    )}`;
  }

  if (typeof window !== "undefined") {
    // Open safely with noopener, noreferrer to prevent window.opener tab nabbing
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  }

  return true;
}

/**
 * Builds a direct "Add to LinkedIn Profile" certification link.
 * This pre-fills the credential directly into the user's LinkedIn profile
 * under "Licenses & Certifications".
 */
export function getLinkedInAddToProfileUrl(options: {
  certificateTitle?: string;
  certificateId?: string;
  issueDate?: string | Date;
}): string | null {
  const certId = String(options.certificateId || "").trim();
  const certUrl = getCertificateShareUrl(certId);
  if (!certId || !certUrl) return null;

  const dateObj = options.issueDate ? new Date(options.issueDate) : new Date();
  const issueYear = !isNaN(dateObj.getFullYear()) ? dateObj.getFullYear() : new Date().getFullYear();
  const issueMonth = !isNaN(dateObj.getMonth()) ? dateObj.getMonth() + 1 : new Date().getMonth() + 1;

  const params = new URLSearchParams({
    startTask: "CERTIFICATION_NAME",
    name: options.certificateTitle || "Professional Certification",
    organizationName: "Red Dot Technologies Pvt. Ltd.",
    issueYear: String(issueYear),
    issueMonth: String(issueMonth),
    certUrl: certUrl,
    certId: certId,
  });

  return `https://www.linkedin.com/profile/add?${params.toString()}`;
}

/**
 * Directly opens LinkedIn's "Add License & Certification" dialog to attach the credential
 * permanently to the user's LinkedIn Profile.
 */
export function addCertificateToLinkedInProfile(options: {
  certificateTitle?: string;
  certificateId?: string;
  issueDate?: string | Date;
}): boolean {
  const url = getLinkedInAddToProfileUrl(options);
  if (!url) return false;

  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return true;
}
