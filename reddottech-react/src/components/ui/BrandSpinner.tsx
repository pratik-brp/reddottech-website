import { cn } from "@/lib/utils";

interface BrandSpinnerProps {
  size?: "sm" | "md" | "lg" | "fullscreen";
  message?: string;
  className?: string;
}

export function BrandSpinner({ size = "md", message, className }: BrandSpinnerProps) {
  if (size === "fullscreen") {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-fade-in">
        <div className="relative flex items-center justify-center">
          {/* Glowing pulse aura */}
          <div className="absolute h-24 w-24 rounded-full bg-brand-red/20 blur-xl animate-pulse" />

          {/* SVG Dual-tone ring */}
          <svg className="h-16 w-16 animate-spin text-brand-red" viewBox="0 0 50 50">
            <circle
              className="opacity-20 stroke-current text-white"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="4"
            />
            <circle
              className="stroke-current text-brand-red"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="4"
              strokeDasharray="80"
              strokeDashoffset="60"
              strokeLinecap="round"
            />
          </svg>

          {/* Center glowing Red Dot */}
          <div className="absolute flex items-center justify-center">
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-brand-red shadow-[0_0_12px_rgba(200,16,46,0.9)]" />
            </span>
          </div>
        </div>

        {message && (
          <div className="mt-5 text-center space-y-1">
            <p className="text-sm font-bold text-white tracking-wide">{message}</p>
            <p className="text-[11px] font-semibold text-slate-400">Red Dot Technologies</p>
          </div>
        )}
      </div>
    );
  }

  const dimensions = {
    sm: { box: "h-5 w-5", stroke: 4, dot: "h-1.5 w-1.5" },
    md: { box: "h-10 w-10", stroke: 4, dot: "h-2.5 w-2.5" },
    lg: { box: "h-14 w-14", stroke: 4.5, dot: "h-3.5 w-3.5" },
  }[size];

  return (
    <div className={cn("inline-flex flex-col items-center justify-center gap-3 p-3", className)}>
      <div className="relative flex items-center justify-center">
        {/* Soft Red Ambient Glow */}
        <div className="absolute inset-0 rounded-full bg-brand-red/10 blur-md pointer-events-none" />

        {/* Crisp Animated SVG Track */}
        <svg className={cn("animate-spin text-brand-red", dimensions.box)} viewBox="0 0 50 50">
          <circle
            className="stroke-slate-200/90"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth={dimensions.stroke}
          />
          <circle
            className="stroke-brand-red"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth={dimensions.stroke}
            strokeDasharray="85"
            strokeDashoffset="60"
            strokeLinecap="round"
          />
        </svg>

        {/* Center Pulsing Red Dot */}
        <div className="absolute flex items-center justify-center">
          <span
            className={cn(
              "rounded-full bg-brand-red shadow-[0_0_8px_rgba(200,16,46,0.8)] animate-pulse",
              dimensions.dot,
            )}
          />
        </div>
      </div>

      {message && (
        <span className="text-xs font-semibold text-slate-600 tracking-tight">{message}</span>
      )}
    </div>
  );
}
