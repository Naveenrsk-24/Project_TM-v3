"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // ✅ Import router
import { Camera, ArrowUpRight, Heart } from 'lucide-react';

const USER_IMAGE_URL = '/Weddings/beautiful-husband-wife-posing-beach.jpg';

const categories = [
  {
    id: 'portraits',
    title: 'Portraits',
    description: 'Timeless individual & couple portraits',
    image: USER_IMAGE_URL,
    count: '50+ Sessions',
    color: 'from-rose-500 to-pink-600'
  },
  {
    id: 'pre-weddings',
    title: 'Pre Weddings',
    description: 'Romantic pre-wedding stories',
    image: USER_IMAGE_URL,
    count: '120+ Couples',
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'tamil-weddings',
    title: 'Tamil Weddings',
    description: 'Traditional Tamil ceremonies',
    image: USER_IMAGE_URL,
    count: '80+ Weddings',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'telugu-weddings',
    title: 'Telugu Weddings',
    description: 'Vibrant Telugu celebrations',
    image: USER_IMAGE_URL,
    count: '65+ Weddings',
    color: 'from-blue-500 to-indigo-600'
  }
];

const PhotographyCategories = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const router = useRouter(); // ✅ Initialize router

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      {/* Header Section */}
      <div className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.1),transparent_50%)]"></div>
        
        <div className={`max-w-7xl mx-auto text-center relative z-10 transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-2 bg-white shadow-lg px-6 py-3 rounded-full mb-8">
            <Camera className="w-5 h-5 text-amber-600" />
            <span className="text-sm font-semibold text-neutral-700 tracking-wide">Our Services</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif text-neutral-900 mb-6 tracking-tight">
            Photography
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-rose-600">
              Collections
            </span>
          </h1>
          
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Explore our specialized photography services tailored to capture your most precious moments
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              onClick={() => router.push(`/portfolio/${category.id}`)} // ✅ Navigate dynamically
              className={`group relative h-[600px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              } hover:scale-[1.02]`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Background Image */}
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity duration-500`}></div>

              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
              <div className="absolute bottom-0 right-0 w-full h-1 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-right delay-100"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-10">
                {/* Top Badge */}
                <div className="flex justify-between items-start">
                  <div className={`bg-white/20 backdrop-blur-md px-5 py-2 rounded-full transition-all duration-500 ${
                    hoveredCategory === category.id ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  }`}>
                    <span className="text-white text-sm font-medium">{category.count}</span>
                  </div>
                  
                  <div className={`w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-500 ${
                    hoveredCategory === category.id ? 'rotate-45 scale-110' : 'rotate-0 scale-100'
                  }`}>
                    <ArrowUpRight className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="transform transition-all duration-500 group-hover:translate-y-0 translate-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="flex gap-1">
                      {[1, 2, 3].map((dot) => (
                        <div
                          key={dot}
                          className="w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ transitionDelay: `${dot * 100}ms` }}
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

                  <button className="inline-flex items-center gap-3 bg-white text-neutral-900 px-8 py-4 rounded-full font-semibold shadow-2xl transform transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 hover:bg-neutral-100">
                    <span>View Gallery</span>
                    <ArrowUpRight className="w-5 h-5" />
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
              onClick={() => router.push('/portfolio')}
              className="px-10 py-4 border-2 border-neutral-300 hover:border-amber-500 text-neutral-700 hover:text-amber-600 rounded-full font-semibold transition-all duration-300 hover:shadow-xl"
            >
              View Complete Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotographyCategories;
