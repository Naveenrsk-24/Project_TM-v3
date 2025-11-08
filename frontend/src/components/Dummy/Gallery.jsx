'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAlbumsByService } from "@/lib/albums-data";


export default function Gallery({ service, location, locality, niche }) {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    if (!service) return;

    // Step 1: Get all albums for this service
    let fetchedAlbums = getAlbumsByService(service.slug);

    // Step 2: Apply hierarchical filters
    fetchedAlbums = fetchedAlbums.filter((album) => {
      const matchesService =
        album.serviceSlug === service.slug;

      const matchesLocation =
        !location?.slug || album.locationSlug === location.slug;

      const matchesLocality =
        !locality?.slug || album.localitySlug === locality.slug;

      const matchesNiche =
        !niche?.slug || album.nicheSlug === niche.slug;

      return (
        matchesService &&
        matchesLocation &&
        matchesLocality &&
        matchesNiche
      );
    });

    // Step 3: Fallback if no matches (so the gallery isn't empty)
    if (!fetchedAlbums.length) {
      fetchedAlbums = getAlbumsByService(service.slug);
    }

    setAlbums(fetchedAlbums);
  }, [service, location, locality, niche]);

  if (!albums.length) return null;

  return (
    <section className="py-16 bg-white" id="gallery">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-10 text-center">
          Recent {niche?.title || service.title} Shoots
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {albums.map((album) => {
            const cover = album.coverImage?.startsWith("/")
              ? album.coverImage
              : `/${album.coverImage}`;

            return (
              <Link
                key={album.id}
                href={album.albumUrl || "#"}
                className="group block relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Aspect ratio + height for Next/Image fill */}
                <div className="relative w-full aspect-[4/3] min-h-[280px] h-full">
                  <Image
                    src={cover}
                    alt={album.coupleName || service.title}
                    fill
                    priority={false}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay Gradient (doesn't block click) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Overlay Text */}
                  <div className="absolute bottom-0 left-0 w-full p-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                    {album.coupleName && (
                      <h3 className="text-lg font-semibold tracking-tight">
                        {album.coupleName}
                      </h3>
                    )}
                    {album.shootLocation && (
                      <p className="text-sm text-gray-200">
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
    </section>
  );
}
