import type { RequestInterceptor } from '../services/execute-request.service'

export const nextCookieInterceptor: RequestInterceptor = async (config) => {
  if (typeof window !== 'undefined') {
    const match = document.cookie.match(/(?:^|; )(__Secure-trusted_device|trusted_device)=([^;]*)/)
    const trustedDevice = match ? decodeURIComponent(match[2]) : null

    if (!trustedDevice) return config

    return {
      ...config,
      headers: {
        ...config.headers,
        Cookie: `trusted_device=${trustedDevice}; __Secure-trusted_device=${trustedDevice}`
      }
    }
  }

  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()
  const trustedDevice =
    cookieStore.get('trusted_device')?.value ||
    cookieStore.get('__Secure-trusted_device')?.value

  if (!trustedDevice) return config

  return {
    ...config,
    headers: {
      ...config.headers,
      Cookie: `trusted_device=${trustedDevice}; __Secure-trusted_device=${trustedDevice}`
    }
  }
}
