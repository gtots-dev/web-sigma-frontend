'use client'

import { ReactNode } from 'react'
import { useMonitoringContext } from '../monitoring/monitoring-context.component'
import { MonitoringViewBackgroundPattern } from './monitoring-view-background-pattern.component'
import { MonitoringViewLayer } from './monitoring-view-layer.component'

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
    isMaximized
  } = useMonitoringContext()

  return (
    <div
      ref={containerRef}
      onPointerDown={handleMouseDown}
      onPointerMove={handleMouseMove}
      onPointerUp={handleMouseUp}
      onPointerLeave={handleMouseUp}
      className={`flex flex-1 w-full relative bg-background/50 overflow-hidden select-none p-4 ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      } ${isMaximized ? 'h-full' : 'h-[calc(100svh-130px)]'}`}
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
