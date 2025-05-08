/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true,  // 禁用图像优化以避免某些Unsplash图片加载问题
  },
  // 禁用turbopack
  experimental: {
    turbo: false
  }
}

module.exports = nextConfig 