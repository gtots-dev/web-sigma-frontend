import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    REDIRECT_ROUTER_DEFAULT: process.env.REDIRECT_ROUTER_DEFAULT
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: process.env.REDIRECT_ROUTER_DEFAULT,
        permanent: true
      }
    ]
  }
}

export default nextConfig
