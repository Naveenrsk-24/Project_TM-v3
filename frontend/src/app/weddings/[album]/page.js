import { notFound } from "next/navigation";
import Image from "next/image";
import { getAlbumById } from "@/lib/albums-data";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const album = getAlbumById("weddings", resolvedParams.album);

  if (!album) {
    return { title: "Album Not Found" };
  }

  return {
    title: `${album.coupleName} | Wedding Album`,
    description: `Wedding photography album for ${album.coupleName} shot at ${album.shootLocation}.`,
  };
}

export default async function WeddingAlbumPage({ params }) {
  const resolvedParams = await params;
  const album = getAlbumById("weddings", resolvedParams.album);

  if (!album) return notFound();

  // Use album.images if available, else cover image
  const galleryImages = album.images?.length
    ? album.images.map((src, index) => ({
        id: index + 1,
        src,
        alt: `${album.coupleName} wedding photo ${index + 1}`,
      }))
    : [
        {
          id: 1,
          src: album.coverImage,
          alt: `${album.coupleName} cover photo`,
        },
      ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0a0118] via-[#1a0b2e] to-[#0a0118] overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[10%] w-3 h-3 bg-pink-500/20 rounded-full blur-sm animate-float-slow"></div>
        <div className="absolute top-40 right-[15%] w-2 h-2 bg-cyan-400/30 rounded-full blur-sm animate-float-medium"></div>
        <div className="absolute top-[60%] left-[20%] w-4 h-4 bg-purple-500/15 rounded-full blur-md animate-float-slow"></div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* Decorative Line */}
          <div className="flex justify-center mb-8">
            <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-60 shadow-[0_0_20px_rgba(255,10,120,0.5)]"></div>
          </div>

          {/* Couple Name */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-pink-100 to-white bg-clip-text text-transparent tracking-tight animate-fade-in-up">
            {album.coupleName}
          </h1>

          {/* Location */}
          <p className="text-lg md:text-xl text-pink-200/70 uppercase tracking-[0.15em] font-light animate-fade-in-up animation-delay-300">
            {album.shootLocation}
          </p>

          {/* Decorative Line Bottom */}
          <div className="flex justify-center mt-8">
            <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60 shadow-[0_0_20px_rgba(138,43,226,0.5)]"></div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="relative z-10 px-4 md:px-8 lg:px-12 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[220px] gap-4 md:gap-6">
          {galleryImages.map((image, index) => {
            const spanClass =
              index === 0
                ? "col-span-2 row-span-2"
                : index % 11 === 0
                ? "row-span-2"
                : index % 7 === 0
                ? "col-span-2"
                : "row-span-1";

            return (
              <figure
                key={image.id}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 ease-out ${spanClass}`}
                style={{ animationDelay: `${index * 60}ms` }}
                aria-label={image.alt}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width:768px) 50vw, (max-width:1200px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="absolute bottom-0 p-4 text-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {image.alt}
                </div>
              </figure>
            );
          })}
        </div>
      </div>
    </div>
  );
}
