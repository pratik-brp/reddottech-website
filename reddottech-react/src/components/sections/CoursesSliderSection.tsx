import { useState, useCallback, useEffect } from "react";
import { coursesData } from "@/data/courses";
import { CourseCard } from "@/components/CourseCard";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft, ArrowRight as ArrowRightIcon } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Magnetic } from "@/components/motion/Magnetic";

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

    // 3-second auto slide timer
    const autoSlideTimer = setInterval(() => {
      if (emblaApi) {
        emblaApi.scrollNext();
      }
    }, 3000);

    return () => clearInterval(autoSlideTimer);
  }, [emblaApi, onSelect]);

  return (
    <section className="section-padding-lg bg-[var(--color-background)] relative overflow-hidden">
      {/* Background Lighting Orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="animate-float absolute top-[20%] left-[10%] h-80 w-80 rounded-full opacity-20 blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(217, 31, 38, 0.4) 0%, transparent 70%)" }}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-mist px-4 py-1.5 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-brand-red animate-glow-pulse" />
              <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-red">
                Programs &amp; Cohorts
              </span>
            </span>
            <h2 className="display-font text-3xl sm:text-5xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
              Upskill with Our <span className="gradient-text">Popular Courses</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              Explore university-backed certifications co-designed with top U.S. faculty and industry leaders.
            </p>
          </div>

          {/* Controls & CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <Magnetic>
              <button
                onClick={scrollPrev}
                disabled={!canPrev}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:bg-brand-red hover:text-white hover:border-brand-red disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous course"
              >
                <ArrowLeft className="h-4 w-4 stroke-[2.5]" />
              </button>
            </Magnetic>

            <Magnetic>
              <button
                onClick={scrollNext}
                disabled={!canNext}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:bg-brand-red hover:text-white hover:border-brand-red disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next course"
              >
                <ArrowRightIcon className="h-4 w-4 stroke-[2.5]" />
              </button>
            </Magnetic>

            <Magnetic>
              <Link to={"/coursess" as any} className="btn-primary text-xs py-3.5 px-6 ml-2">
                <span>View All Courses</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Magnetic>
          </div>
        </div>



        {/* Course Cards Carousel */}
        <div ref={emblaRef} className="overflow-hidden -mx-3">
          <div className="flex">
            {coursesData.map((course) => (
              <div
                key={course.id}
                className="flex-[0_0_100%] min-w-0 px-3 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
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

