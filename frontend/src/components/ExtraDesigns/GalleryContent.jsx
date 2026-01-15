"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function GalleryContent() {
  const galleryItems = [
    {
      image: "/Weddings/Manoj&Charu/Authentic-love.avif",
      title: "Authentic Love Stories",
      description:
        "Every wedding tells a story that cannot be staged. At TM Studios, we focus on the unscripted moments — the quiet glances, joyful tears, laughter between rituals, and emotions shared with family. As a wedding photography team, we blend into your celebration to document genuine connections without interruption. Our approach ensures your wedding photos feel real, personal, and emotionally timeless",
      imagePosition: "left",
    },
    {
      image: "/Weddings/Rajasekar-Nithya/Rajasekar-Nithyashree-R-12.avif",
      title: "Cinematic Storytelling",
      description:
        "Inspired by editorial and cinematic photography styles, we transform wedding moments into visual stories that feel like frames from a film. Using natural light, creative composition, and candid expressions, we craft images that flow seamlessly from one moment to the next. From bridal portraits to emotional family moments, our cinematic wedding photography captures depth, mood, and storytelling — preserving your wedding as an unforgettable visual experience.",
      imagePosition: "right",
    },
    {
      image: "/Weddings/Arul-Vijayalakshmi/Arulraj-Vijayalakshmi-W-2.avif",
      title: "Timeless Elegance",
      description:
        "Trends may change, but emotions remain forever. Our photography style focuses on elegant tones, balanced colors, and classic compositions that stand the test of time. Years from now, your wedding images will still feel refined, emotional, and beautiful. At TM Studios, we create wedding photographs that age gracefully — allowing you to relive your special day just as vividly as the first time.",
      imagePosition: "left",
    },
    
    {
      image: "/Weddings/Rajasekar-Nithya/Rajasekar-Nithyashree-W-17.avif",
      title: "Cultural Details & Ritual Moments",
      description:
        "Indian weddings are rich in traditions, emotions, and meaningful rituals that deserve special attention. From intricate bridal details and sacred ceremonies to joyful family customs, we carefully document every element that makes your wedding unique. As experienced South Indian wedding photographers, we understand the importance of each ritual and capture them with respect, clarity, and artistic finesse — ensuring no moment, big or small, is ever missed",
      imagePosition: "right",
    },
  ];

  const particles = Array.from({ length: 25 });

  return (
    <section className="relative bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 py-16 px-6 lg:px-12 overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Static gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[12%] w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-[12%] right-[10%] w-[28rem] h-[28rem] bg-pink-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-md border border-purple-400/40 shadow-lg shadow-purple-500/20 mb-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500" />
            </span>
            <span className="text-xs font-black text-white tracking-[0.2em] uppercase">
              Our Approach
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-black">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-100">
              Why Choose{" "}
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300">
              Our Wedding Photography
            </span>
          </h2>
        </div>

        {/* Alternating Layout */}
        <div className="space-y-12">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className={`group grid lg:grid-cols-2 gap-6 items-center ${
                item.imagePosition === "right" ? "lg:grid-flow-dense" : ""
              }`}
              style={{
                animation: `slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${
                  idx * 0.15
                }s both`,
              }}
            >
              <style jsx>{`
                @keyframes slideUp {
                  from {
                    opacity: 0;
                    transform: translateY(40px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
              `}</style>

              {/* Image with decorative border */}
              <div
                className={`relative ${
                  item.imagePosition === "right" ? "lg:col-start-2" : ""
                }`}
              >
                {/* Decorative border with glow */}
                <div
                  className={`absolute w-full h-full border-3 ${
                    idx % 2 === 0
                      ? "border-purple-500/30"
                      : "border-pink-500/30"
                  } ${
                    item.imagePosition === "left"
                      ? "top-3 left-3"
                      : "bottom-3 right-3"
                  } transition-all duration-500 group-hover:${
                    idx % 2 === 0
                      ? "border-purple-400/50"
                      : "border-pink-400/50"
                  }`}
                />

                {/* Glow effect on hover */}
                <div
                  className={`absolute -inset-0.5 rounded-sm bg-gradient-to-r ${
                    idx % 2 === 0
                      ? "from-purple-500 via-pink-500 to-purple-500"
                      : "from-pink-500 via-purple-500 to-pink-500"
                  } opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}
                />

                {/* Image container */}
                <div className="relative rounded-sm overflow-hidden shadow-2xl shadow-slate-900/50 group-hover:shadow-purple-500/30 transition-all duration-500">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={500}
                    height={300}
                    className="w-full h-[250px] lg:h-[280px] object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-purple-900/10 to-transparent" />

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </div>

              {/* Text Content */}
              <div
                className={`space-y-3 ${
                  item.imagePosition === "right"
                    ? "lg:col-start-1 lg:row-start-1"
                    : ""
                }`}
              >
                <h3
                  className={`text-2xl lg:text-3xl font-black transition-all duration-300 ${
                    idx % 2 === 0
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 group-hover:from-purple-200 group-hover:to-pink-200"
                      : "text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 group-hover:from-pink-200 group-hover:to-purple-200"
                  }`}
                >
                  {item.title}
                </h3>

                <p className="text-purple-200/70 leading-relaxed text-sm group-hover:text-purple-100/80 transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
