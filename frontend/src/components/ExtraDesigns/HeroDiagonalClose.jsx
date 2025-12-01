'use client';
import React, { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import Image from "next/image";

export default function HeroDiagonalClose({
  poster = "/hero_lossless.webp", // use a 4K hero image
  layerColor = "#eab4b4",
  angle = 20,
  layerHeightVh = 145,
}) {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const OFFSET = 200;
  const topY = useTransform(scrollYProgress, [0, 1], [`-${OFFSET}%`, "0%"]);
  const bottomY = useTransform(scrollYProgress, [0, 1], [`${OFFSET}%`, "0%"]);

  return (
    <div className="w-full">
      <div ref={heroRef} className="w-full h-[200vh] relative">
        <section className="sticky top-0 w-full h-screen overflow-hidden bg-black">

          {/* Optimized Poster Background */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={poster}
              alt="Hero visual — wedding scene poster"
              fill
              priority
              quality={100}
              sizes="
                (max-width: 768px) 100vw,
                (max-width: 1200px) 100vw,
                100vw
              "
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* TOP Diagonal Layer */}
          <motion.div
            style={{ y: topY }}
            className="pointer-events-none absolute left-0 right-0 origin-top-left"
          >
            <div
              aria-hidden
              className="w-[140vw] -translate-x-1/14"
              style={{
                height: `${layerHeightVh}vh`,
                background: layerColor,
                transform: `rotate(${angle}deg)`,
                transformOrigin: "left top",
              }}
            />
          </motion.div>

          {/* BOTTOM Diagonal Layer */}
          <motion.div
            style={{ y: bottomY }}
            className="pointer-events-none absolute left-0 right-0 origin-bottom-right bottom-0"
          >
            <div
              aria-hidden
              className="w-[140vw] -translate-x-1/4"
              style={{
                height: `${layerHeightVh + 27}vh`,
                background: layerColor,
                transform: `rotate(${angle}deg)`,
                transformOrigin: "right bottom",
              }}
            />
          </motion.div>

          {/* Optional Overlay (Text, CTA, Logo, etc.) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Add your hero content here */}
          </div>

        </section>
      </div>
    </div>
  );
}
