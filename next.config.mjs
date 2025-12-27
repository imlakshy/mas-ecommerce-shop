/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["static.zara.net"],
  },
};

export default nextConfig;



