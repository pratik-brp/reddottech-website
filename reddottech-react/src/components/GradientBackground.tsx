interface GradientBackgroundProps {
  variant?: "warm" | "warm-alt" | "dark" | "dark-red";
  noise?: boolean;
  orbs?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * Reusable background component that applies the Hero section's gradient mesh pattern.
 * Creates visual cohesion across all pages by inheriting the Hero's visual DNA.
 */
export function GradientBackground({
  variant = "warm",
  noise = false,
  orbs = false,
  className = "",
  children,
}: GradientBackgroundProps) {
  const bgClass =
    variant === "warm"
      ? "bg-warm"
      : variant === "warm-alt"
        ? "bg-warm-alt"
        : variant === "dark"
          ? "bg-dark-gradient"
          : "bg-dark-red-gradient";

  return (
    <div
      className={`relative overflow-hidden ${bgClass} ${noise ? "noise-overlay" : ""} ${className}`}
    >
      {orbs && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="animate-float absolute -left-[8%] top-[10%] h-[32vw] max-h-[420px] w-[32vw] max-w-[420px] rounded-full opacity-60"
            style={{
              background: "radial-gradient(circle, rgba(251, 146, 60, 0.4) 0%, transparent 70%)",
              animationDelay: "0s",
            }}
          />
          <div
            className="animate-float absolute -right-[10%] top-[8%] h-[28vw] max-h-[360px] w-[28vw] max-w-[360px] rounded-full opacity-55"
            style={{
              background: "radial-gradient(circle, rgba(125, 211, 252, 0.5) 0%, transparent 70%)",
              animationDelay: "3s",
            }}
          />
          <div
            className="animate-float absolute bottom-[5%] left-[12%] h-[26vw] max-h-[340px] w-[26vw] max-w-[340px] rounded-full opacity-65"
            style={{
              background: "radial-gradient(circle, rgba(147, 197, 253, 0.6) 0%, transparent 70%)",
              animationDelay: "5s",
            }}
          />
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
