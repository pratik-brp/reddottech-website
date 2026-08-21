import { createFileRoute } from "@tanstack/react-router";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  CheckCircle,
  Loader2,
  HelpCircle,
  ChevronDown,
  Send,
  Globe,
  ExternalLink,
  MessageCircle,
  Shield,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { submitContact, getSettings, getCachedSettings } from "@/lib/api";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Red Dot Technologies — Enrollment & Support" },
      {
        name: "description",
        content:
          "Get in touch with Red Dot Technologies in Kathmandu, Nepal for course enrollment, PECP program details, corporate workshops, and admissions.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const faqContentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>(() => getCachedSettings() || {});

  useEffect(() => {
    getSettings().then((data) => {
      if (data) setSettings(data);
    });

    const handleSettingsUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<Record<string, string>>;
      if (customEvent.detail) {
        setSettings(customEvent.detail);
      }
    };

    window.addEventListener("rdt_settings_updated", handleSettingsUpdate);
    return () => window.removeEventListener("rdt_settings_updated", handleSettingsUpdate);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    try {
      const names = form.fullName.trim().split(" ");
      const firstName = names[0] || form.fullName;
      const lastName = names.slice(1).join(" ") || "";

      await submitContact({
        first_name: firstName,
        last_name: lastName,
        email: form.email,
        phone: form.phone,
        subject: form.subject || "General Inquiry",
        message: form.message,
      });

      toast.success(
        "Your message has been sent and saved to our database! Our admissions team will contact you within 24 hours.",
      );
      setForm({ fullName: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      toast.error("Failed to submit inquiry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const officeAddress = settings.office_address || "Baluwatar-04, Kathmandu, Bagmati, Nepal";
  const mapsUrl = settings.google_maps_url || "https://maps.app.goo.gl/KmrWV2r6kDgn7cFg6";
  const primaryPhone = settings.contact_phone || "01 4535691";
  const secondaryPhone = settings.contact_secondary_phone || "01 4516390";
  const contactEmail = settings.contact_email || "info@reddottech.com.np";
  const officeHours = settings.office_hours || "Mon – Fri: 9:00 AM – 5:00 PM";

  const contactCards = [
    {
      icon: MapPin,
      title: "Visit Our Office",
      detail: officeAddress,
      sub: "Bagmati, Nepal",
      href: mapsUrl,
      accent: "from-rose-500 to-red-600",
      bgGlow: "bg-rose-500/10",
    },
    {
      icon: Phone,
      title: "Call Us",
      detail: primaryPhone,
      sub: secondaryPhone,
      href: `tel:${primaryPhone.replace(/\s+/g, "")}`,
      accent: "from-blue-500 to-indigo-600",
      bgGlow: "bg-blue-500/10",
    },
    {
      icon: Mail,
      title: "Email Us",
      detail: contactEmail,
      sub: "We reply within 24h",
      href: `mailto:${contactEmail}`,
      accent: "from-emerald-500 to-teal-600",
      bgGlow: "bg-emerald-500/10",
    },
    {
      icon: Clock,
      title: "Office Hours",
      detail: officeHours,
      sub: "Sat & Sun: Closed",
      accent: "from-amber-500 to-orange-600",
      bgGlow: "bg-amber-500/10",
    },
  ];

  const faqs = [
    {
      q: "How do I enroll in a certification cohort?",
      a: "You can submit an inquiry through the contact form above or select a course from our catalog and click 'Enroll Now'. Our team will reach out with cohort schedules and payment details.",
    },
    {
      q: "What is the PECP program and who is it for?",
      a: "PECP (Professional Excellence & Certification Program) is our flagship collaboration with USC Upstate (USA), designed for IT professionals and graduates aiming for internationally accredited credentials.",
    },
    {
      q: "Are classes offered online or in-person?",
      a: "We offer flexible blended learning formats including live interactive online sessions, weekend workshops, and hands-on lab projects suited for working professionals.",
    },
    {
      q: "Does Red Dot Technologies provide career placement support?",
      a: "Yes! All full certification programs include resume optimization, technical interview preparation, and placement recommendations through our corporate hiring partner network.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <PageHero
        badge="Connect & Upskill"
        title={
          <>
            Let&apos;s Start a <span className="gradient-text">Conversation</span>
          </>
        }
        subtitle="Have questions about our programs, admissions, or custom enterprise training? We'd love to assist you."
      />

      {/* ── Contact Info Cards Row ── */}
      <section className="relative -mt-6 sm:-mt-10 z-10 pb-6 sm:pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {contactCards.map((item, idx) => {
              const Icon = item.icon;
              const isLink = !!item.href;
              const Tag: any = isLink ? "a" : "div";
              const linkProps = isLink
                ? {
                    href: item.href,
                    target: item.href!.startsWith("http") ? "_blank" : undefined,
                    rel: item.href!.startsWith("http") ? "noreferrer" : undefined,
                  }
                : {};

              return (
                <ScrollReveal key={idx} delay={idx * 80}>
                  <Tag
                    {...linkProps}
                    className="group relative flex flex-col sm:flex-row items-start gap-2.5 sm:gap-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200/80 p-3.5 sm:p-5 shadow-xs sm:shadow-lg hover:shadow-xl hover:border-slate-300 transition-all duration-300 cursor-pointer overflow-hidden h-full"
                  >
                    {/* Subtle gradient glow on hover */}
                    <div className={`absolute inset-0 ${item.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    <div className={`relative z-10 flex h-8 w-8 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br ${item.accent} text-white shadow-xs sm:shadow-md group-hover:scale-105 transition-transform duration-300`}>
                      <Icon className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                    </div>
                    <div className="relative z-10 min-w-0 flex-1">
                      <p className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">{item.title}</p>
                      <p className="text-xs sm:text-sm font-extrabold text-brand-ink leading-snug break-words whitespace-normal">{item.detail}</p>
                      <p className="text-[10px] sm:text-xs text-slate-500 font-medium mt-0.5 break-words whitespace-normal">{item.sub}</p>
                    </div>
                    {isLink && (
                      <ExternalLink className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 text-slate-300 group-hover:text-slate-500 transition-colors" />
                    )}
                  </Tag>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Contact Form Section ── */}
      <section className="section-padding bg-slate-50/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left – Why Reach Out + Trust Signals */}
            <ScrollReveal direction="left">
              <div className="space-y-6 sm:space-y-8">
                <div className="space-y-2 sm:space-y-4">
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-brand-red/20 bg-white px-3 sm:px-4 py-1 sm:py-1.5 shadow-xs">
                    <MessageCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-brand-red" />
                    <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-brand-red">
                      Get in Touch
                    </span>
                  </div>
                  <h2 className="display-font text-2xl sm:text-4xl font-black text-brand-ink leading-[1.1] tracking-tight">
                    We'd Love to Hear{" "}
                    <span className="gradient-text">From You</span>
                  </h2>
                  <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-lg">
                    Whether you're exploring our certification programs, need help with enrollment,
                    or want to discuss corporate training solutions — our team is ready to help.
                  </p>
                </div>

                {/* Trust / Feature Highlights */}
                <div className="space-y-3 sm:space-y-4">
                  {[
                    {
                      icon: Clock,
                      title: "Response Within 24 Hours",
                      desc: "Our admissions team reviews every inquiry personally and responds within one business day.",
                    },
                    {
                      icon: Shield,
                      title: "Your Data is Protected",
                      desc: "All personal information submitted is encrypted and never shared with third parties.",
                    },
                    {
                      icon: Globe,
                      title: "Global Students Welcome",
                      desc: "We support remote learners from 15+ countries. No matter where you are, we're here for you.",
                    },
                  ].map((feat, i) => {
                    const FIcon = feat.icon;
                    return (
                      <div key={i} className="flex items-start gap-3 sm:gap-4 group">
                        <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-brand-red/10 text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-300">
                          <FIcon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-extrabold text-brand-ink">{feat.title}</h4>
                          <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed mt-0.5">{feat.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

            {/* Right – The Form */}
            <ScrollReveal direction="right">
              <div className="relative rounded-2xl sm:rounded-[2rem] bg-white border border-slate-200/80 shadow-xs sm:shadow-xl overflow-hidden">
                {/* Top accent bar */}
                <div className="h-1.5 bg-gradient-to-r from-brand-red via-red-400 to-amber-400" />

                <div className="p-4 sm:p-9">
                  <div className="space-y-1 sm:space-y-1.5 mb-4 sm:mb-7">
                    <h3 className="text-lg sm:text-2xl font-extrabold text-brand-ink tracking-tight flex items-center gap-2 sm:gap-2.5">
                      <Send className="h-4 w-4 sm:h-5 sm:w-5 text-brand-red" />
                      Send Us a Message
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                      Fill in the details below and we'll get back to you promptly.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                          Full Name <span className="text-brand-red">*</span>
                        </label>
                        <input
                          name="fullName"
                          type="text"
                          value={form.fullName}
                          onChange={handleChange}
                          placeholder="e.g. Aarav Sharma"
                          required
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-brand-ink placeholder:text-slate-400 focus:outline-none focus:border-brand-red focus:bg-white focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--brand-red)_12%,transparent)] transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                          Email Address <span className="text-brand-red">*</span>
                        </label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="aarav@example.com"
                          required
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-brand-ink placeholder:text-slate-400 focus:outline-none focus:border-brand-red focus:bg-white focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--brand-red)_12%,transparent)] transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                          Phone Number
                        </label>
                        <input
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+977 9800000000"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-brand-ink placeholder:text-slate-400 focus:outline-none focus:border-brand-red focus:bg-white focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--brand-red)_12%,transparent)] transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                          Subject
                        </label>
                        <select
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-brand-ink placeholder:text-slate-400 focus:outline-none focus:border-brand-red focus:bg-white focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--brand-red)_12%,transparent)] transition-all duration-200"
                        >
                          <option value="">Select a topic</option>
                          <option value="general">General Inquiry</option>
                          <option value="program">Program Inquiry</option>
                          <option value="technical">Technical Assistance</option>
                          <option value="collaboration">Collaboration</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        Message <span className="text-brand-red">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us about your learning goals or questions..."
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-brand-ink placeholder:text-slate-400 focus:outline-none focus:border-brand-red focus:bg-white focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--brand-red)_12%,transparent)] transition-all duration-200 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full justify-center py-3.5 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Submitting Request...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>

                    <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5 pt-1">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                      Your personal information is confidential and protected.
                    </p>
                  </form>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── FAQ Accordion Section ── */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/5 px-4 py-1.5 shadow-xs mb-5">
                <HelpCircle className="h-3.5 w-3.5 text-brand-red" />
                <span className="text-[11px] font-black uppercase tracking-widest text-brand-red">
                  Frequently Asked Questions
                </span>
              </div>
              <h2 className="display-font text-3xl sm:text-4xl font-black text-brand-ink leading-[1.1] tracking-tight">
                Got Questions?{" "}
                <span className="gradient-text">We're Here to Help</span>
              </h2>
              <p className="mt-3 text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
                Quick answers to common questions regarding admissions, certifications, and schedules.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;

              return (
                <ScrollReveal key={idx} delay={idx * 50}>
                  <div
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "bg-white border-brand-red/20 shadow-lg shadow-red-500/5"
                        : "bg-white border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none group"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                            isOpen
                              ? "bg-brand-red text-white shadow-md shadow-red-500/20"
                              : "bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-600"
                          }`}
                        >
                          <span className="text-sm font-black">{String(idx + 1).padStart(2, "0")}</span>
                        </div>
                        <span className={`text-sm sm:text-base font-bold leading-snug transition-colors duration-200 ${isOpen ? "text-brand-ink" : "text-slate-700 group-hover:text-brand-ink"}`}>
                          {faq.q}
                        </span>
                      </div>
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                          isOpen
                            ? "bg-brand-red/10 text-brand-red rotate-180"
                            : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </button>

                    {/* Animated Answer Content */}
                    <div
                      ref={(el) => { faqContentRefs.current[idx] = el; }}
                      className="overflow-hidden transition-all duration-300 ease-in-out"
                      style={{
                        maxHeight: isOpen
                          ? `${(faqContentRefs.current[idx]?.scrollHeight ?? 200) + 32}px`
                          : "0px",
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <div className="px-6 pb-6 pt-0">
                        <div className="pl-[3.25rem] border-l-2 border-brand-red/20 ml-0.5">
                          <p className="text-sm text-slate-600 leading-relaxed pl-4">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Google Map + Location Card ── */}
      <section className="relative bg-slate-50/70">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <ScrollReveal>
            <div className="text-center mb-8">
              <h2 className="display-font text-2xl sm:text-3xl font-black text-brand-ink tracking-tight">
                Find Us on the Map
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Visit our office at Baluwatar, Kathmandu for in-person consultation.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="scale">
            <div className="relative rounded-[2rem] overflow-hidden shadow-xl border border-slate-200/80">
              <iframe
                title="Red Dot Technologies Location Map"
                src="https://maps.google.com/maps?q=27.723054,85.3303128&hl=en&z=17&output=embed"
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />

              {/* Floating Address Card */}
              <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-xs z-10">
                <div className="rounded-xl bg-white border border-slate-200 shadow-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-red text-white shadow-md">
                      <MapPin className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-black text-brand-ink">Red Dot Technologies</p>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        {officeAddress}
                      </p>
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-red hover:underline mt-1.5"
                      >
                        Open in Google Maps
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
