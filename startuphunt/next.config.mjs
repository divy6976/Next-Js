/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
      },
       {
        protocol: "https",
        hostname: "heroui.com",
      },
    ],
  },
};

export default nextConfig;
