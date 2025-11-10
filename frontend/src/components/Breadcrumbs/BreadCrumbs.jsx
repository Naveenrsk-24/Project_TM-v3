'use client'

import React, { useState } from 'react';
import { Home, ChevronRight, MapPin } from 'lucide-react';

export default function Breadcrumbs({ breadcrumbs }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  return (
    <nav className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-hide pb-1">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const isFirst = index === 0;
            const isHovered = hoveredIndex === index;

            return (
              <div key={index} className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                {/* Breadcrumb Item */}
                <a
                  href={crumb.href}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`
                    group relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl 
                    transition-all duration-300 text-xs sm:text-sm font-medium
                    ${isLast 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md pointer-events-none' 
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-white hover:shadow-md'
                    }
                    ${isHovered && !isLast ? 'scale-105' : ''}
                  `}
                >
                  {/* Home icon for first item */}
                  {isFirst && (
                    <Home className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ${
                      isHovered && !isLast ? 'scale-110' : ''
                    }`} />
                  )}
                  
                  {/* Location icon for last item if it's a location */}
                  {isLast && crumb.type === 'location' && (
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse" />
                  )}

                  {/* Label */}
                  <span className="whitespace-nowrap max-w-[120px] sm:max-w-none truncate">
                    {crumb.label}
                  </span>

                  {/* Hover underline effect for non-last items */}
                  {!isLast && (
                    <span className={`
                      absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 
                      transition-transform duration-300 origin-left
                      ${isHovered ? 'scale-x-100' : 'scale-x-0'}
                    `}></span>
                  )}
                </a>

                {/* Separator */}
                {!isLast && (
                  <ChevronRight 
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 transition-all duration-300 flex-shrink-0 ${
                      isHovered ? 'text-indigo-500 scale-125' : ''
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile scroll hint */}
        {breadcrumbs.length > 3 && (
          <div className="sm:hidden mt-2 text-center">
            <div className="inline-flex items-center gap-1 text-xs text-gray-400">
              <span>←</span>
              <span>Swipe to see more</span>
              <span>→</span>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </nav>
  );
}

// // Demo Component
// function Demo() {
//   const demoBreadcrumbs = [
//     { label: 'Home', href: '/' },
//     { label: 'Services', href: '/services' },
//     { label: 'Photography', href: '/services/photography' },
//     { label: 'Wedding Photography', href: '/services/photography/wedding' },
//     { label: 'New Delhi', href: '/services/photography/wedding/new-delhi', type: 'location' }
//   ];

//   // Alternative shorter breadcrumb for comparison
//   const shortBreadcrumbs = [
//     { label: 'Home', href: '/' },
//     { label: 'Wedding Photography', href: '/services/photography/wedding' },
//     { label: 'Mumbai', href: '/services/photography/wedding/mumbai', type: 'location' }
//   ];

//   return (
//     <div className="space-y-8 bg-gray-100 min-h-screen py-8">
//       <div>
//         <h3 className="text-center text-gray-600 mb-4 text-sm font-medium">Full Navigation Path</h3>
//         <Breadcrumb breadcrumbs={demoBreadcrumbs} />
//       </div>
      
//       <div>
//         <h3 className="text-center text-gray-600 mb-4 text-sm font-medium">Shorter Path</h3>
//         <Breadcrumb breadcrumbs={shortBreadcrumbs} />
//       </div>

//       <div className="max-w-4xl mx-auto px-4 mt-12">
//         <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
//           <h4 className="text-xl font-bold mb-4 text-gray-800">Features:</h4>
//           <ul className="space-y-2 text-gray-600">
//             <li className="flex items-start gap-2">
//               <span className="text-indigo-600 mt-1">✓</span>
//               <span><strong>Mobile-First:</strong> Horizontal scroll on mobile with scroll hint</span>
//             </li>
//             <li className="flex items-start gap-2">
//               <span className="text-indigo-600 mt-1">✓</span>
//               <span><strong>Interactive Hover:</strong> Items scale and show underline animation</span>
//             </li>
//             <li className="flex items-start gap-2">
//               <span className="text-indigo-600 mt-1">✓</span>
//               <span><strong>Active State:</strong> Current page highlighted with gradient background</span>
//             </li>
//             <li className="flex items-start gap-2">
//               <span className="text-indigo-600 mt-1">✓</span>
//               <span><strong>Smart Icons:</strong> Home icon for first item, location pin for places</span>
//             </li>
//             <li className="flex items-start gap-2">
//               <span className="text-indigo-600 mt-1">✓</span>
//               <span><strong>Animated Separators:</strong> Chevrons react to hover states</span>
//             </li>
//             <li className="flex items-start gap-2">
//               <span className="text-indigo-600 mt-1">✓</span>
//               <span><strong>Responsive:</strong> Adapts typography and spacing for all screen sizes</span>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Demo;