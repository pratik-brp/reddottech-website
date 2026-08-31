import { TRACK_CONFIGS } from "./ai-course-utils";

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

export function printOfficialCertificate(options: CertificatePrintOptions) {
  const recipientName = options.name?.trim() || "Candidate Name";
  const trackKey = (options.track || "").toLowerCase();

  const cfg =
    TRACK_CONFIGS[trackKey] ||
    (trackKey.includes("health")
      ? TRACK_CONFIGS.healthcare
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

  const printHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Certificate of Completion - ${recipientName}</title>
        <style>
          @page {
            size: A4 landscape;
            margin: 6mm;
          }
          * {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            background-color: #ffffff;
          }
          body {
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Georgia, 'Times New Roman', serif;
          }
          .cert-outer {
            width: 100%;
            max-width: 960px;
            border: 2px solid #0F1E3D;
            background: #ffffff;
            padding: 4px;
            box-shadow: 0 10px 34px rgba(15,30,61,0.13);
          }
          .cert-inner {
            border: 1px solid #B8892B;
            padding: 28px 40px;
            text-align: center;
            position: relative;
            background: #ffffff;
          }
          .logo {
            height: 42px;
            width: auto;
            margin: 0 auto 10px auto;
            display: block;
            object-fit: contain;
          }
          .cert-type {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 10.5px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 4px;
            color: #B8892B;
            margin-bottom: 4px;
          }
          .title {
            font-size: 26px;
            color: #0F1E3D;
            margin: 4px 0;
            line-height: 1.15;
            font-family: Georgia, 'Times New Roman', serif;
            font-weight: normal;
          }
          .subtitle {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1.6px;
            color: #C8102E;
            margin-bottom: 14px;
          }
          .certifies {
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 12.5px;
            font-style: italic;
            color: #6B7C96;
            margin-top: 14px;
            margin-bottom: 4px;
          }
          .student-name {
            font-family: Georgia, serif;
            font-size: 26px;
            color: #1B3566;
            border-bottom: 1px solid #cbd5e1;
            display: inline-block;
            padding: 0 32px 4px 32px;
            margin-bottom: 4px;
            font-weight: 500;
          }
          .affiliation {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 12px;
            color: #6B7C96;
            margin-bottom: 12px;
            font-weight: 500;
          }
          .desc {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 12px;
            line-height: 1.65;
            color: #1A233A;
            max-width: 660px;
            margin: 0 auto 12px auto;
          }
          .modules-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            justify-content: center;
            max-width: 680px;
            margin: 0 auto 16px auto;
          }
          .module-badge {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 9.5px;
            background: #F1F4F9;
            color: #1B3566;
            padding: 2.5px 7px;
            border-radius: 2px;
            font-weight: 600;
          }
          .footer-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-top: 16px;
            padding-top: 8px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11px;
            color: #6B7C96;
          }
          .sign-col {
            border-top: 1px solid #0F1E3D;
            padding-top: 4px;
            min-width: 170px;
          }
          .sign-title {
            color: #0F1E3D;
            font-size: 12px;
            font-weight: bold;
            display: block;
          }
          .sign-sub {
            font-size: 10px;
            color: #6B7C96;
          }
          .ref-row {
            margin-top: 12px;
            font-family: monospace;
            font-size: 10px;
            color: #6B7C96;
            letter-spacing: 0.8px;
          }
        </style>
      </head>
      <body>
        <div class="cert-outer">
          <div class="cert-inner">
            <img src="${window.location.origin}/logo.png" class="logo" alt="Red Dot Technologies" onerror="this.src='/images/logo.png'" />
            <div class="cert-type">Certificate of Completion</div>
            <h1 class="title">${courseTitle}</h1>
            <div class="subtitle">${certSubtitle}</div>

            <div class="certifies">This is to certify that</div>
            <div class="student-name">${recipientName}</div>
            <div class="affiliation">${affiliation}</div>

            <div class="desc">${certDesc}</div>

            ${
              modules.length > 0
                ? `<div class="modules-wrap">
                    ${modules.map((m) => `<span class="module-badge">${m}</span>`).join("")}
                  </div>`
                : ""
            }

            <div class="footer-row">
              <div class="sign-col" style="text-align: left;">
                <span class="sign-title">Red Dot Technologies Pvt. Ltd.</span>
                <span class="sign-sub">Baluwatar, Kathmandu, Nepal</span>
              </div>
              <div class="sign-col" style="text-align: right;">
                <span class="sign-title">${certDate}</span>
                <span class="sign-sub">Date of completion</span>
              </div>
            </div>

            <div class="ref-row">
              Certificate reference: ${certReference}
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const printIframe = document.createElement("iframe");
  printIframe.style.position = "fixed";
  printIframe.style.right = "0";
  printIframe.style.bottom = "0";
  printIframe.style.width = "0";
  printIframe.style.height = "0";
  printIframe.style.border = "0";
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
        document.body.removeChild(printIframe);
      }, 2000);
    }, 350);
  }
}
