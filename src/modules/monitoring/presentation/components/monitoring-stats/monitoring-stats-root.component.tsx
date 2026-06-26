'use client'

import type { ReactNode } from 'react'
import { useMonitoringStats } from '../../hooks/use-monitoring-stats.hook'

interface MonitoringStatsRootProps {
  children: ReactNode
}

export function MonitoringStatsRoot({ children }: MonitoringStatsRootProps) {
  const { stopPropagation } = useMonitoringStats()

  return (
    <div
      onPointerDown={stopPropagation}
      onMouseDown={stopPropagation}
      onWheel={stopPropagation}
      onTouchStart={stopPropagation}
      className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-lg animate-in fade-in slide-in-from-right-4 duration-300 max-h-[35px]"
    >
      {children}
    </div>
  )
}
