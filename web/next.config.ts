import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["@anthropic-ai/sdk"],
  async headers() {
    return [
      {
        // Belt and braces with metadata robots (doc 05 §6, E2E H36)
        source: "/report/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
