import { WebSocketGateway } from '../../domain/gateways/web-socket.gateway'
import { NativeWebSocketService } from '../services/web-socket.service'
import { webSocketAuthInterceptor } from '../interceptors/next-auth-web-socket.interceptor'

export class WebSocketFactory {
  static create<TIncoming = unknown, TOutgoing = unknown>(
    baseURL: string
  ): WebSocketGateway<TIncoming, TOutgoing> {
    
    if (!baseURL) {
      console.error(
        '[WebSocketFactory] HOST_API não está definida. O WebSocket não será instanciado com base URL válida.'
      )
    }

    return new NativeWebSocketService<TIncoming, TOutgoing>(
      [webSocketAuthInterceptor],
      baseURL
    )
  }
}
