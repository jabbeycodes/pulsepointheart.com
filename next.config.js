/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allow optimization for our local assets
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
