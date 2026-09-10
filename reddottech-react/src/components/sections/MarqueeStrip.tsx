import { Marquee } from "@/components/motion/Marquee";
import { useState, useEffect, useMemo } from "react";
import { getCourses, getCachedCourses } from "@/lib/api";

const PUNCHY_DISCIPLINES = [
  "Artificial Intelligence",
  "Web Development",
  "C++ Programming",
  "Java Programming",
  "Digital Marketing",
  "Project Management",
  "Six Sigma",
  "Business Analytics",
  "Supervision & Management",
];

function getPunchyLabel(course: any): string {
  const name = course.name || "";
  const cat = course.category || "";

  if (/six sigma/i.test(name)) return "Six Sigma";
  if (/supervision/i.test(name)) return "Supervision & Management";
  if (/c\+\+/i.test(name)) return "C++ Programming";
  if (/java/i.test(name)) return "Java Programming";
  if (/web page|web dev/i.test(name)) return "Web Development";
  if (/digital marketing/i.test(name)) return "Digital Marketing";
  if (/business analytics/i.test(name)) return "Business Analytics";
  if (/artificial intelligence|ai/i.test(name)) return "Artificial Intelligence";
  if (/project management/i.test(name)) return "Project Management";

  return cat || name;
}

export function MarqueeStrip() {
  const [courses, setCourses] = useState<any[]>(() => getCachedCourses() || []);

  useEffect(() => {
    getCourses().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setCourses(data);
      }
    });

    const handleCoursesUpdated = () => {
      getCourses().then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCourses(data);
        }
      });
    };

    window.addEventListener("courses-updated", handleCoursesUpdated);
    return () => window.removeEventListener("courses-updated", handleCoursesUpdated);
  }, []);

  const marqueeItems = useMemo(() => {
    if (courses && courses.length > 0) {
      const list = courses.map(getPunchyLabel);
      return Array.from(new Set(list));
    }
    return PUNCHY_DISCIPLINES;
  }, [courses]);

  return (
    <section className="relative border-y border-slate-200/70 bg-white py-6 overflow-hidden">
      <Marquee
        speed={30}
        itemClassName="px-8"
        items={marqueeItems.map((label) => (
          <span
            key={label}
            className="flex items-center gap-8 text-lg font-bold tracking-tight text-slate-400 hover:text-brand-red transition-colors"
          >
            <span className="whitespace-nowrap">{label}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red/40" />
          </span>
        ))}
      />
    </section>
  );
}
