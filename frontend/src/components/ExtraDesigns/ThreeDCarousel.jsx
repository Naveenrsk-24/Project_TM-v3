"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Heart, Share2, Download } from 'lucide-react';

const ThreeDCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [likedImages, setLikedImages] = useState(new Set());

  const weddingImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
      title: 'Sacred Vows',
      description: 'The moment two souls become one',
      event: 'Wedding Ceremony',
      location: 'Chennai'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&q=80',
      title: 'Eternal Promise',
      description: 'A promise sealed with love',
      event: 'Ring Exchange',
      location: 'Mahabalipuram'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200&q=80',
      title: 'Bridal Elegance',
      description: 'Radiant beauty on her special day',
      event: 'Bridal Portraits',
      location: 'Bangalore'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80',
      title: 'Traditional Rituals',
      description: 'Honoring timeless traditions',
      event: 'Ceremony Rituals',
      location: 'Mumbai'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1595434091143-b375ced5fe5c?w=1200&q=80',
      title: 'Joyous Celebration',
      description: 'Surrounded by love and laughter',
      event: 'Reception',
      location: 'Hyderabad'
    }
  ];

  useEffect(() => {
    if (!isAutoPlay || isHovered) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % weddingImages.length);
    }, 4000);
    
    return () => clearInterval(timer);
  }, [isAutoPlay, isHovered, weddingImages.length]);

  const getItemStyle = (index) => {
    const total = weddingImages.length;
    const diff = (index - currentIndex + total) % total;
    
    if (diff === 0) {
      return {
        transform: 'translateX(0%) scale(1.15) translateZ(0px) rotateY(0deg)',
        zIndex: 50,
        opacity: 1,
        filter: 'brightness(1)'
      };
    } else if (diff === 1 || diff === -total + 1) {
      return {
        transform: 'translateX(70%) scale(0.85) translateZ(-150px) rotateY(-25deg)',
        zIndex: 30,
        opacity: 0.7,
        filter: 'brightness(0.7)'
      };
    } else if (diff === -1 || diff === total - 1) {
      return {
        transform: 'translateX(-70%) scale(0.85) translateZ(-150px) rotateY(25deg)',
        zIndex: 30,
        opacity: 0.7,
        filter: 'brightness(0.7)'
      };
    } else if (diff === 2 || diff === -total + 2) {
      return {
        transform: 'translateX(100%) scale(0.6) translateZ(-300px) rotateY(-45deg)',
        zIndex: 10,
        opacity: 0.4,
        filter: 'brightness(0.5)'
      };
    } else {
      return {
        transform: 'translateX(-100%) scale(0.6) translateZ(-300px) rotateY(45deg)',
        zIndex: 10,
        opacity: 0.4,
        filter: 'brightness(0.5)'
      };
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + weddingImages.length) % weddingImages.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % weddingImages.length);
  };

  const toggleLike = (id) => {
    setLikedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const currentImage = weddingImages[currentIndex];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden py-20">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Wedding Moments
          </h2>
          <p className="text-white/70 text-lg">Experience the magic in 3D perspective</p>
        </div>

        {/* 3D Carousel Container */}
        <div 
          className="relative h-[500px] md:h-[600px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ perspective: '2000px' }}
        >
          {weddingImages.map((image, index) => (
            <div
              key={image.id}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[400px] h-[400px] md:h-[550px] transition-all duration-700 ease-out cursor-pointer"
              style={getItemStyle(index)}
              onClick={() => setCurrentIndex(index)}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl group">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Content - Only visible on center image */}
                {index === currentIndex && (
                  <div className="absolute inset-0 flex flex-col justify-end p-6 animate-[fadeInUp_0.6s_ease-out]">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs mb-3">
                        {image.event} • {image.location}
                      </span>
                      <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">
                        {image.title}
                      </h3>
                      <p className="text-white/80 text-sm md:text-base">
                        {image.description}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(image.id);
                        }}
                        className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 ${
                          likedImages.has(image.id)
                            ? 'bg-pink-500 text-white scale-110'
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${likedImages.has(image.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all duration-300">
                        <Share2 className="w-5 h-5" />
                      </button>
                      <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all duration-300">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Shine Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-6 mt-12">
          <button
            onClick={handlePrev}
            className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Slide Indicators */}
          <div className="flex gap-2">
            {weddingImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === index
                    ? 'w-12 h-3 bg-gradient-to-r from-pink-500 to-purple-500'
                    : 'w-3 h-3 bg-white/30 hover:bg-white/50'
                }`}
              ></button>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300"
          >
            {isAutoPlay ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
        </div>

        {/* Counter */}
        <div className="text-center mt-8">
          <span className="text-white/60 text-lg">
            {currentIndex + 1} / {weddingImages.length}
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ThreeDCarousel;