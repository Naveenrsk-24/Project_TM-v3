// app/baby-shoots/[[...cluster_slug]]/page.js
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
import Breadcrumbs from "@/components/Breadcrumbs/BreadCrumbs";

// --------------------------------------------------------
// 1) DYNAMIC METADATA HANDLING (for sub-cluster pages)
// --------------------------------------------------------
export async function generateMetadata({ params }) {
  const resolution = resolveClusterPage("baby-shoots", params.cluster_slug);

  // Root cluster → manual metadata from layout.js
  if (!params.cluster_slug || params.cluster_slug.length === 0) {
    return {}; // Let layout.js handle manual SEO
  }

  if (resolution.type === PAGE_TYPES.NOT_FOUND) return { title: "Not Found" };

  return generateMetadataDynamic(resolution);
}

// --------------------------------------------------------
// 2) PAGE COMPONENT HANDLER
// --------------------------------------------------------
export default function BabyShootsClusterPage({ params }) {
  const resolution = resolveClusterPage("baby-shoots", params.cluster_slug);
  const service = getServiceBySlug("baby-shoots");

  if (resolution.type === PAGE_TYPES.NOT_FOUND) return notFound();

  const isRootCluster = !params.cluster_slug || params.cluster_slug.length === 0;

  // --------------------------------------------------------
  // ROOT CLUSTER PAGE (Manual SEO)
  // --------------------------------------------------------
  if (isRootCluster) {
    const h1 = "Baby Photoshoot";
    const h2 =
      "Newborn, Infant & Toddler Photography – Safe Posing, Themed Sets & Premium Props";

    const structuredData = generateStructuredData(
      { service },
      {
        name: "TM Studios Photography",
        description:
          "Premium newborn, infant and toddler photography across Tamil Nadu.",
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
        question: "Is newborn photography safe?",
        answer:
          "Yes, we follow newborn-safe posing techniques and sanitized studio conditions.",
      },
      {
        question: "What is the best age for a newborn shoot?",
        answer:
          "The ideal window is 7–20 days from birth for curled-up, sleepy poses.",
      },
    ]);

    return (
      <>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <Breadcrumbs
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Baby Photoshoots", href: "/baby-shoots" },
          ]}
        />

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
        <ContactForm service={service} />
      </>
    );
  }

  // --------------------------------------------------------
  // SUB-CLUSTER PAGE (Dynamic SEO)
  // --------------------------------------------------------
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
      <ContactForm service={resolution.service} location={resolution.location} />
    </>
  );
}
