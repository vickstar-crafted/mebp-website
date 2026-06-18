import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "opigtrpgtyssktfybqqy.supabase.co",
      },
    ],
  },
};

export default nextConfig;