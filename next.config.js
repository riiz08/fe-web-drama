/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "blogger.googleusercontent.com",
      },
    ],
  },
};

module.exports = nextConfig;
