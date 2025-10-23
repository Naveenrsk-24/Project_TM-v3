// src/app/portfolio/[category]/page.jsx

import CategoryGallery from "../../../components/Portfolio/CategoryGallery";
// Note: Adjusted import path to be safer, assuming CategoryGallery is in components/Portfolio

const categoryMap = {
  'portraits': { name: 'Portraits', description: 'Timeless individual & couple portraits from our best sessions.', slug: 'portraits' },
  'pre-weddings': { name: 'Pre Weddings', description: 'Romantic pre-wedding stories from our finest shoots.', slug: 'pre-weddings' },
  'tamil-weddings': { name: 'Tamil Weddings', description: 'Vibrant and traditional Tamil ceremonies captured beautifully.', slug: 'tamil-weddings' },
  'telugu-weddings': { name: 'Telugu Weddings', description: 'Grand and colorful Telugu celebrations in our unique style.', slug: 'telugu-weddings' },
};

/**
 * Helper function to simulate fetching a list of albums for a category.
 * This is refactored to use more descriptive, hardcoded album data.
 * @param {string} categorySlug - The slug of the category.
 */
const getSampleAlbums = (categorySlug) => {
  const USER_IMAGE_URL = "/Weddings/beautiful-husband-wife-posing-beach.jpg";

  // Define hardcoded albums for a specific category slug
  const albumsData = {
    'tamil-weddings': [
      { id: 1, title: 'Akash & Akshaya Wedding', slug: 'akash-akshaya-wedding', photographer: 'Rakesh Varma', isFeatured: true },
      { id: 2, title: 'Deepa & Suresh Reception', slug: 'deepa-suresh-reception', photographer: 'Team Lead', isFeatured: false },
      { id: 3, title: 'Traditional Engagement', slug: 'traditional-engagement', photographer: 'Senior Photographer', isFeatured: false },
      { id: 4, title: 'Mehendi & Sangeet Night', slug: 'mehendi-sangeet-night', photographer: 'Rakesh Varma', isFeatured: true },
    ],
    'pre-weddings': [
      { id: 5, title: 'Beach Romantic Shoot', slug: 'beach-romantic-shoot', photographer: 'Senior Photographer', isFeatured: true },
      { id: 6, title: 'Hillside Engagement Gallery', slug: 'hillside-engagement-gallery', photographer: 'Team Lead', isFeatured: false },
      { id: 7, title: 'City Lights Serenade', slug: 'city-lights-serenade', photographer: 'Rakesh Varma', isFeatured: false },
      { id: 8, title: 'Vintage Car Portraits', slug: 'vintage-car-portraits', photographer: 'Senior Photographer', isFeatured: true },
    ],
    'portraits': [
      { id: 9, title: 'Senior Executive Headshots', slug: 'senior-executive-headshots', photographer: 'Rakesh Varma', isFeatured: true },
      { id: 10, title: 'Maternity Session', slug: 'maternity-session', photographer: 'Team Lead', isFeatured: false },
      { id: 11, title: 'Family Holiday Card', slug: 'family-holiday-card', photographer: 'Senior Photographer', isFeatured: false },
      { id: 12, title: 'Creative Fashion Shots', slug: 'creative-fashion-shots', photographer: 'Rakesh Varma', isFeatured: true },
    ],
    'telugu-weddings': [
      { id: 13, title: 'Grand Pellikuthuru Ceremony', slug: 'grand-pellikuthuru-ceremony', photographer: 'Rakesh Varma', isFeatured: true },
      { id: 14, title: 'Siva & Priyanka Wedding', slug: 'siva-priyanka-wedding', photographer: 'Team Lead', isFeatured: false },
      { id: 15, title: 'Outdoor Reception Bliss', slug: 'outdoor-reception-bliss', photographer: 'Senior Photographer', isFeatured: false },
      { id: 16, title: 'Haldi Fun Moments', slug: 'haldi-fun-moments', photographer: 'Rakesh Varma', isFeatured: true },
    ],
  };

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