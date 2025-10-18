// components/BlogCard.jsx
'use client'; // Must be a client component to use Framer Motion hooks
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion'; // 👈 Import Framer Motion

/**
 * A reusable, clickable card for displaying a blog post summary.
 * Now uses Framer Motion for sophisticated hover effects in the carousel.
 * @param {Object} props
 * @param {Object} props.blog - Blog post data
 */
const BlogCard = ({ blog }) => {
  // Fixed height for content area to maintain consistency in the carousel
  const CONTENT_AREA_HEIGHT_CLASSES = "h-[10rem] sm:h-[12rem]"; // Approx. 160px / 192px

  return (
    <Link href={`/blogs/${blog.slug}`} passHref>
      {/* 1. Wrap the card in motion.div */}
      <motion.div
        className="
          group relative block h-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg 
          cursor-pointer
        "
        aria-label={`Read blog post: ${blog.title}`}
        // 2. Replace CSS hover with Framer Motion hover
        whileHover={{ 
          scale: 1.03, // Slight lift
          y: -5, // Slight translate up (less aggressive than -translate-y-1)
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05)" // New shadow
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20 // Physics-based transition for smoothness
        }}
      >
        {/* Image Container */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={blog.imageUrl}
            alt={`Thumbnail for ${blog.title}`}
            layout="fill"
            objectFit="cover"
            // Use Framer Motion hover properties on the Image itself via a group class
            className="transition-transform duration-500 group-hover:scale-110" // Increased scale for a dynamic image
            loading="lazy"
          />
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          {/* Category Badge */}
          <span className="absolute bottom-2 left-2 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold uppercase text-white shadow-md">
            {blog.category}
          </span>
        </div>

        {/* Fixed Content Area */}
        <div className={`p-4 sm:p-6 ${CONTENT_AREA_HEIGHT_CLASSES}`}>
          <h3 className="mb-2 text-xl font-bold leading-snug text-gray-900 line-clamp-2 transition-colors duration-300 group-hover:text-indigo-600">
            {blog.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-4">
            {blog.excerpt}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default BlogCard;