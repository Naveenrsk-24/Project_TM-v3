// src/components/Portfolio/AlbumGallery.jsx
"use client";

import React, { useState, useEffect } from "react";
import { Camera, MapPin, Calendar, Heart } from "lucide-react";
import Link from "next/link";

/**
 * Renders the full gallery for an individual album.
 * @param {object} props
 * @param {object} props.albumData - The data object containing album details and images.
 */
const AlbumGallery = ({ albumData }) => {
  const { title, category, location, date, description, images } = albumData;
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="min-h-screen bg-neutral-900" aria-labelledby="album-title">
      
      {/* Hero Header */}
      <div className="relative overflow-hidden pt-24 pb-16 px-4 bg-black/80">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" 
             style={{ backgroundImage: `url(${images[0]?.src || ''})` }}>
        </div>
        
        <div
          className={`max-w-7xl mx-auto relative z-10 text-center transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Breadcrumb / Category Link */}
          <Link 
            href={`/portfolio/${category.toLowerCase().replace(/\s/g, '-')}`} 
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors mb-4"
          >
            <Camera className="w-4 h-4" aria-hidden="true" />
            <span className="uppercase tracking-wider">{category}</span>
          </Link>

          <h1 id="album-title" className="text-5xl md:text-7xl font-serif text-white mb-4 tracking-tight">
            {title}
          </h1>

          <p className="text-lg text-neutral-300 max-w-3xl mx-auto leading-relaxed mb-8">
            {description}
          </p>
          
          {/* Metadata */}
          <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-neutral-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500" aria-hidden="true" />
              <span className="text-sm font-medium">{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-rose-500" aria-hidden="true" />
              <span className="text-sm font-medium">{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" aria-hidden="true" />
              <span className="text-sm font-medium">Captured with Love</span>
            </div>
          </div>
        </div>
      </div>

      {/* Masonry Image Grid */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-[200px] gap-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`group relative overflow-hidden rounded-lg shadow-xl ${
                image.span
              } cursor-pointer transition-all duration-700 transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              } hover:scale-[1.01]`}
              style={{ transitionDelay: `${index * 50}ms` }}
              onMouseEnter={() => setHoveredId(image.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
                {/* Lazy loading is crucial for galleries */}
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay for interaction/lightbox prompt */}
              <div
                className={`absolute inset-0 bg-black/50 transition-opacity duration-500 flex items-center justify-center ${
                  hoveredId === image.id ? "opacity-100" : "opacity-0"
                }`}
              >
                 <div className="p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <button 
                        className="bg-amber-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform hover:scale-110"
                        aria-label={`View ${image.alt} in lightbox`}
                    >
                        <i className="lucide lucide-maximize-2 w-5 h-5"></i>
                    </button>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AlbumGallery;