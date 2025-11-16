// app/sitemap.js
// Generates dynamic sitemap for all services and their clusters

import { SERVICES, LOCATIONS } from '@/lib/services-data';

export default function generateSitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tmstudios.vercel.app';
  
  const routes = [];

  // Homepage
  routes.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  });

  // Static pages
  const staticPages = ['about', 'portfolio', 'contact'];
  staticPages.forEach(page => {
    routes.push({
      url: `${baseUrl}/${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Generate URLs for all services
  Object.values(SERVICES).forEach(service => {
    // Pillar page (e.g., /weddings)
    routes.push({
      url: `${baseUrl}/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    // Location pages (e.g., /weddings/chennai)
    Object.values(LOCATIONS).forEach(location => {
      routes.push({
        url: `${baseUrl}/${service.slug}/${location.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });

      // Locality pages (e.g., /weddings/chennai/ecr)
      if (location.localities && location.localities.length > 0) {
        location.localities.forEach(locality => {
          routes.push({
            url: `${baseUrl}/${service.slug}/${location.slug}/${locality.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
          });
        });
      }
    });

    // Niche pages (e.g., /weddings/muslim)
    service.niches.forEach(niche => {
      routes.push({
        url: `${baseUrl}/${service.slug}/${niche.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });

      // Niche + Location combinations (e.g., /weddings/destination/goa)
      Object.values(LOCATIONS).forEach(location => {
        routes.push({
          url: `${baseUrl}/${service.slug}/${niche.slug}/${location.slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      });
    });
  });

  return routes;
}