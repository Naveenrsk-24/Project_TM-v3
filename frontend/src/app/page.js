import {
  generateStructuredData,
  generateFAQSchema,
  uniqueSchemas,
} from "@/lib/seo-utils";

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

import { pageMeta } from "@/lib/meta-data";

export const metadata = pageMeta({
  title: "Best Wedding Photographers in Chennai | Candid & Cinematic",
  description:
    "Searching for the best wedding photographers in Chennai? TM Studios captures candid, cinematic, and heartfelt wedding moments you'll treasure forever — check availability today.",
  path: "/",
  image: "/og-home.jpg",
});

export default function Home() {
  /**
   * --------------------------------------------
   * HOME PAGE — FAQ data
   * --------------------------------------------
   */
  const faqList = [
    {
      question: "Do you offer wedding photography in Chennai?",
      answer:
        "Yes, TM Studios provides premium wedding photography across all areas of Chennai.",
    },
    {
      question: "How early should I book?",
      answer:
        "Most clients book 1–6 months in advance. Peak-season dates fill up fast.",
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
      telephone: "+91-9876543210",
      email: "contact@tmstudios.com",
      priceRange: "₹50,000 - ₹2,00,000", // optional (good for Local SEO)

      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Photography Lane",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        postalCode: "600001",
        addressCountry: "IN",
      },

      sameAs: [
        "https://www.instagram.com/yourprofile",
        "https://www.facebook.com/yourprofile",
        "https://www.youtube.com/@yourchannel",
      ],
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

  // Final combine with duplicate protection
  const combinedSchema = uniqueSchemas([
    ...homepageStructuredData,
    homepageFAQSchema,
  ]);

  return (
    <>
      {/* Inject JSON-LD (Homepage) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(combinedSchema),
        }}
      />

      <HeroSection />
      <SubHeroSection />
      <Parallax />
      <StorytellerQuoteRotator quotes={seoQuotes} rotationInterval={5000} />
      <PortfolioGallery />

      {/* FAQ UI */}
      <ClassicFAQSection2 faqs={faqList} />

      <TestimonialCarousel2 />
      <BlogSection2 blogs={DUMMY_BLOGS} />
    </>
  );
}
