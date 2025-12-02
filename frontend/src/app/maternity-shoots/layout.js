// app/maternity-shoots/layout.js
// Fully matched with /weddings/layout.js (production level, consistent SEO)

export const metadata = {
  title: "Maternity Photoshoot | Elegant Outdoor & Studio Pregnancy Photography",
  description:
    "Elegant maternity photoshoots with premium gowns, indoor studio lighting, outdoor concepts, and artistic poses. Book Chennai’s most trusted maternity photography team.",

  alternates: {
    canonical: "/maternity-shoots",
  },

  openGraph: {
    title: "Maternity Photoshoot | Elegant Outdoor & Studio Photography",
    description:
      "Elegant outdoor & studio maternity photography with premium gowns and creative concepts. View portfolio & packages.",
    url: "/maternity-shoots",
    images: [
      {
        url: "/og/maternity-og.jpg",
        width: 1200,
        height: 630,
        alt: "Maternity Photography by TM Studios",
      },
    ],
    type: "website",
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: "Maternity Photoshoot — TM Studios",
    description:
      "Premium maternity photoshoots with elegant styling & artistic poses. View portfolio & pricing.",
    images: ["/og/maternity-og.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function MaternityLayout({ children }) {
  return (
    <section className="min-h-screen bg-white text-gray-900">
      {children}
    </section>
  );
}
