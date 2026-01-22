// import { pageMeta } from "@/lib/meta-data";



export async function generateMetadata({ params }) {
return pageMeta({
title: `${params.category} Photography`,
description: `Explore ${params.category} photography portfolio by TM Studios`,
path: `/portfolio/${params.category}`,
});
}


export default function CategoryLayout({ children }) {
  return <>{children}</>;
}