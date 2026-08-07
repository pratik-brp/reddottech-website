import { Marquee } from "@/components/motion/Marquee";

const items = [
  "USC Upstate (USA)",
  "PMP® & CAPM®",
  "Six Sigma DMAIC",
  "IASSC",
  "Artificial Intelligence",
  "Business Analytics",
  "Executive Leadership",
  "Machine Learning",
  "Monte Carlo Risk Modeling",
  "Supervision & Management",
];

export function MarqueeStrip() {
  return (
    <section className="relative border-y border-slate-200/70 bg-white py-6">
      <Marquee
        speed={30}
        itemClassName="px-8"
        items={items.map((label) => (
          <span
            key={label}
            className="flex items-center gap-8 text-lg font-bold tracking-tight text-slate-400"
          >
            <span className="whitespace-nowrap">{label}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red/40" />
          </span>
        ))}
      />
    </section>
  );
}
