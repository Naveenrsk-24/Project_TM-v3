// components/BlogSection.jsx
'use client'; // Swiper and Framer Motion require client-side rendering
import React, { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion'; // 👈 Import Framer Motion

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import BlogCard from './BlogCard'; // Assuming BlogCard is updated with Framer Motion

/**
 * A reusable, responsive section component featuring a carousel of blog cards,
 * enhanced with Framer Motion for interactive elements.
 */
const BlogSection = ({ blogs, viewAllUrl = '/blogs', title = 'Latest Articles & Insights' }) => {
  // Swiper control ref
  const swiperRef = useRef(null);

  if (!blogs || blogs.length === 0) {
    return (
      <section className="py-16 text-center text-gray-500">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="mt-4">No blog posts available at the moment.</p>
      </section>
    );
  }

  // Framer Motion properties for interactive buttons
  const buttonMotion = {
    whileHover: { scale: 1.05, boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)" },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 300, damping: 20 },
  };
  
  // Framer Motion variants for the header text fade-in
  const headerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };


  return (
    <section className="py-16 sm:py-24 bg-gray-50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header with Framer Motion Fade-in */}
        <motion.h2 
          className="text-4xl font-extrabold tracking-tight text-gray-900 mb-8 sm:mb-12"
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
              bulletClass: 'swiper-pagination-bullet bg-gray-400',
              bulletActiveClass: 'swiper-pagination-bullet-active bg-indigo-600',
            }}
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 20 },
              768: { slidesPerView: 2.5, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 40 },
            }}
            className="pb-10"
          >
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
              className="absolute left-0 top-1/2 z-10 -translate-x-full -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-colors text-indigo-600 border border-gray-200"
              {...buttonMotion}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            {/* Next Button */}
            <motion.button
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next blog post"
              className="absolute right-0 top-1/2 z-10 translate-x-full -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-colors text-indigo-600 border border-gray-200"
              {...buttonMotion}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* View Blogs Button with Framer Motion */}
        <div className="mt-10 flex justify-center">
          <Link href={viewAllUrl} passHref legacyBehavior>
            <motion.button
              className="
                inline-flex items-center rounded-full border border-transparent bg-indigo-600 px-8 py-3 
                text-base font-medium text-white shadow-lg transition-all duration-300 ease-in-out
                hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50
              "
              aria-label="Go to the main blog archive page"
              {...buttonMotion}
            >
              View All Blogs &rarr;
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;