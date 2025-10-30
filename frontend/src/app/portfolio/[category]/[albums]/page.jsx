// src/app/portfolio2/[category]/[albums]/page.jsx

import AlbumGallery from "../../../../components/Portfolio/AlbumGallery";

const USER_IMAGE_URL = "/Weddings/beautiful-husband-wife-posing-beach.jpg";

/**
 * Helper function to simulate fetching album details and images.
 * Renamed parameters internally for clarity, but accepts 'albums' as the slug parameter.
 */
const getAlbumData = (categorySlug, albumSlug) => {
    // --- Album Details ---
    const albumTitle = albumSlug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
        .replace('Wedding', ' Wedding');

    const categoryName = categorySlug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    // --- Album Images ---
    const images = Array.from({ length: 25 }).map((_, index) => {
        const isLarge = index % 5 === 0; // Make one out of five images large

        return {
            id: index + 1,
            src: USER_IMAGE_URL, // Replace with actual image URL
            alt: `${albumTitle} image ${index + 1}`,
            // Span classes for a dynamic grid layout
            span: isLarge ? "md:col-span-2 md:row-span-2" : "col-span-1",
        };
    });

    return {
        title: albumTitle,
        category: categoryName,
        location: "Chennai, India",
        date: "October 20, 2025",
        description: `A breathtaking collection from the vibrant ${albumTitle} ceremony. Every photograph tells a story of love, tradition, and joy. Captured in the beautiful settings of ${categoryName}.`,
        images: images,
    };
};

// Next.js App Router convention: page component receives params
export default async function AlbumPage({ params }) {
    // FIX: Destructure 'albums' (plural) to match the folder name [albums]
    const { category, albums } = params;
    
    // Pass 'albums' (the slug) into the helper function
    const data = getAlbumData(category, albums); 

    return <AlbumGallery albumData={data} />;
}


// Dynamic Metadata
export async function generateMetadata({ params }) {
    // FIX: Destructure 'albums' (plural)
    const { category, albums } = params;
    const data = getAlbumData(category, albums);

    return {
        title: `${data.title} | ${data.category} Album | Your Photography Studio`,
        description: data.description,
    };
}

// Optional: generate static paths for SSG
export async function generateStaticParams() {
    const categories = ['tamil-weddings', 'pre-weddings'];
    const albumsSlugs = { // Renamed local variable for clarity
        'tamil-weddings': ['akash-akshaya-wedding', 'deepa-suresh-reception'],
        'pre-weddings': ['beach-romantic-shoot', 'hillside-engagement-gallery'],
    };

    let staticParams = [];
    for (const category of categories) {
        for (const albumSlug of albumsSlugs[category]) {
            staticParams.push({ 
                category: category, 
                // FIX: The key must be 'albums' (plural) to match the folder name
                albums: albumSlug 
            });
        }
    }
    return staticParams;
}