import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * Blog listing card with Framer Motion support
 * @param {Object} props
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
            group flex flex-col h-full overflow-hidden rounded-xl bg-white border border-gray-200 
            transition-all duration-300 ease-in-out hover:shadow-2xl hover:border-indigo-300 
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
              className="transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Content Area */}
          <div className="p-4 flex-grow">
            <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-xs font-medium text-indigo-800 mb-2">
              {blog.category}
            </span>
            <h3 className="mb-3 text-2xl font-semibold leading-snug text-gray-900 line-clamp-2 transition-colors duration-300 group-hover:text-indigo-600">
              {blog.title}
            </h3>
            <p className="text-base text-gray-600 line-clamp-3">
              {blog.excerpt}
            </p>
          </div>

          {/* Read More Link */}
          <div className="p-4 pt-0">
            <span className="text-indigo-600 font-medium group-hover:underline transition-all">
              Read Article &rarr;
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogListingCard;
