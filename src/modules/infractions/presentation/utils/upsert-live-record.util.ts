import type {
  LiveTrafficCaptureSocketEvent,
  LiveInfractionCapture
} from '../../domain/interfaces/infractions-websocket.interface'
import { parseLiveCaptureSocketEvent } from './parse-live-capture-socket-event.util'

export const MAX_LIVE_RECORDS = 150

export interface LiveRecord {
  readonly id: string | number
  readonly data: LiveInfractionCapture
  readonly expiresAt: number
}

export interface UpsertLiveRecordResult {
  readonly records: LiveRecord[]
  readonly infractions: LiveInfractionCapture[]
  readonly captureId: string
}

export const upsertLiveRecord = (
  currentRecords: readonly LiveRecord[],
  incoming: LiveTrafficCaptureSocketEvent,
  now: number = Date.now()
): UpsertLiveRecordResult => {
  const parsed = parseLiveCaptureSocketEvent(incoming, now)
  const validRecords = currentRecords.filter((r) => r.expiresAt > now)
  const existingIndex = validRecords.findIndex(
    (r) => String(r.id) === parsed.captureId
  )

  let nextRecords: LiveRecord[] = []

  if (existingIndex !== -1) {
    const existingRecord = validRecords[existingIndex]
    const existingFiles = existingRecord.data.files

    const fileExists = existingFiles.some((f) => f.url === parsed.fileUrl)
    const updatedFiles = fileExists
      ? existingFiles
      : [...existingFiles, parsed.newFileItem]

    const updatedRecord: LiveRecord = {
      ...existingRecord,
      expiresAt: parsed.expiresAt,
      data: {
        ...existingRecord.data,
        createdAt: existingRecord.data.createdAt || parsed.createdAt,
        formattedDate: existingRecord.data.formattedDate || parsed.formattedDate,
        formattedTime: existingRecord.data.formattedTime || parsed.formattedTime,
        files: updatedFiles,
        expiresAt: parsed.expiresAt
      }
    }

    nextRecords = [
      updatedRecord,
      ...validRecords.filter((_, idx) => idx !== existingIndex)
    ]
  } else {
    const newCapture: LiveInfractionCapture = {
      id: parsed.captureId,
      contractId: parsed.contractId,
      laneId: parsed.laneId,
      createdAt: parsed.createdAt,
      formattedDate: parsed.formattedDate,
      formattedTime: parsed.formattedTime,
      files: parsed.fileUrl ? [parsed.newFileItem] : [],
      expiresAt: parsed.expiresAt
    }

    const newRecord: LiveRecord = {
      id: parsed.captureId,
      data: newCapture,
      expiresAt: parsed.expiresAt
    }

    nextRecords = [newRecord, ...validRecords].slice(0, MAX_LIVE_RECORDS)
  }

  return {
    records: nextRecords,
    infractions: nextRecords.map((r) => r.data),
    captureId: parsed.captureId
  }
}
