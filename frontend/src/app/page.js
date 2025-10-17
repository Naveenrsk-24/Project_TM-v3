import AdminDashboard from "@/components/Dashboard/AdminDashboard";
import WeddingHero from "@/components/Dummy/Dummy1";
import TestFetching from "@/components/Dummy/TestFetching";
import { ParallaxScrollDemo } from "@/components/Gallery/ParallaxScrollDemo";
import NewCountUp from "@/components/Home/CountupSection";
import FAQ2 from "@/components/Home/Faq2";
import FaqSection from "@/components/Home/FaqSection";
import HeroSection from "@/components/Home/HeroSection";
import NumbersSection from "@/components/Home/NumberSection";
import Parallax from "@/components/Home/Parallax";
import NavBarMain from "@/components/Navbar/NavbarMain";
import Image from "next/image";

export default function Home() {
  return (
   <>
   <HeroSection/>
   <Parallax/>
   <NewCountUp/>
   <NumbersSection/>
   <FAQ2/>
   {/* <FaqSection/> */}
   {/* <ParallaxScrollDemo/> */}
   {/* <WeddingHero/> */}
   {/* <AdminDashboard/> */}
   </>

  );
}
