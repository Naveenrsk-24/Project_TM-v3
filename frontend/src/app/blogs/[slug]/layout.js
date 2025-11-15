import { pageMeta } from "@/lib/meta-data";

export async function generateMetadata({ params }) {
const slug = params.slug;
return pageMeta({
title: `${slug.replace(/-/g, " ")}`,
description: `Read: ${slug.replace(/-/g, " ")}`,
path: `/blogs/${slug}`,
});
}

export default function BlogSlugLayout({ children }) {
  return <>{children}</>;
}
