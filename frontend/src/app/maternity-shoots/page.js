// app/weddings/page.js

import { getServiceBySlug } from "@/lib/services-data";

import Breadcrumbs from "@/components/Breadcrumbs/BreadCrumbs";
import ServiceHero from "@/components/Dummy/ServiceHero";
import FilteredGallery from "@/components/Dummy/Filteredgallery";
import GalleryContent from "@/components/ExtraDesigns/GalleryContent";
import TestimonialCarousel2 from "@/components/ExtraDesigns/TestimonialCarousel2";
import ClassicFAQSection2 from "@/components/ExtraDesigns/ClassicFAQSection2";
import ContactForm from "@/components/Dummy/ContactForm";
import PricingCard from "@/components/Dummy/PricingCard";

export default function MaternityPage() {
  const service = getServiceBySlug("maternity-shoots");

  const h1 = "Maternity Photography";
  const h2 = "Premium Maternity Photography in Chennai";

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Maternity-Shoots", href: "/maternity-shoots" },
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
      <PricingCard service={service} />
    </>
  );
}
