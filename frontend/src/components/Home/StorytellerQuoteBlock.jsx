// components/StorytellerQuoteRotator.jsx
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
    setIsFading(true); // Start fade-out
    setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % quotes.length);
      setIsFading(false); // End fade-in
    }, 500); // Half the transition duration
  }, [quotes.length]);

  // Effect to handle the automatic rotation
  useEffect(() => {
    if (quotes.length < 2) return; // Don't rotate if only one quote

    const timer = setInterval(nextQuote, rotationInterval);

    return () => clearInterval(timer); // Cleanup on unmount or dependency change
  }, [quotes.length, rotationInterval, nextQuote]);

  if (!quotes || quotes.length === 0) {
    return null;
  }

  const currentQuote = quotes[activeIndex];

  return (
    // Container: Dark background for contrast, padding, and a radial gradient border effect
    <section className="p-8 md:p-16 lg:p-24 bg-gray-950 text-white relative overflow-hidden">
      
      {/* Subtle Radial Gradient Background Effect */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-color-indigo-900),_var(--tw-color-black))]"></div>

      {/* Content Wrapper */}
      <div className={`max-w-4xl mx-auto relative z-10 transition-opacity duration-1000 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Main Quote / SEO Headline (H2) */}
        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400 mb-8 italic">
          &ldquo;{currentQuote.quote}&rdquo;
        </h2>

        {/* Highlighted Keyword/Context */}
        <p className="text-xl md:text-2xl font-semibold text-indigo-300 mb-4">
          — Focusing on **{currentQuote.primaryKeyword}**
        </p>

        {/* Author and Source */}
        <p className="text-lg text-gray-400 font-medium">
          <span className="font-bold text-gray-200 block md:inline-block mr-2">{currentQuote.author}</span> 
          <span className="hidden md:inline-block">/</span>
          <span className="opacity-75 block md:inline-block">{currentQuote.source}</span>
        </p>

        {/* Accessibility: ARIA label for context */}
        <div role="status" className="sr-only">
          Quote {activeIndex + 1} of {quotes.length}: Quote from {currentQuote.author}, source: {currentQuote.source}
        </div>
      </div>
    </section>
  );
}