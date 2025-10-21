// components/SliderWithProgress.jsx
"use client";

import React, { useRef, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image"; // 👈 HIGH PRIORITY: Next.js Image Component

const SliderWithProgress = ({
  slides = [], // Expects [{ src: '...', alt: '...' }, ...]
  options = {
    type: "loop",
    autoplay: true,
    interval: 3000,
    pauseOnHover: true,
    perPage: 1,
    arrows: false,
    pagination: false,
    gap: "1rem",
  },
  progressColor = "bg-pink-400",
  trackColor = "bg-gray-300",
}) => {
  const progressRef = useRef(null);
  const splideRef = useRef(null);

  useEffect(() => {
    const splide = splideRef.current?.splide;
    if (!splide) return;

    const updateProgress = () => {
      // Calculate progress based on current index
      const total = splide.Components.Controller.getEnd() + 1;
      const rate = Math.min((splide.index + 1) / total, 1);
      if (progressRef.current) {
        progressRef.current.style.width = `${100 * rate}%`;
      }
    };

    splide.on("mounted move", updateProgress);
    updateProgress();

    return () => splide.off("mounted move", updateProgress);
  }, []);

  return (
    <div className="relative w-full">
      <Splide ref={splideRef} options={options} aria-label="Image Slider">
        {slides.map((slide, index) => (
          <SplideSlide key={index}>
            <div className="flex items-center justify-center w-full 
              h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[28rem] 2xl:h-[32rem] 
              rounded-lg overflow-hidden shadow-lg">
              
              {/* Image Slide Optimization (Layer 2 & 13) */}
              <Image 
                src={slide.src}
                alt={slide.alt || `Slide ${index + 1}`}
                fill // Use 'fill' to make it fit the container and save layout shift
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw" 
                className="object-cover rounded-lg"
                // LCP Optimization: Set priority for the first image
                priority={index === 0} 
                // Next.js automatically lazy-loads images not marked 'priority'
                // This will lazy-load slides 2 onwards (Layer 2)
              />

              {/* Alternative content rendering removed for brevity, 
              assuming all slides are now image objects {src, alt} 
              If needed, you'd re-implement the 'typeof slide === "string"' check here. */}

            </div>
          </SplideSlide>
        ))}
      </Splide>

      {/* Progress bar */}
      <div className={`w-full h-[3px] ${trackColor} mt-3 rounded`}>
        <div
          ref={progressRef}
          className={`h-[3px] ${progressColor} transition-all duration-500 ease-in-out rounded`}
          style={{ width: "0%" }}
        ></div>
      </div>
    </div>
  );
};

// Memoization (Layer 4) to prevent unnecessary re-renders when props haven't changed
export default React.memo(SliderWithProgress);