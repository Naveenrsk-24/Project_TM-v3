"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      className="relative w-full min-h-screen flex flex-col-reverse md:flex-row items-center justify-between overflow-hidden px-4 sm:px-8 md:px-16 py-12 md:py-0"
      aria-label="Wedding photography hero section"
    >
      {/* Background Image */}
      <Image
        src="/Weddings/groom-putting-ring-bride-s-finger.jpg"
        alt="Groom putting ring on bride's finger"
        fill
        priority
        className="object-cover object-center -z-10"
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 -z-10"
        aria-hidden="true"
      />

      {/* Left Content */}
      <div className="relative z-10 text-white text-center md:text-left max-w-xl space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
          Capturing <span className="text-pink-300">Timeless</span> Moments
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-200">
          Wedding photography that tells your story — naturally, beautifully, and forever.
        </p>
        <button className="mt-4 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full transition">
          Book a Session
        </button>
      </div>

      {/* Portrait Photo Frame (Right Side) */}
      <div className="relative z-10 mb-8 md:mb-0 md:flex items-center justify-center w-full sm:w-[350px] md:w-[500px] h-[400px] sm:h-[450px] md:h-[580px] border-4 border-white shadow-2xl overflow-hidden rounded-2xl md:rounded-none">
        <Image
          src="/Weddings/beautiful-husband-wife-posing-beach.jpg"
          alt="Bride holding bouquet"
          fill
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}
