import { useState, useEffect, useRef, useMemo, memo } from "react";
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
  ChevronDown,
  Building2,
  Users,
  Award,
  Briefcase,
  TrendingUp,
  Bot,
  Stethoscope,
  CheckCircle2,
  Target,
  Code2,
  Megaphone,
} from "lucide-react";
import { Magnetic } from "@/components/motion/Magnetic";
import { getCourses, getCachedCourses } from "@/lib/api";
import { stripHtml } from "@/lib/sanitize";

type MegaMenuKey = "about" | "pecp" | "courses" | "ai-unlocked";

interface MegaSubItem {
  title: string;
  desc: string;
  href: string;
  badge?: string;
  badgeColor?: string;
  iconBg?: string;
  iconColor?: string;
  icon: any;
}

interface MegaMenuSection {
  heading: string;
  items: MegaSubItem[];
}

interface MegaMenuConfig {
  id: MegaMenuKey;
  label: string;
  href: string;
  icon: any;
  sections: MegaMenuSection[];
  featured: {
    badge: string;
    title: string;
    desc: string;
    href: string;
    ctaText: string;
    gradient: string;
    highlights?: string[];
  };
  bottomBar?: {
    text: string;
    ctaText: string;
    href: string;
  };
}

function getCategoryIcon(category?: string) {
  if (!category) return BookOpen;
  const lower = category.toLowerCase();
  if (
    lower.includes("ai") ||
    lower.includes("artificial") ||
    lower.includes("machine") ||
    lower.includes("intelligence")
  ) {
    return Bot;
  }
  if (
    lower.includes("web") ||
    lower.includes("programming") ||
    lower.includes("software") ||
    lower.includes("code") ||
    lower.includes("c++") ||
    lower.includes("java")
  ) {
    return Code2;
  }
  if (
    lower.includes("marketing") ||
    lower.includes("digital") ||
    lower.includes("seo") ||
    lower.includes("media")
  ) {
    return Megaphone;
  }
  if (
    lower.includes("project") ||
    lower.includes("agile") ||
    lower.includes("scrum") ||
    lower.includes("management")
  ) {
    return Briefcase;
  }
  if (lower.includes("leadership") || lower.includes("executive") || lower.includes("team")) {
    return Users;
  }
  if (
    lower.includes("analytics") ||
    lower.includes("data") ||
    lower.includes("sql") ||
    lower.includes("business")
  ) {
    return TrendingUp;
  }
  if (lower.includes("quality") || lower.includes("sigma") || lower.includes("cert")) {
    return Award;
  }
  return BookOpen;
}

function getCategoryIconBg(category?: string) {
  if (!category) return "bg-red-50 text-brand-red border-red-200/60";
  const lower = category.toLowerCase();
  if (lower.includes("ai") || lower.includes("artificial")) {
    return "bg-red-50 text-brand-red border-red-200/60";
  }
  if (lower.includes("web") || lower.includes("programming") || lower.includes("software")) {
    return "bg-indigo-50 text-indigo-600 border-indigo-200/60";
  }
  if (lower.includes("marketing") || lower.includes("digital")) {
    return "bg-orange-50 text-orange-600 border-orange-200/60";
  }
  if (lower.includes("project") || lower.includes("agile")) {
    return "bg-blue-50 text-blue-600 border-blue-200/60";
  }
  if (lower.includes("leadership") || lower.includes("executive")) {
    return "bg-purple-50 text-purple-600 border-purple-200/60";
  }
  if (lower.includes("analytics") || lower.includes("data")) {
    return "bg-emerald-50 text-emerald-600 border-emerald-200/60";
  }
  if (lower.includes("quality") || lower.includes("sigma")) {
    return "bg-amber-50 text-amber-600 border-amber-200/60";
  }
  return "bg-rose-50 text-brand-red border-rose-200/60";
}

function getCategoryBadgeColor(category?: string) {
  if (!category) return "bg-red-50 text-brand-red border-red-200";
  const lower = category.toLowerCase();
  if (lower.includes("ai") || lower.includes("artificial")) {
    return "bg-red-50 text-brand-red border-red-200";
  }
  if (lower.includes("web") || lower.includes("programming") || lower.includes("software")) {
    return "bg-indigo-50 text-indigo-800 border-indigo-200";
  }
  if (lower.includes("marketing") || lower.includes("digital")) {
    return "bg-orange-50 text-orange-800 border-orange-200";
  }
  if (lower.includes("project") || lower.includes("agile")) {
    return "bg-blue-50 text-blue-800 border-blue-200";
  }
  if (lower.includes("leadership") || lower.includes("executive")) {
    return "bg-purple-50 text-purple-800 border-purple-200";
  }
  if (lower.includes("analytics") || lower.includes("data")) {
    return "bg-emerald-50 text-emerald-800 border-emerald-200";
  }
  if (lower.includes("quality") || lower.includes("sigma")) {
    return "bg-amber-50 text-amber-800 border-amber-200";
  }
  return "bg-slate-100 text-slate-700 border-slate-200";
}

const STATIC_MEGA_MENUS: Omit<Record<MegaMenuKey, MegaMenuConfig>, "courses"> = {
  about: {
    id: "about",
    label: "About Us",
    href: "/about",
    icon: Info,
    sections: [
      {
        heading: "Who We Are",
        items: [
          {
            title: "Our Mission & Vision",
            desc: "Empowering Nepal's digital workforce through global academic excellence.",
            href: "/about#vision-mission",
            iconBg: "bg-red-50 text-brand-red border-red-200/60",
            icon: Building2,
          },
          {
            title: "USC Upstate Partnership",
            desc: "Academic collaboration with University of South Carolina Upstate (USA).",
            href: "/about#partnership",
            badge: "USC USA",
            badgeColor: "bg-red-50 text-brand-red border-red-200",
            iconBg: "bg-rose-50 text-rose-600 border-rose-200/60",
            icon: GraduationCap,
          },
          {
            title: "Our Guiding Principles",
            desc: "5 core values driving academic rigor, accessibility & excellence.",
            href: "/about#core-values",
            iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200/60",
            icon: Award,
          },
          {
            title: "Why Choose Red Dot",
            desc: "100% practical lab-driven curriculum & executive career readiness.",
            href: "/about#why-choose-us",
            iconBg: "bg-amber-50 text-amber-600 border-amber-200/60",
            icon: Target,
          },
        ],
      },
    ],
    featured: {
      badge: "GLOBAL ACCREDITATION",
      title: "USC Upstate USA Partnership",
      desc: "Delivering world-class executive education and international certification directly in Kathmandu.",
      href: "/about#partnership",
      ctaText: "Discover Our Story",
      gradient: "from-[#0F1E3D] via-[#162A53] to-[#1E3A70]",
      highlights: ["U.S. Accredited Standard", "AACSB Aligned Faculty", "Direct Global Credential"],
    },
    bottomBar: {
      text: "Looking for enterprise workforce training & audits?",
      ctaText: "Schedule Corporate Advisory Call →",
      href: "/contact?subject=Enterprise%20Workforce%20Training",
    },
  },

  pecp: {
    id: "pecp",
    label: "PECP",
    href: "/pecp",
    icon: GraduationCap,
    sections: [
      {
        heading: "Strategic Collaboration & Overview",
        items: [
          {
            title: "Who We Are",
            desc: "Pioneering collaboration between USC Upstate JCBE (USA) & Red Dot.",
            href: "/pecp#who-we-are",
            badge: "STRATEGIC",
            badgeColor: "bg-red-50 text-brand-red border-red-200",
            iconBg: "bg-red-50 text-brand-red border-red-200/60",
            icon: Building2,
          },
          {
            title: "About USC Upstate",
            desc: "Official U.S. academic partner & accredited business school standard.",
            href: "/pecp#partnership",
            badge: "USC USA",
            badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
            iconBg: "bg-rose-50 text-rose-600 border-rose-200/60",
            icon: GraduationCap,
          },
          {
            title: "Why Choose PECP?",
            desc: "5 program advantages: global recognition, faculty & career outcomes.",
            href: "/pecp#advantages",
            badge: "ADVANTAGES",
            badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
            iconBg: "bg-amber-50 text-amber-600 border-amber-200/60",
            icon: Award,
          },
          {
            title: "Target Audience",
            desc: "Designed for aspiring graduates, working professionals & executives.",
            href: "/pecp#audiences",
            badge: "WHO IT'S FOR",
            badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
            iconBg: "bg-blue-50 text-blue-600 border-blue-200/60",
            icon: Users,
          },
        ],
      },
    ],
    featured: {
      badge: "NEW 2026 COHORTS",
      title: "Executive Excellence Program",
      desc: "Instructor-led, cohort-based diploma designed with the University of South Carolina Upstate.",
      href: "/pecp#curriculum",
      ctaText: "Explore Full PECP Syllabus",
      gradient: "from-[#111C30] via-[#1A2E50] to-[#7F1D1D]",
      highlights: ["U.S. University Diploma", "Live Capstone Defense", "100% Weekend Compatible"],
    },
    bottomBar: {
      text: "Admissions currently in progress for the upcoming cohort.",
      ctaText: "Enquire for Corporate Cohorts →",
      href: "/contact?subject=PECP%20Corporate%20Cohort%20Inquiry",
    },
  },

  "ai-unlocked": {
    id: "ai-unlocked",
    label: "AI Unlocked",
    href: "/ai-unlocked",
    icon: Sparkles,
    sections: [
      {
        heading: "Specialized Sector Tracks",
        items: [
          {
            title: "AI Foundations (General)",
            desc: "5 Modules: Prompt Engineering, Workflows & Productivity.",
            href: "/ai-unlocked?track=foundations",
            badge: "100% FREE",
            badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
            iconBg: "bg-amber-50 text-amber-600 border-amber-200/60",
            icon: Bot,
          },
          {
            title: "AI for Healthcare",
            desc: "9 Clinical Modules: Diagnostics, Medical Ethics & Patient Care.",
            href: "/ai-unlocked?track=healthcare",
            badge: "CLINICAL",
            badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
            iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200/60",
            icon: Stethoscope,
          },
          {
            title: "AI for Finance & Banking",
            desc: "8 Modules (Level 1): AML, Fraud, Risk & FinTech Operations.",
            href: "/ai-unlocked?track=finance",
            badge: "LEVEL 1",
            badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
            iconBg: "bg-blue-50 text-blue-600 border-blue-200/60",
            icon: Building2,
          },
          {
            title: "Advanced AI for Finance",
            desc: "12 Modules (Level 2): Architecture, XAI, Agents & Operating Models.",
            href: "/ai-unlocked?track=finance-advanced",
            badge: "LEVEL 2",
            badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
            iconBg: "bg-purple-50 text-purple-600 border-purple-200/60",
            icon: Sparkles,
          },
          {
            title: "AI for Teachers & Educators",
            desc: "12 Modules: Pedagogy, Workload, Integrity & School AI Leadership.",
            href: "/ai-unlocked?track=education",
            badge: "PEDAGOGY",
            badgeColor: "bg-teal-50 text-teal-700 border-teal-200 font-bold",
            iconBg: "bg-teal-50 text-teal-600 border-teal-200/60",
            icon: GraduationCap,
          },
          {
            title: "AI for Management",
            desc: "12 Modules: Strategy, Decision Rights, ROI & Transformation.",
            href: "/ai-unlocked?track=management",
            badge: "EXECUTIVE",
            badgeColor: "bg-amber-50 text-amber-700 border-amber-200 font-bold",
            iconBg: "bg-amber-50 text-amber-600 border-amber-200/60",
            icon: Briefcase,
          },
          {
            title: "Agile for Software Developers",
            desc: "12 Modules: Sprints, TDD, CI/CD, XP Practices & Team Flow.",
            href: "/ai-unlocked?track=agile-developers",
            badge: "DEVELOPER",
            badgeColor: "bg-sky-50 text-sky-700 border-sky-200 font-bold",
            iconBg: "bg-sky-50 text-sky-600 border-sky-200/60",
            icon: Code2,
          },
          {
            title: "Agile Methodologies for Managers",
            desc: "12 Modules: Strategy, Metrics That Matter, Governance & Scaling.",
            href: "/ai-unlocked?track=agile-managers",
            badge: "LEADERSHIP",
            badgeColor: "bg-teal-50 text-teal-700 border-teal-200 font-bold",
            iconBg: "bg-teal-50 text-teal-600 border-teal-200/60",
            icon: Users,
          },
        ],
      },
    ],
    featured: {
      badge: "APPLIED AI ACADEMY",
      title: "Nepal's Applied AI Academy",
      desc: "Interactive micro-learning with sector-tailored scenario quizzes, verified certificate dispatch, and executive readiness.",
      href: "/ai-unlocked",
      ctaText: "Launch AI Learning Hub",
      gradient: "from-[#064E3B] via-[#0F1E3D] to-[#0A2540]",
      highlights: ["8 Domain Curricula", "82 In-Depth Modules", "Instant Verified Certificate"],
    },
    bottomBar: {
      text: "Already completed your course modules?",
      ctaText: "Verify Your Certificate Online →",
      href: "/verify",
    },
  },
};

export const Navbar = memo(function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<MegaMenuKey | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});
  const [courses, setCourses] = useState<any[]>(() => getCachedCourses() || []);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  const currentPath = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  // Load live courses from API and subscribe to real-time update events
  useEffect(() => {
    const loadCourses = () => {
      getCourses()
        .then((data) => {
          if (Array.isArray(data)) {
            setCourses(data);
          }
        })
        .catch(() => {});
    };

    loadCourses();

    const handleCoursesUpdated = () => {
      loadCourses();
    };

    window.addEventListener("courses-updated", handleCoursesUpdated);
    return () => {
      window.removeEventListener("courses-updated", handleCoursesUpdated);
    };
  }, []);

  // Dynamically compute mega menus including newly added/updated courses from admin
  const megaMenus: Record<MegaMenuKey, MegaMenuConfig> = useMemo(() => {
    const dynamicCourseItems: MegaSubItem[] = courses.slice(0, 6).map((c) => {
      const cleanDesc = stripHtml(c.description);
      return {
        title: c.name,
        desc: cleanDesc
          ? cleanDesc.slice(0, 160) + (cleanDesc.length > 160 ? "..." : "")
          : c.category || "Professional Certification",
        href: `/courses/${c.id}`,
        badge: c.category || "Course",
        badgeColor: getCategoryBadgeColor(c.category),
        iconBg: getCategoryIconBg(c.category),
        icon: getCategoryIcon(c.category),
      };
    });

    const categoryFallbackItems: MegaSubItem[] = [
      {
        title: "Artificial Intelligence & ML",
        desc: "Generative AI, Prompt Engineering & Workflow Automation.",
        href: "/courses?category=Artificial+Intelligence#catalog",
        badge: "AI & ML",
        badgeColor: "bg-red-50 text-brand-red border-red-200",
        iconBg: "bg-red-50 text-brand-red border-red-200/60",
        icon: Bot,
      },
      {
        title: "Project Management & Agile",
        desc: "Scrum Master, Agile Frameworks & PMP® prep.",
        href: "/courses?category=Project+Management#catalog",
        badge: "PMI® / AGILE",
        badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
        iconBg: "bg-blue-50 text-blue-600 border-blue-200/60",
        icon: Briefcase,
      },
      {
        title: "Executive & Leadership",
        desc: "Strategic decision making & corporate leadership.",
        href: "/courses?category=Executive+%26+Leadership#catalog",
        badge: "LEADERSHIP",
        badgeColor: "bg-purple-50 text-purple-800 border-purple-200",
        iconBg: "bg-purple-50 text-purple-600 border-purple-200/60",
        icon: Users,
      },
      {
        title: "Analytics & Data Science",
        desc: "PowerBI, SQL, Python & Statistical Analytics.",
        href: "/courses?category=Analytics+%26+Data#catalog",
        badge: "DATA & SQL",
        badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
        iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200/60",
        icon: TrendingUp,
      },
    ];

    const courseSections: MegaMenuSection[] = [
      {
        heading:
          dynamicCourseItems.length > 0
            ? "Featured & Live Programs"
            : "Explore by Course Category",
        items: dynamicCourseItems.length > 0 ? dynamicCourseItems : categoryFallbackItems,
      },
    ];

    const latestCourse = courses.length > 0 ? courses[0] : null;
    const latestCleanDesc = latestCourse ? stripHtml(latestCourse.description) : "";

    const coursesMegaMenu: MegaMenuConfig = {
      id: "courses",
      label: "Courses",
      href: "/courses",
      icon: BookOpen,
      sections: courseSections,
      featured: latestCourse
        ? {
            badge: latestCourse.category?.toUpperCase() || "NEW COHORT",
            title: latestCourse.name,
            desc: latestCleanDesc
              ? latestCleanDesc.slice(0, 220) +
                (latestCleanDesc.length > 220 ? "..." : "")
              : "Instructor-led professional certification cohort with international credentials.",
            href: `/courses/${latestCourse.id}`,
            ctaText: "View Program Details",
            gradient: "from-slate-900 via-[#1E293B] to-slate-950",
            highlights: [
              latestCourse.duration || "Cohort / Self-Paced",
              latestCourse.delivery ? `${latestCourse.delivery} Delivery` : "Online / Hybrid",
              latestCourse.certification ? "USC Upstate Certified" : "Verified Credential",
            ],
          }
        : {
            badge: "CATALOG 2026",
            title: "Hands-on Industry Curriculum",
            desc: "Learn directly from senior industry leaders with 100% lab-backed capstones and case studies.",
            href: "/courses#catalog",
            ctaText: "Browse All Courses",
            gradient: "from-slate-900 via-[#1E293B] to-slate-950",
            highlights: [
              "Practical Lab Capstones",
              "Industry Veteran Mentors",
              "Direct Career Pathways",
            ],
          },
      bottomBar: {
        text: `Explore all ${courses.length > 0 ? courses.length : "40+"} professional certification cohorts in the catalog.`,
        ctaText: "Browse Full Course Catalog →",
        href: "/courses",
      },
    };

    return {
      ...STATIC_MEGA_MENUS,
      courses: coursesMegaMenu,
    };
  }, [courses]);

  // Scroll detection for sticky navigation pill
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

  // Lock body scroll when mobile menu is open
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

  // Close menus on route navigation
  useEffect(() => {
    setMobileOpen(false);
    setActiveMegaMenu(null);
  }, [currentPath]);

  // Close mega menu on outside click or escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMegaMenu(null);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setActiveMegaMenu(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Hover handlers with debounce bridge to prevent menu flicker
  const handleMouseEnter = (key: MegaMenuKey) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMegaMenu(key);
  };

  const handleMouseLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 140);
  };

  const toggleMobileSubmenu = (key: string) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isNavActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    if (path === "/about") return currentPath.startsWith("/about");
    if (path === "/pecp") return currentPath.startsWith("/pecp");
    if (path === "/courses") return currentPath.startsWith("/courses");
    if (path === "/ai-unlocked") return currentPath.startsWith("/ai-unlocked");
    if (path === "/contact") return currentPath.startsWith("/contact");
    return currentPath.startsWith(path);
  };

  const handleItemNavigation = (e: React.MouseEvent, href: string) => {
    setActiveMegaMenu(null);
    setMobileOpen(false);

    if (href.includes("#")) {
      const [fullPath, hash] = href.split("#");
      const [basePath, queryString] = fullPath.split("?");

      const isCurrent =
        currentPath === basePath ||
        (basePath === "/about" && currentPath.startsWith("/about")) ||
        (basePath === "/pecp" && currentPath.startsWith("/pecp")) ||
        (basePath === "/courses" && currentPath.startsWith("/courses")) ||
        (basePath === "/ai-unlocked" && currentPath.startsWith("/ai-unlocked"));

      if (isCurrent && !queryString) {
        e.preventDefault();
        const el = document.getElementById(hash);
        if (el) {
          const lenis = (window as any).__lenis;
          if (lenis && typeof lenis.scrollTo === "function") {
            lenis.scrollTo(el, { offset: -90, duration: 1.1 });
          } else {
            const offset = 90;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = el.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect - offset;
            window.scrollTo({ top: elementPosition, behavior: "smooth" });
          }
        }
      } else if (isCurrent && queryString) {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            const lenis = (window as any).__lenis;
            if (lenis && typeof lenis.scrollTo === "function") {
              lenis.scrollTo(el, { offset: -90, duration: 1.1 });
            }
          }
        }, 100);
      }
    }
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    setActiveMegaMenu(null);
    setMobileOpen(false);

    const scrollToHero = () => {
      const lenis = (window as any).__lenis;
      const heroEl = document.getElementById("hero");
      if (lenis && typeof lenis.scrollTo === "function") {
        if (heroEl) {
          lenis.scrollTo(heroEl, { offset: 0, duration: 1 });
        } else {
          lenis.scrollTo(0, { duration: 1 });
        }
      } else {
        if (heroEl) {
          heroEl.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    };

    if (currentPath === "/") {
      e.preventDefault();
      scrollToHero();
    } else {
      navigate({ to: "/" })
        .then(() => {
          setTimeout(scrollToHero, 80);
        })
        .catch(() => {});
    }
  };

  return (
    <header
      ref={navContainerRef}
      className={`fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 transition-all duration-500 will-change-transform transform-gpu ${
        scrolled ? "py-2 sm:py-2.5" : "py-3 sm:py-4 lg:py-5"
      }`}
    >
      {/* Floating pill */}
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-3.5 sm:px-5 py-2 transition-all duration-500 relative ${
          scrolled
            ? "bg-white/95 border border-slate-200/90 shadow-[0_12px_35px_-10px_rgba(15,20,30,0.12)] backdrop-blur-md"
            : "bg-white/90 border border-slate-200/60 shadow-xs backdrop-blur-xs"
        }`}
      >
        {/* Left: Brand Logo */}
        <Link
          to="/"
          onClick={handleHomeClick}
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

        {/* Center: Desktop Nav with Interactive Mega Menus */}
        <nav
          className="hidden lg:flex items-center gap-1 rounded-full bg-slate-100/70 p-1 border border-slate-200/60 backdrop-blur-sm relative"
          onMouseLeave={handleMouseLeave}
        >
          {/* Home Link */}
          <Link
            to="/"
            onClick={handleHomeClick}
            onMouseEnter={() => setActiveMegaMenu(null)}
            className={`relative flex items-center gap-2 rounded-full px-3.5 py-[0.42rem] text-[0.8rem] font-bold transition-all duration-200 cursor-pointer ${
              currentPath === "/"
                ? "bg-brand-ink text-white shadow-md"
                : "text-slate-600 hover:text-brand-ink hover:bg-white/80"
            }`}
          >
            {currentPath === "/" && (
              <span className="h-1.5 w-1.5 rounded-full bg-brand-red shadow-sm shrink-0" />
            )}
            <span>Home</span>
          </Link>

          {/* About Us Dropdown Trigger */}
          <div className="relative" onMouseEnter={() => handleMouseEnter("about")}>
            <Link
              to="/about"
              className={`relative flex items-center gap-2 rounded-full px-3.5 py-[0.42rem] text-[0.8rem] font-bold transition-all duration-200 cursor-pointer ${
                isNavActive("/about") || activeMegaMenu === "about"
                  ? "bg-brand-ink text-white shadow-md"
                  : "text-slate-600 hover:text-brand-ink hover:bg-white/80"
              }`}
            >
              {isNavActive("/about") && (
                <span className="h-1.5 w-1.5 rounded-full bg-brand-red shadow-sm shrink-0" />
              )}
              <span>About Us</span>
            </Link>
          </div>

          {/* PECP Dropdown Trigger */}
          <div className="relative" onMouseEnter={() => handleMouseEnter("pecp")}>
            <Link
              to="/pecp"
              className={`relative flex items-center gap-2 rounded-full px-3.5 py-[0.42rem] text-[0.8rem] font-bold transition-all duration-200 cursor-pointer ${
                isNavActive("/pecp") || activeMegaMenu === "pecp"
                  ? "bg-brand-ink text-white shadow-md"
                  : "text-slate-600 hover:text-brand-ink hover:bg-white/80"
              }`}
            >
              {isNavActive("/pecp") && (
                <span className="h-1.5 w-1.5 rounded-full bg-brand-red shadow-sm shrink-0" />
              )}
              <span>PECP</span>
            </Link>
          </div>

          {/* Courses Dropdown Trigger */}
          <div className="relative" onMouseEnter={() => handleMouseEnter("courses")}>
            <Link
              to="/courses"
              className={`relative flex items-center gap-2 rounded-full px-3.5 py-[0.42rem] text-[0.8rem] font-bold transition-all duration-200 cursor-pointer ${
                isNavActive("/courses") || activeMegaMenu === "courses"
                  ? "bg-brand-ink text-white shadow-md"
                  : "text-slate-600 hover:text-brand-ink hover:bg-white/80"
              }`}
            >
              {isNavActive("/courses") && (
                <span className="h-1.5 w-1.5 rounded-full bg-brand-red shadow-sm shrink-0" />
              )}
              <span>Courses</span>
            </Link>
          </div>

          {/* Contact Us Link */}
          <Link
            to="/contact"
            className={`relative flex items-center gap-2 rounded-full px-3.5 py-[0.42rem] text-[0.8rem] font-bold transition-all duration-200 ${
              currentPath === "/contact"
                ? "bg-brand-ink text-white shadow-md"
                : "text-slate-600 hover:text-brand-ink hover:bg-white/80"
            }`}
          >
            {currentPath === "/contact" && (
              <span className="h-1.5 w-1.5 rounded-full bg-brand-red shadow-sm shrink-0" />
            )}
            <span>Contact Us</span>
          </Link>
        </nav>

        {/* Right: Dedicated AI Unlocked Mega Menu Trigger & Mobile Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* AI Unlocked Dedicated Button — Right Side with Mega Menu */}
          <div
            className="hidden sm:block relative"
            onMouseEnter={() => handleMouseEnter("ai-unlocked")}
          >
            <Magnetic strength={0.3}>
              <Link
                to="/ai-unlocked"
                className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full border px-4 sm:px-5 py-1.5 text-[0.78rem] font-bold shadow-md transition-all duration-300 ${
                  isNavActive("/ai-unlocked") || activeMegaMenu === "ai-unlocked"
                    ? "bg-brand-red text-white border-brand-red shadow-lg shadow-brand-red/25 scale-105"
                    : "bg-brand-red text-white border-brand-red hover:bg-red-700 hover:shadow-lg hover:shadow-brand-red/25 hover:scale-105"
                }`}
              >
                <span className="relative z-10 tracking-tight">AI Unlocked</span>
              </Link>
            </Magnetic>
          </div>

          {/* Mobile Direct Quick CTA */}
          <Link
            to="/ai-unlocked"
            className="sm:hidden inline-flex items-center rounded-full bg-brand-red text-white border border-brand-red px-2.5 py-1 text-[11px] font-extrabold shadow-xs active:scale-95"
          >
            <span>AI Unlocked</span>
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

      {/* ── DESKTOP MEGA MENU FLOATING DROPDOWN CONTAINER ── */}
      {activeMegaMenu && megaMenus[activeMegaMenu] && (
        <div
          className="hidden lg:block absolute left-0 right-0 top-full pt-2 px-4 z-50 pointer-events-auto"
          onMouseEnter={() => handleMouseEnter(activeMegaMenu)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="mx-auto max-w-6xl rounded-[1.75rem] bg-white/98 backdrop-blur-2xl border border-slate-200/90 shadow-[0_30px_70px_-15px_rgba(15,23,42,0.18)] p-6 sm:p-7 overflow-hidden transition-all duration-300 animate-fade-in-up">
            {/* Main 3-Column Content Layout */}
            <div className="grid grid-cols-12 gap-6 items-stretch">
              {/* Left & Middle Columns: Categorized Links */}
              <div
                className={`col-span-8 ${
                  megaMenus[activeMegaMenu].sections.length === 1
                    ? "grid grid-cols-1"
                    : "grid grid-cols-2"
                } gap-6`}
              >
                {megaMenus[activeMegaMenu].sections.map((sec, sIdx) => (
                  <div key={sIdx} className="space-y-3">
                    <div className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-400 border-b border-slate-100 pb-2 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                        <span>{sec.heading}</span>
                      </div>
                      {activeMegaMenu === "courses" && (
                        <Link
                          to="/courses"
                          onClick={(e) => handleItemNavigation(e, "/courses")}
                          className="text-[10px] font-bold text-brand-red hover:underline lowercase first-letter:uppercase"
                        >
                          view all ({courses.length}) →
                        </Link>
                      )}
                    </div>

                    <div
                      className={
                        megaMenus[activeMegaMenu].sections.length === 1
                          ? "grid grid-cols-2 gap-3.5"
                          : "space-y-2"
                      }
                    >
                      {sec.items.map((item, iIdx) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={iIdx}
                            to={item.href as any}
                            onClick={(e) => handleItemNavigation(e, item.href)}
                            className="group flex items-start gap-3 rounded-2xl p-2.5 transition-all duration-200 hover:bg-slate-50 border border-transparent hover:border-slate-200/70 hover:shadow-2xs"
                          >
                            <div
                              className={`flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 group-hover:scale-105 shadow-2xs mt-0.5 ${
                                item.iconBg || "bg-slate-100 text-slate-700 border-slate-200/60"
                              }`}
                            >
                              <Icon className="h-4.5 w-4.5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                                {item.badge && (
                                  <span
                                    className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[8.5px] font-black tracking-tight uppercase whitespace-normal leading-tight ${
                                      item.badgeColor || "bg-red-50 text-brand-red border-red-200"
                                    }`}
                                  >
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <h4 className="font-extrabold text-[13px] text-slate-900 group-hover:text-brand-red transition-colors leading-snug line-clamp-2">
                                {item.title}
                              </h4>
                              <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-2 mt-1">
                                {item.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: High-Impact Featured Showcase Card */}
              <div className="col-span-4 flex flex-col">
                <div
                  className={`flex-1 rounded-2xl bg-gradient-to-br ${megaMenus[activeMegaMenu].featured.gradient} p-5 sm:p-5.5 text-white shadow-xl border border-white/15 flex flex-col justify-between relative overflow-hidden group`}
                >
                  {/* Subtle ambient lighting */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />

                  <div className="relative z-10 space-y-3">
                    <div className="inline-flex items-center gap-1 rounded-full bg-white/15 border border-white/20 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-[#F0DCB4]">
                      <Sparkles className="h-2.5 w-2.5 text-amber-300" />
                      <span>{megaMenus[activeMegaMenu].featured.badge}</span>
                    </div>

                    <h4 className="text-sm sm:text-base font-black text-white leading-snug line-clamp-3">
                      {megaMenus[activeMegaMenu].featured.title}
                    </h4>

                    <p className="text-[11.5px] text-slate-200 leading-relaxed font-medium line-clamp-4">
                      {megaMenus[activeMegaMenu].featured.desc}
                    </p>

                    {megaMenus[activeMegaMenu].featured.highlights && (
                      <div className="space-y-1 pt-1 border-t border-white/10">
                        {megaMenus[activeMegaMenu].featured.highlights.map((hl, hIdx) => (
                          <div
                            key={hIdx}
                            className="flex items-center gap-1.5 text-[10.5px] font-bold text-slate-200 truncate"
                          >
                            <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                            <span className="truncate">{hl}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="relative z-10 pt-4">
                    <Link
                      to={megaMenus[activeMegaMenu].featured.href as any}
                      onClick={(e) =>
                        handleItemNavigation(e, megaMenus[activeMegaMenu].featured.href)
                      }
                      className="inline-flex items-center justify-between w-full rounded-xl bg-white text-slate-900 hover:bg-brand-red hover:text-white font-extrabold text-xs px-3.5 py-2.5 transition-all shadow-md group-hover:translate-x-0.5 cursor-pointer"
                    >
                      <span>{megaMenus[activeMegaMenu].featured.ctaText}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Helper Bar Strip */}
            {megaMenus[activeMegaMenu].bottomBar && (
              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">
                  {megaMenus[activeMegaMenu].bottomBar?.text}
                </span>
                <Link
                  to={megaMenus[activeMegaMenu].bottomBar?.href as any}
                  onClick={(e) =>
                    handleItemNavigation(e, megaMenus[activeMegaMenu].bottomBar?.href || "")
                  }
                  className="font-bold text-brand-red hover:underline flex items-center gap-1"
                >
                  <span>{megaMenus[activeMegaMenu].bottomBar?.ctaText}</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── MOBILE ACCORDION DRAWER OVERLAY & PANEL ── */}
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
          className={`relative mx-3 sm:mx-4 mt-[4.25rem] rounded-[2rem] p-4 sm:p-6 shadow-2xl transition-all duration-400 max-h-[85vh] overflow-y-auto ${
            mobileOpen ? "translate-y-0 opacity-100 scale-100" : "-translate-y-4 opacity-0 scale-95"
          }`}
          style={{
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(28px)",
            border: "1px solid rgba(226, 232, 240, 0.95)",
          }}
        >
          {/* Header Row inside Drawer */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <Link
              to="/"
              onClick={handleHomeClick}
              className="flex items-center gap-2 cursor-pointer active:scale-95 transition-transform"
            >
              <img src="/logo.png" alt="Red Dot Logo" className="h-7 w-auto object-contain" />
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-brand-red hover:text-white transition-all active:scale-90"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Navigation Items with Accordion Submenus */}
          <div className="space-y-1.5">
            {/* 1. Home */}
            <Link
              to="/"
              onClick={handleHomeClick}
              className={`flex items-center justify-between rounded-2xl px-4 py-2.5 text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                currentPath === "/"
                  ? "bg-brand-ink text-white shadow-md"
                  : "text-slate-700 hover:bg-slate-50 hover:text-brand-ink"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                    currentPath === "/" ? "bg-brand-red text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <Home className="h-4 w-4" />
                </div>
                <span>Home</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-300" />
            </Link>

            {/* 2. About Us Accordion */}
            <div className="rounded-2xl border border-slate-100 overflow-hidden bg-slate-50/40">
              <div className="flex items-center justify-between px-4 py-2.5">
                <Link
                  to="/about"
                  className="flex items-center gap-3 font-extrabold text-sm text-slate-800 hover:text-brand-red flex-1"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <Info className="h-4 w-4" />
                  </div>
                  <span>About Us</span>
                </Link>
                <button
                  type="button"
                  onClick={() => toggleMobileSubmenu("about")}
                  className="p-1.5 text-slate-400 hover:text-slate-800"
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      mobileExpanded.about ? "rotate-180 text-brand-red" : ""
                    }`}
                  />
                </button>
              </div>

              {mobileExpanded.about && (
                <div className="px-3 pb-3 space-y-1.5 pt-1 border-t border-slate-100 bg-white">
                  {megaMenus.about.sections
                    .flatMap((s) => s.items)
                    .map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={idx}
                          to={item.href as any}
                          onClick={(e) => handleItemNavigation(e, item.href)}
                          className="flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-brand-red transition-all"
                        >
                          <div
                            className={`h-7.5 w-7.5 rounded-lg flex items-center justify-center shrink-0 border ${
                              item.iconBg || "bg-slate-100 text-slate-500 border-slate-200/60"
                            }`}
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-1.5">
                              <span className="line-clamp-2 leading-snug break-words text-[11.5px] sm:text-xs font-bold text-slate-800">{item.title}</span>
                              {item.badge && (
                                <span
                                  className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[8px] font-black leading-none mt-0.5 ${
                                    item.badgeColor || "bg-red-50 text-brand-red border-red-200"
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              )}
            </div>

            {/* 3. PECP Accordion */}
            <div className="rounded-2xl border border-slate-100 overflow-hidden bg-slate-50/40">
              <div className="flex items-center justify-between px-4 py-2.5">
                <Link
                  to="/pecp"
                  className="flex items-center gap-3 font-extrabold text-sm text-slate-800 hover:text-brand-red flex-1"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <span>PECP Program</span>
                </Link>
                <button
                  type="button"
                  onClick={() => toggleMobileSubmenu("pecp")}
                  className="p-1.5 text-slate-400 hover:text-slate-800"
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      mobileExpanded.pecp ? "rotate-180 text-brand-red" : ""
                    }`}
                  />
                </button>
              </div>

              {mobileExpanded.pecp && (
                <div className="px-3 pb-3 space-y-1.5 pt-1 border-t border-slate-100 bg-white">
                  {megaMenus.pecp.sections
                    .flatMap((s) => s.items)
                    .map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={idx}
                          to={item.href as any}
                          onClick={(e) => handleItemNavigation(e, item.href)}
                          className="flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-brand-red transition-all"
                        >
                          <div
                            className={`h-7.5 w-7.5 rounded-lg flex items-center justify-center shrink-0 border ${
                              item.iconBg || "bg-slate-100 text-slate-500 border-slate-200/60"
                            }`}
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-1.5">
                              <span className="line-clamp-2 leading-snug break-words text-[11.5px] sm:text-xs font-bold text-slate-800">{item.title}</span>
                              {item.badge && (
                                <span
                                  className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[8px] font-black leading-none mt-0.5 ${
                                    item.badgeColor || "bg-red-50 text-brand-red border-red-200"
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              )}
            </div>

            {/* 4. Courses Accordion */}
            <div className="rounded-2xl border border-slate-100 overflow-hidden bg-slate-50/40">
              <div className="flex items-center justify-between px-4 py-2.5">
                <Link
                  to="/courses"
                  className="flex items-center gap-3 font-extrabold text-sm text-slate-800 hover:text-brand-red flex-1"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <span>Courses</span>
                </Link>
                <button
                  type="button"
                  onClick={() => toggleMobileSubmenu("courses")}
                  className="p-1.5 text-slate-400 hover:text-slate-800"
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      mobileExpanded.courses ? "rotate-180 text-brand-red" : ""
                    }`}
                  />
                </button>
              </div>

              {mobileExpanded.courses && (
                <div className="px-3 pb-3 space-y-1.5 pt-1 border-t border-slate-100 bg-white">
                  {megaMenus.courses.sections
                    .flatMap((s) => s.items)
                    .map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={idx}
                          to={item.href as any}
                          onClick={(e) => handleItemNavigation(e, item.href)}
                          className="flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-brand-red transition-all"
                        >
                          <div
                            className={`h-7.5 w-7.5 rounded-lg flex items-center justify-center shrink-0 border ${
                              item.iconBg || "bg-slate-100 text-slate-500 border-slate-200/60"
                            }`}
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1 mb-0.5">
                              {item.badge && (
                                <span
                                  className={`inline-flex rounded-full border px-1.5 py-0.2 text-[8px] font-black ${
                                    item.badgeColor || "bg-red-50 text-brand-red border-red-200"
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <span className="line-clamp-2 leading-snug">{item.title}</span>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              )}
            </div>

            {/* 5. AI Unlocked Accordion */}
            <div className="rounded-2xl border border-slate-100 overflow-hidden bg-slate-50/40">
              <div className="flex items-center justify-between px-4 py-2.5">
                <Link
                  to="/ai-unlocked"
                  className="flex items-center gap-3 font-extrabold text-sm text-slate-800 hover:text-brand-red flex-1"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-50 text-brand-red">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <span className="flex items-center gap-1.5">
                    <span>AI Unlocked</span>
                    <span className="rounded-full bg-red-100 text-brand-red px-1.5 py-0.2 text-[9px] font-black">
                      HOT
                    </span>
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => toggleMobileSubmenu("ai-unlocked")}
                  className="p-1.5 text-slate-400 hover:text-slate-800"
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      mobileExpanded["ai-unlocked"] ? "rotate-180 text-brand-red" : ""
                    }`}
                  />
                </button>
              </div>

              {mobileExpanded["ai-unlocked"] && (
                <div className="px-3 pb-3 space-y-1.5 pt-1 border-t border-slate-100 bg-white">
                  {megaMenus["ai-unlocked"].sections
                    .flatMap((s) => s.items)
                    .map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={idx}
                          to={item.href as any}
                          onClick={(e) => handleItemNavigation(e, item.href)}
                          className="flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-brand-red transition-all"
                        >
                          <div
                            className={`h-7.5 w-7.5 rounded-lg flex items-center justify-center shrink-0 border ${
                              item.iconBg || "bg-slate-100 text-slate-500 border-slate-200/60"
                            }`}
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-1.5">
                              <span className="line-clamp-2 leading-snug break-words text-[11.5px] sm:text-xs font-bold text-slate-800">{item.title}</span>
                              {item.badge && (
                                <span
                                  className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[8px] font-black leading-none mt-0.5 ${
                                    item.badgeColor || "bg-red-50 text-brand-red border-red-200"
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              )}
            </div>

            {/* 6. Contact Us */}
            <Link
              to="/contact"
              className={`flex items-center justify-between rounded-2xl px-4 py-2.5 text-sm font-extrabold transition-all duration-200 ${
                currentPath === "/contact"
                  ? "bg-brand-ink text-white shadow-md"
                  : "text-slate-700 hover:bg-slate-50 hover:text-brand-ink"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                    currentPath === "/contact"
                      ? "bg-brand-red text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <PhoneCall className="h-4 w-4" />
                </div>
                <span>Contact Us</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-300" />
            </Link>
          </div>

          {/* Bottom Action CTA Buttons Stack */}
          <div className="pt-3.5 mt-3.5 border-t border-slate-100 space-y-2">
            <Link
              to="/ai-unlocked"
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-50 border border-slate-200/90 py-3 text-xs sm:text-sm font-extrabold text-brand-ink shadow-xs transition-all hover:bg-brand-red hover:text-white hover:border-brand-red active:scale-[0.98]"
            >
              <Sparkles className="h-4 w-4 text-brand-red group-hover:text-amber-300 transition-colors" />
              <span>Explore AI Unlocked Academy</span>
            </Link>

            <Link
              to="/contact"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-ink py-3 text-xs sm:text-sm font-extrabold text-white shadow-xl transition-all hover:bg-brand-red active:scale-[0.98]"
            >
              <span>Get in Touch with Red Dot</span>
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
});
