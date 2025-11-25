// app/robots.js
// Generates robots.txt for search engine crawling

export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tmstudios.photography';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}