// components/ServiceCategoryDisplay.jsx

'use client';

import React, { useState } from 'react';
import { ChevronRight, ArrowRight, Camera } from 'lucide-react';
// NOTE: For a production Next.js app, always replace the standard <img> tag
// with the optimized Next.js <Image> component for better performance (import 'next/image').

// --- 1. Data Structure with Albums (omitted for brevity, assume it is correct) ---
const CATEGORY_CONTENT = [
  // ... (Your CATEGORY_CONTENT array is correct and remains here) ...
  // Keeping the full data structure for completeness, but hiding for focus on the fix:
  {
    key: 'engagement',
    label: 'Engagement',
    title: 'A Promise Spoken by the Celestial Pair',
    body: "The engagement marks the beautiful prelude to your marriage, a moment where two lives officially begin to intertwine. Our photography captures this chapter's unique excitement, shared laughter, and deep affection, creating stunning images that tell the story of your 'yes'.",
    subsectionTitle: "Why choose our service for your engagement photography?",
    subsectionBody: "We combine magazine-quality artistic direction with genuine candid moments. Our service includes personalized location scouting, wardrobe consultation, and a relaxed, fun shooting experience. We don't just take pictures; we craft your first family heirlooms.",
    imageSrc: '/images/category-engagement.webp',
    imageAlt: 'An affectionate engagement photo of a couple laughing.',
    albums: [
      { id: 101, title: 'Coastal Sunset Shoot', count: 45, coverImage: '/images/album-coastal.webp' },
      { id: 102, title: 'Urban Chic Moments', count: 32, coverImage: '/images/album-urban.webp' },
      { id: 103, title: 'Intimate Garden Vows', count: 50, coverImage: '/images/album-garden.webp' },
    ],
  },
  {
    key: 'outdoor',
    label: 'Outdoor',
    title: 'Where Love Meets the Horizon',
    body: "Outdoor photography harnesses the unparalleled beauty of natural light and landscapes. Whether it’s a golden hour engagement session or a lush garden wedding, we specialize in creating dramatic, vibrant, and evocative images...",
    imageSrc: '/images/category-outdoor.webp',
    imageAlt: 'A couple posing on a scenic mountain view during golden hour.',
    albums: [
      { id: 201, title: 'Himalayan Pre-Wedding', count: 60, coverImage: '/images/album-himalayan.webp' },
      { id: 202, title: 'Desert Love Story', count: 40, coverImage: '/images/album-desert.webp' },
    ],
  },
  {
    key: 'all',
    label: 'All',
    title: 'A Spectrum of Services for Every Celebration',
    body: "Browse through all our categories to find the perfect style for your event. Below are highlights from our most celebrated albums across all our specialties.",
    imageSrc: '/images/category-all.webp',
    imageAlt: 'A collage of diverse wedding and engagement moments.',
    albums: [
      { id: 901, title: 'Best of 2024 Collection', count: 100, coverImage: '/images/album-bestof.webp' },
      { id: 902, title: 'Top Featured Weddings', count: 75, coverImage: '/images/album-featured.webp' },
      { id: 903, title: 'Candid Moments Reel', count: 55, coverImage: '/images/album-candid.webp' },
      { id: 904, title: 'Destination Shoots', count: 90, coverImage: '/images/album-destination.webp' },
    ],
  },
  { key: 'muslim', label: 'Muslim', title: 'The Grace and Grandeur of Nikkah', body: '...', imageSrc: '/images/category-muslim.webp', imageAlt: '...', albums: [{ id: 301, title: 'Nikkah & Walima', count: 80, coverImage: '/images/album-nikkah.webp' }] },
  { key: 'christian', label: 'Christian', title: 'Timeless Vows in Hallowed Halls', body: '...', imageSrc: '/images/category-christian.webp', imageAlt: '...', albums: [{ id: 401, title: 'Church Ceremony', count: 70, coverImage: '/images/album-church.webp' }] },
  { key: 'brahmin', label: 'Brahmin', title: 'Upholding the Sacred Vedic Rites', body: '...', imageSrc: '/images/category-brahmin.webp', imageAlt: '...', albums: [{ id: 501, title: 'Traditional Brahmin', count: 65, coverImage: '/images/album-brahmin.webp' }] },
  { key: 'telugu', label: 'Telugu', title: 'The Vibrance of the Kanyadanam', body: '...', imageSrc: '/images/category-telugu.webp', imageAlt: '...', albums: [{ id: 601, title: 'Pellikuthuru & Sangeet', count: 95, coverImage: '/images/album-telugu.webp' }] },
  { key: 'hindu', label: 'Hindu', title: 'An Epic Tapestry of Tradition and Joy', body: '...', imageSrc: '/images/category-hindu.webp', imageAlt: '...', albums: [{ id: 701, title: 'North Indian Wedding', count: 120, coverImage: '/images/album-north.webp' }] },
  { key: 'malayali', label: 'Malayali', title: 'The Simplicity and Elegance of Kerala', body: '...', imageSrc: '/images/category-malayali.webp', imageAlt: '...', albums: [{ id: 801, title: 'Kerala Style', count: 50, coverImage: '/images/album-kerala.webp' }] },
  { key: 'punjabi', label: 'Punjabi', title: 'The High-Energy Bhangra and Rituals', body: '...', imageSrc: '/images/category-punjabi.webp', imageAlt: '...', albums: [{ id: 802, title: 'Big Fat Punjabi Wedding', count: 110, coverImage: '/images/album-punjabi.webp' }] },
  { key: 'sangeet', label: 'Sangeet', title: 'The Rhythmic Celebration of Two Families', body: '...', imageSrc: '/images/category-sangeet.webp', imageAlt: '...', albums: [{ id: 803, title: 'Sangeet & Cocktail', count: 40, coverImage: '/images/album-sangeet.webp' }] },
  { key: 'haldi', label: 'Haldi', title: 'The Auspicious Start: Turmeric and Merriment', body: '...', imageSrc: '/images/category-haldi.webp', imageAlt: '...', albums: [{ id: 804, title: 'Vibrant Haldi', count: 30, coverImage: '/images/album-haldi.webp' }] },
].sort((a, b) => { 
  if (a.key === 'all') return -1;
  if (b.key === 'all') return 1;
  return 0;
});


// --- 2. Album Card Component (remains the same) ---
const AlbumCard = ({ album }) => {
  return (
    <a 
      href={`/gallery/album/${album.id}`}
      className="group relative block rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl"
      aria-label={`View ${album.title} album with ${album.count} photos`}
    >
      <img
        src={album.coverImage}
        alt={`Cover image for the ${album.title} album`}
        width={400}
        height={300}
        className="w-full h-72 object-cover object-center transition-opacity duration-500 group-hover:opacity-85"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end">
        <h3 className="text-xl font-semibold text-white mb-1 transition-all group-hover:text-indigo-300">
          {album.title}
        </h3>
        <p className="flex items-center text-sm font-medium text-gray-200">
          <Camera className="w-4 h-4 mr-1 text-indigo-400" aria-hidden="true" />
          {album.count} Photos
        </p>
      </div>
      <div className="absolute inset-0 border-4 border-transparent transition-all duration-300 group-hover:border-indigo-400/50 rounded-xl pointer-events-none"></div>
    </a>
  );
};

// --- 3. Albums Section Integration (remains the same) ---
const AlbumsSection = ({ albums, categoryLabel }) => {
  if (!albums || albums.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-500 italic">No featured albums currently available for {categoryLabel}.</p>
      </div>
    );
  }

  return (
    <div className="mt-16 pt-10 border-t border-gray-200">
      <h3 className="text-3xl font-bold text-gray-800 mb-8 tracking-tight">
        Featured {categoryLabel} Albums
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {albums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <a href="/gallery" className="inline-flex items-center text-lg font-semibold text-indigo-700 hover:text-indigo-900 transition-colors group">
          View All Galleries
          <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};

// --- Sub Components ---

// FIX: Ensure the prop name setActiveCategoryKey is used correctly
const CategoryFilter = ({ categories, activeKey, setActiveCategoryKey }) => { 
  return (
    <nav className="flex overflow-x-auto py-4 sm:py-6 lg:py-8 border-b border-gray-100/50 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden" aria-label="Service Categories">
      <div className="flex space-x-6 whitespace-nowrap px-4 sm:px-6 lg:px-8 mx-auto">
        {categories.map(({ key, label }) => {
          const isActive = key === activeKey;
          return (
            <button
              key={key}
              // FIX: Call the correct prop function
              onClick={() => setActiveCategoryKey(key)} 
              className={`
                text-lg font-medium tracking-wide pb-2
                transition-colors duration-300 ease-in-out
                ${isActive
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-indigo-500 hover:border-b-2 hover:border-indigo-500/50'
                }
                focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

// ContentSection remains the same
const ContentSection = ({ content }) => {
  return (
    <section 
      key={content.key} 
      className="p-4 sm:p-6 lg:p-8 bg-white/50 animate-fadeIn"
      aria-labelledby="category-title"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column: Textual Content */}
          <div className="lg:col-span-6 xl:col-span-7">
            <h2 id="category-title" className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 font-serif leading-tight">
              {content.title}
            </h2>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed font-light">
              {content.body}
            </p>

            {/* Optional Subsection */}
            {content.subsectionTitle && content.subsectionBody && (
              <div className="mt-8 p-6 bg-indigo-50 border-l-4 border-indigo-500 rounded-lg shadow-inner">
                <h3 className="text-xl font-bold text-indigo-700 mb-2 flex items-center">
                  <ChevronRight className="w-5 h-5 mr-2" aria-hidden="true" />
                  {content.subsectionTitle}
                </h3>
                <p className="text-gray-700 text-base italic">
                  {content.subsectionBody}
                </p>
              </div>
            )}
            
            <a href="#" className="mt-8 inline-flex items-center text-lg font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-200 group">
              Get A Custom Quote
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>

          {/* Right Column: Image */}
          <div className="lg:col-span-6 xl:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-lg lg:max-w-none">
              <img
                src={content.imageSrc}
                alt={content.imageAlt}
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-xl shadow-2xl transition-all duration-500 ease-out hover:shadow-indigo-500/40"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        
        {/* --- Integrated Albums Section --- */}
        <AlbumsSection albums={content.albums} categoryLabel={content.label} />
        {/* ---------------------------------- */}

      </div>
    </section>
  );
};


// --- Main Component (remains the same) ---
const ServiceCategoryDisplay = () => {
  const [activeCategoryKey, setActiveCategoryKey] = useState('engagement');

  const activeContent = CATEGORY_CONTENT.find(
    (item) => item.key === activeCategoryKey
  ) || CATEGORY_CONTENT.find(item => item.key === 'all');

  return (
    <div className="w-full bg-gray-50/50">
      <CategoryFilter
        categories={CATEGORY_CONTENT}
        activeKey={activeCategoryKey}
        // This is the prop name passed to the CategoryFilter component
        setActiveCategoryKey={setActiveCategoryKey} 
      />
      <ContentSection content={activeContent} />
      
      {/* Tailwind Animation Utility Class */}
      <style jsx global>{`
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ServiceCategoryDisplay;