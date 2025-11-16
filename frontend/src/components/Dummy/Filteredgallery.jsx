"use client";
import { useState, useMemo } from "react";
import { ALBUMS } from "@/lib/albums-data";
import { SERVICES } from "@/lib/services-data";

export default function FilteredGallery({ service, location, niche, locality }) {
  const serviceSlug = service?.slug;
  
  // Get all albums for this service
  const allAlbums = ALBUMS[serviceSlug] || [];
  
  // Generate filter options from unique niches in albums
  const filterOptions = useMemo(() => {
    const uniqueNiches = [...new Set(allAlbums.map(album => album.nicheSlug))];
    const serviceData = SERVICES[serviceSlug];
    
    return uniqueNiches.map(nicheSlug => {
      const nicheData = serviceData?.niches?.find(n => n.slug === nicheSlug);
      return {
        slug: nicheSlug,
        title: nicheData?.title || nicheSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      };
    });
  }, [allAlbums, serviceSlug]);

  const [activeFilter, setActiveFilter] = useState(niche?.slug || "all");

  // Filter albums based on active filter and page context
  const filteredAlbums = useMemo(() => {
    let filtered = [...allAlbums];

    if (activeFilter !== "all") {
      filtered = filtered.filter(album => album.nicheSlug === activeFilter);
    }

    if (location && !niche) {
      filtered = filtered.filter(album => album.locationSlug === location.slug);
    }

    if (locality) {
      filtered = filtered.filter(album => album.localitySlug === locality.slug);
    }

    return filtered;
  }, [allAlbums, activeFilter, location, locality, niche]);

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent" />
      
      <div className="relative max-w-7xl mx-auto">
        {/* Modern Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-200/50 mb-6">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-blue-900 tracking-wide uppercase">Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
            Our Latest Work
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover stunning moments from our collection of {service?.title.toLowerCase()}
          </p>
        </div>

        {/* Modern Glass-morphism Filter Tabs */}
        <div className="mb-16 flex justify-center">
          <div className="inline-flex flex-wrap gap-2 p-2 rounded-2xl bg-white/60 backdrop-blur-xl border border-gray-200/50 shadow-xl shadow-gray-200/50">
            {/* "All" Tab */}
            <button
              onClick={() => setActiveFilter("all")}
              className={`group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeFilter === "all"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                  : "text-gray-700 hover:bg-white/80"
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                All
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  activeFilter === "all" 
                    ? "bg-white/30 text-white" 
                    : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                }`}>
                  {allAlbums.length}
                </span>
              </span>
            </button>

            {/* Dynamic Niche Tabs */}
            {filterOptions.map((option) => {
              const count = allAlbums.filter(a => a.nicheSlug === option.slug).length;
              return (
                <button
                  key={option.slug}
                  onClick={() => setActiveFilter(option.slug)}
                  className={`group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeFilter === option.slug
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                      : "text-gray-700 hover:bg-white/80"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {option.title}
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      activeFilter === option.slug 
                        ? "bg-white/30 text-white" 
                        : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                    }`}>
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Albums Grid with Stagger Animation */}
        {filteredAlbums.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredAlbums.map((album, index) => (
              <AlbumCard key={album.id} album={album} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 mb-6">
              <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No albums found</h3>
            <p className="text-gray-500">Check back soon for new additions!</p>
          </div>
        )}
      </div>
    </section>
  );
}

// Modern Album Card Component
function AlbumCard({ album, index }) {
  return (
    <div
      className="group relative"
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
      }}
    >
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      <a
        href={album.albumUrl}
        className="block relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
      >
        {/* Image Container with Advanced Effects */}
        <div className="relative h-96 overflow-hidden">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
          
          {/* Image */}
          <img
            src={album.coverImage}
            alt={`${album.coupleName} - ${album.shootLocation}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Top Badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-900 shadow-lg">
              <svg className="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {album.shootLocation.split(',')[0]}
            </span>
          </div>
          
          {/* Bottom Content - Always Visible */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
              {album.coupleName}
            </h3>
            <p className="text-white/80 text-sm mb-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {album.shootLocation}
            </p>
            
            {/* CTA Button - Appears on Hover */}
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-gray-900 font-semibold text-sm shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-300">
                View Album
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </div>
          </div>
          
          {/* Shine Effect on Hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-10" />
        </div>
      </a>
    </div>
  );
}