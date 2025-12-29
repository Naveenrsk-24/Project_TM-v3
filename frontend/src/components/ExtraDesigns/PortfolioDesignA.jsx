"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Camera, ArrowRight, Grid3x3 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PortfolioGallery({
  title = "Our Wedding Photography Portfolio",
  subtitle = "Portfolio Highlights",
  description = "Real emotions, vibrant celebrations, and timeless memories captured.",
  images = [],
  buttonLabel = "View Full Portfolio",
  buttonLink = "/portfolio",
  particleCount = 25,
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  /** -------------------------------------------------
   * MEMOIZED PARTICLES (Eliminates random re-renders)
   -------------------------------------------------- */
  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 6 + Math.random() * 8,
      })),
    [particleCount]
  );

  /** -------------------------------------------------
   * MOUNT ANIMATION
   -------------------------------------------------- */
  useEffect(() => {
    setIsMounted(true);
  }, []);

  /** -------------------------------------------------
   * GPU-ACCELERATED PARALLAX USING rAF
   -------------------------------------------------- */
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let frame = null;

    const handleMove = (e) => {
      if (!frame) {
        frame = requestAnimationFrame(() => {
          const xf = (e.clientX / window.innerWidth - 0.5) * 40;
          const yf = (e.clientY / window.innerHeight - 0.5) * 40;
          setParallax({ x: xf, y: yf });
          frame = null;
        });
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 overflow-hidden">

      {/* PARTICLES */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-float"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* PARALLAX ORBS */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-purple-500/20 blur-3xl rounded-full animate-pulse"
          style={{
            transform: `translate3d(${parallax.x * 0.3}px, ${parallax.y * 0.3}px, 0)`,
            top: "15%",
            left: "10%",
          }}
        />

        <div
          className="absolute w-[30rem] h-[30rem] bg-pink-500/20 blur-3xl rounded-full animate-pulse"
          style={{
            transform: `translate3d(${parallax.x * -0.3}px, ${parallax.y * -0.3}px, 0)`,
            bottom: "15%",
            right: "10%",
          }}
        />
      </div>

      {/* HERO SECTION */}
      <div className="relative pt-20 pb-12 px-4">
        <div
          className="max-w-7xl mx-auto text-center relative z-10 transition-all duration-1000"
          style={{
            opacity: isMounted ? 1 : 0,
            transform: isMounted ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full mb-6 border border-white/10">
            <Camera className="w-4 h-4 text-violet-300" />
            <span className="text-sm text-slate-200">{subtitle}</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-serif text-slate-100 mb-4">
            {title}
          </h2>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            {description}
          </p>
        </div>
      </div>

      {/* GALLERY GRID */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-4">

          {images.map((image, i) => (
            <div
              key={image.id}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 ${
                image.span || "row-span-1"
              }`}
              style={{
                opacity: isMounted ? 1 : 0,
                transform: isMounted ? "translateY(0)" : "translateY(30px)",
                transitionDelay: `${i * 50}ms`,
              }}
              onMouseEnter={() => setHoveredId(image.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* NEXT IMAGE */}
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width:768px) 50vw, (max-width:1200px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority={i < 4}
              />

              {/* OVERLAY */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-500 ${
                  hoveredId === image.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="absolute bottom-0 p-4">
                  <p className="text-white text-sm">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <div className="flex justify-center mt-16">
          <Link href={buttonLink}>
            <button className="group relative px-10 py-5 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <span className="relative flex items-center gap-3">
                <Grid3x3 className="w-5 h-5 transition-transform duration-500 group-hover:rotate-90" />
                {buttonLabel}
                <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" />
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* FLOAT ANIMATION */}
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
}
