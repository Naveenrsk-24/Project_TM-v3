// lib/sitemap-helper.js
// Helper to generate and preview all URLs

import { SERVICES, LOCATIONS } from './services-data';

/**
 * Generates all possible URLs for a specific service
 */
export function generateServiceUrls(serviceSlug) {
  const service = SERVICES[serviceSlug];
  if (!service) return [];

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tmstudios.vercel.app';
  const urls = [];

  // Pillar page
  urls.push(`${baseUrl}/${serviceSlug}`);

  // Location pages
  Object.values(LOCATIONS).forEach(location => {
    urls.push(`${baseUrl}/${serviceSlug}/${location.slug}`);

    // Locality pages
    if (location.localities) {
      location.localities.forEach(locality => {
        urls.push(`${baseUrl}/${serviceSlug}/${location.slug}/${locality.slug}`);
      });
    }
  });

  // Niche pages
  service.niches.forEach(niche => {
    urls.push(`${baseUrl}/${serviceSlug}/${niche.slug}`);

    // Niche + Location combinations
    Object.values(LOCATIONS).forEach(location => {
      urls.push(`${baseUrl}/${serviceSlug}/${niche.slug}/${location.slug}`);
    });
  });

  return urls;
}

/**
 * Generates all URLs for all services
 */
export function generateAllUrls() {
  const allUrls = [];
  
  Object.keys(SERVICES).forEach(serviceSlug => {
    const serviceUrls = generateServiceUrls(serviceSlug);
    allUrls.push(...serviceUrls);
  });

  return allUrls;
}

/**
 * Get count of total URLs
 */
export function getUrlCount() {
  const counts = {
    services: Object.keys(SERVICES).length,
    locations: Object.keys(LOCATIONS).length,
    total: 0
  };

  Object.values(SERVICES).forEach(service => {
    // Pillar: 1
    counts.total += 1;
    
    // Locations: count
    counts.total += Object.keys(LOCATIONS).length;
    
    // Localities: count for each location
    Object.values(LOCATIONS).forEach(location => {
      if (location.localities) {
        counts.total += location.localities.length;
      }
    });
    
    // Niches: count
    counts.total += service.niches.length;
    
    // Niche + Location combinations
    counts.total += service.niches.length * Object.keys(LOCATIONS).length;
  });

  return counts;
}

/**
 * Preview URLs for a service (useful for debugging)
 */
export function previewServiceUrls(serviceSlug) {
  const urls = generateServiceUrls(serviceSlug);
  
  console.log(`\n🎯 URLs for ${serviceSlug}:`);
  console.log(`Total: ${urls.length} URLs\n`);
  
  urls.forEach((url, i) => {
    console.log(`${i + 1}. ${url}`);
  });
  
  return urls;
}

