
import { pageMeta } from "@/lib/meta-data";

export async function generateMetadata({ params }) {
const { category, albums } = params;
return pageMeta({
title: `${albums.replace(/-/g, " ")} Album`,
description: `View the ${albums.replace(/-/g, " ")} album in ${category}`,
path: `/portfolio/${category}/${albums}`,
});
}

export default function AlbumLayout({ children }) {
  return <>{children}</>;
}
