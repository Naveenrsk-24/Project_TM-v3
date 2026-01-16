export const ALBUMS = {
  weddings: [
    // {
    //   id: "sai-narasimhan-putri-kusumavardhini",
    //   coupleName: "Sai Narasimhan & Putri",
    //   shootLocation: "TM Studios, Chennai",
    //   serviceSlug: "weddings",
    //   locationSlug: "chennai",
    //   localitySlug: "ecr",
    //   nicheSlug: "Weddings",

    //   coverImage:
    //     "/Weddings/Sai-narasimhan-putr-kusumavardhini/Sai-narasimhan-Putri-kusumavardhini.avif",

    //   images: [
    //     "/Weddings/Sai-narasimhan-putr-kusumavardhini/1.avif",
    //     "/Weddings/Sai-narasimhan-putr-kusumavardhini/2.avif",
    //     "/Weddings/Sai-narasimhan-putr-kusumavardhini/3.webp",
    //     "/Weddings/Sai-narasimhan-putr-kusumavardhini/4.webp",
    //   ],

    //   albumUrl: "/portfolio/tamil-weddings/sai-narasimhan-putri-kusumavardhini",
    // },

    // {
    //   id: "Manoj-Charu",
    //   coupleName: "Manoj & Charu",
    //   shootLocation: "Anna Nagar, Chennai",
    //   serviceSlug: "weddings",
    //   locationSlug: "chennai",
    //   localitySlug: "anna-nagar",
    //   nicheSlug: "Reception",

    //   coverImage: "/Weddings/Manoj&Charu/Manoj&Charu-101.avif",

    //   images: [
    //     "/Weddings/Manoj&Charu/1.avif",
    //     "/Weddings/Manoj&Charu/2.avif",
    //     "/Weddings/Manoj&Charu/3.avif",
    //   ],

    //   albumUrl: "/portfolio/tamil-weddings/manoj-charu",
    // },

    {
      id: "arul-vijayalakshmi-w",
      coupleName: "Arulraj & Vijayalakshmi",
      // shootLocation: "ITC Grand Chola, Guindy",
      serviceSlug: "weddings",
      locationSlug: "chennai",
      localitySlug: "guindy",
      nicheSlug: "wedding",

      coverImage: "/Weddings/Wedding-Thumbnails/Arulraj-Vijayalakshmi-W.avif",

      images: Array.from(
        { length: 20 },
        (_, i) =>
          `/Weddings/Arul-Vijayalakshmi/Arulraj-Vijayalakshmi-W-${i + 1}.avif`
      ),

      albumUrl: "/portfolio/tamil-weddings/aarav-meera-itc",
    },

    {
      id: "jalaludeen-shain-w",
      coupleName: "Jalaludeen & Shain Fathima",
      // shootLocation: "ITC Grand Chola, Guindy",
      serviceSlug: "weddings",
      locationSlug: "coimbatore",
      localitySlug: "guindy",
      nicheSlug: "wedding",
      coverImage: "/Weddings/Wedding-Thumbnails/Jalal-ShainFathima-R.avif",

      images: Array.from(
        { length: 50 },
        (_, i) =>
          `/Weddings/Jalaludeen-Shain/Jalal-ShainFathima-R-${i + 1}.avif`
      ),
    },

    {
      id: "rajasekar-nithyashree-w",
      coupleName: "Rajasekar & Nithyashree",
      // shootLocation: "ITC Grand Chola, Guindy",
      serviceSlug: "weddings",
      locationSlug: "coimbatore",
      localitySlug: "guindy",
      nicheSlug: "wedding",

      coverImage: "/Weddings/Wedding-Thumbnails/Rajasekar-Nithyashree-W.avif",

      images: Array.from(
        { length: 40 },
        (_, i) =>
          `/Weddings/Rajasekar-Nithya/Rajasekar-Nithyashree-W-${i + 1}.avif`
      ),
    },

    {
      id: "pariventhan-revathy-w",
      coupleName: "Pariventhan & Revathy",
      // shootLocation: "ITC Grand Chola, Guindy",
      serviceSlug: "weddings",
      locationSlug: "coimbatore",
      localitySlug: "guindy",
      nicheSlug: "wedding",

      coverImage: "/Weddings/Wedding-Thumbnails/Pariventhan-Revathy-WR.avif",

      images: Array.from(
        { length: 14 },
        (_, i) =>
          `/Weddings/Pariventhan-Revathy/Pariventhan-Revathy-WR-${i + 1}.avif`
      ),
    },
    {
      id: "arul-vijayalakshmi-r",
      coupleName: "Arulraj & Vijayalakshmi",
      // shootLocation: "ITC Grand Chola, Guindy",
      serviceSlug: "weddings",
      locationSlug: "chennai",
      localitySlug: "guindy",
      nicheSlug: "reception",

      coverImage: "/Weddings/Reception-Thumbnails/Arulraj-Vijayalakshmi-R.avif",

      images: Array.from(
        { length: 26 },
        (_, i) =>
          `/Weddings/Arul-Vijayalakshmi/Arulraj-Vijayalakshmi-R-${i + 1}.avif`
      ),
    },
    {
      id: "rajasekar-nithyashree-r",
      coupleName: "Rajasekar & Nithyashree",
      // shootLocation: "ITC Grand Chola, Guindy",
      serviceSlug: "weddings",
      locationSlug: "coimbatore",
      localitySlug: "guindy",
      nicheSlug: "reception",

      coverImage: "/Weddings/Reception-Thumbnails/Rajasekar-Nithyashree-R.avif",

      images: Array.from(
        { length: 30 },
        (_, i) =>
          `/Weddings/Rajasekar-Nithya/Rajasekar-Nithyashree-R-${i + 1}.avif`
      ),
    },
    {
      id: "manikandan-maheshwari-pw",
      coupleName: "Manikandan & Maheshwari",
      // shootLocation: "ITC Grand Chola, Guindy",
      serviceSlug: "weddings",
      locationSlug: "chennai",
      localitySlug: "guindy",
      nicheSlug: "pre wedding",

      coverImage:
        "/Weddings/Prewedding-Thumbnails/Manikandan-Maheshwari-PW.avif",

      images: Array.from(
        { length: 8 },
        (_, i) =>
          `/Weddings/Manikandan-Maheshwari/Manikandan-Maheshwari-PW-${
            i + 1
          }.avif`
      ),
    },
    {
      id: "arul-vijayalakshmi-pw",
      coupleName: "Arulraj & Vijayalakshmi",
      // shootLocation: "ITC Grand Chola, Guindy",
      serviceSlug: "weddings",
      locationSlug: "chennai",
      localitySlug: "guindy",
      nicheSlug: "pre wedding",

      coverImage:
        "/Weddings/Prewedding-Thumbnails/Arulraj-Vijayalakshmi-PW.avif",

      images: Array.from(
        { length: 15 },
        (_, i) =>
          `/Weddings/Arul-Vijayalakshmi/Arulraj-Vijayalakshmi-PW-${i + 1}.avif`
      ),
    },
  ],

  // BABY SHOOTS ---------------------------------------------------------
  "baby-shoots": [
    {
      id: "Mireya-Irene",
      coupleName: "Mireya Irene",
      shootLocation: "TM Studios, Chennai",

      coverImage: "/BabyShoots/Babyshoot-Thumbnails/Mireya-Irene-IBS.avif",

      images: Array.from(
        { length: 40 },
        (_, i) => `/BabyShoots/Mireya-Irene-Ibs/Mireya-Irene-IBS-${i + 1}.avif`
      ),

      serviceSlug: "baby-shoots",
      locationSlug: "chennai",
      localitySlug: "adyar",
      nicheSlug: "Toddler",
    },

    {
      id: "sreyashi",
      coupleName: "Sreyashi",
      shootLocation: "TM Studios, Chennai",
      coverImage: "/BabyShoots/Babyshoot-Thumbnails/Sreyashi-IBS.avif",

      images: Array.from(
        { length: 10 },
        (_, i) => `/BabyShoots/Sreyashi-Ibs/Sreyashi-IBS-${i + 1}.avif`
      ),
      serviceSlug: "baby-shoots",
      locationSlug: "chennai",
      localitySlug: "velachery",
      nicheSlug: "Toddler",
    },

    {
      id: "yaahini",
      coupleName: "Yaahini",
      shootLocation: "TM Studios, Chennai",
      coverImage: "/BabyShoots/Babyshoot-Thumbnails/Yaahini-IBS.avif",

      images: Array.from(
        { length: 15 },
        (_, i) => `/BabyShoots/Yaahini-Ibs/Yaahini-IBS-${i + 1}.avif`
      ),
      serviceSlug: "baby-shoots",
      locationSlug: "chennai",
      localitySlug: "mylapore",
      nicheSlug: "Toddler",
    },
  ],

  // MATERNITY SHOOTS ---------------------------------------------------
  "maternity-shoots": [
    {
      id: "charu-meena",
      coupleName: "Charu Meena",
      shootLocation: "TM Studios, Chennai",

      coverImage: "/Maternity/Maternity-Thumbnails/Charu-Meena-S.avif",

      images: Array.from(
        { length: 42 },
        (_, i) => `/Maternity/Charu-Meena/Charu-Meena-S-${i + 1}.avif`
      ),

      serviceSlug: "maternity-shoots",
      locationSlug: "chennai",
      localitySlug: "ecr",
      nicheSlug: "seemandham",
    },

    {
      id: "meenakshi-aswinkumar",
      coupleName: "Meenakshi Aswinkumar",
      shootLocation: "TM Studios, Chennai",

      coverImage: "/Maternity/Maternity-Thumbnails/Meenakshi-Aswinkumar-S.avif",

      images: Array.from(
        { length: 30 },
        (_, i) => `/Maternity/Meenakshi-Aswinkumar/Meenakshi-Aswinkumar-S-${i + 1}.avif`
      ),


      serviceSlug: "maternity-shoots",
      locationSlug: "chennai",
      localitySlug: "tnagar",
      nicheSlug: "seemandham",
    },

    {
      id: "hemalatha",
      coupleName: "Hemalatha",
      shootLocation: "TM Studios, Chennai",
     coverImage: "/Maternity/Maternity-Thumbnails/Hemalatha-S.avif",

      images: Array.from(
        { length: 8 },
        (_, i) => `/Maternity/Hemalatha/Hemalatha-S-${i + 1}.avif`
      ),

      serviceSlug: "maternity-shoots",
      locationSlug: "chennai",
      localitySlug: "cathedral-road",
      nicheSlug: "outdoor maternity",
    },
  ],
};

// Helpers ------------------------------------------------------

export function getAlbumsByService(serviceSlug) {
  return ALBUMS[serviceSlug] || [];
}

export function getAlbumById(serviceSlug, albumId) {
  return ALBUMS[serviceSlug]?.find((album) => album.id === albumId) || null;
}
