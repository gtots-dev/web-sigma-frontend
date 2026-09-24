'use client'

import { ReactNode } from 'react'
import { useMonitoringContext } from '../monitoring/monitoring-context.component'
import { MonitoringViewBackgroundPattern } from './monitoring-view-background-pattern.component'
import { MonitoringViewLayer } from './monitoring-view-layer.component'
import { Map } from '../monitoring-map'

interface MonitoringViewRootProps {
  children?: ReactNode
}

export function MonitoringViewRoot({ children }: MonitoringViewRootProps) {
  const {
    containerRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    isDragging,
    offset,
    mode
  } = useMonitoringContext()

  if (mode === 'map') {
    return (
      <div
        ref={containerRef}
        className="flex flex-1 min-h-0 w-full h-full relative bg-background/50 select-none p-0 overflow-hidden"
      >
        <Map>
          <Map.Canvas />
          {children}
        </Map>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      onPointerDown={handleMouseDown}
      onPointerMove={handleMouseMove}
      onPointerUp={handleMouseUp}
      onPointerLeave={handleMouseUp}
      className={`flex flex-1 min-h-0 w-full h-full relative bg-background/50 select-none touch-none p-4 overflow-hidden ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
    >
      <MonitoringViewBackgroundPattern offset={offset} />

      <svg width="100%" height="100%" className="relative block">
        <g transform={`translate(${offset.x}, ${offset.y})`}>
          <MonitoringViewLayer />
        </g>
      </svg>

      {children}
    </div>
  )
}
