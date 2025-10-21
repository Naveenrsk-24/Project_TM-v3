"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Camera, Heart, Video, Sparkles, Award, Users, MapPin, Clock, Eye, ExternalLink } from 'lucide-react';

const AnimatedServicesSection = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [clickedCard, setClickedCard] = useState(null);
  const sectionRef = useRef(null);

  const services = [
    {
      id: 1,
      icon: Camera,
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
      title: "Professional Wedding Photography Chennai",
      keywords: "wedding photographers in Chennai, best wedding photography Chennai, candid wedding photographers, traditional wedding photography",
      description: "Award-winning wedding photographers in Chennai specializing in candid wedding photography and traditional wedding shoots. Our professional wedding photography services capture every precious moment of your special day with artistic excellence and emotional depth.",
      features: ["Candid Moments", "Traditional Shots", "Pre-Wedding", "Post-Wedding"],
      stats: { projects: "500+", rating: "4.9/5" },
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 2,
      icon: Video,
      image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80",
      title: "Cinematic Wedding Videography Services",
      keywords: "wedding videographers Chennai, cinematic wedding films, wedding video editing, documentary style videography",
      description: "Expert wedding videographers creating cinematic wedding films and documentary-style videos. Our wedding videography services in Chennai include drone coverage, same-day edits, and premium wedding film production for unforgettable memories.",
      features: ["4K Filming", "Drone Shots", "Same Day Edit", "Highlight Reels"],
      stats: { projects: "300+", rating: "4.8/5" },
      gradient: "from-blue-500 to-purple-500"
    },
    {
      id: 3,
      icon: Heart,
      image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80",
      title: "Pre-Wedding Photography Shoots",
      keywords: "pre-wedding photoshoot Chennai, couple photoshoot, outdoor photography, romantic photoshoot locations",
      description: "Creative pre-wedding photography in Chennai at stunning locations. Our pre-wedding photoshoots capture your love story with romantic outdoor photography, beach shoots, and destination pre-wedding sessions across Tamil Nadu and India.",
      features: ["Beach Shoots", "Urban Locations", "Traditional Settings", "Destination Shoots"],
      stats: { projects: "450+", rating: "5.0/5" },
      gradient: "from-pink-500 to-red-500"
    },
    {
      id: 4,
      icon: Sparkles,
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
      title: "Candid Wedding Photography Specialists",
      keywords: "candid photographers Chennai, natural wedding photos, photojournalistic wedding photography, unposed wedding pictures",
      description: "Leading candid wedding photographers in Chennai capturing authentic emotions and natural moments. Our photojournalistic approach to wedding photography ensures genuine, unposed pictures that tell your unique love story beautifully.",
      features: ["Natural Emotions", "Unposed Shots", "Storytelling", "Real Moments"],
      stats: { projects: "600+", rating: "4.9/5" },
      gradient: "from-amber-500 to-orange-500"
    },
    {
      id: 5,
      icon: Users,
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
      title: "Engagement & Reception Photography",
      keywords: "engagement photography Chennai, reception photographers, ceremony photography, wedding event photography",
      description: "Professional engagement photography and reception coverage in Chennai. Our wedding event photography services include engagement ceremonies, mehendi, sangeet, and reception photography with complete event documentation and family portraits.",
      features: ["Engagement Shoots", "Reception Coverage", "Family Portraits", "Event Documentation"],
      stats: { projects: "400+", rating: "4.8/5" },
      gradient: "from-green-500 to-teal-500"
    },
    {
      id: 6,
      icon: Award,
      image: "https://images.unsplash.com/photo-1525258112551-afdb0a54e6d8?w=800&q=80",
      title: "Premium Wedding Photography Packages",
      keywords: "wedding photography packages Chennai, affordable wedding photographers, budget wedding photography, best photography deals",
      description: "Customizable wedding photography packages in Chennai for every budget. Our affordable wedding photography services include traditional, candid, and cinematic coverage with professional editing, albums, and digital delivery at competitive prices.",
      features: ["Custom Packages", "Album Design", "Digital Delivery", "Flexible Pricing"],
      stats: { projects: "700+", rating: "4.9/5" },
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            services.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...new Set([...prev, index])]);
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCardClick = (index) => {
    setClickedCard(clickedCard === index ? null : index);
  };

  return (
    <div ref={sectionRef} className="relative min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 py-20 px-4 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
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
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold rounded-full shadow-lg">
              COMPREHENSIVE SERVICES
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="block mb-2 text-white">Wedding Photography</span>
            <span className="bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Services in Chennai
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Professional wedding photographers in Chennai offering candid photography, cinematic videography, 
            pre-wedding shoots, and complete wedding documentation services at competitive prices
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isVisible = visibleCards.includes(index);
            const isHovered = hoveredCard === index;
            const isClicked = clickedCard === index;

            return (
              <div
                key={service.id}
                className={`group relative transition-all duration-700 cursor-pointer ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleCardClick(index)}
              >
                {/* Card */}
                <div className={`relative h-full bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 border border-white/10 ${
                  isHovered ? 'scale-105 -translate-y-2 shadow-pink-500/20' : ''
                } ${isClicked ? 'ring-2 ring-pink-500' : ''}`}>
                  
                  {/* Image Background */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        isHovered ? 'scale-110 brightness-110' : 'scale-100 brightness-75'
                      }`}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-40 mix-blend-multiply transition-opacity duration-500 ${
                      isHovered ? 'opacity-60' : ''
                    }`}></div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>

                    {/* Floating Icon */}
                    <div className={`absolute top-4 right-4 w-14 h-14 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center transform transition-all duration-500 border border-white/20 ${
                      isHovered ? 'rotate-12 scale-110 bg-white/20' : 'rotate-0 scale-100'
                    }`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Stats Badge */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                        <span className="text-white text-xs font-semibold">{service.stats.projects}</span>
                      </div>
                      <div className="px-3 py-1 bg-amber-500/20 backdrop-blur-md rounded-full border border-amber-500/30">
                        <span className="text-amber-300 text-xs font-semibold">★ {service.stats.rating}</span>
                      </div>
                    </div>

                    {/* Hover Eye Icon */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/40 animate-pulse">
                        <Eye className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    {/* Title */}
                    <h3 className={`text-xl font-bold mb-3 text-white transition-all duration-300 ${
                      isHovered ? 'text-transparent bg-gradient-to-r bg-clip-text ' + service.gradient : ''
                    }`}>
                      {service.title}
                    </h3>

                    {/* Keywords Badge */}
                    <div className="mb-4 p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                      <p className="text-xs text-white/60 leading-relaxed italic">
                        <strong className="text-pink-400">Keywords:</strong> {service.keywords}
                      </p>
                    </div>

                    {/* Description - Expandable */}
                    <div className={`transition-all duration-500 overflow-hidden ${
                      isClicked ? 'max-h-48' : 'max-h-12'
                    }`}>
                      <p className="text-white/70 leading-relaxed text-sm">
                        {service.description}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className={`grid grid-cols-2 gap-2 mt-4 transition-all duration-500 ${
                      isClicked ? 'opacity-100 max-h-32' : 'opacity-0 max-h-0 overflow-hidden'
                    }`}>
                      {service.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-white/80"
                          style={{ 
                            animation: isClicked ? `slideIn 0.3s ease-out ${idx * 0.1}s both` : 'none'
                          }}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient}`}></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 mt-4 flex items-center justify-center gap-2 ${
                      isHovered
                        ? `bg-gradient-to-r ${service.gradient} text-white shadow-lg shadow-pink-500/30`
                        : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
                    }`}>
                      {isClicked ? (
                        <>
                          <ExternalLink className="w-4 h-4" />
                          View Portfolio
                        </>
                      ) : (
                        isHovered ? 'Click to Expand' : 'Learn More'
                      )}
                    </button>
                  </div>

                  {/* Click Indicator */}
                  {isClicked && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-ping"></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom SEO Content */}
        <div className="bg-slate-800/50 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10">
          <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Why Choose Our Wedding Photography Services in Chennai?
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-white/80 leading-relaxed mb-4">
                As the <strong className="text-white">best wedding photographers in Chennai</strong>, we specialize in <strong className="text-white">candid wedding photography</strong>, 
                <strong className="text-white"> traditional photography</strong>, and <strong className="text-white">cinematic videography</strong>. Our expert team captures authentic 
                emotions and beautiful moments throughout your wedding celebration.
              </p>
              <p className="text-white/80 leading-relaxed">
                From <strong className="text-white">engagement photography</strong> to <strong className="text-white">pre-wedding photoshoots</strong> and complete 
                <strong className="text-white"> wedding day coverage</strong>, we offer comprehensive photography packages tailored to your needs and budget.
              </p>
            </div>
            <div>
              <p className="text-white/80 leading-relaxed mb-4">
                Our <strong className="text-white">professional wedding videographers</strong> create stunning <strong className="text-white">cinematic wedding films</strong> with 
                drone footage, same-day edits, and documentary-style storytelling that preserves your memories forever.
              </p>
              <p className="text-white/80 leading-relaxed">
                Serving couples across Chennai, Tamil Nadu, and India with <strong className="text-white">affordable wedding photography packages</strong>, 
                premium quality service, and timely delivery of beautifully edited photos and videos.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.5; }
        }
        @keyframes slideIn {
          from { transform: translateX(-10px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default AnimatedServicesSection;