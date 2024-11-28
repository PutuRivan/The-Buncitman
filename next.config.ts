import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "placehold.co",
      },
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "via.placeholder.com",
      },
    ],
  },
};

export default nextConfig;
