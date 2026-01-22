// import { pageMeta } from "@/lib/meta-data";

export async function generateMetadata({ params }) {
  const { category, albums } = params;

  // Safe fallbacks to prevent undefined.replace() crashes
  const safeAlbum = (albums || "").replace(/-/g, " ");
  const safeCategory = (category || "").replace(/-/g, " ");

  return pageMeta({
    title: `${safeAlbum} Album`,
    description: `View the ${safeAlbum} album in ${safeCategory}`,
    path: `/portfolio/${category || ""}/${albums || ""}`,
  });
}

export default function AlbumLayout({ children }) {
  return <>{children}</>;
}
