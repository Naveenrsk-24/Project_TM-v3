"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

const ThreeDCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const weddingImages = useMemo(
    () => [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
        title: "Rahul Kumar",
        description: "Lead Wedding Photographer • 10+ Years Experience",
        event: "Lead Photographer",
        location: "Chennai",
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&q=80",
        title: "Ananya Sharma",
        description: "Candid Photography Specialist & Creative Lead",
        event: "Candid Specialist",
        location: "Bangalore",
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200&q=80",
        title: "Vikram Singh",
        description: "Head Videographer • Cinematic Wedding Films",
        event: "Cinematographer",
        location: "Hyderabad",
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80",
        title: "Sneha Patel",
        description: "Pre-Wedding Shoot Expert & Concept Designer",
        event: "Pre-Wedding Specialist",
        location: "Mumbai",
      },
      {
        id: 5,
        url: "https://images.unsplash.com/photo-1595434091143-b375ced5fe5c?w=1200&q=80",
        title: "Arjun Mehta",
        description: "Assistant Photographer • Drone & Outdoor Specialist",
        event: "Drone Specialist",
        location: "Chennai",
      },
    ],
    []
  );

  // ---------------- AUTO PLAY ----------------
  useEffect(() => {
    if (!isAutoPlay || isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % weddingImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isAutoPlay, isHovered, weddingImages.length]);

  // ---------------- POSITION CLASS ----------------
  const getPositionClass = useCallback(
    (index) => {
      const total = weddingImages.length;
      const diff = (index - currentIndex + total) % total;

      if (diff === 0) return "carousel-center";
      if (diff === 1) return "carousel-right";
      if (diff === total - 1) return "carousel-left";
      if (diff === 2) return "carousel-right-far";
      if (diff === total - 2) return "carousel-left-far";

      return "carousel-left-far";
    },
    [currentIndex, weddingImages.length]
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden py-16">
      {/* BG BLOBS */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-md border border-purple-400/40 shadow-lg shadow-purple-500/20 mb-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500" />
            </span>
            <span className="text-xs font-black text-white tracking-[0.2em] uppercase">
              Our Approach
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-black">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-100">
              Why Choose{" "}
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300">
              Our Wedding Photography
            </span>
          </h2>
        </div>

        {/* CAROUSEL */}
        <div
          className="relative h-[430px] md:h-[500px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ perspective: "2000px" }}
        >
          {weddingImages.map((image, index) => (
            <div
              key={image.id}
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                w-[240px] md:w-[330px] h-[330px] md:h-[450px]
                transition-all duration-700 ease-out cursor-pointer
                ${getPositionClass(index)}
              `}
              onClick={() => setCurrentIndex(index)}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl group">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                {index === currentIndex && (
                  <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 animate-fadeInUp">
                    <div className="mb-3 md:mb-4">
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs mb-3">
                        {image.event} • {image.location}
                      </span>
                      <h3 className="text-white text-xl md:text-2xl font-bold mb-1">
                        {image.title}
                      </h3>
                      <p className="text-white/80 text-sm md:text-base">
                        {image.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* Shine Effect */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                  -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* CONTROLS */}
        <div className="flex justify-center items-center gap-6 mt-12">
          <button
            onClick={() =>
              setCurrentIndex(
                (prev) =>
                  (prev - 1 + weddingImages.length) % weddingImages.length
              )
            }
            className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Indicators */}
          <div className="flex gap-2">
            {weddingImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === index
                    ? "w-12 h-3 bg-gradient-to-r from-pink-500 to-purple-500"
                    : "w-3 h-3 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev + 1) % weddingImages.length)
            }
            className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <button
            onClick={() => setIsAutoPlay((prev) => !prev)}
            className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300"
          >
            {isAutoPlay ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Counter */}
        <div className="text-center mt-6">
          <span className="text-white/60 text-base md:text-lg">
            {currentIndex + 1} / {weddingImages.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ThreeDCarousel);
