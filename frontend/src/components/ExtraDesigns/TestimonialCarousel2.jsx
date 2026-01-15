"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";

/** ======================================================
 * STATIC MEMOIZED TESTIMONIAL DATA
 ======================================================= */
const TESTIMONIALS = [
  {
    id: 1,
    name: "Alisa Raichel",
    role: "Seemandham",
    image: "/Testimonials/Alisha.avif",
    rating: 5,
    text:
      "We had our important events in our life like maternity, seemantham and baby photoshoot with TM STUDIOS. It was an awesome experience and great work from them. Grateful to them.",
    event: "Maternity Shoot, Chennai",
    date: "February 5th, 2023",
  },
  {
    id: 2,
    name: "Hemalatha Sethuram",
    role: "Maternity-shoot",
    image: "/Testimonials/Hemalatha-S-1.avif",
    rating: 5,
    text:
      "Subalesh has great talent. We personally booked two events with him. His work is pure magic and astonishes us. He has great patience and is very comfortable to work with.",
    event: "Beach Pre-Wedding, Mahabalipuram",
    date: "July 22nd, 2023",
  },
  {
    id: 3,
    name: "Charu Meena",
    role: "Wedding",
    image: "/Testimonials/Manoj-Charu.avif",
    rating: 5,
    text:
      "Choosing TM Studios was one of the best decisions we made for our wedding.",
    event: "Traditional Wedding, Goa",
    date: "April 23rd, 2023",
  },
];

export default function TestimonialCarousel2() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [direction, setDirection] = useState("right");

  /** ======================================================
   * AUTO PLAY
   ======================================================= */
  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setDirection("right");
      setActiveIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlay]);

  /** ======================================================
   * GPU PARALLAX
   ======================================================= */
  const orb1 = useRef(null);
  const orb2 = useRef(null);
  const coords = useRef({ x: 0, y: 0 });
  const ticking = useRef(false);

  const handleMouseMove = useCallback((e) => {
    coords.current.x = (e.clientX / window.innerWidth - 0.5) * 40;
    coords.current.y = (e.clientY / window.innerHeight - 0.5) * 40;

    if (!ticking.current) {
      ticking.current = true;
      requestAnimationFrame(() => {
        orb1.current.style.transform = `translate3d(${
          coords.current.x * 0.3
        }px, ${coords.current.y * 0.3}px, 0)`;

        orb2.current.style.transform = `translate3d(${
          coords.current.x * -0.3
        }px, ${coords.current.y * -0.3}px, 0)`;

        ticking.current = false;
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  /** ======================================================
   * PARTICLES
   ======================================================= */
  const particles = useMemo(() => {
    return Array.from({ length: 25 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
    }));
  }, []);

  const current = TESTIMONIALS[activeIndex];

  /** ======================================================
   * ACTION HANDLERS
   ======================================================= */
  const goPrev = useCallback(() => {
    setDirection("left");
    setActiveIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    setIsAutoPlay(false);
  }, []);

  const goNext = useCallback(() => {
    setDirection("right");
    setActiveIndex((i) => (i + 1) % TESTIMONIALS.length);
    setIsAutoPlay(false);
  }, []);

  const goTo = useCallback(
    (i) => {
      setDirection(i > activeIndex ? "right" : "left");
      setActiveIndex(i);
      setIsAutoPlay(false);
    },
    [activeIndex]
  );

  /** ======================================================
   * RENDER
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

      {/* ORBS */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          ref={orb1}
          className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ top: "20%", left: "12%" }}
        />
        <div
          ref={orb2}
          className="absolute w-[28rem] h-[28rem] bg-pink-500/20 rounded-full blur-3xl animate-pulse"
          style={{ bottom: "12%", right: "10%", animationDelay: "1s" }}
        />
      </div>

      {/* MAIN */}
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
          <div className="bg-white/95 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl h-auto md:h-[540px] lg:h-[570px] xl:h-[600px]">
            <div className="grid md:grid-cols-5 h-full">

              {/* IMAGE */}
              <div className="md:col-span-2 relative h-64 md:h-full flex items-center justify-center">
                <div
                  key={current.id}
                  className={`absolute inset-0 transition-all duration-700 ${
                    direction === "right"
                      ? "animate-[slideInRight_0.7s_ease-out]"
                      : "animate-[slideInLeft_0.7s_ease-out]"
                  }`}
                >
                  <img
                    src={current.image}
                    alt={current.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top md:object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="absolute top-6 left-6 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Quote className="w-8 h-8 text-pink-600" />
                </div>
              </div>

              {/* TEXT */}
              <div className="md:col-span-3 p-6 sm:p-8 md:p-12 flex flex-col justify-center">
                <div
                  key={current.id + "-text"}
                  className={`transition-all duration-700 ${
                    direction === "right"
                      ? "animate-[fadeInUp_0.7s_ease-out]"
                      : "animate-[fadeInDown_0.7s_ease-out]"
                  }`}
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: current.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-pink-500 text-pink-500" />
                    ))}
                  </div>

                  <p className="text-neutral-700 text-lg md:text-xl italic leading-relaxed mb-6">
                    "{current.text}"
                  </p>

                  <h3 className="text-2xl font-bold">{current.name}</h3>
                  <p className="text-pink-600 font-medium">{current.role}</p>

                  <div className="flex flex-wrap gap-2 mt-2 text-sm">
                    <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full">
                      {current.event}
                    </span>
                    <span className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full">
                      {current.date}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-6">
                    {TESTIMONIALS.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => goTo(idx)}
                        className={`h-2 rounded-full transition-all ${
                          activeIndex === idx
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

          {/* NAV BUTTONS */}
          <button
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-600 hover:to-rose-500 hover:text-white transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-600 hover:to-rose-500 hover:text-white transition-all"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* THUMBNAILS */}
        <div className="flex justify-center gap-4 mt-12">
          {TESTIMONIALS.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => goTo(idx)}
              className={`transition-all ${
                activeIndex === idx ? "scale-110" : "scale-90 opacity-60"
              }`}
            >
              <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-white">
                <img
                  src={t.image}
                  alt={t.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-top md:object-center"
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ANIMATIONS */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0);
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-40px);
            opacity: 0.1;
          }
        }
      `}</style>
    </div>
  );
}
