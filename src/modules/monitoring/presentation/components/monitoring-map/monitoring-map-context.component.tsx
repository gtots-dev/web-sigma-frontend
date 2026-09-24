'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface MonitoringMapContextType {
  groupShape: 'circle' | 'line'
  setGroupShape: (shape: 'circle' | 'line') => void
  groupMarginMeters: number
  setGroupMarginMeters: (val: number) => void
  mapOpacity: number
  setMapOpacity: (val: number) => void
  outerOpacity: number
  setOuterOpacity: (val: number) => void
  isMapPanned: boolean
  setIsMapPanned: (panned: boolean) => void
  resetMapCenter: () => void
  setResetMapCenterHandler: (fn: (() => void) | null) => void
}

const MonitoringMapContext = createContext<MonitoringMapContextType | null>(null)

export function MonitoringMapProvider({ children }: { children?: ReactNode }) {
  const [groupShape, setGroupShape] = useState<'circle' | 'line'>('circle')
  const [groupMarginMeters, setGroupMarginMeters] = useState<number>(1500)
  const [mapOpacity, setMapOpacity] = useState<number>(0.7)
  const [outerOpacity, setOuterOpacity] = useState<number>(0)
  const [isMapPanned, setIsMapPanned] = useState(false)
  const [resetMapCenterHandler, setResetMapCenterHandlerState] = useState<(() => void) | null>(null)

  const setResetMapCenterHandler = (fn: (() => void) | null) => {
    setResetMapCenterHandlerState(() => fn)
  }

  const resetMapCenter = () => {
    if (resetMapCenterHandler) {
      resetMapCenterHandler()
    }
  }

  return (
    <MonitoringMapContext.Provider
      value={{
        groupShape,
        setGroupShape,
        groupMarginMeters,
        setGroupMarginMeters,
        mapOpacity,
        setMapOpacity,
        outerOpacity,
        setOuterOpacity,
        isMapPanned,
        setIsMapPanned,
        resetMapCenter,
        setResetMapCenterHandler
      }}
    >
      {children}
    </MonitoringMapContext.Provider>
  )
}

export function useMonitoringMapContext() {
  const context = useContext(MonitoringMapContext)
  if (!context) {
    throw new Error('useMonitoringMapContext deve ser utilizado dentro de um MonitoringMapProvider')
  }
  return context
}

export function useSafeMonitoringMapContext() {
  return useContext(MonitoringMapContext)
}
