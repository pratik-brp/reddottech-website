export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="animate-float absolute -left-[10%] top-[12%] h-[40vw] max-h-[520px] w-[40vw] max-w-[520px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--brand-red) 35%, transparent) 0%, transparent 70%)",
          animationDelay: "0s",
        }}
      />
      <div
        className="animate-float absolute -right-[12%] top-[8%] h-[36vw] max-h-[460px] w-[36vw] max-w-[460px] rounded-full opacity-50"
        style={{
          background: "radial-gradient(circle, oklch(0.88 0.08 55 / 0.65) 0%, transparent 70%)",
          animationDelay: "2.5s",
        }}
      />
      <div
        className="animate-float absolute bottom-[6%] left-[30%] h-[28vw] max-h-[380px] w-[28vw] max-w-[380px] rounded-full opacity-55"
        style={{
          background: "radial-gradient(circle, oklch(0.95 0.08 55 / 0.55) 0%, transparent 70%)",
          animationDelay: "5s",
        }}
      />
      <div
        className="animate-float absolute bottom-[18%] right-[18%] h-[18vw] max-h-[260px] w-[18vw] max-w-[260px] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--brand-red) 28%, transparent) 0%, transparent 70%)",
          animationDelay: "7.5s",
        }}
      />
    </div>
  );
}
