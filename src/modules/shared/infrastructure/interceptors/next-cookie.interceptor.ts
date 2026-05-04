'use server'

import { cookies } from 'next/headers'
import type { RequestInterceptor } from '../services/execute-request.service'

export const nextCookieInterceptor: RequestInterceptor = async (config) => {
  const cookieStore = await cookies()
  const trustedDevice =
    cookieStore.get('trusted_device')?.value ||
    cookieStore.get('__Secure-trusted_device')?.value

  return {
    ...config,
    headers: {
      ...config.headers,
      ...(trustedDevice && {
        'Cookie': `trusted_device=${trustedDevice}; __Secure-trusted_device=${trustedDevice}`
      })
    }
  }
}
