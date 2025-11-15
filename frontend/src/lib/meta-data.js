export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://tmstudios.vercel.app").replace(/\/$/, "");


export function canonical(path = "") {
if (!path || path === "/") return `${SITE_URL}`;
return `${SITE_URL}${path.startsWith("/") ? path : "/" + path}`;
}


export function pageMeta({ title, description, path, image = "/og-image.jpg" }) {
return {
title,
description,
alternates: { canonical: canonical(path) },
openGraph: {
title,
description,
url: canonical(path),
images: [image],
},
twitter: {
title,
description,
images: [image],
},
robots: { index: true, follow: true },
};
}