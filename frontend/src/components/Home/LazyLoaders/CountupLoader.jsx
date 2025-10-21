// src/components/Home/LazyLoaders/CountupLoader.js

"use client"; // 👈 CRITICAL: This is a Client Component

import dynamic from 'next/dynamic';
import React from 'react';

// Define the dynamic import here, where 'ssr: false' is permitted
const LazyNewCountUpComponent = dynamic(() => import('../CountupSection'), {
  // ssr: false is now safe inside this Client Component wrapper
  ssr: false, 
  loading: () => (
    // Placeholder to protect CLS (Layout Stability) while content loads
    <div className="h-[500px] w-full bg-gray-900 flex items-center justify-center text-white text-lg rounded-lg animate-pulse">
      Loading Milestones...
    </div>
  ),
});

// Export the lazy-loaded component
export default function CountupLoader() {
    return <LazyNewCountUpComponent />;
}