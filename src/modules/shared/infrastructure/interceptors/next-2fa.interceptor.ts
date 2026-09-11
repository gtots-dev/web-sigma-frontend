import type { RequestInterceptor } from '../services/execute-request.service'

export const next2faInterceptor: RequestInterceptor = async (config) => {
  const method = config.method?.toUpperCase() || 'GET'
  const isModifyingRequest = ['POST', 'PUT', 'PATCH'].includes(method)

  if (!isModifyingRequest) {
    return config
  }

  if (typeof window !== 'undefined') {
    const match = document.cookie.match(/(?:^|; )X-2FA-Code=([^;]*)/)
    const twoFactorCode = match ? decodeURIComponent(match[1]) : null

    if (!twoFactorCode) return config

    return {
      ...config,
      headers: {
        ...config.headers,
        'X-2FA-Code': twoFactorCode
      }
    }
  }

  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()
  const twoFactorCode = cookieStore.get('X-2FA-Code')?.value

  if (!twoFactorCode) return config

  return {
    ...config,
    headers: {
      ...config.headers,
      'X-2FA-Code': twoFactorCode
    }
  }
}
