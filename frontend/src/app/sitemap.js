// app/sitemap.js
// Sitemap aligned EXACTLY with existing routes

export default function sitemap() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://tmstudios.photography';

  const now = new Date();

  return [
    // Homepage
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },

    // Static pages
    {
      url: `${baseUrl}/aboutus`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contactus`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // Service pillar pages
    {
      url: `${baseUrl}/weddings`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/baby-shoots`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/maternity-shoots`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];
}
