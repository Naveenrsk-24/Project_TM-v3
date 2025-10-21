/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // ✅ Declare allowed quality values for Next.js 16+
    qualities: [75, 85, 100],
    // Optional: modern formats for smaller images
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: true,
  experimental: {
    optimizeCss: true, // Optional CSS optimization
  },
};

export default nextConfig;
