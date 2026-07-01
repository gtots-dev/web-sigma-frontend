import { UpStatusMessage, LaneStatusMessage, MonitoringIncomingMessage } from '../interfaces/monitoring-dashboard-websocket.interface'
import { WebSocketGateway } from '@/modules/shared/domain/gateways/web-socket.gateway'

export interface MonitoringDashboardSocketServiceGateway extends WebSocketGateway<MonitoringIncomingMessage, unknown> {
  connect(): Promise<void>
  onDataUpdate(callback: (data: (UpStatusMessage | LaneStatusMessage)[]) => void): () => void
}
