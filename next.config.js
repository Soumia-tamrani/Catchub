/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    },
     images: {
    domains: ['flagcdn.com'],
  },
  }
  
  module.exports = nextConfig
  