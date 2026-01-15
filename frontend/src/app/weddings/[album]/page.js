import { notFound } from "next/navigation";
import Image from "next/image";
import { getAlbumById } from "@/lib/albums-data";

// Metadata must also use async params in Next.js 16
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
  const resolvedParams = await params; // ✅ FIX
  const album = getAlbumById("weddings", resolvedParams.album);

  if (!album) return notFound();

  return (
    <section className="min-h-screen bg-black text-white py-20 px-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-16">
        <h1 className="text-4xl md:text-6xl font-black mb-4">
          {album.coupleName}
        </h1>
        <p className="text-lg text-purple-200/80">{album.shootLocation}</p>
      </div>

      {/* Album Images Placeholder */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="relative h-[400px] rounded-2xl overflow-hidden">
          <Image
            src={album.coverImage}
            alt={album.coupleName}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
