"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { X, Download, Share2, Heart, ZoomIn, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import Image from 'next/image'; // Use next/image for better performance

// --- TYPESCRIPT INTERFACES (for clarity, even in JS) ---
/**
 * @typedef {Object} GalleryImage
 * @property {number | string} id
 * @property {string} src - The image source URL.
 * @property {string} alt - The alt text for accessibility.
 * @property {'small' | 'medium' | 'large' | 'wide'} size - Grid size hint.
 * @property {string} category - The category for filtering.
 */

/**
 * @typedef {Object} ImageBentoGalleryProps
 * @property {GalleryImage[]} images - Array of image objects to display.
 * @property {string[]} filters - Array of filter names (e.g., ['All', 'Outdoor']).
 * @property {string} galleryTitle - Main title for the gallery section.
 * @property {string} backLinkText - Text for the back navigation link.
 * @property {() => void} onBackClick - Handler for the back link.
 * @property {boolean} enableDownload - Toggles the main download button.
 * @property {boolean} enableShare - Toggles the main share button.
 * @property {boolean} enableLoadMore - Toggles the load more button.
 * @property {() => void} onLoadMore - Handler for the load more button.
 */

// --- UTILITY COMPONENTS ---

/**
 * Renders a single, animated gallery tile.
 * @param {Object} props
 * @param {GalleryImage} props.image
 * @param {string} props.gridClass - Tailwind class for grid span (e.g., 'md:col-span-2 md:row-span-2').
 * @param {number} props.index
 * @param {boolean} props.isLiked
 * @param {(image: GalleryImage) => void} props.onImageClick
 * @param {(id: number | string) => void} props.onLike
 * @param {boolean} props.isVisible
 */
const GalleryTile = React.memo(({ image, gridClass, index, isLiked, onImageClick, onLike, isVisible }) => {
  const TileZoomButton = (
    <button
      aria-label={`Zoom into ${image.alt}`}
      onClick={(e) => {
        e.stopPropagation();
        onImageClick(image);
      }}
      className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transform translate-y-[-20px] group-hover:translate-y-0 transition-all duration-500 delay-75 hover:bg-white/30"
    >
      <ZoomIn className="w-5 h-5 text-white" />
    </button>
  );

  const TileLikeButton = (
    <button
      aria-label={`${isLiked ? 'Unlike' : 'Like'} ${image.alt}`}
      onClick={(e) => {
        e.stopPropagation();
        onLike(image.id);
      }}
      className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transform translate-y-[-20px] group-hover:translate-y-0 transition-all duration-500 hover:bg-white/30"
    >
      <Heart className={`w-5 h-5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
    </button>
  );

  return (
    <div
      key={image.id}
      className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-700 ease-in-out ${gridClass} ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
      onClick={() => onImageClick(image)}
    >
      {/* Image Container with Zoom Effect */}
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover"
          priority={index < 4} // Prioritize first few images
        />
      </div>

      {/* Interactive Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {/* Top Actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          {TileLikeButton}
          {TileZoomButton}
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-medium capitalize">
            {image.category}
          </span>
        </div>
      </div>

      {/* Border Accent */}
      <div className="absolute inset-0 border-2 border-amber-500/0 group-hover:border-amber-500/50 rounded-xl transition-all duration-500"></div>
    </div>
  );
});
GalleryTile.displayName = 'GalleryTile'; // For better dev tools debugging


// --- MAIN COMPONENT ---

/**
 * @param {ImageBentoGalleryProps} props
 */
const ImageBentoGallery = ({
  images,
  filters,
  galleryTitle = 'Photo Gallery',
  backLinkText = 'Back to Categories',
  onBackClick = () => console.log('Back clicked'),
  enableDownload = true,
  enableShare = true,
  enableLoadMore = true,
  onLoadMore = () => console.log('Load More clicked'),
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState(filters[0] || 'All');
  const [liked, setLiked] = useState({});

  // Initial mount transition
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Filter logic
  const filteredImages = activeFilter.toLowerCase() === 'all'
    ? images
    : images.filter(img => img.category === activeFilter.toLowerCase());

  // Lightbox Handlers
  const handleImageClick = (image) => {
    setSelectedImage(image);
    // Prevent scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  }

  const handleLike = (id) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const navigateImage = (direction) => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex = currentIndex + direction;

    if (newIndex < 0) {
      newIndex = filteredImages.length - 1;
    } else if (newIndex >= filteredImages.length) {
      newIndex = 0;
    }

    setSelectedImage(filteredImages[newIndex]);
  };

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback((event) => {
    if (!selectedImage) return;
    if (event.key === 'Escape') {
      closeLightbox();
    } else if (event.key === 'ArrowLeft') {
      navigateImage(-1);
    } else if (event.key === 'ArrowRight') {
      navigateImage(1);
    }
  }, [selectedImage, filteredImages]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Map image size to a more balanced and attractive grid span class
  const getGridClass = (size, index) => {
    // Mobile is always col-span-1 (or col-span-2 for 'wide')
    let baseClass = 'col-span-1 row-span-1';

    switch (size) {
      case 'large':
        // Desktop/Tablet: 2x2. Ideal for main feature images.
        baseClass = 'md:col-span-2 md:row-span-2';
        break;
      case 'wide':
        // Desktop/Tablet: 2x1. Good for panoramic or horizontal shots.
        baseClass = 'col-span-2 md:col-span-2';
        break;
      case 'medium':
        // Desktop/Tablet: 1x2 or 2x1 based on index to create variety.
        // This logic helps "balance" the grid by alternating taller and wider medium blocks
        if (index % 4 === 1 || index % 4 === 2) {
            baseClass = 'md:row-span-2'; // Taller 1x2
        } else {
            baseClass = 'md:col-span-1'; // Standard 1x1 or default
        }
        break;
      case 'small':
      default:
        // Desktop/Tablet: 1x1. Standard size.
        baseClass = 'col-span-1';
        break;
    }
    // Ensure all images have a consistent mobile appearance
    return `col-span-2 sm:col-span-1 md:col-span-1 ${baseClass}`;
  };

  // Lightbox component for modularity and readability
  const Lightbox = ({ image, onClose, onNavigate, onLike, isLiked }) => {
    if (!image) return null;

    const navButtonClass = "w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 z-20 focus:outline-none focus:ring-2 focus:ring-amber-500/50";
    const actionButtonClass = "p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all duration-300";

    return (
      <div
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Image Lightbox"
      >
        {/* Close Button */}
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className={`${navButtonClass} absolute top-4 right-4 md:top-8 md:right-8`}
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Navigation - Previous */}
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(-1); }}
          className={`${navButtonClass} absolute left-4 md:left-8`}
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Navigation - Next */}
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(1); }}
          className={`${navButtonClass} absolute right-4 md:right-8`}
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Image Container */}
        <div className="max-w-full max-h-[90vh] md:max-w-6xl md:max-h-[85vh] relative flex items-center justify-center" onClick={e => e.stopPropagation()}>
          <div className="w-full h-full relative">
            <Image
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-contain rounded-xl shadow-2xl"
              width={1200}
              height={800}
              quality={100}
              priority
            />
          </div>

          {/* Bottom Info Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 rounded-b-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div>
                <p className="text-white text-lg font-medium">{image.alt}</p>
                <span className="text-white/70 text-sm capitalize">{image.category}</span>
              </div>
              <div className="flex gap-3 mt-3 md:mt-0">
                <button
                  onClick={() => onLike(image.id)}
                  className={actionButtonClass}
                  aria-label={`${isLiked ? 'Unlike' : 'Like'} this image`}
                >
                  <Heart className={`w-5 h-5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                </button>
                {enableDownload && (
                  <a href={image.src} download className={actionButtonClass} aria-label="Download image">
                    <Download className="w-5 h-5 text-white" />
                  </a>
                )}
                {enableShare && (
                  <button className={actionButtonClass} aria-label="Share image">
                    <Share2 className="w-5 h-5 text-white" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="min-h-screen bg-neutral-50 font-sans">
      {/* Header & Filter Section (Sticky) */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-neutral-200 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          
          {/* Top Row: Title and Actions */}
          <div className={`flex items-start justify-between transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}>
            <div>
              <button
                onClick={onBackClick}
                className="flex items-center gap-2 text-neutral-600 hover:text-amber-600 transition-colors mb-2 group focus:outline-none"
                aria-label={backLinkText}
              >
                <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                <span className="text-sm font-medium">{backLinkText}</span>
              </button>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">{galleryTitle}</h1>
              <p className="text-neutral-500 mt-1 text-sm font-medium">{filteredImages.length} Images</p>
            </div>

            <div className="flex items-center gap-2">
              {enableShare && (
                <button
                  className="p-3 hover:bg-neutral-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  aria-label="Share this gallery"
                >
                  <Share2 className="w-5 h-5 text-neutral-600" />
                </button>
              )}
              {enableDownload && (
                <button
                  className="p-3 hover:bg-neutral-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  aria-label="Download all images"
                >
                  <Download className="w-5 h-5 text-neutral-600" />
                </button>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className={`flex items-center gap-2 mt-4 overflow-x-auto pb-2 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <Filter className="w-5 h-5 text-neutral-500 flex-shrink-0 ml-1" />
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  activeFilter === filter
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/30 ring-amber-600'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 ring-neutral-300'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bento Grid Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[250px] gap-4">
          {filteredImages.map((image, index) => (
            <GalleryTile
              key={image.id}
              image={image}
              gridClass={getGridClass(image.size, index)}
              index={index}
              isLiked={!!liked[image.id]}
              onImageClick={handleImageClick}
              onLike={handleLike}
              isVisible={isVisible}
            />
          ))}
          
          {/* Empty state for filtered views */}
          {filteredImages.length === 0 && (
            <div className="col-span-4 text-center py-20 text-neutral-500 text-lg font-medium">
              No images found for **{activeFilter}**. Try a different filter!
            </div>
          )}
        </div>

        {/* Load More Button */}
        {enableLoadMore && filteredImages.length > 0 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={onLoadMore}
              className="px-10 py-4 bg-neutral-900 hover:bg-amber-600 text-white rounded-full font-semibold transition-all duration-300 shadow-xl hover:shadow-amber-500/50 transform hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-amber-500/50"
            >
              Load More Images
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <Lightbox
          image={selectedImage}
          onClose={closeLightbox}
          onNavigate={navigateImage}
          onLike={handleLike}
          isLiked={!!liked[selectedImage.id]}
        />
      )}

      {/* Global Animation Styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

// --- USAGE EXAMPLE ---

const USER_IMAGE_URL = '/Weddings/beautiful-husband-wife-posing-beach.jpg'; // Placeholder

// Generate dummy data with a more diverse range of sizes for the Bento Grid effect
const createGalleryData = (url) => {
    const categories = ['outdoor', 'studio', 'candid', 'traditional'];
    const sizes = ['large', 'wide', 'medium', 'small'];
    const data = [];
    for (let i = 1; i <= 20; i++) {
        data.push({
            id: i,
            src: url,
            alt: `Couple portrait ${i} - ${categories[i % categories.length]}`,
            size: sizes[i % sizes.length], // Cycle through sizes
            category: categories[i % categories.length],
        });
    }
    return data;
};

const demoImages = createGalleryData(USER_IMAGE_URL);
const demoFilters = ['All', 'Outdoor', 'Studio', 'Candid', 'Traditional'];

const GalleryDemo = () => {
    // In a real app, this would be a full-fledged component wrapping the main component
    return (
        <ImageBentoGallery
            images={demoImages}
            filters={demoFilters}
            galleryTitle="Pre Weddings: Coastal Collection"
            backLinkText="Back to Client Portfolios"
            onBackClick={() => alert('Navigating back...')}
            onLoadMore={() => alert('Simulating loading more images...')}
            enableDownload={true}
            enableShare={true}
            enableLoadMore={true}
        />
    );
}

export default GalleryDemo;