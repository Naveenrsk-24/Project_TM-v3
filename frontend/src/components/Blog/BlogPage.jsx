// app/blogs/page.jsx
'use client';

import React, { useState, useMemo } from 'react';
import BlogListingCard from '../../components/Blog/BlogListingCard';
import FilterBar from '../../components/Blog/FilterBar';
import { DUMMY_BLOGS } from '../../data/blog-data'; // Import dummy data (replace with API fetch)

/**
 * Utility function to simulate data fetching (replace with real API call)
 */
const fetchBlogs = () => {
  // Add a fake timestamp to simulate sortable data
  return DUMMY_BLOGS.map((blog, index) => ({
    ...blog,
    date: new Date(2024, 0, DUMMY_BLOGS.length - index).getTime(),
  }));
};

const BlogPage = () => {
  const allBlogs = useMemo(() => fetchBlogs(), []);
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Extract all unique categories for the filter bar
  const categories = useMemo(() => {
    const cats = allBlogs.map(blog => blog.category);
    return Array.from(new Set(cats));
  }, [allBlogs]);

  // Main logic to filter and sort the blogs
  const filteredAndSortedBlogs = useMemo(() => {
    let results = allBlogs;

    // 1. Filtering
    if (activeCategory !== 'All') {
      results = results.filter(blog => blog.category === activeCategory);
    }

    // 2. Sorting
    results = results.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return (b.date || 0) - (a.date || 0);
        case 'oldest':
          return (a.date || 0) - (b.date || 0);
        case 'titleAsc':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return results;
  }, [allBlogs, activeCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header Section */}
      <header className="py-16 bg-white shadow-sm border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
            The Photography Blog
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Tips, techniques, and inspiration for photography enthusiasts.
          </p>
        </div>
      </header>
      
      {/* Filter Bar */}
      <FilterBar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Blog Grid */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {filteredAndSortedBlogs.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAndSortedBlogs.map((blog) => (
              <BlogListingCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-lg border border-gray-100">
            <p className="text-xl font-medium text-gray-600">
              No articles found in the category "{activeCategory}".
            </p>
            <button 
                onClick={() => setActiveCategory('All')} 
                className="mt-4 text-indigo-600 font-medium hover:underline"
            >
                View All Articles
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogPage;
