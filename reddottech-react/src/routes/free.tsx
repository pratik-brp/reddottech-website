import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal, RevealGroup } from "@/components/ScrollReveal";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaSection } from "@/components/sections/CtaSection";
import { GradientBackground } from "@/components/GradientBackground";
import {
  BookOpen,
  Download,
  Sparkles,
  Video,
  Calendar,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Mail,
  X,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/free")({
  head: () => ({
    meta: [
      { title: "FREE Learning Hub | Cheat Sheets, Masterclasses & Webinars — RedDot" },
      {
        name: "description",
        content:
          "Access 100% free IT & management masterclasses, downloadable Six Sigma & PMP cheat sheets, and live community webinars by RedDot Technologies.",
      },
    ],
  }),
  component: FreePage,
});

function FreePage() {
  const [showRsvpModal, setShowRsvpModal] = useState(false);
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpEmail, setRsvpEmail] = useState("");

  const cheatSheets = [
    {
      title: "Six Sigma DMAIC & Quality Formula Sheet",
      category: "Quality Management",
      format: "PDF (4 Pages)",
      downloads: "4.2k+",
      desc: "Complete reference for DPU, DPMO, Process Yield formulas, FMEA risk tables, and control chart rules.",
    },
    {
      title: "Generative AI Prompting Master Guide",
      category: "Artificial Intelligence",
      format: "PDF (6 Pages)",
      downloads: "8.9k+",
      desc: "The 5-layer RTCFC prompt framework, role personas, few-shot examples, and hallucination reduction checklist.",
    },
    {
      title: "PMP® Exam 49 Processes & Formula Matrix",
      category: "Project Management",
      format: "PDF (5 Pages)",
      downloads: "6.1k+",
      desc: "Earned Value Management (EVPM) formulas, triple constraints, EV, PV, AC, CPI, SPI variance cheat sheet.",
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
    toast.success(`Downloading ${title}...`);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`RSVP confirmed for ${rsvpName}! Webinar access link sent to ${rsvpEmail}.`);
    setShowRsvpModal(false);
    setRsvpName("");
    setRsvpEmail("");
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
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            badge="Downloadable Guides"
            title={
              <>
                Free Executive <span className="text-brand-red">Cheat Sheets & Guides</span>
              </>
            }
            subtitle="Printable PDF reference sheets co-written by senior instructors."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {cheatSheets.map((sheet, idx) => (
              <div
                key={sheet.title}
                className="premium-card p-8 space-y-5 relative overflow-hidden flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="badge-brand">{sheet.category}</span>
                    <span className="text-xs font-bold text-slate-400">{sheet.format}</span>
                  </div>

                  <h3 className="text-xl font-extrabold text-brand-ink">{sheet.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{sheet.desc}</p>

                  <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold pt-2">
                    <Download className="h-4 w-4 text-brand-red" />
                    <span>{sheet.downloads} Downloads</span>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => handleDownload(sheet.title)}
                    className="btn-primary w-full justify-center"
                  >
                    <Download className="h-4 w-4" />
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
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeader
              badge="Watch On-Demand"
              title={
                <>
                  Free On-Demand <span className="text-brand-red">Video Masterclasses</span>
                </>
              }
              subtitle="Watch full-length lectures delivered by international faculty."
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {freeMasterclasses.map((vid) => (
                <div
                  key={vid.title}
                  className="premium-card p-7 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold px-2.5 py-1 rounded bg-brand-red/10 text-brand-red uppercase tracking-wider">
                        {vid.tag}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">{vid.duration}</span>
                    </div>

                    <h4 className="text-lg font-bold text-brand-ink">{vid.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{vid.desc}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-semibold">{vid.views}</span>
                    <button
                      onClick={() => toast.info(`Launching ${vid.title} player...`)}
                      className="btn-secondary text-xs py-2 px-4"
                    >
                      <Video className="h-3.5 w-3.5" />
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
        <div className="mx-auto max-w-7xl px-6">
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

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {upcomingWebinars.map((web) => (
              <div
                key={web.title}
                className="rounded-2xl bg-white/[0.04] border border-white/10 p-8 space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-brand-red" />
                      {web.date}
                    </span>
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded bg-brand-red/20 text-rose-300">
                      {web.seatsLeft}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">{web.title}</h3>
                  <p className="text-xs text-slate-300 font-medium">Speaker: {web.speaker}</p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setShowRsvpModal(true)}
                    className="btn-primary w-full justify-center"
                  >
                    <span>Reserve Free RSVP Pass</span>
                    <ArrowRight className="h-4 w-4" />
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

              <button type="submit" className="btn-primary w-full mt-2">
                <span>Confirm Free RSVP</span>
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
