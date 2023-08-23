/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/monitoring",
        permanent: true,
      }
    ]
  }
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "https://api.meteor.remmark.ru/api/v1/:path*",
  //     }
  //   ]
  // }
}

module.exports = nextConfig
