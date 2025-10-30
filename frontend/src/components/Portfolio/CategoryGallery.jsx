// src/components/Portfolio/CategoryGallery.jsx
"use client";
import React, { useState, useEffect } from "react";
import { Camera, ArrowRight, FolderOpen, Heart } from "lucide-react";
import Link from "next/link";

/**
 * Renders a grid of album covers for a specific portfolio category.
 * @param {object} props
 * @param {string} props.category - The display name of the current category (e.g., "Pre Weddings").
 * @param {string} props.slug - The URL slug of the current category (e.g., "pre-weddings").
 * @param {Array<Object>} props.albums - List of album objects to display.
 */
const CategoryGallery = ({ category, slug, albums = [] }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100" aria-labelledby="category-gallery-heading">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-24 pb-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/50 to-transparent"></div>

        <div
          className={`max-w-7xl mx-auto text-center relative z-10 transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg mb-6" role="status">
            <Camera className="w-4 h-4 text-amber-600" aria-hidden="true" />
            <span className="text-sm font-medium text-neutral-700 uppercase">
              {category} Albums
            </span>
          </div>

          <h1 id="category-gallery-heading" className="text-5xl md:text-7xl font-serif text-neutral-800 mb-4 tracking-tight">
            {category} Gallery
          </h1>

          <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            A curated collection of our finest moments captured through the lens in the **{category}** style.
          </p>
        </div>
      </div>

      {/* Albums Grid (Responsive 2-3-4 Grid) */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {albums.map((album, index) => (
            <Link
              key={album.id}
              href={`/portfolio/${slug}/${album.slug}`}
              className={`group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-700 transform block 
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${index * 50}ms` }}
              onMouseEnter={() => setHoveredId(album.id)}
              onMouseLeave={() => setHoveredId(null)}
              aria-label={`View album: ${album.title}`}
            >
              {/* Image */}
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
                <img
                  src={album.coverImage}
                  alt={album.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500 ${
                  hoveredId === album.id ? "opacity-100" : "opacity-100 md:opacity-0" // Always visible on mobile
                }`}
              >
                <div className="absolute bottom-0 left-0 right-0 p-5 transform transition-transform duration-500 group-hover:translate-y-0 translate-y-4 md:translate-y-4">
                  {album.isFeatured && (
                     <span className="inline-flex items-center gap-2 mb-2 px-3 py-1 text-xs font-semibold text-rose-50 bg-rose-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <Heart className="w-3 h-3" aria-hidden="true" /> Featured
                     </span>
                  )}
                  <h2 className="text-xl font-bold text-white mb-1 transition-all duration-500 transform group-hover:translate-y-0">
                    {album.title}
                  </h2>
                  <p className="text-sm text-white/90 transition-all duration-500 delay-100 transform group-hover:translate-y-0">
                    By: {album.photographer}
                  </p>
                </div>

                {/* Corner Accent / View Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 transition-all duration-500 transform scale-75 group-hover:scale-100">
                  <FolderOpen className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Categories Button */}
        <div className="flex justify-center mt-16">
          <Link href="/portfolio">
            <button className="group relative px-10 py-5 bg-white border-2 border-neutral-300 text-neutral-800 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-[1.02] overflow-hidden hover:border-amber-500 hover:text-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-500/50">
              <span className="relative flex items-center gap-3">
                <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:-translate-x-1" />
                Back to All Categories
                <FolderOpen className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryGallery;