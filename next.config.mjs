/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] },
  // Closed casinos. Their review URLs keep any links and ranking they earned,
  // so send them somewhere useful instead of letting them 404.
  async redirects() {
    return [
      { source: "/sites/luckyland-slots", destination: "/sites/luckyland-casino", permanent: true },
      { source: "/sites/coin-frenzy", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
