/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', ...(process.env?.IMAGE_DOMAINS?.split(',') || [])]
  },
  publicRuntimeConfig: {
    publicApiBaseUrl: process.env.PUBLIC_API_BASE_URL
  }
};

module.exports = nextConfig;
