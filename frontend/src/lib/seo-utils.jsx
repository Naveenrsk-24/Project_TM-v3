// seo-utils.jsx (Enterprise Version)
// Comprehensive SEO + Schema utilities for all services (weddings, baby-shoots, maternity, etc.)
// - Canonical helpers
// - Metadata merging
// - Dynamic metadata for cluster pages (Pillar, Location, Locality, Niche, Niche+Location)
// - Headings generator
// - FAQ generator
// - Combined JSON-LD generator (Organization, Service, Breadcrumb, FAQ, Reviews)

import { PAGE_TYPES } from './cluster-resolver';
import { SERVICES, LOCATIONS } from './services-data';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://tmstudios.photography').replace(/\/$/, '');

/* ------------------------ Helpers ------------------------ */
function canonical(path = '') {
  if (!path || path === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith('/') ? path : '/' + path}`;
}

function smartTruncate(text = '', max = 160) {
  if (!text) return '';
  if (text.length <= max) return text;
  const truncated = text.slice(0, max - 1);
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace === -1) return truncated + '…';
  return truncated.slice(0, lastSpace) + '…';
}

function normalizePrice(priceString = '') {
  if (!priceString) return '';
  const digits = priceString.replace(/[^0-9.]/g, '');
  return digits || '';
}

/* ------------------------ Metadata merging ------------------------ */
export function mergeMetadata(dynamicMeta = {}, manualMeta = {}) {
  return {
    ...dynamicMeta,
    ...manualMeta,
    openGraph: { ...(dynamicMeta.openGraph || {}), ...(manualMeta.openGraph || {}) },
    twitter: { ...(dynamicMeta.twitter || {}), ...(manualMeta.twitter || {}) }
  };
}

/* ------------------------ Dynamic metadata generator ------------------------ */
export function generateMetadataDynamic(resolution = {}) {
  const { type, service, location, locality, niche } = resolution || {};

  if (!service) {
    return {
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist.',
      alternates: { canonical: canonical('/') },
      openGraph: { url: canonical('/') }
    };
  }

  let title = service.title;
  let description = smartTruncate(service.description || '', 160);
  let path = `/${service.slug}`;

  switch (type) {
    case PAGE_TYPES.PILLAR:
      title = `${service.title} | ${service.basePrice ? `From ${service.basePrice}` : ''}`.trim();
      description = smartTruncate(`${service.description} Packages: ${service.features?.slice(0, 4).join(', ')}.`, 160);
      break;

    case PAGE_TYPES.LOCATION:
      title = `${service.title} in ${location.name} – ${service.basePrice || ''}`.trim();
      description = smartTruncate(`Looking for ${service.title.toLowerCase()} in ${location.name}? ${service.features?.slice(0, 4).join(', ')}.`, 160);
      path = `/${service.slug}/${location.slug}`;
      break;

    case PAGE_TYPES.LOCALITY:
      title = `${service.title} in ${locality.name}, ${location.name} – Local Photographers`;
      description = smartTruncate(`Top-rated ${service.title.toLowerCase()} in ${locality.name}, ${location.name}. ${locality.description || ''}`, 160);
      path = `/${service.slug}/${location.slug}/${locality.slug}`;
      break;

    case PAGE_TYPES.NICHE:
      title = `${niche.title} – ${service.title} Specialists`;
      description = smartTruncate(`${niche.description || ''} Premium ${service.title.toLowerCase()} packages available.`, 160);
      path = `/${service.slug}/${niche.slug}`;
      break;

    case PAGE_TYPES.NICHE_LOCATION:
      title = `${niche.title} in ${location.name} – ${service.title}`;
      description = smartTruncate(`Specialized ${niche.title.toLowerCase()} in ${location.name}. ${niche.description || ''}`, 160);
      path = `/${service.slug}/${niche.slug}/${location.slug}`;
      break;

    default:
      title = service.title;
      description = smartTruncate(service.description, 160);
  }

  const canonicalUrl = canonical(path);
  const ogImage = `/images/${service.slug}/og-image.jpg`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'TM Studios Photography',
      type: 'website',
      locale: 'en_IN',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage]
    },
    robots: { index: true, follow: true }
  };
}

/* ------------------------ Headings generator ------------------------ */
export function generateHeadings(resolution = {}) {
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

/* ------------------------ FAQ Schema generator ------------------------ */
export function generateFAQSchema(service, location = null, customFaqs = []) {
  const safePrice = service?.basePrice || "our standard rates";
  const safeFeatures = Array.isArray(service?.features) && service.features.length > 0
    ? service.features.join(', ')
    : "multiple package options";

  const baseFaqs = [
    {
      question: `How much does ${service?.title?.toLowerCase() || 'this service'} cost?`,
      answer: `Our ${service?.title?.toLowerCase() || 'photography'} packages start from ${safePrice}. Final pricing depends on your specific requirements.`
    },
    {
      question: `What is included in your ${service?.title?.toLowerCase() || 'photography'} package?`,
      answer: `Our packages include: ${safeFeatures}. We customize each package to meet your needs.`
    }
  ];

  if (location?.name) {
    baseFaqs.push({
      question: `Do you provide ${service?.title?.toLowerCase() || 'photography'} in ${location.name}?`,
      answer: `Yes, we provide ${service?.title?.toLowerCase() || 'photography'} services in ${location.name} and nearby areas.`
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


/* ------------------------ Structured Data (combined) ------------------------ */
// Signature: generateStructuredData(resolution, customFaqs = [], manual = {})
export function generateStructuredData(resolution = {}, customFaqs = [], manual = {}) {
  const { service, location, locality, niche } = resolution || {};

  // If no service provided, return a minimal organization object
  if (!service) {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: manual.name || 'TM Studios Photography',
        url: SITE_URL
      }
    ];
  }

  // 1) Organization
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    name: manual.name || 'TM Studios Photography',
    description: manual.description || 'Professional wedding, baby, and maternity photography in Chennai.',
    url: SITE_URL,
    logo: manual.logo || `${SITE_URL}/logo.png`,
    image: manual.image || `${SITE_URL}/og-image.jpg`,
    telephone: manual.telephone || '+91-9876543210',
    email: manual.email || 'hello@tmstudios.com',
    sameAs: manual.sameAs || [
      'https://www.instagram.com/yourprofile',
      'https://www.facebook.com/yourprofile',
      'https://www.youtube.com/yourchannel',
      'https://www.linkedin.com/company/yourcompany'
    ],
    address: manual.address || {
      '@type': 'PostalAddress',
      streetAddress: '123 Photography Lane',
      addressLocality: 'Chennai',
      addressRegion: 'Tamil Nadu',
      postalCode: '600001',
      addressCountry: 'IN'
    },
    geo: manual.geo || { '@type': 'GeoCoordinates', latitude: '13.0827', longitude: '80.2707' }
  };

  // 2) Service schema
  const priceValue = normalizePrice(service.basePrice || '');
  const serviceUrl = `${SITE_URL}/${service.slug}`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${serviceUrl}#service`,
    name: service.title,
    serviceType: service.title,
    category: 'Photography Services',
    provider: { '@type': 'ProfessionalService', name: organization.name, url: SITE_URL },
    description: service.description,
    image: [
      `${SITE_URL}${service.bgImage || ''}`,
      `${SITE_URL}/images/${service.slug}/sample1.jpg`,
      `${SITE_URL}/images/${service.slug}/sample2.jpg`
    ].filter(Boolean),
    offers: {
      '@type': 'Offer',
      price: priceValue,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: serviceUrl
    }
  };

  if (location) {
    serviceSchema.areaServed = { '@type': 'City', name: location.name };
  }

  // 3) BreadcrumbList (cluster-aware)
  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: []
  };

  const items = [];
  items.push({ name: 'Home', item: SITE_URL });
  items.push({ name: service.title, item: serviceUrl });

  // for niche pages, niche should come before location (if both present)
  if (niche) {
    items.push({ name: niche.title, item: `${serviceUrl}/${niche.slug}` });
  }

  if (location) {
    items.push({ name: location.name, item: `${serviceUrl}/${location.slug}` });
  }

  if (locality) {
    items.push({ name: locality.name, item: `${serviceUrl}/${location.slug}/${locality.slug}` });
  }

  breadcrumbList.itemListElement = items.map((it, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: it.name,
    item: it.item
  }));

  // 4) FAQ schema (optional)
  const faqSchema = (customFaqs && customFaqs.length)
    ? generateFAQSchema(service, location, customFaqs)
    : null;

  // 5) Optional reviews (manual can pass an array or a single review object)
  const reviewSchema = manual.reviews || null;

  // Assemble combined array (organization always first)
  const combined = [organization, serviceSchema, breadcrumbList];
  if (faqSchema) combined.push(faqSchema);
  if (reviewSchema) combined.push(reviewSchema);

  return combined;
}

/* ------------------------ Utility: generateAllServiceUrls ------------------------ */
export function generateAllServiceUrls(serviceSlug) {
  const service = SERVICES[serviceSlug];
  if (!service) return [];

  const urls = [];

  // Pillar page
  urls.push(`/${serviceSlug}`);

  // All locations
  Object.values(LOCATIONS).forEach(location => {
    urls.push(`/${serviceSlug}/${location.slug}`);

    // All localities for this location
    if (location.localities) {
      location.localities.forEach(locality => {
        urls.push(`/${serviceSlug}/${location.slug}/${locality.slug}`);
      });
    }
  });

  // All niches
  service.niches.forEach(niche => {
    urls.push(`/${serviceSlug}/${niche.slug}`);

    // Niche + Location combinations
    Object.values(LOCATIONS).forEach(location => {
      urls.push(`/${serviceSlug}/${niche.slug}/${location.slug}`);
    });
  });

  return urls;
}

/* ------------------------ Exports ------------------------ */
export default {
  canonical,
  mergeMetadata,
  generateMetadataDynamic,
  generateHeadings,
  generateFAQSchema,
  generateStructuredData,
  generateAllServiceUrls
};
