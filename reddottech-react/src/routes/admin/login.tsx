import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, Mail, Lock, ArrowRight, CheckCircle2, KeyRound } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@reddottech.com.np");
  const [password, setPassword] = useState("password123");
  const [remember, setRemember] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("admin_auth", "true");
      localStorage.setItem("admin_email", email);
      toast.success("Welcome back! Admin authentication successful.");
      navigate({ to: "/admin/dashboard" });
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white relative overflow-hidden font-sans p-6">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full opacity-20 blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--brand-red) 50%, transparent) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
      </div>

      <div className="relative z-10 w-full max-w-md space-y-8">
        {/* Header Logo & Title */}
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-brand-red text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-brand-red/30">
              R
            </div>
            <div className="text-left">
              <span className="block text-xl font-black text-white tracking-tight">Red Dot</span>
              <span className="block text-xs font-semibold text-slate-400">Technologies</span>
            </div>
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-black uppercase tracking-widest text-slate-300">
              Admin Control Panel Login
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Sign In to <span className="gradient-text">Administrator Studio</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            Enter your administrative credentials to manage courses, certificates, and inquiries.
          </p>
        </div>

        {/* Demo Banner */}
        <div className="rounded-2xl border border-brand-red/30 bg-brand-red/10 p-4 backdrop-blur-md text-xs space-y-1">
          <div className="flex items-center gap-2 font-black text-rose-300 uppercase tracking-wider">
            <KeyRound className="h-4 w-4" />
            <span>Development Quick Login</span>
          </div>
          <p className="text-slate-300 font-medium">
            Email: <strong className="text-white">admin@reddottech.com.np</strong> | Password: <strong className="text-white">password123</strong>
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-xl space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase tracking-wider text-slate-300">
              Admin Email Address
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <Mail className="h-5 w-5" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@reddottech.com.np"
                className="w-full rounded-xl border border-white/10 bg-slate-950/80 py-3.5 pl-11 pr-4 text-sm font-medium text-white placeholder-slate-500 focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-300">
                Password
              </label>
              <button
                type="button"
                onClick={() => toast.info("Password reset request sent to administrator email.")}
                className="text-xs font-bold text-rose-400 hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <Lock className="h-5 w-5" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-slate-950/80 py-3.5 pl-11 pr-4 text-sm font-medium text-white placeholder-slate-500 focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
              />
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-brand-red focus:ring-brand-red"
              />
              <span className="text-xs font-semibold text-slate-300">Keep me logged in</span>
            </label>

            <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              2FA Active
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary py-4 text-sm font-black tracking-wider uppercase shadow-xl shadow-brand-red/20 justify-center cursor-pointer"
          >
            {isLoading ? (
              <span>Authenticating Admin...</span>
            ) : (
              <>
                <span>Sign In to Admin Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link back to public site */}
        <div className="text-center pt-2">
          <Link to="/" className="text-xs font-bold text-slate-400 hover:text-white transition-colors">
            ← Return to Red Dot Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
