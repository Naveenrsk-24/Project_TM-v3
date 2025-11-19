// app/maternity-shoots/[[...cluster_slug]]/page.js
// Updated version with manual SEO for root cluster + dynamic SEO for sub-clusters

import {
  resolveClusterPage,
  PAGE_TYPES,
  generateBreadcrumbs,
} from "@/lib/cluster-resolver";

import {
  generateMetadataDynamic,
  generateHeadings,
  generateStructuredData,
  generateFAQSchema,
} from "@/lib/seo-utils";

import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";

import ServiceHero from "@/components/Dummy/ServiceHero";
import FilteredGallery from "@/components/Dummy/Filteredgallery";
import PricingCard from "@/components/Dummy/PricingCard";
import ContactForm from "@/components/Dummy/ContactForm";
import TestimonialCarousel2 from "@/components/ExtraDesigns/TestimonialCarousel2";
import ClassicFAQSection2 from "@/components/ExtraDesigns/ClassicFAQSection2";
import Breadcrumbs from "@/components/Breadcrumbs/BreadCrumbs";

// --------------------------------------------------------
// 1) DYNAMIC METADATA HANDLING (for sub-cluster pages)
// --------------------------------------------------------
export async function generateMetadata({ params }) {
  const resolution = resolveClusterPage("maternity-shoots", params.cluster_slug);

  // If this is the ROOT CLUSTER (no cluster_slug) → do NOT use dynamic metadata
  if (!params.cluster_slug || params.cluster_slug.length === 0) {
    return {}; // let layout.js handle manual metadata
  }

  if (resolution.type === PAGE_TYPES.NOT_FOUND) {
    return { title: "Not Found" };
  }

  return generateMetadataDynamic(resolution);
}

// --------------------------------------------------------
// 2) PAGE COMPONENT HANDLER
// --------------------------------------------------------
export default function MaternityClusterPage({ params }) {
  const resolution = resolveClusterPage("maternity-shoots", params.cluster_slug);
  const service = getServiceBySlug("maternity-shoots");

  if (resolution.type === PAGE_TYPES.NOT_FOUND) return notFound();

  // Detect root cluster
  const isRootCluster = !params.cluster_slug || params.cluster_slug.length === 0;

  // -------------------------------------------
  // ROOT CLUSTER PAGE (Manual SEO)
  // -------------------------------------------
  if (isRootCluster) {
    const h1 = "Maternity Photoshoot";
    const h2 = "Elegant Outdoor & Studio Maternity Photography – Premium Gowns, Concepts & Packages";

    // Manual JSON-LD structured data
    const structuredData = generateStructuredData(
      { service },
      {
        name: "TM Studios Photography",
        description: "Premium maternity, wedding & baby photography across Tamil Nadu.",
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
      }
    );

    const faqSchema = generateFAQSchema(service, null, [
      {
        question: "When is the best time for a maternity shoot?",
        answer: "The ideal time is between 28–34 weeks of pregnancy for best results.",
      },
      {
        question: "Do you provide maternity gowns?",
        answer: "Yes, we offer a curated collection of premium gowns for indoor and outdoor shoots.",
      },
    ]);

    return (
      <>
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <Breadcrumbs breadcrumbs={[{ label: "Home", href: "/" }, { label: "Maternity Shoots", href: "/maternity-shoots" }]} />

        <ServiceHero
          title={h1}
          subtitle={h2}
          icon={service.icon}
          location={null}
          bg={service.bgImage}
          ctaLabel={service.ctaLabel}
          ctaLink={service.ctaLink}
        />

        <FilteredGallery service={service} />

        <PricingCard service={service} />
        <TestimonialCarousel2 />
        <ClassicFAQSection2 />

        <ContactForm service={service} />
      </>
    );
  }

  // -------------------------------------------
  // SUB-CLUSTER PAGE (Dynamic SEO)
  // -------------------------------------------
  const { h1, h2 } = generateHeadings(resolution);
  const breadcrumbs = generateBreadcrumbs(resolution);
  const structuredData = generateStructuredData(resolution);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <ServiceHero
        title={h1}
        subtitle={h2}
        icon={resolution.service.icon}
        location={resolution.location?.name}
        bg={resolution.service?.bgImage}
        ctaLabel={resolution.service?.ctaLabel}
        ctaLink={resolution.service?.ctaLink}
      />

      <FilteredGallery
        service={resolution.service}
        location={resolution.location}
        niche={resolution.niche}
        locality={resolution.locality}
      />

      <PricingCard service={resolution.service} />
      <TestimonialCarousel2 />
      <ClassicFAQSection2 />

      <ContactForm service={resolution.service} location={resolution.location} />
    </>
  );
}
