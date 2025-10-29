import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutClientWrapper from "@/components/LayoutClientWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TM Studios - Wedding Photography",
  description:
    "Wedding photography that tells your story — naturally, beautifully, and forever.",
};

const LCP_IMAGE_URL =
  "/_next/image?url=%2FWeddings%2Fgroom-putting-ring-bride-s-finger.webp&w=1080&q=85";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preload" as="image" href={LCP_IMAGE_URL} />
        
        {/* <link rel="preload" href="/_next/static/media/Geist.woff2" as="font" type="font/woff2" crossorigin="anonymous" /> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <LayoutClientWrapper>
          {children}
        </LayoutClientWrapper>
      </body>
    </html>
  );
}
