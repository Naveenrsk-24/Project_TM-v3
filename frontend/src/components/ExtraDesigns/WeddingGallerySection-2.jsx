"use client";

import Image from "next/image";
import React, { memo } from "react";

/* ---------- Memoized Glow Background ---------- */
const BackgroundGlows = memo(() => (
  <>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.25),transparent_55%)]" />
    <div className="absolute -left-12 top-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl will-change-transform" />
    <div className="absolute -right-12 top-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl will-change-transform" />
  </>
));

BackgroundGlows.displayName = "BackgroundGlows";

/* ---------- Memoized Header Block ---------- */
const SectionHeader = memo(() => (
  <div className="relative max-w-4xl">
    <div className="inline-flex items-center gap-3 mb-8">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl shadow-lg shadow-purple-500/30">
        💍
      </div>
      <span className="text-purple-300 text-sm font-semibold tracking-[0.3em] uppercase">
        Wedding Photography
      </span>
    </div>

    <h2 className="text-6xl lg:text-8xl font-black text-white leading-[0.95] mb-8">
      Turning Love
      <br />
      Stories{" "}
      <span className="relative inline-block">
        <span className="relative z-10 bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
          Into Timeless
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-2xl will-change-transform" />
      </span>
      <br />
      Memories
    </h2>

    <div className="flex items-start gap-6">
      <div className="hidden lg:block w-1 h-24 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mt-2" />
      <p className="text-xl text-purple-100/90 leading-relaxed max-w-2xl">
        We document weddings as they unfold — honest emotions, quiet glances,
        and moments that live far beyond the day itself.
      </p>
    </div>
  </div>
));

SectionHeader.displayName = "SectionHeader";

/* ---------- Memoized Right-side Image ---------- */
const RightSideImage = memo(() => (
  <div className="relative flex justify-center lg:justify-end items-center lg:pl-16">

    {/* Glow behind image */}
    <div className="absolute -z-10 w-[340px] h-[340px] bg-purple-400/20 blur-3xl rounded-full"></div>

    <div className="relative overflow-hidden w-[320px] h-[420px] lg:w-[580px] lg:h-[600px] m-5 rounded-3xl shadow-2xl shadow-purple-500/20 ring-1 ring-purple-400/20">
      <Image
        src="/Weddings/Jalaludeen-Shain/Jalaludeen-Shain-104.avif"
        alt="Wedding Photography Showcase"
        fill
        loading="lazy"
        priority={false}
        className="object-cover"
      />
    </div>
  </div>
));

RightSideImage.displayName = "RightSideImage";

/* ---------- MAIN SECTION ---------- */
function WeddingGallerySection2() {
  return (
    <section className="relative bg-gradient-to-b from-black via-purple-950 to-black pt-10 pb-0 px-6 lg:px-24 overflow-hidden">

      <BackgroundGlows />

      <div className="relative max-w-[1500px] mx-auto">

        {/* 🔥 GRID LAYOUT ADDED HERE */}
        <div className="relative mb-32 lg:grid lg:grid-cols-2 lg:items-center gap-20">

          {/* Left - Text */}
          <SectionHeader />

          {/* Right - Image */}
          <RightSideImage />

        </div>
      </div>
    </section>
  );
}

export default memo(WeddingGallerySection2);
