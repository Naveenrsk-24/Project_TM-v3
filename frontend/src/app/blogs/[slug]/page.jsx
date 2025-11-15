'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { DUMMY_BLOGS } from '../../../data/blog-data';
import { motion } from 'framer-motion';
import Head from 'next/head';
import he from 'he'; // 👈 npm install he

export async function generateMetadata({ params }) {
const slug = params.slug;
return pageMeta({
title: `${slug.replace(/-/g, " ")}`,
description: `Read: ${slug.replace(/-/g, " ")}`,
path: `/blogs/${slug}`,
});
}

const BlogPostPage = ({ params }) => {
  const { slug } = params;

  // Find blog by slug
  const blog = DUMMY_BLOGS.find((b) => b.slug === slug);
  if (!blog) return notFound();

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, delay: 0.1 },
    },
  };

  return (
    <>
      {/* SEO */}
      <Head>
        <title>{blog.title} | My Blog</title>
        <meta name="description" content={blog.excerpt} />
      </Head>

      <motion.div
        className="min-h-screen bg-gray-50"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.4 } },
        }}
      >
        {/* Hero Section */}
        <header className="relative h-[40vh] min-h-80 w-full overflow-hidden">
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            layout="fill"
            objectFit="cover"
            priority
            sizes="100vw"
            className="transition-transform duration-500 hover:scale-105 brightness-[.65]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

          <div className="absolute inset-0 flex flex-col justify-end text-white px-4 pb-8 max-w-4xl mx-auto sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-300">
              {blog.category}
            </p>
            <h1 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg">
              {blog.title}
            </h1>
            <p className="mt-2 text-base text-gray-200">
              Published on: <strong>{blog.date}</strong>
            </p>
          </div>
        </header>

        {/* Blog Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Blog excerpt */}
          {/* <motion.p
            className="lead text-xl italic font-serif text-gray-700 mb-8 text-center"
            variants={contentVariants}
          >
            — {blog.excerpt}
          </motion.p> */}

          {/* Actual Blog HTML Content */}
       <motion.div
  className="prose prose-lg sm:prose-xl max-w-full mx-auto dark:prose-invert"
  variants={contentVariants}
  dangerouslySetInnerHTML={{
    __html: he.decode(blog.content),
  }}
/>




          {/* Back Button */}
          <div className="mt-12 text-center">
            <a
              href="/blogs"
              className="inline-block px-6 py-3  bg-gradient-to-r from-pink-600 to-rose-500 hover:bg-pink-600 text-white font-semibold rounded-lg shadow transition"
            >
              ← Back to Blogs
            </a>
          </div>
        </main>
      </motion.div>
    </>
  );
};

export default BlogPostPage;
