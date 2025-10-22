import AnimatedServicesSection from "@/components/ExtraDesigns/AnimatedServiceSection";
import CategoryGalleryB from "@/components/ExtraDesigns/CategoryGalleryB";
import GalleryDemo from "@/components/ExtraDesigns/ImageBentoGallery";
import KeywordRichAbout from "@/components/ExtraDesigns/KeywordRichAbout";
import ParallaxCarousel from "@/components/ExtraDesigns/ParallaxCarousel";
import PhotographyCategoriesB from "@/components/ExtraDesigns/PhotographyCategoriesB";
import PhotographyCategories from "@/components/ExtraDesigns/PortfolioCategoryDesignA";
import CategoryGallery from "@/components/ExtraDesigns/PortfolioCategoryGalleryA";
import PortfolioGallery from "@/components/ExtraDesigns/PortfolioDesignA";
import PortfolioGalleryB from "@/components/ExtraDesigns/PortfolioGalleryB";
import ThreeDCarousel from "@/components/ExtraDesigns/ThreeDCarousel";
import ServiceParallaxGrid,{servicesData} from "@/components/Home/ServiceParallaxGrid";


export default function Extras() {
  return (
   <>
   <ParallaxCarousel/>
   <ThreeDCarousel/>
   <AnimatedServicesSection/>
   <KeywordRichAbout/>
   <PortfolioGallery/>
   <PhotographyCategories/>
   <CategoryGallery/>
  <ServiceParallaxGrid services={servicesData}/>
   
   {/* <GalleryDemo/> */}

   {/* ************************************ */}
   {/* <PortfolioGalleryB/>
   <PhotographyCategoriesB/>
   <CategoryGalleryB/> */}
   </>

  );
}