"use client";

import React, { useEffect, useState } from "react";

const WeddingGallerySection = ({
  mainHeading = "Capturing your wedding's magic, one moment at a time",
  subHeading = "TM Studios delivers candid, cinematic wedding photography that captures genuine emotions with artistic storytelling — trusted by couples across Chennai for timeless, premium images.",
  ctaText = "Get 50% off in this winter",
  ctaLink = "#",
  images = [
    "https://www.jayrowden.com/wp-content/uploads/2018/11/16-36968-page/0374.jpg",
    "https://images.prismic.io/qpidindia/71ef1e1e-1685-42f4-9055-d81bfe0d3947_intro.png.jpg?auto=compress,format&rect=0,0,5294,7935&w=900&h=1349",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZRrm73o9Xv2xSnEncZT5MFta-zHMeKZyPQg&s",
    "https://images.prismic.io/theweddart/1a5a54a7-69ae-4e77-b845-da30918705b0_3.+beautiful+smiles.jpg?auto=compress,format&rect=0,0,1365,2048&w=740&h=1110",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8DXfh5hb1SGjGnDSyP6vkEeTa6OFrfzEjvw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAc9Zd2kdbuom-GaLphyOTzgJErWTw1OfE8Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-91ggxQtV5-Wk5mBdFrXBd_kJu5tH_Ggdvg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8DXfh5hb1SGjGnDSyP6vkEeTa6OFrfzEjvw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZRrm73o9Xv2xSnEncZT5MFta-zHMeKZyPQg&s",
    "https://www.jayrowden.com/wp-content/uploads/2018/11/16-36968-page/0374.jpg",



  ],
}) => {
  const [offset, setOffset] = useState(0);

  // Speed control (the ONLY number you need to change)
  const SPEED = 0.15;

  // Arc positions
  const arcPositions = [
    { x: 460, z: 620, rotateY: -55 },
    { x: 330, z: 440, rotateY: -45 },
    { x: 180, z: 210, rotateY: -30 },
    { x: 0, z: 0, rotateY: 0 },
    { x: -180, z: 210, rotateY: 30 },
    { x: -330, z: 440, rotateY: 45 },
    { x: -460, z: 620, rotateY: 55 },
  ];

  // Smooth animation loop
  useEffect(() => {
    let animationId;
    let lastTime = performance.now();

    const animate = (time) => {
      const delta = time - lastTime;
      lastTime = time;

      setOffset((prev) => prev + delta * 0.001);

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  // Calculate interpolated position
  const getInterpolatedPosition = (imageIndex, offset) => {
    const total = arcPositions.length;

    const position = (imageIndex - offset * SPEED) % total;
    const normalized = (position + total) % total;

    const currentIndex = Math.floor(normalized);
    const nextIndex = (currentIndex + 1) % total;
    const t = normalized - currentIndex;

    const a = arcPositions[currentIndex];
    const b = arcPositions[nextIndex];

    return {
      x: a.x + (b.x - a.x) * t,
      z: a.z + (b.z - a.z) * t,
      rotateY: a.rotateY + (b.rotateY - a.rotateY) * t,
    };
  };

  return (
    <section className="relative w-full bg-stone-50 py-4 px-4 md:py-5 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-[2.35rem] font-serif font-bold leading-tight">
            Best Wedding Photographers <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500">
              in Chennai
            </span>
          </h1>

          <div className="flex justify-center mb-6">
            <div className="w-48 md:w-64 h-1 bg-stone-700 rounded-full" />
          </div>

          <p className="text-stone-600 text-base md:text-lg max-w-2xl mx-auto px-4">
            {subHeading}
          </p>
        </div>

        {/* 3D Gallery */}
        <div className="relative mb-8 md:mb-5">
          <div
            className="flex justify-center"
            style={{ perspective: "1400px", transformStyle: "preserve-3d" }}
          >
            <div
              className="relative"
              style={{
                height: "320px",
                transformStyle: "preserve-3d",
                left: "-110px",
              }}
            >
              {images.map((src, index) => {
                const pos = getInterpolatedPosition(index, offset);

                // FADE LOGIC
                const isEdge = pos.rotateY < -50 || pos.rotateY > 50;
                const opacity = isEdge ? 0 : 1;

                return (
                  <div
                    key={src}
                    className="absolute transition-opacity duration-500"
                    style={{
                      left: pos.x + 20,
                      transformStyle: "preserve-3d",
                      opacity,
                      transform: `
                        translateZ(${pos.z}px)
                        rotateY(${pos.rotateY}deg)
                        scale(${1 - Math.abs(pos.rotateY) / 150})
                      `,
                    }}
                  >
                    <div className="relative w-24 h-36 sm:w-36 sm:h-52 md:w-44 md:h-60 lg:w-48 lg:h-64 overflow-hidden rounded-3xl shadow-xl hover:scale-110 hover:z-50 transition-transform duration-300">
                      <img
                        src={src}
                        alt={`Wedding moment ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <a
            href={ctaLink}
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium text-base md:text-lg px-8 md:px-10 py-3 md:py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default WeddingGallerySection;
