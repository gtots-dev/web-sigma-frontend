export type MonitoringStatus = 'ok' | 'error' | 'warning'
export type MonitoringConnectionStatus = 'online' | 'offline'

export interface MonitoringCell {
  id: string
  name: string
  status?: MonitoringStatus
  connectionStatus?: MonitoringConnectionStatus
  upIds: string[]
  laneIds: string[]
}

export interface MonitoringHexCell {
  id: string
  cx: number
  cy: number
  cell: MonitoringCell
}

export interface MonitoringGridCell {
  id: string
  x: number
  y: number
  cell: MonitoringCell
}
