/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "basahjeruk.org",
      },
    ],
  },
};

module.exports = nextConfig;
