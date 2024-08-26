/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    reactCompiler: true,
    after: true,
  },
};

export default nextConfig;
