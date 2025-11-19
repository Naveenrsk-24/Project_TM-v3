// app/weddings/layout.js

export async function generateMetadata() {
  const manualMeta = {
    title:
      "Wedding Photography | Cinematic & Candid Wedding Photographers - TM Studios",
    description:
      "Award-winning cinematic wedding photography. Full-day coverage, custom albums, and online gallery. Book a consultation today.",
    openGraph: {
      title: "Wedding Photography — TM Studios",
      description:
        "Award-winning cinematic wedding photography. See portfolio & pricing.",
      images: [{ url: "/og/weddings-og.jpg", 
        width: 1200, 
        height: 630 }],
    },
    twitter: { card: "summary_large_image" },
  };

  return manualMeta;
}

export default function WeddingsLayout({ children }) {
  return (
    <section className="min-h-screen bg-white text-gray-900">
      {children}
    </section>
  );
}
