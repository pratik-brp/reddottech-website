import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  BookOpen,
  Mail,
  Bell,
  Award,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronDown,
  User,
} from "lucide-react";
import { ReactNode, useState, useEffect } from "react";
import { toast } from "sonner";
import { logoutAdmin, getDashboardStats } from "@/lib/api";
import { clearAuth, getAdminEmail, isAdminAuthed } from "@/lib/auth";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export function AdminLayout({ children, title, subtitle, actions }: AdminLayoutProps) {
  const routerState = useRouterState();
  const navigate = useNavigate();
  const currentPath = routerState.location.pathname;
  const adminEmail = getAdminEmail() || "info@reddottech.com.np";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [stats, setStats] = useState({
    coursesCount: 0,
    contactsCount: 0,
    subscriptionsCount: 0,
    certificatesCount: 0,
  });

  useEffect(() => {
    getDashboardStats().then((data) => {
      if (data) setStats(data);
    });
  }, []);

  const adminNav = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      count: null,
    },
    {
      name: "Courses",
      href: "/admin/courses",
      icon: BookOpen,
      count: stats.coursesCount,
    },
    {
      name: "Contact Inquiries",
      href: "/admin/contacts",
      icon: Mail,
      count: stats.contactsCount,
    },
    {
      name: "Certificates",
      href: "/admin/certificates",
      icon: Award,
      count: stats.certificatesCount,
    },
    {
      name: "Newsletter Subscribers",
      href: "/admin/subscriptions",
      icon: Bell,
      count: stats.subscriptionsCount,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
      count: null,
    },
  ];

  const handleLogout = async () => {
    try {
      if (isAdminAuthed()) {
        await logoutAdmin();
      }
    } catch {
      // clear session locally
    } finally {
      clearAuth();
      toast.info("Signed out successfully.");
      navigate({ to: "/admin/login" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col lg:flex-row text-slate-800 antialiased">
      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Clean White Professional Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white text-slate-700 flex flex-col shrink-0 border-r border-slate-200 shadow-xs transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo Brand Header */}
        <div className="h-16 px-6 border-b border-slate-100 flex items-center justify-between">
          <Link to="/admin/dashboard" className="flex items-center">
            <img
              src="/logo.png"
              alt="Red Dot Technologies"
              className="h-8 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/common/logo.png";
              }}
            />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 lg:hidden cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="px-4 py-4">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Main Menu
          </p>

          <nav className="space-y-1">
            {adminNav.map((item) => {
              const Icon = item.icon;
              const active =
                currentPath === item.href ||
                (item.href !== "/admin/dashboard" && currentPath.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-colors ${
                    active
                      ? "bg-slate-900 text-white font-bold shadow-xs"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${active ? "text-white" : "text-slate-400"}`} />
                    <span>{item.name}</span>
                  </div>

                  {item.count !== null && item.count > 0 && (
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom Action Area */}
        <div className="mt-auto p-4 border-t border-slate-100 space-y-2 bg-slate-50/50">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
              View Website
            </span>
            <span className="text-[10px] text-slate-400">↗</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between rounded-xl px-3.5 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl lg:hidden cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 truncate">{title}</h1>
              {subtitle && (
                <p className="text-xs text-slate-500 font-normal hidden sm:block truncate">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {actions}

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 transition-colors cursor-pointer"
              >
                <div className="h-6 w-6 rounded-full bg-slate-800 text-white font-bold text-xs flex items-center justify-center">
                  {adminEmail.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-semibold text-slate-700 hidden sm:block">
                  {adminEmail}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400 hidden sm:block" />
              </button>

              {profileDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setProfileDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-lg p-1.5 z-40 space-y-1 text-xs">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                        Administrator
                      </p>
                      <p className="font-bold text-slate-800 truncate">{adminEmail}</p>
                    </div>

                    <Link
                      to="/admin/settings"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <Settings className="h-3.5 w-3.5 text-slate-400" />
                      <span>Account Settings</span>
                    </Link>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-rose-600 hover:bg-rose-50 transition-colors font-semibold cursor-pointer"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-6 sm:p-8 flex-1 max-w-7xl w-full mx-auto space-y-6">{children}</main>
      </div>
    </div>
  );
}
