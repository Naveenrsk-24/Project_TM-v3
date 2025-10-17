"use client";

import React, { useRef, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const SliderWithProgress = ({
  slides = [],
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
              rounded-lg overflow-hidden shadow-lg px-2 sm:px-4">
              {typeof slide === "string" ? (
                <div className="w-full h-full flex items-center justify-center 
                  bg-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl 
                  font-semibold text-center px-2 sm:px-4">
                  {slide}
                </div>
              ) : (
                slide.content
              )}
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

export default SliderWithProgress;
