import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function LoadingIndicator() {
  const routerState = useRouterState();
  const isLoading = routerState.status === "pending" || routerState.isLoading;
  const [showDelayedBadge, setShowDelayedBadge] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let progressInterval: ReturnType<typeof setInterval> | undefined;

    if (isLoading) {
      setProgress(15);
      // Simulate smooth progress ramp
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 85) return prev;
          return prev + Math.floor(Math.random() * 15 + 5);
        });
      }, 120);

      // Show bottom indicator if loading takes > 200ms
      timer = setTimeout(() => {
        setShowDelayedBadge(true);
      }, 200);
    } else {
      setProgress(100);
      const hideTimer = setTimeout(() => {
        setProgress(0);
        setShowDelayedBadge(false);
      }, 250);
      return () => clearTimeout(hideTimer);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [isLoading]);

  if (!isLoading && progress === 0) return null;

  return (
    <>
      {/* Top Glowing Brand Red Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[99999] h-[3px] pointer-events-none overflow-hidden bg-slate-900/10">
        <div
          className="h-full bg-gradient-to-r from-red-700 via-brand-red to-amber-400 shadow-[0_0_12px_rgba(200,16,46,0.9),0_0_6px_rgba(200,16,46,0.6)] transition-all duration-300 ease-out"
          style={{
            width: `${progress}%`,
            opacity: progress === 100 ? 0 : 1,
            transitionProperty: "width, opacity",
          }}
        />
      </div>

      {/* Floating Glass Brand Loading Pill */}
      {showDelayedBadge && (
        <div className="fixed bottom-5 right-5 z-[99999] pointer-events-none flex items-center gap-2.5 bg-slate-950/85 text-white backdrop-blur-md px-3.5 py-2 rounded-full shadow-2xl border border-white/10 text-xs font-bold animate-fade-in-up">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-80" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-red shadow-[0_0_8px_rgba(200,16,46,0.8)]" />
          </span>
          <span className="tracking-wide text-slate-100">Loading...</span>
        </div>
      )}
    </>
  );
}
