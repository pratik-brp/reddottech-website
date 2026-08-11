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
    return currentPath.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 transition-all duration-500 ${scrolled ? "py-2.5" : "py-4 lg:py-5"
        }`}
    >
      {/* Floating pill */}
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-[1.4rem] px-3 sm:px-5 py-2 transition-all duration-500 relative ${scrolled
          ? "bg-white/85 border border-slate-200/80 shadow-[0_12px_40px_-12px_rgba(15,20,30,0.12)] backdrop-blur-xl"
          : "bg-white/40 border border-white/60 backdrop-blur-md"
          }`}
      >
        {/* Left: Logo */}
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
          className="shrink-0 flex items-center transition-all duration-300 hover:opacity-80 active:scale-95"
          aria-label="RedDot Technologies — Home"
        >
          <img
            src="/logo.png"
            alt="RedDot Technologies"
            className={`w-auto object-contain transition-all duration-500 ${scrolled ? "h-7 sm:h-8" : "h-8 sm:h-9 md:h-10"
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
                className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-[0.4rem] text-[0.8rem] font-bold transition-all duration-300 ${active
                  ? "bg-brand-ink text-white shadow-md"
                  : "text-slate-600 hover:text-brand-ink hover:bg-white/80"
                  }`}
              >
                {active && (
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-red shadow-sm animate-glow-pulse" />
                )}
                <span>{link.name}</span>
                {link.badge && (
                  <span
                    className={`ml-0.5 text-[8px] font-extrabold px-1.5 py-px rounded-full uppercase tracking-wider ${link.badge === "FREE"
                      ? "bg-gradient-to-r from-brand-red to-rose-500 text-white"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-200/80"
                      }`}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: CTA & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <Magnetic strength={0.3}>
            <Link
              to="/ai-unlocked"
              className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-white/90 border border-slate-200/90 px-3.5 sm:px-4 py-1.5 text-[0.8rem] font-bold text-brand-ink shadow-xs transition-all duration-300 hover:bg-brand-red hover:text-white hover:border-brand-red hover:shadow-lg hover:shadow-brand-red/20 hover:scale-105"
            >
              <Sparkles className="h-3.5 w-3.5 text-brand-red transition-colors group-hover:text-amber-300 group-hover:animate-pulse" />
              <span>AI Unlocked</span>
            </Link>
          </Magnetic>

          <Magnetic strength={0.3}>
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand-ink pl-4 sm:pl-5 pr-1.5 py-1.5 text-[0.8rem] font-bold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/15"
            >
              <span className="relative z-10">Get in Touch</span>
              <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white text-brand-ink transition-all duration-300 group-hover:bg-brand-red group-hover:text-white group-hover:rotate-45">
                <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
              </span>
            </Link>
          </Magnetic>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand-ink border border-slate-200/80 shadow-sm transition-all hover:bg-white lg:hidden focus:outline-none active:scale-90"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <div
          className="absolute inset-0 bg-brand-ink/40 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
        />

        <div
          className={`relative mx-3 sm:mx-4 mt-[4.5rem] rounded-2xl p-5 sm:p-6 shadow-2xl transition-all duration-500 ${mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
            }`}
          style={{
            background: "rgba(255, 255, 255, 0.97)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(226, 232, 240, 0.9)",
          }}
        >
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <img src="/logo.png" alt="RedDot Logo" className="h-7 w-auto object-contain" />
            <button
              onClick={() => setMobileOpen(false)}
              className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link, idx) => {
              const IconComponent = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  to={link.href as any}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 ${active
                    ? "bg-brand-ink text-white shadow-md"
                    : "text-slate-700 hover:bg-slate-50"
                    }`}
                  style={{ transitionDelay: mobileOpen ? `${idx * 40}ms` : "0ms" }}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent
                      className={`h-4 w-4 ${active ? "text-brand-red" : "text-slate-400"}`}
                    />
                    <span>{link.name}</span>
                  </div>
                  {link.badge && (
                    <span
                      className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${link.badge === "FREE"
                        ? "bg-brand-red text-white"
                        : "bg-emerald-50 text-emerald-700"
                        }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 space-y-2">
            <Link
              to="/ai-unlocked"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 py-3 text-sm font-bold text-brand-ink shadow-xs transition-all hover:bg-brand-red hover:text-white hover:border-brand-red active:scale-95"
            >
              <Sparkles className="h-4 w-4 text-brand-red group-hover:text-amber-300 transition-colors" />
              <span>AI Unlocked</span>
            </Link>

            <Link
              to="/contact"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-ink py-3 text-sm font-bold text-white shadow-lg transition-all active:scale-95"
            >
              <span>Connect With Us</span>
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
