import { useState, useCallback, useEffect, useRef } from "react";
import { CourseCard } from "@/components/CourseCard";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft, ArrowRight as ArrowRightIcon } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Magnetic } from "@/components/motion/Magnetic";
import { getCourses } from "@/lib/api";
import type { Course } from "@/types";

export function CoursesSliderSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
    slidesToScroll: 3,
    breakpoints: {
      "(max-width: 768px)": { slidesToScroll: 1 },
      "(max-width: 1024px)": { slidesToScroll: 2 },
    },
  });

  const [canPrev, setCanPrev] = useState(true);
  const [canNext, setCanNext] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);

  // Load courses exclusively from SQL database via API
  useEffect(() => {
    getCourses()
      .then((data) => {
        if (data) {
          setCourses(data as Course[]);
        }
      })
      .catch(() => {});

    const handleCoursesUpdated = () => {
      getCourses().then((data) => {
        if (data) setCourses(data as Course[]);
      });
    };

    window.addEventListener("courses-updated", handleCoursesUpdated);
    return () => window.removeEventListener("courses-updated", handleCoursesUpdated);
  }, []);

  const sectionRef = useRef<HTMLElement>(null);
  const visibleRef = useRef(true);
  const hoveringRef = useRef(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    // 3-second auto slide timer — only advances while on-screen and unhovered
    const autoSlideTimer = setInterval(() => {
      if (emblaApi && visibleRef.current && !hoveringRef.current) {
        emblaApi.scrollNext();
      }
    }, 3000);

    return () => {
      clearInterval(autoSlideTimer);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Pause autoplay while the section is scrolled out of view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        visibleRef.current = entries.some((entry) => entry.isIntersecting);
      },
      { rootMargin: "100px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => {
        hoveringRef.current = true;
      }}
      onMouseLeave={() => {
        hoveringRef.current = false;
      }}
      className="section-padding-lg bg-[var(--color-background)] relative overflow-hidden"
    >
      {/* Background Lighting Orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="animate-float absolute top-[20%] left-[10%] h-80 w-80 rounded-full opacity-20 blur-[100px]"
          style={{
            background: "radial-gradient(circle, rgba(217, 31, 38, 0.4) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-10 gap-4 sm:gap-6">
          <div className="space-y-2 sm:space-y-4 max-w-3xl lg:max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-mist px-3.5 py-1.5 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-brand-red animate-glow-pulse" />
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.14em] text-brand-red">
                Programs &amp; Cohorts
              </span>
            </span>
            <h2 className="display-font text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold tracking-tight text-brand-ink leading-[1.15] lg:whitespace-nowrap">
              Upskill with Our <span className="gradient-text">Popular Courses</span>
            </h2>
            <p className="text-xs sm:text-base text-slate-600 font-medium">
              Explore PECP courses developed through collaboration with USC Upstate and designed to
              build practical, workplace-ready skills.
            </p>
          </div>

          {/* Controls & CTA */}
          <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 shrink-0 pt-2 sm:pt-0">
            <div className="flex items-center gap-2">
              <Magnetic>
                <button
                  onClick={scrollPrev}
                  disabled={!canPrev}
                  className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-xs transition-all hover:bg-brand-red hover:text-white hover:border-brand-red disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Previous course"
                >
                  <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5]" />
                </button>
              </Magnetic>

              <Magnetic>
                <button
                  onClick={scrollNext}
                  disabled={!canNext}
                  className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-xs transition-all hover:bg-brand-red hover:text-white hover:border-brand-red disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Next course"
                >
                  <ArrowRightIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5]" />
                </button>
              </Magnetic>
            </div>

            <Magnetic>
              <Link to="/courses" className="btn-primary text-xs py-2.5 sm:py-3.5 px-4 sm:px-6">
                <span>View All Courses</span>
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>
            </Magnetic>
          </div>
        </div>

        {/* Course Cards Carousel */}
        <div ref={emblaRef} className="overflow-hidden -mx-2.5 sm:-mx-3">
          <div className="flex">
            {courses.map((course) => (
              <div
                key={course.id}
                className="flex-[0_0_88%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 px-2.5 sm:px-3"
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
