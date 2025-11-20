export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://tmstudios.photography"
).replace(/\/$/, "");

// Canonical generator
export function canonical(path = "") {
  // Always ensure trailing slash on homepage
  if (!path || path === "/") return `${SITE_URL}/`;

  // Internal pages
  return `${SITE_URL}${path.startsWith("/") ? path : "/" + path}`;
}

// Main metadata generator
export function pageMeta({ title, description, path, image = "/og-image.jpg" }) {
  const canonicalUrl = canonical(path);

  return {
    title,
    description,

    // Canonical URL output
    alternates: {
      canonical: canonicalUrl,
    },

    // OpenGraph for social previews
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "TM Studios Photography",
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },

    // Robots tags
    robots: {
      index: true,
      follow: true,
    },
  };
}
