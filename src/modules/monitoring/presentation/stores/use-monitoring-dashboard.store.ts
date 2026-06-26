import { create } from 'zustand'
import {
  UpStatusMessage,
  LaneStatusMessage
} from '../../domain/interfaces/monitoring-dashboard-websocket.interface'

interface MonitoringDashboardState {
  upData: Map<string, UpStatusMessage>
  laneData: Map<string, LaneStatusMessage>
  hasReceivedInitialData: boolean
  
  // Actions
  updateFromMessages: (updates: (UpStatusMessage | LaneStatusMessage)[]) => void
  resetData: () => void
}

export const useMonitoringDashboardStore = create<MonitoringDashboardState>((set) => ({
  upData: new Map(),
  laneData: new Map(),
  hasReceivedInitialData: false,

  updateFromMessages: (updates: (UpStatusMessage | LaneStatusMessage)[]) => {
    set((state) => {
      let upChanged = false
      let laneChanged = false
      const nextUp = new Map(state.upData)
      const nextLane = new Map(state.laneData)

      updates.forEach((u) => {
        // 1. Check inside request object first
        if (u.request) {
          if ('lane_id' in u.request && u.request.lane_id !== undefined) {
            nextLane.set(String(u.request.lane_id), u as LaneStatusMessage)
            laneChanged = true
            return
          }
          if ('up_id' in u.request && u.request.up_id !== undefined) {
            nextUp.set(String(u.request.up_id), u as UpStatusMessage)
            upChanged = true
            return
          }
        }

        // 2. Fallback to top-level properties
        if ('lane_id' in u && u.lane_id !== undefined) {
          nextLane.set(String(u.lane_id), u as LaneStatusMessage)
          laneChanged = true
        } else if ('up_id' in u && u.up_id !== undefined) {
          nextUp.set(String(u.up_id), u as UpStatusMessage)
          upChanged = true
        }
      })

      return {
        ...(upChanged ? { upData: nextUp } : {}),
        ...(laneChanged ? { laneData: nextLane } : {}),
        hasReceivedInitialData: true
      }
    })
  },

  resetData: () => {
    set({ upData: new Map(), laneData: new Map(), hasReceivedInitialData: false })
  }
}))
