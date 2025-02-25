import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    REDIRECT_ROUTER_DEFAULT: process.env.REDIRECT_ROUTER_DEFAULT,
    BANNER_IMAGE_SRC: process.env.BANNER_IMAGE_SRC,
    LIGHT_LOGO_SRC: process.env.LIGHT_LOGO_SRC,
    DARK_LOGO_SRC: process.env.DARK_LOGO_SRC,
    MOBILE_LIGHT_LOGO_SRC: process.env.MOBILE_LIGHT_LOGO_SRC,
    MOBILE_DARK_LOGO_SRC: process.env.MOBILE_DARK_LOGO_SRC,
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
