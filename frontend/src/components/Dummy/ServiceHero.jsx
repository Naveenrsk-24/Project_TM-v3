"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useRef } from "react";

export default function ServiceHero({
  title,
  subtitle,
  icon,
  location,
  bg,
  mobileBg,
  ctaLabel = "Book Now",
  ctaLink = "/contactus",
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center overflow-hidden min-h-[90vh] text-white rounded-4xl m-4"
      aria-label={`${title} hero section`}
    >
      {/* --- MOBILE BACKGROUND --- */}
      <motion.div
        style={{
          backgroundImage: `url(${mobileBg || bg || "/default-hero.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          y,
        }}
        className="absolute inset-0 will-change-transform md:hidden"
        aria-hidden="true"
      ></motion.div>

      {/* --- DESKTOP BACKGROUND --- */}
      <motion.div
        style={{
          backgroundImage: `url(${bg || "/default-hero.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          y,
        }}
        className="absolute inset-0 will-change-transform hidden md:block"
        aria-hidden="true"
      ></motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 max-w-3xl mx-auto text-center px-6"
      >
        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="
      text-base 
      sm:text-lg 
      md:text-xl 
      text-gray-200 
      text-center 
      mb-10 
      max-w-xl 
      mx-auto 
      font-albegos
      px-4
    "
          >
            {subtitle}
          </motion.p>
        )}

        {/* Stories Title */}
        <h1 className="leading-tight drop-shadow-xl relative flex flex-col items-center mb-16">
          {/* MAIN TITLE */}
          <span
            className="
      font-monday 
      leading-none 
      tracking-tight
      
      text-[4rem]     /* mobile */
      sm:text-[7rem]  /* small tablets */
      md:text-[10rem] /* tablets */
      lg:text-[13rem] /* desktop */
    "
          >
            Stories
          </span>

          {/* SUBTITLE */}
          <span
            className="
      font-albegos 
      tracking-wide 
      mt-[-1.2rem]
      sm:mt-[-1.8rem]
      md:mt-[-2.2rem]
      lg:mt-[-2.5rem]

      text-[1.2rem]   /* mobile */
      sm:text-[1.6rem]
      md:text-[2rem]
      lg:text-[2.2rem]

      relative 
      left-2 
      sm:left-3 
      md:left-4 
      lg:left-5
    "
          >
            By Tm Studios
          </span>
        </h1>

        {/* CTA Button */}
        <motion.a
          href={ctaLink}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 20px rgba(139, 92, 246, 0.6)",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="inline-block px-10 py-4 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          {ctaLabel}
        </motion.a>
      </motion.div>
    </section>
  );
}
