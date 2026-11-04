import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, ArrowUp } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { subscribeNewsletter, getSettings, getCachedSettings, getCourses, getCachedCourses } from "@/lib/api";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .592.045.87.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.3 6.3 0 0 0 1.87-4.49V8.58a8.28 8.28 0 0 0 4.84 1.56V6.69h-.94Z" />
    </svg>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const cached = getCachedSettings();
    if (cached) {
      setSettings(cached);
    }

    const cachedCoursesData = getCachedCourses();
    if (cachedCoursesData && cachedCoursesData.length > 0) {
      setCourses(cachedCoursesData);
    }

    getSettings().then((data) => {
      if (data) setSettings(data);
    });

    getCourses().then((data) => {
      if (Array.isArray(data)) setCourses(data);
    });

    const handleSettingsUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<Record<string, string>>;
      if (customEvent.detail) {
        setSettings(customEvent.detail);
      }
    };

    const handleCoursesUpdate = () => {
      getCourses().then((data) => {
        if (Array.isArray(data)) setCourses(data);
      });
    };

    window.addEventListener("rdt_settings_updated", handleSettingsUpdate);
    window.addEventListener("courses-updated", handleCoursesUpdate);
    return () => {
      window.removeEventListener("rdt_settings_updated", handleSettingsUpdate);
      window.removeEventListener("courses-updated", handleCoursesUpdate);
    };
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await subscribeNewsletter(email);
      toast.success("Thank you for subscribing to our newsletter! (Saved to DB)");
      setEmail("");
    } catch {
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
    { name: "PECP Program", href: "/pecp" },
    { name: "All Courses", href: "/courses" },
    { name: "AI Unlocked", href: "/ai-unlocked" },
    { name: "Verify Certificate", href: "/verify" },
    { name: "Contact Us", href: "/contact" },
  ];

  const programs = useMemo(() => {
    if (courses.length > 0) {
      return courses.slice(0, 6).map((c) => ({
        name: c.name,
        href: `/courses/${c.id}`,
      }));
    }
    return [
      { name: "Explore All Courses", href: "/courses" },
      { name: "PECP Executive Program", href: "/pecp" },
      { name: "AI Unlocked Hub", href: "/ai-unlocked" },
    ];
  }, [courses]);

  const socials = [
    {
      icon: Facebook,
      href: settings.social_facebook || "https://www.facebook.com/profile.php?id=61576029361697",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: settings.social_instagram || "https://www.instagram.com/reddot.tech/",
      label: "Instagram",
    },
    {
      icon: Linkedin,
      href:
        settings.social_linkedin || "https://www.linkedin.com/company/red-dot-technologies-nepal/",
      label: "LinkedIn",
    },
    {
      icon: TikTokIcon,
      href: settings.social_tiktok || "https://www.tiktok.com/@reddot.tech",
      label: "TikTok",
    },
  ];

  const primaryPhone = settings.contact_phone || "01 4535691";
  const secondaryPhone = settings.contact_secondary_phone || "4516390";
  const contactEmail = settings.contact_email || "info@reddottech.com.np";
  const officeAddress = settings.office_address || "Baluwatar-04, Kathmandu, Nepal";
  const mapsUrl = settings.google_maps_url || "https://maps.app.goo.gl/KmrWV2r6kDgn7cFg6";

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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 sm:pt-16 lg:pt-20 pb-6 sm:pb-10">
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-4 sm:gap-x-8 gap-y-7 sm:gap-y-10 lg:gap-8">
            {/* Brand column */}
            <div className="col-span-2 lg:col-span-4 space-y-3.5 sm:space-y-5">
              <Link to="/" className="inline-block">
                <img
                  src="/logo.png"
                  alt="Red Dot Technologies"
                  loading="lazy"
                  decoding="async"
                  className="h-8 sm:h-9 md:h-10 w-auto object-contain"
                />
              </Link>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
                Empowering Nepalese professionals with globally recognized certifications,
                industry-led mentorship, and workforce-ready skills.
              </p>

              <div className="flex items-center gap-2 pt-0.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-white text-slate-500 border border-slate-200 shadow-xs transition-all duration-300 hover:bg-brand-red hover:text-white hover:border-brand-red hover:shadow-[var(--shadow-glow-red)] hover:-translate-y-0.5"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-span-1 lg:col-span-2">
              <h3 className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-brand-red mb-3 sm:mb-5">
                Quick Links
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href as any}
                      className="text-[11px] sm:text-sm text-slate-500 hover:text-brand-ink transition-colors duration-200 inline-flex items-center gap-1.5 group"
                    >
                      <span className="h-px w-0 bg-brand-red transition-all duration-300 group-hover:w-3" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Featured Programs */}
            <div className="col-span-1 lg:col-span-3">
              <h3 className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-brand-red mb-3 sm:mb-5">
                Featured Programs
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {programs.map((p) => (
                  <li key={p.name}>
                    <Link
                      to={p.href as any}
                      className="text-[11px] sm:text-sm text-slate-500 hover:text-brand-ink transition-colors duration-200 flex items-start gap-1.5 group"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-red/60 mt-1 sm:mt-1.5 shrink-0 group-hover:bg-brand-red group-hover:scale-125 transition-all" />
                      <span className="leading-snug">{p.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Contact */}
            <div className="col-span-2 lg:col-span-3 space-y-4 sm:space-y-5">
              <h3 className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-brand-red mb-3 sm:mb-5">
                Stay Informed
              </h3>

              <form
                onSubmit={handleSubscribe}
                className="flex rounded-xl overflow-hidden border border-slate-200 bg-white shadow-xs focus-within:border-brand-red focus-within:shadow-[var(--shadow-input-focus)] transition-all"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full bg-transparent px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs text-brand-ink placeholder:text-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="shrink-0 bg-brand-red px-4 sm:px-5 py-2.5 sm:py-3 text-xs font-semibold text-white transition-colors hover:bg-brand-red-deep disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </button>
              </form>

              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2.5 sm:gap-3 pt-1 text-xs sm:text-sm text-slate-500">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-2 hover:text-brand-ink transition-colors"
                >
                  <MapPin className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />
                  <span className="leading-snug">{officeAddress}</span>
                </a>
                <a
                  href={`tel:${primaryPhone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2 hover:text-brand-ink transition-colors"
                >
                  <Phone className="h-4 w-4 text-brand-red shrink-0" />
                  <span>
                    {primaryPhone}
                    {secondaryPhone ? ` / ${secondaryPhone}` : ""}
                  </span>
                </a>
                <a
                  href={`mailto:${contactEmail}`}
                  className="flex items-center gap-2 hover:text-brand-ink transition-colors"
                >
                  <Mail className="h-4 w-4 text-brand-red shrink-0" />
                  <span>{contactEmail}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-200/80 bg-white/60">
          <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-500" suppressHydrationWarning>
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
