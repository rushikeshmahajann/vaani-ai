import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ THIS skips ESLint completely
  },
};

export default nextConfig;
