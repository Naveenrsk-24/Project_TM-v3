"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";

// Optimization 4: Use React.memo to prevent unnecessary re-renders
function HeroSection() {
  return (
    <section
      // Mobile-First (Guideline 1): min-h-screen ensures full height on mobile
      className="relative w-full min-h-screen flex flex-col-reverse md:flex-row items-center justify-between overflow-hidden px-4 sm:px-8 md:px-16 py-12 md:py-0"
      aria-label="Wedding photography hero section"
    >
      {/* 1. LCP Image (Optimization 1 & 2):
          - priority: CRITICAL for LCP discovery.
          - sizes: "100vw" is correct for a full-screen background.
          - NOTE: A manual <link rel="preload"> in the document head is still highly recommended to bypass the 7.2s LCP.
      */}
      <Image
        src="/Weddings/groom-putting-ring-bride-s-finger.webp"
        alt="Groom putting ring on bride's finger"
        fill
        priority
        quality={85} // Optimization 2: Compression
        sizes="100vw"
        className="object-cover object-center -z-10 rounded-tr-lg rounded-bl-lg"
      />

      {/* Optimized Overlay (Step 2: Accessibility: Provides contrast for text) */}
      <div
        className="absolute inset-0 bg-black/50 -z-10"
        aria-hidden="true"
      />

      {/* Left Content (LCP text block) */}
      <div className="relative z-10 text-white text-center md:text-left max-w-xl space-y-4">
        {/* LCP Text */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
          Happiest <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500">Birthday</span> Subalesh📸
        </h1>
        {/* Accessibility (Guideline 3): Changed to text-white for assured 4.5:1 contrast */}
        <p className="text-base sm:text-lg md:text-xl text-white">
         Happy Birthday, Subalesh!<br/> May this new beginning bring you the kind of stunning, <br/>frame-worthy success you've always worked for. Keep creating!
        </p>
        <Link href="/booking" aria-label="Book a wedding photography session">
        <button
          // Mobile-First & Accessibility (Guideline 1 & 3): Min-size for touch target + focus ring
          className="mt-4 px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-500 hover:bg-pink-600 text-white font-semibold rounded-full transition-transform hover:scale-105 duration-200 min-w-[44px] min-h-[44px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-pink-300 focus-visible:ring-offset-2 cursor-pointer"
          aria-label="Book a wedding photography session"
        >
          Time to shoot 🎂
        </button>
        </Link>
      </div>

      {/* Portrait Photo Frame (Not LCP) */}
      <div className="relative z-10 mb-8 md:mb-0 md:flex items-center justify-center w-full sm:w-[350px] md:w-[500px] h-[400px] sm:h-[450px] md:h-[580px] border-[6px] border-white shadow-2xl overflow-hidden rounded-tr-[50px] rounded-bl-[50px]">
        <Image
          src="/HBD/bottomsup.avif"
          alt="Bride holding bouquet"
          fill
          loading="lazy" // Optimization 2: Default for next/image, but good to remember
          quality={85}
          sizes="(max-width: 768px) 100vw, 500px" 
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}

export default React.memo(HeroSection);