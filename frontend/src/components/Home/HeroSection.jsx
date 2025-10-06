"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-between overflow-hidden px-6 md:px-16"
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
      <div className="absolute inset-0 bg-black/40 -z-10" aria-hidden="true" />

      {/* Left Content */}
      <div className="relative z-10 max-w-xl text-white space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Capturing <span className="text-pink-300">Timeless</span> Moments
        </h1>
        <p className="text-lg md:text-xl text-gray-200">
          Wedding photography that tells your story — naturally, beautifully, and forever.
        </p>
        <button className="mt-4 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full transition">
          Book a Session
        </button>
      </div>

      {/* Portrait Photo Frame (Right Side) */}
      <div className="relative z-10 hidden md:flex items-center justify-center w-[500px] h-[580px] border-4 border-white shadow-2xl overflow-hidden">
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
