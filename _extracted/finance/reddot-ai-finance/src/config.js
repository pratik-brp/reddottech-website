/* =============================================================
   CONFIGURATION — edit these settings, then run:  node build.js
   -------------------------------------------------------------
   PRICE          course price shown on the paywall
   FREE_PREVIEW   module ids readable without payment
   CONTACT        details shown on the payment screen
   LEAD_ENDPOINT  Google Apps Script / form URL that receives
                  registrations and certificate details
   CODE_SALT      MUST stay identical to the value in
                  tools/access-code-generator.html, or issued
                  access codes will not be accepted
   Logos and the Fonepay QR are injected from /assets at build time.
   ============================================================= */
/* ============ BRANDING & LEADS ============ */
const LOGO="{{LOGO_DARK}}";
const LOGO_WHITE="{{LOGO_WHITE}}";
// Paste your Google Apps Script / form endpoint here to collect registrations centrally.
const LEAD_ENDPOINT="";

/* ============ PRICING & ACCESS ============ */
const PRICE={ amount:"1,499", was:"2,999", currency:"NPR", intro:true };
const FREE_PREVIEW=["m1"];            // modules readable without payment
const CONTACT={ email:"info@reddottech.com.np", phone:"01 4535691 / 4516390", whatsapp:"" };
const QR_IMG="{{FONEPAY_QR}}";
// Access codes are validated offline by checksum. Generate them with the
// companion tool (tools/access-code-generator.html) and issue one per buyer.
const CODE_SALT="RDT-AIFP-2026";
