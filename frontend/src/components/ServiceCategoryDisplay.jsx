// components/ServiceCategoryDisplay.jsx

'use client';

import React, { useState } from 'react';
import { ChevronRight, ArrowRight, Camera } from 'lucide-react';
// NOTE: For a production Next.js app, consider using 'next/image' for optimization.

// --- Data Structure (UNCHANGED) ---
const CATEGORY_CONTENT = [
  // ... (Your CATEGORY_CONTENT array remains here) ...
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

// --- Enhanced Album Card Component ---
const AlbumCard = ({ album }) => {
  return (
    <a 
      href={`/gallery/album/${album.id}`}
      className="group relative block h-full rounded-2xl overflow-hidden shadow-xl hover:shadow-indigo-500/50 transition-all duration-500 ease-in-out hover:scale-[1.03] before:absolute before:inset-0 before:bg-transparent before:transition-opacity before:duration-500 before:pointer-events-none"
      aria-label={`View ${album.title} album with ${album.count} photos`}
    >
      <img
        src={album.coverImage}
        alt={`Cover image for the ${album.title} album`}
        width={400}
        height={300}
        className="w-full h-72 object-cover object-center transition-opacity duration-700 group-hover:scale-[1.05] group-hover:opacity-90"
        loading="lazy"
      />
      <div 
        className="absolute inset-0 p-5 flex flex-col justify-end 
                   bg-gradient-to-t from-black/80 to-transparent 
                   group-hover:from-indigo-900/80 group-hover:to-transparent transition-colors duration-500"
      >
        <h3 className="text-2xl font-bold text-white mb-1 transition-all group-hover:text-indigo-200">
          {album.title}
        </h3>
        <p className="flex items-center text-sm font-medium text-gray-300 transition-colors group-hover:text-white">
          <Camera className="w-4 h-4 mr-1 text-indigo-400" aria-hidden="true" />
          {album.count} Photos
        </p>
      </div>
      <div className="absolute inset-0 rounded-2xl border-4 border-transparent transition-all duration-500 group-hover:border-indigo-400/70 pointer-events-none"></div>
    </a>
  );
};

// --- Albums Section (minor styling updates) ---
const AlbumsSection = ({ albums, categoryLabel }) => {
  if (!albums || albums.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-500 italic">No featured albums currently available for {categoryLabel}.</p>
      </div>
    );
  }

  return (
    <div className="mt-20 pt-10 border-t border-gray-100">
      <h3 className="text-4xl font-extrabold text-gray-800 mb-10 tracking-tight text-center">
        Explore {categoryLabel} Portfolios
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {albums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <a href="/gallery" className="inline-flex items-center text-lg font-bold px-6 py-3 rounded-full 
        text-white bg-indigo-600 shadow-lg hover:bg-indigo-700 
        transition-all duration-300 transform hover:scale-[1.02] group"
        >
          View All 40+ Galleries
          <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};

// --- Enhanced Category Filter Component (Sticky + Pill Design) ---
const CategoryFilter = ({ categories, activeKey, setActiveCategoryKey }) => { 
  return (
    // Added sticky top-0 and shadow/background for separation from hero
    <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm shadow-md border-b border-gray-200">
      <nav className="flex overflow-x-auto py-4 sm:py-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden" aria-label="Service Categories">
        <div className="flex space-x-4 whitespace-nowrap px-4 sm:px-6 lg:px-8 mx-auto">
          {categories.map(({ key, label }) => {
            const isActive = key === activeKey;
            return (
              <button
                key={key}
                onClick={() => setActiveCategoryKey(key)} 
                className={`
                  text-base font-semibold px-4 py-2 rounded-full 
                  transition-all duration-300 ease-in-out
                  ${isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' // Active: Solid Pill
                    : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' // Default & Hover: Light
                  }
                  focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                {label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

// --- Enhanced Content Section ---
const ContentSection = ({ content }) => {
  return (
    <section 
      key={content.key} 
      // Changed base background to light gray gradient for depth
      className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-white to-gray-50 animate-fadeIn"
      aria-labelledby="category-title"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Textual Content - Enhanced Typography */}
          <div className="lg:col-span-6 xl:col-span-7">
            <p className="text-sm font-semibold uppercase text-indigo-500 mb-2 tracking-widest">
                Our Dedicated Service
            </p>
            <h2 id="category-title" className="text-4xl sm:text-6xl font-serif font-bold text-gray-900 mb-8 leading-snug">
              {content.title}
            </h2>

            <p className="text-xl text-gray-700 mb-8 leading-relaxed font-light">
              {content.body}
            </p>

            {/* Optional Subsection - Elevated Design */}
            {content.subsectionTitle && content.subsectionBody && (
              <div className="mt-10 p-6 bg-white border-l-4 border-indigo-500 rounded-xl shadow-xl transition-shadow duration-300 hover:shadow-2xl hover:shadow-indigo-200/50">
                <h3 className="text-2xl font-bold text-indigo-700 mb-3 flex items-center">
                  <ChevronRight className="w-6 h-6 mr-2 text-indigo-500" aria-hidden="true" />
                  {content.subsectionTitle}
                </h3>
                <p className="text-gray-600 text-lg italic">
                  {content.subsectionBody}
                </p>
              </div>
            )}
            
            <a href="#" className="mt-10 inline-flex items-center text-xl font-bold px-6 py-3 rounded-lg bg-indigo-50 text-indigo-700 border-2 border-indigo-200 hover:bg-indigo-100 transition-all duration-300 group">
              Get A Custom Quote
              <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>

          {/* Right Column: Image - Enhanced Shadow and Cornering */}
          <div className="lg:col-span-6 xl:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-xl lg:max-w-none">
              <img
                src={content.imageSrc}
                alt={content.imageAlt}
                width={700}
                height={500}
                className="w-full h-auto object-cover rounded-3xl shadow-2xl shadow-gray-400/50 transition-all duration-700 ease-out hover:shadow-indigo-600/50"
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


// --- Main Component ---
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