/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'notyetnews.s3.amazonaws.com',
      },
    ],
  },
}

module.exports = nextConfig
