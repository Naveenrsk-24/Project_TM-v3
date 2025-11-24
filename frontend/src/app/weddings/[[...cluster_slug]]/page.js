// app/weddings/[[...cluster_slug]]/page.js
// Final corrected version with proper dynamic SEO + correct structured data usage

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
  const resolution = resolveClusterPage("weddings", params.cluster_slug);

  // Root-level SEO should come from /app/weddings/layout.js
  if (!params.cluster_slug || params.cluster_slug.length === 0) {
    return {};
  }

  if (resolution.type === PAGE_TYPES.NOT_FOUND) {
    return { title: "Not Found" };
  }

  return generateMetadataDynamic(resolution);
}

// --------------------------------------------------------
// 2) PAGE COMPONENT (manual SEO for root + dynamic for sub-clusters)
// --------------------------------------------------------
export default function WeddingsClusterPage({ params }) {
  const resolution = resolveClusterPage("weddings", params.cluster_slug);
  const service = getServiceBySlug("weddings");

  if (resolution.type === PAGE_TYPES.NOT_FOUND) return notFound();

  const isRootCluster =
    !params.cluster_slug || params.cluster_slug.length === 0;

  // -------------------------------------------
  // ROOT CLUSTER PAGE (Manual SEO + manual schema)
  // -------------------------------------------
  if (isRootCluster) {
    const h1 = "Wedding Photography";
    const h2 =
      "Cinematic & Candid Wedding Photography – Premium Packages, Portfolio & Pricing";

    // ---- FIXED ARGUMENT ORDER FOR generateStructuredData ----
    // const structuredData = generateStructuredData(
    //   { type: PAGE_TYPES.PILLAR, service }, // resolution
    //   [],                                   // no custom FAQs (handled separately)
    //   {
    //     // manual overrides go **here**
    //     name: "TM Studios Photography",
    //     description:
    //       "Premium wedding, maternity & baby photography across Tamil Nadu.",
    //     telephone: "+91-9876543210",
    //     email: "contact@tmstudios.com",
    //     address: {
    //       "@type": "PostalAddress",
    //       streetAddress: "123 Photography Lane",
    //       addressLocality: "Chennai",
    //       addressRegion: "Tamil Nadu",
    //       postalCode: "600001",
    //       addressCountry: "IN",
    //     },
    //   }
    // );

    // FAQ must be separate for root page
    const faqSchema = generateFAQSchema(service, null, [
      {
        question: "Do you travel for destination weddings?",
        answer:
          "Yes! We shoot weddings across India and globally. Travel & stay applicable.",
      },
      {
        question: "How many edited photos will I receive?",
        answer: "Typically 300–800 edited photos depending on package.",
      },
    ]);

    // ---- Combine schemas into ONE JSON-LD block (Google best practice) ----
    const combinedSchema = [...structuredData, faqSchema];

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
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

        <PricingCard service={service} />
        <TestimonialCarousel2 />
        <ClassicFAQSection2 />

        <ContactForm service={service} />
      </>
    );
  }

  // -------------------------------------------
  // SUB-CLUSTER PAGES (Dynamic SEO + auto schema)
  // -------------------------------------------
  const { h1, h2 } = generateHeadings(resolution);
  const breadcrumbs = generateBreadcrumbs(resolution);

  const structuredData = generateStructuredData(resolution);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
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
