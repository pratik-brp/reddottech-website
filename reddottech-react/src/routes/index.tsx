import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getAboutStats, type AboutStats } from "@/lib/api";
import { NewHeroSection } from "@/components/sections/NewHeroSection";
import { MarqueeStrip } from "@/components/sections/MarqueeStrip";
import { StatsSection } from "@/components/sections/StatsSection";
import { PecpBatchSection } from "@/components/sections/PecpBatchSection";
import { HomeAboutSection } from "@/components/sections/HomeAboutSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { CoursesSliderSection } from "@/components/sections/CoursesSliderSection";
import { CareerRoadmapSection } from "@/components/sections/CareerRoadmapSection";
import { CtaSection } from "@/components/sections/CtaSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Red Dot Technologies - Grow. Upskill. Succeed." },
      {
        name: "description",
        content:
          "Red Dot Technologies empowers Nepalese professionals with globally recognized IT certifications, live bootcamps, and executive management programs.",
      },
      { property: "og:title", content: "Red Dot Technologies — Grow. Upskill. Succeed." },
      {
        property: "og:description",
        content:
          "Globally recognized certifications and career-ready training for Nepalese professionals.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  loader: async () => {
    try {
      const stats = await getAboutStats();
      return { stats };
    } catch {
      return { stats: null };
    }
  },
  component: Index,
});

function Index() {
  const loaderData = Route.useLoaderData();
  const [stats, setStats] = useState<AboutStats>(() => {
    return (
      loaderData?.stats || {
        pecpCourses: 9,
        aiUnlockedPathways: 8,
        careerPathways: 17,
        courseAccess: "24/7",
      }
    );
  });

  useEffect(() => {
    getAboutStats().then((data) => {
      if (data) setStats(data);
    });

    const handleCoursesUpdated = () => {
      getAboutStats().then((data) => {
        if (data) setStats(data);
      });
    };

    window.addEventListener("courses-updated", handleCoursesUpdated);
    return () => window.removeEventListener("courses-updated", handleCoursesUpdated);
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <NewHeroSection stats={stats} />
      <MarqueeStrip />
      <PecpBatchSection />
      <StatsSection stats={stats} />
      <HomeAboutSection />
      <FeaturesSection />
      <CoursesSliderSection />
      <WhyChooseUsSection stats={stats} />
      <CareerRoadmapSection />
      <CtaSection />
    </div>
  );
}
