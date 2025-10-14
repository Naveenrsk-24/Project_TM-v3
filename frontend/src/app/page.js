import WeddingHero from "@/components/Dummy/Dummy1";
import TestFetching from "@/components/Dummy/TestFetching";
import { ParallaxScrollDemo } from "@/components/Gallery/ParallaxScrollDemo";
import FaqSection from "@/components/Home/FaqSection";
import HeroSection from "@/components/Home/HeroSection";
import NumbersSection from "@/components/Home/NumberSection";
import NavBarMain from "@/components/Navbar/NavbarMain";
import Image from "next/image";

export default function Home() {
  return (
   <>
   <HeroSection/>
   <NumbersSection/>
   {/* <ParallaxScrollDemo/> */}
   <FaqSection/>
   {/* <WeddingHero/> */}
   </>

  );
}
