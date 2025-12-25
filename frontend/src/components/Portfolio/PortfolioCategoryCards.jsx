// src/components/Portfolio/PortfolioCategoryCards.jsx
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Use Next/Image for performance
import { Camera, ArrowUpRight, Heart } from 'lucide-react';

// Centralize data and ensure reusability
const USER_IMAGE_URL = '/Weddings/beautiful-husband-wife-posing-beach.jpg';

// Define a type for the category data for better clarity and scalability
/**
 * @typedef {object} Category
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} image
 * @property {string} count
 * @property {string} color - Tailwind gradient classes (e.g., 'from-rose-600 to-pink-700')
 * @property {string} ariaLabel
 */

/** @type {Category[]} */
const categories = [
  {
    id: 'weddings',
    title: 'Weddings',
    description: 'Complete wedding day coverage capturing rituals, emotions, and real moments',
    image: '/Weddings/Jalaludeen-Shain/Jalaludeen-Shain-101.jpg',
    count: '10+ Weddings',
    color: 'from-rose-500/80 to-pink-600/80',
    ariaLabel: 'View the Weddings photography gallery',
  },
  {
    id: 'pre-weddings',
    title: 'Pre Weddings',
    description: 'Romantic pre-wedding shoots telling your story before the big day',
    image: "/Weddings/Arul-Vijayalakshmi/Arul-Vijayalakshmi-108.jpg",
    count: '15+ Couples',
    color: 'from-amber-500/80 to-orange-600/80',
    ariaLabel: 'View the Pre-Weddings photography gallery',
  },
  {
    id: 'maternity-shoots',
    title: 'Maternity Shoots',
    description: 'Elegant maternity portraits celebrating motherhood and new beginnings',
    image: USER_IMAGE_URL,
    count: '10+ Sessions',
    color: 'from-emerald-500/80 to-teal-600/80',
    ariaLabel: 'View the Maternity photography gallery',
  },
  {
    id: 'baby-shoots',
    title: 'Baby Shoots',
    description: 'Newborn and baby photos capturing early milestones and expressions',
    image: USER_IMAGE_URL,
    count: '50+ Shoots',
    color: 'from-blue-500/80 to-indigo-600/80',
    ariaLabel: 'View the Baby photography gallery',
  }
];


/**
 * Renders a grid of portfolio category cards with interactive hover effects.
 * * @param {object} props
 * @param {Category[]} [props.data=categories] - The data for the category cards.
 * @param {string} [props.title='Photography Collections'] - The main title of the section.
 * @param {string} [props.subtitle='Our Services'] - The subtitle/badge text.
 */
const PortfolioCategoryCards = ({ data = categories, title = 'Photography Collections', subtitle = 'Our Services' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const router = useRouter();

  // Basic client-side fade-in on mount for smooth entrance
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Handler for navigation
  const navigateToCategory = (id) => {
    router.push(`/portfolio/${id}`);
  };

  return (
    <section 
      className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900" 
      aria-labelledby="portfolio-heading"
    >
      
      {/* Header Section */}
      <div className="relative pb-16 px-6 overflow-hidden">
        <div className="absolute"></div>
        
        <div className={`max-w-7xl mx-auto text-center relative z-10 transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-2 bg-white shadow-lg px-6 py-3 rounded-full mt-4 mb-8" role="status">
            <Camera className="w-5 h-5 text-amber-600" aria-hidden="true" />
            <span className="text-sm font-semibold text-neutral-700 tracking-wide uppercase">{subtitle}</span>
          </div>
          
          <h1 id="portfolio-heading" className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tight">
            {title.split(' ')[0]}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500">
              {title.split(' ').slice(1).join(' ')}
            </span>
          </h1>
          
          <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
            Explore our specialized photography services tailored to capture your most precious moments.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.map((category, index) => (
            <div
              key={category.id}
              role="button" // Change to button for better accessibility/semantic meaning of a clickable card
              tabIndex={0}
              onClick={() => navigateToCategory(category.id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigateToCategory(category.id); }}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              // Component Styling and Responsiveness
              className={`group relative h-[450px] sm:h-[600px] rounded-3xl overflow-hidden cursor-pointer 
                transition-all duration-700 transform 
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'} 
                hover:scale-[1.02] shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/50`}
              style={{ transitionDelay: `${index * 150}ms` }}
              aria-label={category.ariaLabel}
            >
              
              {/* Background Image - Optimized with Next/Image */}
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
                <Image
                  src={category.image}
                  alt={`Background image for the ${category.title} photography category`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={index < 2} // Prioritize first two images for better LCP
                  className="object-cover"
                />
              </div>

              {/* Gradient Overlay 1: Fixed Darken */}
              <div className="absolute inset-0 bg-black/35 transition-all duration-500 group-hover:bg-black/70"></div>

              {/* Gradient Overlay 2: Dynamic Color Wash on Hover (The requested feature) */}
              <div 
                aria-hidden="true" 
                className={`absolute inset-0 bg-gradient-to-t ${category.color} transition-opacity duration-500 ease-in-out pointer-events-none ${
                  hoveredCategory === category.id ? 'opacity-50' : 'opacity-0'
                }`}
              ></div>


              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
              
              {/* Content (z-20 to ensure it's above both overlays) */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 z-20">
                {/* Top Badge */}
                <div className="flex justify-between items-start">
                  <div className={`bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full transition-all duration-500 ${
                    hoveredCategory === category.id ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  }`}>
                    <span className="text-white text-sm font-medium">{category.count}</span>
                  </div>
                  
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-500 border-2 border-white/30 ${
                    hoveredCategory === category.id ? 'rotate-45 scale-110' : 'rotate-0 scale-100'
                  }`}>
                    <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
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
                  
                  <h2 className={`text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight`}>
                    {category.title}
                  </h2>
                  
                  <p className="text-white/90 text-lg mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 transform translate-y-2 group-hover:translate-y-0">
                    {category.description}
                  </p>

                  <button 
                    // Important: Stop propagation to prevent card's onClick from firing twice, 
                    // though the main card is already set as the click target.
                    onClick={(e) => { e.stopPropagation(); navigateToCategory(category.id); }}
                    className="inline-flex items-center gap-3 bg-white text-neutral-900 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold shadow-2xl 
                      transform transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 
                      hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-amber-500" 
                    aria-label={`Go to ${category.title} gallery`}
                  >
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
        {/* <div className="mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-6">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-neutral-300 to-transparent"></div>
            <p className="text-neutral-500 text-lg">
              Can't decide? Browse all our work
            </p>
            <button
              onClick={() => router.push('/portfolio/all')}
              className="px-10 py-4 border-2 border-neutral-300 hover:border-amber-500 text-neutral-700 hover:text-amber-600 rounded-full font-semibold transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              View Complete Portfolio
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default PortfolioCategoryCards;