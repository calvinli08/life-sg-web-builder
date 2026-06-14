import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    optimizePackageImports: ["@lifesg/react-design-system"],
  },
};

export default nextConfig;
