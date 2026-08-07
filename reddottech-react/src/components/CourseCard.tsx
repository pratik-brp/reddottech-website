import { memo } from "react";
import { Course } from "@/types";
import { Link } from "@tanstack/react-router";
import { Clock, ArrowRight, Layers, Award } from "lucide-react";
import { TiltCard } from "@/components/motion/TiltCard";
import { Magnetic } from "@/components/motion/Magnetic";

interface CourseCardProps {
  course: Course;
}

const levelConfig = {
  beginner: { label: "Beginner", color: "text-emerald-400 bg-emerald-950/80 border-emerald-500/40" },
  intermediate: { label: "Intermediate", color: "text-amber-400 bg-amber-950/80 border-amber-500/40" },
  advanced: { label: "Advanced", color: "text-rose-400 bg-rose-950/80 border-rose-500/40" },
} as const;

function CourseCardComponent({ course }: CourseCardProps) {
  const level = levelConfig[(course.skillLevel as keyof typeof levelConfig) || "beginner"];
  const formattedPrice =
    typeof course.price === "number" ? `$${course.price.toFixed(2)}` : course.price;

  const cardImage = course.thumbnail || course.bannerImage || "/storage/courses/thumbnails/rB9PeE8IXEHOxY0LH0WwUNCsPvfSsPScZwI7kQAg.jpg";

  return (
    <TiltCard maxTilt={4} className="h-full">
      <div className="group relative flex h-full flex-col overflow-hidden rounded-[2.25rem] bg-white border border-slate-200/90 shadow-xl transition-all duration-500 hover:shadow-2xl hover:border-brand-red/30">
        {/* Top Image Banner Area */}
        <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-900">
          <img
            src={cardImage}
            alt={course.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Top Floating Badges */}
          <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-950/75 backdrop-blur-md border border-white/20 px-3 py-1 text-[11px] font-extrabold text-white shadow-lg">
              <Award className="h-3.5 w-3.5 text-brand-red" />
              {course.category || "Professional Course"}
            </span>

            <span className="rounded-full bg-brand-red px-3.5 py-1 text-xs font-black text-white shadow-lg shadow-red-900/40">
              {formattedPrice}
            </span>
          </div>

          {/* Bottom Badge over Image */}
          <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between">
            <span className={`text-[10px] font-extrabold backdrop-blur-md px-2.5 py-0.5 rounded-full border shadow-sm ${level.color}`}>
              {level.label}
            </span>
            {course.certification && (
              <span className="text-[10px] font-mono text-slate-300 font-semibold bg-slate-950/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10 truncate max-w-[170px]">
                USC Upstate Certified
              </span>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="relative z-10 flex h-full flex-col p-6 flex-1 justify-between space-y-4">
          <div>
            {/* Title */}
            <h3 className="display-font text-lg sm:text-xl font-extrabold text-brand-ink leading-snug tracking-tight line-clamp-2 group-hover:text-brand-red transition-colors duration-300">
              {course.name}
            </h3>

            {/* Description */}
            <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium line-clamp-2">
              {course.description}
            </p>
          </div>

          <div>
            {/* Spec Badges Row */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] font-bold text-slate-600 text-center">
              <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                <Clock className="h-3.5 w-3.5 text-brand-red shrink-0" />
                <span className="text-brand-ink font-extrabold">{course.duration}</span>
              </div>

              <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                <Layers className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                <span className="text-brand-ink font-extrabold capitalize">{course.delivery || "Online"}</span>
              </div>
            </div>

            {/* Instructor & Action Row */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  <img
                    src={course.instructorImage || "/images/common/dummy-avatar.jpg"}
                    alt={course.instructorName}
                    className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-md"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-white text-[8px] border-2 border-white">
                    ✓
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-extrabold text-brand-ink truncate leading-tight">
                    {course.instructorName}
                  </p>
                  {course.instructorTitle && (
                    <p className="text-[10px] text-slate-500 font-semibold truncate leading-tight mt-0.5 max-w-[130px]">
                      {course.instructorTitle}
                    </p>
                  )}
                </div>
              </div>

              <Magnetic>
                <Link
                  to="/courses/$id"
                  params={{ id: String(course.id) }}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red transition-all duration-300 group-hover:bg-brand-red group-hover:text-white group-hover:scale-105 shadow-sm"
                  aria-label={`View ${course.name}`}
                >
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

export const CourseCard = memo(CourseCardComponent);

