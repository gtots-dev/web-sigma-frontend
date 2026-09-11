import { BaseWebSocketAdapter } from '@/modules/shared/infrastructure/adapters/base-websocket.adapter'
import { InfractionsSocketServiceGateway } from '../../domain/gateways/infractions-socket.gateway'
import {
  LiveTrafficCaptureSocketEvent,
  InfractionsEvents
} from '../../domain/interfaces/infractions-websocket.interface'
import type { WebSocketGateway } from '@/modules/shared/domain/gateways/web-socket.gateway'

export class InfractionsSocketService
  extends BaseWebSocketAdapter<LiveTrafficCaptureSocketEvent>
  implements InfractionsSocketServiceGateway
{
  constructor(
    webSocketService: WebSocketGateway<LiveTrafficCaptureSocketEvent>,
    private readonly contractId: string
  ) {
    super(webSocketService)
  }

  async connect(): Promise<void> {
    if (!this.contractId) {
      return
    }
    await super.connect(`/ws/contracts/${this.contractId}/dashboard`)
  }

  onTrafficCaptureReceived(
    callback: (message: LiveTrafficCaptureSocketEvent) => void
  ): () => void {
    return this.onEvent<InfractionsEvents>(
      'traffic_capture'
    ).execute<LiveTrafficCaptureSocketEvent>((message) => {
      if (message) callback(message)
    })
  }
}
