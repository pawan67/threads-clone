/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["lh3.googleusercontent.com", "res.cloudinary.com"],
  },
  fastRefresh: true,
  concurrentFeatures: true,
  productionBrowserSourceMaps: false, // Disable source maps in development
  optimizeFonts: false, // Disable font optimization
  minify: false, // Disable minification
  swcMinify: true,
};

if (process.env.NODE_ENV === "production") {
  module.exports = withPWA(nextConfig);
} else {
  module.exports = nextConfig;
}
