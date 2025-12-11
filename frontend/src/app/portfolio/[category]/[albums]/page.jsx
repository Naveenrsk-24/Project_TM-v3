// src/app/portfolio/[category]/[albums]/page.jsx

import AlbumGallery from "../../../../components/Portfolio/AlbumGallery";

const USER_IMAGE_URL = "/Weddings/beautiful-husband-wife-posing-beach.jpg";

/**
 * Safe helper to generate album data without causing `.split()` crashes during SSG.
 */
const getAlbumData = (categorySlug, albumSlug) => {
    // Apply safe fallbacks to avoid undefined.split() crashes
    const safeAlbum = albumSlug || "";
    const safeCategory = categorySlug || "";

    // --- Album Details ---
    const albumTitle = safeAlbum
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
        .replace("Wedding", " Wedding");

    const categoryName = safeCategory
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    // --- Album Images ---
    const images = Array.from({ length: 25 }).map((_, index) => {
        const isLarge = index % 5 === 0; // One large image every 5 items

        return {
            id: index + 1,
            src: USER_IMAGE_URL,
            alt: `${albumTitle} image ${index + 1}`,
            span: isLarge ? "md:col-span-2 md:row-span-2" : "col-span-1",
        };
    });

    return {
        title: albumTitle,
        category: categoryName,
        location: "Chennai, India",
        date: "October 20, 2025",
        description: `A breathtaking collection from the vibrant ${albumTitle} ceremony. Every photograph tells a story of love, tradition, and joy. Captured in the beautiful settings of ${categoryName}.`,
        images,
    };
};

// ============================================================
// PAGE COMPONENT
// ============================================================
export default async function AlbumPage({ params }) {
    // Must destructure `albums` (plural)
    const { category, albums } = params;

    // Pass slugs into safe helper
    const data = getAlbumData(category, albums);

    return <AlbumGallery albumData={data} />;
}

// ============================================================
// METADATA GENERATION
// ============================================================
export async function generateMetadata({ params }) {
    const { category, albums } = params;

    const data = getAlbumData(category, albums);

    return {
        title: `${data.title} | ${data.category} Album | Your Photography Studio`,
        description: data.description,
    };
}

// ============================================================
// STATIC PARAMS (SSG)
// ============================================================
export async function generateStaticParams() {
    const categories = ["tamil-weddings", "pre-weddings"];

    const albumsSlugs = {
        "tamil-weddings": ["akash-akshaya-wedding", "deepa-suresh-reception"],
        "pre-weddings": ["beach-romantic-shoot", "hillside-engagement-gallery"],
    };

    const staticParams = [];

    for (const category of categories) {
        for (const albumSlug of albumsSlugs[category]) {
            staticParams.push({
                category,
                albums: albumSlug, // MUST match folder name [albums]
            });
        }
    }

    return staticParams;
}
