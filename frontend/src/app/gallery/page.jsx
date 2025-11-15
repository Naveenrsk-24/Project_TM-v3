import { ParallaxScrollDemo } from "@/components/Gallery/ParallaxScrollDemo";

export const metadata = pageMeta({
title: "Gallery",
description: "View TM Studios curated photography gallery.",
path: "/gallery",
image: "/og-gallery.jpg",
});

export default function Home() {
  return (
   <>
    <ParallaxScrollDemo/>
   </>

  );
}
