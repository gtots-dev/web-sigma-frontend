'use client'

import { useMonitoringContext } from '../monitoring/monitoring-context.component'
import { ReactNode } from 'react'

interface MonitoringHeaderRootProps {
  children?: ReactNode
}

export function MonitoringHeaderRoot({ children }: MonitoringHeaderRootProps) {
  const { isMaximized } = useMonitoringContext()

  if (isMaximized) return null

  return (
    <div className="flex flex-col 2xl:flex-row gap-8 items-start xl:items-center lg:justify-between">
      <div className="flex items-center gap-8 flex-col lg:flex-row w-full">
        {children}
      </div>
    </div>
  )
}
