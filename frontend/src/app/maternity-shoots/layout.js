// app/maternity-shoots/layout.js

export async function generateMetadata() {
  const manualMeta = {
    title:
      "Maternity Photoshoot | Elegant Outdoor & Studio Pregnancy Photography - TM Studios",
    description:
      "Elegant maternity photoshoots with premium gowns, indoor studio lighting, outdoor concepts, and artistic poses. Book Chennai’s most trusted maternity photography team.",
    openGraph: {
      title: "Maternity Photoshoot — TM Studios",
      description:
        "Elegant outdoor & studio maternity photography with premium gowns and creative concepts. View portfolio & packages.",
      images: [
        {
          url: "/og/maternity-og.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Maternity Photoshoot — TM Studios",
      description:
        "Premium maternity photoshoots with elegant styling & artistic poses. View portfolio & pricing.",
    },
  };

  return manualMeta;
}

export default function MaternityLayout({ children }) {
  return <section>{children}</section>;
}
