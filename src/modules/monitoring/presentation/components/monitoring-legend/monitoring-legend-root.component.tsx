'use client'

import { useState, type SyntheticEvent } from 'react'
import { useMonitoringContext } from '../monitoring/monitoring-context.component'
import { MonitoringLegendTriggerMaximized } from './monitoring-legend-trigger-maximized.component'
import { MonitoringLegendTriggerMinimized } from './monitoring-legend-trigger-minimized.component'
import { MonitoringLegendContent } from './monitoring-legend-content.component'

export function MonitoringLegend() {
  const { isMaximized } = useMonitoringContext()
  const [isMinimized, setIsMinimized] = useState(true)

  const stopPropagation = (e: SyntheticEvent) => e.stopPropagation()

  if (isMaximized) {
    return (
      <MonitoringLegendTriggerMaximized
        content={<MonitoringLegendContent />}
        stopPropagation={stopPropagation}
      />
    )
  }

  if (isMinimized) {
    return (
      <MonitoringLegendTriggerMinimized
        onExpand={() => setIsMinimized(false)}
        stopPropagation={stopPropagation}
      />
    )
  }

  return (
    <div
      onPointerDown={stopPropagation}
      onMouseDown={stopPropagation}
      onWheel={stopPropagation}
      onTouchStart={stopPropagation}
      className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm select-none animate-in fade-in zoom-in-95 duration-200 overflow-hidden"
    >
      <MonitoringLegendContent onMinimize={() => setIsMinimized(true)} />
    </div>
  )
}
