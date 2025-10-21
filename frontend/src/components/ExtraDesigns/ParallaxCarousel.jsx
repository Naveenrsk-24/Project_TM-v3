"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Heart, Camera, Calendar, MapPin, ArrowRight, Sparkles } from 'lucide-react';

const ParallaxCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);

  const weddingEvents = [
    {
      id: 1,
      mainImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
      detailImage: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
      title: 'The Grand Ceremony',
      subtitle: 'A celebration of eternal love',
      description: 'Witness the sacred moment where two hearts unite in a beautiful traditional ceremony filled with blessings and joy.',
      date: 'December 15, 2024',
      location: 'Heritage Palace, Chennai',
      photographer: 'Captured by Zero Gravity',
      details: {
        guests: '500+',
        duration: '8 Hours',
        style: 'Traditional & Candid'
      }
    },
    {
      id: 2,
      mainImage: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&q=80',
      detailImage: 'https://images.unsplash.com/photo-1623642594165-f15b30a5e89d?w=800&q=80',
      title: 'Romantic Pre-Wedding',
      subtitle: 'Love story in frames',
      description: 'A dreamy pre-wedding shoot capturing the essence of their love story against breathtaking backdrops and golden sunsets.',
      date: 'November 20, 2024',
      location: 'Beach Resort, Mahabalipuram',
      photographer: 'Captured by Zero Gravity',
      details: {
        guests: 'Couple Only',
        duration: '4 Hours',
        style: 'Cinematic & Romantic'
      }
    },
    {
      id: 3,
      mainImage: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200&q=80',
      detailImage: 'https://images.unsplash.com/photo-1594552072238-b8d152926f85?w=800&q=80',
      title: 'Bridal Elegance',
      subtitle: 'The beauty of tradition',
      description: 'Exquisite bridal portraits showcasing intricate details, traditional attire, and the radiant glow of a bride on her special day.',
      date: 'December 10, 2024',
      location: 'Studio & Palace Grounds',
      photographer: 'Captured by Zero Gravity',
      details: {
        guests: 'Bridal Party',
        duration: '3 Hours',
        style: 'Editorial & Fine Art'
      }
    },
    {
      id: 4,
      mainImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80',
      detailImage: 'https://images.unsplash.com/photo-1525258112551-afdb0a54e6d8?w=800&q=80',
      title: 'Sacred Rituals',
      subtitle: 'Honoring traditions',
      description: 'Capturing the essence of time-honored rituals and ceremonies that bind families and create lasting memories.',
      date: 'December 15, 2024',
      location: 'Temple Hall, Bangalore',
      photographer: 'Captured by Zero Gravity',
      details: {
        guests: '300+',
        duration: '6 Hours',
        style: 'Documentary & Traditional'
      }
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + 0.5;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [currentIndex]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % weddingEvents.length);
    setProgress(0);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const currentEvent = weddingEvents[currentIndex];
  const parallaxX = (mousePosition.x - 0.5) * 40;
  const parallaxY = (mousePosition.y - 0.5) * 40;

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-black overflow-hidden"
    >
      {/* Main Split Container */}
      <div className="relative h-screen flex flex-col lg:flex-row">
        
        {/* Left Side - Main Image with Parallax */}
        <div className="relative lg:w-1/2 h-1/2 lg:h-full overflow-hidden group">
          <div 
            className="absolute inset-0 transition-transform duration-700 ease-out"
            style={{
              transform: `translate(${parallaxX}px, ${parallaxY}px) scale(1.1)`
            }}
          >
            <img
              src={currentEvent.mainImage}
              alt={currentEvent.title}
              className={`w-full h-full object-cover transition-all duration-1000 ${
                isTransitioning ? 'scale-110 blur-sm' : 'scale-100 blur-0'
              }`}
            />
          </div>

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/50 lg:to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

          {/* Floating Badge */}
          <div className="absolute top-8 left-8 animate-[fadeIn_1s_ease-out]">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-white text-sm font-medium">Featured Event</span>
            </div>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-8 left-8 animate-[fadeIn_1s_ease-out_0.3s_both]">
            <div className="text-white text-6xl font-bold opacity-20">
              {String(currentIndex + 1).padStart(2, '0')}
            </div>
            <div className="text-white/60 text-sm">
              of {String(weddingEvents.length).padStart(2, '0')}
            </div>
          </div>

          {/* Animated Border */}
          <div className="absolute inset-0 border-4 border-white/0 group-hover:border-white/10 transition-all duration-500"></div>
        </div>

        {/* Right Side - Content with Parallax Details */}
        <div className="relative lg:w-1/2 h-1/2 lg:h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center">
          
          {/* Detail Image Floating */}
          <div 
            className="absolute right-8 top-1/4 w-48 h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 hidden lg:block animate-[floatImage_6s_ease-in-out_infinite]"
            style={{
              transform: `translate(${-parallaxX * 0.5}px, ${-parallaxY * 0.5}px)`
            }}
          >
            <img
              src={currentEvent.detailImage}
              alt="Detail"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 lg:p-16 max-w-2xl">
            <div className={`transition-all duration-700 ${
              isTransitioning ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
            }`}>
              
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-pink-500/20 backdrop-blur-sm rounded-full border border-amber-500/30 mb-6">
                <Camera className="w-4 h-4 text-amber-400" />
                <span className="text-amber-300 text-sm font-medium">{currentEvent.photographer}</span>
              </div>

              {/* Title */}
              <h2 className="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                {currentEvent.title}
              </h2>
              <p className="text-2xl text-transparent bg-gradient-to-r from-amber-400 to-pink-400 bg-clip-text mb-6 font-light">
                {currentEvent.subtitle}
              </p>

              {/* Description */}
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                {currentEvent.description}
              </p>

              {/* Event Details */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Calendar className="w-5 h-5 text-pink-400" />
                  </div>
                  <div>
                    <div className="text-white/50 text-xs mb-1">Date</div>
                    <div className="text-white text-sm font-medium">{currentEvent.date}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <MapPin className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-white/50 text-xs mb-1">Location</div>
                    <div className="text-white text-sm font-medium">{currentEvent.location}</div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-6 mb-8">
                {Object.entries(currentEvent.details).map(([key, value], index) => (
                  <div key={key} className="animate-[fadeIn_0.6s_ease-out_both]" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="text-white/50 text-xs mb-1 uppercase tracking-wider">{key}</div>
                    <div className="text-white text-lg font-semibold">{value}</div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-pink-500 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105">
                View Full Gallery
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Thumbnails */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {weddingEvents.map((event, index) => (
              <button
                key={event.id}
                onClick={() => {
                  if (index !== currentIndex) {
                    setIsTransitioning(true);
                    setCurrentIndex(index);
                    setProgress(0);
                    setTimeout(() => setIsTransitioning(false), 800);
                  }
                }}
                className={`relative flex-shrink-0 group ${
                  currentIndex === index ? 'ring-2 ring-pink-500' : ''
                }`}
              >
                <div className="w-24 h-24 rounded-lg overflow-hidden">
                  <img
                    src={event.mainImage}
                    alt={event.title}
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      currentIndex === index 
                        ? 'scale-100 brightness-100' 
                        : 'scale-90 brightness-50 group-hover:brightness-75'
                    }`}
                  />
                </div>
                {currentIndex === index && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-pink-500">
                    <div 
                      className="h-full bg-white"
                      style={{ width: `${progress}%`, transition: 'width 0.03s linear' }}
                    ></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatImage {
          0%, 100% {
            transform: translateY(0) rotate(2deg);
          }
          50% {
            transform: translateY(-20px) rotate(-2deg);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ParallaxCarousel;