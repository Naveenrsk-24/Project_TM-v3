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
      {/* Background image with parallax */}
      <motion.div
        style={{
          backgroundImage: `url(${bg || "/default-hero.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          y,
        }}
        className="absolute inset-0 will-change-transform"
        aria-hidden="true"
      ></motion.div>

      {/* Subtle overlay gradient */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent"></div> */}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 max-w-3xl mx-auto text-center px-6"

        // **************** Dont't Remove the dynamic title *****************
      >
        {/* <h1 className="font-albegos text-4xl sm:text-6xl md:text-7xl leading-tight mb-4 tracking-tight drop-shadow-xl">
          {title}
        </h1> */}

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl md:text-1xl text-gray-200 text-center text-nowrap mb-[6rem] max-w-2xl mx-auto font-albegos"
          >
            {subtitle}
          </motion.p>
        )}


        <h1 className="leading-tight drop-shadow-xl relative flex flex-col items-center mb-[5rem]">
          <span className="font-monday text-[13rem] tracking-tight leading-none">
            Stories
          </span>

          <span className="font-albegos text-[2.2rem] tracking-wide mt-[-2.5rem] relative left-5">
            By Tm Studios
          </span>
        </h1>

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
