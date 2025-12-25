"use client";
import React, { useState, useEffect } from "react";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";

const TestimonialCarousel2 = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [direction, setDirection] = useState("right");

  // NEW: Mouse & parallax states
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const testimonials = [
    {
      id: 1,
      name: "Priya & Arjun",
      role: "Wedding Couple",
      image: "/Home/Testimonial1.avif",
      rating: 5,
      text: "Absolutely phenomenal! They captured every emotion beautifully. Our album feels timeless, and the candid moments are something we’ll treasure forever.",
      event: "Traditional Wedding, Chennai",
      date: "December 2024",
    },
    {
      id: 2,
      name: "Aishwarya & Karthik",
      role: "Pre-Wedding Shoot",
      image: "/Home/Testimonial2.avif",
      rating: 5,
      text: "Their creativity and warmth made our shoot so easy. Every frame tells a story, and the final results were beyond what we imagined.",
      event: "Beach Pre-Wedding, Mahabalipuram",
      date: "October 2024",
    },
    {
      id: 3,
      name: "Divya & Rajesh",
      role: "Destination Wedding",
      image: "/Home/Testimonial3.avif",
      rating: 5,
      text: "From the first call to the final delivery, everything was perfect. They understood our vision and brought it to life with incredible attention to detail.",
      event: "Resort Wedding, Goa",
      date: "January 2025",
    },
    {
      id: 4,
      name: "Ananya & Vikram",
      role: "Engagement Ceremony",
      image: "/Home/Testimonial1.avif",
      rating: 5,
      text: "Such a talented and professional team. They captured the essence of our celebration beautifully. We couldn’t be happier with the photos.",
      event: "Garden Engagement, Bangalore",
      date: "September 2024",
    },
  ];

  // Autoplay
  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setDirection("right");
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlay, testimonials.length]);

  // Manual Prev / Next
  const handlePrev = () => {
    setDirection("left");
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlay(false);
  };

  const handleNext = () => {
    setDirection("right");
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlay(false);
  };

  const currentTestimonial = testimonials[activeIndex];

  // ================================
  // 🌟 NEW: Mouse Movement Parallax
  // ================================
  useEffect(() => {
    const handleMove = (e) => {
      const xFactor = (e.clientX / window.innerWidth - 0.5) * 40;
      const yFactor = (e.clientY / window.innerHeight - 0.5) * 40;

      setMousePos({ x: e.clientX, y: e.clientY });
      setParallax({ x: xFactor, y: yFactor });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const particles = Array.from({ length: 25 });

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 py-20 px-4 overflow-hidden">

      {/* ============================= */}
      {/* ✨ FLOATING PARTICLES */}
      {/* ============================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          ></span>
        ))}
      </div>

      {/* ============================= */}
      {/* 🌈 PARALLAX ORBS */}
      {/* ============================= */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            top: `calc(20% + ${parallax.y * 0.3}px)`,
            left: `calc(12% + ${parallax.x * 0.3}px)`,
          }}
        ></div>

        <div
          className="absolute w-[28rem] h-[28rem] bg-pink-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            bottom: `calc(12% - ${parallax.y * 0.3}px)`,
            right: `calc(10% - ${parallax.x * 0.3}px)`,
            animationDelay: "1s",
          }}
        ></div>
      </div>

      {/* ============================= */}
      {/* 🔦 SPOTLIGHT FOLLOWING CURSOR */}
      {/* ============================= */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            300px at ${mousePos.x}px ${mousePos.y}px,
            rgba(255,255,255,0.18),
            transparent 70%
          )`,
          transition: "background 0.08s ease-out",
        }}
      ></div>

      {/* ============================= */}
      {/* MAIN CONTENT */}
      {/* ============================= */}
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full">
            <span className="text-white text-sm font-semibold tracking-wider">
              Client Testimonials
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            What Our Clients Say
          </h2>

          <p className="text-slate-300 text-lg">
            Real stories from couples we've had the joy of working with.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative">
          <div className="bg-white/95 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl">
            <div className="grid md:grid-cols-5">

              {/* IMAGE */}
              <div className="md:col-span-2 relative h-64 md:h-full">
                <div
                  className={`absolute inset-0 transition-all duration-700 ${
                    direction === "right"
                      ? "animate-[slideInRight_0.7s_ease-out]"
                      : "animate-[slideInLeft_0.7s_ease-out]"
                  }`}
                >
                  <img src={currentTestimonial.image} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                {/* QUOTE ICON */}
                <div className="absolute top-6 left-6 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Quote className="w-8 h-8 text-pink-600" />
                </div>
              </div>

              {/* CONTENT */}
              <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
                <div
                  className={`transition-all duration-700 ${
                    direction === "right"
                      ? "animate-[fadeInUp_0.7s_ease-out]"
                      : "animate-[fadeInDown_0.7s_ease-out]"
                  }`}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-pink-500 text-pink-500"
                        style={{ animation: `starPop 0.5s ease-out ${i * 0.1}s both` }}
                      />
                    ))}
                  </div>

                  <p className="text-neutral-700 text-lg md:text-xl italic leading-relaxed mb-6">
                    "{currentTestimonial.text}"
                  </p>

                  <h3 className="text-2xl font-bold">{currentTestimonial.name}</h3>
                  <p className="text-pink-600 font-medium">{currentTestimonial.role}</p>

                  <div className="flex flex-wrap gap-2 mt-2 text-sm">
                    <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full">
                      {currentTestimonial.event}
                    </span>
                    <span className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full">
                      {currentTestimonial.date}
                    </span>
                  </div>

                  {/* Dots */}
                  <div className="flex gap-2 mt-6">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setDirection(index > activeIndex ? "right" : "left");
                          setActiveIndex(index);
                          setIsAutoPlay(false);
                        }}
                        className={`h-2 rounded-full transition-all ${
                          activeIndex === index
                            ? "w-8 bg-gradient-to-r from-rose-500 to-pink-600"
                            : "w-2 bg-neutral-300 hover:bg-neutral-400"
                        }`}
                      ></button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ARROWS */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-600 hover:to-rose-500 hover:text-white transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-600 hover:to-rose-500 hover:text-white transition-all"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnails */}
        <div className="flex justify-center gap-4 mt-12">
          {testimonials.map((t, index) => (
            <button
              key={t.id}
              onClick={() => {
                setDirection(index > activeIndex ? "right" : "left");
                setActiveIndex(index);
                setIsAutoPlay(false);
              }}
              className={`transition-all ${activeIndex === index ? "scale-110" : "scale-90 opacity-60"}`}
            >
              <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-white">
                <img src={t.image} className="w-full h-full object-cover" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeInDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes starPop {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(180deg); }
          100% { transform: scale(1) rotate(360deg); opacity: 1; }
        }
        @keyframes float {
          0% { transform: translateY(0); opacity: 0.4; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-50px); opacity: 0.1; }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TestimonialCarousel2;
