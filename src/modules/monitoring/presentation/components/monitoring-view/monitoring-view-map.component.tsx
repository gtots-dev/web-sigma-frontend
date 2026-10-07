'use client'

import { ReactNode } from 'react'
import { Map } from '../monitoring-map'

interface MonitoringViewMapProps {
  children?: ReactNode
}

export function MonitoringViewMap({ children }: MonitoringViewMapProps) {
  return (
    <Map>
      <Map.Canvas />
      {children}
    </Map>
  )
}
