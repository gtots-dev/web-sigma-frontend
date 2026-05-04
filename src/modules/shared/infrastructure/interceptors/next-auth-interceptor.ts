import { auth } from '@/auth'
import type { RequestInterceptor } from '../services/execute-request.service'

export const nextAuthInterceptor: RequestInterceptor = async (config) => {
  if (!config.requiresAuth) {
    return config
  }

  const session = await auth()

  if (!session?.token) {
    return config
  }

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `${session.token.token_type} ${session.token.access_token}`
    }
  }
}
