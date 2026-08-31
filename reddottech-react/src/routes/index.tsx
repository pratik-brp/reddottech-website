import { createFileRoute } from "@tanstack/react-router";
import { NewHeroSection } from "@/components/sections/NewHeroSection";
import { MarqueeStrip } from "@/components/sections/MarqueeStrip";
import { StatsSection } from "@/components/sections/StatsSection";
import { PecpBatchSection } from "@/components/sections/PecpBatchSection";
import { LearningMatrixSection } from "@/components/sections/LearningMatrixSection";
import { HomeAboutSection } from "@/components/sections/HomeAboutSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { CoursesSliderSection } from "@/components/sections/CoursesSliderSection";
import { CareerRoadmapSection } from "@/components/sections/CareerRoadmapSection";
import { CtaSection } from "@/components/sections/CtaSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Red Dot Technologies — Grow. Upskill. Succeed." },
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
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <NewHeroSection />
      <MarqueeStrip />
      <PecpBatchSection />
      <StatsSection />
      <HomeAboutSection />
      <LearningMatrixSection />
      <FeaturesSection />
      <CoursesSliderSection />
      <WhyChooseUsSection />
      <CareerRoadmapSection />
      <CtaSection />
    </div>
  );
}
