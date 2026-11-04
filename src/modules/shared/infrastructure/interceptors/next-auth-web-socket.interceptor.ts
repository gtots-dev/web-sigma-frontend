import { getSession } from 'next-auth/react'
import type { WebSocketInterceptor } from '../services/web-socket.service'

export const webSocketAuthInterceptor: WebSocketInterceptor = async (url) => {
  const session = await getSession()

  if (!session?.token?.access_token) {
    console.warn('[WebSocket Auth Interceptor] Sessão sem token JWT:', url)
    return url
  }

  const urlObj = new URL(url)
  urlObj.searchParams.set('token', session.token.access_token)
  const finalUrl = urlObj.toString()

  return finalUrl
}
