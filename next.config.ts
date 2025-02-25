import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    REDIRECT_ROUTER_DEFAULT: process.env.REDIRECT_ROUTER_DEFAULT
  }
}

export default nextConfig
