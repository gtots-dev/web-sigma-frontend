export type { Infraction } from './infraction.interface'

export interface LiveTrafficCaptureFile {
  url: string
}

export interface LiveTrafficCaptureFileThumb {
  url: string
}

export interface LiveTrafficCaptureResponse {
  id?: number | string | null
  contract_id: number
  lane_id: number
  file?: LiveTrafficCaptureFile
  file_thumb?: LiveTrafficCaptureFileThumb
  file_type?: 'photo' | 'video' | string
  created_at?: string
}

export interface LiveTrafficCaptureSocketEvent {
  type: 'traffic_capture' | string
  version?: number
  id?: string | number | null
  result?: unknown
  response: LiveTrafficCaptureResponse
}

export interface LiveTrafficCaptureFileItem {
  url: string
  thumbUrl: string
  fileType: 'photo' | 'video' | string
}

export interface LiveInfractionCapture {
  id: string | number
  contractId: number
  laneId: number
  createdAt?: string
  formattedDate: string
  formattedTime: string
  files: LiveTrafficCaptureFileItem[]
}

export type TrafficCaptureMessage = LiveTrafficCaptureSocketEvent
export type InfractionsIncomingMessage = LiveTrafficCaptureSocketEvent
export type InfractionsEvents = 'traffic_capture'
