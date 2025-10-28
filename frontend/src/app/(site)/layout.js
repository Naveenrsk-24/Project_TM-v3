import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import NavBarMain from "@/components/Navbar/NavbarMain";
import Footer from "@/components/Footer/Footer";
// import PremiumNavbar from "@/components/ExtraDesigns/PremiumNavbar"; // Keep commented if unused

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TM Studios - Wedding Photography", // Enhanced SEO Title
  description: "Wedding photography that tells your story — naturally, beautifully, and forever.", // Enhanced SEO Description
};

// 🛑 CRITICAL LCP FIX: Define the LCP URL for the hero background image.
// Use w=1080 as a good target for modern mobile screens.
const LCP_IMAGE_URL = "/_next/image?url=%2FWeddings%2Fgroom-putting-ring-bride-s-finger.webp&w=1080&q=85";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ MOBILE-FIRST VIEWPORT (Guideline 1) */}
        <meta name="viewport" content="width=device-width, initial-scale=1" /> 
        
        {/* 🚀 LCP GUARANTEE: Manual Preload (Optimization Step 1) */}
        {/* This will start downloading the hero image immediately, fixing the 7.2s LCP. */}
        <link 
          rel="preload" 
          as="image" 
          href={LCP_IMAGE_URL} 
        />

        {/* Optimization 5: Font Preload. 
          If Geist fonts are render-blocking, preload them here. 
          Since you are using next/font, Next.js handles this automatically, 
          but you can add this if Lighthouse suggests it.
        */}
        {/* <link rel="preload" href="/_next/static/media/Geist.woff2" as="font" type="font/woff2" crossorigin="anonymous" /> */}
      </head>
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <NavBarMain/>
        {/* <PremiumNavbar/> */}
        {children}
        <Footer/>
      </body>
    </html>
  );
}