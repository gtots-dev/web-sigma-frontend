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
        if (u.request) {
          if ('lane_id' in u.request) {
            nextLane.set(String(u.request.lane_id), u as LaneStatusMessage)
            laneChanged = true
          } else if ('up_id' in u.request) {
            nextUp.set(String(u.request.up_id), u as UpStatusMessage)
            upChanged = true
          }
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
