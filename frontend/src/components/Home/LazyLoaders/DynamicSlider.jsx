"use client"

// components/DynamicSlider.jsx
import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { SLIDE_IMAGES, SLIDER_OPTIONS } from '../../../data/Home/SliderData'; // Import static data

// 1. Dynamically import the core slider component
const DynamicSliderWithProgress = dynamic(
  () => import('../SlideWithProgress'), // Assuming SliderWithProgress is in the same directory
  {
    ssr: false, // Prevents Splide's large JS bundle from blocking the initial load
    loading: () => (
      // Placeholder for LCP/CLS optimization
      <div className="w-full h-96 bg-gray-100 rounded-lg animate-pulse 
      flex items-center justify-center text-gray-500">
        Loading Hero Slider...
      </div>
    ),
  }
);

/**
 * Wrapper component to handle data memoization and dynamic import.
 * This is the component that page.jsx will import.
 */
export default function DynamicSliderWrapper() {
  
  // Memoize the props (Layer 4) to ensure reference stability for React.memo 
  // in the core SliderWithProgress component.
  const slidesData = useMemo(() => SLIDE_IMAGES, []);
  const options = useMemo(() => SLIDER_OPTIONS, []);
  
  return (
    <DynamicSliderWithProgress
      slides={slidesData}
      options={options}
      progressColor="bg-blue-600"
      trackColor="bg-blue-200"
    />
  );
}