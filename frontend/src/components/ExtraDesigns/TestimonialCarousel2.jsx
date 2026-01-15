"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";

const TestimonialCarousel2 = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [direction, setDirection] = useState("right");

  /** ======================================================
   * TESTIMONIAL DATA (UNCHANGED)
   ======================================================= */
  const testimonials = [
    {
      id: 1,
      name: "Alisa Raichel",
      role: "Seemandham",
      image: "/Testimonials/Alisha.avif",
      rating: 5,
      text: "We had our important events in our life like meternity, seemantham and baby photoshoot with TM STUDIOS. It was a awesome experience and great work from them. Grateful to them.",
      event: "Maternity Shoot, Chennai",
      date: "February 5th, 2023",
    },
    {
      id: 2,
      name: "Hemalatha Sethuram",
      role: "Maternity-shoot",
      image: "/Testimonials/Hemalatha-S-1.avif",
      rating: 5,
      text: "Subalesh has a great talent n personally we booked two events with him. His work s a magic n astonishes us. He has a great patience to deal his clients n very comfortable to work with. Rates are nominal too. My few friends booked events on seeing his work. Very happy to help him grow more. All d best subalesh n team !!",
      event: "Beach Pre-Wedding, Mahabalipuram",
      date: "July 22nd, 2023",
    },
    {
      id: 3,
      name: "Charu Meena",
      role: "Wedding",
      image: "/Testimonials/Manoj-Charu.avif",
      rating: 5,
      text: "Choosing TM Studios was one of the best decisions we made for our wedding.",
      event: "Traditional Wedding Wedding, Goa",
      date: "April 23rd, 2023",
    },
   
  ];

  /** ======================================================
   * AUTOPLAY
   ======================================================= */
  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setDirection("right");
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlay, testimonials.length]);

  /** ======================================================
   * PARALLAX — GPU only, NO React re-renders
   ======================================================= */
  const orbRef1 = useRef(null);
  const orbRef2 = useRef(null);
  const parallax = useRef({ x: 0, y: 0 });
  let raf = null;

  useEffect(() => {
    const handleMove = (e) => {
      parallax.current.x = (e.clientX / window.innerWidth - 0.5) * 40;
      parallax.current.y = (e.clientY / window.innerHeight - 0.5) * 40;

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

  /** ======================================================
   * MEMOIZED PARTICLES 
   ======================================================= */
  const particles = useMemo(
    () =>
      Array.from({ length: 25 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 5 + Math.random() * 10,
      })),
    []
  );

  const currentTestimonial = testimonials[activeIndex];

  /** ======================================================
   * FINAL RENDER
   ======================================================= */

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 py-20 px-4 overflow-hidden">

      {/* PARTICLES */}
      <div className="absolute inset-0 pointer-events-none">
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

      {/* ORBS — GPU TRANSFORMED */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          ref={orbRef1}
          className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ top: "20%", left: "12%" }}
        />
        <div
          ref={orbRef2}
          className="absolute w-[28rem] h-[28rem] bg-pink-500/20 rounded-full blur-3xl animate-pulse"
          style={{ bottom: "12%", right: "10%", animationDelay: "1s" }}
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto relative z-10">

        {/* HEADER */}
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

        {/* CARD */}
        <div className="relative">
          <div className="bg-white/95 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl">
            <div className="grid md:grid-cols-5">

              {/* IMAGE */}
              <div className="md:col-span-2 relative h-64 md:h-full flex items-center justify-center">

                <div
                  key={currentTestimonial.id}
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

              {/* TEXT CONTENT */}
              <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
                <div
                  key={currentTestimonial.id + "-text"}
                  className={`transition-all duration-700 ${
                    direction === "right"
                      ? "animate-[fadeInUp_0.7s_ease-out]"
                      : "animate-[fadeInDown_0.7s_ease-out]"
                  }`}
                >
                  {/* STARS */}
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

                  {/* DOTS */}
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
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ARROWS */}
          <button
            onClick={() => {
              setDirection("left");
              setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
              setIsAutoPlay(false);
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-600 hover:to-rose-500 hover:text-white transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              setDirection("right");
              setActiveIndex((prev) => (prev + 1) % testimonials.length);
              setIsAutoPlay(false);
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-600 hover:to-rose-500 hover:text-white transition-all"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* THUMBNAILS */}
        <div className="flex justify-center gap-4 mt-12">
          {testimonials.map((t, index) => (
            <button
              key={t.id}
              onClick={() => {
                setDirection(index > activeIndex ? "right" : "left");
                setActiveIndex(index);
                setIsAutoPlay(false);
              }}
              className={`transition-all ${
                activeIndex === index ? "scale-110" : "scale-90 opacity-60"
              }`}
            >
              <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-white">
                <img src={t.image} className="w-full h-full object-cover" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ANIMATIONS */}
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
