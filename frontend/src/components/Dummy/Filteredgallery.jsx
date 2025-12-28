"use client";
import { useState, useMemo, useEffect } from "react";
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

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const particles = Array.from({ length: 30 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setParallax({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 py-20 px-4 overflow-hidden">

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          ></span>
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            top: `calc(20% + ${parallax.y * 0.3}px)`,
            left: `calc(12% + ${parallax.x * 0.3}px)`,
          }}
        ></div>

        <div
          className="absolute w-[28rem] h-[28rem] bg-pink-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            bottom: `calc(12% - ${parallax.y * 0.3}px)`,
            right: `calc(10% - ${parallax.x * 0.3}px)`,
            animationDelay: "1s",
          }}
        ></div>
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            300px at ${mousePos.x}px ${mousePos.y}px,
            rgba(255,255,255,0.18),
            transparent 70%
          )`,
          transition: "background 0.08s ease-out",
        }}
      ></div>

      <div className="relative z-10 max-w-[1400px] mx-auto">

        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-2xl" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-3xl" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-md border border-purple-400/40 shadow-lg shadow-purple-500/20">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                  </span>
                  <span className="text-sm font-black text-white tracking-[0.25em] uppercase">Portfolio</span>
                </div>

                <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 leading-[0.9]">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-100">
                    Our Latest
                  </span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 mt-2">
                    Work
                  </span>
                </h2>

                <p className="text-lg text-purple-200/80 max-w-xl leading-relaxed">
                  Discover stunning moments from our collection of {service?.title?.toLowerCase() || "wedding photography"}
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="relative p-6 rounded-3xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-purple-500/20 shadow-2xl">

                <div className="absolute -top-1 -right-1 w-20 h-20 bg-gradient-to-br from-pink-500/40 to-purple-500/40 rounded-full blur-2xl" />

                <div className="relative space-y-3">
                  <div className="text-sm font-bold text-purple-300/60 uppercase tracking-wider mb-4 px-4">
                    Filter by Category
                  </div>

                  <button
                    onClick={() => setActiveFilter("all")}
                    className={`group relative w-full px-6 py-4 rounded-2xl font-bold text-base transition-all duration-300 overflow-hidden ${
                      activeFilter === "all"
                        ? "bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white shadow-xl shadow-purple-500/50"
                        : "bg-slate-700/40 text-purple-200 hover:bg-slate-700/60 border border-purple-500/20 hover:border-purple-400/40"
                    }`}
                  >
                    {activeFilter !== "all" && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-pink-500/20 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    )}

                    <span className="relative flex items-center justify-between">
                      <span className="flex items-center gap-3">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        <span>All Albums</span>
                      </span>
                      <span className={`min-w-[36px] h-[28px] flex items-center justify-center px-3 text-sm font-black rounded-xl ${
                        activeFilter === "all"
                          ? "bg-white/25 text-white"
                          : "bg-purple-900/40 text-purple-300"
                      }`}>
                        {allAlbums.length}
                      </span>
                    </span>
                  </button>

                  {filterOptions.map((option) => {
                    const count = allAlbums.filter(a => a.nicheSlug === option.slug).length;
                    return (
                      <button
                        key={option.slug}
                        onClick={() => setActiveFilter(option.slug)}
                        className={`group relative w-full px-6 py-4 rounded-2xl font-bold text-base transition-all duration-300 overflow-hidden ${
                          activeFilter === option.slug
                            ? "bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white shadow-xl shadow-purple-500/50"
                            : "bg-slate-700/40 text-purple-200 hover:bg-slate-700/60 border border-purple-500/20 hover:border-purple-400/40"
                        }`}
                      >
                        {activeFilter !== option.slug && (
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-pink-500/20 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        )}

                        <span className="relative flex items-center justify-between">
                          <span className="flex items-center gap-3">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            <span>{option.title}</span>
                          </span>
                          <span className={`min-w-[36px] h-[28px] flex items-center justify-center px-3 text-sm font-black rounded-xl ${
                            activeFilter === option.slug
                              ? "bg-white/25 text-white"
                              : "bg-purple-900/40 text-purple-300"
                          }`}>
                            {count}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {filteredAlbums.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAlbums.map((album, index) => (
              <AlbumCard key={album.id} album={album} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-slate-800/60 backdrop-blur-md mb-6 border border-purple-500/30">
              <svg className="w-12 h-12 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No albums found</h3>
            <p className="text-purple-200/80">Check back soon for new additions!</p>
          </div>
        )}
      </div>
    </section>
  );
}

function AlbumCard({ album, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative"
      style={{
        animation: `slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s both`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

      <a
        href={album.albumUrl}
        className="block relative transition-all duration-500 group-hover:-translate-y-3"
      >
        <div className="relative p-5 bg-slate-800/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-500/30 group-hover:border-pink-500/60 group-hover:shadow-purple-500/30 transition-all duration-500">

          <div className="relative h-[450px] overflow-hidden rounded-2xl">
            <img
              src={album.coverImage}
              alt={`${album.coupleName} - ${album.shootLocation}`}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-purple-900/30 to-transparent" />

            <div className="absolute top-4 left-4 z-20">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-purple-500/40">
                <svg className="w-4 h-4 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-bold text-white">
                  {album.shootLocation.split(',')[0]}
                </span>
              </div>
            </div>

            <div
              className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-1000 ${
                isHovered ? 'translate-x-full' : '-translate-x-full'
              }`}
            />
          </div>

          <div className="mt-5 px-2">
            <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200 mb-2 tracking-tight group-hover:from-pink-200 group-hover:to-purple-300 transition-all duration-300">
              {album.coupleName}
            </h3>

            <div className="flex items-center gap-2 text-purple-200/80 mb-4">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-medium">
                {album.shootLocation}
              </span>
            </div>

            <div className={`transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-1'}`}>
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white font-bold text-sm shadow-lg shadow-purple-500/40 group-hover:shadow-pink-500/50 group-hover:scale-105 transition-all duration-300">
                <span>View Album</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>

          <div className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`} />
        </div>
      </a>
    </div>
  );
}