'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BlogListingCard from '../../components/Blog/BlogListingCard';
import FilterBar from '../../components/Blog/FilterBar';
import { DUMMY_BLOGS } from '../../data/blog-data';

// Simulate fetching blogs (with a fake date for sorting)
const fetchBlogs = () =>
  DUMMY_BLOGS.map((blog, index) => ({
    ...blog,
    date: new Date(2024, 0, DUMMY_BLOGS.length - index).getTime(),
  }));

const BlogPage = () => {
  const allBlogs = useMemo(() => fetchBlogs(), []);
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = allBlogs.map((b) => b.category);
    return Array.from(new Set(cats));
  }, [allBlogs]);

  // Filter and sort blogs
  const filteredAndSortedBlogs = useMemo(() => {
    let results = allBlogs;

    if (activeCategory !== 'All') {
      results = results.filter((b) => b.category === activeCategory);
    }

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

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 12 },
    },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-pink-200/10 rounded-full blur-3xl" />

      {/* Header */}
      <header className="relative py-16 bg-white/60 backdrop-blur-sm shadow-sm border-b border-rose-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
            Photography Blog
          </h1>
          <p className="mt-3 text-xl text-gray-600">
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
      <main className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {filteredAndSortedBlogs.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              key={activeCategory + sortBy}
            >
              {filteredAndSortedBlogs.map((blog) => (
                <BlogListingCard
                  key={blog.id}
                  blog={blog}
                  variants={itemVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                />
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-rose-100">
            <p className="text-xl font-medium text-gray-700">
              No articles found in the category "{activeCategory}".
            </p>
            <button
              onClick={() => setActiveCategory('All')}
              className="mt-4 text-rose-600 font-medium hover:text-rose-700 hover:underline transition-colors"
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
