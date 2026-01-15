import { notFound } from "next/navigation";
import Image from "next/image";
import { getAlbumById } from "@/lib/albums-data";
import AlbumGallery from "@/components/Gallery/AlbumGallery";

export default async function WeddingAlbumPage({ params }) {
  // You told me NOT to remove this
  const resolvedParams = await params;

  const album = getAlbumById("weddings", resolvedParams.album);

  if (!album) return notFound();

  const galleryImages =
    album.images?.length
      ? album.images.map((src, index) => ({
          id: index + 1,
          src,
          // alt: `${album.coupleName} wedding photo ${index + 1}`,
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

      {/* HEADER (unchanged) */}
      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-60"></div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-pink-100 to-white bg-clip-text text-transparent">
            {album.coupleName}
          </h1>

          <p className="text-lg md:text-xl text-pink-200/70 uppercase tracking-[0.15em]">
            {album.shootLocation}
          </p>

          <div className="flex justify-center mt-8">
            <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60"></div>
          </div>
        </div>
      </div>

      {/* GALLERY with Lightbox */}
      <div className="relative z-10 px-4 md:px-8 lg:px-12 pb-32">
        <AlbumGallery galleryImages={galleryImages} />
      </div>
    </div>
  );
}
