// src/app/portfolio/[category]/page.jsx

import CategoryGallery from '../../../components/ExtraDesigns/PortfolioCategoryGalleryA'; // example path, adjust as needed

// ✅ Make your main page async and await params
export default async function CategoryPage({ params }) {
  const { category } = await params; // 👈 await params here
  return <CategoryGallery category={category} />;
}

// ✅ Also fix generateMetadata (if you have it)
export async function generateMetadata({ params }) {
  const { category } = await params; // 👈 await params here

  const categoryNames = {
    'portraits': 'Portraits',
    'pre-weddings': 'Pre Weddings',
    'tamil-weddings': 'Tamil Weddings',
    'telugu-weddings': 'Telugu Weddings',
  };

  const categoryName = categoryNames[category] || 'Photography';

  return {
    title: `${categoryName} | Your Photography Studio`,
    description: `Explore the best ${categoryName.toLowerCase()} galleries captured by our photographers.`,
  };
}

// ✅ Optional: generate static paths (for SSG)
export async function generateStaticParams() {
  return [
    { category: 'portraits' },
    { category: 'pre-weddings' },
    { category: 'tamil-weddings' },
    { category: 'telugu-weddings' },
  ];
}
