import {
  resolveClusterPage,
  PAGE_TYPES,
  generateBreadcrumbs,
} from "@/lib/cluster-resolver";
import {
  generateMetadata as generateSEO,
  generateHeadings,
  generateStructuredData,
} from "@/lib/seo-utils";
import { notFound } from "next/navigation";
import ServiceHero from "@/components/Dummy/ServiceHero";
import Gallery from "@/components/Dummy/Gallery";
import PricingCard from "@/components/Dummy/PricingCard";
import ContactForm from "@/components/Dummy/ContactForm";
import Breadcrumbs from "@/components/Breadcrumbs/BreadCrumbs";
import ServicesLocationsHub from "@/components/Dummy/ServicesLocationsHub";
import FilteredGallery from "@/components/Dummy/Filteredgallery";

export async function generateMetadata({ params }) {
  const resolution = resolveClusterPage("baby-shoots", params.cluster_slug);
  if (resolution.type === PAGE_TYPES.NOT_FOUND) {
    return { title: "Not Found" };
  }
  return generateSEO(resolution);
}

export default function BabyShootsClusterPage({ params }) {
  const resolution = resolveClusterPage("baby-shoots", params.cluster_slug);
  if (resolution.type === PAGE_TYPES.NOT_FOUND) return notFound();

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

      {/* <Gallery
        service={resolution.service}
        location={resolution.location}
        niche={resolution.niche}
        locality={resolution.locality}
      /> */}

      <PricingCard service={resolution.service} />
      <ContactForm
        service={resolution.service}
        location={resolution.location}
      />
    </>
  );
}
