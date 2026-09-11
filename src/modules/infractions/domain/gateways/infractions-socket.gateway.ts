import {
  InfractionsIncomingMessage,
  TrafficCaptureMessage
} from '../interfaces/infractions-websocket.interface'
import { WebSocketGateway } from '@/modules/shared/domain/gateways/web-socket.gateway'

export interface InfractionsSocketServiceGateway
  extends WebSocketGateway<InfractionsIncomingMessage, unknown> {
  connect(): Promise<void>
  onTrafficCaptureReceived(
    callback: (message: TrafficCaptureMessage) => void
  ): () => void
}
