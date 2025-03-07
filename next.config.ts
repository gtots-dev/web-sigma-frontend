import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    HOST_API: process.env.HOST_API,
    AUTH_SECRET: process.env.AUTH_SECRET,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/authentication',
        permanent: true
      }
    ]
  }
}

export default nextConfig
