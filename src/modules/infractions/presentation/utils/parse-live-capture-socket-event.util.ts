import type {
  LiveTrafficCaptureSocketEvent,
  LiveTrafficCaptureFileItem
} from '../../domain/interfaces/infractions-websocket.interface'
import { formatCaptureDateTime } from '../hooks/use-infraction-formatted-date.hook'

export const DEFAULT_TTL_MS = 15 * 60 * 1000

export interface ParsedLiveCaptureData {
  readonly captureId: string
  readonly expiresAt: number
  readonly createdAt: string
  readonly formattedDate: string
  readonly formattedTime: string
  readonly fileUrl: string
  readonly newFileItem: LiveTrafficCaptureFileItem
  readonly contractId: number
  readonly laneId: number
}

interface RawCapturePayload {
  readonly traffic_capture_id: number | string
  readonly id?: number | string
  readonly created_at?: string
  readonly date?: string
  readonly timestamp?: string
  readonly contract_id?: number
  readonly lane_id?: number
  readonly file?: { readonly url?: string }
  readonly file_thumb?: { readonly url?: string }
  readonly file_type?: LiveTrafficCaptureFileItem['fileType']
}

export const parseLiveCaptureSocketEvent = (
  incoming: LiveTrafficCaptureSocketEvent,
  now: number = Date.now(),
  ttlMs: number = DEFAULT_TTL_MS
): ParsedLiveCaptureData => {
  const rawResponse = (incoming.response ?? {}) as RawCapturePayload
  const rawId = incoming.response?.traffic_capture_id ?? rawResponse.traffic_capture_id
  const expiresAt = now + ttlMs
  const fileUrl = rawResponse.file?.url

  const createdAt =
    rawResponse.created_at ??
    rawResponse.date ??
    rawResponse.timestamp ??
    new Date().toISOString()

  const { date: formattedDate, time: formattedTime } =
    formatCaptureDateTime(createdAt)

  const newFileItem: LiveTrafficCaptureFileItem = {
    url: fileUrl,
    thumbUrl: rawResponse.file_thumb?.url || fileUrl,
    fileType: rawResponse.file_type
  }

  return {
    captureId: String(rawId),
    expiresAt,
    createdAt,
    formattedDate,
    formattedTime,
    fileUrl,
    newFileItem,
    contractId: rawResponse.contract_id ?? 1,
    laneId: rawResponse.lane_id ?? 1
  }
}
