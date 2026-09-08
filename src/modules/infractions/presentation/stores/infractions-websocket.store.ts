import { create } from 'zustand'
import type {
  LiveTrafficCaptureSocketEvent,
  LiveInfractionCapture
} from '../../domain/interfaces/infractions-websocket.interface'
import { DEFAULT_TTL_MS } from '../utils/parse-live-capture-socket-event.util'
import {
  upsertLiveRecord,
  type LiveRecord
} from '../utils/upsert-live-record.util'

interface InfractionsWebsocketStoreState {
  records: LiveRecord[]
  infractions: LiveInfractionCapture[]
  addCapture: (capture: LiveTrafficCaptureSocketEvent) => void
  removeRecord: (recordId: string | number) => void
  purgeExpired: () => void
  clear: () => void
}

export const useInfractionsWebsocketStore =
  create<InfractionsWebsocketStoreState>((set, get) => ({
    records: [],
    infractions: [],

    addCapture: (incoming: LiveTrafficCaptureSocketEvent) => {
      let captureId = ''

      set((state) => {
        const result = upsertLiveRecord(state.records, incoming)
        captureId = result.captureId
        return {
          records: result.records,
          infractions: result.infractions
        }
      })

      if (captureId) {
        setTimeout(() => {
          get().removeRecord(captureId)
        }, DEFAULT_TTL_MS)
      }
    },

    removeRecord: (recordId: string | number) => {
      set((state) => {
        const nextRecords = state.records.filter(
          (r) => String(r.id) !== String(recordId)
        )
        if (nextRecords.length === state.records.length) return state

        return {
          records: nextRecords,
          infractions: nextRecords.map((r) => r.data)
        }
      })
    },

    purgeExpired: () => {
      set((state) => {
        const now = Date.now()
        const validRecords = state.records.filter((r) => r.expiresAt > now)

        if (validRecords.length === state.records.length) return state

        return {
          records: validRecords,
          infractions: validRecords.map((r) => r.data)
        }
      })
    },

    clear: () => {
      set({ records: [], infractions: [] })
    }
  }))
