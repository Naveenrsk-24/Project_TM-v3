

import HeroSection from "@/components/Home/HeroSection";
import SubHeroSection from "@/components/ExtraDesigns/SubHeroSection";
import Parallax from "@/components/Home/Parallax";
import StorytellerQuoteRotator from "@/components/Home/StorytellerQuoteBlock";
import { seoQuotes } from "../data/Home/quoteData";
import PortfolioGallery from "@/components/ExtraDesigns/PortfolioDesignA";
import ClassicFAQSection2 from "@/components/ExtraDesigns/ClassicFAQSection2";
import TestimonialCarousel2 from "@/components/ExtraDesigns/TestimonialCarousel2";
import BlogSection2 from "@/components/ExtraDesigns/BlogSection2";
import { DUMMY_BLOGS } from "../data/blog-data";
import { galleryImages } from "@/data/Home/GalleryImages";
import WhatsAppButton from "@/components/Home/WhatsAppButton";



export default function Home() {
  /**
   * --------------------------------------------
   * HOME PAGE — FAQ data
   * --------------------------------------------
   */
  const faqList = [
    {
      question: "How much does wedding photography cost?",
      answer:
        "Our wedding photography packages start at ₹35,000 and vary based on coverage, events, and the deliverables you choose. We'll help you pick a plan that fits your day perfectly.",
    },
    {
      question: "How early should we book TM Studios for our wedding",
      answer:
        "We recommend booking as early as possible, especially for peak wedding seasons. Most couples reach out to us several months in advance to ensure availability and smooth planning.",
    },
    {
      question: "Do you cover destination and outstation weddings",
      answer:
        "Yes, we travel across cities and destinations for weddings. Whether it is within Tamil Nadu or elsewhere in Overseas, our team is experienced in planning and documenting weddings in different locations and cultures.",
    },
    {
      question: "When can we expect to receive our wedding photos and albums",
      answer:
        "We follow a careful editing and curation process to maintain quality. Wedding photographs are usually delivered within the discussed timeline, with regular updates shared so you always know what to expect",
    },
  ];

  /**
   * --------------------------------------------
   * HOME PAGE — STRUCTURED DATA
   * (Organization + FAQ)
   * --------------------------------------------
   */

  // Modern API version
  const homepageStructuredData = generateStructuredData({
    resolution: { service: null }, // homepage = NOT a service page
    manual: {
      name: "TM Studios Photography",
      description:
        "Award-winning wedding, maternity, and baby photography serving Chennai & Tamil Nadu.",
      telephone: "+91-7358279252",
      email: "subalesh@tmstudios.photography",
      priceRange: "₹35,000 - ₹2,00,000", // optional (good for Local SEO)

      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Photography Lane",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        postalCode: "600001",
        addressCountry: "IN",
      },

      sameAs: [
        "https://www.instagram.com/tmstudios.photography",
        "https://www.facebook.com/TMStudiosphotohgraphy",
        "https://www.youtube.com/@Withme-Subalesh",
      ],

      logo: `${SITE_URL}/logo.png`,
      image: [
        `${SITE_URL}/og-image.jpg`,
      ],

      hasMap: "https://www.google.com/maps?cid=YOUR_PLACE_ID",
    },

    // homepage has NO service FAQ
    faqs: [],

    options: {
      includeBreadcrumbs: false, // Homepage never requires breadcrumbs
      includeOrganization: true, // Keep full Org schema here
    },
  });

  // Homepage FAQ schema
  const homepageFAQSchema = generateFAQSchema(
    { title: "TM Studios" },
    null,
    faqList
  );



  return (
    <>
      {/* Inject JSON-LD (Homepage) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(combinedSchema),
        }}
      />

      {/* <WeddingGallerySection/> */}
      <HeroSection />
      <SubHeroSection />
      <Parallax />
      <StorytellerQuoteRotator quotes={seoQuotes} rotationInterval={5000} />
      <PortfolioGallery  images={galleryImages} />

      {/* FAQ UI */}
      <ClassicFAQSection2 faqs={faqList} />

      <TestimonialCarousel2 />
      <WhatsAppButton />
      {/* <BlogSection2 blogs={DUMMY_BLOGS} /> */}

    </>
  );
}
