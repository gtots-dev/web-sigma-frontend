import { WebSocketGateway } from '../../domain/gateways/web-socket.gateway'
import { NativeWebSocketService } from '../services/web-socket.service'
import { webSocketAuthInterceptor } from '../interceptors/next-auth-web-socket.interceptor'

export class WebSocketFactory {
  static create<TIncoming = unknown, TOutgoing = unknown>(
    baseURL?: string
  ): WebSocketGateway<TIncoming, TOutgoing> {
    let resolvedBaseURL = baseURL || process.env.NEXT_PUBLIC_HOST_API

    if (!resolvedBaseURL && typeof window !== 'undefined') {
      if (window.location.hostname.includes('sigma.gtots.com.br')) {
        resolvedBaseURL = 'https://api.sigma.gtots.com.br'
      }
    }

    return new NativeWebSocketService<TIncoming, TOutgoing>(
      [webSocketAuthInterceptor],
      resolvedBaseURL
    )
  }
}
