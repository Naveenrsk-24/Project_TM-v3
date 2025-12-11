"use client";

import React, { useState, useEffect } from "react";
import { Camera, ArrowRight, Grid3x3 } from "lucide-react";
import Link from "next/link";

const USER_IMAGE_URL = "/hero_lossless.webp";

const portfolioImages = [
  { id: 1, src: USER_IMAGE_URL, alt: "Couple in garden", span: "row-span-2" },
  { id: 2, src: USER_IMAGE_URL, alt: "Couple at doorway", span: "row-span-1" },
  { id: 3, src: USER_IMAGE_URL, alt: "Wedding celebration", span: "row-span-2" },
  { id: 4, src: USER_IMAGE_URL, alt: "Traditional portrait", span: "row-span-1" },
  { id: 5, src: USER_IMAGE_URL, alt: "Couple at beach", span: "row-span-1" },
  { id: 6, src: USER_IMAGE_URL, alt: "Elegant bride", span: "row-span-2" },
  { id: 7, src: USER_IMAGE_URL, alt: "White architecture", span: "row-span-1" },
  { id: 8, src: USER_IMAGE_URL, alt: "Outdoor ceremony", span: "row-span-2" },
  { id: 9, src: USER_IMAGE_URL, alt: "Garden wedding", span: "row-span-2" },
  { id: 10, src: USER_IMAGE_URL, alt: "Couple at balcony", span: "row-span-1" },
  { id: 11, src: USER_IMAGE_URL, alt: "Temple silhouette", span: "row-span-1" },
];

const PortfolioGallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  // NEW: Mouse-parallax + spotlight system
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const particles = Array.from({ length: 25 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMove = (e) => {
      const xf = (e.clientX / window.innerWidth - 0.5) * 40;
      const yf = (e.clientY / window.innerHeight - 0.5) * 40;

      setMousePos({ x: e.clientX, y: e.clientY });
      setParallax({ x: xf, y: yf });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 overflow-hidden">

      {/* ===================================================== */}
      {/* ✨ FLOATING PARTICLES */}
      {/* ===================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 8}s`,
            }}
          ></span>
        ))}
      </div>

      {/* ===================================================== */}
      {/* 🌈 MOUSE-PARALLAX GLOWING ORBS */}
      {/* ===================================================== */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-purple-500/20 blur-3xl rounded-full animate-pulse"
          style={{
            top: `calc(15% + ${parallax.y * 0.3}px)`,
            left: `calc(10% + ${parallax.x * 0.3}px)`,
          }}
        ></div>

        <div
          className="absolute w-[30rem] h-[30rem] bg-pink-500/20 blur-3xl rounded-full animate-pulse"
          style={{
            bottom: `calc(15% - ${parallax.y * 0.3}px)`,
            right: `calc(10% - ${parallax.x * 0.3}px)`,
            animationDelay: "0.8s",
          }}
        ></div>
      </div>

      {/* ===================================================== */}
      {/* 🔦 SPOTLIGHT FOLLOWING CURSOR */}
      {/* ===================================================== */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            300px at ${mousePos.x}px ${mousePos.y}px,
            rgba(255,255,255,0.17),
            transparent 70%
          )`,
          transition: "background 0.08s ease-out",
        }}
      ></div>

      {/* ===================================================== */}
      {/* HERO SECTION */}
      {/* ===================================================== */}
      <div className="relative overflow-hidden pt-20 pb-12 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-800/20 to-transparent"></div>

        <div
          className={`max-w-7xl mx-auto text-center relative z-10 transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full shadow-sm mb-6 border border-white/10">
            <Camera className="w-4 h-4 text-violet-300" />
            <span className="text-sm font-medium text-slate-200">Portfolio Highlights</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-serif text-slate-100 mb-4 tracking-tight">
            Our Wedding Photography Portfolio
          </h2>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Real emotions, vibrant celebrations, and timeless memories captured for couples in Chennai and beyond.
          </p>
        </div>
      </div>

      {/* ===================================================== */}
      {/* MASONRY GRID */}
      {/* ===================================================== */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-4">
          {portfolioImages.map((image, index) => (
            <div
              key={image.id}
              className={`group relative overflow-hidden rounded-2xl ${image.span} cursor-pointer transition-all duration-700 transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
              onMouseEnter={() => setHoveredId(image.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
              </div>

              {/* Hover Overlay */}
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
              <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-white/40 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100"></div>
            </div>
          ))}
        </div>

        {/* View Portfolio Button */}
        <div className="flex justify-center mt-16">
          <Link href="/portfolio">
            <button className="group relative px-10 py-5 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full font-medium text-lg shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden">

              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <span className="relative flex items-center gap-3">
                <Grid3x3 className="w-5 h-5 transition-transform duration-500 group-hover:rotate-90" />
                View Full Portfolio
                <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" />
              </span>

              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
            </button>
          </Link>
        </div>
      </div>

      {/* ANIMATIONS */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0); opacity: 0.4; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-60px); opacity: 0.1; }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PortfolioGallery;
