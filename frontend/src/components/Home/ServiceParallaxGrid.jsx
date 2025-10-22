

"use client";
import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// --- Custom Hooks ---

// 1. Parallax Effect Hook (Unchanged)
const useParallaxEffect = (ref, speed = 0.1) => {
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const centerOffset = (window.innerHeight / 2) - (rect.top + rect.height / 2);
        const transformY = centerOffset * speed;
        element.style.transform = `translateY(${transformY}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref, speed]);
};

// 2. Scroll Trigger Hook for Content Animation (NEW)
const useScrollTrigger = (ref, options = { threshold: 0.3 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target); // Trigger once
      }
    }, options);

    const currentElement = ref.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [ref, options]);

  return isVisible;
};

// --- ServiceParallaxGrid Component (Unchanged) ---

const ServiceParallaxGrid = ({ services = [] }) => {
  if (services.length === 0) {
    return (
      <div className="text-center p-10 bg-gray-50">
        <p className="text-xl font-semibold text-gray-700">No services data available.</p>
      </div>
    );
  }

  return (
    <section className="w-full bg-gray-900 overflow-hidden" aria-label="Our Photography Services">
      {services.map((service, index) => (
        <ServiceItem 
          key={service.id || index} 
          service={service} 
          isReversed={index % 2 !== 0} 
        />
      ))}
      <CtaBanner /> {/* ADDED: New CTA Banner */}
    </section>
  );
};

// --- Sub-Component: ServiceItem (Updated) ---

const ServiceItem = ({ service, isReversed }) => {
  const imageRef = useRef(null);
   const contentRef = useRef(null);
  
  // Apply Parallax and Scroll Trigger
  useParallaxEffect(imageRef, isReversed ? 0.08 : 0.12); 
  const isContentVisible = useScrollTrigger(contentRef, { threshold: 0.2 });

  const { title, description, image, buttonText, href } = service;

  const textOrder = isReversed ? "sm:order-2" : "sm:order-1";
  const imageOrder = isReversed ? "sm:order-1" : "sm:order-2";
  const imageAlt = `A photographic image related to ${title}`;

  // Tailwind classes for the smooth fade-in and slide-up animation
  const animationClasses = isContentVisible 
    ? "opacity-100 translate-y-0" 
    : "opacity-0 translate-y-10";

  return (
    <div 
      id={`service-${service.id}`}
      className={`relative flex flex-col sm:flex-row min-h-[80vh] sm:min-h-screen border-b border-gray-800`}
      aria-labelledby={`service-title-${service.id}`}
    >
      {/* --- Image Section with Parallax Effect (Unchanged) --- */}
      <div className={`relative w-full sm:w-1/2 overflow-hidden ${imageOrder} min-h-[40vh] sm:min-h-full`}>
        <div ref={imageRef} className="absolute inset-[-10%] w-[120%] h-[120%] transition-transform duration-100 ease-out will-change-transform">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover transition-opacity duration-700"
              sizes="(max-width: 640px) 100vw, 50vw"
              priority={service.id === 1}
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent sm:bg-gradient-to-r sm:from-gray-900/60 sm:via-gray-900/20 sm:to-transparent"></div>
      </div>

      {/* --- Content Section (Updated with Animation) --- */}
      <div 
        ref={contentRef}
        className={`relative w-full sm:w-1/2 p-8 md:p-16 lg:p-24 flex items-center justify-center ${textOrder} bg-gray-900 text-white`}
      >
        <div 
          className={`max-w-md space-y-6 transition duration-1000 ease-out ${animationClasses}`}
        >
          <h2 id={`service-title-${service.id}`} className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-amber-200">
            {title}
          </h2>

          <p className="text-lg font-light text-gray-300 italic max-w-sm">
            What we do best:
          </p>

          <ul className="space-y-3 list-none text-gray-200">
            {description.map((item, i) => (
              <li key={i} className="flex items-start text-base">
                <svg className="w-5 h-5 flex-shrink-0 mr-3 text-pink-400 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4">
            <Link 
              href={href}
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium border border-transparent rounded-full shadow-lg bg-pink-500 text-white transition duration-300 ease-in-out transform hover:scale-[1.03] hover:bg-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-500 focus:ring-opacity-50"
              aria-label={`Learn more about ${title}`}
            >
              {buttonText}
              <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- New Component: CtaBanner ---

const CtaBanner = () => {
    return (
        <div className="py-20 md:py-32 bg-gray-800 overflow-hidden relative">
            {/* Background Texture/Gradient for Appeal */}
            <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full bg-[url('https://api.unsplash.com/search/photos?query=abstract%20dark%20texture&w=1600&h=800&fit=crop&q=80')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
                    Ready to Capture Your Story?
                </h3>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
                    Let's create something unforgettable. We offer personalized consultations to ensure your vision comes to life.
                </p>
                <div className="flex justify-center space-x-4">
                    <Link 
                        href="/contact"
                        className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-base font-semibold rounded-full shadow-2xl text-gray-900 bg-amber-400 transition duration-300 ease-in-out transform hover:scale-[1.05] hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-opacity-50"
                        aria-label="Contact us to book a consultation"
                    >
                        Book a Free Consultation
                    </Link>
                    <Link 
                        href="/portfolio"
                        className="inline-flex items-center justify-center px-10 py-4 border-2 border-pink-500 text-base font-semibold rounded-full text-pink-500 bg-transparent transition duration-300 ease-in-out hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-pink-500 focus:ring-opacity-50"
                        aria-label="View our extensive photography portfolio"
                    >
                        View Portfolio
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ServiceParallaxGrid;

// --- Example Usage Data Export (Unchanged) ---
// (The servicesData remains the same as provided in the previous step.)
export const servicesData = [
  // ... (data structure as previously defined)
  {
    id: 1,
    title: "Wedding Photography",
    description: [
      "Capturing timeless wedding moments with elegance",
      "Pre-wedding & engagement photo sessions",
      "Storytelling through candid and cinematic styles",
      "Professional editing for a magazine-quality finish",
      "Personalized wedding albums and films",
    ],
    image:
      "/Weddings/beautiful-husband-wife-posing-beach.jpg",
    buttonText: "View Wedding Packages",
    href: "/services/wedding-photography",
  },
  {
    id: 2,
    title: "Portrait Photography",
    description: [
      "Studio and outdoor portrait sessions",
      "Professional lighting and retouching",
      "Creative concepts for individuals and families",
      "Model, actor & influencer portfolio shoots",
    ],
    image:
      "/Weddings/beautiful-husband-wife-posing-beach.jpg",
    buttonText: "Book A Session",
    href: "/services/portrait-photography",
  },
  {
    id: 3,
    title: "Product & Brand Photography",
    description: [
      "High-quality visuals for eCommerce and branding",
      "Creative flat-lays and lifestyle product shots",
      "Lighting setups for reflective and detailed products",
      "Perfect for online stores, restaurants, and agencies",
    ],
    image:
      "/Weddings/beautiful-husband-wife-posing-beach.jpg",
    buttonText: "See Brand Portfolio",
    href: "/services/product-photography",
  },
  {
    id: 4,
    title: "Event & Corporate Photography",
    description: [
      "Professional coverage for conferences & events",
      "Corporate portraits and team photos",
      "Candid shots capturing real moments",
      "On-site editing and quick delivery options",
    ],
    image:
      "/Weddings/beautiful-husband-wife-posing-beach.jpg",
    buttonText: "Request Event Quote",
    href: "/services/event-photography",
  },
];