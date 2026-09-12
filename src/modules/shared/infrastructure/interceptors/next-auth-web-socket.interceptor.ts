import { getSession } from 'next-auth/react'
import type { WebSocketInterceptor } from '../services/web-socket.service'

export const webSocketAuthInterceptor: WebSocketInterceptor = async (url) => {
  const session = await getSession()

  if (!session?.token?.access_token) {
    console.warn(
      '[WebSocket Auth Interceptor] Sessão sem access_token. URL sem token:',
      url
    )
    return url
  }

  let fullUrl = url
  if (
    !fullUrl.startsWith('ws://') &&
    !fullUrl.startsWith('wss://') &&
    typeof window !== 'undefined'
  ) {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    const path = fullUrl.startsWith('/') ? fullUrl : `/${fullUrl}`
    fullUrl = `${protocol}//${window.location.host}${path}`
  }

  try {
    const urlObj = new URL(fullUrl)
    urlObj.searchParams.set('token', session.token.access_token)
    const finalUrl = urlObj.toString()

    console.log(
      '%c[WebSocket Auth Interceptor] URL COMPLETA DE CONEXÃO:',
      'color: #00ff00; font-weight: bold; font-size: 13px;',
      finalUrl
    )

    return finalUrl
  } catch (error) {
    console.error('[WebSocket Auth Interceptor] Erro ao formatar URL:', error)
    return url
  }
}
