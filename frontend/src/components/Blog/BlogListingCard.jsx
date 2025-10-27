import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * Blog listing card with Framer Motion support
 * Implemented Theme: Warm, Romantic, and Artistic (Rose/Pink & Amber/Gold Accents)
 * * @param {Object} props
 * @param {Object} props.blog - Blog post data
 * @param {Object} props.variants - Framer Motion variants
 * @param {string} props.initial - Framer Motion initial state
 * @param {string} props.animate - Framer Motion animate state
 * @param {string} props.exit - Framer Motion exit state
 */
const BlogListingCard = ({ blog, variants, initial, animate, exit }) => {
  return (
    <motion.div
      variants={variants}
      initial={initial}
      animate={animate}
      exit={exit}
    >
      <Link href={`/blogs/${blog.slug}`} passHref>
        <div
          className="
            group flex flex-col h-full overflow-hidden rounded-xl bg-white border border-gray-100 
            transition-all duration-500 ease-in-out hover:shadow-2xl hover:shadow-rose-100/50 hover:border-rose-300 
            cursor-pointer
          "
          aria-label={`Read blog post: ${blog.title}`}
        >
          {/* Image Container */}
          <div className="relative w-full aspect-video">
            <Image
              src={blog.imageUrl}
              alt={`Thumbnail for ${blog.title}`}
              layout="fill"
              objectFit="cover"
              // Image zoom on hover maintained
              className="transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Content Area */}
          <div className="p-5 flex-grow">
            {/* Category Tag: Changed from Indigo to Rose/Amber-based tones */}
            <span className="inline-flex items-center rounded-full bg-amber-100/70 px-3 py-1 text-xs font-medium text-amber-800 mb-3 font-sans">
              {blog.category}
            </span>
            {/* Title: Changed to use Serif font and themed hover color */}
            <h3 className="mb-3 text-2xl font-serif font-semibold leading-snug text-gray-900 line-clamp-2 transition-colors duration-300 group-hover:text-rose-600">
              {blog.title}
            </h3>
            {/* Excerpt: Changed to softer gray and larger size for better readability */}
            <p className="text-lg text-gray-700 leading-relaxed line-clamp-3 font-sans">
              {blog.excerpt}
            </p>
          </div>

          {/* Read More Link */}
          <div className="p-5 pt-0">
            {/* Link Text: Changed to primary Rose accent color */}
            <span className="text-rose-600 font-semibold group-hover:underline transition-all flex items-center gap-1">
              Read Article 
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogListingCard;