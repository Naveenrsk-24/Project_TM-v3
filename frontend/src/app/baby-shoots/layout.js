// app/baby-shoots/layout.js
// Production-ready & fully consistent with Wedding + Maternity layouts

export const metadata = {
  title: "Baby Photoshoot | Newborn, Infant & Toddler Photography",
  description:
    "Beautiful baby photoshoots with curated props, indoor studio setups, themed concepts and newborn-safe posing. Book Chennai’s most trusted baby photography team.",

  alternates: {
    canonical: "/baby-shoots",
  },

  openGraph: {
    title: "Baby Photoshoot | Newborn, Infant & Toddler Photography",
    description:
      "Professional newborn, infant & toddler photography with themed setups & safe posing. View portfolio & packages.",
    url: "/baby-shoots",
    images: [
      {
        url: "/og/baby-og.jpg",
        width: 1200,
        height: 630,
        alt: "Baby Photography by TM Studios",
      },
    ],
    type: "website",
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: "Baby Photoshoot — TM Studios",
    description:
      "Premium baby photoshoots with curated props & safe newborn handling. View portfolio & pricing.",
    images: ["/og/baby-og.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function BabyShootsLayout({ children }) {
  return (
    <section className="min-h-screen bg-white text-gray-900">
      {children}
    </section>
  );
}
