// app/baby-shoots/[[...cluster_slug]]/page.js
// Production-ready — fully consistent with Wedding & Maternity clusters

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
// 1) Dynamic metadata handling for sub-clusters
// --------------------------------------------------------
export async function generateMetadata({ params }) {
  const resolution = resolveClusterPage("baby-shoots", params.cluster_slug);

  if (!params.cluster_slug || params.cluster_slug.length === 0) {
    return {}; // Root SEO handled by layout.js
  }

  if (resolution.type === PAGE_TYPES.NOT_FOUND) {
    return { title: "Not Found" };
  }

  return generateMetadataDynamic(resolution);
}

// --------------------------------------------------------
// 2) PAGE HANDLER (Root = manual, Sub-clusters = dynamic)
// --------------------------------------------------------
export default function BabyShootsClusterPage({ params }) {
  const resolution = resolveClusterPage("baby-shoots", params.cluster_slug);
  const service = getServiceBySlug("baby-shoots");

  if (resolution.type === PAGE_TYPES.NOT_FOUND) return notFound();

  const isRootCluster =
    !params.cluster_slug || params.cluster_slug.length === 0;

  // --------------------------------------------------------
  // ROOT CLUSTER PAGE — Manual SEO (wedding-level)
  // --------------------------------------------------------
  if (isRootCluster) {
    const h1 = "Baby Photoshoot";
    const h2 =
      "Newborn, Infant & Toddler Photography – Safe Posing, Themed Sets & Premium Props";

    // Full structured data block — matches wedding structure
    const structuredData = generateStructuredData({
      resolution: { type: PAGE_TYPES.PILLAR, service },
      manual: {
        name: "TM Studios Photography",
        description:
          "Premium newborn, infant and toddler photography across Tamil Nadu.",
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
          question: "Is newborn photography safe?",
          answer:
            "Yes, we follow newborn-safe posing techniques and sanitized studio conditions.",
        },
        {
          question: "What is the best age for a newborn shoot?",
          answer:
            "The ideal window is 7–20 days from birth for curled-up, sleepy poses.",
        },
      ],
    });

    const finalSchema = uniqueSchemas(structuredData);

    return (
      <>
        {/* Single JSON-LD block — production standard */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(finalSchema),
          }}
        />

        {/* Consistent breadcrumbs */}
        <Breadcrumbs
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: service.title, href: "/baby-shoots" },
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

  // --------------------------------------------------------
  // SUB-CLUSTER PAGES — Fully dynamic SEO
  // --------------------------------------------------------
  const { h1, h2 } = generateHeadings(resolution);
  const breadcrumbs = generateBreadcrumbs(resolution);

  const structuredData = generateStructuredData({ resolution });
  const finalSchema = uniqueSchemas(structuredData);

  return (
    <>
      {/* JSON-LD for dynamic sub-clusters */}
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

      <ContactForm
        service={resolution.service}
        location={resolution.location}
      />
    </>
  );
}
