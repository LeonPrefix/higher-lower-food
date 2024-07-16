import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.openfoodfacts.org",
      },
    ],
  },
};

export default nextConfig;
