/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', ...(process.env?.IMAGE_DOMAINS?.split(',') || [])]
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig
