import { memo } from "react";
import { Course } from "@/types";
import { Link } from "@tanstack/react-router";
import { Clock, ArrowRight, Layers, Award } from "lucide-react";
import { TiltCard } from "@/components/motion/TiltCard";
import { Magnetic } from "@/components/motion/Magnetic";
import { stripHtml } from "@/lib/sanitize";

interface CourseCardProps {
  course: Course;
}

function CourseCardComponent({ course }: CourseCardProps) {
  const formattedPrice =
    typeof course.price === "number" ? `$${course.price.toFixed(2)}` : course.price;

  const cardImage =
    course.thumbnail ||
    course.bannerImage ||
    "/storage/courses/thumbnails/rB9PeE8IXEHOxY0LH0WwUNCsPvfSsPScZwI7kQAg.jpg";

  const plainDescription = stripHtml(course.description);

  return (
    <TiltCard maxTilt={4} className="h-full">
      <Link
        to="/courses/$id"
        params={{ id: String(course.id) }}
        className="group relative flex h-full flex-col overflow-hidden rounded-xl sm:rounded-[2.25rem] bg-white border border-slate-200/90 shadow-2xs sm:shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-brand-red/30 cursor-pointer block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
      >
        {/* Top Image Banner Area — Clean & Unobstructed */}
        <div className="relative h-28 sm:h-48 w-full overflow-hidden bg-slate-100 border-b border-slate-100">
          <img
            src={cardImage}
            alt={course.name}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "/storage/courses/thumbnails/rB9PeE8IXEHOxY0LH0WwUNCsPvfSsPScZwI7kQAg.jpg";
            }}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Card Body */}
        <div className="relative z-10 flex h-full flex-col p-3 sm:p-6 flex-1 justify-between space-y-2.5 sm:space-y-4">
          <div>
            {/* Category & Price Header Row (Cleanly placed in body so image graphic text is 100% visible) */}
            <div className="flex items-center justify-between gap-1.5 sm:gap-2 mb-2 sm:mb-3">
              <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-brand-red/10 border border-brand-red/20 px-2 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-[11px] font-extrabold text-brand-red">
                <Award className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 text-brand-red shrink-0" />
                <span className="truncate max-w-[110px] sm:max-w-[170px]">
                  {course.category || "Professional Course"}
                </span>
              </span>

              <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                {course.certification && (
                  <span className="text-[8px] sm:text-[10px] font-mono text-slate-600 font-bold bg-slate-100 px-1.5 sm:px-2 py-0.5 rounded-full border border-slate-200">
                    USC Cert
                  </span>
                )}
                <span className="rounded-full bg-slate-900 px-2 py-0.5 sm:px-3 sm:py-1 text-[9.5px] sm:text-xs font-black text-white shadow-xs">
                  {formattedPrice}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="display-font text-sm sm:text-lg font-extrabold text-brand-ink leading-snug tracking-tight line-clamp-2 group-hover:text-brand-red transition-colors duration-200">
              {course.name}
            </h3>

            {/* Description */}
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium line-clamp-3">
              {plainDescription}
            </p>
          </div>

          <div>
            {/* Spec Badges Row */}
            <div className="pt-1.5 sm:pt-4 border-t border-slate-100 grid grid-cols-2 gap-1 sm:gap-2 text-[9px] sm:text-[11px] font-bold text-slate-600 text-center">
              <div className="flex items-center justify-center gap-0.5 sm:gap-1 p-1 sm:p-2 rounded-md sm:rounded-xl bg-slate-50 border border-slate-100">
                <Clock className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 text-brand-red shrink-0" />
                <span className="text-brand-ink font-extrabold">{course.duration}</span>
              </div>

              <div className="flex items-center justify-center gap-0.5 sm:gap-1 p-1 sm:p-2 rounded-md sm:rounded-xl bg-slate-50 border border-slate-100">
                <Layers className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 text-slate-500 shrink-0" />
                <span className="text-brand-ink font-extrabold capitalize">
                  {course.delivery || "Online"}
                </span>
              </div>
            </div>

            {/* Instructor & Action Row */}
            <div className="mt-1.5 sm:mt-4 pt-1.5 sm:pt-4 border-t border-slate-100 flex items-center justify-between gap-1.5 sm:gap-3">
              <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
                <div className="relative shrink-0">
                  <img
                    src={course.instructorImage || "/images/common/dummy-avatar.jpg"}
                    alt={course.instructorName}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/common/dummy-avatar.jpg";
                    }}
                    className="h-5 w-5 sm:h-10 sm:w-10 rounded-full object-cover border border-white shadow-xs"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-2 w-2 sm:h-3.5 sm:w-3.5 items-center justify-center rounded-full bg-emerald-500 text-white text-[5px] sm:text-[7px] border border-white">
                    ✓
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs font-extrabold text-brand-ink truncate leading-tight">
                    {course.instructorName}
                  </p>
                  {course.instructorTitle && (
                    <p className="text-[9px] sm:text-[10px] text-slate-500 font-semibold truncate leading-tight mt-0.5 max-w-[80px] sm:max-w-[130px] hidden sm:block">
                      {course.instructorTitle}
                    </p>
                  )}
                </div>
              </div>

              <Magnetic>
                <div
                  className="flex h-6 w-6 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-md sm:rounded-2xl bg-brand-red/10 text-brand-red transition-all duration-200 group-hover:bg-brand-red group-hover:text-white group-hover:scale-105 shadow-2xs"
                  aria-label={`View ${course.name}`}
                >
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </div>
              </Magnetic>
            </div>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}

export const CourseCard = memo(CourseCardComponent);
