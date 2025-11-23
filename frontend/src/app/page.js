import {
  generateStructuredData,
  generateFAQSchema,
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
   * HOME PAGE — FAQ DATA (shared UI + Schema)
   * --------------------------------------------
   */
  const faqList = [
    {
      question: "Do you offer wedding photography in Chennai?",
      answer:
        "Yes, TM Studios provides premium wedding photography across all areas of Chennai."
    },
    {
      question: "How early should I book?",
      answer:
        "Most clients book 1–6 months in advance. Peak-season dates fill up fast."
    },
  ];

  /**
   * --------------------------------------------
   * HOME PAGE — STRUCTURED DATA (ORG + FAQ)
   * --------------------------------------------
   */

  // Organization Schema for homepage
  const homepageStructuredData = generateStructuredData(
    { service: null },     // correctly tells system this is NOT a service page
    [],                    // no auto-generated service FAQs
    {
      name: "TM Studios Photography",
      description:
        "Award-winning wedding, maternity, and baby photography serving Chennai & Tamil Nadu.",
      telephone: "+91-9876543210",
      email: "contact@tmstudios.com",
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
    }
  );

  // Homepage FAQ Schema
  const homepageFAQSchema = generateFAQSchema(
    { title: "TM Studios" }, 
    null,
    faqList
  );

  const combinedSchema = [...homepageStructuredData, homepageFAQSchema];

  return (
    <>
      {/* JSON-LD injected for homepage */}
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

      {/* FAQ component receives same FAQ list */}
      <ClassicFAQSection2 faqs={faqList} />

      <TestimonialCarousel2 />
      <BlogSection2 blogs={DUMMY_BLOGS} />
    </>
  );
}
