"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import { ALBUMS } from "@/lib/albums-data";
import { SERVICES } from "@/lib/services-data";

export default function FilteredGallery({ service, location, niche, locality }) {
  const serviceSlug = service?.slug;

  const allAlbums = ALBUMS[serviceSlug] || [];

  const filterOptions = useMemo(() => {
    const uniqueNiches = [...new Set(allAlbums.map(a => a.nicheSlug))];
    const serviceData = SERVICES[serviceSlug];

    return uniqueNiches.map(nicheSlug => {
      const nch = serviceData?.niches?.find(n => n.slug === nicheSlug);
      return {
        slug: nicheSlug,
        title:
          nch?.title ||
          nicheSlug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
      };
    });
  }, [allAlbums, serviceSlug]);

  const [activeFilter, setActiveFilter] = useState(niche?.slug || "all");

  const filteredAlbums = useMemo(() => {
    let filtered = [...allAlbums];

    if (activeFilter !== "all") {
      filtered = filtered.filter(a => a.nicheSlug === activeFilter);
    }

    if (location && !niche) {
      filtered = filtered.filter(a => a.locationSlug === location.slug);
    }

    if (locality) {
      filtered = filtered.filter(a => a.localitySlug === locality.slug);
    }

    return filtered;
  }, [allAlbums, activeFilter, location, locality, niche]);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 py-20 px-4 overflow-hidden">

      {/* STATIC PARTICLES (no JS) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes particleFloat {
          0% { transform: translateY(0px) translateX(0px); opacity: 0.7; }
          50% { transform: translateY(-40px) translateX(20px); opacity: 1; }
          100% { transform: translateY(0px) translateX(0px); opacity: 0.7; }
        }
        .animate-particle {
          animation: particleFloat linear infinite;
        }
      `}</style>

      {/* STATIC BLUR SHAPES (no parallax) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-80 h-80 bg-purple-500/20 rounded-full blur-xl top-[20%] left-[12%]" />
        <div className="absolute w-[26rem] h-[26rem] bg-pink-500/20 rounded-full blur-xl bottom-[12%] right-[10%]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto">

        {/* HEADER + FILTERS */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* TITLE */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-xl" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-xl" />

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

            {/* FILTERS */}
            <FiltersPanel
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              filterOptions={filterOptions}
              allAlbums={allAlbums}
            />
          </div>
        </div>

        {/* ALBUM GRID */}
        {filteredAlbums.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAlbums.map((album, index) => (
              <AlbumCard key={album.id} album={album} index={index} />
            ))}
          </div>
        ) : (
          <NoAlbums />
        )}

      </div>
    </section>
  );
}

/* ---- FILTER PANEL (unchanged design, optimized logic) ---- */
function FiltersPanel({ activeFilter, setActiveFilter, filterOptions, allAlbums }) {
  return (
    <div className="relative p-6 rounded-3xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-purple-500/20 shadow-2xl">
      <div className="relative space-y-3">

        <div className="text-sm font-bold text-purple-300/60 uppercase tracking-wider mb-4 px-4">
          Filter by Category
        </div>

        {/* ALL BUTTON */}
        <FilterButton
          label="All Albums"
          count={allAlbums.length}
          active={activeFilter === "all"}
          onClick={() => setActiveFilter("all")}
        />

        {/* CATEGORY BUTTONS */}
        {filterOptions.map(option => (
          <FilterButton
            key={option.slug}
            label={option.title}
            count={allAlbums.filter(a => a.nicheSlug === option.slug).length}
            active={activeFilter === option.slug}
            onClick={() => setActiveFilter(option.slug)}
          />
        ))}
      </div>
    </div>
  );
}

function FilterButton({ label, count, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group relative w-full px-6 py-4 rounded-2xl font-bold text-base transition-all duration-300 overflow-hidden ${
        active
          ? "bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white shadow-xl shadow-purple-500/50"
          : "bg-slate-700/40 text-purple-200 hover:bg-slate-700/60 border border-purple-500/20 hover:border-purple-400/40"
      }`}
    >
      <span className="relative flex items-center justify-between">
        <span>{label}</span>
        <span className={`min-w-[36px] h-[28px] flex items-center justify-center px-3 text-sm font-black rounded-xl ${
          active ? "bg-white/25 text-white" : "bg-purple-900/40 text-purple-300"
        }`}>
          {count}
        </span>
      </span>
    </button>
  );
}

/* ---- ALBUM CARD ---- */
function AlbumCard({ album, index }) {
  return (
    <div
      className="group relative"
      style={{ animation: `slideUp 0.7s ease-out ${index * 0.08}s both` }}
    >
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

      <a href={album.albumUrl} className="block relative transition-all duration-500 group-hover:-translate-y-3">
        <div className="relative p-5 bg-slate-800/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-500/30 group-hover:border-pink-500/60 group-hover:shadow-purple-500/30 transition-all duration-500">

          <div className="relative h-[450px] overflow-hidden rounded-2xl">
            <Image
              src={album.coverImage}
              alt={album.coupleName}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            />

            <div className="absolute top-4 left-4 z-20">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-purple-500/40">
                <span className="text-sm font-bold text-white">
                  {album.shootLocation.split(",")[0]}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 px-2">
            <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200 mb-2 tracking-tight">
              {album.coupleName}
            </h3>

            <p className="text-sm text-purple-200/80 mb-4">{album.shootLocation}</p>

            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white font-bold text-sm shadow-lg shadow-purple-500/40 group-hover:shadow-pink-500/50 group-hover:scale-105 transition-all duration-300">
              View Album
            </div>
          </div>

        </div>
      </a>
    </div>
  );
}

function NoAlbums() {
  return (
    <div className="text-center py-24 text-white opacity-80">
      No albums found.
    </div>
  );
}
