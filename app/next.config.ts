import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",
  // Contact-list CSV uploads to /admin/mailer go through a server action.
  experimental: {
    serverActions: { bodySizeLimit: "5mb" },
  },
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
