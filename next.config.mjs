/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 启用静态HTML导出
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,  // GitHub Pages需要禁用图片优化
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://doriszhang.cafe' : '',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! 仅开发时应该忽略
    ignoreBuildErrors: true,
  },
};

export default nextConfig; 