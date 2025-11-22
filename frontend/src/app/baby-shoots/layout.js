// app/baby-shoots/layout.js

export async function generateMetadata() {
  const manualMeta = {
    title:
      "Baby Photoshoot | Newborn, Infant & Toddler Photography",
    description:
      "Beautiful baby photoshoots with curated props, indoor studio setups, themed concepts and newborn-safe posing. Book Chennai’s most trusted baby photography team.",
    openGraph: {
      title: "Baby Photoshoot — TM Studios",
      description:
        "Professional newborn, infant & toddler photography with themed setups & safe posing. View portfolio & packages.",
      images: [
        {
          url: "/og/baby-og.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Baby Photoshoot — TM Studios",
      description:
        "Premium baby photoshoots with curated props & safe newborn handling. View portfolio & pricing.",
    },
  };

  return manualMeta;
}

export default function BabyShootsLayout({ children }) {
  return <section>{children}</section>;
}
