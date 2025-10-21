"use client"

import React, { useState, useEffect } from 'react';
import { X, Heart, Share2, Download, Grid, List, ChevronDown, Maximize2 } from 'lucide-react';

const galleryImages = [
  { id: 1, src: '/api/placeholder/800/600', alt: 'Beautiful couple moment', tags: ['outdoor', 'sunset'] },
  { id: 2, src: '/api/placeholder/600/800', alt: 'Romantic portrait', tags: ['portrait', 'studio'] },
  { id: 3, src: '/api/placeholder/900/600', alt: 'Nature backdrop', tags: ['outdoor', 'nature'] },
  { id: 4, src: '/api/placeholder/700/900', alt: 'Traditional attire', tags: ['traditional', 'cultural'] },
  { id: 5, src: '/api/placeholder/800/800', alt: 'Candid smile', tags: ['candid', 'joyful'] },
  { id: 6, src: '/api/placeholder/600/700', alt: 'Elegant pose', tags: ['studio', 'elegant'] },
  { id: 7, src: '/api/placeholder/1000/600', alt: 'Beach setting', tags: ['outdoor', 'beach'] },
  { id: 8, src: '/api/placeholder/600/900', alt: 'Classic composition', tags: ['portrait', 'classic'] },
  { id: 9, src: '/api/placeholder/800/700', alt: 'Golden hour', tags: ['outdoor', 'sunset'] },
  { id: 10, src: '/api/placeholder/700/800', alt: 'Intimate moment', tags: ['candid', 'romantic'] },
  { id: 11, src: '/api/placeholder/900/700', alt: 'Architectural beauty', tags: ['outdoor', 'architecture'] },
  { id: 12, src: '/api/placeholder/600/600', alt: 'Close-up portrait', tags: ['portrait', 'studio'] },
];

const CategoryGalleryB = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[1800px] mx-auto px-6 py-6">
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}>
            {/* Top Row */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-6 bg-amber-500"></div>
                  <span className="text-sm text-amber-500 uppercase tracking-widest">Pre Weddings</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold">Gallery Collection</h1>
                <p className="text-neutral-400 mt-2">{galleryImages.length} stunning captures</p>
              </div>

              <div className="flex items-center gap-3">
                {/* View Toggle */}
                <div className="flex bg-white/5 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-all duration-300 ${
                      viewMode === 'grid' ? 'bg-amber-500 text-white' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-all duration-300 ${
                      viewMode === 'list' ? 'bg-amber-500 text-white' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>

                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-lg font-semibold transition-all duration-300 shadow-lg">
                  <Download className="w-5 h-5 inline mr-2" />
                  Download All
                </button>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="flex items-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-neutral-400">Recently Updated</span>
              </div>
              <div className="text-neutral-400">
                <Heart className="w-4 h-4 inline mr-1 text-red-500" />
                {favorites.size} Favorites
              </div>
              <div className="text-neutral-400">4K Quality Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Content */}
      <div className="max-w-[1800px] mx-auto px-6 py-12">
        {viewMode === 'grid' ? (
          /* Justified Grid Layout */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}
                style={{ 
                  transitionDelay: `${index * 50}ms`,
                  aspectRatio: index % 3 === 0 ? '3/4' : index % 2 === 0 ? '4/3' : '1/1'
                }}
                onClick={() => setSelectedImage(image)}
              >
                {/* Image */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  {/* Top Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(image.id);
                      }}
                      className="w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <Heart 
                        className={`w-5 h-5 transition-all duration-300 ${
                          favorites.has(image.id) 
                            ? 'fill-red-500 text-red-500 scale-110' 
                            : 'text-white'
                        }`} 
                      />
                    </button>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <Maximize2 className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white font-medium mb-2">{image.alt}</p>
                    <div className="flex gap-2 flex-wrap">
                      {image.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white capitalize"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Favorite Indicator */}
                {favorites.has(image.id) && (
                  <div className="absolute top-4 left-4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                    <Heart className="w-4 h-4 text-white fill-white" />
                  </div>
                )}

                {/* Number Badge */}
                <div className="absolute bottom-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-white text-sm font-bold">{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-6">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className={`group flex gap-6 bg-white/5 hover:bg-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
                onClick={() => setSelectedImage(image)}
              >
                <div className="w-1/3 aspect-video overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1 py-6 pr-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{image.alt}</h3>
                    <div className="flex gap-2 mb-3">
                      {image.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-xs capitalize">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-neutral-400 text-sm">Image #{index + 1}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(image.id);
                      }}
                      className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300"
                    >
                      <Heart className={`w-5 h-5 ${favorites.has(image.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                    <button className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
        <div className="flex justify-center mt-16">
          <button className="group px-10 py-5 bg-white/5 hover:bg-amber-500 border border-white/10 hover:border-amber-500 rounded-full font-semibold transition-all duration-500 hover:shadow-[0_0_50px_rgba(251,191,36,0.3)]">
            <span className="flex items-center gap-3">
              Load More
              <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
            </span>
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/98 backdrop-blur-xl flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-90"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="max-w-7xl w-full">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full max-h-[85vh] object-contain rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="mt-6 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.alt}</h3>
                <div className="flex gap-2">
                  {selectedImage.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-sm capitalize">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => toggleFavorite(selectedImage.id)}
                  className="p-4 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300"
                >
                  <Heart className={`w-6 h-6 ${favorites.has(selectedImage.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
                <button className="p-4 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300">
                  <Share2 className="w-6 h-6" />
                </button>
                <button className="px-6 py-4 bg-amber-500 hover:bg-amber-600 rounded-full font-semibold transition-all duration-300">
                  <Download className="w-5 h-5 inline mr-2" />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryGalleryB;