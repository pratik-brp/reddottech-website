import { useState, useEffect } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  ArrowRight,
  Menu,
  X,
  Sparkles,
  Home,
  Info,
  GraduationCap,
  BookOpen,
  PhoneCall,
  ChevronRight,
} from "lucide-react";
import { Magnetic } from "@/components/motion/Magnetic";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const navigate = useNavigate();
  const currentPath = routerState.location.pathname;

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 16);
          ticking = false;
        });
        ticking = true;
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [currentPath]);

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "About Us", href: "/about", icon: Info },
    { name: "PECP", href: "/pecp", icon: GraduationCap },
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "Contact Us", href: "/contact", icon: PhoneCall },
  ];

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    if (path === "/pecp") return currentPath.startsWith("/pecp");
    if (path === "/courses") return currentPath.startsWith("/courses");
    return currentPath.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 transition-all duration-500 ${
        scrolled ? "py-2 sm:py-2.5" : "py-3 sm:py-4 lg:py-5"
      }`}
    >
      {/* Floating pill */}
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-3.5 sm:px-5 py-2 transition-all duration-500 relative ${
          scrolled
            ? "bg-white/90 border border-slate-200/90 shadow-[0_12px_35px_-10px_rgba(15,20,30,0.12)] backdrop-blur-xl"
            : "bg-white/50 border border-white/70 backdrop-blur-md shadow-xs"
        }`}
      >
        {/* Left: Brand Logo */}
        <Link
          to="/"
          onClick={(e) => {
            e.preventDefault();
            const goToHero = () => {
              const el = document.getElementById("hero");
              if (el) {
                const lenis = (window as any).__lenis;
                if (lenis?.scrollTo) {
                  lenis.scrollTo(el, { offset: 0, duration: 1.2 });
                } else {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }
            };
            if (currentPath !== "/") {
              navigate({ to: "/" }).then(() => {
                requestAnimationFrame(goToHero);
              });
            } else {
              goToHero();
            }
          }}
          className="shrink-0 flex items-center transition-all duration-300 hover:opacity-85 active:scale-95"
          aria-label="Red Dot Technologies — Home"
        >
          <img
            src="/logo.png"
            alt="Red Dot Technologies"
            className={`w-auto object-contain transition-all duration-500 ${
              scrolled ? "h-6 sm:h-8" : "h-7 sm:h-9 md:h-10"
            }`}
          />
        </Link>

        {/* Center: Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5 rounded-full bg-slate-100/70 p-1 border border-slate-200/60 backdrop-blur-sm">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                to={link.href as any}
                className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-[0.4rem] text-[0.8rem] font-bold transition-all duration-300 ${
                  active
                    ? "bg-brand-ink text-white shadow-md"
                    : "text-slate-600 hover:text-brand-ink hover:bg-white/80"
                }`}
              >
                {active && (
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-red shadow-sm animate-glow-pulse" />
                )}
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Desktop CTAs & Mobile Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* AI Unlocked Button — Visible on sm+ */}
          <div className="hidden sm:block">
            <Magnetic strength={0.3}>
              <Link
                to="/ai-unlocked"
                className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-white/90 border border-slate-200/90 px-3.5 sm:px-4 py-1.5 text-[0.78rem] font-bold text-brand-ink shadow-xs transition-all duration-300 hover:bg-brand-red hover:text-white hover:border-brand-red hover:shadow-lg hover:shadow-brand-red/20 hover:scale-105"
              >
                <Sparkles className="h-3.5 w-3.5 text-brand-red transition-colors group-hover:text-amber-300 group-hover:animate-pulse" />
                <span>AI Unlocked</span>
              </Link>
            </Magnetic>
          </div>

          {/* Get in Touch Button — Desktop Only (hidden on small mobile to prevent squishing) */}
          <div className="hidden md:block">
            <Magnetic strength={0.3}>
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand-ink pl-4 sm:pl-5 pr-1.5 py-1.5 text-[0.78rem] font-bold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/15"
              >
                <span className="relative z-10">Get in Touch</span>
                <span className="relative z-10 flex h-6 sm:h-7 w-6 sm:w-7 items-center justify-center rounded-full bg-white text-brand-ink transition-all duration-300 group-hover:bg-brand-red group-hover:text-white group-hover:rotate-45">
                  <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                </span>
              </Link>
            </Magnetic>
          </div>

          {/* Mobile Direct Quick CTA — Visible on small screens (< sm) */}
          <Link
            to="/ai-unlocked"
            className="sm:hidden inline-flex items-center gap-1 rounded-full bg-white/90 border border-slate-200 px-2.5 py-1 text-[11px] font-extrabold text-brand-ink shadow-xs active:scale-95"
          >
            <Sparkles className="h-3 w-3 text-brand-red" />
            <span>AI</span>
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-8.5 w-8.5 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/90 text-brand-ink border border-slate-200/90 shadow-sm transition-all hover:bg-white lg:hidden focus:outline-none active:scale-90"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay & Panel */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Dark Backdrop */}
        <div
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer Glass Card Container */}
        <div
          className={`relative mx-3 sm:mx-4 mt-[4.25rem] rounded-[2rem] p-5 sm:p-6 shadow-2xl transition-all duration-400 max-h-[85vh] overflow-y-auto ${
            mobileOpen ? "translate-y-0 opacity-100 scale-100" : "-translate-y-4 opacity-0 scale-95"
          }`}
          style={{
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(28px)",
            border: "1px solid rgba(226, 232, 240, 0.95)",
          }}
        >
          {/* Header Row inside Drawer */}
          <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Red Dot Logo" className="h-7 w-auto object-contain" />
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-brand-red hover:text-white transition-all active:scale-90"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Navigation Links Grid */}
          <div className="grid grid-cols-1 gap-1.5">
            {navLinks.map((link, idx) => {
              const IconComponent = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  to={link.href as any}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-extrabold transition-all duration-300 ${
                    active
                      ? "bg-brand-ink text-white shadow-md scale-[1.01]"
                      : "text-slate-700 hover:bg-slate-50 hover:text-brand-ink"
                  }`}
                  style={{ transitionDelay: mobileOpen ? `${idx * 35}ms` : "0ms" }}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                        active
                          ? "bg-brand-red text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <span>{link.name}</span>
                  </div>

                  <ChevronRight
                    className={`h-4 w-4 transition-transform ${
                      active ? "text-brand-red translate-x-0.5" : "text-slate-300"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Bottom Action CTA Buttons Stack */}
          <div className="pt-4 mt-4 border-t border-slate-100 space-y-2.5">
            {/* AI Unlocked Pill Button */}
            <Link
              to="/ai-unlocked"
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-50 border border-slate-200/90 py-3.5 text-xs sm:text-sm font-extrabold text-brand-ink shadow-xs transition-all hover:bg-brand-red hover:text-white hover:border-brand-red active:scale-[0.98]"
            >
              <Sparkles className="h-4 w-4 text-brand-red group-hover:text-amber-300 transition-colors" />
              <span>Explore AI Unlocked</span>
            </Link>

            {/* Get in Touch Primary CTA Button */}
            <Link
              to="/contact"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-ink py-3.5 text-xs sm:text-sm font-extrabold text-white shadow-xl transition-all hover:bg-brand-red active:scale-[0.98]"
            >
              <span>Get in Touch with Red Dot</span>
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
