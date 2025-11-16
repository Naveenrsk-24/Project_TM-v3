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
      shootLocation: "Anna Nagar, Chennai",
      serviceSlug: "weddings",
      locationSlug: "chennai",
      localitySlug: "anna-nagar",
      nicheSlug: "hindu",
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
      nicheSlug: "christian",
      coverImage: "/Weddings/groom-putting-ring-bride-s-finger.webp",
      albumUrl: "/weddings/chennai/luxury/aarav-meera-itc",
    },
  ],

  // ----------------------------------------------------------
  // BABY SHOOTS
  // ----------------------------------------------------------
  "baby-shoots": [
    {
      id: "little-arya-studio",
      coupleName: "Baby Arya",
      shootLocation: "TM Studios, Chennai",
      serviceSlug: "baby-shoots",
      locationSlug: "chennai",
      localitySlug: "adyar",
      nicheSlug: "newborn",
      coverImage: "/Weddings/beautiful-husband-wife-posing-beach.webp",
      albumUrl: "/portfolio/tamil-weddings/akash-akshaya-wedding",
    },
    {
      id: "twins-veer-vir",
      coupleName: "Baby Veer & Baby Vir",
      shootLocation: "Client Home, Velachery",
      serviceSlug: "baby-shoots",
      locationSlug: "chennai",
      localitySlug: "velachery",
      nicheSlug: "twins",
     coverImage: "/Weddings/beautiful-husband-wife-posing-beach.webp",
      albumUrl: "/portfolio/tamil-weddings/akash-akshaya-wedding",
    },
    {
      id: "baby-rithika-outdoor",
      coupleName: "Baby Rithika",
      shootLocation: "Nageswara Rao Park, Mylapore",
      serviceSlug: "baby-shoots",
      locationSlug: "chennai",
      localitySlug: "mylapore",
      nicheSlug: "outdoor",
     coverImage: "/Weddings/beautiful-husband-wife-posing-beach.webp",
      albumUrl: "/portfolio/tamil-weddings/akash-akshaya-wedding",
    },
  ],

  // ----------------------------------------------------------
  // MATERNITY SHOOTS
  // ----------------------------------------------------------
  "maternity-shoots": [
    {
      id: "krishna-sudha-beach",
      coupleName: "Krishna & Sudha",
      shootLocation: "ECR Beach, Chennai",
      serviceSlug: "maternity-shoots",
      locationSlug: "chennai",
      localitySlug: "ecr",
      nicheSlug: "beach",
      coverImage: "/Weddings/beautiful-husband-wife-posing-beach.webp",
      albumUrl: "/portfolio/tamil-weddings/akash-akshaya-wedding",
    },
    {
      id: "manoj-divya-studio",
      coupleName: "Manoj & Divya",
      shootLocation: "TM Studios, Chennai",
      serviceSlug: "maternity-shoots",
      locationSlug: "chennai",
      localitySlug: "tnagar",
      nicheSlug: "studio",
       coverImage: "/Weddings/beautiful-husband-wife-posing-beach.webp",
      albumUrl: "/portfolio/tamil-weddings/akash-akshaya-wedding",
    },
    {
      id: "arun-shalini-garden",
      coupleName: "Arun & Shalini",
      shootLocation: "Semmozhi Poonga, Chennai",
      serviceSlug: "maternity-shoots",
      locationSlug: "chennai",
      localitySlug: "cathedral-road",
      nicheSlug: "outdoor-garden",
       coverImage: "/Weddings/beautiful-husband-wife-posing-beach.webp",
      albumUrl: "/portfolio/tamil-weddings/akash-akshaya-wedding",
    },
  ],
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
