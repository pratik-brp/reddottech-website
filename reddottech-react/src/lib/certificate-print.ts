import { TRACK_CONFIGS } from "./ai-course-utils";
import { REDDOT_STAMP_DATA_URI } from "@/assets/reddot-stamp-data";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas-pro";

export interface CertificatePrintOptions {
  name: string;
  certificateId: string;
  track?: string;
  courseName?: string;
  organization?: string;
  role?: string;
  department?: string;
  completedAt?: string;
  issuedAt?: string;
}

interface ResolvedCertData {
  recipientName: string;
  courseTitle: string;
  certSubtitle: string;
  certDesc: string;
  modules: string[];
  affiliation: string;
  certDate: string;
  certReference: string;
}

function resolveCertificateData(options: CertificatePrintOptions): ResolvedCertData {
  const recipientName = options.name?.trim() || "Candidate Name";
  const trackKey = (options.track || "").toLowerCase();

  const cfg =
    TRACK_CONFIGS[trackKey] ||
    (trackKey.includes("health")
      ? TRACK_CONFIGS.healthcare
      : trackKey.includes("edu") || trackKey.includes("teach")
        ? TRACK_CONFIGS.education
        : trackKey.includes("dev") || trackKey.includes("agsd") || trackKey.includes("software")
          ? TRACK_CONFIGS["agile-developers"]
          : trackKey.includes("agmg") || (trackKey.includes("agile") && trackKey.includes("manag"))
            ? TRACK_CONFIGS["agile-managers"]
            : trackKey.includes("manage") || trackKey.includes("mgmt")
              ? TRACK_CONFIGS.management
              : trackKey.includes("adv") ||
                trackKey.includes("fa") ||
                trackKey.includes("level 2") ||
                trackKey.includes("level-2")
                ? TRACK_CONFIGS["finance-advanced"]
                : trackKey.includes("finan") || trackKey.includes("bank")
                  ? TRACK_CONFIGS.finance
                  : TRACK_CONFIGS.foundations);

  const courseTitle = options.courseName || cfg?.certTitle || "AI Foundations: General AI Literacy";
  const certSubtitle = cfg?.certSubtitle || "Professional Certificate Programme";
  const certDesc =
    cfg?.certDesc ||
    "has successfully satisfied all rigorous curriculum modules, practical lab benchmarks, and mastery assessments conducted by Red Dot Technologies in academic collaboration with the University of South Carolina Upstate (USA).";
  const modules = cfg?.modules || [];

  const affiliation =
    [
      options.organization || options.role || options.department ? options.organization : "",
      options.role ? options.role : "",
      options.department ? `(${options.department})` : "",
    ]
      .filter(Boolean)
      .join(" · ") || "Red Dot Technologies";

  let certDate = "Officially Validated";
  const rawDate = options.completedAt || options.issuedAt;
  if (rawDate) {
    try {
      certDate = new Date(rawDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      certDate = rawDate;
    }
  } else {
    certDate = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  const certReference =
    options.certificateId ||
    `RDT-${(options.track || "AI").toUpperCase()}-${Date.now().toString().slice(-6)}`;

  return {
    recipientName,
    courseTitle,
    certSubtitle,
    certDesc,
    modules,
    affiliation,
    certDate,
    certReference,
  };
}

let cachedLogoDataUri: string | null = null;
async function getLogoDataUri(): Promise<string> {
  if (cachedLogoDataUri) return cachedLogoDataUri;
  try {
    const res = await fetch("/logo.png");
    if (!res.ok) throw new Error("not ok");
    const blob = await res.blob();
    return await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        cachedLogoDataUri = reader.result as string;
        resolve(cachedLogoDataUri);
      };
      reader.onerror = () => resolve("/logo.png");
      reader.readAsDataURL(blob);
    });
  } catch {
    return "/logo.png";
  }
}

/**
 * Generates the prestigious, well-proportioned certificate DOM content.
 */
function getCertificateHtmlContent(d: ResolvedCertData, logoSrc: string): string {
  const origin =
    typeof window !== "undefined" && !window.location.origin.includes("localhost")
      ? window.location.origin
      : "https://reddottech.com.np";
  const verifyUrl = `${origin}/verify?id=${encodeURIComponent(d.certReference)}`;

  return `
    <div style="width: 100%; height: 100%; border: 3px solid #0F1E3D; background: #ffffff; padding: 5px; box-sizing: border-box; display: flex; flex-direction: column;">
      <div style="border: 1.5px solid #B8892B; padding: 26px 42px 22px 42px; text-align: center; position: relative; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box;">
        <div>
          <!-- Header Branding -->
          <img src="${logoSrc}" style="height: 48px; width: auto; margin: 0 auto 8px auto; display: block; object-fit: contain;" alt="Red Dot Technologies" />
          <div style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 5px; color: #B8892B; margin-bottom: 6px;">
            Certificate of Completion
          </div>
          <h1 style="font-size: 34px; color: #0F1E3D; margin: 4px 0 6px 0; line-height: 1.2; font-family: Georgia, 'Times New Roman', serif; font-weight: 700; letter-spacing: -0.3px;">
            ${d.courseTitle}
          </h1>
          <div style="font-family: Arial, Helvetica, sans-serif; font-size: 12.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; color: #C8102E; margin-bottom: 16px;">
            ${d.certSubtitle}
          </div>

          <!-- Recipient Presentation -->
          <div style="font-family: Georgia, 'Times New Roman', serif; font-size: 15px; font-style: italic; color: #5A6D88; margin-bottom: 6px;">
            This is to certify that
          </div>
          <div style="font-family: Georgia, serif; font-size: 40px; color: #0F2552; border-bottom: 2px solid #C49A45; display: inline-block; padding: 0 48px 6px 48px; margin-bottom: 6px; font-weight: 600; letter-spacing: 0.5px;">
            ${d.recipientName}
          </div>
          <div style="font-family: Arial, Helvetica, sans-serif; font-size: 13.5px; color: #4B5E78; margin-bottom: 16px; font-weight: 600;">
            ${d.affiliation}
          </div>

          <!-- Description Narrative -->
          <div style="font-family: Georgia, 'Times New Roman', serif; font-size: 14.5px; line-height: 1.7; color: #1E293B; max-width: 860px; margin: 0 auto 16px auto; text-align: center;">
            ${d.certDesc}
          </div>

          <!-- Curriculum Modules -->
          ${d.modules.length > 0
      ? `<div style="display: flex; flex-wrap: wrap; gap: 6px 8px; justify-content: center; max-width: 900px; margin: 0 auto 16px auto;">
                  ${d.modules.map((m) => `<span style="font-family: Arial, Helvetica, sans-serif; font-size: 10.5px; background: #F1F5F9; border: 1px solid #CBD5E1; color: #0F2552; padding: 3px 9px; border-radius: 3px; font-weight: 600;">${m}</span>`).join("")}
                </div>`
      : ""
    }
        </div>

        <!-- Footer Signatures & Credentials -->
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 14px; padding-top: 8px; font-family: Arial, Helvetica, sans-serif;">
            <div style="min-width: 250px; text-align: left; display: flex; flex-direction: column; align-items: flex-start;">
              <img src="${REDDOT_STAMP_DATA_URI}" style="height: 72px; width: auto; object-fit: contain; display: block; margin-left: 36px; margin-bottom: 3px;" alt="Official Stamp" />
              <div style="border-top: 1.5px solid #0F1E3D; padding-top: 5px; width: 100%; min-width: 250px;">
                <span style="color: #0F1E3D; font-size: 13.5px; font-weight: bold; display: block; letter-spacing: 0.2px;">Red Dot Technologies Pvt. Ltd.</span>
                <span style="font-size: 11px; color: #5A6D88; display: block; margin-top: 1px;">Baluwatar, Kathmandu, Nepal</span>
              </div>
            </div>
            <div style="padding-top: 5px; min-width: 200px; text-align: right;">
              <span style="color: #0F1E3D; font-size: 13.5px; font-weight: bold; display: block; letter-spacing: 0.2px;">${d.certDate}</span>
              <span style="font-size: 11px; color: #5A6D88; display: block; margin-top: 1px;">Date of completion</span>
            </div>
          </div>

          <div style="margin-top: 12px; display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed #CBD5E1; padding-top: 7px; font-family: 'Courier New', Courier, monospace; font-size: 10.5px; color: #64748B; letter-spacing: 0.5px; font-weight: 600;">
            <div>
              Certificate reference: <strong style="color: #0F2552;">${d.certReference}</strong>
            </div>
            <a id="cert-verify-link" href="${verifyUrl}" target="_blank" rel="noopener noreferrer" style="font-family: Arial, Helvetica, sans-serif; font-size: 10.5px; font-weight: 700; color: #C8102E; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; letter-spacing: 0.2px;">
              <span>Verify on Official Registry:</span>
              <span style="text-decoration: underline;">reddottech.com.np/verify?id=${d.certReference}</span>
              <span style="font-size: 11px;">↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Downloads a high-resolution A4 Landscape PDF directly to the user's computer.
 * Guaranteed true landscape without relying on browser print dialog settings.
 */
export async function downloadOfficialCertificatePdf(options: CertificatePrintOptions): Promise<void> {
  const d = resolveCertificateData(options);
  const logoSrc = await getLogoDataUri();

  // Create an offscreen rendering container with exact A4 landscape dimensions
  // Positioned far outside the viewport so the certificate is never visible to the user.
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "-4000px";
  container.style.width = "1123px"; // ~297mm at 96 DPI
  container.style.height = "794px"; // ~210mm at 96 DPI
  container.style.backgroundColor = "#ffffff";
  container.style.zIndex = "999999";
  container.style.display = "flex";
  container.style.alignItems = "center";
  container.style.justifyContent = "center";
  container.style.boxSizing = "border-box";
  container.style.padding = "18px 22px";
  container.style.fontFamily = "Georgia, 'Times New Roman', serif";
  container.style.pointerEvents = "none";

  container.innerHTML = getCertificateHtmlContent(d, logoSrc);

  document.body.appendChild(container);

  try {
    const h2c =
      typeof html2canvas === "function"
        ? html2canvas
        : ((html2canvas as unknown as { default?: typeof html2canvas }).default || html2canvas);

    // Wait for all images inside container to complete loading
    const imgs = Array.from(container.querySelectorAll("img"));
    await Promise.all(
      imgs.map((img) => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise<void>((res) => {
          img.onload = () => res();
          img.onerror = () => res();
          setTimeout(res, 500);
        });
      })
    );

    await new Promise((resolve) => setTimeout(resolve, 100));

    const canvas = await h2c(container, {
      scale: 2, // 2x for sharp retina print quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      width: 1123,
      height: 794,
      windowWidth: 1123,
      windowHeight: 794,
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0,
    });

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 0, 0, 297, 210, undefined, "FAST");

    // Add interactive clickable link annotation in the PDF over the verify link area
    const linkEl = container.querySelector("#cert-verify-link");
    if (linkEl) {
      const rect = linkEl.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const xMm = ((rect.left - containerRect.left) / containerRect.width) * 297;
      const yMm = ((rect.top - containerRect.top) / containerRect.height) * 210;
      const wMm = (rect.width / containerRect.width) * 297;
      const hMm = (rect.height / containerRect.height) * 210;
      const origin =
        typeof window !== "undefined" && !window.location.origin.includes("localhost")
          ? window.location.origin
          : "https://reddottech.com.np";
      const verifyUrl = `${origin}/verify?id=${encodeURIComponent(d.certReference)}`;
      pdf.link(xMm, yMm, wMm, hMm, { url: verifyUrl });
    }

    const safeName =
      d.recipientName.replace(/[^a-zA-Z0-9_\-\s]/g, "").trim().replace(/\s+/g, "_") || "Certificate";
    pdf.save(`Certificate-${safeName}.pdf`);
  } finally {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
}

/**
 * Triggers the browser print dialog with strict A4 Landscape page directives.
 */
export function printOfficialCertificate(options: CertificatePrintOptions) {
  const d = resolveCertificateData(options);
  const logoSrc = `${window.location.origin}/logo.png`;

  const printHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Certificate of Completion - ${d.recipientName}</title>
        <style>
          @page {
            size: landscape;
            margin: 0;
          }
          @media print {
            @page {
              size: landscape;
              margin: 0;
            }
            html, body {
              width: 297mm !important;
              height: 210mm !important;
              margin: 0 !important;
              padding: 0 !important;
              background-color: #ffffff !important;
              overflow: hidden !important;
            }
            body {
              padding: 5mm 6mm !important;
            }
          }
          * {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          html, body {
            margin: 0;
            padding: 0;
            width: 297mm;
            height: 210mm;
            background-color: #ffffff;
            overflow: hidden;
          }
          body {
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Georgia, 'Times New Roman', serif;
            padding: 5mm 6mm;
            box-sizing: border-box;
          }
        </style>
      </head>
      <body>
        ${getCertificateHtmlContent(d, logoSrc)}
      </body>
    </html>
  `;

  const printIframe = document.createElement("iframe");
  printIframe.style.position = "fixed";
  printIframe.style.top = "-9999px";
  printIframe.style.left = "-9999px";
  printIframe.style.width = "297mm";
  printIframe.style.height = "210mm";
  printIframe.style.border = "0";
  printIframe.style.zIndex = "-9999";
  document.body.appendChild(printIframe);

  const doc = printIframe.contentWindow?.document;
  if (doc) {
    doc.open();
    doc.write(printHtml);
    doc.close();

    setTimeout(() => {
      printIframe.contentWindow?.focus();
      printIframe.contentWindow?.print();
      setTimeout(() => {
        if (document.body.contains(printIframe)) {
          document.body.removeChild(printIframe);
        }
      }, 3000);
    }, 400);
  }
}
