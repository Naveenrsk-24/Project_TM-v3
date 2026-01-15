"use client";

import Image from "next/image";
import { useState } from "react";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";

import "yet-another-react-lightbox/styles.css";

export default function AlbumGallery({ galleryImages }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      {/* GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[220px] gap-4 md:gap-6">
        {galleryImages.map((image, index) => {
          const spanClass =
            index === 0
              ? "col-span-2 row-span-2"
              : index % 11 === 0
              ? "row-span-2"
              : index % 7 === 0
              ? "col-span-2"
              : "row-span-1";

          return (
            <figure
              key={image.id}
              onClick={() => setOpenIndex(index)}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 ease-out ${spanClass}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <figcaption className="absolute bottom-0 p-4 text-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {image.alt}
              </figcaption>
            </figure>
          );
        })}
      </div>

      {/* LIGHTBOX */}
      <Lightbox
        open={openIndex !== null}
        close={() => setOpenIndex(null)}
        index={openIndex || 0}
        slides={galleryImages.map((img) => ({
          src: img.src,
          alt: img.alt,
        }))}
        plugins={[Zoom, Fullscreen, Slideshow]}
        slideshow={{ autoplay: true, delay: 5000 }}
        animation={{ fade: 300 }}
        zoom={{ maxZoomPixelRatio: 4 }}
      />
    </>
  );
}
