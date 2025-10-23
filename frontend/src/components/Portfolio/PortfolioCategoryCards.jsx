// src/components/Portfolio/PortfolioCategoryCards.jsx
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, ArrowUpRight, Heart } from 'lucide-react';

// Centralize data and ensure reusability
const USER_IMAGE_URL = '/Weddings/beautiful-husband-wife-posing-beach.jpg';

const categories = [
  {
    id: 'portraits',
    title: 'Portraits',
    description: 'Timeless individual & couple portraits',
    image: USER_IMAGE_URL,
    count: '50+ Sessions',
    color: 'from-rose-600 to-pink-700', // Adjusted for contrast
    ariaLabel: 'View the Portraits photography gallery',
  },
  {
    id: 'pre-weddings',
    title: 'Pre Weddings',
    description: 'Romantic pre-wedding stories',
    image: USER_IMAGE_URL,
    count: '120+ Couples',
    color: 'from-amber-600 to-orange-700', // Adjusted for contrast
    ariaLabel: 'View the Pre Weddings photography gallery',
  },
  {
    id: 'tamil-weddings',
    title: 'Tamil Weddings',
    description: 'Traditional Tamil ceremonies',
    image: USER_IMAGE_URL,
    count: '80+ Weddings',
    color: 'from-emerald-600 to-teal-700', // Adjusted for contrast
    ariaLabel: 'View the Tamil Weddings photography gallery',
  },
  {
    id: 'telugu-weddings',
    title: 'Telugu Weddings',
    description: 'Vibrant Telugu celebrations',
    image: USER_IMAGE_URL,
    count: '65+ Weddings',
    color: 'from-blue-600 to-indigo-700', // Adjusted for contrast
    ariaLabel: 'View the Telugu Weddings photography gallery',
  }
];

const PortfolioCategoryCards = ({ data = categories, title = 'Photography Collections', subtitle = 'Our Services' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const router = useRouter();

  // Basic client-side fade-in on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100" aria-labelledby="portfolio-heading">
      
      {/* Header Section */}
      <div className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.1),transparent_50%)]"></div>
        
        <div className={`max-w-7xl mx-auto text-center relative z-10 transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-2 bg-white shadow-lg px-6 py-3 rounded-full mb-8" role="status">
            <Camera className="w-5 h-5 text-amber-600" aria-hidden="true" />
            <span className="text-sm font-semibold text-neutral-700 tracking-wide uppercase">{subtitle}</span>
          </div>
          
          <h1 id="portfolio-heading" className="text-5xl md:text-7xl font-serif text-neutral-900 mb-6 tracking-tight">
            {title.split(' ')[0]}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-rose-600">
              {title.split(' ').slice(1).join(' ')}
            </span>
          </h1>
          
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Explore our specialized photography services tailored to capture your most precious moments
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {data.map((category, index) => (
            <div
              key={category.id}
              role="link"
              aria-label={category.ariaLabel}
              tabIndex={0}
              onClick={() => router.push(`/portfolio2/${category.id}`)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') router.push(`/portfolio2/${category.id}`); }}
              className={`group relative h-[600px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              } hover:scale-[1.02] shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/50`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Background Image */}
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
                <img
                  src={category.image}
                  alt={`Background for ${category.title} category`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-70 group-hover:opacity-80 transition-opacity duration-500`}></div>

              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-10">
                {/* Top Badge */}
                <div className="flex justify-between items-start">
                  <div className={`bg-white/20 backdrop-blur-md px-5 py-2 rounded-full transition-all duration-500 ${
                    hoveredCategory === category.id ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  }`}>
                    <span className="text-white text-sm font-medium">{category.count}</span>
                  </div>
                  
                  <div className={`w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-500 border-2 border-white/30 ${
                    hoveredCategory === category.id ? 'rotate-45 scale-110' : 'rotate-0 scale-100'
                  }`}>
                    <ArrowUpRight className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="transform transition-all duration-500 group-hover:translate-y-0 translate-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
                    <div className="flex gap-1">
                      {[1, 2, 3].map((dot) => (
                        <div
                          key={dot}
                          className="w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ transitionDelay: `${dot * 100}ms` }}
                          aria-hidden="true"
                        ></div>
                      ))}
                    </div>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
                    {category.title}
                  </h2>
                  
                  <p className="text-white/90 text-lg mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 transform translate-y-2 group-hover:translate-y-0">
                    {category.description}
                  </p>

                  <button className="inline-flex items-center gap-3 bg-white text-neutral-900 px-8 py-4 rounded-full font-semibold shadow-2xl transform transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 hover:bg-neutral-100" aria-label={`Go to ${category.title} gallery`}>
                    <span>View Gallery</span>
                    <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Corner Accent */}
              <div className="absolute bottom-6 left-6 w-16 h-16 border-l-4 border-b-4 border-white/40 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-6">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-neutral-300 to-transparent"></div>
            <p className="text-neutral-500 text-lg">
              Can't decide? Browse all our work
            </p>
            <button
              onClick={() => router.push('/portfolio2/all')}
              className="px-10 py-4 border-2 border-neutral-300 hover:border-amber-500 text-neutral-700 hover:text-amber-600 rounded-full font-semibold transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              View Complete Portfolio
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioCategoryCards;