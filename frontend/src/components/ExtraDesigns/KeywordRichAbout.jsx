"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Camera, Award, Users, MapPin, Sparkles } from "lucide-react";

const KeywordRichAbout = () => {
  const [typedText, setTypedText] = useState("");
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [visibleStats, setVisibleStats] = useState([]);
  const [hoveredStat, setHoveredStat] = useState(null);

  const sectionRef = useRef(null);

  /* ---------------------------- DATA ---------------------------- */
  const phrases = [
    "Best Wedding Photographers in Chennai",
    "Professional Candid Photography Experts",
    "Award-Winning Wedding Cinematographers",
    "Trusted Pre-Wedding Photoshoot Specialists",
  ];

  const stats = [
    {
      number: "1000+",
      label: "Weddings Captured",
      icon: Camera,
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80",
      description: "Epic love stories documented",
    },
    {
      number: "50K+",
      label: "Happy Clients",
      icon: Users,
      image:
        "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&q=80",
      description: "Satisfied couples worldwide",
    },
    {
      number: "15+",
      label: "Industry Awards",
      icon: Award,
      image:
        "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&q=80",
      description: "National & international recognition",
    },
    {
      number: "25+",
      label: "Cities Covered",
      icon: MapPin,
      image:
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80",
      description: "Pan-India coverage",
    },
  ];

  /* ------------------------ TYPEWRITER -------------------------- */
  useEffect(() => {
    const text = phrases[currentPhrase];
    const speed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      setTypedText((prev) =>
        isDeleting
          ? text.substring(0, prev.length - 1)
          : text.substring(0, prev.length + 1)
      );

      if (!isDeleting && typedText === text) {
        setTimeout(() => setIsDeleting(true), 1500);
      }

      if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setCurrentPhrase((prev) => (prev + 1) % phrases.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, currentPhrase]);

  /* ------------------------ FLOAT DOTS --------------------------- */
  const floatingDots = useMemo(
    () =>
      Array.from({ length: 12 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${6 + Math.random() * 6}s`,
      })),
    []
  );

  /* -------------------- STATS REVEAL OBSERVER ------------------ */
  const revealStats = useCallback(() => {
    stats.forEach((_, index) => {
      setTimeout(() => {
        setVisibleStats((prev) => (prev.includes(index) ? prev : [...prev, index]));
      }, index * 180);
    });
  }, [stats]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) revealStats();
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [revealStats]);

  /* ============================================================== */

  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 py-16 md:py-20 px-4 overflow-hidden">

      {/* Floating dots */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingDots.map((dot, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-white/10 rounded-full animate-about-float"
            style={{
              left: dot.left,
              top: dot.top,
              animationDelay: dot.delay,
              animationDuration: dot.duration,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ---------------- HEADER ---------------- */}
        <div className="text-center mb-16 md:mb-20 px-2">

          <span className="inline-block px-4 py-2 md:px-6 md:py-3 
            bg-white/10 backdrop-blur-md border border-white/20 
            rounded-full text-white font-medium md:font-bold 
            text-xs md:text-sm tracking-wide mb-6"
          >
            PROFESSIONAL PHOTOGRAPHY SERVICES
          </span>

          <h2 className="text-3xl xs:text-4xl md:text-6xl font-bold mb-4 md:mb-6">
            <span className="block text-white mb-2">We Are</span>

            <span className="block text-transparent bg-clip-text bg-gradient-to-r 
              from-amber-400 via-pink-400 to-purple-400"
            >
              {typedText}
              <span className="animate-about-blink">|</span>
            </span>
          </h2>

          <p className="text-base md:text-xl text-white/80 max-w-3xl md:max-w-4xl mx-auto leading-relaxed px-2">
            Premier <strong className="text-white">wedding photography studio in Chennai</strong>,
            specializing in <strong className="text-white">candid photography</strong>,
            <strong className="text-white"> traditional wedding shoots</strong>,
            <strong className="text-white"> cinematic videography</strong> and
            <strong className="text-white"> pre-wedding photography</strong>.
          </p>
        </div>

        {/* ---------------- STATS ---------------- */}
        <div
          ref={sectionRef}
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-4 
            gap-6 
            md:gap-10 
            mb-12 
            md:mb-20
          "
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isVisible = visibleStats.includes(index);
            const isHovered = hoveredStat === index;

            return (
              <div
                key={index}
                className={`relative transition-all duration-700 cursor-pointer ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <div className="relative bg-slate-800/50 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl hover:shadow-pink-500/20 transition-all duration-500 hover:-translate-y-2 border border-white/10 h-full">

                  {/* Background Image */}
                  <div
                    className={`absolute inset-0 transition-all duration-700 ${
                      isHovered ? "scale-110 opacity-30" : "scale-100 opacity-10"
                    }`}
                  >
                    <img
                      src={stat.image}
                      alt={stat.label}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative p-6 md:p-8 text-center">
                    <div
                      className={`mx-auto w-14 h-14 md:w-16 md:h-16 mb-4 
                        bg-gradient-to-r from-purple-500 to-pink-500 
                        rounded-full flex items-center justify-center
                        transition-all duration-500
                        ${isHovered ? "scale-110 rotate-12" : ""}
                      `}
                    >
                      <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                    </div>

                    <div className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-pink-400 bg-clip-text text-transparent mb-2">
                      {isVisible ? stat.number : "0"}
                    </div>

                    <div className="text-white font-semibold text-base md:text-lg mb-1">
                      {stat.label}
                    </div>

                    <div
                      className={`text-white/60 text-xs md:text-sm transition-all duration-500 ${
                        isHovered ? "opacity-100 max-h-20" : "opacity-0 max-h-0"
                      } overflow-hidden`}
                    >
                      {stat.description}
                    </div>
                  </div>

                  {/* Bottom Accent Line */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r 
                      from-purple-500 to-pink-500 transition-transform duration-500 
                      ${isHovered ? "scale-x-100" : "scale-x-0"}
                    `}
                  ></div>

                  {/* Sparkle Icon */}
                  {isHovered && (
                    <div className="absolute top-4 right-4">
                      <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-amber-400 animate-pulse" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default React.memo(KeywordRichAbout);
