'use client'
// components/Gallery.js


import Image from "next/image";
import { useState, useEffect } from "react";

export default function Gallery({ serviceSlug, location, niche }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch images dynamically from /public/images/<serviceSlug>
    const basePath = `/images/${serviceSlug}`;
    const folderHint =
      niche?.slug || location?.slug ? `/${niche?.slug || location?.slug}` : "";
    // In real CMS setup, you’d fetch these dynamically
    setImages([
      `${basePath}/sample1.jpg`,
      `${basePath}/sample2.jpg`,
      `${basePath}/sample3.jpg`,
    ]);
  }, [serviceSlug, location, niche]);

  if (!images.length) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Recent {niche?.title || serviceSlug.replace("-", " ")} Shoots
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((src, i) => (
            <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow">
              <Image
                src={src}
                alt={`${serviceSlug} ${i + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
