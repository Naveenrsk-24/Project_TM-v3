"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";

function HeroSection() {
  return (
    <section
      className="relative w-full min-h-screen flex flex-col-reverse md:flex-row items-center justify-between overflow-hidden px-4 sm:px-8 md:px-16 py-12 md:py-0"
      aria-label="Wedding photography hero section"
    >
      <Image
        src="/Weddings/groom-putting-ring-bride-s-finger.webp"
        alt="Groom putting ring on bride's finger"
        fill
        priority
        quality={85}
        sizes="100vw"
        className="object-cover object-center -z-10 rounded-tr-lg rounded-bl-lg"
      />

      <div className="absolute inset-0 bg-black/50 -z-10" aria-hidden="true" />

      <div className="relative z-10 text-white text-center md:text-left max-w-xl space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-[2.35rem] font-serif font-bold leading-tight">
          Best Wedding Photographers <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500">
            in Chennai
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-[18px] text-white  font-serif">
          At TM Studios Photography, we turn your once-in-a-lifetime memories into timeless stories. 
          From vibrant South Indian weddings to intimate celebrations, we capture your emotions in 
          their purest form — with a blend of cinematic, candid, traditional, and colorful photography 
          styles.
        </p>

        <Link href="/booking" aria-label="Book a wedding photography session">
          <button
            className="mt-4 px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-500 hover:bg-pink-600 text-white font-semibold font-serif rounded-full transition-transform hover:scale-105 duration-200 min-w-[44px] min-h-[44px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-300 focus-visible:ring-offset-2 cursor-pointer"
            aria-label="Book a wedding photography session"
          >
            Let’s Capture Your Story
          </button>
        </Link>
      </div>

      <div className="relative z-10 mb-8 md:mb-0 md:flex items-center justify-center w-full sm:w-[350px] md:w-[500px] h-[400px] sm:h-[450px] md:h-[580px] border-[6px] border-white shadow-2xl overflow-hidden rounded-tr-[50px] rounded-bl-[50px]">
        <Image
          src="/Weddings/beautiful-husband-wife-posing-beach.webp"
          alt="Bride holding bouquet"
          fill
          loading="lazy"
          quality={85}
          sizes="(max-width: 768px) 100vw, 500px"
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}

export default React.memo(HeroSection);
