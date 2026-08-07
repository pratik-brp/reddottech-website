import { useEffect, useRef, useState } from "react";
import hero3d from "@/assets/hero-3d.webp";

export function HeroIllustration() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  // Note: The parent component will need to pass the sceneRef for the tilt effect to work.
  // We will adjust this later when we build the full GSAP animation.

  return (
    <div
      className="layer-3d relative mx-auto aspect-square w-full max-w-[620px]"
      style={{
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 400ms cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div
        className="animate-spin-slow absolute inset-[8%] rounded-full border border-brand-red/20"
        style={{ transform: "translateZ(-90px)" }}
      />
      <div
        className="absolute inset-[20%] rounded-full"
        style={{
          transform: "translateZ(-140px)",
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--brand-red) 30%, transparent), transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <img
        src={hero3d}
        alt="3D illustration of a graduation cap with floating glass panels and spheres"
        width={1280}
        height={1280}
        className="hero-illust-main animate-float relative h-full w-full object-contain drop-shadow-2xl"
        style={{ transform: "translateZ(70px)" }}
      />

      {/* Floating glass cards */}
      <div
        className="hero-illust-card-1 glass-card animate-float absolute bottom-[12%] right-0 rounded-2xl px-5 py-4 [animation-delay:2.4s]"
        style={{ transform: "translateZ(170px)" }}
      >
        <p className="text-2xl font-extrabold text-brand-red">4.9★</p>
        <p className="text-xs text-brand-ink/60">Learner rating</p>
      </div>

      <div
        className="hero-illust-card-2 glass-card animate-float absolute top-[18%] left-0 rounded-2xl px-4 py-3 [animation-delay:4s]"
        style={{ transform: "translateZ(130px)" }}
      >
        <p className="text-lg font-extrabold text-brand-ink">40+</p>
        <p className="text-[11px] text-brand-ink/50">Courses available</p>
      </div>
    </div>
  );
}
