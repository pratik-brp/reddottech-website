/* =============================================================
   AI COURSE UTILITIES & DATA DEFINITIONS
   Supports:
     - AI Foundations & Literacy (Free)
     - AI for Healthcare Professionals (Track 2)
     - AI for Financial Professionals (Track 3)
   ============================================================= */

export interface TrackConfig {
  id: "foundations" | "healthcare" | "finance" | "finance-advanced";
  name: string;
  shortName: string;
  badge: string;
  tagline: string;
  description: string;
  modulesCount: number;
  durationLabel: string;
  level: string;
  isPaid: boolean;
  price?: {
    amount: string;
    was?: string;
    currency: string;
    intro?: boolean;
  };
  salt?: string;
  freePreviewIds: string[];
  storageKey: string;
  certCodePrefix: string;
  certTitle: string;
  certSubtitle: string;
  certDesc: string;
  modules: string[];
  theme: {
    primaryColor: string;
    badgeBg: string;
    badgeText: string;
    accentColor: string;
  };
}

export const TRACK_CONFIGS: Record<string, TrackConfig> = {
  foundations: {
    id: "foundations",
    name: "AI Foundations & Literacy",
    shortName: "AI Foundations",
    badge: "Free Literacy Track",
    tagline: 'From "What even is AI?" to using it like a pro',
    description:
      "A free, hands-on 5-lesson AI literacy course and digital credential created for students, educators, and curious professionals by Red Dot Technologies.",
    modulesCount: 5,
    durationLabel: "~2 hours",
    level: "Beginner to Practical",
    isPaid: false,
    freePreviewIds: ["l1", "l2", "l3", "l4", "l5"],
    storageKey: "aiFoundations_v1",
    certCodePrefix: "RDT-AIFOUND",
    certTitle: "AI Foundations: General AI Literacy",
    certSubtitle: "Foundation Certificate Programme · Open Curriculum",
    certDesc:
      "has successfully completed all modules and practical assessments of AI Foundations: General AI Literacy, an applied foundation programme covering machine learning paradigms, deep learning, generative AI, prompt engineering, and ethical AI stewardship.",
    modules: [
      "Demystifying Artificial Intelligence",
      "Machine Learning vs Deep Learning vs GenAI",
      "Generative AI & Prompt Engineering Masterclass",
      "Ethical AI, Productivity & Future Careers",
      "Applied AI Capstone & Practical Assessment",
    ],
    theme: {
      primaryColor: "#C8102E",
      badgeBg: "bg-red-500/10 text-red-400 border-red-500/20",
      badgeText: "text-red-500",
      accentColor: "#C8102E",
    },
  },
  healthcare: {
    id: "healthcare",
    name: "AI for Healthcare Professionals",
    shortName: "AI for Healthcare",
    badge: "Clinical Applied Track",
    tagline: "Clinical AI, Diagnostics, Generative Scribes & Health Equity",
    description:
      "An applied executive programme for doctors, nurses, public health professionals, and health administrators in Nepal and emerging economies — covering clinical decision support, real-world deployments, diagnostic deep learning, medical risk, data safety, and AI governance.",
    modulesCount: 9,
    durationLabel: "7+ hours (9 Modules)",
    level: "Intermediate to Executive",
    isPaid: true,
    price: {
      amount: "1,499",
      was: "2,999",
      currency: "NPR",
      intro: true,
    },
    salt: "RDT-AIHP-2026",
    freePreviewIds: ["h1"],
    storageKey: "aiHealthPro_v1",
    certCodePrefix: "RDT-AIHP",
    certTitle: "AI for Healthcare Professionals",
    certSubtitle: "Professional Certificate Programme · ~8 Hours",
    certDesc:
      "has successfully completed all 9 modules and assessments of AI for Healthcare Professionals, an applied programme covering artificial intelligence in clinical diagnosis and decision support, real-world deployments in patient care, clinical risk and patient safety, health equity, and the governance of AI in health systems.",
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
    theme: {
      primaryColor: "#059669",
      badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      badgeText: "text-emerald-500",
      accentColor: "#10b981",
    },
  },
  finance: {
    id: "finance",
    name: "AI for Financial Professionals",
    shortName: "AI for Banking & Finance",
    badge: "Banking & FinTech Track",
    tagline: "Credit Scoring ML, Fraud Detection, Generative Banking & NRB AI Governance",
    description:
      "A comprehensive, self-contained programme for bankers, risk managers, credit officers, fintech founders, and board executives — covering algorithmic credit assessment, AML network analysis, customer-facing generative AI, model risk, and compliance with Nepal Rastra Bank AI Guidelines.",
    modulesCount: 8,
    durationLabel: "7+ hours (8 Modules)",
    level: "Intermediate to Executive",
    isPaid: true,
    price: {
      amount: "1,499",
      was: "2,999",
      currency: "NPR",
      intro: true,
    },
    salt: "RDT-AIFP-2026",
    freePreviewIds: ["m1"],
    storageKey: "aiFinPro_v1",
    certCodePrefix: "RDT-AIFP",
    certTitle: "AI for Financial Professionals",
    certSubtitle: "Professional Certificate Programme · ~8 Hours",
    certDesc:
      "has successfully completed all eight modules and assessments of AI for Financial Professionals, an applied programme covering artificial intelligence in credit risk, financial crime, banking operations, AI risk management and governance aligned to the regulatory expectations of Nepal's financial sector.",
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
    theme: {
      primaryColor: "#1e3a8a",
      badgeBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      badgeText: "text-blue-500",
      accentColor: "#d97706",
    },
  },
  "finance-advanced": {
    id: "finance-advanced",
    name: "Advanced AI for Finance Professionals",
    shortName: "Advanced AI for Finance",
    badge: "Advanced Level 2 Track",
    tagline: "Architecting, Governing & Leading Enterprise Financial AI",
    description:
      "An advanced follow-on programme for senior bankers, risk managers, enterprise architects, and finance executives moving from practitioner to institutional AI leader — covering foundation model capability stacks, advanced model risk validation, deep explainability, agentic systems, systemic risk, and target operating models.",
    modulesCount: 12,
    durationLabel: "10.5+ hours (12 Modules)",
    level: "Advanced · Level 2",
    isPaid: true,
    price: {
      amount: "2,499",
      was: "3,999",
      currency: "NPR",
      intro: true,
    },
    salt: "RDT-AIFA-2026",
    freePreviewIds: ["a1"],
    storageKey: "aiFinAdv_v1",
    certCodePrefix: "RDT-AIFA",
    certTitle: "Advanced AI for Finance Professionals",
    certSubtitle: "Executive Certificate Programme · Advanced Level 2",
    certDesc:
      "has successfully completed all twelve advanced modules and assessments of Advanced AI for Finance Professionals, demonstrating mastery in enterprise AI capability architectures, advanced model risk validation, explainability frameworks, agentic workflow governance, and target operating models for financial institutions.",
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
    theme: {
      primaryColor: "#7c3aed",
      badgeBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      badgeText: "text-purple-500",
      accentColor: "#B8892B",
    },
  },
};

/* =============================================================
   CRYPTOGRAPHIC ACCESS CODE VALIDATION & GENERATOR
   ============================================================= */
const B32 = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

export function fnv(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

export function checksumFor(salt: string, body: string): string {
  let h = fnv(salt + "|" + body);
  let o = "";
  for (let i = 0; i < 4; i++) {
    o += B32[h % 32];
    h = Math.floor(h / 32);
  }
  return o;
}

export function validateAccessCode(rawCode: string, salt: string): boolean {
  const c = String(rawCode || "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
  const m = c.match(/^RDT([A-Z0-9]{5})([A-Z0-9]{4})$/);
  if (!m) return false;
  return checksumFor(salt, m[1]) === m[2];
}

export function generateAccessCode(salt: string): string {
  let body = "";
  for (let i = 0; i < 5; i++) {
    body += B32[Math.floor(Math.random() * B32.length)];
  }
  const check = checksumFor(salt, body);
  return `RDT${body}${check}`;
}

export function generateCertificateReference(
  prefix: string,
  name: string,
  email: string,
  dateStr?: string,
): string {
  const s = (name || "") + (email || "") + (dateStr || "");
  let hsh = 0;
  for (let i = 0; i < s.length; i++) {
    hsh = ((hsh << 5) - hsh + s.charCodeAt(i)) | 0;
  }
  const y = new Date(dateStr || Date.now()).getFullYear();
  return `${prefix}-${y}-${Math.abs(hsh).toString(36).toUpperCase().padStart(6, "0").slice(0, 6)}`;
}

/* =============================================================
   INDUSTRY SOURCES & RESEARCH LIBRARY
   ============================================================= */
export interface SourceItem {
  org: string;
  title: string;
  summary: string;
}

export const HEALTHCARE_SOURCES: SourceItem[] = [
  {
    org: "World Economic Forum & BCG",
    title: "The Future of AI-Enabled Health: Leading the Way (January 2025)",
    summary:
      "Source of the six pivotal transitions, the three barriers to scaling AI in health, market growth projections, and the framing of leapfrogging opportunities for low- and middle-income countries.",
  },
  {
    org: "OpenAI",
    title: "AI as a Healthcare Ally (January 2026)",
    summary:
      "Analysis of anonymised ChatGPT usage showing the scale of public health-seeking behaviour, out-of-hours patterns, rural access gaps, and documented cases of AI-assisted care navigation and escalation.",
  },
  {
    org: "UNDP Human Development Report Office",
    title:
      "AI and Big Data Deployment in Health Care: Governance Solutions for Developing Country Governments (Miriam Stankovich)",
    summary:
      "Background paper for the 2022 Special Report on Human Security. Source of workforce and access statistics, developing-country deployment examples including CAD4TB, Ubenwa and retinopathy screening, and governance recommendations.",
  },
  {
    org: "World Health Organization",
    title: "Artificial Intelligence and Evidence-Informed Policy — discussion paper (2026)",
    summary:
      "WHO guidance on the intersection of AI with evidence-informed health policy-making, including risks, challenges and governance frameworks.",
  },
  {
    org: "npj Health Systems (Nature)",
    title:
      "Driving global health equity with artificial intelligence: the Global Initiative on AI for Health (GI-AI4H)",
    summary:
      "Raskar, Chopra, AlSalamah, Farlow, Kalra et al. Source of the RISE framework and the ENABLE / FACILITATE / IMPLEMENT pillars of the WHO-ITU-WIPO initiative.",
  },
  {
    org: "Boston Consulting Group",
    title: "The Stairway to GenAI Impact in the Health Care Industry (April 2025)",
    summary:
      "Source of adoption benchmarks across healthcare segments, projected OPEX and revenue effects, the health workforce shortfall projection, and the three success factors for scaling.",
  },
  {
    org: "Boston Consulting Group / BCG X",
    title: "How AI Agents and Tech Will Transform Health Care in 2026 (December 2025)",
    summary:
      "Source of the 10-20-70 rule, ambient AI scribe adoption, precision medicine outlook, and guidance on workforce augmentation and AI literacy.",
  },
  {
    org: "KPMG & FICCI (India)",
    title: "AI in Healthcare: Reimagine care with AI-driven transformation (October 2025)",
    summary:
      "Indian healthcare use cases across the value chain — public health, hospital operations, clinical screening, documentation and patient engagement — with direct relevance to comparable South Asian systems.",
  },
  {
    org: "KPMG",
    title:
      "Intelligent Healthcare: A blueprint for creating value through AI-driven transformation (June 2025)",
    summary:
      "Executive research on AI value realisation in healthcare organisations, ROI measurement and the phased journey to an intelligent healthcare organisation.",
  },
  {
    org: "Boston Consulting Group",
    title:
      "A (Gen)AI Pathfinder: Unlock the potential of (Gen)AI in health insurance (August 2024)",
    summary:
      "Source of health insurance and payer applications, operational efficiency estimates, and the four-pillar operating model for scaling responsibly.",
  },
  {
    org: "Nepal — National Regulatory Framework",
    title: "Privacy Act (2075), Health Sector Regulation & Institutional Ethics Oversight",
    summary:
      "The governing local framework for health data and clinical research in Nepal. Requirements continue to evolve — always confirm the current position with your institution's ethics committee and the relevant national authority.",
  },
];

export const FINANCE_SOURCES: SourceItem[] = [
  {
    org: "Ernst & Young (EY)",
    title: "AI Bank White Paper: Reconstructing the Financial Paradigm through Intelligent Agents",
    summary:
      "EY Greater China. Source of the five-stage AI Bank Maturity Assessment Scheme, the five assessment dimensions, and global findings on AI governance, talent structure and scalability. Also draws on joint EY–Institute of International Finance (IIF) research on data quality as the primary barrier to AI adoption.",
  },
  {
    org: "Boston Consulting Group (BCG)",
    title: "Generative AI in Banking: Six Myths You Need to Ignore (October 2024)",
    summary:
      "Source of the two deployment archetypes (the model as expert versus the model as a tool around a deterministic core), the chatbot control spectrum, the distinction between off-the-shelf and production-grade RAG, and the separation of generative and predictive AI technology stacks.",
  },
  {
    org: "SAS",
    title: "From Algorithms to Impact: Banking's AI Future",
    summary:
      "Source of adoption and outcome data for generative AI in banking, departmental deployment patterns, and practitioner perspectives from Millennium BCP, Banorte, Old National Bank and Intesa Sanpaolo. Includes Juniper Research projections for banking AI spend reaching $85B by 2030.",
  },
  {
    org: "Salesforce",
    title: "A Guide to AI in Financial Services for Southeast Asia",
    summary:
      "Source of the three implementation pathways (automate, reimagine, power new models), consumer trust data, and estimates for compliance and service cost reduction. Cites McKinsey analysis on the revenue potential of AI in banking.",
  },
  {
    org: "FIS",
    title: "AI Alchemy: Stepping Forward into the Future of Financial Services",
    summary:
      "Ameet Bhatt, FIS. Source of the machine learning / predictive AI / generative AI taxonomy and the six-part risk and ethical framework for generative AI in financial services, including AI voice-cloning fraud and the cost of AI ownership.",
  },
  {
    org: "University of Oxford",
    title: "AI Preparedness in Established Financial Services Firms (2025)",
    summary:
      "Oxford Future of Finance and Technology Initiative, Saïd Business School (Kilminster & Ozcan, 2025), in collaboration with Finbridge Global. Source of the AI preparedness precursors, the paradox of caution, findings on efficiency business cases, shadow AI as a governance trigger, and recommended adoption practices.",
  },
  {
    org: "Nepal Rastra Bank",
    title: "Artificial Intelligence Guidelines and Related Circulars",
    summary:
      "The governing regulatory framework for licensed financial institutions in Nepal (Classes A–D, PSOs, PSPs), covering board accountability, risk classification, explainability, privacy and consent, and ongoing model monitoring.",
  },
];

/* =============================================================
   INTERACTIVE SVG DIAGRAMS ENGINE (22 Total Modules)
   ============================================================= */
export function renderSvgDiagram(diagramId: string): string {
  // ── 1. FOUNDATIONS DIAGRAMS (l1 to l5) ──
  if (diagramId === "l1") {
    const layers = [
      { x: 150, n: 3, c: "#31507f" },
      { x: 340, n: 4, c: "#31507f" },
      { x: 530, n: 2, c: "#C8102E" },
    ];
    const top = 34,
      bot = 176;
    const ys = (n: number) =>
      Array.from(
        { length: n },
        (_, i) => top + (n === 1 ? (bot - top) / 2 : ((bot - top) * i) / (n - 1)),
      );
    const pos = layers.map((L) => ys(L.n).map((y) => ({ x: L.x, y })));
    let lines = "",
      nodes = "";
    for (let li = 0; li < pos.length - 1; li++) {
      pos[li].forEach((a) =>
        pos[li + 1].forEach((b) => {
          lines += `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="#7FA0D0" stroke-opacity="0.25" stroke-width="1.3" stroke-dasharray="4 6"><animate attributeName="stroke-dashoffset" from="20" to="0" dur="1.8s" repeatCount="indefinite"/></line>`;
        }),
      );
    }
    pos.forEach((layer, li) =>
      layer.forEach((p, i) => {
        nodes += `<circle cx="${p.x}" cy="${p.y}" r="13" fill="${layers[li].c}" stroke="#CADCFC" stroke-width="1.4"><animate attributeName="opacity" values="0.55;1;0.55" dur="${2 + (i % 3) * 0.5}s" repeatCount="indefinite"/></circle>`;
      }),
    );
    const lab = `<text x="150" y="202" fill="#9DB8E6" font-size="12" text-anchor="middle">Input</text><text x="340" y="202" fill="#9DB8E6" font-size="12" text-anchor="middle">Hidden layers</text><text x="530" y="202" fill="#9DB8E6" font-size="12" text-anchor="middle">Output</text>`;
    return `<svg viewBox="0 0 680 214" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${lines}${nodes}${lab}</svg>`;
  }

  if (diagramId === "l2") {
    const tags = ["Role", "Task", "Context", "Format", "Constraints"];
    return `<svg viewBox="0 0 680 210" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">
      <rect x="30" y="45" width="180" height="125" rx="10" fill="#22386A" stroke="#7FA0D0" stroke-opacity="0.5"/>
      <text x="120" y="70" fill="#CADCFC" font-size="13" font-weight="bold" text-anchor="middle">YOUR PROMPT</text>
      ${tags.map((t, i) => `<rect x="50" y="${83 + i * 16}" width="9" height="9" rx="2" fill="#FF6B7A"/><text x="66" y="${91 + i * 16}" fill="#AFC4E6" font-size="11">${t}</text>`).join("")}
      <path d="M214 107 h52" stroke="#7FA0D0" stroke-width="2" marker-end="url(#ar)"/>
      <rect x="272" y="72" width="132" height="72" rx="12" fill="#C8102E"><animate attributeName="opacity" values="0.82;1;0.82" dur="2.2s" repeatCount="indefinite"/></rect>
      <text x="338" y="103" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">AI MODEL</text>
      <text x="338" y="122" fill="#FFD2D7" font-size="10" text-anchor="middle">aims its knowledge</text>
      <path d="M408 107 h52" stroke="#7FA0D0" stroke-width="2" marker-end="url(#ar)"/>
      <rect x="466" y="58" width="188" height="100" rx="10" fill="#1E9E68" fill-opacity="0.16" stroke="#5FC98D" stroke-opacity="0.6"/>
      <text x="560" y="90" fill="#B9F0D0" font-size="13" font-weight="bold" text-anchor="middle">GREAT ANSWER</text>
      <text x="560" y="112" fill="#CFE9DA" font-size="10" text-anchor="middle">specific, useful, exactly</text>
      <text x="560" y="126" fill="#CFE9DA" font-size="10" text-anchor="middle">what you needed</text>
      <defs><marker id="ar" markerWidth="9" markerHeight="9" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#7FA0D0"/></marker></defs>
    </svg>`;
  }

  if (diagramId === "l3") {
    const tiles = 5,
      tw = 112,
      gap = 16,
      y = 34,
      size = 112,
      x0 = 28;
    let g = "";
    for (let t = 0; t < tiles; t++) {
      const x = x0 + t * (tw + gap),
        clarity = t / (tiles - 1);
      g += `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="10" fill="#0e1b38" stroke="#3A5680"/>`;
      const dots = Math.round(64 * (1 - clarity));
      let s = t * 131 + 7;
      for (let d = 0; d < dots; d++) {
        s = (s * 1103515245 + 12345) & 0x7fffffff;
        const px = x + 6 + (s % (size - 12));
        s = (s * 1103515245 + 12345) & 0x7fffffff;
        const py = y + 6 + (s % (size - 12));
        g += `<rect x="${px}" y="${py}" width="2.4" height="2.4" fill="#8FB0E0" fill-opacity="${(0.5 * (1 - clarity) + 0.12).toFixed(2)}"/>`;
      }
      if (clarity > 0) {
        const cx = x + size / 2,
          cy = y + size / 2,
          r = 16 * clarity + 6;
        g += `<circle cx="${cx}" cy="${cy}" r="${r.toFixed(1)}" fill="#C8102E" fill-opacity="${clarity.toFixed(2)}"/><circle cx="${(cx - 7 * clarity).toFixed(1)}" cy="${(cy - 6 * clarity).toFixed(1)}" r="${(3 * clarity).toFixed(1)}" fill="#0e1b38" fill-opacity="${clarity.toFixed(2)}"/>`;
      }
      if (t < tiles - 1)
        g += `<path d="M${x + size + 2} ${y + size / 2} h${gap - 4}" stroke="#7FA0D0" stroke-width="1.4"/>`;
    }
    g += `<text x="${x0 + size / 2}" y="${y + size + 22}" fill="#9DB8E6" font-size="11" text-anchor="middle">pure noise</text><text x="${x0 + 4 * (tw + gap) + size / 2}" y="${y + size + 22}" fill="#9DB8E6" font-size="11" text-anchor="middle">clear image</text>`;
    return `<svg viewBox="0 0 680 190" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  if (diagramId === "l4") {
    const steps = ["Remember", "Understand", "Apply", "Analyse", "Evaluate", "Create"];
    const n = steps.length,
      x0 = 52,
      baseY = 182,
      sw = 94;
    let g = "";
    const pts: string[] = [];
    for (let i = 0; i < n; i++) {
      const x = x0 + i * sw,
        h = (i + 1) * 24,
        yy = baseY - h;
      g += `<rect x="${x}" y="${yy}" width="${sw - 8}" height="${h}" rx="4" fill="#22386A" stroke="#3A5680"/>`;
      g += `<rect x="${x}" y="${yy}" width="${sw - 8}" height="6" fill="${i >= 4 ? "#C8102E" : "#2E6FB0"}"/>`;
      g += `<text x="${x + (sw - 8) / 2}" y="${yy - 6}" fill="#CADCFC" font-size="10.5" text-anchor="middle">${steps[i]}</text>`;
      pts.push(`${x + (sw - 8) / 2},${yy - 15}`);
    }
    g += `<circle r="5" fill="#FF6B7A"><animateMotion dur="6s" repeatCount="indefinite" path="M${pts.join(" L")}"/></circle>`;
    return `<svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}<text x="52" y="196" fill="#9DB8E6" font-size="11">basic thinking →</text><text x="600" y="196" fill="#9DB8E6" font-size="11" text-anchor="end">→ deep thinking</text></svg>`;
  }

  if (diagramId === "l5") {
    const gates = [
      "Could it be wrong?",
      "Where is it from?",
      "Who might it hurt?",
      "Am I being honest?",
    ];
    const x0 = 160,
      gapx = 92,
      y = 38,
      gh = 104;
    let g = `<rect x="18" y="78" width="112" height="48" rx="8" fill="#22386A" stroke="#3A5680"/><text x="74" y="99" fill="#CADCFC" font-size="11" text-anchor="middle">AI output</text><text x="74" y="114" fill="#9DB8E6" font-size="9.5" text-anchor="middle">unverified</text>`;
    gates.forEach((t, i) => {
      const x = x0 + i * gapx;
      g += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + gh}" stroke="#7FA0D0" stroke-opacity="0.45" stroke-width="1.3"/><circle cx="${x}" cy="${y + gh / 2}" r="11" fill="none" stroke="#FFD27A" stroke-width="1.5"/><text x="${x}" y="${y + gh / 2 + 4}" fill="#FFD27A" font-size="12" text-anchor="middle">?</text><text x="${x}" y="${y + gh + 15}" fill="#AFC4E6" font-size="9" text-anchor="middle">${t}</text>`;
    });
    const outx = x0 + gates.length * gapx;
    g += `<rect x="${outx}" y="78" width="124" height="48" rx="8" fill="#1E9E68" fill-opacity="0.18" stroke="#5FC98D"/><text x="${outx + 62}" y="98" fill="#B9F0D0" font-size="11.5" font-weight="bold" text-anchor="middle">Trusted</text><text x="${outx + 62}" y="114" fill="#CFE9DA" font-size="9.5" text-anchor="middle">✓ verified</text>`;
    g += `<circle r="6" fill="#FF6B7A"><animate attributeName="cx" from="130" to="${outx}" dur="4.5s" repeatCount="indefinite"/></circle>`;
    return `<svg viewBox="0 0 680 172" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  // ── 2. HEALTHCARE DIAGRAMS (h1 to h9) ──
  if (diagramId === "h1") {
    let g = "";
    const cx = 250,
      cy = 112;
    [
      [210, "#1c3563"],
      [160, "#24406F"],
      [112, "#2E6FB0"],
      [64, "#C8102E"],
    ].forEach((r, i) => {
      g += `<ellipse cx="${cx}" cy="${cy}" rx="${r[0]}" ry="${(r[0] as number) * 0.47}" fill="${r[1]}" fill-opacity="${0.35 + i * 0.16}" stroke="#8FB0E0" stroke-opacity="0.35"/>`;
    });
    g += `<text x="${cx}" y="${cy - 72}" fill="#CFDCEF" font-size="11.5" text-anchor="middle" font-weight="bold">ARTIFICIAL INTELLIGENCE</text>`;
    g += `<text x="${cx}" y="${cy - 46}" fill="#CFDCEF" font-size="11" text-anchor="middle">Machine Learning</text>`;
    g += `<text x="${cx}" y="${cy - 22}" fill="#DDE8F6" font-size="10.5" text-anchor="middle">Deep Learning</text>`;
    g += `<text x="${cx}" y="${cy + 6}" fill="#fff" font-size="11" text-anchor="middle" font-weight="bold">Generative AI</text>`;
    const notes = [
      ["AI", "Drug-interaction alerts", 40],
      ["ML", "Risk & outcome prediction", 72],
      ["DL", "Imaging, pathology, retina", 104],
      ["GenAI", "Notes, summaries, translation", 136],
    ];
    notes.forEach((nt) => {
      g += `<rect x="500" y="${(nt[2] as number) - 14}" width="172" height="26" rx="4" fill="#22386A" stroke="#3A5680"/><text x="510" y="${(nt[2] as number) + 3}" fill="#CFDCEF" font-size="10"><tspan font-weight="bold" fill="#F0DCB4">${nt[0]}</tspan>  ${nt[1]}</text>`;
    });
    return `<svg viewBox="0 0 690 230" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  if (diagramId === "h2") {
    let g = "";
    const src = ["Paper case notes", "Hospital system", "Lab & imaging", "Programme registries"];
    src.forEach((s, i) => {
      const y = 22 + i * 44;
      g += `<rect x="12" y="${y}" width="142" height="34" rx="5" fill="#22386A" stroke="#3A5680"/><text x="83" y="${y + 21}" fill="#CFDCEF" font-size="10" text-anchor="middle">${s}</text><path d="M156 ${y + 17} L204 106" stroke="#7FA0D0" stroke-opacity="0.45" stroke-width="1.2"/>`;
    });
    g += `<rect x="206" y="76" width="132" height="60" rx="7" fill="#C8102E"/><text x="272" y="100" fill="#fff" font-size="11" text-anchor="middle" font-weight="bold">LINKED</text><text x="272" y="117" fill="#FFD8DD" font-size="9.5" text-anchor="middle">patient record</text>`;
    g += `<text x="272" y="152" fill="#FF9BA6" font-size="9.5" text-anchor="middle">needs a consistent patient ID</text>`;
    g += `<path d="M340 106 h42" stroke="#7FA0D0" stroke-width="1.6" marker-end="url(#ah2)"/>`;
    [
      ["Training", "learns the pattern", "#2E6FB0", 26],
      ["Validation", "tunes the model", "#4A85C4", 84],
      ["Test / external", "proves it generalises", "#1E7A52", 142],
    ].forEach((s) => {
      g += `<rect x="390" y="${(s[3] as number) + 8}" width="278" height="42" rx="5" fill="${s[2]}" fill-opacity="0.28" stroke="${s[2]}"/><text x="404" y="${(s[3] as number) + 27}" fill="#E7EEF9" font-size="10.5" font-weight="bold">${s[0]}</text><text x="404" y="${(s[3] as number) + 41}" fill="#A8C0E4" font-size="9">${s[1]}</text>`;
    });
    g += `<defs><marker id="ah2" markerWidth="9" markerHeight="9" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#7FA0D0"/></marker></defs>`;
    return `<svg viewBox="0 0 690 206" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  if (diagramId === "h3") {
    const modes = [
      ["ASSISTIVE", "Clinician reads independently", "model offers second opinion", "#2E6FB0"],
      ["TRIAGE", "All cases still read", "model reorders the worklist", "#C8102E"],
      ["AUTONOMOUS", "No human review", "narrow, validated, approved only", "#8a6a1e"],
    ];
    let g = "";
    const w = 206,
      gap = 16,
      x0 = 20;
    modes.forEach((m, i) => {
      const x = x0 + i * (w + gap);
      g += `<rect x="${x}" y="40" width="${w}" height="96" rx="7" fill="#22386A" stroke="${m[3]}" stroke-width="1.6"/>`;
      g += `<rect x="${x}" y="40" width="${w}" height="6" fill="${m[3]}"/>`;
      g += `<text x="${x + w / 2}" y="70" fill="#fff" font-size="12.5" text-anchor="middle" font-weight="bold">${m[0]}</text>`;
      g += `<text x="${x + w / 2}" y="92" fill="#CFDCEF" font-size="10" text-anchor="middle">${m[1]}</text>`;
      g += `<text x="${x + w / 2}" y="110" fill="#A8C0E4" font-size="9.5" text-anchor="middle">${m[2]}</text>`;
      g += `<text x="${x + w / 2}" y="128" fill="${m[3] === "#8a6a1e" ? "#F0DCB4" : "#8FB0E0"}" font-size="9" text-anchor="middle">${i === 0 ? "lowest risk" : i === 1 ? "best value-to-risk" : "highest risk"}</text>`;
    });
    g += `<text x="345" y="24" fill="#F0DCB4" font-size="11" text-anchor="middle" font-weight="bold">THREE MODES OF CLINICAL DEPLOYMENT</text>`;
    g += `<text x="345" y="158" fill="#A8C0E4" font-size="10" text-anchor="middle">Clarify the mode before discussing anything else — the same algorithm carries very different risk.</text>`;
    return `<svg viewBox="0 0 690 170" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  if (diagramId === "h4") {
    const cases = [
      ["TB X-ray triage", "Tanzania · Zambia"],
      ["Retinopathy screening", "Zambia"],
      ["Ubenwa cry analysis", "Nigeria"],
      ["Ambient AI scribes", "Global"],
      ["Patient navigation", "Worldwide"],
      ["Telemedicine triage", "India · Nepal"],
      ["Surveillance", "Public health"],
      ["Hospital operations", "Global"],
    ];
    let g = "";
    const w = 158,
      h = 52,
      cols = 4;
    cases.forEach((c, i) => {
      const x = 12 + (i % cols) * (w + 8),
        y = 30 + Math.floor(i / cols) * (h + 10);
      const hot = i < 3;
      g += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#22386A" stroke="${hot ? "#C8102E" : "#3A5680"}"/>`;
      g += `<rect x="${x}" y="${y}" width="4" height="${h}" fill="${hot ? "#C8102E" : "#2E6FB0"}"/>`;
      g += `<text x="${x + 13}" y="${y + 22}" fill="#fff" font-size="10.5" font-weight="bold">${c[0]}</text>`;
      g += `<text x="${x + 13}" y="${y + 38}" fill="#A8C0E4" font-size="9">${c[1]}</text>`;
    });
    g += `<text x="345" y="18" fill="#F0DCB4" font-size="11" text-anchor="middle" font-weight="bold">DEPLOYED TODAY — RED BORDER = MOST TRANSFERABLE TO NEPAL</text>`;
    return `<svg viewBox="0 0 690 150" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  if (diagramId === "h5") {
    let g = "";
    const box = (
      x: number,
      y: number,
      w: number,
      h: number,
      fill: string,
      stroke: string,
      t1: string,
      t2: string,
      c1: string,
      c2: string,
    ) =>
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${fill}" stroke="${stroke}"/><text x="${x + w / 2}" y="${y + h / 2 - 3}" fill="${c1}" font-size="11" text-anchor="middle" font-weight="bold">${t1}</text>${t2 ? `<text x="${x + w / 2}" y="${y + h / 2 + 13}" fill="${c2}" font-size="9.5" text-anchor="middle">${t2}</text>` : ""}`;
    g += box(
      12,
      72,
      108,
      54,
      "#22386A",
      "#3A5680",
      "Clinician asks",
      '"What is our..."',
      "#fff",
      "#A8C0E4",
    );
    g += `<path d="M122 99 h32" stroke="#7FA0D0" stroke-width="1.5" marker-end="url(#ah5)"/>`;
    g += box(
      156,
      72,
      116,
      54,
      "#2E6FB0",
      "#8FB0E0",
      "RETRIEVE",
      "your protocols",
      "#fff",
      "#DDE8F6",
    );
    g += box(
      156,
      10,
      116,
      44,
      "#12274d",
      "#3A5680",
      "Formulary · guidelines",
      "SOPs · national protocols",
      "#F0DCB4",
      "#A8C0E4",
    );
    g += `<path d="M214 56 v14" stroke="#7FA0D0" stroke-width="1.4"/>`;
    g += `<path d="M274 99 h32" stroke="#7FA0D0" stroke-width="1.5" marker-end="url(#ah5)"/>`;
    g += box(308, 72, 116, 54, "#C8102E", "#FF6B7A", "LLM", "answers only from", "#fff", "#FFD8DD");
    g += `<text x="366" y="140" fill="#FF9BA6" font-size="9.5" text-anchor="middle">retrieved passages</text>`;
    g += `<path d="M426 99 h32" stroke="#7FA0D0" stroke-width="1.5" marker-end="url(#ah5)"/>`;
    g += box(460, 62, 124, 74, "#1E7A52", "#5FC98D", "ANSWER", "with citations", "#fff", "#CFE9DA");
    g += `<text x="522" y="152" fill="#8FD9B3" font-size="9.5" text-anchor="middle">✓ checkable by a clinician</text>`;
    g += `<text x="345" y="176" fill="#A8C0E4" font-size="10" text-anchor="middle">Grounding answers in your own approved protocols is what constrains hallucination.</text>`;
    g += `<defs><marker id="ah5" markerWidth="9" markerHeight="9" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#7FA0D0"/></marker></defs>`;
    return `<svg viewBox="0 0 690 190" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  if (diagramId === "h6") {
    const risks = [
      ["Patient harm", "missed & false findings"],
      ["Bias & equity", "unlike populations"],
      ["Dataset shift", "silent degradation"],
      ["Automation bias", "deference & deskilling"],
      ["Privacy", "shadow AI · re-identification"],
      ["Cyber & dependency", "downtime is a safety issue"],
      ["Vendor risk", "pilots that end"],
      ["Legal & professional", "clinician carries the risk"],
    ];
    let g = "";
    const w = 158,
      h = 58,
      cols = 4;
    risks.forEach((r, i) => {
      const x = 12 + (i % cols) * (w + 8),
        y = 10 + Math.floor(i / cols) * (h + 10);
      g += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#22386A" stroke="#C8102E" stroke-opacity="0.5"/>`;
      g += `<rect x="${x}" y="${y}" width="4" height="${h}" fill="#C8102E"/>`;
      g += `<text x="${x + 14}" y="${y + 24}" fill="#fff" font-size="11.5" font-weight="bold">${r[0]}</text>`;
      g += `<text x="${x + 14}" y="${y + 41}" fill="#A8C0E4" font-size="9">${r[1]}</text>`;
    });
    g += `<text x="345" y="152" fill="#F0DCB4" font-size="10.5" text-anchor="middle" font-weight="bold">In healthcare, an AI failure can mean patient harm — assess all eight</text>`;
    return `<svg viewBox="0 0 690 164" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  if (diagramId === "h7") {
    const q = [
      ["R", "Robust Capacity Building", "Train and empower local professionals", "#C8102E"],
      ["I", "Inclusive Research Agenda", "Localisation over one-size-fits-all", "#2E6FB0"],
      [
        "S",
        "Smart & Accessible Infrastructure",
        "Affordable, interoperable, low-resource ready",
        "#B8892B",
      ],
      ["E", "Equitable & Secure Data", "Fair, safe, representative data practices", "#1E7A52"],
    ];
    let g = "";
    const w = 320,
      h = 76;
    q.forEach((v, i) => {
      const x = 14 + (i % 2) * (w + 12),
        y = 32 + Math.floor(i / 2) * (h + 12);
      g += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="${v[3]}" fill-opacity="0.17" stroke="${v[3]}"/>`;
      g += `<circle cx="${x + 30}" cy="${y + 38}" r="19" fill="${v[3]}"/><text x="${x + 30}" y="${y + 44}" fill="#fff" font-size="17" text-anchor="middle" font-weight="bold">${v[0]}</text>`;
      g += `<text x="${x + 60}" y="${y + 32}" fill="#fff" font-size="12" font-weight="bold">${v[1]}</text>`;
      g += `<text x="${x + 60}" y="${y + 52}" fill="#CFDCEF" font-size="9.5">${v[2]}</text>`;
    });
    g += `<text x="345" y="20" fill="#F0DCB4" font-size="11.5" text-anchor="middle" font-weight="bold">THE RISE FRAMEWORK — WHO · ITU · WIPO (GI-AI4H)</text>`;
    g += `<text x="345" y="216" fill="#A8C0E4" font-size="10" text-anchor="middle">Modular and mutually reinforcing — countries prioritise according to their own capacity and needs.</text>`;
    return `<svg viewBox="0 0 690 228" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  if (diagramId === "h8") {
    const steps = [
      "Assess need",
      "Validate locally",
      "Approve",
      "Set threshold",
      "Deploy",
      "Monitor",
      "Review / withdraw",
    ];
    const cx = 345,
      cy = 122,
      r = 76;
    let g = "";
    g += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#3A5680" stroke-width="1.4" stroke-dasharray="5 5"/>`;
    steps.forEach((s, i) => {
      const a = (Math.PI * 2 * i) / steps.length - Math.PI / 2;
      const x = cx + Math.cos(a) * r,
        y = cy + Math.sin(a) * r,
        isV = i === 1;
      g += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="15" fill="${isV ? "#C8102E" : "#24406F"}" stroke="${isV ? "#FFD8DD" : "#8FB0E0"}" stroke-width="1.4"/>`;
      g += `<text x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" fill="#fff" font-size="9" text-anchor="middle" font-weight="bold">${i + 1}</text>`;
      const lx = cx + Math.cos(a) * (r + 46),
        ly = cy + Math.sin(a) * (r + 26);
      g += `<text x="${lx.toFixed(1)}" y="${(ly + 4).toFixed(1)}" fill="${isV ? "#FF9BA6" : "#CFDCEF"}" font-size="10" text-anchor="middle" font-weight="${isV ? "bold" : "normal"}">${s}</text>`;
    });
    g += `<circle r="6" fill="#F0DCB4"><animateMotion dur="9s" repeatCount="indefinite" path="M${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.1} ${cy - r}"/></circle>`;
    g += `<text x="${cx}" y="${cy - 4}" fill="#F0DCB4" font-size="10" text-anchor="middle" font-weight="bold">CLINICAL AI</text><text x="${cx}" y="${cy + 11}" fill="#F0DCB4" font-size="10" text-anchor="middle" font-weight="bold">GOVERNANCE</text>`;
    g += `<text x="${cx}" y="258" fill="#A8C0E4" font-size="10" text-anchor="middle">Local validation is the step most often skipped — and the one that protects your patients.</text>`;
    return `<svg viewBox="0 0 690 270" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  if (diagramId === "h9") {
    let g = "";
    const total = 620,
      x0 = 35,
      y = 52,
      h = 54;
    const parts = [
      [10, "#2E6FB0", "Algorithms"],
      [20, "#B8892B", "Technology & data"],
      [70, "#C8102E", "People & processes"],
    ];
    let acc = 0;
    parts.forEach((p) => {
      const w = (total * (p[0] as number)) / 100,
        x = x0 + acc;
      g += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${p[1]}" fill-opacity="0.85" stroke="#0d1a35"/>`;
      g += `<text x="${x + w / 2}" y="${y + 26}" fill="#fff" font-size="${p[0] === 10 ? 12 : 16}" text-anchor="middle" font-weight="bold">${p[0]}%</text>`;
      g += `<text x="${x + w / 2}" y="${y + 44}" fill="#fff" font-size="${p[0] === 10 ? 8 : 10}" text-anchor="middle">${p[2]}</text>`;
      acc += w;
    });
    g += `<text x="345" y="30" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold">THE 10-20-70 RULE</text>`;
    g += `<text x="345" y="132" fill="#CFDCEF" font-size="11" text-anchor="middle">Most of the effort is people and process — not the model.</text>`;
    g += `<text x="345" y="152" fill="#A8C0E4" font-size="9.5" text-anchor="middle">If your implementation plan is mostly technical, it is inverted.</text>`;
    return `<svg viewBox="0 0 690 168" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  // ── 3. FINANCE DIAGRAMS (m1 to m8) ──
  if (diagramId === "m1") {
    let g = "";
    const cx = 250,
      cy = 112;
    [
      [210, "#1c3563", "AI"],
      [160, "#24406F", "Machine Learning"],
      [112, "#2E6FB0", "Deep Learning"],
      [64, "#C8102E", "Generative AI"],
    ].forEach((r, i) => {
      g += `<ellipse cx="${cx}" cy="${cy}" rx="${r[0]}" ry="${(r[0] as number) * 0.47}" fill="${r[1]}" fill-opacity="${0.35 + i * 0.16}" stroke="#8FB0E0" stroke-opacity="0.35"/>`;
    });
    g += `<text x="${cx}" y="${cy - 72}" fill="#CFDCEF" font-size="11.5" text-anchor="middle" font-weight="bold">ARTIFICIAL INTELLIGENCE</text>`;
    g += `<text x="${cx}" y="${cy - 46}" fill="#CFDCEF" font-size="11" text-anchor="middle">Machine Learning</text>`;
    g += `<text x="${cx}" y="${cy - 22}" fill="#DDE8F6" font-size="10.5" text-anchor="middle">Deep Learning</text>`;
    g += `<text x="${cx}" y="${cy + 6}" fill="#fff" font-size="11" text-anchor="middle" font-weight="bold">Generative AI</text>`;
    g += `<line x1="480" y1="42" x2="520" y2="42" stroke="#8FB0E0" stroke-width="1.2"/>`;
    const notes = [
      ["AI", "Rules-based fraud engines", 40],
      ["ML", "Credit scoring, AML detection", 72],
      ["DL", "Documents, voice, images", 104],
      ["GenAI", "Drafting, summarising, RAG", 136],
    ];
    notes.forEach((n) => {
      g += `<rect x="500" y="${(n[2] as number) - 14}" width="168" height="26" rx="4" fill="#22386A" stroke="#3A5680"/><text x="510" y="${(n[2] as number) + 3}" fill="#CFDCEF" font-size="10"><tspan font-weight="bold" fill="#F0DCB4">${n[0]}</tspan>  ${n[1]}</text>`;
    });
    return `<svg viewBox="0 0 690 230" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  if (diagramId === "m2") {
    let g = "";
    const silos = ["Core banking", "Origination", "Cards / digital", "KYC files"];
    silos.forEach((s, i) => {
      const y = 26 + i * 44;
      g += `<rect x="14" y="${y}" width="132" height="34" rx="5" fill="#22386A" stroke="#3A5680"/><text x="80" y="${y + 21}" fill="#CFDCEF" font-size="10.5" text-anchor="middle">${s}</text><path d="M148 ${y + 17} L200 106" stroke="#7FA0D0" stroke-opacity="0.5" stroke-width="1.2"/>`;
    });
    g += `<rect x="202" y="76" width="130" height="60" rx="7" fill="#C8102E"/><text x="267" y="101" fill="#fff" font-size="11.5" text-anchor="middle" font-weight="bold">JOINED</text><text x="267" y="118" fill="#FFD8DD" font-size="10" text-anchor="middle">customer dataset</text>`;
    g += `<path d="M334 106 h44" stroke="#7FA0D0" stroke-width="1.6" marker-end="url(#a2)"/>`;
    const sp = [
      ["Training", "60–70%", "#2E6FB0", 30],
      ["Validation", "15–20%", "#4A85C4", 88],
      ["Test (out-of-time)", "15–20%", "#1E7A52", 146],
    ];
    sp.forEach((s) => {
      g += `<rect x="386" y="${(s[3] as number) + 10}" width="276" height="44" rx="5" fill="${s[2]}" fill-opacity="0.28" stroke="${s[2]}"/><text x="400" y="${(s[3] as number) + 30}" fill="#E7EEF9" font-size="11" font-weight="bold">${s[0]}</text><text x="400" y="${(s[3] as number) + 45}" fill="#A8C0E4" font-size="9.5">${s[1]} of data</text>`;
    });
    g += `<defs><marker id="a2" markerWidth="9" markerHeight="9" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#7FA0D0"/></marker></defs>`;
    return `<svg viewBox="0 0 690 214" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  if (diagramId === "m3") {
    const st = [
      ["Origination", "Application scoring"],
      ["Underwriting", "Pricing · conditions"],
      ["Monitoring", "Early warning"],
      ["Collections", "Prioritisation"],
      ["Portfolio", "PD · LGD · ECL"],
    ];
    let g = "";
    const w = 124,
      gap = 14,
      x0 = 12;
    st.forEach((s, i) => {
      const x = x0 + i * (w + gap);
      g += `<rect x="${x}" y="44" width="${w}" height="${66}" rx="6" fill="${i === 2 ? "#C8102E" : "#22386A"}" stroke="${i === 2 ? "#FF6B7A" : "#3A5680"}"/>`;
      g += `<text x="${x + w / 2}" y="70" fill="#fff" font-size="11" text-anchor="middle" font-weight="bold">${s[0]}</text>`;
      g += `<text x="${x + w / 2}" y="90" fill="${i === 2 ? "#FFD8DD" : "#A8C0E4"}" font-size="9.5" text-anchor="middle">${s[1]}</text>`;
      if (i < st.length - 1)
        g += `<path d="M${x + w + 1} 77 h${gap - 3}" stroke="#7FA0D0" stroke-width="1.5" marker-end="url(#a3)"/>`;
    });
    g += `<text x="345" y="26" fill="#F0DCB4" font-size="11" text-anchor="middle" font-weight="bold">AI TOUCHPOINTS ACROSS THE CREDIT LIFECYCLE</text>`;
    g += `<rect x="${x0 + 2 * (w + gap)}" y="122" width="${w}" height="24" rx="4" fill="#C8102E" fill-opacity="0.22" stroke="#FF6B7A" stroke-dasharray="3 3"/><text x="${x0 + 2 * (w + gap) + w / 2}" y="138" fill="#FF9BA6" font-size="9.5" text-anchor="middle">highest early value</text>`;
    g += `<defs><marker id="a3" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L7 4 L0 8 z" fill="#7FA0D0"/></marker></defs>`;
    return `<svg viewBox="0 0 690 158" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  if (diagramId === "m4") {
    let g = "";
    const cx = 345,
      cy = 100;
    const outer: [number, number][] = [];
    for (let i = 0; i < 10; i++) {
      const a = (Math.PI * 2 * i) / 10;
      outer.push([cx + Math.cos(a) * 230, cy + Math.sin(a) * 72]);
    }
    const mid = [
      [cx - 96, cy - 30],
      [cx - 96, cy + 30],
      [cx + 96, cy - 30],
      [cx + 96, cy + 30],
    ];
    outer.forEach((p, i) => {
      const m = mid[i % 4];
      g += `<line x1="${p[0].toFixed(0)}" y1="${p[1].toFixed(0)}" x2="${m[0]}" y2="${m[1]}" stroke="#7FA0D0" stroke-opacity="0.32" stroke-width="1"/>`;
      g += `<circle cx="${p[0].toFixed(0)}" cy="${p[1].toFixed(0)}" r="7" fill="#2E6FB0" stroke="#8FB0E0" stroke-width="0.8"/>`;
    });
    mid.forEach((m) => {
      g += `<line x1="${m[0]}" y1="${m[1]}" x2="${cx}" y2="${cy}" stroke="#FF6B7A" stroke-opacity="0.55" stroke-width="1.6"/><circle cx="${m[0]}" cy="${m[1]}" r="11" fill="#24406F" stroke="#8FB0E0"/>`;
    });
    g += `<circle cx="${cx}" cy="${cy}" r="19" fill="#C8102E" stroke="#FFD8DD" stroke-width="1.6"><animate attributeName="r" values="18;21;18" dur="2.4s" repeatCount="indefinite"/></circle>`;
    g += `<text x="${cx}" y="${cy + 4}" fill="#fff" font-size="10" text-anchor="middle" font-weight="bold">HUB</text>`;
    g += `<text x="${cx}" y="24" fill="#F0DCB4" font-size="11" text-anchor="middle" font-weight="bold">NETWORK VIEW: MULE STRUCTURE</text>`;
    g += `<text x="60" y="188" fill="#A8C0E4" font-size="10">Many low-value accounts…</text><text x="${cx}" y="188" fill="#FF9BA6" font-size="10" text-anchor="middle">…funnel through collectors…</text><text x="632" y="188" fill="#A8C0E4" font-size="10" text-anchor="end">…into a single hub</text>`;
    return `<svg viewBox="0 0 690 200" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  if (diagramId === "m5") {
    let g = "";
    const box = (
      x: number,
      y: number,
      w: number,
      h: number,
      fill: string,
      stroke: string,
      t1: string,
      t2: string,
      c1: string,
      c2: string,
    ) =>
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${fill}" stroke="${stroke}"/><text x="${x + w / 2}" y="${y + h / 2 - 3}" fill="${c1}" font-size="11" text-anchor="middle" font-weight="bold">${t1}</text>${t2 ? `<text x="${x + w / 2}" y="${y + h / 2 + 13}" fill="${c2}" font-size="9.5" text-anchor="middle">${t2}</text>` : ""}`;
    g += box(
      12,
      72,
      104,
      54,
      "#22386A",
      "#3A5680",
      "Staff question",
      '"What is our…?"',
      "#fff",
      "#A8C0E4",
    );
    g += `<path d="M118 99 h34" stroke="#7FA0D0" stroke-width="1.5" marker-end="url(#a5)"/>`;
    g += box(
      154,
      72,
      116,
      54,
      "#2E6FB0",
      "#8FB0E0",
      "RETRIEVE",
      "search bank docs",
      "#fff",
      "#DDE8F6",
    );
    g += box(
      154,
      10,
      116,
      44,
      "#12274d",
      "#3A5680",
      "Policy · circulars",
      "KYC · product terms",
      "#F0DCB4",
      "#A8C0E4",
    );
    g += `<path d="M212 56 v14" stroke="#7FA0D0" stroke-width="1.4"/>`;
    g += `<path d="M272 99 h34" stroke="#7FA0D0" stroke-width="1.5" marker-end="url(#a5)"/>`;
    g += box(308, 72, 116, 54, "#C8102E", "#FF6B7A", "LLM", "answers only from", "#fff", "#FFD8DD");
    g += `<text x="366" y="140" fill="#FF9BA6" font-size="9.5" text-anchor="middle">retrieved passages</text>`;
    g += `<path d="M426 99 h34" stroke="#7FA0D0" stroke-width="1.5" marker-end="url(#a5)"/>`;
    g += box(462, 62, 120, 74, "#1E7A52", "#5FC98D", "ANSWER", "with citations", "#fff", "#CFE9DA");
    g += `<text x="522" y="152" fill="#8FD9B3" font-size="9.5" text-anchor="middle">✓ traceable · auditable</text>`;
    g += `<text x="345" y="176" fill="#A8C0E4" font-size="10" text-anchor="middle">Grounding the model in your own approved documents constrains hallucination.</text>`;
    g += `<defs><marker id="a5" markerWidth="9" markerHeight="9" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#7FA0D0"/></marker></defs>`;
    return `<svg viewBox="0 0 690 190" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  if (diagramId === "m6") {
    const risks = [
      ["Model risk", "drift · overfitting"],
      ["Bias", "discriminatory outcomes"],
      ["Privacy", "consent · shadow AI"],
      ["Cyber", "poisoning · injection"],
      ["Third party", "vendor · concentration"],
      ["Systemic", "herding · procyclicality"],
      ["Human", "automation bias"],
      ["Legal", "supervisory · reputational"],
    ];
    let g = "";
    const w = 158,
      h = 58,
      gx = 12,
      gy = 10,
      cols = 4;
    risks.forEach((r, i) => {
      const x = gx + (i % cols) * (w + 8),
        y = gy + Math.floor(i / cols) * (h + 10);
      g += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#22386A" stroke="#C8102E" stroke-opacity="0.5"/>`;
      g += `<rect x="${x}" y="${y}" width="4" height="${h}" fill="#C8102E"/>`;
      g += `<text x="${x + 14}" y="${y + 24}" fill="#fff" font-size="11.5" font-weight="bold">${r[0]}</text>`;
      g += `<text x="${x + 14}" y="${y + 41}" fill="#A8C0E4" font-size="9.5">${r[1]}</text>`;
    });
    g += `<text x="345" y="152" fill="#F0DCB4" font-size="10.5" text-anchor="middle" font-weight="bold">Eight categories a board-accountable institution must assess</text>`;
    return `<svg viewBox="0 0 690 164" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  if (diagramId === "m7") {
    const q = [
      ["REVENUE", "Personalisation · pricing · new segments", "#C8102E"],
      ["EFFICIENCY", "STP · document automation", "#2E6FB0"],
      ["RISK", "Early warning · fraud interception", "#B8892B"],
      ["EXPERIENCE", "Speed · availability · Nepali language", "#1E7A52"],
    ];
    let g = "";
    const w = 320,
      h = 72;
    q.forEach((v, i) => {
      const x = 14 + (i % 2) * (w + 12),
        y = 14 + Math.floor(i / 2) * (h + 12);
      g += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="${v[2]}" fill-opacity="0.17" stroke="${v[2]}"/>`;
      g += `<text x="${x + 18}" y="${y + 30}" fill="#fff" font-size="13" font-weight="bold">${v[0]}</text>`;
      g += `<text x="${x + 18}" y="${y + 51}" fill="#CFDCEF" font-size="10.5">${v[1]}</text>`;
    });
    g += `<text x="345" y="186" fill="#F0DCB4" font-size="10.5" text-anchor="middle">Every AI proposal should name its lever — and state how it will be measured.</text>`;
    return `<svg viewBox="0 0 690 198" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  if (diagramId === "m8") {
    const steps = ["Define", "Develop", "Validate", "Approve", "Deploy", "Monitor", "Retire"];
    const cx = 345,
      cy = 122,
      r = 76;
    let g = "";
    g += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#3A5680" stroke-width="1.4" stroke-dasharray="5 5"/>`;
    steps.forEach((s, i) => {
      const a = (Math.PI * 2 * i) / steps.length - Math.PI / 2;
      const x = cx + Math.cos(a) * r,
        y = cy + Math.sin(a) * r;
      const isV = s === "Validate";
      g += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="15" fill="${isV ? "#C8102E" : "#24406F"}" stroke="${isV ? "#FFD8DD" : "#8FB0E0"}" stroke-width="1.4"/>`;
      g += `<text x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" fill="#fff" font-size="9" text-anchor="middle" font-weight="bold">${i + 1}</text>`;
      const lx = cx + Math.cos(a) * (r + 40),
        ly = cy + Math.sin(a) * (r + 26);
      g += `<text x="${lx.toFixed(1)}" y="${(ly + 4).toFixed(1)}" fill="${isV ? "#FF9BA6" : "#CFDCEF"}" font-size="10.5" text-anchor="middle" font-weight="${isV ? "bold" : "normal"}">${s}</text>`;
    });
    g += `<text x="${cx}" y="${cy - 4}" fill="#F0DCB4" font-size="10.5" text-anchor="middle" font-weight="bold">MODEL</text><text x="${cx}" y="${cy + 11}" fill="#F0DCB4" font-size="10.5" text-anchor="middle" font-weight="bold">LIFECYCLE</text>`;
    g += `<text x="${cx}" y="258" fill="#A8C0E4" font-size="10" text-anchor="middle">Independent validation is the pillar supervisors examine most closely.</text>`;
    return `<svg viewBox="0 0 690 270" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  // ── 4. FINANCE ADVANCED (LEVEL 2) DIAGRAMS (a1 to a12) ──
  if (diagramId === "a1") {
    let g = "";
    const x0 = 40,
      w = 600,
      y = 54,
      h = 44;
    g += `<rect x="${x0}" y="${y}" width="${w}" height="${h}" rx="5" fill="#2E6FB0" fill-opacity="0.85"/>`;
    g += `<text x="${x0 + w / 2}" y="${y + 28}" fill="#fff" font-size="14" text-anchor="middle" font-weight="bold">81% ADOPTING AI</text>`;
    const w2 = (w * 14) / 81;
    g += `<rect x="${x0}" y="${y + 68}" width="${w2}" height="${h}" rx="5" fill="#C8102E"/>`;
    g += `<text x="${x0 + w2 / 2}" y="${y + 96}" fill="#fff" font-size="13" text-anchor="middle" font-weight="bold">14%</text>`;
    g += `<text x="${x0 + w2 + 16}" y="${y + 92}" fill="#FF9BA6" font-size="12" font-weight="bold">see AI as transformational to strategy</text>`;
    g += `<path d="M${x0 + w2} ${y + 44} L${x0 + w2} ${y + 68}" stroke="#FF6B7A" stroke-width="1.5" stroke-dasharray="4 3"/>`;
    g += `<path d="M${x0 + w} ${y + 44} L${x0 + w2 + 2} ${y + 68}" stroke="#FF6B7A" stroke-opacity="0.5" stroke-width="1.2" stroke-dasharray="4 3"/>`;
    g += `<text x="345" y="28" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold">THE EXECUTION GAP — CAMBRIDGE CCAF 2026</text>`;
    g += `<text x="345" y="186" fill="#A8C0E4" font-size="10.5" text-anchor="middle">Adoption without structural change. Closing this gap is what this programme is about.</text>`;
    return `<svg viewBox="0 0 690 200" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  if (diagramId === "a2") {
    const layers = [
      ["ENGAGEMENT", "Personalisation · omnichannel · embedded finance", "#C8102E"],
      [
        "AI-POWERED DECISIONING",
        "Decision inventory · feature store · serving · logging",
        "#2E6FB0",
      ],
      ["CORE TECHNOLOGY & DATA", "Identifiers · APIs · compute · environments", "#B8892B"],
      [
        "PLATFORM OPERATING MODEL",
        "Persistent ownership · funding · standards · decision rights",
        "#1E7A52",
      ],
    ];
    let g = "";
    const w = 560,
      h = 40,
      x0 = 65;
    layers.forEach((l, i) => {
      const y = 36 + i * (h + 10);
      g += `<rect x="${x0}" y="${y}" width="${w}" height="${h}" rx="5" fill="${l[2]}" fill-opacity="0.2" stroke="${l[2]}"/>`;
      g += `<rect x="${x0}" y="${y}" width="5" height="${h}" fill="${l[2]}"/>`;
      g += `<text x="${x0 + 18}" y="${y + 18}" fill="#fff" font-size="11.5" font-weight="bold">${l[0]}</text>`;
      g += `<text x="${x0 + 18}" y="${y + 33}" fill="#CFDCEF" font-size="9.5">${l[1]}</text>`;
    });
    g += `<text x="345" y="22" fill="#F0DCB4" font-size="11.5" text-anchor="middle" font-weight="bold">THE AI CAPABILITY STACK</text>`;
    g += `<text x="345" y="240" fill="#FF9BA6" font-size="10.5" text-anchor="middle" font-weight="bold">The institution performs at the level of its weakest layer.</text>`;
    return `<svg viewBox="0 0 690 252" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  if (diagramId === "a3") {
    const t = [
      [
        "TIER 1",
        "Determines customer outcomes or regulatory numbers",
        "Full independent validation · annual revalidation · continuous monitoring",
        "#C8102E",
      ],
      [
        "TIER 2",
        "Materially informs decisions with human review",
        "Independent review · periodic revalidation · regular monitoring",
        "#B8892B",
      ],
      [
        "TIER 3",
        "Internal productivity, no direct consequence",
        "Lighter review · documented owner · spot checks",
        "#2E6FB0",
      ],
    ];
    let g = "";
    const w = 612,
      h = 52,
      x0 = 39;
    t.forEach((r, i) => {
      const y = 34 + i * (h + 10);
      g += `<rect x="${x0}" y="${y}" width="${w}" height="${h}" rx="5" fill="#22386A" stroke="${r[3]}"/>`;
      g += `<rect x="${x0}" y="${y}" width="76" height="${h}" rx="5" fill="${r[3]}"/>`;
      g += `<text x="${x0 + 38}" y="${y + 31}" fill="#fff" font-size="12" text-anchor="middle" font-weight="bold">${r[0]}</text>`;
      g += `<text x="${x0 + 90}" y="${y + 22}" fill="#fff" font-size="10.5" font-weight="bold">${r[1]}</text>`;
      g += `<text x="${x0 + 90}" y="${y + 38}" fill="#A8C0E4" font-size="9.5">${r[2]}</text>`;
    });
    g += `<text x="345" y="22" fill="#F0DCB4" font-size="11.5" text-anchor="middle" font-weight="bold">RISK TIERING DRIVES PROPORTIONATE CONTROL</text>`;
    return `<svg viewBox="0 0 690 226" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  if (diagramId === "a4") {
    const s = [
      ["Customer", "Plain language · few factors · counterfactual", "#C8102E"],
      ["Front line", "Enough to converse and to challenge", "#2E6FB0"],
      ["Validator", "Global behaviour · dependencies · stability", "#B8892B"],
      ["Supervisor", "Transparency · fairness · accountability evidence", "#1E7A52"],
    ];
    let g = "";
    const w = 152,
      h = 88;
    s.forEach((v, i) => {
      const x = 22 + i * (w + 13);
      g += `<rect x="${x}" y="42" width="${w}" height="${h}" rx="6" fill="${v[2]}" fill-opacity="0.18" stroke="${v[2]}"/>`;
      g += `<rect x="${x}" y="42" width="${w}" height="5" fill="${v[2]}"/>`;
      g += `<text x="${x + w / 2}" y="${72}" fill="#fff" font-size="12.5" text-anchor="middle" font-weight="bold">${v[0]}</text>`;
      const words = v[1].split(" · ");
      words.forEach((wd, j) => {
        g += `<text x="${x + w / 2}" y="${92 + j * 15}" fill="#CFDCEF" font-size="9" text-anchor="middle">${wd}</text>`;
      });
    });
    g += `<text x="345" y="26" fill="#F0DCB4" font-size="11.5" text-anchor="middle" font-weight="bold">CONTEXT-AWARE EXPLANATION DESIGN</text>`;
    g += `<text x="345" y="152" fill="#FF9BA6" font-size="10" text-anchor="middle">An explanation is adequate only if the recipient can act on it or challenge it.</text>`;
    return `<svg viewBox="0 0 690 166" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  if (diagramId === "a5") {
    let g = "";
    const col = (x: number, title: string, items: string[], c: string) => {
      let s = `<rect x="${x}" y="36" width="290" height="152" rx="7" fill="${c}" fill-opacity="0.14" stroke="${c}"/><text x="${x + 145}" y="58" fill="#fff" font-size="12" text-anchor="middle" font-weight="bold">${title}</text>`;
      items.forEach((it, i) => {
        s += `<rect x="${x + 16}" y="${70 + i * 26}" width="258" height="20" rx="3" fill="#12274d" stroke="#3A5680"/><text x="${x + 26}" y="${84 + i * 26}" fill="#CFDCEF" font-size="9.5">${it}</text>`;
      });
      return s;
    };
    g += col(
      30,
      "PREDICTIVE AI STACK",
      [
        "Data warehouse",
        "Feature store",
        "Training pipelines / MLOps",
        "Model serving & monitoring",
      ],
      "#2E6FB0",
    );
    g += col(
      370,
      "GENERATIVE AI STACK",
      [
        "Foundation & embedding models",
        "Vector store & retrieval",
        "Prompt / agent orchestration",
        "Guardrails & evaluation harness",
      ],
      "#C8102E",
    );
    g += `<text x="345" y="24" fill="#F0DCB4" font-size="11.5" text-anchor="middle" font-weight="bold">LARGELY SEPARATE STACKS</text>`;
    g += `<text x="345" y="208" fill="#A8C0E4" font-size="10" text-anchor="middle">Shared component: the data lake / document store. A weak warehouse does not block document-centric use cases.</text>`;
    return `<svg viewBox="0 0 690 220" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  if (diagramId === "a6") {
    const lv = [
      ["L0", "Suggest", "human acts"],
      ["L1", "Draft & stage", "human releases"],
      ["L2", "Act within limits", "escalates outside"],
      ["L3", "Act, review exceptions", "post-hoc sampling"],
      ["L4", "Fully autonomous", "reversible only"],
    ];
    let g = "";
    const w = 118,
      x0 = 28;
    lv.forEach((l, i) => {
      const x = x0 + i * (w + 12),
        hgt = 44 + i * 14,
        y = 150 - hgt;
      const c = i <= 1 ? "#1E7A52" : i === 2 ? "#B8892B" : "#C8102E";
      g += `<rect x="${x}" y="${y}" width="${w}" height="${hgt}" rx="5" fill="${c}" fill-opacity="0.28" stroke="${c}"/>`;
      g += `<text x="${x + w / 2}" y="${y + 20}" fill="#fff" font-size="13" text-anchor="middle" font-weight="bold">${l[0]}</text>`;
      g += `<text x="${x + w / 2}" y="${166}" fill="#CFDCEF" font-size="10" text-anchor="middle">${l[1]}</text>`;
      g += `<text x="${x + w / 2}" y="${180}" fill="#A8C0E4" font-size="8.5" text-anchor="middle">${l[2]}</text>`;
    });
    g += `<text x="345" y="22" fill="#F0DCB4" font-size="11.5" text-anchor="middle" font-weight="bold">LEVELS OF AGENT AUTONOMY</text>`;
    g += `<text x="345" y="202" fill="#FF9BA6" font-size="10" text-anchor="middle">For customer funds, credit or financial crime: Level 1–2 with hard limits is the defensible position.</text>`;
    return `<svg viewBox="0 0 690 214" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  if (diagramId === "a7") {
    const p = [
      ["PD", "Probability of default", "data-rich · ML contributes most", "#C8102E"],
      ["LGD", "Loss given default", "only defaults contribute · scarce", "#B8892B"],
      ["EAD", "Exposure at default", "drawdown behaviour · complex", "#2E6FB0"],
    ];
    let g = "";
    const w = 196,
      x0 = 36;
    p.forEach((v, i) => {
      const x = x0 + i * (w + 14);
      g += `<rect x="${x}" y="42" width="${w}" height="80" rx="7" fill="#22386A" stroke="${v[3]}"/>`;
      g += `<circle cx="${x + 34}" cy="${74}" r="21" fill="${v[3]}"/><text x="${x + 34}" y="${80}" fill="#fff" font-size="14" text-anchor="middle" font-weight="bold">${v[0]}</text>`;
      g += `<text x="${x + 64}" y="${70}" fill="#fff" font-size="10.5" font-weight="bold">${v[1]}</text>`;
      g += `<text x="${x + 64}" y="${88}" fill="#A8C0E4" font-size="9">${v[2]}</text>`;
    });
    g += `<rect x="36" y="134" width="618" height="34" rx="5" fill="#C8102E" fill-opacity="0.16" stroke="#FF6B7A"/>`;
    g += `<text x="345" y="155" fill="#FF9BA6" font-size="10.5" text-anchor="middle" font-weight="bold">ECL is audited — calibration and explainability are non-negotiable</text>`;
    g += `<text x="345" y="26" fill="#F0DCB4" font-size="11.5" text-anchor="middle" font-weight="bold">THE CREDIT PARAMETER SET</text>`;
    return `<svg viewBox="0 0 690 182" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  if (diagramId === "a8") {
    const L = [
      "Deterministic rules — regulatory thresholds",
      "Entity resolution — the foundation",
      "Supervised models — known typologies",
      "Unsupervised detection — novel behaviour",
      "Network analytics — structure across entities",
      "Investigator workbench — enriched cases",
    ];
    let g = "";
    const w = 520,
      x0 = 85;
    L.forEach((t, i) => {
      const y = 32 + i * 27;
      const c = i === 1 ? "#C8102E" : "#2E6FB0";
      g += `<rect x="${x0}" y="${y}" width="${w}" height="22" rx="4" fill="${c}" fill-opacity="${i === 1 ? 0.34 : 0.18}" stroke="${c}"/>`;
      g += `<text x="${x0 + 14}" y="${y + 15}" fill="#fff" font-size="10">${t}</text>`;
    });
    g += `<text x="345" y="20" fill="#F0DCB4" font-size="11" text-anchor="middle" font-weight="bold">LAYERED FINANCIAL CRIME ARCHITECTURE</text>`;
    g += `<text x="345" y="212" fill="#FF9BA6" font-size="10" text-anchor="middle">Entity resolution delivers more detection uplift per rupee than any new model.</text>`;
    return `<svg viewBox="0 0 690 224" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  if (diagramId === "a9") {
    const l = [
      ["FIRST LINE", "Business & development", "Owns model, use, performance, outcomes", "#2E6FB0"],
      ["SECOND LINE", "Risk & compliance", "Framework, tiering, independent validation", "#C8102E"],
      ["THIRD LINE", "Internal audit", "Assures the framework operates as documented", "#B8892B"],
    ];
    let g = "";
    const w = 196,
      x0 = 36;
    l.forEach((v, i) => {
      const x = x0 + i * (w + 14);
      g += `<rect x="${x}" y="40" width="${w}" height="96" rx="7" fill="${v[3]}" fill-opacity="0.17" stroke="${v[3]}"/>`;
      g += `<rect x="${x}" y="40" width="${w}" height="5" fill="${v[3]}"/>`;
      g += `<text x="${x + w / 2}" y="68}" fill="#fff" font-size="12" text-anchor="middle" font-weight="bold">${v[0]}</text>`;
      g += `<text x="${x + w / 2}" y="90" fill="#CFDCEF" font-size="10" text-anchor="middle">${v[1]}</text>`;
      g += `<text x="${x + w / 2}" y="112" fill="#A8C0E4" font-size="8.5" text-anchor="middle">${v[2].slice(0, 30)}</text>`;
      g += `<text x="${x + w / 2}" y="125" fill="#A8C0E4" font-size="8.5" text-anchor="middle">${v[2].slice(30)}</text>`;
    });
    g += `<text x="345" y="24" fill="#F0DCB4" font-size="11.5" text-anchor="middle" font-weight="bold">THREE LINES OF DEFENCE, APPLIED TO AI</text>`;
    g += `<text x="345" y="158" fill="#FF9BA6" font-size="10" text-anchor="middle">The binding constraint is second-line technical capability.</text>`;
    return `<svg viewBox="0 0 690 170" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  if (diagramId === "a10") {
    let g = "";
    const cx = 345;
    for (let i = 0; i < 7; i++) {
      const x = 70 + i * 84;
      g += `<rect x="${x}" y="46" width="58" height="34" rx="4" fill="#22386A" stroke="#3A5680"/>`;
      g += `<text x="${x + 29}" y="67" fill="#CFDCEF" font-size="9" text-anchor="middle">Bank ${i + 1}</text>`;
      g += `<path d="M${x + 29} 82 L${cx} 118" stroke="#FF6B7A" stroke-opacity="0.45" stroke-width="1.2"/>`;
    }
    g += `<rect x="${cx - 96}" y="118" width="192" height="34" rx="5" fill="#C8102E"/>`;
    g += `<text x="${cx}" y="140" fill="#fff" font-size="11" text-anchor="middle" font-weight="bold">SIMILAR MODELS · SAME DATA</text>`;
    g += `<path d="M${cx} 154 v18" stroke="#FF6B7A" stroke-width="1.8" marker-end="url(#ah10)"/>`;
    g += `<rect x="${cx - 150}" y="176" width="300" height="30" rx="5" fill="#B8892B" fill-opacity="0.22" stroke="#F0DCB4"/>`;
    g += `<text x="${cx}" y="196" fill="#F0DCB4" font-size="10.5" text-anchor="middle" font-weight="bold">CORRELATED ACTION → AMPLIFIED MOVEMENT</text>`;
    g += `<text x="345" y="28" fill="#F0DCB4" font-size="11.5" text-anchor="middle" font-weight="bold">MODEL HERDING AS A STABILITY RISK — BIS</text>`;
    g += `<defs><marker id="ah10" markerWidth="9" markerHeight="9" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#FF6B7A"/></marker></defs>`;
    return `<svg viewBox="0 0 690 218" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  if (diagramId === "a11") {
    const lv = [
      ["ACTIVITY", "models deployed · users", "worthless as evidence", "#5A6779"],
      ["OPERATIONAL", "cycle time · cost per file", "directly attributable", "#2E6FB0"],
      ["BUSINESS", "approval at constant risk", "control for confounds", "#B8892B"],
      [
        "FINANCIAL",
        "revenue · cost · efficiency ratio",
        "the only level a board accepts",
        "#1E7A52",
      ],
    ];
    let g = "";
    const w = 148,
      x0 = 32;
    lv.forEach((v, i) => {
      const x = x0 + i * (w + 14);
      g += `<rect x="${x}" y="44" width="${w}" height="86" rx="6" fill="${v[3]}" fill-opacity="0.2" stroke="${v[3]}"/>`;
      g += `<text x="${x + w / 2}" y="70" fill="#fff" font-size="11.5" text-anchor="middle" font-weight="bold">${v[0]}</text>`;
      g += `<text x="${x + w / 2}" y="92" fill="#CFDCEF" font-size="8.5" text-anchor="middle">${v[1]}</text>`;
      g += `<text x="${x + w / 2}" y="114" fill="#A8C0E4" font-size="8.5" text-anchor="middle">${v[2]}</text>`;
      if (i < 3)
        g += `<path d="M${x + w + 2} 87 h10" stroke="#7FA0D0" stroke-width="1.5" marker-end="url(#ah11)"/>`;
    });
    g += `<text x="345" y="28" fill="#F0DCB4" font-size="11.5" text-anchor="middle" font-weight="bold">FOUR LEVELS OF VALUE MEASUREMENT</text>`;
    g += `<text x="345" y="152" fill="#FF9BA6" font-size="10" text-anchor="middle">Define one metric at each level — and the mechanism linking them.</text>`;
    g += `<defs><marker id="ah11" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L7 4 L0 8 z" fill="#7FA0D0"/></marker></defs>`;
    return `<svg viewBox="0 0 690 164" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  if (diagramId === "a12") {
    const h = [
      ["HORIZON 1", "0–12 months", "Foundations & credible wins", "#2E6FB0"],
      ["HORIZON 2", "12–30 months", "Decisioning & scale", "#B8892B"],
      ["HORIZON 3", "30 months +", "Business model", "#C8102E"],
    ];
    let g = "";
    const w = 200,
      x0 = 36;
    h.forEach((v, i) => {
      const x = x0 + i * (w + 11),
        ht = 64 + i * 18,
        y = 150 - ht;
      g += `<rect x="${x}" y="${y}" width="${w}" height="${ht}" rx="6" fill="${v[3]}" fill-opacity="0.22" stroke="${v[3]}"/>`;
      g += `<text x="${x + w / 2}" y="${y + 24}" fill="#fff" font-size="12" text-anchor="middle" font-weight="bold">${v[0]}</text>`;
      g += `<text x="${x + w / 2}" y="${y + 42}" fill="#F0DCB4" font-size="9.5" text-anchor="middle">${v[1]}</text>`;
      g += `<text x="${x + w / 2}" y="166" fill="#CFDCEF" font-size="10" text-anchor="middle">${v[2]}</text>`;
    });
    g += `<text x="345" y="24" fill="#F0DCB4" font-size="11.5" text-anchor="middle" font-weight="bold">THREE HORIZONS OF INSTITUTIONAL TRANSFORMATION</text>`;
    return `<svg viewBox="0 0 690 200" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  return "";
}

export const FINANCE_ADVANCED_SOURCES: SourceItem[] = [
  {
    org: "Cambridge Centre for Alternative Finance",
    title: "The 2026 Global AI in Financial Services Report: Adoption, impact and risks",
    summary:
      "University of Cambridge Judge Business School, in partnership with the BIS, IMF, World Economic Forum, IDB, CGAP and the Arab Monetary Fund. Survey of 628 organisations across 151 jurisdictions. Source of adoption benchmarks, the execution gap, agentic adoption data, vendor concentration, profitability and value-measurement findings.",
  },
  {
    org: "Bank for International Settlements",
    title:
      "Intelligent financial system: how AI is transforming finance (BIS Working Paper No. 1194)",
    summary:
      "Aldasoro, Gambacorta, Korinek, Shreeti and Stein, June 2024. Source of the financial stability analysis — model herding, uniformity and network connectedness — the real-economy scenarios, and principles for upgrading financial regulation.",
  },
  {
    org: "McKinsey & Company",
    title:
      "Building the AI Bank of the Future / AI-bank of the future: Can banks meet the AI challenge?",
    summary:
      "Source of the four-layer AI capability stack — engagement, AI-powered decisioning, core technology and data, and platform operating model — and the estimate of up to USD 1 trillion in annual value for global banking.",
  },
  {
    org: "World Economic Forum & Accenture",
    title: "Artificial Intelligence in Financial Services (January 2025)",
    summary:
      "Insights from over 100 financial services executives. Source of automation and augmentation potential estimates, AI investment trajectory, and the shift of executive attention from efficiency toward revenue growth.",
  },
  {
    org: "Applied Artificial Intelligence (Taylor & Francis)",
    title:
      "Explainable Artificial Intelligence in the Banking Sector: A Systematic Literature Review",
    summary:
      "Tuge & Msweli, 2026. PRISMA 2020 review of 78 peer-reviewed studies and industry reports (2021–2025). Source of the XAI implementation gap, the accuracy–interpretability trade-off, the 'explaining the explanation' problem, and the organisational barriers to adoption.",
  },
  {
    org: "Boston Consulting Group",
    title: "Banking on Generative AI / Generative AI in Banking: Six Myths You Need to Ignore",
    summary:
      "Source of the foundation model and LLM distinction, the separate generative technology stack, production-grade retrieval requirements, and the deployment archetypes for regulated customer-facing use.",
  },
  {
    org: "PwC Strategy&",
    title: "The Future of Banking: How AI is Reshaping the Industry",
    summary:
      "Source of the efficiency ratio as a forward-looking indicator of AI maturity, and the estimate of up to a 15-percentage-point efficiency ratio improvement from full AI adoption.",
  },
  {
    org: "Deloitte",
    title: "Artificial Intelligence: Transforming the Future of Banking",
    summary:
      "Source of executive adoption sentiment, personalisation and customer trust findings, and organisational enablers for successful AI implementation.",
  },
  {
    org: "Ernst & Young",
    title: "AI Bank White Paper: Reconstructing the Financial Paradigm through Intelligent Agents",
    summary:
      "Source of global AI governance benchmarks, the maturity assessment approach, AI talent composition findings, and model reuse and scalability evidence.",
  },
  {
    org: "University of Oxford",
    title: "AI Preparedness in Established Financial Services Firms",
    summary:
      "Oxford Future of Finance and Technology Initiative, Saïd Business School. Source of the paradox of caution, findings on efficiency business cases, the integration cost observation, and recommended adoption practices.",
  },
  {
    org: "SAS",
    title: "From Algorithms to Impact: Banking's AI Future",
    summary:
      "Source of practitioner perspectives from Millennium BCP, Banorte, Old National Bank and Intesa Sanpaolo on leadership, scenario modelling and governance.",
  },
  {
    org: "Nepal Rastra Bank",
    title: "Artificial Intelligence Guidelines and related circulars",
    summary:
      "The governing regulatory framework for licensed institutions in Nepal — board accountability, risk classification, explainability, fairness, privacy aligned to the Privacy Act (2075), consent and ongoing monitoring. Always work from the current published text and confirm with your compliance function.",
  },
];

export const DIAGRAM_CAPTIONS: Record<string, string> = {
  // Foundations
  l1: "A neural network: data flows through weighted connections, and learning slowly tunes the weights.",
  l2: "A precise prompt steers the model to exactly the expertise you need.",
  l3: "Diffusion in action — the model starts from noise and removes it, guided by your words.",
  l4: "Bloom’s ladder: most learners stop at the bottom. AI can help you climb higher.",
  l5: "Run every AI answer through four checks before you trust it.",
  // Healthcare
  h1: "AI, machine learning, deep learning and generative AI — with their clinical counterparts.",
  h2: "Fragmented health data must be linked before any model can be trained honestly.",
  h3: "The same algorithm carries very different risk depending on how it is deployed.",
  h4: "Documented deployments — the red-bordered examples transfer most directly to Nepal.",
  h5: "Retrieval-augmented generation grounded in your own clinical protocols.",
  h6: "The clinical AI risk taxonomy — all eight categories require assessment.",
  h7: "The RISE framework for equitable AI adoption in health systems.",
  h8: "The clinical AI governance cycle, from assessment through monitoring to withdrawal.",
  h9: "BCG's 10-20-70 rule: implementation succeeds or fails on people and process.",
  // Finance Level 1
  m1: "AI, machine learning, deep learning and generative AI — nested, not interchangeable.",
  m2: "Most projects fail here: joining fragmented systems, then splitting data honestly.",
  m3: "AI applies across the credit lifecycle — monitoring often delivers the fastest value.",
  m4: "Individually ordinary transactions form a revealing structure at network level.",
  m5: "Retrieval-augmented generation: the default safe architecture for regulated institutions.",
  m6: "The AI risk taxonomy for a supervised financial institution.",
  m7: "Four value levers — name the one your proposal pulls.",
  m8: "The model lifecycle, from definition through monitoring to retirement.",
  // Finance Advanced Level 2
  a1: "The execution gap: 81% of financial firms are adopting AI, but only 14% consider it transformational to strategy.",
  a2: "The AI capability stack: engagement, AI-powered decisioning, core technology & data, and platform operating model.",
  a3: "Risk tiering drives proportionate governance, validation rigour, and supervisory monitoring.",
  a4: "Context-aware explainability: tailoring explanations for customers, frontline teams, validators, and supervisors.",
  a5: "Predictive vs generative AI stacks: separate pipelines sharing data infrastructure.",
  a6: "Levels of agent autonomy: from suggestion (L0) to full autonomy (L4) with hard governance boundaries.",
  a7: "The credit parameter set (PD, LGD, EAD): calibration and explainability for expected credit loss.",
  a8: "Layered financial crime architecture: entity resolution, ML typologies, and network graph analytics.",
  a9: "Three lines of defence applied to enterprise AI: business ownership, second-line validation, and audit.",
  a10: "Model herding as a systemic stability risk: correlated model actions amplifying market movements.",
  a11: "Four levels of value measurement: activity, operational efficiency, business outcomes, and financial impact.",
  a12: "Three-horizon transformation roadmap: foundations (H1), decisioning scale (H2), and business model evolution (H3).",
};
