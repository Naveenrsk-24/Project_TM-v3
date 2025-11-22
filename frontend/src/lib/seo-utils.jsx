// lib/seo-utils.jsx
import { PAGE_TYPES } from './cluster-resolver';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://tmstudios.photography/').replace(/\/$/, '');

function canonical(path = '') {
  if (!path || path === '/') return SITE_URL;
  return `${SITE_URL}${path.startsWith('/') ? path : '/' + path}`;
}

// Utility to truncate while keeping words
function smartTruncate(text = '', max = 155) {
  if (!text) return '';
  if (text.length <= max) return text;
  const truncated = text.slice(0, max - 1);
  return truncated.slice(0, truncated.lastIndexOf(' ')) + '…';
}

// Merge manual overrides with dynamic values (manual wins)
export function mergeMetadata(dynamicMeta = {}, manualMeta = {}) {
  return {
    ...dynamicMeta,
    ...manualMeta,
    // merge openGraph and twitter as nested merges
    openGraph: { ...(dynamicMeta.openGraph || {}), ...(manualMeta.openGraph || {}) },
    twitter: { ...(dynamicMeta.twitter || {}), ...(manualMeta.twitter || {}) }
  };
}

// Primary dynamic metadata generator (used for sub-clusters)
export function generateMetadataDynamic(resolution) {
  const { type, service, location, locality, niche } = resolution || {};

  if (!service) {
    return {
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }

  let title = service.title;
  let description = service.description;

  switch (type) {
    case PAGE_TYPES.PILLAR:
      title = `${service.title} | ${service.basePrice ? `From ${service.basePrice}` : ''}`.trim();
      description = smartTruncate(`${service.description} Packages: ${service.features?.slice(0,4).join(', ')}.`, 160);
      break;

    case PAGE_TYPES.LOCATION:
      title = `${service.title} in ${location.name} – ${service.basePrice || ''}`.trim();
      description = smartTruncate(`Looking for ${service.title.toLowerCase()} in ${location.name}? ${service.features?.slice(0,4).join(', ')}.`, 160);
      break;

    case PAGE_TYPES.LOCALITY:
      title = `${service.title} in ${locality.name}, ${location.name} – Local Photographers`;
      description = smartTruncate(`Top-rated ${service.title.toLowerCase()} in ${locality.name}, ${location.name}. ${locality.description || ''}`, 160);
      break;

    case PAGE_TYPES.NICHE:
      title = `${niche.title} – ${service.title} Specialists`;
      description = smartTruncate(`${niche.description || ''} Premium ${service.title.toLowerCase()} packages available.`, 160);
      break;

    case PAGE_TYPES.NICHE_LOCATION:
      title = `${niche.title} in ${location.name} – ${service.title}`;
      description = smartTruncate(`Specialized ${niche.title.toLowerCase()} in ${location.name}. ${niche.description || ''}`, 160);
      break;

    default:
      title = service.title;
      description = smartTruncate(service.description, 160);
  }

  const ogImage = `/images/${service.slug}/og-image.jpg`;

  return {
    title,
    description,
    // keywords are optional; Google ignores them but you can keep a semantic string for other engines
    keywords: [service.slug, ...(location ? [location.slug] : []), ...(niche ? [niche.slug] : [])].filter(Boolean).join(', '),
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonical(`/${service.slug}${location ? '/' + location.slug : ''}`),
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }]
    },
    twitter: { card: 'summary_large_image', title, description }
  };
}

// Structured data generator (supports manual overriding of key fields)
export function generateStructuredData(resolution, manual = {}) {
  const { service, location } = resolution || {};
  const baseUrl = SITE_URL;

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${baseUrl}/#organization`,
    name: manual.name || 'YourBrand Photography',
    description: manual.description || 'Professional photography services',
    url: baseUrl,
    telephone: manual.telephone || '+91-9876543210',
    email: manual.email || 'hello@yourbrand.com',
    address: manual.address || {
      '@type': 'PostalAddress',
      streetAddress: '123 Photography Lane',
      addressLocality: 'Chennai',
      addressRegion: 'Tamil Nadu',
      postalCode: '600001',
      addressCountry: 'IN'
    }
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${baseUrl}/${service?.slug || 'service'}#service`,
    serviceType: service?.title || manual.serviceType || 'Photography',
    provider: { '@type': 'ProfessionalService', name: organization.name },
    description: service?.description || manual.serviceDescription || '',
    offers: {
      '@type': 'Offer',
      price: service?.basePrice?.replace(/[^0-9.]/g, '') || manual.price || '',
      priceCurrency: manual.priceCurrency || 'INR'
    }
  };

  if (location) {
    serviceSchema.areaServed = { '@type': 'City', name: location.name };
  }

  // Breadcrumb
  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: service?.title || 'Service', item: `${baseUrl}/${service?.slug || ''}` }
    ]
  };

  if (location) {
    breadcrumbList.itemListElement.push({
      '@type': 'ListItem',
      position: breadcrumbList.itemListElement.length + 1,
      name: location.name,
      item: `${baseUrl}/${service.slug}/${location.slug}`
    });
  }

  return [organization, serviceSchema, breadcrumbList];
}

// Headings generator (can be used for manual pages too)
export function generateHeadings(resolution) {
  const { type, service, location, locality, niche } = resolution || {};
  let h1 = service?.title || 'Service';
  let h2 = service?.description || '';

  switch (type) {
    case PAGE_TYPES.PILLAR:
      h1 = `${service.title}`;
      h2 = `Premium ${service.title.toLowerCase()} packages — view portfolio & pricing`;
      break;
    case PAGE_TYPES.LOCATION:
      h1 = `${service.title} in ${location.name}`;
      h2 = `Trusted ${service.title.toLowerCase()} across ${location.name}`;
      break;
    case PAGE_TYPES.LOCALITY:
      h1 = `${service.title} in ${locality.name}, ${location.name}`;
      h2 = `Local ${service.title.toLowerCase()} experts near ${locality.name}`;
      break;
    case PAGE_TYPES.NICHE:
      h1 = `${niche.title} Photography`;
      h2 = niche.description;
      break;
    case PAGE_TYPES.NICHE_LOCATION:
      h1 = `${niche.title} in ${location.name}`;
      h2 = `Specialized ${niche.title.toLowerCase()} in ${location.name}`;
      break;
    default:
      h1 = service?.title || 'Service';
      h2 = service?.description || '';
  }

  return { h1, h2 };
}

// FAQ schema generator
export function generateFAQSchema(service, location = null, customFaqs = []) {
  const baseFaqs = [
    {
      question: `How much does ${service.title.toLowerCase()} cost?`,
      answer: `Our ${service.title.toLowerCase()} packages start from ${service.basePrice}. Final pricing depends on your specific requirements.`
    },
    {
      question: `What is included in your ${service.title.toLowerCase()} package?`,
      answer: `Our packages include: ${service.features?.join(', ')}. We customize each package to meet your needs.`
    }
  ];

  if (location) {
    baseFaqs.push({
      question: `Do you provide ${service.title.toLowerCase()} in ${location.name}?`,
      answer: `Yes, we provide ${service.title.toLowerCase()} services in ${location.name} and surrounding areas.`
    });
  }

  const faqs = [...baseFaqs, ...customFaqs];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer }
    }))
  };
}