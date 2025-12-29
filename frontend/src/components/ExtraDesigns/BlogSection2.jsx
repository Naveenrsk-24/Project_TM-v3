"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import BlogCard from "@/components/ExtraDesigns/BlogCard2";

const MotionLink = motion(Link);

const BlogSection2 = ({
  blogs,
  viewAllUrl = "/blogs",
  title = "Stories, Tips, and Wedding Guides",
}) => {
  const swiperRef = useRef(null);

  /** ---------------------------------------------------------
   * PERFORMANCE FIXES:
   * - No spotlight
   * - GPU-only parallax
   * - Memoized particles
   ----------------------------------------------------------*/

  const orbRef1 = useRef(null);
  const orbRef2 = useRef(null);
  const parallax = useRef({ x: 0, y: 0 });
  let raf = null;

  useEffect(() => {
    const handleMove = (e) => {
      parallax.current.x = (e.clientX / window.innerWidth - 0.5) * 50;
      parallax.current.y = (e.clientY / window.innerHeight - 0.5) * 50;

      if (!raf) {
        raf = requestAnimationFrame(() => {
          if (orbRef1.current)
            orbRef1.current.style.transform = `translate3d(${parallax.current.x * 0.3}px, ${parallax.current.y * 0.3}px, 0)`;

          if (orbRef2.current)
            orbRef2.current.style.transform = `translate3d(${parallax.current.x * -0.3}px, ${parallax.current.y * -0.3}px, 0)`;

          raf = null;
        });
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  /** ---------------------------------------------------------
   * MEMOIZED PARTICLES
   ----------------------------------------------------------*/
  const particles = useMemo(
    () =>
      Array.from({ length: 25 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 6 + Math.random() * 10,
      })),
    []
  );

  if (!blogs || blogs.length === 0) {
    return (
      <section className="py-16 text-center text-neutral-300">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="mt-4">No articles available right now — new stories are coming soon.</p>
      </section>
    );
  }

  const buttonMotion = {
    whileHover: { scale: 1.1, boxShadow: "0 10px 20px rgba(0,0,0,0.3)" },
    whileTap: { scale: 0.95 },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-purple-900 to-black py-20 sm:py-28">

      {/* PARTICLES (Memoized) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-float"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* GPU-Optimized Parallax Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          ref={orbRef1}
          className="absolute w-[28rem] h-[28rem] bg-purple-500/20 blur-3xl rounded-full animate-pulse"
          style={{ top: "14%", left: "10%" }}
        />
        <div
          ref={orbRef2}
          className="absolute w-[32rem] h-[32rem] bg-pink-500/20 blur-3xl rounded-full animate-pulse"
          style={{ bottom: "12%", right: "12%", animationDelay: "0.7s" }}
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-12"
          initial="hidden"
          animate="visible"
          variants={headerVariants}
        >
          {title}
        </motion.h2>

        {/* Swiper */}
        <div className="relative">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={32}
            loop
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet bg-white/30",
              bulletActiveClass: "swiper-pagination-bullet-active bg-pink-500",
            }}
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 20 },
              768: { slidesPerView: 2.5, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 40 },
            }}
            className="pb-12"
          >
            {blogs.map((blog) => (
              <SwiperSlide key={blog.id}>
                <BlogCard blog={blog} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Desktop Nav Arrows */}
          <div className="hidden lg:block">
            <motion.button
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 text-pink-400 p-3 rounded-full shadow-xl"
              {...buttonMotion}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24">
                <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </motion.button>

            <motion.button
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute right-0 top-1/2 translate-x-full -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 text-pink-400 p-3 rounded-full shadow-xl"
              {...buttonMotion}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* View All Button */}
        <div className="mt-14 flex justify-center">
          <MotionLink
            href={viewAllUrl}
            className="px-10 py-4 text-white font-semibold bg-gradient-to-r from-pink-600 to-rose-500 rounded-full shadow-2xl hover:shadow-pink-500/40 transition-all"
            {...buttonMotion}
          >
            View All Articles →
          </MotionLink>
        </div>
      </div>

      {/* Float Animation */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-40px); opacity: 0.9; }
          100% { transform: translateY(-80px); opacity: 0.2; }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </section>
  );
};

export default BlogSection2;
