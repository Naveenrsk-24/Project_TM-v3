// app/weddings/page.js

import { getServiceBySlug } from "@/lib/services-data";

import Breadcrumbs from "@/components/Breadcrumbs/BreadCrumbs";
import ServiceHero from "@/components/Dummy/ServiceHero";
import FilteredGallery from "@/components/Dummy/Filteredgallery";
import GalleryContent from "@/components/ExtraDesigns/GalleryContent";
import TestimonialCarousel2 from "@/components/ExtraDesigns/TestimonialCarousel2";
import ClassicFAQSection2 from "@/components/ExtraDesigns/ClassicFAQSection2";
import ContactForm from "@/components/Dummy/ContactForm";

// Simple static SEO (optional)
export const metadata = {
  title: "Wedding Photography | TM Studios",
  description:
    "Premium and timeless wedding photography in Chennai. Explore our portfolio, packages, and real wedding stories.",
};

export default function WeddingsPage() {
  const service = getServiceBySlug("weddings");

  const h1 = "Wedding Photography";
  const h2 = "Premium Wedding Photography Portfolio in Chennai";

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Weddings", href: "/weddings" },
        ]}
      />

      <ServiceHero
        title={h1}
        subtitle={h2}
        icon={service.icon}
        bg={service.bgImage} // Desktop background
        mobileBg={service.mobileBg} // Mobile background (NEW)
        ctaLabel={service.ctaLabel}
        ctaLink={service.ctaLink}
      />

      <FilteredGallery service={service} />

      <GalleryContent />
      <TestimonialCarousel2 />
      <ClassicFAQSection2 />

      {/* <ContactForm service={service} /> */}
    </>
  );
}
