"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function HeroSection() {
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { x: 120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
            end: "top 40%",
            scrub: false,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative w-full min-h-screen flex flex-col 
                justify-start md:justify-center   /* top on mobile, center on desktop */
                items-center text-center
                md:items-end md:text-right
                overflow-hidden px-4 sm:px-8 md:px-16 py-24"
      aria-label="Wedding photography hero section"
    >
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <div
          className="w-full h-full bg-cover bg-[center_left_40%] md:bg-center"
          style={{
            backgroundImage:
              "url('/Weddings/Arul-Vijayalakshmi/Arulraj-Vijayalakshmi-Banner2.avif')",
          }}
        />
      </div>

      {/* Desktop Overlay (Right → Left) */}
      <div className="absolute inset-0 -z-[5] hidden md:block bg-gradient-to-l from-black/60 via-black/10 to-transparent" />

      {/* Mobile Overlay (Top → Bottom) */}
      <div className="absolute inset-0 -z-[5] md:hidden bg-gradient-to-b from-black/60 via-black/20 to-transparent" />

      {/* Text Content */}
      <div
        ref={textRef}
        className="relative z-10 text-white max-w-2xl space-y-4
                   -mt-10 sm:-mt-16 md:mt-0   /* lift text up on mobile */
                   ml-0 md:ml-auto"
      >
        <h1 className="text-3xl sm:text-4xl md:text-[2.35rem] leading-tight font-albegos">
          Wedding Photographers <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500 font-albegos">
            in Chennai
          </span>
        </h1>

        <p
          className="text-base sm:text-lg md:text-[18px] text-white/90 font-serif
                     max-w-[22rem] sm:max-w-[25rem] md:max-w-none
                     mx-auto md:mx-0"
        >
          TM Studios specializes in candid and cinematic wedding photography
          that captures every emotion with authenticity. Our team blends
          artistry with storytelling to create timeless images — trusted by
          couples across Chennai for premium wedding photography.
        </p>

        <Link href="/booking" aria-label="Book a wedding photography session">
          <button className="mt-4 px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-500 hover:opacity-90 text-white font-semibold font-serif rounded-full transition-transform hover:scale-105 duration-200 min-w-[44px] min-h-[44px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-300 focus-visible:ring-offset-2 cursor-pointer">
            Let’s Capture Your Story
          </button>
        </Link>
      </div>
    </section>
  );
}

export default React.memo(HeroSection);
