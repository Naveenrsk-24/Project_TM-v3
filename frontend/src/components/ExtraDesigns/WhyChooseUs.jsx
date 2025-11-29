'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Check, Phone, Medal, ThumbsUp, TrendingUp, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Maps statistic icon names to Lucide-React components.
 * The icons are given a subtle gold/amber color (text-amber-700) and are slightly larger.
 */
const StatIconMap = {
  medal: Medal,
  'thumbs-up': ThumbsUp,
  chart: TrendingUp,
  briefcase: Briefcase,
};

/**
 * Reusable component for the About Us/Hero Section with image/video carousel and statistics.
 *
 * @param {object} props - Component props.
 * @param {string} props.tagline - Small contextual label (e.g., 'About BizFusionX').
 * @param {string} props.heading - Main headline.
 * @param {string} props.body - Supporting paragraph text.
 * @param {Array<object>} props.stats - List of statistics (number, label, icon).
 * @param {Array<string>} props.features - List of key value propositions/features.
 * @param {Array<object>} props.carouselItems - Array of carousel items with type ('image' or 'video'), src, and alt.
 * @param {string} props.contactNumber - Contact phone number.
 * @param {number} [props.autoPlayInterval=5000] - Auto-play interval in milliseconds (0 to disable).
 * @returns {JSX.Element} The About Us Hero Section component with carousel.
 */
export default function WhyChooseUs({
  tagline,
  heading,
  body,
  stats,
  features,
  carouselItems,
  contactNumber,
  autoPlayInterval = 5000,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const AccentColor = 'text-orange-600';

  // Auto-play functionality
  useEffect(() => {
    if (autoPlayInterval > 0 && carouselItems.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
      }, autoPlayInterval);
      return () => clearInterval(timer);
    }
  }, [autoPlayInterval, carouselItems.length]);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  return (
    <section className="container mx-auto px-[8rem] sm:py-24 lg:py-10">
      {/* Container for the 2-Column Layout */}
      <div className="flex flex-col lg:flex-row lg:gap-16 xl:gap-20">
        {/* === LEFT COLUMN: Carousel === */}
        <div className="lg:w-1/2 flex-shrink-0 mb-12 lg:mb-0">
          {/* Tagline and Heading */}
          <p className="text-base font-semibold uppercase tracking-wider text-gray-700 mb-2">
            {tagline}
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
            {heading}
          </h1>

          {/* Carousel Container */}
         <div className="relative h-[300px] sm:h-[400px] md:h-[480px] lg:h-[570px] rounded-lg overflow-hidden bg-gray-100">
            {/* Carousel Slides */}
            {carouselItems.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {item.type === 'video' ? (
                  <video
                    src={item.src}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt || `Slide ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                )}
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent"></div>
              </div>
            ))}

            {/* Navigation Arrows */}
            {carouselItems.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Dot Indicators */}
            {carouselItems.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {carouselItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-white w-8'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* === RIGHT COLUMN: Content & Stats === */}
        <div className="lg:w-1/2 flex flex-col justify-start py-10">
          {/* Supporting Paragraph */}
          <p className="text-lg text-gray-600 mb-10 xl:mb-12">
            {body}
          </p>

          {/* --- Statistics (2x2 Grid) --- */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 mb-12 border-b border-t border-gray-100 py-8">
            {stats.map((stat, index) => {
              const Icon = StatIconMap[stat.icon] || Briefcase;
              return (
                <div key={index} className="flex flex-col items-start">
                  <Icon className={`w-7 h-7 mb-2 ${AccentColor} stroke-1`} aria-hidden="true" />
                  <p className="text-3xl sm:text-4xl font-bold text-gray-900">
                    {stat.number}
                  </p>
                  <p className="text-sm font-medium text-gray-600 mt-1">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>

          {/* --- Value Propositions (Features) --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-10 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Check className={`w-5 h-5 flex-shrink-0 ${AccentColor}`} aria-hidden="true" />
                <span className="text-base text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          {/* --- CTA and Contact Info --- */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 space-y-4 sm:space-y-0">
            <a 
              href="#more-about-us" 
              className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold leading-6 text-gray-900 transition duration-300 border-2 border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300"
            >
              More About Us
            </a>

            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-600">Let&apos;s Talk</span>
              <a 
                href={`tel:${contactNumber.replace(/\s/g, '')}`} 
                className="text-lg font-bold text-gray-900 hover:text-orange-600"
                aria-label={`Call us at ${contactNumber}`}
              >
                {contactNumber}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
