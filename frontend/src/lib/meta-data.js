export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://tmstudios.photography").replace(/\/$/, "");

export function canonical(path = "") {
  // Homepage canonical — must end with slash
  if (!path || path === "/") return `${SITE_URL}/`;

  // Inner pages canonical
  return `${SITE_URL}${path.startsWith("/") ? path : "/" + path}`;
}

export function pageMeta({ title, description, path, image = "/og-image.jpg" }) {
  return {
    title,
    description,
    alternates: { canonical: canonical(path) },
    openGraph: {
      title,
      description,
      url: canonical(path),
      images: [image],
    },
    twitter: {
      title,
      description,
      images: [image],
    },
    robots: { index: true, follow: true },
  };
}
