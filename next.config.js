/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["https://picsum.photos"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
