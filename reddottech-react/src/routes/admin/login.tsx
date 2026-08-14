import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, Eye, EyeOff, AlertCircle, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { adminLogin } from "@/lib/api";
import { setToken } from "@/lib/auth";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login | Red Dot Technologies Pvt. Ltd." },
      {
        name: "description",
        content: "Administrative login portal for Red Dot Technologies Pvt. Ltd.",
      },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("info@reddottech.com.np");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await adminLogin(email, password);
      if (!result?.token) {
        throw new Error("Invalid credentials. Please try again.");
      }
      setToken(result.token, result.email || email);
      toast.success(`Welcome back, ${result.name || "Administrator"}!`);
      navigate({ to: "/admin/dashboard" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign-in failed. Please verify your credentials.";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f0f2f5] font-sans p-4 sm:p-6 relative">
      {/* Subtle Background Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-30" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-[440px] space-y-6">
        {/* Brand Logo Header */}
        <div className="text-center">
          <Link to="/" className="inline-block transition-transform hover:scale-105 duration-200">
            <img
              src="/logo.png"
              alt="Red Dot Technologies Pvt. Ltd."
              className="h-14 sm:h-16 w-auto object-contain mx-auto drop-shadow-xs"
            />
          </Link>
        </div>

        {/* Classic Clean Login Box */}
        <div className="rounded-2xl bg-white border border-slate-200/90 p-8 sm:p-10 shadow-xl shadow-slate-200/60">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Banner */}
            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-700 animate-shake">
                <AlertCircle className="h-4 w-4 shrink-0 text-brand-red" />
                <span>{error}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-semibold text-slate-700">
                Email
              </label>
              <input
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="info@reddottech.com.np"
                className="w-full rounded-lg border border-slate-300 bg-[#edf2f7]/60 px-3.5 py-2.5 text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/15 transition-all duration-200"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-semibold text-slate-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-300 bg-[#edf2f7]/60 px-3.5 py-2.5 pr-10 text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/15 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-brand-red focus:ring-brand-red/20 cursor-pointer accent-brand-red"
              />
              <label
                htmlFor="remember-me"
                className="text-xs sm:text-sm font-medium text-slate-600 cursor-pointer select-none"
              >
                Remember me
              </label>
            </div>

            {/* Action Row: Forgot Password & Log In Button */}
            <div className="pt-3 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-brand-red underline transition-colors cursor-pointer"
              >
                Forgot your password?
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1a202c] hover:bg-black text-white font-extrabold text-xs tracking-wider uppercase px-6 py-2.5 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>LOGGING IN...</span>
                  </>
                ) : (
                  <span>LOG IN</span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            to="/"
            className="text-xs font-semibold text-slate-500 hover:text-brand-red transition-colors"
          >
            ← Return to Red Dot Technologies Home
          </Link>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Reset Password</h4>
                <p className="text-xs text-slate-500">Administrative Account Assistance</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              To request a password reset for your administrator account, please contact the IT Administrator directly at{" "}
              <a href="mailto:info@reddottech.com.np" className="text-brand-red font-bold underline">
                info@reddottech.com.np
              </a>{" "}
              or call the office at <strong>01 4535691</strong>.
            </p>

            <button
              onClick={() => setShowForgotModal(false)}
              className="w-full rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-black transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
