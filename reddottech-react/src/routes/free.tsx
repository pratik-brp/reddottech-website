import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaSection } from "@/components/sections/CtaSection";
import { GradientBackground } from "@/components/GradientBackground";
import {
  Download,
  Video,
  Calendar,
  ArrowRight,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { submitContact } from "@/lib/api";

export const Route = createFileRoute("/free")({
  head: () => ({
    meta: [
      { title: "FREE Learning Hub | Cheat Sheets, Masterclasses & Webinars — Red Dot" },
      {
        name: "description",
        content:
          "Access 100% free IT & management masterclasses, downloadable Six Sigma & PMP cheat sheets, and live community webinars by Red Dot Technologies.",
      },
    ],
  }),
  component: FreePage,
});

function FreePage() {
  const [showRsvpModal, setShowRsvpModal] = useState(false);
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpEmail, setRsvpEmail] = useState("");
  const [isRsvping, setIsRsvping] = useState(false);

  const cheatSheets = [
    {
      title: "Six Sigma DMAIC & Quality Formula Sheet",
      category: "Quality Management",
      format: "PDF (4 Pages)",
      downloads: "4.2k+",
      desc: "Complete reference for DPU, DPMO, Process Yield formulas, FMEA risk tables, and control chart rules.",
      content: `# Six Sigma DMAIC & Quality Formula Sheet

## DMAIC Methodology
1. **Define** - identify the problem and customer requirements (VOC, CTQ)
2. **Measure** - baseline current performance and collect data
3. **Analyze** - find root causes (FMEA, regression, hypothesis tests)
4. **Improve** - design and run experiments (DOE)
5. **Control** - hold the gains (control charts, process capability)

## Core Formulas
- **DPU** = Defects / Units
- **DPMO** = (Defects × 1,000,000) / (Units × Opportunities per Unit)
- **Process Yield** = e^(-DPU)
- **Rolled Throughput Yield (RTY)** = Product of yields at each step
- **Sigma Level** ≈ NormSInv(1 - DPMO/1,000,000) + 1.5

## FMEA Risk Priority Number
**RPN = Severity (1-10) × Occurrence (1-10) × Detection (1-10)**
Prioritize actions on items with the highest RPN.

## Control Chart Rules
- A point falls beyond the upper or lower control limit
- A run of 7+ consecutive points on one side of the center line
- 2 of 3 points in the outer third of the control band

## Lean Waste Types (DOWNTIME)
Defects, Overproduction, Waiting, Non-utilized talent, Transportation, Inventory, Motion, Extra-processing
`,
    },
    {
      title: "Generative AI Prompting Master Guide",
      category: "Artificial Intelligence",
      format: "PDF (6 Pages)",
      downloads: "8.9k+",
      desc: "The 5-layer RTCFC prompt framework, role personas, few-shot examples, and hallucination reduction checklist.",
      content: `# Generative AI Prompting Master Guide

## RTCFC Prompt Framework
1. **Role** - "You are a senior data analyst..."
2. **Task** - "Explain the DMAIC methodology"
3. **Context** - "For a manufacturing audience, non-technical"
4. **Format** - "Return a 5-bullet summary with headings"
5. **Constraint** - "Maximum 150 words, no jargon"

## Effective Personas
- Expert practitioner ("You are a PMP-certified project manager")
- Teacher ("Explain it to a curious 14-year-old")
- Devil's advocate ("Challenge my assumptions about...")

## Few-Shot Prompting
Provide 2-3 example inputs AND ideal outputs before your real request.

## Hallucination Reduction Checklist
- Ask for sources/evidence or "state if you are unsure"
- Request the model to work step-by-step (chain of thought)
- Cross-check numbers with primary references
- Constrain scope explicitly ("Only answer from the attached document")
- Use temperature lower for factual tasks

## Refinement Loop
Iterate: Clarify → Refine → Validate → Regenerate. Never accept the first draft blindly.
`,
    },
    {
      title: "PMP® Exam 49 Processes & Formula Matrix",
      category: "Project Management",
      format: "PDF (5 Pages)",
      downloads: "6.1k+",
      desc: "Earned Value Management (EVPM) formulas, triple constraints, EV, PV, AC, CPI, SPI variance cheat sheet.",
      content: `# PMP Exam 49 Processes & Formula Matrix

## Triple Constraint
Scope + Schedule + Cost (quality is the center of the triangle).

## Earned Value Management (EVM)
- **PV** = Planned Value (budgeted cost of work scheduled)
- **EV** = Earned Value (budgeted cost of work performed)
- **AC** = Actual Cost (actual cost of work performed)

## EVM Indicators
- **CV** = EV - AC (positive = under budget)
- **SV** = EV - PV (positive = ahead of schedule)
- **CPI** = EV / AC (greater than 1 = efficient)
- **SPI** = EV / PV (greater than 1 = ahead of schedule)
- **EAC** = BAC / CPI (estimate at completion)
- **ETC** = EAC - AC (estimate to complete)
- **TCPI** = (BAC - EV) / (BAC - AC)

## Variances
- Cost Variance % = CV / EV
- Schedule Variance % = SV / PV

## Key Formulas
- **Communication Channels** = n(n - 1) / 2
- **Expected Value (PERT)** = (Optimistic + 4×Most Likely + Pessimistic) / 6

## Exam Tips
- If CPI/SPI > 1 or CV/SV > 0 → favorable
- If CPI/SPI < 1 or CV/SV < 0 → unfavorable
`,
    },
  ];

  const freeMasterclasses = [
    {
      title: "Introduction to Neural Networks & Tensors",
      duration: "45 mins",
      views: "15k views",
      desc: "Learn how deep learning models tune parameters step-by-step without complex math jargon.",
      tag: "AI Series",
    },
    {
      title: "Transitioning from Engineer to Manager",
      duration: "50 mins",
      views: "12k views",
      desc: "Master Maslow & Herzberg motivation theories to lead high-performing technical teams.",
      tag: "Leadership",
    },
    {
      title: "Six Sigma DMAIC Case Study: Bank Operations",
      duration: "60 mins",
      views: "9.5k views",
      desc: "Step-by-step walk-through of a real banking process error reduction project.",
      tag: "Quality Audit",
    },
  ];

  const upcomingWebinars = [
    {
      title: "AI in Corporate Enterprise 2026 Roadmap",
      date: "Saturday, August 16 • 11:00 AM NPT",
      speaker: "David Iseminger (Ex-Microsoft AI Pioneer)",
      seatsLeft: "14 Seats Left",
    },
    {
      title: "PMP Exam 2026 Study Strategy & EVPM Tips",
      date: "Sunday, August 24 • 3:00 PM NPT",
      speaker: "Tony Swaim (PMP®, CSSBB®)",
      seatsLeft: "22 Seats Left",
    },
  ];

  const handleDownload = (title: string) => {
    const sheet = cheatSheets.find((s) => s.title === title);
    if (!sheet) return;

    const blob = new Blob([sheet.content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${sheet.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Downloading ${title}...`);
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRsvping(true);
    try {
      await submitContact({
        first_name: rsvpName,
        last_name: "",
        email: rsvpEmail,
        subject: "Webinar RSVP",
        message: "Reserved a free community webinar RSVP pass.",
      });

      try {
        await fetch("https://formsubmit.co/ajax/info@reddottech.com.np", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            _subject: `New Free Community Webinar RSVP: ${rsvpName}`,
            _template: "table",
            _captcha: "false",
            "Attendee Name": rsvpName,
            "Attendee Email": rsvpEmail,
            "Program / Event": "Free Tech & AI Community Webinar Series",
            "Timestamp": new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" }) + " (NPT)",
          }),
        });
      } catch (emailErr) {
        console.warn("[RSVP FormSubmit Error]", emailErr);
      }

      toast.success(
        `RSVP confirmed for ${rsvpName}! Webinar access link will be sent to ${rsvpEmail}.`,
      );
      setShowRsvpModal(false);
      setRsvpName("");
      setRsvpEmail("");
    } catch (err) {
      const message = err instanceof Error ? err.message : "RSVP failed. Please try again.";
      toast.error(message);
    } finally {
      setIsRsvping(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <PageHero
        badge="100% Free Educational Resources"
        title={
          <>
            Democratizing <span className="gradient-text">High-Impact Tech Education</span>
          </>
        }
        subtitle="Access 0-cost masterclasses, downloadable PDF cheat sheets, and live community webinars engineered to accelerate your professional knowledge."
      />

      {/* Free Downloadable Cheat Sheets */}
      <section className="section-padding bg-white relative">
        <div className="mx-auto max-w-7xl px-3.5 sm:px-6">
          <SectionHeader
            badge="Downloadable Guides"
            title={
              <>
                Free Executive <span className="text-brand-red">Cheat Sheets & Guides</span>
              </>
            }
            subtitle="Printable PDF reference sheets co-written by senior instructors."
          />

          <div className="mt-6 sm:mt-12 grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-8">
            {cheatSheets.map((sheet) => (
              <div
                key={sheet.title}
                className="premium-card p-3.5 sm:p-8 space-y-2.5 sm:space-y-5 relative overflow-hidden flex flex-col justify-between"
              >
                <div className="space-y-2 sm:space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="badge-brand text-[9px] sm:text-xs">{sheet.category}</span>
                    <span className="text-[10px] sm:text-xs font-bold text-slate-400">{sheet.format}</span>
                  </div>

                  <h3 className="text-xs sm:text-xl font-extrabold text-brand-ink line-clamp-2">{sheet.title}</h3>
                  <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed line-clamp-2 sm:line-clamp-none">{sheet.desc}</p>

                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-400 font-semibold pt-1 sm:pt-2">
                    <Download className="h-3.5 w-3.5 text-brand-red" />
                    <span>{sheet.downloads} Downloads</span>
                  </div>
                </div>

                <div className="pt-2 sm:pt-6">
                  <button
                    onClick={() => handleDownload(sheet.title)}
                    className="btn-primary w-full justify-center text-xs py-2 px-2.5 sm:py-2.5 sm:px-4"
                  >
                    <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>Download Free PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 0-Cost Video Masterclasses */}
      <GradientBackground variant="warm" orbs>
        <section className="section-padding">
          <div className="mx-auto max-w-7xl px-3.5 sm:px-6">
            <SectionHeader
              badge="Watch On-Demand"
              title={
                <>
                  Free On-Demand <span className="text-brand-red">Video Masterclasses</span>
                </>
              }
              subtitle="Watch full-length lectures delivered by international faculty."
            />

            <div className="mt-6 sm:mt-12 grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-8">
              {freeMasterclasses.map((vid) => (
                <div
                  key={vid.title}
                  className="premium-card p-3.5 sm:p-7 space-y-2.5 sm:space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-1.5 sm:space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <span className="text-[8px] sm:text-[10px] font-extrabold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded bg-brand-red/10 text-brand-red uppercase tracking-wider">
                        {vid.tag}
                      </span>
                      <span className="text-[10px] sm:text-xs text-slate-400 font-semibold">{vid.duration}</span>
                    </div>

                    <h4 className="text-xs sm:text-lg font-bold text-brand-ink line-clamp-2">{vid.title}</h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed line-clamp-2 sm:line-clamp-none">{vid.desc}</p>
                  </div>

                  <div className="pt-2 sm:pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-1.5">
                    <span className="text-[10px] sm:text-xs text-slate-400 font-semibold">{vid.views}</span>
                    <button
                      onClick={() => toast.info(`Launching ${vid.title} player...`)}
                      className="btn-secondary text-[11px] sm:text-xs py-1.5 px-2.5 sm:py-2 sm:px-4 justify-center"
                    >
                      <Video className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span>Watch Free</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </GradientBackground>

      {/* Community Webinars & RSVP */}
      <section className="section-padding bg-slate-900 text-white relative">
        <div className="mx-auto max-w-7xl px-3.5 sm:px-6">
          <SectionHeader
            badge="Live Events"
            title={
              <>
                Upcoming Free <span className="gradient-text">Community Webinars</span>
              </>
            }
            subtitle="Join live interactive sessions with global speakers and ask your questions directly."
            dark
          />

          <div className="mt-6 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-4xl mx-auto">
            {upcomingWebinars.map((web) => (
              <div
                key={web.title}
                className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 sm:p-8 space-y-3 sm:space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-brand-red" />
                      {web.date}
                    </span>
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded bg-brand-red/20 text-rose-300">
                      {web.seatsLeft}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-xl font-bold text-white">{web.title}</h3>
                  <p className="text-xs text-slate-300 font-medium">Speaker: {web.speaker}</p>
                </div>

                <div className="pt-2 sm:pt-4">
                  <button
                    onClick={() => setShowRsvpModal(true)}
                    className="btn-primary w-full justify-center py-2.5 text-xs sm:text-sm"
                  >
                    <span>Reserve Free RSVP Pass</span>
                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP Modal */}
      {showRsvpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-ink/70 backdrop-blur-md animate-fade-in-up">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setShowRsvpModal(false)}
              className="absolute top-5 right-5 h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="text-2xl font-extrabold text-brand-ink">RSVP for Webinar</h3>
            <p className="text-xs text-slate-500 mt-1">
              We will send your direct Zoom link and reminders to your email.
            </p>

            <form onSubmit={handleRsvpSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="premium-input"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={rsvpEmail}
                  onChange={(e) => setRsvpEmail(e.target.value)}
                  placeholder="aarav@example.com"
                  className="premium-input"
                />
              </div>

              <button type="submit" disabled={isRsvping} className="btn-primary w-full mt-2">
                <span>{isRsvping ? "Confirming RSVP..." : "Confirm Free RSVP"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      <CtaSection />
    </div>
  );
}
