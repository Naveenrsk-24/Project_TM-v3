"use client";

import Image from "next/image";
import React from "react"; // 👈 Optimization 4: Import React for memoization

// Optimization 4: Use React.memo to prevent unnecessary re-renders
function HeroSection() {
  return (
    <section
      className="relative w-full min-h-screen flex flex-col-reverse md:flex-row items-center justify-between overflow-hidden px-4 sm:px-8 md:px-16 py-12 md:py-0"
      aria-label="Wedding photography hero section"
    >
      {/* ✅ LCP Image Optimization (Steps 1 & 2): 
        - priority: Kept on the background image (likely LCP).
        - sizes: CRITICAL addition to tell Next.js/browser the image will span 100% of the viewport width. 
      */}
      <Image
        src="/Weddings/groom-putting-ring-bride-s-finger.webp"
        alt="Groom putting ring on bride's finger"
        fill
        priority
        quality={85}
        sizes="100vw" // 👈 HIGH PRIORITY: Speeds up image loading for LCP
        className="object-cover object-center -z-10 rounded-tr-lg rounded-bl-lg"
      />

      {/* ✅ Optimized Overlay */}
      <div
        className="absolute inset-0 bg-black/50 -z-10"
        aria-hidden="true"
      />

      {/* ✅ Left Content (LCP text block) */}
      <div className="relative z-10 text-white text-center md:text-left max-w-xl space-y-4">
        {/* LCP Text */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
          Capturing <span className="text-pink-300">Timeless</span> Moments
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-200">
          Wedding photography that tells your story — naturally, beautifully, and forever.
        </p>
        <button
          className="mt-4 px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-500 hover:bg-pink-600 text-white font-semibold rounded-full transition-transform hover:scale-105 duration-200"
          aria-label="Book a wedding photography session"
        >
          Book a Session
        </button>
      </div>

      {/* ✅ Portrait Photo Frame Optimization (Step 2): 
        - priority: REMOVED. This image is not the LCP, so it should not be eagerly loaded, freeing up bandwidth for the background image and LCP text.
        - sizes: Added a simple size set to help the browser load the right resolution.
      */}
      <div className="relative z-10 mb-8 md:mb-0 md:flex items-center justify-center w-full sm:w-[350px] md:w-[500px] h-[400px] sm:h-[450px] md:h-[580px] border-[6px] border-white shadow-2xl overflow-hidden rounded-tr-[50px] rounded-bl-[50px]">
        <Image
          src="/Weddings/beautiful-husband-wife-posing-beach.webp"
          alt="Bride holding bouquet"
          fill
          // priority REMOVED 👈 HIGH PRIORITY: Reduces competing requests for LCP
          quality={85}
          sizes="(max-width: 768px) 100vw, 500px" // 👈 Added size optimization
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}

export default React.memo(HeroSection); // 👈 Optimization 4: Export with memo