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
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { ReactNode } from "react";
import { toast } from "sonner";
import { logoutAdmin } from "@/lib/api";
import { clearAuth, getAdminEmail, isAdminAuthed } from "@/lib/auth";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const routerState = useRouterState();
  const navigate = useNavigate();
  const currentPath = routerState.location.pathname;
  const adminEmail = getAdminEmail();

  const adminNav = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Courses", href: "/admin/courses", icon: BookOpen },
    { name: "Contacts", href: "/admin/contacts", icon: Mail },
    { name: "Newsletter", href: "/admin/subscriptions", icon: Bell },
    { name: "Certificates", href: "/admin/certificates", icon: Award },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      if (isAdminAuthed()) {
        await logoutAdmin();
      }
    } catch {
      // The session token is cleared locally regardless of network state.
    } finally {
      clearAuth();
      toast.info("Logged out of Admin Control Panel.");
      navigate({ to: "/admin/login" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans flex text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0F172A] text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="font-extrabold text-lg text-white tracking-wide">Red Dot Admin</h2>
            <p className="text-[11px] text-slate-400">Control Panel Studio</p>
          </div>
          <span className="rounded-full bg-[var(--brand-red)] px-2 py-0.5 text-[10px] font-bold">
            v2.0
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {adminNav.map((item) => {
            const Icon = item.icon;
            const active =
              currentPath === item.href ||
              (item.href !== "/admin/dashboard" && currentPath.startsWith(item.href));
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-semibold transition-all ${
                  active
                    ? "bg-[var(--brand-red)] text-white shadow-md"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between rounded-xl bg-slate-800/60 px-4 py-2.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ArrowLeft className="h-3.5 w-3.5" />
              View Public Website
            </span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between rounded-xl bg-rose-500/10 border border-rose-500/20 px-4 py-2.5 text-xs text-rose-300 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2 font-bold">
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </span>
            <span className="text-[10px] uppercase font-black tracking-wider">Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10 shadow-xs">
          <h1 className="text-xl font-bold text-[#0F172A]">{title}</h1>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 border border-slate-200">
              <div className="h-7 w-7 rounded-full bg-[var(--brand-red)] text-white font-bold flex items-center justify-center text-xs shadow-xs">
                A
              </div>
              <div className="text-left leading-tight pr-1">
                <span className="block text-xs font-black text-slate-800">
                  {adminEmail || "Administrator"}
                </span>
                <span className="block text-[10px] font-semibold text-slate-500">
                  {isAdminAuthed() ? "Active Session" : "Signed Out"}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-brand-red hover:border-brand-red/40 transition-colors cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
