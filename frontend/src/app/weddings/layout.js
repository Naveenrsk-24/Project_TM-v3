// app/weddings/layout.js

export async function generateMetadata() {
  return {
    title: "Wedding Photography | Cinematic & Candid Wedding Photographers",
    description:
      "Award-winning cinematic wedding photography. Full-day coverage, custom albums, and online gallery. Book a consultation today.",

    alternates: {
      canonical: "/weddings",
    },

    openGraph: {
      title: "Wedding Photography — TM Studios",
      description:
        "Award-winning cinematic wedding photography. See portfolio & pricing.",
      url: "/weddings",
      images: [
        {
          url: "/og/weddings-og.jpg",
          width: 1200,
          height: 630,
          alt: "Wedding Photography by TM Studios",
        },
      ],
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "Wedding Photography — TM Studios",
      description:
        "Award-winning cinematic wedding photography. See portfolio & pricing.",
      images: ["/og/weddings-og.jpg"],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function WeddingsLayout({ children }) {
  return (
    <section className="min-h-screen bg-white text-gray-900">
      {children}
    </section>
  );
}
