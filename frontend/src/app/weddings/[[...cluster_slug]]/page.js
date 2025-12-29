// app/weddings/[[...cluster_slug]]/page.js (Modern API Version)
// Production Ready — Fixed Structured Data + No Duplication

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
  uniqueSchemas,
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
import GalleryContent from "@/components/ExtraDesigns/GalleryContent";

// --------------------------------------------------------
// 1) DYNAMIC METADATA HANDLING (for sub-cluster pages)
// --------------------------------------------------------
export async function generateMetadata({ params }) {
  const resolution = resolveClusterPage("weddings", params.cluster_slug);

  // Root-level SEO handled by /app/weddings/layout.js
  if (!params.cluster_slug || params.cluster_slug.length === 0) {
    return {};
  }

  if (resolution.type === PAGE_TYPES.NOT_FOUND) {
    return { title: "Not Found" };
  }

  return generateMetadataDynamic(resolution);
}

// --------------------------------------------------------
// 2) PAGE COMPONENT (Manual SEO for root + Dynamic SEO for sub-clusters)
// --------------------------------------------------------
export default function WeddingsClusterPage({ params }) {
  const resolution = resolveClusterPage("weddings", params.cluster_slug);
  const service = getServiceBySlug("weddings");

  if (resolution.type === PAGE_TYPES.NOT_FOUND) return notFound();

  const isRootCluster =
    !params.cluster_slug || params.cluster_slug.length === 0;

  // -------------------------------------------
  // ROOT CLUSTER PAGE (manual + enhanced schema)
  // -------------------------------------------
  if (isRootCluster) {
    const h1 = "Wedding Photography";
    const h2 =
      "Premium wedding photography portfolio in chennai";

    // Build Schema with FULL manual organization block
    const structuredData = generateStructuredData({
      resolution: { type: PAGE_TYPES.PILLAR, service },
      manual: {
        name: "TM Studios Photography",
        description:
          "Premium wedding, maternity & baby photography across Tamil Nadu.",
        telephone: "+91-7358279252",
        email: "subalesh@tmstudios.photography",
        address: {
          "@type": "PostalAddress",
          streetAddress: "21, Manimegalai 1st St, Pallikaranai",
          addressLocality: "Chennai",
          addressRegion: "Tamil Nadu",
          postalCode: "600100",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "13.0827",
          longitude: "80.2707",
        },
      },
      faqs: [
        {
          question: "Do you travel for destination weddings?",
          answer:
            "Yes! We shoot weddings across India and globally. Travel & stay applicable.",
        },
        {
          question: "How many edited photos will I receive?",
          answer: "Typically 300–800 edited photos depending on package.",
        },
      ],
    });

    // Ensure NO duplicates (organization/service/breadcrumbs)
    const finalSchema = uniqueSchemas(structuredData);

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(finalSchema) }}
        />

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
          bg={service.bgImage}
          ctaLabel={service.ctaLabel}
          ctaLink={service.ctaLink}
        />

        <FilteredGallery service={service} />

        {/* <PricingCard service={service} /> */}
        <GalleryContent/>
        <TestimonialCarousel2 />
        <ClassicFAQSection2 />
        <ContactForm service={service} />
      </>
    );
  }

  // -------------------------------------------
  // SUB-CLUSTER PAGES (Dynamic + auto schema)
  // -------------------------------------------
  const { h1, h2 } = generateHeadings(resolution);
  const breadcrumbs = generateBreadcrumbs(resolution);

  const structuredData = generateStructuredData({ resolution });
  const finalSchema = uniqueSchemas(structuredData);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(finalSchema) }}
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

      <ContactForm
        service={resolution.service}
        location={resolution.location}
      />
    </>
  );
}
