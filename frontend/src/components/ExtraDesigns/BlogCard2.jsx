'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * Compact, elegant, and responsive Blog Card
 * - Matches modern UI design
 * - Optimized for carousels or grids
 */
const BlogCard2 = ({ blog }) => {
  return (
    <Link href={`/blogs/${blog.slug}`} passHref>
      <motion.div
        className="
          group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-md 
          transition-all duration-500 hover:shadow-xl border border-neutral-200 cursor-pointer
          w-full max-w-[320px] mx-auto
        "
        aria-label={`Read blog post: ${blog.title}`}
        whileHover={{
          y: -4,
          scale: 1.015,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
        }}
      >
        {/* ─── Image ─────────────────────────────── */}
        <div className="relative h-40 w-full overflow-hidden sm:h-44 md:h-48">
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Category Badge */}
          {blog.category && (
            <span className="absolute bottom-2 left-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white shadow-md">
              {blog.category}
            </span>
          )}
        </div>

        {/* ─── Content ───────────────────────────── */}
        <div className="flex flex-col justify-between p-3 sm:p-4 flex-1">
          <div>
            <h3 className="mb-2 text-base sm:text-lg font-semibold leading-snug text-neutral-800 transition-colors duration-300 group-hover:text-amber-600 line-clamp-2">
              {blog.title}
            </h3>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-2">
              {blog.excerpt}
            </p>
          </div>

          {/* Meta Info */}
          <div className="mt-3 flex items-center justify-between text-[11px] sm:text-xs text-neutral-600 border-t border-neutral-100 pt-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10m-6 4h2m-9 6h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>{blog.date}</span>
              </span>

              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 8h10M7 12h6m5-8H6a2 2 0 00-2 2v12l4-4h10a2 2 0 002-2V6a2 2 0 00-2-2z"
                  />
                </svg>
                <span>{blog.comments} Comments</span>
              </span>
            </div>

            <span className="text-amber-600 font-medium hover:text-amber-700 transition-colors flex items-center gap-1">
              Read More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default BlogCard2;