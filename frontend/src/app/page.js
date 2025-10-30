import dynamic from "next/dynamic";

import AdminDashboard from "@/components/Dashboard/AdminDashboard";
import WeddingHero from "@/components/Dummy/Dummy1";
import TestFetching from "@/components/Dummy/TestFetching";
import { ParallaxScrollDemo } from "@/components/Gallery/ParallaxScrollDemo";
import CountupLoader from "@/components/Home/LazyLoaders/CountupLoader";

import FAQ2 from "@/components/Home/Faq2";
import FaqSection from "@/components/Home/FaqSection";
import HeroSection from "@/components/Home/HeroSection";
import NumbersSection from "@/components/Home/NumberSection";
import Parallax from "@/components/Home/Parallax";
import SliderWithProgress from "@/components/Home/SlideWithProgress";
import VideoTestimonialCarousel from "@/components/Home/VideoTestimonialCarousel";
import { mockTestimonials } from "../data/Testimonials";
// import VerticalSlider from "@/components/Home/VerticalSlider";
import NavBarMain from "@/components/Navbar/NavbarMain";
import Image from "next/image";
import BlogSection from "@/components/Blog/BlogSection";
import { DUMMY_BLOGS } from "../data/blog-data";
import DynamicSliderWrapper from "@/components/Home/LazyLoaders/DynamicSlider";
import ServiceKeywordGrid from "@/components/Home/ServiceKeywordGrid";
import { serviceData } from "@/data/Home/ServiceData";
import StorytellerQuoteRotator from "@/components/Home/StorytellerQuoteBlock";
import { seoQuotes } from "../data/Home/quoteData";
import TestimonialCarousel from "@/components/Home/TestimonialCarousel";
import PortfolioGallery from "@/components/ExtraDesigns/PortfolioDesignA";
import ClassicFAQSection from "@/components/ExtraDesigns/ClassicFAQSection";
import SubHeroSection from "@/components/ExtraDesigns/SubHeroSection";
import ClassicFAQSection2 from "@/components/ExtraDesigns/ClassicFAQSection2";
import TestimonialCarousel2 from "@/components/ExtraDesigns/TestimonialCarousel2";
import BlogSection2 from "@/components/ExtraDesigns/BlogSection2";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SubHeroSection/>
      <Parallax />
      <StorytellerQuoteRotator quotes={seoQuotes} rotationInterval={5000} />
      <PortfolioGallery/>
      <ClassicFAQSection2/>
      <TestimonialCarousel2/>
      <BlogSection2 blogs={DUMMY_BLOGS} />

{/* ******************************************************* */}
      {/* <BlogSection blogs={DUMMY_BLOGS} /> */}
      {/* <TestimonialCarousel /> */}
      {/* <CountupLoader /> */}
      {/* <ClassicFAQSection/> */}
      {/* <FAQ2 /> */}
      {/* <ServiceKeywordGrid
        headline="Our Expertise: SEO Services and Locations"
        items={serviceData}
      /> */}
      {/* <DynamicSliderWrapper/> */}
      {/* <VideoTestimonialCarousel
        testimonials={mockTestimonials}
        autoplayOnHover={true}
      /> */}


      {/* <NumbersSection/> */}

     {/* <SliderWithProgress
  slides={[
    { content: <img src="https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg" alt="Slide 1" className="w-full h-full object-cover rounded-lg" /> },
    { content: <img src="https://images.pexels.com/photos/752842/pexels-photo-752842.jpeg" alt="Slide 2" className="w-full h-full object-cover rounded-lg" /> },
    { content: <img src="https://images.pexels.com/photos/1456613/pexels-photo-1456613.jpeg" alt="Slide 3" className="w-full h-full object-cover rounded-lg" /> },
    { content: <img src="https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg" alt="Slide 1" className="w-full h-full object-cover rounded-lg" /> },
    { content: <img src="https://images.pexels.com/photos/752842/pexels-photo-752842.jpeg" alt="Slide 2" className="w-full h-full object-cover rounded-lg" /> },
    { content: <img src="https://images.pexels.com/photos/1456613/pexels-photo-1456613.jpeg" alt="Slide 3" className="w-full h-full object-cover rounded-lg" /> },
    { content: <img src="https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg" alt="Slide 1" className="w-full h-full object-cover rounded-lg" /> },
    { content: <img src="https://images.pexels.com/photos/752842/pexels-photo-752842.jpeg" alt="Slide 2" className="w-full h-full object-cover rounded-lg" /> },
    { content: <img src="https://images.pexels.com/photos/1456613/pexels-photo-1456613.jpeg" alt="Slide 3" className="w-full h-full object-cover rounded-lg" /> },
  ]}
/> */}
      {/* <FaqSection/> */}
      {/* <ParallaxScrollDemo/> */}
      {/* <WeddingHero/> */}
      {/* <AdminDashboard/> */}
    </>
  );
}



// /Weddings/beautiful-husband-wife-posing-beach.jpg