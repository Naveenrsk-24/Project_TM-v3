export const ALBUMS = {
  weddings: [
    {
      id: "rahul-sneha-ecr",
      coupleName: "Rahul & Sneha",
      shootLocation: "ECR Beach, Chennai",
      serviceSlug: "weddings",
      locationSlug: "chennai",
      localitySlug: "ecr",
      nicheSlug: "beach",
      coverImage: "/Weddings/beautiful-husband-wife-posing-beach.webp",
      albumUrl: "/portfolio/tamil-weddings/akash-akshaya-wedding",
    },
    {
      id: "akash-akshaya",
      coupleName: "Akash & Akshaya",
      shootLocation: "ECR Beach, Chennai",
      serviceSlug: "weddings",
      locationSlug: "chennai",
      localitySlug: "anna-nagar",
      nicheSlug: "beach",
      coverImage: "/Weddings/beautiful-husband-wife-posing-beach.webp",
      albumUrl: "/portfolio/tamil-weddings/akash-akshaya-wedding",
    },
    {
      id: "aarav-meera-itc",
      coupleName: "Aarav & Meera",
      shootLocation: "ITC Grand Chola, Guindy",
      serviceSlug: "weddings",
      locationSlug: "coimbatore",
      localitySlug: "guindy",
      nicheSlug: "luxury",
      coverImage: "/Weddings/groom-putting-ring-bride-s-finger.webp",
      albumUrl: "/weddings/chennai/luxury/aarav-meera-itc",
    },
  ],

// Add more services ...........................
  "baby-shoots": [],
  "maternity-shoots": [],
  "pre-wedding": [],
};

// Helper functions
export function getAlbumsByService(serviceSlug) {
  return ALBUMS[serviceSlug] || [];
}

export function getAlbumById(serviceSlug, albumId) {
  return (
    ALBUMS[serviceSlug]?.find((album) => album.id === albumId) || null
  );
}
