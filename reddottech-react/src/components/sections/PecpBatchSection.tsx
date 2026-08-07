import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Globe2,
  Sparkles,
  Calendar,
  Clock,
  Award,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";

const benefits = [
  "U.S. Certified Credentials (USC Upstate)",
  "Top US & Local Faculty Mentorship",
  "Live Hands-on Labs & Capstone Projects",
  "Guaranteed Career Placement Assistance",
];

const cohortDetails = [
  { label: "Collaborator", value: "USC Upstate (USA)", icon: Globe2 },
  { label: "Format", value: "Live Online / Weekend", icon: Clock },
  { label: "Certification", value: "U.S. Credential Badge", icon: Award },
  { label: "Eligibility", value: "Professionals & Seniors", icon: Users },
];

export function PecpBatchSection() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal direction="scale">
          <div className="relative overflow-hidden rounded-[2.5rem] p-8 sm:p-12 lg:p-16 text-white shadow-2xl border border-white/15">
            {/* Background image: batch.png from old PHP project */}
            <img
              src="/images/pecp/batch.png"
              alt="PECP Batch Students Classroom Background"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />

            {/* Dark contrast overlay matching old PHP theme */}
            <div
              className="pointer-events-none absolute inset-0 bg-slate-950/65"
              aria-hidden="true"
            />

            {/* Decorative spinning crescent arc top-left */}
            <div
              className="pointer-events-none absolute top-8 left-8 h-9 w-9 rounded-full border-2 border-t-white border-r-white border-b-transparent border-l-transparent animate-spin-slow opacity-80"
              aria-hidden="true"
            />

            {/* Decorative starburst icon bottom-center */}
            <div
              className="pointer-events-none absolute bottom-12 right-1/3 opacity-30 text-white animate-pulse hidden sm:block"
              aria-hidden="true"
            >
              <svg className="h-10 w-10 fill-current" viewBox="0 0 24 24">
                <path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z" />
              </svg>
            </div>

            {/* Main Content Grid */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column Text & Buttons */}
              <div className="lg:col-span-8 space-y-6 text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
                  <Sparkles className="h-3.5 w-3.5 text-brand-red animate-pulse" />
                  <span className="text-xs font-extrabold uppercase tracking-widest text-slate-200">
                    USC Upstate (USA) Partnership
                  </span>
                </div>

                {/* Subtitle */}
                <p className="text-base sm:text-2xl font-semibold text-white/90 tracking-wide">
                  Take the next step toward a globally recognized career.
                </p>

                {/* Title & Batch Dates */}
                <h2 className="display-font text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-white">
                  First batch begins <span className="gradient-text">August 15, 2026.</span>
                  <br />
                  <span className="text-white">Limited seats available.</span>
                </h2>

                <p className="text-slate-200 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
                  The Professional Excellence &amp; Certification Program (PECP) bridges top U.S.
                  faculty expertise with local workforce needs in Nepal—providing credentials
                  accepted worldwide.
                </p>

                {/* Highlights List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {benefits.map((b) => (
                    <div key={b} className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-brand-red shrink-0" />
                      <span className="text-xs font-semibold text-slate-100">{b}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Magnetic>
                    <Link
                      to={"/contactt" as any}
                      className="group inline-flex items-center gap-3 rounded-full bg-brand-red px-8 py-4 text-sm sm:text-base font-extrabold text-white shadow-2xl hover:bg-brand-red-deep transition-all"
                    >
                      <span>Enroll Now</span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                        <ArrowRight className="h-4 w-4 text-white" />
                      </span>
                    </Link>
                  </Magnetic>

                  <Magnetic>
                    <Link
                      to={"/contactt" as any}
                      className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/50"
                    >
                      <span>Schedule a Consultation</span>
                    </Link>
                  </Magnetic>
                </div>
              </div>

              {/* Right Column Floating Play / Consultation Spotlight Trigger */}
              <div className="lg:col-span-4 flex items-center justify-center relative">
                <Magnetic>
                  <Link
                    to={"/pecpp" as any}
                    className="group relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-white/95 text-brand-red shadow-2xl backdrop-blur-md transition-transform duration-500 hover:scale-110"
                  >
                    <div className="absolute inset-0 rounded-full border border-white/60 animate-ping opacity-25" />
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-red text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                      <ArrowRight className="h-6 w-6 stroke-[2.5]" />
                    </div>
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
