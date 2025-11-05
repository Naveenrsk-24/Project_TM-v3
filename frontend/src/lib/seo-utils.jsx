// lib/seo-utils.js
// Dynamic SEO metadata generation for all page types

import { PAGE_TYPES } from './cluster-resolver';

/**
 * Generates complete metadata for Next.js pages based on resolution
 * @param {Object} resolution - The resolved page data from cluster-resolver
 * @returns {Object} Next.js metadata object
 */
export function generateMetadata(resolution) {
  const { type, service, location, locality, niche } = resolution;

  if (!service) {
    return {
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist.'
    };
  }

  let title, description, keywords;

  switch (type) {
    case PAGE_TYPES.PILLAR:
      title = `${service.title} | Professional Services | YourBrand`;
      description = `${service.description} Starting from ${service.basePrice}. ${service.features.join(', ')}.`;
      keywords = [
        service.title.toLowerCase(),
        service.slug,
        'professional photography',
        'photography services'
      ];
      break;

    case PAGE_TYPES.LOCATION:
      title = `${service.title} in ${location.name} | Best Photographers | YourBrand`;
      description = `Looking for ${service.title.toLowerCase()} in ${location.name}? Professional photographers with 500+ happy clients. ${service.basePrice} onwards. Book now!`;
      keywords = [
        `${service.slug} ${location.slug}`,
        `${service.title} in ${location.name}`,
        `best photographers ${location.name}`,
        `${location.name} photography`
      ];
      break;

    case PAGE_TYPES.LOCALITY:
      title = `${service.title} in ${locality.name}, ${location.name} | Local Photographers`;
      description = `Top-rated ${service.title.toLowerCase()} in ${locality.name}, ${location.name}. ${locality.description}. Call now for bookings!`;
      keywords = [
        `${service.slug} ${locality.slug}`,
        `${service.title} ${locality.name}`,
        `photographers near ${locality.name}`,
        `${location.name} ${locality.name} photography`
      ];
      break;

    case PAGE_TYPES.NICHE:
      title = `${niche.title} | ${service.title} Specialists | YourBrand`;
      description = `Expert ${niche.title.toLowerCase()} services. ${niche.description}. Premium ${service.title.toLowerCase()} packages available.`;
      keywords = [
        niche.slug,
        niche.title.toLowerCase(),
        `${niche.slug} photography`,
        service.slug
      ];
      break;

    case PAGE_TYPES.NICHE_LOCATION:
      title = `${niche.title} in ${location.name} | ${service.title} | YourBrand`;
      description = `Specialized ${niche.title.toLowerCase()} in ${location.name}. ${niche.description}. ${location.description}.`;
      keywords = [
        `${niche.slug} ${location.slug}`,
        `${niche.title} in ${location.name}`,
        `${location.name} ${niche.title.toLowerCase()}`,
        service.slug
      ];
      break;

    default:
      title = service.title;
      description = service.description;
      keywords = [service.slug];
  }

  return {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      type: 'website',
      images: [
        {
          url: `/images/${service.slug}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    }
  };
}

/**
 * Generates JSON-LD structured data for SEO
 */
export function generateStructuredData(resolution) {
  const { type, service, location } = resolution;
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
  
  // Base Organization schema
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'YourBrand Photography',
    description: 'Professional photography services',
    url: baseUrl,
    telephone: '+91-9876543210',
    email: 'hello@yourbrand.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Photography Lane',
      addressLocality: 'Chennai',
      addressRegion: 'Tamil Nadu',
      postalCode: '600001',
      addressCountry: 'IN'
    }
  };

  // Service-specific schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.title,
    provider: {
      '@type': 'ProfessionalService',
      name: 'YourBrand Photography'
    },
    description: service.description,
    offers: {
      '@type': 'Offer',
      price: service.basePrice.replace('₹', '').replace(',', ''),
      priceCurrency: 'INR'
    }
  };

  // Add location if present
  if (location && type === PAGE_TYPES.LOCATION) {
    serviceSchema.areaServed = {
      '@type': 'City',
      name: location.name
    };
  }

  // Breadcrumb schema
  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: []
  };

  // Add breadcrumb items based on page type
  let position = 1;
  breadcrumbList.itemListElement.push({
    '@type': 'ListItem',
    position: position++,
    name: 'Home',
    item: baseUrl
  });

  breadcrumbList.itemListElement.push({
    '@type': 'ListItem',
    position: position++,
    name: service.title,
    item: `${baseUrl}/${service.slug}`
  });

  if (location && type === PAGE_TYPES.LOCATION) {
    breadcrumbList.itemListElement.push({
      '@type': 'ListItem',
      position: position++,
      name: location.name,
      item: `${baseUrl}/${service.slug}/${location.slug}`
    });
  }

  return [organization, serviceSchema, breadcrumbList];
}

/**
 * Generates heading hierarchy for the page
 */
export function generateHeadings(resolution) {
  const { type, service, location, locality, niche } = resolution;

  let h1, h2;

  switch (type) {
    case PAGE_TYPES.PILLAR:
      h1 = `Professional ${service.title} Services`;
      h2 = `Capture Life's Most Precious Moments`;
      break;

    case PAGE_TYPES.LOCATION:
      h1 = `${service.title} in ${location.name}`;
      h2 = `Expert ${service.title} Services Across ${location.name}`;
      break;

    case PAGE_TYPES.LOCALITY:
      h1 = `${service.title} in ${locality.name}, ${location.name}`;
      h2 = `Local ${service.title} Experts in Your Neighborhood`;
      break;

    case PAGE_TYPES.NICHE:
      h1 = `${niche.title} Photography`;
      h2 = niche.description;
      break;

    case PAGE_TYPES.NICHE_LOCATION:
      h1 = `${niche.title} in ${location.name}`;
      h2 = `Specialized ${niche.title} Services in ${location.name}`;
      break;

    default:
      h1 = service.title;
      h2 = service.description;
  }

  return { h1, h2 };
}

/**
 * Generates FAQ schema for rich snippets
 */
export function generateFAQSchema(service, location = null) {
  const faqs = [
    {
      question: `How much does ${service.title.toLowerCase()} cost?`,
      answer: `Our ${service.title.toLowerCase()} packages start from ${service.basePrice}. Final pricing depends on your specific requirements and package selection.`
    },
    {
      question: `What is included in your ${service.title.toLowerCase()} package?`,
      answer: `Our packages include: ${service.features.join(', ')}. We customize each package to meet your specific needs.`
    }
  ];

  if (location) {
    faqs.push({
      question: `Do you provide ${service.title.toLowerCase()} services in ${location.name}?`,
      answer: `Yes! We provide professional ${service.title.toLowerCase()} services across ${location.name} and surrounding areas.`
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}