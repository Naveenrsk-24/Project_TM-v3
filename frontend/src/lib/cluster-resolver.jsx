// lib/cluster-resolver.js
// Resolves URL patterns and determines page type

import { SERVICES, LOCATIONS } from './services-data';

export const PAGE_TYPES = {
  PILLAR: 'pillar',           // /weddings
  LOCATION: 'location',        // /weddings/chennai
  LOCALITY: 'locality',        // /weddings/chennai/ecr
  NICHE: 'niche',             // /weddings/muslim
  NICHE_LOCATION: 'niche_location', // /weddings/destination/goa
  NOT_FOUND: 'not_found'
};

/**
 * Resolves the cluster slug array and returns page metadata
 * @param {string} serviceSlug - The service (e.g., 'weddings')
 * @param {string[]} clusterSlug - The catch-all slug array (e.g., ['chennai'] or ['muslim', 'goa'])
 * @returns {Object} Page resolution data
 */
export function resolveClusterPage(serviceSlug, clusterSlug = []) {
  const service = SERVICES[serviceSlug];
  
  if (!service) {
    return {
      type: PAGE_TYPES.NOT_FOUND,
      service: null,
      error: 'Service not found'
    };
  }

  // No cluster slug = Pillar page
  if (!clusterSlug || clusterSlug.length === 0) {
    return {
      type: PAGE_TYPES.PILLAR,
      service,
      location: null,
      locality: null,
      niche: null
    };
  }

  // Single segment: could be location or niche
  if (clusterSlug.length === 1) {
    const segment = clusterSlug[0];
    
    // Check if it's a location
    const location = LOCATIONS[segment];
    if (location) {
      return {
        type: PAGE_TYPES.LOCATION,
        service,
        location,
        locality: null,
        niche: null
      };
    }

    // Check if it's a niche
    const niche = service.niches.find(n => n.slug === segment);
    if (niche) {
      return {
        type: PAGE_TYPES.NICHE,
        service,
        location: null,
        locality: null,
        niche
      };
    }

    return {
      type: PAGE_TYPES.NOT_FOUND,
      service,
      error: `Invalid segment: ${segment}`
    };
  }

  // Two segments: could be location+locality OR niche+location
  if (clusterSlug.length === 2) {
    const [first, second] = clusterSlug;

    // Pattern 1: city + locality (e.g., chennai/ecr)
    const location = LOCATIONS[first];
    if (location && location.localities) {
      const locality = location.localities.find(l => l.slug === second);
      if (locality) {
        return {
          type: PAGE_TYPES.LOCALITY,
          service,
          location,
          locality,
          niche: null
        };
      }
    }

    // Pattern 2: niche + location (e.g., destination/goa)
    const niche = service.niches.find(n => n.slug === first);
    const nicheLocation = LOCATIONS[second];
    if (niche && nicheLocation) {
      return {
        type: PAGE_TYPES.NICHE_LOCATION,
        service,
        location: nicheLocation,
        locality: null,
        niche
      };
    }

    return {
      type: PAGE_TYPES.NOT_FOUND,
      service,
      error: `Invalid combination: ${first}/${second}`
    };
  }

  // Three or more segments: not supported
  return {
    type: PAGE_TYPES.NOT_FOUND,
    service,
    error: 'Too many URL segments'
  };
}

/**
 * Generates the canonical URL for a cluster page
 */
export function generateCanonicalUrl(serviceSlug, clusterSlug = []) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
  const segments = [serviceSlug, ...clusterSlug].filter(Boolean);
  return `${baseUrl}/${segments.join('/')}`;
}

/**
 * Generates breadcrumb data for navigation
 */
export function generateBreadcrumbs(resolution) {
  const breadcrumbs = [
    { label: 'Home', href: '/' }
  ];

  if (!resolution.service) return breadcrumbs;

  // Add service
  breadcrumbs.push({
    label: resolution.service.title,
    href: `/${resolution.service.slug}`
  });

  // Add location/niche based on type
  if (resolution.type === PAGE_TYPES.LOCATION && resolution.location) {
    breadcrumbs.push({
      label: resolution.location.name,
      href: `/${resolution.service.slug}/${resolution.location.slug}`
    });
  }

  if (resolution.type === PAGE_TYPES.LOCALITY && resolution.location && resolution.locality) {
    breadcrumbs.push({
      label: resolution.location.name,
      href: `/${resolution.service.slug}/${resolution.location.slug}`
    });
    breadcrumbs.push({
      label: resolution.locality.name,
      href: `/${resolution.service.slug}/${resolution.location.slug}/${resolution.locality.slug}`
    });
  }

  if (resolution.type === PAGE_TYPES.NICHE && resolution.niche) {
    breadcrumbs.push({
      label: resolution.niche.title,
      href: `/${resolution.service.slug}/${resolution.niche.slug}`
    });
  }

  if (resolution.type === PAGE_TYPES.NICHE_LOCATION && resolution.niche && resolution.location) {
    breadcrumbs.push({
      label: resolution.niche.title,
      href: `/${resolution.service.slug}/${resolution.niche.slug}`
    });
    breadcrumbs.push({
      label: resolution.location.name,
      href: `/${resolution.service.slug}/${resolution.niche.slug}/${resolution.location.slug}`
    });
  }

  return breadcrumbs;
}

/**
 * Helper to get all possible URLs for a service (for sitemap generation)
 */
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