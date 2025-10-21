// components/ServiceKeywordGrid.jsx

import React from 'react';

/**
 * @typedef {object} GridItem
 * @property {string} title - The service/location title (H3).
 * @property {string} icon - A simple emoji or string icon.
 * @property {string} description - Detailed text for keyword stuffing.
 * @property {string} linkHref - The URL for the Call-to-Action.
 * @property {string} linkText - The text for the Call-to-Action button.
 */

/**
 * @typedef {object} ServiceKeywordGridProps
 * @property {string} headline - The main headline for the section (H2).
 * @property {GridItem[]} items - An array of card data.
 */

/**
 * A reusable, responsive grid for grouping related SEO content (services/locations).
 * Features a subtle 3D lift and shadow on hover for attractiveness.
 *
 * @param {ServiceKeywordGridProps} props
 * @returns {JSX.Element}
 */
export default function ServiceKeywordGrid({ headline, items }) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Headline (H2 for main SEO context) */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-12">
          {headline}
        </h2>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="group p-8 border border-gray-100 rounded-xl shadow-lg transition-all duration-300 
                         hover:shadow-2xl hover:scale-[1.02] hover:border-indigo-400/50 
                         bg-white hover:bg-indigo-50/20"
            >
              <div className="flex items-start mb-4">
                <div className="text-4xl text-indigo-600 mr-4 leading-none">{item.icon}</div>
                
                {/* Card Title (H3 for secondary keywords) */}
                <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">
                  {item.title}
                </h3>
              </div>

              {/* Keyword-rich Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {item.description}
              </p>

              {/* Call-to-Action Link */}
              <a 
                href={item.linkHref}
                className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 
                           transition-all duration-300 group-hover:underline"
                aria-label={`Explore ${item.title}`}
              >
                {item.linkText}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Usage Example ---
/*


<ServiceKeywordGrid
  headline="Our Expertise: SEO Services and Locations"
  items={serviceData}
/>
*/