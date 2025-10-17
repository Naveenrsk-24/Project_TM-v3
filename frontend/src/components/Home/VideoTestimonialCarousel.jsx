'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';

/**
 * Renders a single Video Testimonial Card.
 * @param {Object} props - Component props
 * @param {Object} props.testimonial - Testimonial data
 */
const TestimonialCard = ({ testimonial }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleTogglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.muted = true;
        videoRef.current.play().catch((error) => {
          console.error('Error playing video:', error);
          setIsPlaying(false);
        });
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleVideoEnd = () => {
        setIsPlaying(false);
        video.currentTime = 0;
      };
      video.addEventListener('ended', handleVideoEnd);
      return () => {
        video.removeEventListener('ended', handleVideoEnd);
      };
    }
  }, []);

  return (
    <div className="flex-shrink-0 w-[85vw] sm:w-[50vw] md:w-[30vw] lg:w-[28vw] xl:w-[20vw] snap-center">
      <div
        className="relative overflow-hidden rounded-xl shadow-2xl transition-all duration-300 ease-in-out hover:shadow-primary/50"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleTogglePlay();
          }
        }}
      >
        <video
          ref={videoRef}
          src={testimonial.video}
          loop={false}
          preload="metadata"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isPlaying ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          muted={true}
          playsInline
        />

        <Image
          src={testimonial.image}
          alt={`Portrait of ${testimonial.name}`}
          width={400}
          height={600}
          priority={false}
          className={`w-full h-full object-cover aspect-[2/3] transition-opacity duration-300 ${
            isPlaying ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ minHeight: '300px' }}
        />

        {!isPlaying && (
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent z-20" />
        )}

        <div className="absolute bottom-4 left-4 right-4 text-white z-30">
          <p className="font-bold text-lg md:text-xl leading-snug">{testimonial.name}</p>
          <p className="text-sm opacity-70 mt-1">{testimonial.role}</p>
        </div>

        <button
          onClick={handleTogglePlay}
          aria-label={
            isPlaying
              ? `Pause video testimonial from ${testimonial.name}`
              : `Play video testimonial from ${testimonial.name}`
          }
          className="absolute bottom-4 right-4 p-3 rounded-full bg-white/20 backdrop-blur-sm transition-colors duration-200 hover:bg-white/40 focus:outline-none focus:ring-4 focus:ring-white/50 z-40"
        >
          {isPlaying ? (
            <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
              <rect x="6" y="5" width="4" height="14" />
              <rect x="14" y="5" width="4" height="14" />
            </svg>
          ) : (
            <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

/**
 * The main responsive video testimonial carousel component.
 */
export const VideoTestimonialCarousel = ({ testimonials }) => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!carouselRef.current) return;

      if (document.activeElement && carouselRef.current.contains(document.activeElement)) {
        const scrollAmount = carouselRef.current.children[0]?.clientWidth || 300;

        if (event.key === 'ArrowRight') {
          event.preventDefault();
          carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        } else if (event.key === 'ArrowLeft') {
          event.preventDefault();
          carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section
      className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900 overflow-hidden"
      aria-label="Video Testimonials Carousel"
    >
      <h2 className="sr-only">Our Client Video Testimonials</h2>

      <div
        ref={carouselRef}
        className="flex overflow-x-auto p-4 space-x-6 hide-scrollbar cursor-grab active:cursor-grabbing"
        style={{
          scrollSnapType: 'x mandatory',
          scrollPaddingLeft: '1rem',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default VideoTestimonialCarousel;
