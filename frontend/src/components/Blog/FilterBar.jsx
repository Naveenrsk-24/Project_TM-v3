// components/FilterBar.jsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * A responsive filter and sort bar enhanced with Framer Motion for smooth
 * entrance and interactive category buttons.
 */
const FilterBar = ({ categories, activeCategory, onCategoryChange, sortBy, onSortChange }) => {

  // Framer Motion variants for the overall container entrance
  const containerMotion = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  };

  // Framer Motion properties for the interactive buttons
  const buttonMotion = {
    whileHover: { scale: 1.05, boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 10 },
  };

  return (
    <motion.div
      variants={containerMotion}
      initial="initial"
      animate="animate"
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white border-b border-gray-200 sticky top-0 z-10 shadow-md"
    >
      {/* Category Filters */}
      <div className="mb-4 sm:mb-0 flex flex-wrap gap-2">
        {/* 'All' Button */}
        <motion.button
          onClick={() => onCategoryChange('All')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === 'All'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          {...buttonMotion}
        >
          All
        </motion.button>

        {/* Dynamic Category Buttons */}
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            {...buttonMotion}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Sort By Dropdown */}
      <div className="flex items-center space-x-2">
        <label htmlFor="sort-by" className="text-sm font-medium text-gray-700 whitespace-nowrap">
          Sort by:
        </label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="block w-full rounded-lg border-gray-300 py-2 pl-3 pr-10 text-base text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm shadow-sm"
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
