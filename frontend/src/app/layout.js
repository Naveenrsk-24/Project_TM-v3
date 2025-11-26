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

/* --------------------------------------------------
   GLOBAL SITE METADATA (applies to all pages)
-------------------------------------------------- */
export const metadata = {
  title: {
    default: "TM Studios Photography",
    template: "%s - TM Studios",
  },

  description:
    "TM Studios offers professional photography services including weddings, maternity, and baby shoots with cinematic storytelling and premium quality.",

  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://tmstudios.photography"
  ),

  openGraph: {
    type: "website",
    siteName: "TM Studios",
    locale: "en-IN",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TM Studios Photography",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

// LCP preload image (Core Web Vitals)
const LCP_IMAGE_URL =
  "/_next/image?url=%2FWeddings%2Fgroom-putting-ring-bride-s-finger.webp&w=1080&q=85";

/* --------------------------------------------------
   ROOT LAYOUT WRAPPER
-------------------------------------------------- */
export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className="dark">
      <head>
        {/* Performance & verification */}
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
