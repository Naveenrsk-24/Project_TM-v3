"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, MoveRight, ZoomIn, X } from 'lucide-react';
import Image from 'next/image'; // Use Next.js Image component for performance

// --- Component Interfaces (for clarity) ---

/**
 * @typedef {Object} PortfolioImage
 * @property {number | string} id
 * @property {string} src - The image source URL.
 * @property {string} alt - The alt text for accessibility.
 * @property {'small' | 'medium' | 'large'} size - Grid size hint.
 */

/**
 * @typedef {Object} PortfolioGalleryProps
 * @property {PortfolioImage[]} images - Array of image objects to display.
 * @property {string} title - Main title (e.g., 'Selected').
 * @property {string} subtitle - Secondary title (e.g., 'Works').
 * @property {string} description - Hero section description.
 * @property {string} ctaText - Call-to-action button text.
 * @property {() => void} onCtaClick - Handler for the CTA button.
 */

// --- Component Data (Updated with real image URL) ---

const DEFAULT_IMAGE_URL = '/Weddings/beautiful-husband-wife-posing-beach.jpg';

const defaultPortfolioImages = [
    // Placeholder sizes are retained, but src is updated for consistency
    { id: 1, src: DEFAULT_IMAGE_URL, alt: 'Couple in garden', size: 'large' },
    { id: 2, src: DEFAULT_IMAGE_URL, alt: 'Couple at doorway', size: 'medium' },
    { id: 3, src: DEFAULT_IMAGE_URL, alt: 'Wedding celebration', size: 'large' },
    { id: 4, src: DEFAULT_IMAGE_URL, alt: 'Traditional portrait', size: 'small' },
    { id: 5, src: DEFAULT_IMAGE_URL, alt: 'Couple at beach', size: 'medium' },
    { id: 6, src: DEFAULT_IMAGE_URL, alt: 'Elegant bride', size: 'large' },
    { id: 7, src: DEFAULT_IMAGE_URL, alt: 'White architecture', size: 'medium' },
    { id: 8, src: DEFAULT_IMAGE_URL, alt: 'Outdoor ceremony', size: 'large' },
    { id: 9, src: DEFAULT_IMAGE_URL, alt: 'Garden wedding', size: 'medium' },
    { id: 10, src: DEFAULT_IMAGE_URL, alt: 'Couple at balcony', size: 'small' },
    { id: 11, src: DEFAULT_IMAGE_URL, alt: 'Temple silhouette', size: 'medium' },
    { id: 12, src: DEFAULT_IMAGE_URL, alt: 'Historic location', size: 'large' },
];


// --- Lightbox Component (for modularity) ---

const Lightbox = ({ image, onClose }) => {
    if (!image) return null;

    return (
        <div
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 animate-fadeIn"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={`Full-screen view of ${image.alt}`}
        >
            <div className="max-w-6xl max-h-full relative flex items-center justify-center" onClick={e => e.stopPropagation()}>
                <Image
                    src={image.src}
                    alt={image.alt}
                    width={1200}
                    height={800}
                    className="w-auto h-auto max-h-[90vh] object-contain rounded-2xl shadow-2xl"
                    priority
                />
                <button
                    className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 z-10"
                    onClick={onClose}
                    aria-label="Close image view"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};


// --- MAIN COMPONENT ---

/**
 * @param {PortfolioGalleryProps} props
 */
const PortfolioGalleryB = ({
    images = defaultPortfolioImages,
    title = 'Selected',
    subtitle = 'Works',
    description = 'Capturing moments that tell stories • Creating memories that last forever',
    ctaText = 'Explore Full Portfolio',
    onCtaClick = () => console.log('CTA clicked'),
}) => {
    const [scrollY, setScrollY] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const containerRef = useRef(null);

    // Initial load for hero animation
    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Scroll handler for parallax effect
    const handleScroll = useCallback(() => {
        setScrollY(window.scrollY);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // Enhanced Parallax Logic: Calculates translation based on scroll position
    // and component's vertical position to create a more natural effect.
    const getParallaxStyle = (index) => {
        // Speed variation: 0.1 for slow, 0.3 for medium, 0.5 for fast
        const speed = (index % 3 === 0) ? 0.1 : (index % 3 === 1) ? 0.3 : 0.5;

        // Determine offset amount. Adjusting scrollY by speed creates the "floating" effect.
        const translateY = scrollY * speed;

        return {
            transform: `translateY(${translateY}px)`,
        };
    };
    
    // Grid Class Logic: Ensure better mobile/tablet responsiveness and bento style
    const getGridClass = (size) => {
        switch (size) {
            case 'large':
                // Large on desktop (2x2) and wide on mobile (col-span-2)
                return 'col-span-2 row-span-2 min-h-[500px] md:col-span-2 md:min-h-[500px]';
            case 'medium':
                // Taller on mobile and standard on desktop (1x2)
                return 'col-span-1 row-span-2 min-h-[400px] md:row-span-1 md:min-h-[300px]';
            case 'small':
            default:
                // Standard on mobile/desktop (1x1)
                return 'col-span-1 row-span-1 min-h-[300px]';
        }
    };

    // Close lightbox on Escape key
    const handleKeyDown = useCallback((event) => {
        if (event.key === 'Escape') {
            setSelectedImage(null);
        }
    }, []);

    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage, handleKeyDown]);


    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative font-sans">
            
            {/* --- Animated Background Glow --- */}
            <div className="fixed inset-0 opacity-30 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* --- Hero Section --- */}
            <header className="relative z-20 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className={`max-w-7xl mx-auto transition-all duration-1500 transform ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></div>
                            <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                        <span className="text-sm tracking-widest text-amber-500 uppercase font-light">
                            Featured Works
                        </span>
                    </div>
                    
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold mb-6 tracking-tighter">
                        <span className="inline-block bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text text-transparent animate-gradient">
                            {title}
                        </span>
                        <br />
                        <span className="text-white italic font-serif font-light">{subtitle}</span>
                    </h1>
                    
                    <p className="text-xl text-neutral-400 max-w-xl leading-relaxed">
                        {description}
                    </p>
                </div>
            </header>

            {/* --- Parallax Grid Gallery --- */}
            <div ref={containerRef} className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-32">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[300px] md:auto-rows-[250px]">
                    {images.map((image, index) => (
                        <div
                            key={image.id}
                            className={`group relative cursor-pointer rounded-3xl overflow-hidden transition-all duration-700 hover:scale-[1.02] ${
                                isLoaded ? 'opacity-100' : 'opacity-0'
                            } ${getGridClass(image.size)}`}
                            style={{
                                ...getParallaxStyle(index),
                                transitionDelay: `${index * 50}ms`,
                            }}
                            onClick={() => setSelectedImage(image)}
                            aria-label={`View full image: ${image.alt}`}
                        >
                            {/* Card Container */}
                            <div className="relative h-full w-full bg-neutral-900 shadow-2xl">
                                
                                {/* Image */}
                                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                        className="object-cover"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Gradient & Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>

                                {/* Border & Corner Glow */}
                                <div className="absolute inset-0 border-2 border-amber-500/0 group-hover:border-amber-500/50 rounded-3xl transition-all duration-500"></div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-y-16 translate-x-16"></div>

                                {/* Content Overlay */}
                                <div className="absolute inset-0 flex flex-col justify-end p-6">
                                    <div className="flex items-center gap-2 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0">
                                        <ZoomIn className="w-5 h-5" />
                                        <span className="text-base font-semibold">Quick View</span>
                                    </div>
                                    <p className="text-white text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150 transform translate-y-4 group-hover:translate-y-0">
                                        {image.alt}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- CTA Section --- */}
                <div className="mt-24 text-center">
                    <div className="inline-flex flex-col items-center gap-8">
                        {/* Decorative Line */}
                        <div className="flex items-center gap-4">
                            <div className="w-24 h-px bg-gradient-to-r from-transparent to-amber-500"></div>
                            <Sparkles className="w-6 h-6 text-amber-500 animate-pulse" />
                            <div className="w-24 h-px bg-gradient-to-l from-transparent to-amber-500"></div>
                        </div>

                        {/* Button */}
                        <button
                            onClick={onCtaClick}
                            className="group relative px-12 py-6 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(251,191,36,0.5)] focus:outline-none focus:ring-4 focus:ring-amber-500/50"
                            aria-label={ctaText}
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                {ctaText}
                                <MoveRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" />
                            </span>
                            
                            {/* Animated Background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        </button>

                        <p className="text-neutral-500 text-sm">
                            Discover more of our work • 200+ Projects
                        </p>
                    </div>
                </div>
            </div>

            {/* --- Lightbox Modal --- */}
            <Lightbox
                image={selectedImage}
                onClose={() => setSelectedImage(null)}
            />

            {/* --- Global Animation Styles --- */}
            <style jsx global>{`
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient {
                    background-size: 200% auto;
                    animation: gradient 3s ease infinite;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default PortfolioGalleryB;