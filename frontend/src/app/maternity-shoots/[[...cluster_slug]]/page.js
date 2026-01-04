// app/maternity-shoots/[[...cluster_slug]]/page.js
// Production-Ready — Fully Consistent With Wedding Cluster

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

// --------------------------------------------------------
// 1) DYNAMIC METADATA HANDLING (sub-clusters only)
// --------------------------------------------------------
export async function generateMetadata({ params }) {
  const resolution = resolveClusterPage("maternity-shoots", params.cluster_slug);

  // Root cluster → manual metadata in layout.js
  if (!params.cluster_slug || params.cluster_slug.length === 0) {
    return {};
  }

  if (resolution.type === PAGE_TYPES.NOT_FOUND) {
    return { title: "Not Found" };
  }

  return generateMetadataDynamic(resolution);
}

// --------------------------------------------------------
// 2) PAGE HANDLER (Root cluster manual, sub-cluster dynamic)
// --------------------------------------------------------
export default function MaternityClusterPage({ params }) {
  const resolution = resolveClusterPage("maternity-shoots", params.cluster_slug);
  const service = getServiceBySlug("maternity-shoots");

  if (resolution.type === PAGE_TYPES.NOT_FOUND) return notFound();

  const isRootCluster = !params.cluster_slug || params.cluster_slug.length === 0;

  // -------------------------------------------
  // ROOT CLUSTER PAGE  —  FULL MANUAL SEO
  // -------------------------------------------
  if (isRootCluster) {
    const h1 = "Maternity Photography";
    const h2 =
      "Elegant Outdoor & Studio Pregnancy Photography — Premium Gowns, Concepts & Packages";

    // Build structured data AT ROOT LEVEL (same pattern as weddings)
    const structuredData = generateStructuredData({
      resolution: { type: PAGE_TYPES.PILLAR, service },
      manual: {
        name: "TM Studios Photography",
        description:
          "Premium maternity, wedding & baby photography across Tamil Nadu.",
        telephone: "+91-7358279252",
        email: "subalesh@tmstudios.photography",

        address: {
          "@type": "PostalAddress",
          streetAddress: "123 Photography Lane",
          addressLocality: "Chennai",
          addressRegion: "Tamil Nadu",
          postalCode: "600001",
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
          question: "When is the best time for a maternity shoot?",
          answer:
            "The ideal time is between 28–34 weeks of pregnancy for best results.",
        },
        {
          question: "Do you provide maternity gowns?",
          answer:
            "Yes, we offer a curated collection of premium gowns for indoor and outdoor shoots.",
        },
      ],
    });

    const finalSchema = uniqueSchemas(structuredData);

    return (
      <>
        {/* JSON-LD Injection */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(finalSchema),
          }}
        />

        {/* Breadcrumbs consistent with weddings */}
        <Breadcrumbs
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Maternity Shoots", href: "/maternity-shoots" },
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

        <PricingCard service={service} />
        {/* <TestimonialCarousel2 /> */}
        <ClassicFAQSection2 />

        {/* <ContactForm service={service} /> */}
      </>
    );
  }

  // -------------------------------------------
  // SUB-CLUSTER PAGES — 100% dynamic (Wedding-level)
  // -------------------------------------------
  const { h1, h2 } = generateHeadings(resolution);
  const breadcrumbs = generateBreadcrumbs(resolution);

  const structuredData = generateStructuredData({ resolution });
  const finalSchema = uniqueSchemas(structuredData);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(finalSchema),
        }}
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
