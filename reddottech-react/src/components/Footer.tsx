import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, ArrowUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { subscribeNewsletter } from "@/lib/api";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await subscribeNewsletter(email);
      toast.success("Thank you for subscribing to our newsletter! (Saved to DB)");
      setEmail("");
    } catch (err) {
      toast.error("Failed to subscribe.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "All Courses", href: "/courses" },
    { name: "PECP Program", href: "/pecp" },
    { name: "AI Unlocked", href: "/ai-unlocked" },
    { name: "Contact Us", href: "/contact" },
  ];

  const programs = [
    "AI & Machine Learning Certification",
    "Business Analytics & Data Intelligence",
    "Project Management Professional (PMP)",
    "USC Upstate Executive Credentials",
  ];

  const socials = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/profile.php?id=61576029361697",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/reddot.tech/",
      label: "Instagram",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/red-dot-technologies-nepal/",
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[var(--surface-elevated)] border-t border-slate-200/80">
      {/* Animated top line */}
      <div className="absolute inset-x-0 top-0 h-px overflow-hidden">
        <div
          className="h-full w-1/3 animate-marquee bg-gradient-to-r from-transparent via-brand-red to-transparent"
          style={{ animationDuration: "6s" }}
        />
      </div>

      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="animate-float absolute -left-[10%] top-[10%] h-[35vw] max-h-[400px] w-[35vw] max-w-[400px] rounded-full opacity-[0.08]"
          style={{ background: "radial-gradient(circle, var(--brand-red) 0%, transparent 70%)" }}
        />
        <div
          className="animate-float absolute -right-[8%] bottom-[5%] h-[28vw] max-h-[320px] w-[28vw] max-w-[320px] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, oklch(0.5 0.1 260 / 0.5) 0%, transparent 70%)",
            animationDelay: "3s",
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 pt-16 lg:pt-20 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Brand column */}
            <div className="lg:col-span-4 space-y-5">
              <Link to="/" className="inline-block">
                <img
                  src="/logo.png"
                  alt="Red Dot Technologies"
                  className="h-9 md:h-10 w-auto object-contain"
                />
              </Link>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                Empowering Nepalese professionals with globally recognized certifications,
                industry-led mentorship, and workforce-ready skills.
              </p>

              <div className="flex items-center gap-2.5 pt-1">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 border border-slate-200 shadow-sm transition-all duration-300 hover:bg-brand-red hover:text-white hover:border-brand-red hover:shadow-[var(--shadow-glow-red)] hover:-translate-y-0.5"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-brand-red mb-5">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href as any}
                      className="text-sm text-slate-500 hover:text-brand-ink transition-colors duration-200 inline-flex items-center gap-1.5 group"
                    >
                      <span className="h-px w-0 bg-brand-red transition-all duration-300 group-hover:w-3" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div className="lg:col-span-3">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-brand-red mb-5">
                Featured Programs
              </h3>
              <ul className="space-y-3">
                {programs.map((p) => (
                  <li key={p} className="text-sm text-slate-500 flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-red/50 mt-1.5 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Contact */}
            <div className="lg:col-span-3 space-y-5">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-brand-red mb-5">
                Stay Informed
              </h3>

              <form
                onSubmit={handleSubscribe}
                className="flex rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm focus-within:border-brand-red focus-within:shadow-[var(--shadow-input-focus)] transition-all"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full bg-transparent px-4 py-3 text-xs text-brand-ink placeholder:text-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 bg-brand-red px-5 py-3 text-xs font-semibold text-white transition-colors hover:bg-brand-red-deep"
                >
                  Subscribe
                </button>
              </form>

              <div className="space-y-3 pt-1 text-sm text-slate-500">
                <a
                  href="https://maps.app.goo.gl/KmrWV2r6kDgn7cFg6"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-2.5 hover:text-brand-ink transition-colors"
                >
                  <MapPin className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />
                  <span>Baluwatar-04, Kathmandu, Nepal</span>
                </a>
                <a
                  href="tel:014535691"
                  className="flex items-center gap-2.5 hover:text-brand-ink transition-colors"
                >
                  <Phone className="h-4 w-4 text-brand-red shrink-0" />
                  <span>01 4535691 / 4516390</span>
                </a>
                <a
                  href="mailto:info@reddottech.com.np"
                  className="flex items-center gap-2.5 hover:text-brand-ink transition-colors"
                >
                  <Mail className="h-4 w-4 text-brand-red shrink-0" />
                  <span>info@reddottech.com.np</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-200/80 bg-white/60">
          <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Red Dot Technologies Pvt. Ltd. All rights reserved.
            </p>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-xs text-slate-500 hover:text-brand-ink transition-colors group"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-brand-ink border border-slate-200 shadow-sm transition-all group-hover:bg-brand-red group-hover:text-white group-hover:border-brand-red group-hover:-translate-y-0.5">
                <ArrowUp className="h-3.5 w-3.5" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
