'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useMonitoring } from '../../hooks/use-monitoring.hook'
import { MonitoringCell } from '../../../domain/interfaces/monitoring-cell.interface'

type MonitoringContextType = ReturnType<typeof useMonitoring>

const MonitoringContext = createContext<MonitoringContextType | null>(null)

export function MonitoringProvider({
  cells,
  children
}: {
  cells: MonitoringCell[]
  children?: ReactNode
}) {
  const value = useMonitoring(cells)

  return (
    <MonitoringContext.Provider value={value}>
      <div
        className={`flex flex-1 gap-y-6 sm:!gap-y-8 bg-white dark:bg-zinc-950 ${
          value.isMaximized
            ? 'fixed inset-0 z-[100] !p-0 overflow-hidden'
            : 'flex-col w-full !p-8'
        }`}
      >
        {children}
      </div>
    </MonitoringContext.Provider>
  )
}

export function useMonitoringContext() {
  const context = useContext(MonitoringContext)
  if (!context) {
    throw new Error(
      'useMonitoringContext must be used within a MonitoringProvider'
    )
  }
  return context
}

export const MonitoringConsumer = MonitoringContext.Consumer
