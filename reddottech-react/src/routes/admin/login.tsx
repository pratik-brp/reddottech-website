import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, AlertCircle, Loader2, KeyRound, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { adminLogin, requestPasswordReset, resetPasswordWithToken } from "@/lib/api";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Forgot password workflow states
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetStep, setResetStep] = useState<"request" | "verify">("request");
  const [resetEmail, setResetEmail] = useState("");
  const [resetTokenInput, setResetTokenInput] = useState("");
  const [newResetPassword, setNewResetPassword] = useState("");
  const [confirmResetPassword, setConfirmResetPassword] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const [resetSuccessMessage, setResetSuccessMessage] = useState<string | null>(null);

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
      const message =
        err instanceof Error ? err.message : "Sign-in failed. Please verify your credentials.";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestToken = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      toast.error("Please enter your administrator email.");
      return;
    }

    setIsResetting(true);
    try {
      const res = await requestPasswordReset(resetEmail);
      if (res?.resetToken) {
        setResetTokenInput(res.resetToken);
        toast.info(`Local Reset Token: ${res.resetToken}`);
      }
      toast.success("Password reset request submitted.");
      setResetStep("verify");
    } catch (err: any) {
      toast.error(err?.message || "Failed to submit reset request.");
    } finally {
      setIsResetting(false);
    }
  };

  const handleCompleteReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetTokenInput.trim()) {
      toast.error("Please enter the password reset token.");
      return;
    }
    if (newResetPassword.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }
    if (newResetPassword !== confirmResetPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsResetting(true);
    try {
      const res = await resetPasswordWithToken(resetTokenInput.trim(), newResetPassword);
      toast.success(res?.message || "Password updated successfully!");
      setResetSuccessMessage(
        "Password reset successfully! You can now log in with your new credentials.",
      );
      setTimeout(() => {
        setShowForgotModal(false);
        setResetStep("request");
        setResetSuccessMessage(null);
        setResetTokenInput("");
        setNewResetPassword("");
        setConfirmResetPassword("");
      }, 2000);
    } catch (err: any) {
      toast.error(err?.message || "Failed to reset password.");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f0f2f5] font-sans p-3.5 sm:p-6 relative">
      {/* Subtle Background Pattern */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-30"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[440px] space-y-4 sm:space-y-6">
        {/* Brand Logo Header */}
        <div className="text-center">
          <Link to="/" className="inline-block transition-transform hover:scale-105 duration-200">
            <img
              src="/logo.png"
              alt="Red Dot Technologies Pvt. Ltd."
              className="h-10 sm:h-16 w-auto object-contain mx-auto drop-shadow-xs"
            />
          </Link>
        </div>

        {/* Classic Clean Login Box */}
        <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-10 shadow-xl shadow-slate-200/60">
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
              <label className="block text-xs sm:text-sm font-semibold text-slate-700">Email</label>
              <input
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@reddottech.com.np"
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
                onClick={() => {
                  setShowForgotModal(true);
                  setResetStep("request");
                  setResetSuccessMessage(null);
                }}
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

      {/* Forgot / Reset Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 sm:p-7 shadow-2xl space-y-5 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
                  <KeyRound className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Admin Password Recovery</h4>
                  <p className="text-xs text-slate-500">Secure Token Verification</p>
                </div>
              </div>
            </div>

            {resetSuccessMessage ? (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center space-y-2">
                <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
                <p className="text-xs font-semibold text-emerald-800">{resetSuccessMessage}</p>
              </div>
            ) : resetStep === "request" ? (
              <form
                onSubmit={handleRequestToken}
                className="space-y-4 text-xs font-medium text-slate-700"
              >
                <p className="text-xs text-slate-600 leading-relaxed">
                  Enter your registered administrator email to generate a secure 1-hour password
                  reset token.
                </p>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">Admin Email</label>
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="admin@reddottech.com.np"
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:border-brand-red focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setResetStep("verify")}
                    className="text-xs font-semibold text-brand-red hover:underline cursor-pointer"
                  >
                    Already have a token?
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(false)}
                      className="px-3.5 py-2 rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isResetting}
                      className="px-4 py-2 rounded-lg bg-brand-red text-white text-xs font-bold hover:bg-red-700 disabled:opacity-60 cursor-pointer inline-flex items-center gap-1.5"
                    >
                      {isResetting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                      <span>Generate Token</span>
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <form
                onSubmit={handleCompleteReset}
                className="space-y-3.5 text-xs font-medium text-slate-700"
              >
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">Reset Token</label>
                  <input
                    type="text"
                    required
                    value={resetTokenInput}
                    onChange={(e) => setResetTokenInput(e.target.value)}
                    placeholder="Enter 32-character reset token"
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs font-mono text-slate-900 focus:bg-white focus:border-brand-red focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    New Password (min 8 chars)
                  </label>
                  <input
                    type="password"
                    required
                    value={newResetPassword}
                    onChange={(e) => setNewResetPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:border-brand-red focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmResetPassword}
                    onChange={(e) => setConfirmResetPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:border-brand-red focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setResetStep("request")}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    Back
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(false)}
                      className="px-3.5 py-2 rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isResetting}
                      className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 disabled:opacity-60 cursor-pointer inline-flex items-center gap-1.5"
                    >
                      {isResetting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                      <span>Update Password</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
