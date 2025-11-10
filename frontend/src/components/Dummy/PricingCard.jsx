'use client'

import React, { useState, useEffect } from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

export default function PricingCard({ service }) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!service) return null;

  return (
    <section
      className="bg-gradient-to-br from-neutral-50 via-white to-neutral-100 py-12 px-4 sm:py-16 sm:px-6"
      id="pricing"
    >
      <div className="max-w-lg mx-auto sm:max-w-2xl">
        {/* Header */}
        <div
          className={`text-center mb-8 sm:mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-pulse">
            <Sparkles className="w-4 h-4" />
            <span>Premium Service</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
            {service.title} Pricing
          </h2>

          <p className="text-neutral-600 text-base sm:text-lg">
            Investment starting from
          </p>
          <div className="text-4xl sm:text-5xl font-bold text-amber-600 mt-2">
            {service.basePrice}
          </div>
        </div>

        {/* Main Card */}
        <div
          className={`relative transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Glowing border effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-600 via-amber-500 to-rose-300 rounded-3xl opacity-70 blur-lg animate-pulse"></div>

          <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Decorative blur glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-200/20 to-rose-200/20 rounded-bl-full"></div>

            <div className="relative p-6 sm:p-8">
              {/* Feature List */}
              <ul className="space-y-3 sm:space-y-4">
                {service.features.map((feature, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                      hoveredFeature === i
                        ? 'bg-gradient-to-r from-amber-50 to-rose-50 scale-105 shadow-md'
                        : 'hover:bg-neutral-50'
                    } ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                    style={{ transitionDelay: `${300 + i * 100}ms` }}
                    onMouseEnter={() => setHoveredFeature(i)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    onTouchStart={() => setHoveredFeature(i)}
                    onTouchEnd={() =>
                      setTimeout(() => setHoveredFeature(null), 300)
                    }
                  >
                    <div
                      className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center transition-transform duration-300 ${
                        hoveredFeature === i ? 'scale-110 rotate-12' : ''
                      }`}
                    >
                      <Check
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white font-bold"
                        strokeWidth={3}
                      />
                    </div>
                    <span className="text-neutral-700 text-sm sm:text-base font-medium leading-relaxed flex-1">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-8 sm:mt-10">
                <button className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-semibold py-4 sm:py-5 px-6 rounded-2xl shadow-lg hover:shadow-amber-300/50 transform hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group">
                  <span className="text-base sm:text-lg">
                    Get Started Today
                  </span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                <p className="text-center text-xs sm:text-sm text-neutral-500 mt-4">
                  💳 Secure payment • 🔒 100% satisfaction guaranteed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div
          className={`flex flex-wrap justify-center gap-4 sm:gap-6 mt-8 sm:mt-12 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {['Fast Delivery', 'Expert Team', '24/7 Support'].map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-xs sm:text-sm text-neutral-600 font-medium hover:shadow-md transition-shadow duration-300"
            >
              <span className="text-amber-600">✓</span>
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
