import { memo, type ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

interface SectionHeaderProps {
  badge?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
  dark?: boolean;
}

function SectionHeaderComponent({
  badge,
  title,
  subtitle,
  align = "center",
  className = "",
  dark = false,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div className={`${isCenter ? "text-center mx-auto max-w-3xl" : ""} space-y-4 ${className}`}>
      {badge && (
        <Reveal>
          <span className="badge-brand">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red animate-glow-pulse" />
            {badge}
          </span>
        </Reveal>
      )}

      <Reveal delay={80}>
        <h2
          className={`display-font text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight tracking-tight ${
            dark ? "text-white" : "text-brand-ink"
          }`}
        >
          {title}
        </h2>
      </Reveal>

      {subtitle && (
        <Reveal delay={160}>
          <p
            className={`text-base md:text-lg leading-relaxed max-w-2xl ${
              isCenter ? "mx-auto" : ""
            } ${dark ? "text-slate-300" : "text-slate-500"}`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export const SectionHeader = memo(SectionHeaderComponent);
