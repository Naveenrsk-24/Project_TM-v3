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
    
    // Map nicheSlug to full niche data
    return uniqueNiches.map(nicheSlug => {
      const nicheData = serviceData?.niches?.find(n => n.slug === nicheSlug);
      return {
        slug: nicheSlug,
        title: nicheData?.title || nicheSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      };
    });
  }, [allAlbums, serviceSlug]);

  // State for active filter (default to "all" or pre-selected niche)
  const [activeFilter, setActiveFilter] = useState(niche?.slug || "all");

  // Filter albums based on active filter and page context
  const filteredAlbums = useMemo(() => {
    let filtered = [...allAlbums];

    // Filter by niche (from tab selection)
    if (activeFilter !== "all") {
      filtered = filtered.filter(album => album.nicheSlug === activeFilter);
    }

    // Additional filters based on page context
    if (location && !niche) {
      // On location pages, filter by location
      filtered = filtered.filter(album => album.locationSlug === location.slug);
    }

    if (locality) {
      // On locality pages, filter by locality
      filtered = filtered.filter(album => album.localitySlug === locality.slug);
    }

    return filtered;
  }, [allAlbums, activeFilter, location, locality, niche]);

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        {/* <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Portfolio
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our collection of stunning {service?.title.toLowerCase()} moments
          </p>
        </div> */}

        {/* Filter Tabs with Count */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {/* "All" Tab */}
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
              activeFilter === "all"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <span>All</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              activeFilter === "all" ? "bg-white/20" : "bg-gray-200"
            }`}>
              {allAlbums.length}
            </span>
          </button>

          {/* Dynamic Niche Tabs */}
          {filterOptions.map((option) => {
            const count = allAlbums.filter(a => a.nicheSlug === option.slug).length;
            return (
              <button
                key={option.slug}
                onClick={() => setActiveFilter(option.slug)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeFilter === option.slug
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <span>{option.title}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeFilter === option.slug ? "bg-white/20" : "bg-gray-200"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Albums Grid */}
        {filteredAlbums.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAlbums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No albums found for this category. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// Album Card Component
function AlbumCard({ album }) {
  return (
    <a
      href={album.albumUrl}
      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
    >
      {/* Image Container */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={album.coverImage}
          alt={`${album.coupleName} - ${album.shootLocation}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Hover Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-sm font-medium mb-1">📍 {album.shootLocation}</p>
          <p className="text-xs opacity-90">View Full Album →</p>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {album.coupleName}
        </h3>
        <p className="text-gray-600 text-sm flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
          {album.shootLocation}
        </p>
      </div>
    </a>
  );
}