// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutClientWrapper from "@/components/LayoutClientWrapper";

// Font setup
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Your base site URL (update to your actual domain)
// const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tmstudios.vercel.app/";

// export const metadata = {
//   title: {
//     default: "TM Studios - Professional Photography in Chennai",
//     template: "%s - TM Studios",
//   },
//   description:
//     "TM Studios — Chennai’s leading professional photographers for weddings, baby shoots, maternity, and more. Capture timeless memories beautifully.",
//  metadataBase: new URL(`${SITE_URL}/`),
//   openGraph: {
//     title: "TM Studios | Wedding & Lifestyle Photography",
//     description:
//       "Capture your most cherished moments with TM Studios — expert photographers in Chennai and across India.",
//     url: SITE_URL,
//     siteName: "TM Studios",
//     locale: "en-IN",
//     type: "website",
//     images: [`${SITE_URL}/og-image.jpg`],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "TM Studios | Wedding & Lifestyle Photography",
//     description:
//       "Capture life’s best moments with TM Studios. Trusted photographers in Chennai.",
//     images: [`${SITE_URL}/og-image.jpg`],
//   },
//   robots: { index: true, follow: true },
//   // alternates: {
//   //   canonical: SITE_URL,
//   // },
// };
// *******************************************************************************

export const metadata = {
  title: {
    default: "TM Studios - Professional Photography in Chennai",
    template: "%s - TM Studios",
  },
  description:
    "TM Studios — Chennai’s leading professional photographers for weddings, baby shoots, maternity, and more. Capture timeless memories beautifully.",

  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://tmstudios.vercel.app"
  ),

  openGraph: {
    type: "website",
    siteName: "TM Studios",
    locale: "en-IN",
    images: ["/og-image.jpg"],
  },

  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },

  robots: { index: true, follow: true },
};

// LCP preload image (for Core Web Vitals)
const LCP_IMAGE_URL =
  "/_next/image?url=%2FWeddings%2Fgroom-putting-ring-bride-s-finger.webp&w=1080&q=85";

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preload" as="image" href={LCP_IMAGE_URL} />
        <meta
          name="google-site-verification"
          content="1_UHjnxtjcaHe2Da5qfDvI35zGmPIrsu-Mc7U53lCq4"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <LayoutClientWrapper>{children}</LayoutClientWrapper>
      </body>
    </html>
  );
}
