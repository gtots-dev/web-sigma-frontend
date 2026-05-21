import { WebSocketGateway } from '../../domain/gateways/web-socket.gateway'
import { NativeWebSocketService } from '../services/web-socket.service'
import { webSocketAuthInterceptor } from '../interceptors/next-auth-web-socket.interceptor'

export class WebSocketFactory {
  static create<TIncoming = unknown, TOutgoing = unknown>(
    baseURL: string
  ): WebSocketGateway<TIncoming, TOutgoing> {
    return new NativeWebSocketService<TIncoming, TOutgoing>(
      [webSocketAuthInterceptor],
      baseURL
    )
  }
}
