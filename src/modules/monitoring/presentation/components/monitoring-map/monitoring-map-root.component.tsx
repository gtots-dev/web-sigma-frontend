'use client'

import { ReactNode } from 'react'
import { MonitoringMapProvider } from './monitoring-map-context.component'

interface MonitoringMapRootProps {
  children?: ReactNode
}

export function MonitoringMapRoot({ children }: MonitoringMapRootProps) {
  return (
    <MonitoringMapProvider>
      <div className="relative w-full h-full overflow-hidden">{children}</div>
    </MonitoringMapProvider>
  )
}
