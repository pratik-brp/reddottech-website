import { Link } from "@tanstack/react-router";
import { ArrowRight, Users } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";

export function CtaSection() {
  return (
    <section className="py-12 md:py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal direction="scale">
          <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-brand-ink p-7 sm:p-14 lg:p-24 text-center text-white shadow-2xl noise-overlay">
            {/* Grid texture */}
            <div
              className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-20"
              aria-hidden="true"
            />
            {/* Glow orbs */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,16,46,0.35),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(100,80,200,0.18),transparent_60%)]" />

              <div className="animate-spin-slow absolute -top-12 -right-12 h-48 w-48 rounded-full border border-white/[0.06]" />
              <div
                className="animate-spin-slow absolute -bottom-16 -left-16 h-64 w-64 rounded-full border border-white/[0.05]"
                style={{ animationDirection: "reverse" }}
              />
              <div className="animate-float absolute top-8 left-[15%] h-3 w-3 rounded-full bg-brand-red/40 blur-[1px]" />
              <div className="animate-float absolute bottom-12 right-[20%] h-2 w-2 rounded-full bg-brand-red/30 [animation-delay:2s]" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-5 sm:space-y-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5">
                <span className="h-2 w-2 rounded-full bg-brand-red animate-glow-pulse" />
                <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.14em] text-slate-200">
                  Begin Your Journey
                </span>
              </span>

              <h2 className="display-font text-2xl sm:text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
                Ready to Grow, Upskill &amp; <span className="gradient-text">Succeed?</span>
              </h2>
              <p className="text-slate-300/90 text-xs sm:text-base md:text-xl max-w-xl mx-auto leading-relaxed">
                Connect with us today to find the right certification program for your career
                advancement.
              </p>

              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-400">
                <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand-red shrink-0" />
                <span>Join 12,000+ learners who chose Red Dot</span>
              </div>

              <div className="pt-2">
                <Magnetic>
                  <Link to="/contact" className="btn-primary text-xs sm:text-base px-6 sm:px-10 py-3.5 sm:py-4 w-full sm:w-auto text-center justify-center">
                    <span>Schedule a Consultation</span>
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
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
