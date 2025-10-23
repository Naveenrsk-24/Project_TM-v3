'use client'

import { useState, useEffect } from 'react';

/**
 * AlbumGallery Component - Ultra Creative Redesign
 * 
 * Features:
 * - Cinematic hero with parallax effect
 * - Bento-box inspired asymmetric grid
 * - Immersive fullscreen lightbox with cinematic transitions
 * - Advanced micro-interactions and animations
 * - Floating metadata cards
 */
const AlbumGallery2 = ({ albumData }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  const { 
    title = 'Album Title', 
    category = 'Category', 
    location = 'Location', 
    date = 'Date', 
    description = 'Album description', 
    images = [] 
  } = albumData || {};

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsHeroVisible(window.scrollY < 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle lightbox
  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  const prevImage = () => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  // Dynamic grid pattern - Bento box style
  const getGridClass = (index) => {
    const patterns = [
      'col-span-2 row-span-2', // Large
      'col-span-1 row-span-1', // Small
      'col-span-1 row-span-2', // Tall
      'col-span-2 row-span-1', // Wide
      'col-span-1 row-span-1', // Small
      'col-span-1 row-span-1', // Small
    ];
    return patterns[index % patterns.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      {/* Cinematic Hero Section with Parallax */}
      <div className="relative h-screen overflow-hidden">
        {/* Animated Background Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-rose-400/30 rounded-full blur-3xl animate-pulse"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          ></div>
          <div 
            className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-3xl animate-pulse"
            style={{ transform: `translateY(${scrollY * 0.3}px)`, animationDelay: '1s' }}
          ></div>
          <div 
            className="absolute bottom-0 left-1/3 w-96 h-96 bg-amber-400/25 rounded-full blur-3xl animate-pulse"
            style={{ transform: `translateY(${scrollY * 0.4}px)`, animationDelay: '2s' }}
          ></div>
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center px-4">
          <div 
            className="text-center space-y-8 max-w-5xl"
            style={{ transform: `translateY(${scrollY * 0.5}px)`, opacity: Math.max(0, 1 - scrollY / 400) }}
          >
            {/* Category Badge */}
            <div className="inline-block animate-[fadeInDown_0.8s_ease-out]">
              <span className="px-6 py-2 bg-gradient-to-r from-rose-500 via-purple-500 to-amber-500 text-white text-sm font-semibold rounded-full shadow-2xl backdrop-blur-sm border border-white/20">
                {category}
              </span>
            </div>

            {/* Title with Gradient Text */}
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-tight animate-[fadeInUp_1s_ease-out_0.2s_both]">
              <span className="bg-gradient-to-r from-rose-600 via-purple-600 to-amber-600 bg-clip-text text-transparent drop-shadow-lg">
                {title}
              </span>
            </h1>

            {/* Floating Metadata Cards */}
            <div className="flex flex-wrap justify-center gap-4 animate-[fadeInUp_1s_ease-out_0.4s_both]">
              {/* Location Card */}
              <div className="group relative px-6 py-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-rose-100 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-purple-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-500 font-medium">Location</p>
                    <p className="text-sm font-bold text-gray-900">{location}</p>
                  </div>
                </div>
              </div>

              {/* Date Card */}
              <div className="group relative px-6 py-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-purple-100 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-amber-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-amber-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-500 font-medium">Date</p>
                    <p className="text-sm font-bold text-gray-900">{date}</p>
                  </div>
                </div>
              </div>

              {/* Photos Count Card */}
              <div className="group relative px-6 py-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-amber-100 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-rose-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-500 font-medium">Gallery</p>
                    <p className="text-sm font-bold text-gray-900">{images.length} Photos</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed animate-[fadeInUp_1s_ease-out_0.6s_both]">
              {description}
            </p>

            {/* Scroll Indicator */}
            <div className="animate-[bounce_2s_infinite] pt-8">
              <svg className="w-6 h-6 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Breadcrumb (appears on scroll) */}
      <div 
        className={`fixed top-4 left-4 right-4 z-40 transition-all duration-500 ${
          isHeroVisible ? 'opacity-0 -translate-y-8' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-lg rounded-full shadow-xl border border-gray-200">
            <a href="/portfolio2" className="text-sm text-gray-600 hover:text-rose-600 transition-colors font-medium">
              Portfolio
            </a>
            <span className="text-gray-400">/</span>
            <a href={`/portfolio2/${category.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-gray-600 hover:text-rose-600 transition-colors font-medium">
              {category}
            </a>
            <span className="text-gray-400">/</span>
            <span className="text-sm text-gray-900 font-bold">{title}</span>
          </nav>
        </div>
      </div>

      {/* Bento Box Gallery Grid */}
      <div className="relative -mt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-4">
            {images.map((image, index) => {
              const gridClass = getGridClass(index);
              
              return (
                <div
                  key={image.id}
                  className={`group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-700 hover:scale-[1.02] ${gridClass}`}
                  style={{ 
                    animationDelay: `${index * 0.05}s`,
                  }}
                  onClick={() => openLightbox(image)}
                >
                  {/* Image */}
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 flex items-end p-6">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex items-center gap-2 text-white">
                          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium">View Photo</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Magnetic Border Effect */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500"></div>
                  
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 via-purple-500 to-amber-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Immersive Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/98 backdrop-blur-2xl flex items-center justify-center animate-[fadeIn_0.4s_ease-out]"
          onClick={closeLightbox}
        >
          {/* Close Button - Morphing */}
          <button
            onClick={closeLightbox}
            className="fixed top-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-purple-500 text-white shadow-2xl hover:shadow-rose-500/50 transition-all duration-300 hover:scale-110 hover:rotate-90 group"
            aria-label="Close lightbox"
          >
            <svg className="w-6 h-6 mx-auto transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="fixed left-6 z-50 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white transition-all duration-300 hover:scale-110 hover:-translate-x-1 border border-white/20"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="fixed right-6 z-50 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white transition-all duration-300 hover:scale-110 hover:translate-x-1 border border-white/20"
            aria-label="Next image"
          >
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Container with Cinematic Frame */}
          <div className="relative max-w-7xl max-h-[90vh] w-full px-4" onClick={(e) => e.stopPropagation()}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-full object-contain animate-[scaleIn_0.5s_ease-out]"
              />
              
              {/* Image Metadata Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-white text-lg font-semibold mb-2">{selectedImage.alt}</p>
                    <div className="flex items-center gap-4 text-white/70 text-sm">
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full">
                        {images.findIndex(img => img.id === selectedImage.id) + 1} / {images.length}
                      </span>
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {title}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((img, idx) => (
              <div
                key={img.id}
                className={`h-1 rounded-full transition-all duration-300 ${
                  img.id === selectedImage.id 
                    ? 'w-12 bg-gradient-to-r from-rose-500 to-purple-500' 
                    : 'w-8 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default AlbumGallery2;