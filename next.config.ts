import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    REDIRECT_ROUTER_DEFAULT: process.env.REDIRECT_ROUTER_DEFAULT,
    AUTHENTICATION_ROUTE_PATH: process.env.AUTHENTICATION_ROUTE_PATH,
    SYSTEM_ROUTE_PATH: process.env.SYSTEM_ROUTE_PATH,
    HOST_API: process.env.HOST_API,
    PATH_LOGIN_FOR_ACCESS_TOKEN: process.env.PATH_LOGIN_FOR_ACCESS_TOKEN
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
