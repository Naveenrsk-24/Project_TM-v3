import { ExpertsSection } from "@/components/About/ExpertSection";

export const metadata = pageMeta({
title: "About TM Studios",
description: "Learn about our story, team, and philosophy at TM Studios.",
path: "/aboutus",
image: "/og-about.jpg",
});

export default function Aboutus() {
  return (
   <>
    <ExpertsSection/>
   </>

  );
}
