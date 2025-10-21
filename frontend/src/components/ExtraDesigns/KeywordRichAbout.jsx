'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Camera, Award, Users, MapPin, TrendingUp, CheckCircle, Sparkles, Play } from 'lucide-react';

const KeywordRichAbout = () => {
  const [typedText, setTypedText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [visibleStats, setVisibleStats] = useState([]);
  const [hoveredStat, setHoveredStat] = useState(null);
  const [activeExpertise, setActiveExpertise] = useState(null);
  const sectionRef = useRef(null);

  const phrases = [
    "Best Wedding Photographers in Chennai",
    "Professional Candid Photography Experts",
    "Award-Winning Wedding Cinematographers",
    "Trusted Pre-Wedding Photoshoot Specialists"
  ];

  const stats = [
    { 
      number: "1000+", 
      label: "Weddings Captured", 
      icon: Camera,
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80",
      description: "Epic love stories documented"
    },
    { 
      number: "50K+", 
      label: "Happy Clients", 
      icon: Users,
      image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&q=80",
      description: "Satisfied couples worldwide"
    },
    { 
      number: "15+", 
      label: "Industry Awards", 
      icon: Award,
      image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&q=80",
      description: "National & international recognition"
    },
    { 
      number: "25+", 
      label: "Cities Covered", 
      icon: MapPin,
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80",
      description: "Pan-India coverage"
    }
  ];

  const expertise = [
    {
      title: "Traditional Wedding Photography Chennai",
      description: "Expert traditional wedding photographers capturing South Indian weddings, Tamil Brahmin weddings, Telugu weddings, and all cultural wedding ceremonies with authentic documentation and artistic excellence.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
      icon: "👰"
    },
    {
      title: "Candid Wedding Photography Services",
      description: "Leading candid photographers in Chennai specializing in natural, unposed wedding photography that captures genuine emotions, spontaneous moments, and authentic celebrations throughout your wedding day.",
      image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80",
      icon: "📸"
    },
    {
      title: "Destination Wedding Photography India",
      description: "Professional destination wedding photographers covering weddings across India including Goa, Kerala, Udaipur, Jaipur, and international locations with complete travel photography services.",
      image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80",
      icon: "✈️"
    },
    {
      title: "Pre-Wedding & Engagement Photography",
      description: "Creative pre-wedding photoshoots at scenic locations, beach photography, urban shoots, and traditional engagement photography with concept-based storytelling and romantic couple portraits.",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80",
      icon: "💑"
    },
    {
      title: "Wedding Videography & Cinematography",
      description: "Cinematic wedding videographers creating documentary-style wedding films, drone coverage, 4K video production, same-day edits, and highlight reels with professional color grading.",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80",
      icon: "🎥"
    },
    {
      title: "Affordable Wedding Photography Packages",
      description: "Budget-friendly wedding photography packages in Chennai with customizable options, flexible pricing, complete coverage, professional editing, premium albums, and digital delivery services.",
      image: "https://images.unsplash.com/photo-1525258112551-afdb0a54e6d8?w=600&q=80",
      icon: "💰"
    }
  ];

  // Typewriter Effect
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (typedText.length < currentPhrase.length) {
          setTypedText(currentPhrase.slice(0, typedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(currentPhrase.slice(0, typedText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, currentPhraseIndex]);

  // Intersection Observer for Stats
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stats.forEach((_, index) => {
              setTimeout(() => {
                setVisibleStats((prev) => [...new Set([...prev, index])]);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 py-20 px-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header with Typewriter */}
        <div className="text-center mb-20">
          <div className="mb-6">
            <span className="inline-block px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-bold text-sm tracking-wider">
              PROFESSIONAL PHOTOGRAPHY SERVICES
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 min-h-[120px] md:min-h-[80px]">
            <span className="block text-white mb-2">We Are</span>
            <span className="block bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              {typedText}
              <span className="animate-blink">|</span>
            </span>
          </h2>

          <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            Premier <strong className="text-white">wedding photography studio in Chennai</strong> specializing in <strong className="text-white">candid photography</strong>, 
            <strong className="text-white"> traditional wedding shoots</strong>, <strong className="text-white">cinematic videography</strong>, and <strong className="text-white">pre-wedding photography</strong> 
            services across Tamil Nadu and India
          </p>
        </div>

        {/* Interactive Stats Counter */}
        <div ref={sectionRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isVisible = visibleStats.includes(index);
            const isHovered = hoveredStat === index;
            
            return (
              <div
                key={index}
                className={`relative group transition-all duration-700 cursor-pointer ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <div className="relative bg-slate-800/50 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl hover:shadow-pink-500/20 transition-all duration-500 hover:-translate-y-2 border border-white/10 h-full">
                  
                  {/* Background Image */}
                  <div className={`absolute inset-0 transition-all duration-700 ${
                    isHovered ? 'scale-110 opacity-30' : 'scale-100 opacity-10'
                  }`}>
                    <img 
                      src={stat.image}
                      alt={stat.label}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="relative p-8 text-center">
                    {/* Icon */}
                    <div className={`mx-auto w-16 h-16 mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center transform transition-all duration-500 ${
                      isHovered ? 'scale-110 rotate-12' : ''
                    }`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Number with Counter Animation */}
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-pink-400 bg-clip-text text-transparent mb-2">
                      {isVisible ? stat.number : '0'}
                    </div>

                    {/* Label */}
                    <div className="text-white font-medium mb-2">
                      {stat.label}
                    </div>

                    {/* Description - Shows on Hover */}
                    <div className={`text-white/60 text-sm transition-all duration-500 ${
                      isHovered ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'
                    } overflow-hidden`}>
                      {stat.description}
                    </div>
                  </div>

                  {/* Decorative Line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform transition-transform duration-500 ${
                    isHovered ? 'scale-x-100' : 'scale-x-0'
                  }`}></div>

                  {/* Sparkle Effect */}
                  {isHovered && (
                    <div className="absolute top-4 right-4">
                      <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Expertise Grid */}
        <div className="mb-20">
          <h3 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Our Photography Expertise & Services
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertise.map((item, index) => (
              <div
                key={index}
                className="group relative bg-slate-800/50 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl hover:shadow-pink-500/20 transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-white/10"
                style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
                onClick={() => setActiveExpertise(activeExpertise === index ? null : index)}
              >
                {/* Background Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

                  {/* Emoji Icon */}
                  <div className="absolute top-4 left-4 text-4xl animate-bounce">
                    {item.icon}
                  </div>

                  {/* Number Badge */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                    <span className="text-lg font-bold text-white">{String(index + 1).padStart(2, '0')}</span>
                  </div>

                  {/* Play Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/40 group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Check Icon */}
                  <div className="mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                    {item.title}
                  </h4>

                  {/* Description - Expandable */}
                  <div className={`transition-all duration-500 overflow-hidden ${
                    activeExpertise === index ? 'max-h-48' : 'max-h-16'
                  }`}>
                    <p className="text-white/70 leading-relaxed text-sm">
                      {item.description}
                    </p>
                  </div>

                  {/* Expand Indicator */}
                  <div className="mt-4 flex items-center justify-center">
                    <div className={`text-pink-400 text-xs font-semibold transition-transform duration-300 ${
                      activeExpertise === index ? 'rotate-180' : ''
                    }`}>
                      {activeExpertise === index ? '▲ Click to collapse' : '▼ Click to expand'}
                    </div>
                  </div>
                </div>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                {/* Corner Decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-bl-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>

                {/* Active Indicator */}
                {activeExpertise === index && (
                  <div className="absolute inset-0 border-2 border-pink-500 rounded-2xl pointer-events-none"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SEO-Rich Bottom Section with Background Image */}
        <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl overflow-hidden shadow-2xl">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80"
              alt="Wedding Photography"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-pink-900/90"></div>
          </div>

          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center p-8 md:p-12 text-white">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Leading Wedding Photography Company in Chennai
              </h3>
              <p className="text-white/90 leading-relaxed mb-4">
                With over a decade of experience, we are recognized as the <strong>best wedding photographers in Chennai</strong> 
                offering premium <strong>wedding photography services</strong>, <strong>candid photography</strong>, 
                <strong> traditional photography</strong>, and <strong>cinematic videography</strong> for weddings across India.
              </p>
              <p className="text-white/90 leading-relaxed">
                From intimate <strong>engagement photography</strong> to grand <strong>destination wedding coverage</strong>, 
                our team of expert photographers and videographers deliver exceptional quality, creative storytelling, 
                and personalized service at competitive prices.
              </p>
            </div>
            <div className="space-y-4">
              {[
                "Best Wedding Photographers Chennai",
                "Candid Photography Specialists",
                "Cinematic Wedding Videography",
                "Pre-Wedding Photoshoot Experts",
                "Traditional Wedding Photography",
                "Affordable Photography Packages"
              ].map((keyword, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 hover:translate-x-2 cursor-pointer"
                  style={{ animation: `slideInRight 0.5s ease-out ${index * 0.1}s both` }}
                >
                  <TrendingUp className="w-5 h-5 text-amber-300 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">{keyword}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.5; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default KeywordRichAbout;