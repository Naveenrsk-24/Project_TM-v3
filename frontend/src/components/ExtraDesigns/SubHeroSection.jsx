"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Camera, Heart, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SubHeroSection() {
  const [isMounted, setIsMounted] = useState(false);

  const cardRef = useRef(null);
  const orbRef1 = useRef(null);
  const orbRef2 = useRef(null);

  /** ------------------------------------------------
   * 1. MOUNT FADE-IN
   -------------------------------------------------- */
  useEffect(() => {
    setIsMounted(true);
  }, []);

  /** ------------------------------------------------
   * 2. GPU PARALLAX — ZERO React state usage
   * rAF throttled, buttery smooth
   -------------------------------------------------- */
  const parallax = useRef({ x: 0, y: 0 });
  let raf = null;

  useEffect(() => {
    const handleMove = (e) => {
      parallax.current.x = (e.clientX / window.innerWidth - 0.5) * 40;
      parallax.current.y = (e.clientY / window.innerHeight - 0.5) * 40;

      if (!raf) {
        raf = requestAnimationFrame(() => {
          if (orbRef1.current) {
            orbRef1.current.style.transform = `translate3d(${parallax.current.x * 0.3}px, ${parallax.current.y * 0.3}px, 0)`;
          }
          if (orbRef2.current) {
            orbRef2.current.style.transform = `translate3d(${parallax.current.x * -0.3}px, ${parallax.current.y * -0.3}px, 0)`;
          }
          raf = null;
        });
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  /** ------------------------------------------------
   * 3. TILT EFFECT — now fully GPU transform
   * No React re-render needed
   -------------------------------------------------- */
  const handleTilt = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    cardRef.current.style.transform = `
      perspective(900px)
      rotateX(${y * -10}deg)
      rotateY(${x * 10}deg)
      scale3d(1, 1, 1)
    `;
  };

  const resetTilt = () => {
    cardRef.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  /** ------------------------------------------------
   * 4. MEMOIZED PARTICLES (no random on every render)
   -------------------------------------------------- */
  const particles = useMemo(
    () =>
      Array.from({ length: 25 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 6 + Math.random() * 8,
      })),
    []
  );

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 overflow-hidden">

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

      {/* PARALLAX ORBS (GPU moved, NOT top/left) */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          ref={orbRef1}
          className="absolute w-96 h-96 bg-purple-500/20 blur-3xl rounded-full animate-pulse"
          style={{ top: "12%", left: "10%" }}
        />
        <div
          ref={orbRef2}
          className="absolute w-[30rem] h-[30rem] bg-pink-500/20 blur-3xl rounded-full animate-pulse"
          style={{ bottom: "12%", right: "10%", animationDelay: "1s" }}
        />
      </div>

      {/* MAIN LAYOUT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* IMAGE + TILT BLOCK */}
          <div
            className={`transition-all duration-1000 ${
              isMounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
            }`}
          >
            <div className="relative" onMouseMove={handleTilt} onMouseLeave={resetTilt}>
              
              {/* DECORATIVE ELEMENTS — unchanged */}
              <div className="absolute -top-6 -left-6 w-24 h-24 border-4 border-rose-400/30 rounded-3xl animate-spin-slow" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-4 border-amber-400/30 rounded-full animate-ping-slow" />

              <div className="absolute top-10 right-10 animate-bounce-slow">
                <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                  {/* <Heart className="w-6 h-6 text-rose-500 fill-rose-500" /> */}
                </div>
              </div>

              <div className="absolute bottom-16 left-8 animate-bounce-delayed">
                <div className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <Camera className="w-7 h-7 text-amber-600" />
                </div>
              </div>

              {/* TILT CARD */}
              <div
                ref={cardRef}
                className="relative transition-transform duration-200 ease-out group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 to-amber-400/20 rounded-3xl blur-xl group-hover:blur-2xl" />

                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src="/Weddings/Manoj&Charu/Manoj-Charu-Banner.avif"
                    alt="Beautiful Indian wedding ceremony"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </div>

              {/* SPARKLES BADGE */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-xl px-6 py-3 flex items-center gap-3 animate-fade-in-up">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span className="font-semibold text-gray-800">20+ Weddings Captured</span>
              </div>
            </div>
          </div>

          {/* TEXT CONTENT — unchanged */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isMounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
            }`}
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-rose-400" />
              <span className="text-sm font-serif text-white">
                Wedding Photography by TM Studios - Chennai
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif mb-6 text-white">
              A Wedding Photography Team That Feels Like{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500">
                Family!
              </span>
            </h2>

            <p className="text-lg text-white/90 font-serif mb-4">
             At TM Studios, we believe every wedding deserves to be remembered exactly the way it felt. More than photographers, we become a part of your celebration, blending naturally with your family, traditions, and emotions. 
            </p>

            <p className="text-lg text-white/90 font-serif mb-8">
             From heartfelt rituals to candid joy, we document your wedding story with honesty, warmth, and timeless elegance.
            </p>

            {/* Features (unchanged text) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 font-serif">
              {[
                {
                  text: "Cinematic Wedding Photography",
                  desc: "Film inspired storytelling that brings your wedding moments to life with rich tones, thoughtful lighting, and carefully crafted composition.",
                },
                {
                  text: "Candid Wedding Photography",
                  desc: "Pure, unscripted emotions captured naturally, without posing or interruption.",
                },
                {
                  text: "Traditional Wedding Photography",
                  desc: "Every ritual and ceremony is documented with respect, clarity, and cultural understanding.",
                },
                {
                  text: "Vibrant & Colorful Photography",
                  desc: "Bright, lively visuals that celebrate the colors and energy of Indian weddings.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-white/50 border border-gray-100 hover:border-rose-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="font-semibold text-gray-800">{item.text}</div>
                  <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
             <Link href="/weddings" aria-label="Wedding Gallery">
            <button className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <span>Explore Wedding Albums</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-60px); opacity: 0.9; }
          100% { transform: translateY(-120px); opacity: 0.1; }
        }
        .animate-float { animation: float linear infinite; }

        @keyframes spin-slow {
          from { transform: rotate(0); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 18s linear infinite; }

        @keyframes ping-slow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.15); opacity: 0.1; }
        }
        .animate-ping-slow { animation: ping-slow 4s infinite; }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-bounce-slow { animation: bounce-slow 3s infinite; }

        @keyframes bounce-delayed {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-10px) rotate(4deg); }
        }
        .animate-bounce-delayed { animation: bounce-delayed 4.5s infinite; }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
      `}</style>
    </section>
  );
}
