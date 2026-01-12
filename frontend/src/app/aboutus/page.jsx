import { ExpertsSection } from "@/components/About/ExpertSection";
import KeywordRichAbout from "@/components/ExtraDesigns/KeywordRichAbout";
import ThreeDCarousel from "@/components/ExtraDesigns/ThreeDCarousel";
import { pageMeta } from "@/lib/meta-data";


export const metadata = pageMeta({
title: "About TM Studios",
description: "Learn about our story, team, and philosophy at TM Studios.",
path: "/aboutus",
image: "/og-about.jpg",
});

export default function Aboutus() {
  return (
   <>
    <KeywordRichAbout/>
    <ThreeDCarousel/>
    {/* <ExpertsSection/> */}
   </>

  );
}
