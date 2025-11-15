// src/app/portfolio/[category]/page.jsx

import CategoryGallery from "../../../components/Portfolio/CategoryGallery";
import { categoryMap } from "@/data/Portfolio-Data/CategoryData";
import { albumsData } from "@/data/Portfolio-Data/albumData";
// Note: Adjusted import path to be safer, assuming CategoryGallery is in components/Portfolio

// import { pageMeta } from "@/lib/meta-data";

// export async function generateMetadata({ params }) {
// return pageMeta({
// title: `${params.category} Photography`,
// description: `Explore ${params.category} photography portfolio by TM Studios`,
// path: `/portfolio/${params.category}`,
// });
// }


/**
 * Helper function to simulate fetching a list of albums for a category.
 * This is refactored to use more descriptive, hardcoded album data.
 * @param {string} categorySlug - The slug of the category.
 */
const getSampleAlbums = (categorySlug) => {
  const USER_IMAGE_URL = "/Weddings/beautiful-husband-wife-posing-beach.jpg";

  // Define hardcoded albums for a specific category slug
 

  const selectedAlbums = albumsData[categorySlug] || albumsData['tamil-weddings']; // Default to a category if not found

  return selectedAlbums.map(album => ({
    ...album,
    coverImage: USER_IMAGE_URL,
    alt: `Cover image for ${album.title} in the ${categoryMap[categorySlug]?.name || 'Photography'} collection`,
  }));
};

// Next.js App Router convention: page component receives params
export default async function CategoryPage({ params }) {
  const { category } = params; 
  const categoryData = categoryMap[category] || { name: 'Photography', description: 'A collection of our finest work.', slug: category };

  // Fetch albums using the hardcoded sample function
  const albums = getSampleAlbums(category);

  return <CategoryGallery category={categoryData.name} slug={category} albums={albums} />;
}

// Static generation of paths for better performance (SSG)
export async function generateStaticParams() {
  return Object.keys(categoryMap).map((category) => ({
    category: category,
  }));
}

// Dynamic Metadata
export async function generateMetadata({ params }) {
  const { category } = params;
  const categoryName = categoryMap[category]?.name || 'Photography';

  return {
    title: `${categoryName} Gallery | Your Photography Studio`,
    description: categoryMap[category]?.description || `Explore the best ${categoryName.toLowerCase()} galleries captured by our photographers.`,
  };
}