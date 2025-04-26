/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "blogger.googleusercontent.com",
      },
      {
        hostname: "heroui.com",
      },
    ],
  },
};

module.exports = nextConfig;
