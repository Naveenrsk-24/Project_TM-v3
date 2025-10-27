// components/FilterBar.jsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * A responsive filter and sort bar enhanced with Framer Motion for smooth
 * entrance and interactive category buttons, themed for a Romantic aesthetic.
 */
const FilterBar = ({ categories, activeCategory, onCategoryChange, sortBy, onSortChange }) => {

  // Framer Motion variants for the overall container entrance
  const containerMotion = {
    initial: { y: -20, opacity: 0 },
    // Softened entrance animation for a less abrupt feel
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  // Framer Motion properties for the interactive buttons
  const buttonMotion = {
    whileHover: { 
        scale: 1.05, 
        // Subtly themed shadow
        boxShadow: "0 6px 15px rgba(255, 192, 203, 0.4)" // Soft pink/rose shadow
    },
    whileTap: { scale: 0.95 },
    // Spring transition maintained for a responsive, tactile feel
    transition: { type: "spring", stiffness: 400, damping: 10 },
  };
  
  // Theme color variables for clarity
  const activeBg = 'bg-rose-500'; // Primary Rose accent for active state
  const activeText = 'text-white';
  const inactiveBg = 'bg-gray-50'; // Soft off-white for inactive state
  const inactiveText = 'text-gray-700';

  return (
    <motion.div
      variants={containerMotion}
      initial="initial"
      animate="animate"
      // Background gradient added for soft depth
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white sticky top-0 z-10 shadow-lg"
    >
      {/* Category Filters */}
      <div className="mb-4 sm:mb-0 flex flex-wrap gap-3 font-sans">
        {/* 'All' Button */}
        <motion.button
          onClick={() => onCategoryChange('All')}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors 
            ${activeCategory === 'All' ? `${activeBg} ${activeText} shadow-md shadow-rose-200` : `${inactiveBg} ${inactiveText} hover:bg-rose-100/50 hover:text-rose-700 border border-gray-100`}
          `}
          {...buttonMotion}
        >
          All
        </motion.button>

        {/* Dynamic Category Buttons */}
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors 
              ${activeCategory === category ? `${activeBg} ${activeText} shadow-md shadow-rose-200` : `${inactiveBg} ${inactiveText} hover:bg-rose-100/50 hover:text-rose-700 border border-gray-100`}
            `}
            {...buttonMotion}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Sort By Dropdown */}
      <div className="flex items-center space-x-3">
        {/* Label Font: Uses the elegant Serif font */}
        <label htmlFor="sort-by" className="text-base font-serif text-gray-700 whitespace-nowrap">
          Sort by:
        </label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          // Themed Select Input: Uses Rose/Amber focus colors
          className="block w-full rounded-xl border-gray-300 py-2.5 pl-4 pr-10 text-base text-gray-800 focus:border-rose-500 focus:ring-2 focus:ring-amber-200 sm:text-sm shadow-sm transition-all appearance-none bg-white"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="titleAsc">Title (A-Z)</option>
        </select>
      </div>
    </motion.div>
  );
};

export default FilterBar;