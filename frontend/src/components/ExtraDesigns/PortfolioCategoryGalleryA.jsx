"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { X, Download, Share2, Heart, ZoomIn, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

// The image URL provided by the user
const USER_IMAGE_URL = '/Weddings/beautiful-husband-wife-posing-beach.jpg';

const galleryImages = [
  // All 'src' values have been set to the USER_IMAGE_URL
  { id: 1, src: USER_IMAGE_URL, alt: 'Couple portrait 1', size: 'large', category: 'outdoor' },
  { id: 2, src: USER_IMAGE_URL, alt: 'Couple portrait 2', size: 'medium', category: 'studio' },
  { id: 3, src: USER_IMAGE_URL, alt: 'Couple portrait 3', size: 'large', category: 'outdoor' },
  { id: 4, src: USER_IMAGE_URL, alt: 'Couple portrait 4', size: 'small', category: 'candid' },
  { id: 5, src: USER_IMAGE_URL, alt: 'Couple portrait 5', size: 'medium', category: 'outdoor' },
  { id: 6, src: USER_IMAGE_URL, alt: 'Couple portrait 6', size: 'large', category: 'traditional' },
  { id: 7, src: USER_IMAGE_URL, alt: 'Couple portrait 7', size: 'wide', category: 'candid' },
  { id: 8, src: USER_IMAGE_URL, alt: 'Couple portrait 8', size: 'small', category: 'studio' },
  { id: 9, src: USER_IMAGE_URL, alt: 'Couple portrait 9', size: 'large', category: 'outdoor' },
  { id: 10, src: USER_IMAGE_URL, alt: 'Couple portrait 10', size: 'wide', category: 'candid' },
  { id: 11, src: USER_IMAGE_URL, alt: 'Couple portrait 11', size: 'medium', category: 'traditional' },
  { id: 12, src: USER_IMAGE_URL, alt: 'Couple portrait 12', size: 'large', category: 'outdoor' },
];

const filters = ['All', 'Outdoor', 'Studio', 'Candid', 'Traditional'];

const CategoryGallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [liked, setLiked] = useState({});

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredImages = activeFilter === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeFilter.toLowerCase());

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleLike = (id) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Function to handle image navigation in the lightbox
  const navigateImage = (direction) => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex = currentIndex + direction;

    if (newIndex < 0) {
      newIndex = filteredImages.length - 1; // Wrap around to end
    } else if (newIndex >= filteredImages.length) {
      newIndex = 0; // Wrap around to start
    }

    setSelectedImage(filteredImages[newIndex]);
  };

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback((event) => {
    if (!selectedImage) return;
    if (event.key === 'Escape') {
      setSelectedImage(null);
    } else if (event.key === 'ArrowLeft') {
      navigateImage(-1);
    } else if (event.key === 'ArrowRight') {
      navigateImage(1);
    }
  }, [selectedImage, filteredImages]); // dependencies are key for useCallback

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className={`flex items-center justify-between transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}>
            <div>
              <button className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors mb-2">
                <ChevronLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back to Categories</span>
              </button>
              <h1 className="text-4xl md:text-5xl font-serif text-neutral-900">Pre Weddings</h1>
              <p className="text-neutral-600 mt-1">{filteredImages.length} Images</p>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-3 hover:bg-neutral-100 rounded-full transition-colors">
                <Share2 className="w-5 h-5 text-neutral-600" />
              </button>
              <button className="p-3 hover:bg-neutral-100 rounded-full transition-colors">
                <Download className="w-5 h-5 text-neutral-600" />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className={`flex items-center gap-3 mt-6 overflow-x-auto pb-2 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            <Filter className="w-5 h-5 text-neutral-500 flex-shrink-0" />
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-amber-500 text-white shadow-lg'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bento Grid Gallery */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[250px] gap-4">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 ${
                image.size === 'large' ? 'md:col-span-2 md:row-span-2' :
                  image.size === 'wide' ? 'md:col-span-2' :
                    image.size === 'medium' ? 'row-span-1' :
                      'row-span-1'
                } ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              style={{ transitionDelay: `${index * 50}ms` }}
              onClick={() => handleImageClick(image)}
            >
              {/* Image */}
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {/* Top Actions */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(image.id);
                    }}
                    className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transform translate-y-[-20px] group-hover:translate-y-0 transition-all duration-500 hover:bg-white/30"
                  >
                    <Heart className={`w-5 h-5 ${liked[image.id] ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleImageClick(image); // Re-trigger click for Lightbox even from zoom button
                    }}
                    className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transform translate-y-[-20px] group-hover:translate-y-0 transition-all duration-500 delay-75 hover:bg-white/30"
                  >
                    <ZoomIn className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-medium capitalize">
                    {image.category}
                  </span>
                </div>
              </div>

              {/* Border Accent */}
              <div className="absolute inset-0 border-2 border-amber-500/0 group-hover:border-amber-500/50 rounded-2xl transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-12">
          <button className="px-8 py-4 bg-neutral-900 hover:bg-amber-500 text-white rounded-full font-semibold transition-all duration-300 hover:shadow-xl transform hover:scale-105">
            Load More Images
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)} // Close on backdrop click
        >
          {/* Close Button */}
          <button
            onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation - Previous */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateImage(-1); }}
            className="absolute left-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navigation - Next */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateImage(1); }}
            className="absolute right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Container */}
          <div className="max-w-6xl max-h-[85vh] relative" onClick={e => e.stopPropagation()}>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-full object-contain rounded-lg"
            />

            {/* Bottom Info Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-lg font-medium">{selectedImage.alt}</p>
                  <span className="text-white/70 text-sm capitalize">{selectedImage.category}</span>
                </div>
                <div className="flex gap-2">
                  <button className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all duration-300">
                    <Heart className="w-5 h-5 text-white" />
                  </button>
                  <button className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all duration-300">
                    <Download className="w-5 h-5 text-white" />
                  </button>
                  <button className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all duration-300">
                    <Share2 className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
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

export default CategoryGallery;