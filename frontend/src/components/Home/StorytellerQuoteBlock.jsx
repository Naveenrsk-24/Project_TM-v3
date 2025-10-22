'use client';

import React, { useState, useEffect, useCallback } from 'react';

/**
 * @typedef {object} QuoteItem
 * @property {string} quote - The main, high-impact quote or core message. (H2)
 * @property {string} author - The person or entity the quote is attributed to.
 * @property {string} source - The source or context (e.g., "Client Review," "Our Philosophy").
 * @property {string} primaryKeyword - A core keyword phrase to be highlighted.
 */

/**
 * @typedef {object} StorytellerQuoteRotatorProps
 * @property {QuoteItem[]} quotes - An array of quote objects to rotate through.
 * @property {number} [rotationInterval=8000] - Time in milliseconds between quote rotations (default is 8 seconds).
 */

/**
 * A reusable, high-impact quote block that rotates through multiple quotes
 * for dynamic primary SEO messaging. Uses smooth fade transitions.
 *
 * @param {StorytellerQuoteRotatorProps} props
 * @returns {JSX.Element}
 */
export default function StorytellerQuoteRotator({
  quotes,
  rotationInterval = 8000,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Memoized function to advance the quote index
  const nextQuote = useCallback(() => {
    // 1. Start fade-out effect
    setIsFading(true); 
    
    // 2. Change content after the fade-out is visually complete (half of the duration)
    const transitionDelay = 500; // Half of the 1000ms CSS transition
    setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % quotes.length);
      
      // 3. Start fade-in effect
      setIsFading(false);
    }, transitionDelay);
  }, [quotes.length]);

  // Effect to handle the automatic rotation
  useEffect(() => {
    // Guard clause: Don't set up rotation if no data or only one item
    if (!quotes || quotes.length < 2) return; 

    const timer = setInterval(nextQuote, rotationInterval);

    // Cleanup: Clear the interval on component unmount or dependency change
    return () => clearInterval(timer); 
  }, [quotes, rotationInterval, nextQuote]);

  if (!quotes || quotes.length === 0) {
    // Optionally render a minimal fallback or nothing
    return null;
  }

  const currentQuote = quotes[activeIndex];

  // Custom Gradient Style: Using inline style for the specific non-Tailwind gradient
  const customGradientStyle = {
    background: 'linear-gradient(to right, #f80759, #bc4e9c)',
  };

  return (
    // Container: Applied the custom gradient and ensured high-impact styling
    <section 
      className="p-8 md:p-16 lg:p-24 text-white relative overflow-hidden shadow-2xl"
      style={customGradientStyle}
    >
      
      {/* Subtle Radial Overlay for depth (keeping a nice dark contrast) */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-color-pink-900),_var(--tw-color-black))]"></div>

      {/* Content Wrapper - handles the fade transition */}
      <div 
        className={`max-w-5xl mx-auto relative z-10 transition-opacity duration-1000 ease-in-out ${
          isFading ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100' // Added subtle scale for more polished transition
        } transform`}
      >
        
        {/* Main Quote / SEO Headline (H2) */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-pink-200 mb-8 italic">
          &ldquo;{currentQuote.quote}&rdquo;
        </h2>

        {/* Highlighted Keyword/Context */}
        {currentQuote.primaryKeyword && (
          <p className="text-xl md:text-2xl font-semibold text-pink-200 mb-4 tracking-wide">
            — Focused on **{currentQuote.primaryKeyword}**
          </p>
        )}

        {/* Author and Source */}
        <p className="text-lg text-gray-200 font-medium border-t border-pink-500/50 pt-4 mt-8">
          <span className="font-bold text-white block md:inline-block mr-2">{currentQuote.author}</span> 
          <span className="hidden md:inline-block">/</span>
          <span className="opacity-80 block md:inline-block ml-0 md:ml-2">{currentQuote.source}</span>
        </p>

        {/* Accessibility: ARIA label for context */}
        <div role="status" aria-live="polite" className="sr-only">
          Quote {activeIndex + 1} of {quotes.length}: Quote from {currentQuote.author}, source: {currentQuote.source}
        </div>
      </div>

      {/* Navigation Dots (Optional, but good for UX) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {quotes.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to quote ${index + 1}`}
            onClick={() => {
              setIsFading(true);
              setTimeout(() => {
                setActiveIndex(index);
                setIsFading(false);
              }, 500);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white ${
              activeIndex === index ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </section>
  );
}