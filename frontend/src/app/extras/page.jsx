import AnimatedServicesSection from "@/components/ExtraDesigns/AnimatedServiceSection";
import CategoryGalleryB from "@/components/ExtraDesigns/CategoryGalleryB";
import ClassicFAQSection from "@/components/ExtraDesigns/ClassicFAQSection";
import DraggableCardDemo from "@/components/ExtraDesigns/DraggableCardsDemo";
import GalleryDemo from "@/components/ExtraDesigns/ImageBentoGallery";
import KeywordRichAbout from "@/components/ExtraDesigns/KeywordRichAbout";
import ParallaxCarousel from "@/components/ExtraDesigns/ParallaxCarousel";
import PhotographyCategoriesB from "@/components/ExtraDesigns/PhotographyCategoriesB";
import PhotographyCategories from "@/components/ExtraDesigns/PortfolioCategoryDesignA";
import CategoryGallery from "@/components/ExtraDesigns/PortfolioCategoryGalleryA";
import PortfolioGallery from "@/components/ExtraDesigns/PortfolioDesignA";
import PortfolioGalleryB from "@/components/ExtraDesigns/PortfolioGalleryB";
import SubHeroSection from "@/components/ExtraDesigns/SubHeroSection";
import ThreeDCarousel from "@/components/ExtraDesigns/ThreeDCarousel";
import ServiceParallaxGrid, {
  servicesData,
} from "@/components/Home/ServiceParallaxGrid";
import { Navbar2 } from "@/components/Navbar/Navbar2";
import WhyChooseUs from "../../components/ExtraDesigns/WeddingTheme";
import WeddingGallerySection from "@/components/ExtraDesigns/WeddingGallerySection";
import WeddingGallerySection2 from "@/components/ExtraDesigns/WeddingGallerySection-2";

export default function Extras() {
  return (
    <>
      {/* <Navbar2/> */}
      {/* <PremiumNavbar/> */}
      <ParallaxCarousel />
      <ThreeDCarousel />
      <AnimatedServicesSection />
      <KeywordRichAbout />
      <PortfolioGallery />
      <PhotographyCategories />
      <CategoryGallery />
      <ServiceParallaxGrid services={servicesData} />
      <ClassicFAQSection />
      <SubHeroSection/>
      <DraggableCardDemo/>
      <WhyChooseUs />
      <WeddingGallerySection/>
      <WeddingGallerySection2/>


      {/* <GalleryDemo/> */}

      {/* ************************************ */}
      {/* <PortfolioGalleryB/>
   <PhotographyCategoriesB/>
   <CategoryGalleryB/> */}
    </>
  );
}
