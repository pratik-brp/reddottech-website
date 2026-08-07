import { Award, ShieldCheck, Building2, Globe2, Quote, Star, CheckCircle2, UserCheck } from "lucide-react";
import { Magnetic } from "@/components/motion/Magnetic";
import { Link } from "@tanstack/react-router";

const trustPillars = [
  {
    icon: Award,
    title: "US-Backed Credentials",
    badge: "USC UPSTATE USA",
    text: "Every PECP credential is co-certified with the University of South Carolina Upstate (USA) and carries verifiable international standing.",
    highlight: "Dual digital transcripts",
  },
  {
    icon: ShieldCheck,
    title: "Industry-Recognized Standards",
    badge: "PMI® & IASSC®",
    text: "Curriculum aligned to PMI, IASSC, and Six Sigma DMAIC frameworks trusted by Fortune 500 enterprises worldwide.",
    highlight: "DMAIC & PMP® Aligned",
  },
  {
    icon: Building2,
    title: "Corporate & Academic Network",
    badge: "40+ HIRING PARTNERS",
    text: "Direct referral access to 40+ hiring corporate partners across Nepal and global tech hubs — plus top U.S. faculty.",
    highlight: "Placement Referral",
  },
  {
    icon: Globe2,
    title: "12,000+ Upskilled Professionals",
    badge: "ALUMNI NETWORK",
    text: "A thriving community of Nepalese professionals upskilling toward high-impact, globally competitive careers.",
    highlight: "High Completion Rate",
  },
];

const alumniReviews = [
  {
    name: "Prajwal Shrestha",
    role: "Senior Quality Engineer",
    company: "TechCraft Nepal",
    avatar: "/images/instructor/instructor1.png",
    rating: 5,
    course: "Six Sigma DMAIC Executive Cert",
    comment:
      "The PECP Six Sigma certification co-certified by USC Upstate transformed my career. Within 3 months of completion, I secured a senior management promotion with verifiable proof of my credentials.",
  },
  {
    name: "Anusha Karki",
    role: "Project Delivery Lead",
    company: "Global Business Solutions",
    avatar: "/images/instructor/instructor2.png",
    rating: 5,
    course: "Project Management Fundamentals",
    comment:
      "The PMP® alignment and live weekend masterclasses gave me practical framework tools I apply daily. The digital badge on my LinkedIn profile immediately stood out to hiring managers.",
  },
  {
    name: "Rohan Gurung",
    role: "AI & Data Specialist",
    company: "InfoTech Systems",
    avatar: "/images/instructor/instructor3.png",
    rating: 5,
    course: "Introduction to Artificial Intelligence",
    comment:
      "Learning from ex-Microsoft tech veterans and U.S. faculty gave me a direct edge in deep learning models and enterprise AI deployment. Unmatched quality in Nepal!",
  },
];

export function TestimonialsSection() {
  return (
    <section className="section-padding-lg bg-[var(--surface-elevated)] relative overflow-hidden">
      {/* Grid Pattern & Ambient Glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-30"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 top-1/3 h-96 w-96 rounded-full opacity-15 blur-[100px]"
        style={{ background: "radial-gradient(circle, var(--brand-red) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-14 text-center mx-auto max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/5 px-4 py-1.5 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-brand-red animate-glow-pulse" />
            <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-red">
              Trusted &amp; Recognized
            </span>
          </span>
          <h2 className="display-font text-3xl sm:text-5xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
            Recognized by Professionals &amp; <span className="gradient-text">Backed by Institutions</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            Our credentials are built on global academic partnerships and industry-recognized standards — verified proof of quality.
          </p>
        </div>

        {/* Top 4 Institutional Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trustPillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-7 shadow-xl transition-all duration-400 hover:shadow-2xl hover:border-brand-red/30 hover:scale-[1.02]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white transition-all duration-300 group-hover:bg-brand-red group-hover:scale-105 shadow-md">
                      <Icon className="h-6 w-6 stroke-[2]" />
                    </div>
                    <span className="rounded-full bg-brand-red/10 border border-brand-red/20 px-2.5 py-0.5 text-[10px] font-black text-brand-red uppercase">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="display-font text-lg font-extrabold text-brand-ink tracking-tight group-hover:text-brand-red transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {item.text}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] font-extrabold text-slate-500">
                  <CheckCircle2 className="h-3.5 w-3.5 text-brand-red" />
                  <span>{item.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section: Alumni Reviews & Testimonials */}
        <div className="rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-brand-ink to-slate-950 p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-15" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6 border-b border-white/10 pb-8">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-extrabold text-brand-red border border-white/10 uppercase tracking-wider mb-3">
                <UserCheck className="h-3.5 w-3.5" />
                Verified Learner Reviews
              </span>
              <h3 className="display-font text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Hear From Our <span className="gradient-text">Successful Alumni</span>
              </h3>
            </div>

            <div className="flex items-center gap-4 text-slate-300 text-xs font-semibold">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 stroke-none" />
                ))}
              </div>
              <span>4.9 / 5.0 Rating from 12,000+ Learners</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {alumniReviews.map((review) => (
              <div
                key={review.name}
                className="group relative flex flex-col justify-between rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-brand-red/40"
              >
                <Quote className="absolute right-5 top-5 h-8 w-8 text-white/10 group-hover:text-brand-red/30 transition-colors" />

                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 stroke-none" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal italic">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="h-9 w-9 rounded-full object-cover border-2 border-white/20 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-extrabold text-white truncate leading-tight">
                        {review.name}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate leading-tight mt-0.5">
                        {review.role} · {review.company}
                      </p>
                    </div>
                  </div>

                  <span className="text-[9px] font-extrabold text-brand-red bg-brand-red/10 border border-brand-red/20 px-2 py-0.5 rounded-full shrink-0">
                    VERIFIED
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left relative z-10">
            <p className="text-xs text-slate-400 font-medium">
              Join Nepal&apos;s fastest growing community of certified corporate leaders &amp; engineers.
            </p>
            <Magnetic>
              <Link to={"/coursess" as any} className="btn-primary text-xs py-3 px-6">
                <span>View All Certified Programs</span>
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}

