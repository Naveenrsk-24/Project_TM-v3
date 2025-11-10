// app/weddings/[[...cluster_slug]]/page.js
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
import TestimonialCarousel2 from "@/components/ExtraDesigns/TestimonialCarousel2";
import ClassicFAQSection2 from "@/components/ExtraDesigns/ClassicFAQSection2";
import Breadcrumbs from "@/components/Breadcrumbs/BreadCrumbs";

export async function generateMetadata({ params }) {
  const resolution = resolveClusterPage("weddings", params.cluster_slug);
  if (resolution.type === PAGE_TYPES.NOT_FOUND) {
    return { title: "Not Found" };
  }
  return generateSEO(resolution);
}

export default function WeddingsClusterPage({ params }) {
  const resolution = resolveClusterPage("weddings", params.cluster_slug);
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
      <Breadcrumbs breadcrumbs={breadcrumbs}/>

      {/* <nav className="text-sm breadcrumbs px-6 py-3">
        {breadcrumbs.map((b, i) => (
          <span key={i}>
            <a href={b.href}>{b.label}</a>
            {i < breadcrumbs.length - 1 && " › "}
          </span>
        ))}
      </nav> */}

      <ServiceHero
        title={h1}
        subtitle={h2}
        icon={resolution.service.icon}
        location={resolution.location?.name}
        bg={resolution.service?.bgImage}
        ctaLabel={resolution.service?.ctaLabel}
        ctaLink={resolution.service?.ctaLink}
      />

      <Gallery
        service={resolution.service} location={resolution.location} niche={resolution.niche} locality={resolution.locality}
      />

      <PricingCard service={resolution.service} />
      <TestimonialCarousel2/>
      <ClassicFAQSection2/>

      <ContactForm service={resolution.service} location={resolution.location} />
    </>
  );
}
