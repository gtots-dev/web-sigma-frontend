export type MonitoringDashboardEvents =
  | 'status_history'
  | 'up_status'
  | 'lane_status'
  | 'connection'

export interface StatusElement {
  date: string
  code: number
  name: string
  value: string
  level: number
}

export interface StatusGroup {
  group: string
  elements: StatusElement[]
}

export interface UpStatusRequest {
  up_id: number | string
  items: StatusGroup[]
}

export interface UpStatusMessage {
  up_id: number | string
  version: number
  id: number
  request: UpStatusRequest
}

export interface LaneStatusRequest {
  lane_id: number | string
  items: StatusGroup[]
}

export interface LaneStatusMessage {
  lane_id?: number | string
  up_id?: number | string
  version: number
  id: number
  request: LaneStatusRequest
}


export interface StatusHistoryMessage {
  data: (UpStatusMessage | LaneStatusMessage)[]
}

export interface ConnectionMessage {
  status: boolean
}

export type MonitoringIncomingMessage =
  | StatusHistoryMessage
  | UpStatusMessage
  | LaneStatusMessage
  | ConnectionMessage
