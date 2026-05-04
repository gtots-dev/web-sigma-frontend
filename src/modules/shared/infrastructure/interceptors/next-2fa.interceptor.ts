'use server'

import { cookies } from 'next/headers'
import type { RequestInterceptor } from '../services/execute-request.service'

export const next2faInterceptor: RequestInterceptor = async (config) => {
  const method = config.method?.toUpperCase() || 'GET'
  const isModifyingRequest = ['POST', 'PUT', 'PATCH'].includes(method)

  if (!isModifyingRequest) {
    return config
  }

  const cookieStore = await cookies()
  const twoFactorCode = cookieStore.get('X-2FA-Code')?.value

  if (!twoFactorCode) {
    return config
  }

  return {
    ...config,
    headers: {
      ...config.headers,
      'X-2FA-Code': twoFactorCode
    }
  }
}
