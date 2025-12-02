// app/weddings/layout.js
// Clean layout — NO schema, NO organization data here.
// All JSON-LD is injected only inside page.js (correct SEO practice).

export const metadata = {
  title: "Wedding Photography Services | Candid & Cinematic Weddings",
  description:
    "Award-winning cinematic wedding photography. Full-day coverage, custom albums, and online gallery. Book a consultation today.",

  alternates: {
    canonical: "/weddings",
  },

  openGraph: {
    title: "Wedding Photography Services | Candid & Cinematic Weddings",
    description:
      "Award-winning cinematic wedding photography. See portfolio & pricing.",
    url: "/weddings",
    images: [
      {
        url: "/og-image.jpg",
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
    title: "Wedding Photography Services | Candid & Cinematic Weddings",
    description:
      "Award-winning cinematic wedding photography. See portfolio & pricing.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function WeddingsLayout({ children }) {
  return (
    <section className="min-h-screen bg-white text-gray-900">
      {children}
    </section>
  );
}
