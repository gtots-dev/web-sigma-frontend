import { WebSocketFactory } from '@/modules/shared/infrastructure/factories/web-socket.factory'
import { MonitoringIncomingMessage } from '../../domain/interfaces/monitoring-dashboard-websocket.interface'
import { MonitoringDashboardSocketServiceGateway } from '../../domain/gateways/monitoring-dashboard-socket.gateway'
import { MonitoringDashboardSocketService } from '../services/monitoring-dashboard-socket.service'

export class MonitoringDashboardSocketFactory {
  static create(contractId: string): MonitoringDashboardSocketServiceGateway {
    const webSocketService = WebSocketFactory.create<MonitoringIncomingMessage>(
      process.env.HOST_API
    )
    return new MonitoringDashboardSocketService(webSocketService, contractId)
  }
}
