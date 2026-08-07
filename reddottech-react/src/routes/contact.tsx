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
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | RedDot Technologies — Enrollment & Support" },
      {
        name: "description",
        content:
          "Get in touch with RedDot Technologies in Kathmandu, Nepal for course enrollment, PECP program details, corporate workshops, and admissions.",
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
    await new Promise((r) => setTimeout(r, 1200));
    toast.success(
      "Your message has been sent successfully! Our admissions team will contact you within 24 hours.",
    );
    setForm({ fullName: "", email: "", phone: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Office",
      lines: ["Baluwatar-04, Kathmandu", "Bagmati, Nepal"],
      href: "https://maps.app.goo.gl/KmrWV2r6kDgn7cFg6",
    },
    {
      icon: Phone,
      title: "Call Us",
      lines: ["01 4535691", "01 4516390"],
      href: "tel:014535691",
    },
    {
      icon: Mail,
      title: "Email Us",
      lines: ["info@reddottech.com.np"],
      href: "mailto:info@reddottech.com.np",
    },
    {
      icon: Clock,
      title: "Office Hours",
      lines: ["Sun - Fri: 10:00 AM - 6:00 PM", "Saturday: Closed"],
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
      q: "Does RedDot Technologies provide career placement support?",
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

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Contact Info Column */}
            <ScrollReveal direction="left" className="lg:col-span-2">
              <div
                className="rounded-[2rem] p-8 sm:p-10 h-full relative overflow-hidden text-white space-y-8 noise-overlay shadow-2xl"
                style={{
                  background: "linear-gradient(160deg, #0B1120 0%, #1A1E33 45%, #2D1019 100%)",
                }}
              >
                {/* Background glow decorations */}
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(200,16,46,0.25),transparent_65%)]" />
                </div>

                <div className="relative z-10 space-y-8">
                  <div className="space-y-2">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red">
                      Direct Contact
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                      Contact Information
                    </h2>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      Reach out to us for enrollment queries, program syllabus details, or corporate
                      partnerships.
                    </p>
                  </div>

                  <div className="space-y-6 pt-2">
                    {contactInfo.map((item, idx) => {
                      const Icon = item.icon;
                      const Wrapper = item.href ? "a" : "div";
                      const wrapperProps = item.href
                        ? {
                            href: item.href,
                            target: item.href.startsWith("http") ? "_blank" : undefined,
                            rel: item.href.startsWith("http") ? "noreferrer" : undefined,
                          }
                        : {};

                      return (
                        <Wrapper
                          key={idx}
                          {...(wrapperProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
                          className="flex items-start gap-4 group transition-all"
                        >
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-brand-red border border-white/10 transition-all duration-300 group-hover:bg-brand-red group-hover:text-white group-hover:border-brand-red group-hover:scale-105">
                            <Icon className="h-5 w-5 stroke-[2]" />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-white mb-1">{item.title}</h3>
                            {item.lines.map((line, lIdx) => (
                              <p
                                key={lIdx}
                                className="text-xs text-slate-300/80 leading-relaxed font-medium"
                              >
                                {line}
                              </p>
                            ))}
                          </div>
                        </Wrapper>
                      );
                    })}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Form Column */}
            <ScrollReveal direction="right" className="lg:col-span-3">
              <div className="premium-card-static p-8 sm:p-10 relative overflow-hidden rounded-[2rem]">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-red via-brand-red-light to-amber-400" />

                <div className="space-y-2 mb-8">
                  <h2 className="text-2xl font-extrabold text-brand-ink tracking-tight">
                    Send Us a Message
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Fill out the form below and our admissions team will respond within 24 business
                    hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        name="fullName"
                        type="text"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Aarav Sharma"
                        required
                        className="premium-input"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="aarav@example.com"
                        required
                        className="premium-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+977 9800000000"
                        className="premium-input"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="premium-input"
                      >
                        <option value="">Select an inquiry topic</option>
                        <option value="enrollment">Course Enrollment</option>
                        <option value="pecp">PECP Bootcamp Program</option>
                        <option value="corporate">Corporate Training</option>
                        <option value="partnership">Academic Partnership</option>
                        <option value="other">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us about your learning goals or questions..."
                      required
                      className="premium-input resize-none"
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

                  <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                    Your personal information is confidential and protected.
                  </p>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="section-padding bg-surface-elevated">
        <div className="mx-auto max-w-4xl px-6">
          <ScrollReveal>
            <SectionHeader
              badge="Frequently Asked Questions"
              title={
                <>
                  Got Questions? <span className="text-brand-red">We&apos;re Here to Help</span>
                </>
              }
              subtitle="Quick answers to common questions regarding admissions, certifications, and schedules."
              className="mb-12"
            />
          </ScrollReveal>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;

              return (
                <ScrollReveal key={idx} delay={idx * 60}>
                  <div className="premium-card-static overflow-hidden transition-all duration-300">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                    >
                      <span className="text-base font-bold text-brand-ink flex items-center gap-3">
                        <HelpCircle className="h-5 w-5 text-brand-red shrink-0" />
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-brand-red" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pt-0 border-t border-slate-100">
                        <p className="text-sm text-slate-600 leading-relaxed pt-4">{faq.a}</p>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="py-12 px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal direction="scale">
            <div className="relative rounded-[2rem] overflow-hidden shadow-[var(--shadow-card-premium)] border border-slate-100">
              <iframe
                title="RedDot Technologies Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.7543562899787!2d85.32590537634262!3d27.72509612511485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb192c41c4a53b%3A0x3e001ff7e56bb038!2sRedDot%20Technologies!5e0!3m2!1sen!2snp!4v1747760762966!5m2!1sen!2snp"
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
