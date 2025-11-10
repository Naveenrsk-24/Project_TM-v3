'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAlbumsByService } from "@/lib/albums-data";

export default function Gallery({ service, location, locality, niche }) {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    if (!service) return;

    let fetchedAlbums = getAlbumsByService(service.slug);

    fetchedAlbums = fetchedAlbums.filter((album) => {
      const matchesService = album.serviceSlug === service.slug;
      const matchesLocation = !location?.slug || album.locationSlug === location.slug;
      const matchesLocality = !locality?.slug || album.localitySlug === locality.slug;
      const matchesNiche = !niche?.slug || album.nicheSlug === niche.slug;

      return matchesService && matchesLocation && matchesLocality && matchesNiche;
    });

    if (!fetchedAlbums.length) {
      fetchedAlbums = getAlbumsByService(service.slug);
    }

    setAlbums(fetchedAlbums);
  }, [service, location, locality, niche]);

  if (!albums.length) return null;

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-800 mb-3">
            Recent {niche?.title || service.title} Shoots
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base max-w-2xl mx-auto">
            Explore our latest {niche?.title?.toLowerCase() || service.title.toLowerCase()} sessions captured beautifully by our creative team.
          </p>
        </div>

        {/* ======== Mobile Carousel (3 items visible + text always visible) ======== */}
        <div className="block sm:hidden overflow-x-auto scroll-smooth no-scrollbar -mx-4 px-4">
          <div className="flex gap-4 min-w-max">
            {albums.map((album) => {
              const cover = album.coverImage?.startsWith("/")
                ? album.coverImage
                : `/${album.coverImage}`;

              return (
                <Link
                  key={album.id}
                  href={album.albumUrl || "#"}
                  className="group relative flex-shrink-0 w-[70vw] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  aria-label={`View album of ${album.coupleName || service.title}`}
                >
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src={cover}
                      alt={album.coupleName || `${service.title} shoot`}
                      fill
                      className="object-cover"
                    />

                    {/* Always visible text overlay for mobile */}
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 via-black/40 to-transparent p-3 text-white">
                      {album.coupleName && (
                        <h3 className="text-sm font-semibold tracking-tight truncate">
                          {album.coupleName}
                        </h3>
                      )}
                      {album.shootLocation && (
                        <p className="text-xs text-gray-200 truncate">
                          {album.shootLocation}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ======== Tablet/Desktop Grid (hover to show text) ======== */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {albums.map((album) => {
            const cover = album.coverImage?.startsWith("/")
              ? album.coverImage
              : `/${album.coverImage}`;

            return (
              <Link
                key={album.id}
                href={album.albumUrl || "#"}
                className="group relative block rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
                aria-label={`View album of ${album.coupleName || service.title}`}
              >
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={cover}
                    alt={album.coupleName || `${service.title} shoot`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Hover overlay text for desktop */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                    {album.coupleName && (
                      <h3 className="text-lg sm:text-xl font-semibold tracking-tight leading-snug">
                        {album.coupleName}
                      </h3>
                    )}
                    {album.shootLocation && (
                      <p className="text-sm sm:text-base text-gray-200">{album.shootLocation}</p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
