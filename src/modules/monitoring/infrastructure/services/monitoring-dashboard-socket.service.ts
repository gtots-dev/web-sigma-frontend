import { BaseWebSocketAdapter } from '@/modules/shared/infrastructure/adapters/base-websocket.adapter'
import { MonitoringDashboardSocketServiceGateway } from '../../domain/gateways/monitoring-dashboard-socket.gateway'
import {
  MonitoringIncomingMessage,
  StatusHistoryMessage,
  ConnectionMessage,
  UpStatusMessage,
  LaneStatusMessage,
  type MonitoringDashboardEvents
} from '../../domain/interfaces/monitoring-dashboard-websocket.interface'
import type { WebSocketGateway } from '@/modules/shared/domain/gateways/web-socket.gateway'

export class MonitoringDashboardSocketService
  extends BaseWebSocketAdapter<MonitoringIncomingMessage>
  implements MonitoringDashboardSocketServiceGateway
{
  constructor(
    webSocketService: WebSocketGateway<MonitoringIncomingMessage>,
    private readonly contractId: string
  ) {
    super(webSocketService)
  }

  async connect(): Promise<void> {
    await super.connect(`/ws/contracts/${this.contractId}/dashboard`)
  }

  onDataUpdate(callback: (data: (UpStatusMessage | LaneStatusMessage)[]) => void): () => void {
    const unSubHistory = this.onEvent<MonitoringDashboardEvents>(
      'status_history'
    ).execute<StatusHistoryMessage>((message) => {
      if (message && message.data) {
        callback(message.data)
      }
    })

    const unSubUp = this.onEvent<MonitoringDashboardEvents>(
      'up_status'
    ).execute<UpStatusMessage>((message) => {
      if (message && message.request?.up_id !== undefined) {
        callback([message])
      }
    })

    const unSubLane = this.onEvent<MonitoringDashboardEvents>(
      'lane_status'
    ).execute<LaneStatusMessage>((message) => {
      if (message && message.request?.lane_id !== undefined) {
        callback([message])
      }
    })

    return () => {
      unSubHistory()
      unSubUp()
      unSubLane()
    }
  }

  onConnectionChange(callback: (connected: boolean) => void): () => void {
    const unSubStatus = super.onConnectionChange(callback)

    // Escuta mensagens explícitas de 'connection' vindas do servidor
    const unSubMessage = this.onEvent<MonitoringDashboardEvents>(
      'connection'
    ).execute<ConnectionMessage>((message) => {
      if (message) {
        callback(Boolean(message.status))
      }
    })

    return () => {
      unSubStatus()
      unSubMessage()
    }
  }
}
