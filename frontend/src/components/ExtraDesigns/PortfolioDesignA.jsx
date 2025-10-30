"use client";

import React, { useState, useEffect } from "react";
import { Camera, ArrowRight, Grid3x3 } from "lucide-react";
import Link from "next/link";

// The image URL provided by the user
const USER_IMAGE_URL = "/Weddings/beautiful-husband-wife-posing-beach.webp";

// Sample portfolio data - replace with your actual data
const portfolioImages = [
  // All 'src' values have been replaced with the USER_IMAGE_URL
  { id: 1, src: USER_IMAGE_URL, alt: "Couple in garden", span: "row-span-2" },
  { id: 2, src: USER_IMAGE_URL, alt: "Couple at doorway", span: "row-span-1" },
  {
    id: 3,
    src: USER_IMAGE_URL,
    alt: "Wedding celebration",
    span: "row-span-2",
  },
  {
    id: 4,
    src: USER_IMAGE_URL,
    alt: "Traditional portrait",
    span: "row-span-1",
  },
  { id: 5, src: USER_IMAGE_URL, alt: "Couple at beach", span: "row-span-1" },
  { id: 6, src: USER_IMAGE_URL, alt: "Elegant bride", span: "row-span-2" },
  { id: 7, src: USER_IMAGE_URL, alt: "White architecture", span: "row-span-1" },
  { id: 8, src: USER_IMAGE_URL, alt: "Outdoor ceremony", span: "row-span-2" },
  { id: 9, src: USER_IMAGE_URL, alt: "Garden wedding", span: "row-span-2" },
  { id: 10, src: USER_IMAGE_URL, alt: "Couple at balcony", span: "row-span-1" },
  { id: 11, src: USER_IMAGE_URL, alt: "Temple silhouette", span: "row-span-1" },
  { id: 12, src: USER_IMAGE_URL, alt: "Historic location", span: "row-span-2" },
  { id: 13, src: USER_IMAGE_URL, alt: "Couple embrace", span: "row-span-1" },
  {
    id: 14,
    src: USER_IMAGE_URL,
    alt: "Traditional ceremony",
    span: "row-span-2",
  },
  { id: 15, src: USER_IMAGE_URL, alt: "Scenic backdrop", span: "row-span-1" },
  { id: 16, src: USER_IMAGE_URL, alt: "Beach romance", span: "row-span-2" },
  {
    id: 17,
    src: USER_IMAGE_URL,
    alt: "Rice field setting",
    span: "row-span-2",
  },
  { id: 18, src: USER_IMAGE_URL, alt: "Hillside couple", span: "row-span-1" },
];

const PortfolioGallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20 pb-12 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/50 to-transparent"></div>

        <div
          className={`max-w-7xl mx-auto text-center relative z-10 transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-sm mb-6">
            <Camera className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-neutral-700">
              Our Portfolio
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif text-neutral-800 mb-4 tracking-tight">
            Selected Works
          </h1>

          <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            A curated collection of our finest moments captured through the lens
          </p>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-4">
          {portfolioImages.map((image, index) => (
            <div
              key={image.id}
              className={`group relative overflow-hidden rounded-2xl ${
                image.span
              } cursor-pointer transition-all duration-700 transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
              onMouseEnter={() => setHoveredId(image.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
                <img
                  src={image.src}
                  alt={image.alt}
                  // The masonry grid styling will still provide variation in size/aspect ratio
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-500 ${
                  hoveredId === image.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {image.alt}
                  </p>
                </div>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-white/50 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100"></div>
            </div>
          ))}
        </div>

        {/* View Portfolio Button */}
        <div className="flex justify-center mt-16">
          <Link href="/portfolio">
            <button className="group relative px-10 py-5 bg-gradient-to-r from-pink-600 to-rose-500 text-white rounded-full font-medium text-lg shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Button Content */}
              <span className="relative flex items-center gap-3">
                <Grid3x3 className="w-5 h-5 transition-transform duration-500 group-hover:rotate-90" />
                View Full Portfolio
                <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" />
              </span>

              {/* Shine Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
            </button>
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div
        className="fixed bottom-20 right-10 w-40 h-40 bg-rose-200/20 rounded-full blur-3xl pointer-events-none animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
    </div>
  );
};

export default PortfolioGallery;
