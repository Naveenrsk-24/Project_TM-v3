// components/BlogSection.jsx
"use client"; // Swiper and Framer Motion require client-side rendering

import React, { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Only import the modules you need (already well done)
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles (already well done)
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import BlogCard from "@/components/ExtraDesigns/BlogCard2";

/**
 * Creates a Framer Motion-enhanced Link component for modern Next.js routing.
 */
const MotionLink = motion(Link); // 👈 Optimization: Wrap Link once for Framer Motion

/**
 * A reusable, responsive section component featuring a carousel of blog cards.
 */
const BlogSection2 = ({
  blogs,
  viewAllUrl = "/blogs",
  title = "Stories, Tips, and Wedding Guides",
}) => {
  const swiperRef = useRef(null);

  if (!blogs || blogs.length === 0) {
    return (
      <section className="py-16 text-center text-neutral-600">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="mt-4">
          No articles available right now — new stories are coming soon.
        </p>
      </section>
    );
  }

  // Framer Motion properties for interactive buttons (Memoizable, but fine here)
  const buttonMotion = {
    whileHover: { scale: 1.05, boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)" },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 300, damping: 20 },
  };

  // Framer Motion variants for the header text fade-in
  const headerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with Framer Motion Fade-in */}
        <motion.h2
          className="text-4xl font-extrabold tracking-tight text-neutral-800 mb-8 sm:mb-12"
          initial="hidden"
          animate="visible"
          variants={headerVariants}
        >
          {title}
        </motion.h2>

        {/* Blog Cards Carousel */}
        <div className="relative">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={32}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet bg-neutral-400",
              bulletActiveClass: "swiper-pagination-bullet-active bg-amber-600",
            }}
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 20 },
              768: { slidesPerView: 2.5, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 40 },
            }}
            className="pb-10"
          >
            {/* Optimization: Swiper automatically loads slides 
                near the view, providing lazy-loading benefit. */}
            {blogs.map((blog) => (
              <SwiperSlide key={blog.id} className="h-auto">
                <BlogCard blog={blog} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows (Desktop/Tablet) with Framer Motion */}
          <div className="hidden lg:block">
            {/* Previous Button */}
            <motion.button
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous blog post"
              className="absolute left-0 top-1/2 z-10 -translate-x-full -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-colors text-amber-600 border border-neutral-200"
              {...buttonMotion}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>

            {/* Next Button */}
            <motion.button
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next blog post"
              className="absolute right-0 top-1/2 z-10 translate-x-full -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-colors text-amber-600 border border-neutral-200"
              {...buttonMotion}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* View Blogs Button with Framer Motion - FIXED LINK USAGE */}
        <div className="mt-10 flex justify-center">
          <MotionLink // 👈 Use the custom MotionLink component
            href={viewAllUrl}
            className="
              inline-flex items-center rounded-full border border-transparent bg-gradient-to-r from-pink-600 to-rose-500 px-8 py-3 
              text-base font-medium text-white shadow-lg transition-all duration-300 ease-in-out
              hover:from-amber-700 hover:to-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-500/50
            "
            aria-label="Go to the main blog archive page"
            {...buttonMotion}
          >
            View All Articles &rarr;
          </MotionLink>
        </div>
      </div>
    </section>
  );
};

export default BlogSection2;
