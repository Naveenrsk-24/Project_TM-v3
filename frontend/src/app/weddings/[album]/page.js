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

  // Mock gallery images - replace with actual album images
  const galleryImages = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    src: album.coverImage, // Replace with actual image paths
    alt: `${album.coupleName} wedding photo ${i + 1}`,
    aspectRatio: i % 3 === 0 ? "portrait" : i % 5 === 0 ? "square" : "landscape",
  }));

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0a0118] via-[#1a0b2e] to-[#0a0118] overflow-hidden">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[10%] w-3 h-3 bg-pink-500/20 rounded-full blur-sm animate-float-slow"></div>
        <div className="absolute top-40 right-[15%] w-2 h-2 bg-cyan-400/30 rounded-full blur-sm animate-float-medium"></div>
        <div className="absolute top-[60%] left-[20%] w-4 h-4 bg-purple-500/15 rounded-full blur-md animate-float-slow"></div>
        <div className="absolute bottom-40 right-[25%] w-3 h-3 bg-pink-400/25 rounded-full blur-sm animate-float-fast"></div>
        <div className="absolute top-[30%] right-[8%] w-2 h-2 bg-cyan-300/20 rounded-full blur-sm animate-float-medium"></div>
        <div className="absolute bottom-[20%] left-[12%] w-3 h-3 bg-purple-400/20 rounded-full blur-md animate-float-slow"></div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-600/8 rounded-full blur-[150px] animate-pulse-slower"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-400/6 rounded-full blur-[140px] animate-pulse-slow"></div>

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

      {/* Masonry Gallery Section */}
      <div className="relative z-10 px-4 md:px-8 lg:px-12 pb-32">
        <div className="max-w-[1600px] mx-auto">
          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 md:gap-8 space-y-6 md:space-y-8">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="break-inside-avoid mb-6 md:mb-8 group cursor-pointer animate-fade-in-up"
                style={{
                  animationDelay: `${index * 80}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.7)] transition-all duration-700 ease-out hover:shadow-[0_30px_80px_rgba(255,10,120,0.35),0_0_60px_rgba(6,214,249,0.2)] hover:scale-[1.04] hover:z-20">
                  {/* Image Container */}
                  <div className="relative">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={600}
                      height={
                        image.aspectRatio === "portrait"
                          ? 800
                          : image.aspectRatio === "square"
                          ? 600
                          : 400
                      }
                      className="w-full h-auto object-cover transition-all duration-700 ease-out group-hover:brightness-110 group-hover:contrast-105 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient Glow Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-radial from-pink-500/40 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500 ease-out mix-blend-screen pointer-events-none"></div>

                    {/* Border Glow Effect */}
                    <div className="absolute inset-[-2px] rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-400 opacity-0 group-hover:opacity-80 transition-opacity duration-400 ease-out blur-sm -z-10"></div>
                  </div>

                  {/* Subtle Inner Border */}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-white/5 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0118] to-transparent pointer-events-none"></div>
    </div>
  );
}