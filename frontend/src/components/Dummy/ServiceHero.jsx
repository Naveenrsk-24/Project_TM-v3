"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useRef } from "react";

export default function ServiceHero({ title, subtitle, icon, location,bg,ctaLabel,ctaLink }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center overflow-hidden min-h-[70vh] text-white rounded-4xl m-4"
    >
      {/* Background image with parallax */}
      <motion.div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          y,
        }}
        className="absolute inset-0 will-change-transform"
      ></motion.div>

      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent"></div>

      {/* Floating abstract orbs */}
      {/* <motion.div
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[500px] h-[500px] rounded-full bg-amber-500/30 blur-2xl top-[-150px] left-[-150px]"
      /> */}
      {/* <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute w-[450px] h-[450px] rounded-full bg-blue-500/25 blur-3xl bottom-[-100px] right-[-100px]"
      /> */}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 max-w-3xl mx-auto text-center px-6"
      >
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="inline-flex items-center justify-center mb-6 bg-white/10 backdrop-blur-lg p-4 rounded-2xl shadow-xl border border-white/20"
        >
          {icon && <span className="text-5xl text-white">{icon}</span>}
        </motion.div> */}

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold leading-tight mb-4 tracking-tight drop-shadow-xl">
          {title}
        </h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}

        {location && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 text-gray-300 italic mb-8"
          >
            <FaMapMarkerAlt className="text-gray-400" />
            Serving clients in {location}
          </motion.p>
        )}

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


// { title, subtitle, icon, location,bg }