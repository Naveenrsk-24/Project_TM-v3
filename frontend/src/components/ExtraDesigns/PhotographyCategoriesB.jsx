"use client"

import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronRight, Image as ImageIcon } from 'lucide-react';

const categories = [
  {
    id: 'portraits',
    title: 'Portraits',
    subtitle: 'Individual & Couple Photography',
    description: 'Elegant portraits that capture your unique personality and style',
    image: '/api/placeholder/1200/800',
    stats: { projects: '50+', rating: '5.0' },
    accent: 'bg-gradient-to-br from-rose-500 to-pink-600'
  },
  {
    id: 'pre-weddings',
    title: 'Pre Weddings',
    subtitle: 'Love Story Sessions',
    description: 'Romantic pre-wedding shoots at stunning locations',
    image: '/api/placeholder/1200/800',
    stats: { projects: '120+', rating: '5.0' },
    accent: 'bg-gradient-to-br from-amber-500 to-orange-600'
  },
  {
    id: 'tamil-weddings',
    title: 'Tamil Weddings',
    subtitle: 'Traditional Ceremonies',
    description: 'Capturing the rich traditions and emotions of Tamil weddings',
    image: '/api/placeholder/1200/800',
    stats: { projects: '80+', rating: '5.0' },
    accent: 'bg-gradient-to-br from-emerald-500 to-teal-600'
  },
  {
    id: 'telugu-weddings',
    title: 'Telugu Weddings',
    subtitle: 'Cultural Celebrations',
    description: 'Vibrant Telugu wedding celebrations captured beautifully',
    image: '/api/placeholder/1200/800',
    stats: { projects: '65+', rating: '5.0' },
    accent: 'bg-gradient-to-br from-blue-500 to-indigo-600'
  }
];

const PhotographyCategoriesB = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Header */}
      <div className="relative pt-20 pb-12 px-6 border-b border-white/10">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span className="text-sm tracking-widest text-amber-500 uppercase">Our Expertise</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            Photography
            <br />
            <span className="text-neutral-500 italic font-serif">Services</span>
          </h1>
        </div>
      </div>

      {/* Split View Layout */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-200px)]">
        {/* Left Side - Categories List */}
        <div className="lg:w-1/2 p-6 lg:p-12 flex flex-col justify-center border-r border-white/10">
          <div className="max-w-xl mx-auto w-full space-y-4">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className={`group cursor-pointer transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setActiveCategory(index)}
                onClick={() => setActiveCategory(index)}
              >
                <div className={`relative p-8 rounded-2xl transition-all duration-500 ${
                  activeCategory === index 
                    ? 'bg-white/10 backdrop-blur-md scale-105' 
                    : 'bg-transparent hover:bg-white/5'
                }`}>
                  {/* Number */}
                  <div className={`absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 ${
                    activeCategory === index 
                      ? `${category.accent} text-white scale-110` 
                      : 'bg-white/5 text-neutral-600'
                  }`}>
                    {index + 1}
                  </div>

                  {/* Content */}
                  <div className="ml-8">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className={`text-3xl font-bold transition-all duration-300 ${
                          activeCategory === index ? 'text-white' : 'text-neutral-400'
                        }`}>
                          {category.title}
                        </h3>
                        <p className={`text-sm mt-1 transition-all duration-300 ${
                          activeCategory === index ? 'text-amber-500' : 'text-neutral-600'
                        }`}>
                          {category.subtitle}
                        </p>
                      </div>
                      
                      <ChevronRight className={`w-6 h-6 transition-all duration-300 ${
                        activeCategory === index 
                          ? 'text-amber-500 translate-x-2' 
                          : 'text-neutral-600 translate-x-0'
                      }`} />
                    </div>

                    {/* Description - Shows on Active */}
                    <p className={`text-neutral-400 text-sm leading-relaxed mt-3 transition-all duration-500 ${
                      activeCategory === index 
                        ? 'opacity-100 max-h-20' 
                        : 'opacity-0 max-h-0 overflow-hidden'
                    }`}>
                      {category.description}
                    </p>

                    {/* Stats */}
                    <div className={`flex items-center gap-6 mt-4 transition-all duration-500 ${
                      activeCategory === index ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-amber-500" />
                        <span className="text-sm text-neutral-300">{category.stats.projects} Projects</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-amber-500">★</span>
                        <span className="text-sm text-neutral-300">{category.stats.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Active Indicator */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-r-full transition-all duration-500 ${
                    activeCategory === index ? `${category.accent}` : 'bg-transparent'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Image Display */}
        <div className="lg:w-1/2 relative overflow-hidden">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`absolute inset-0 transition-all duration-700 ${
                activeCategory === index 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-110'
              }`}
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover"
              />

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 ${category.accent} opacity-30`}></div>

              {/* Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-black via-black/70 to-transparent">
                <div className={`transition-all duration-700 delay-300 ${
                  activeCategory === index 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}>
                  <div className="flex items-center gap-2 mb-4">
                    {[1, 2, 3].map((dot) => (
                      <div
                        key={dot}
                        className={`w-2 h-2 rounded-full transition-all duration-500 ${
                          activeCategory === index ? 'bg-amber-500' : 'bg-white/30'
                        }`}
                        style={{ transitionDelay: `${dot * 100}ms` }}
                      ></div>
                    ))}
                  </div>

                  <h2 className="text-5xl font-bold mb-3">{category.title}</h2>
                  <p className="text-xl text-neutral-300 mb-6">{category.description}</p>

                  <button className="group/btn inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-amber-500 hover:text-white transition-all duration-300">
                    Explore Gallery
                    <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className={`absolute top-8 right-8 w-24 h-24 border-t-2 border-r-2 transition-all duration-700 ${
                activeCategory === index ? 'border-amber-500 opacity-100' : 'border-white/20 opacity-0'
              }`}></div>
            </div>
          ))}

          {/* Navigation Dots */}
          <div className="absolute bottom-8 right-8 flex flex-col gap-3">
            {categories.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeCategory === index 
                    ? 'bg-amber-500 scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Background Glow Effects */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none"></div>
    </div>
  );
};

export default PhotographyCategoriesB;