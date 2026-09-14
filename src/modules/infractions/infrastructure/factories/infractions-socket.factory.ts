import { WebSocketFactory } from '@/modules/shared/infrastructure/factories/web-socket.factory'
import { InfractionsIncomingMessage } from '../../domain/interfaces/infractions-websocket.interface'
import { InfractionsSocketServiceGateway } from '../../domain/gateways/infractions-socket.gateway'
import { InfractionsSocketService } from '../services/infractions-socket.service'

export class InfractionsSocketFactory {
  static create(contractId: string): InfractionsSocketServiceGateway {
    const webSocketService =
      WebSocketFactory.create<InfractionsIncomingMessage>(process.env.HOST_API)
    return new InfractionsSocketService(webSocketService, contractId)
  }
}
