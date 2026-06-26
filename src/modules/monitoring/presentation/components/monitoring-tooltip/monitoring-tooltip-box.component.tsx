'use client'

import type { ReactNode, RefObject, CSSProperties } from 'react'

interface MonitoringTooltipBoxProps {
  tooltipRef: RefObject<HTMLDivElement>
  positionStyle: CSSProperties
  className?: string
  hoveredCellId: string | null
  setHoveredCellId: (id: string | null) => void
  children: ReactNode
}

export function MonitoringTooltipBox({
  tooltipRef,
  positionStyle,
  className,
  hoveredCellId,
  setHoveredCellId,
  children
}: MonitoringTooltipBoxProps) {
  return (
    <div
      ref={tooltipRef}
      className="absolute z-[150] pointer-events-none"
      style={positionStyle}
    >
      <div className="pointer-events-none animate-in fade-in-0 zoom-in-95 duration-100">
        <div
          className={`flex flex-col bg-card border w-[300px] max-h-[500px] max-w-[300px] overflow-y-auto relative ms-2 rounded-lg p-2.5 shadow-xl pointer-events-auto ${className || ''}`}
          onPointerEnter={() => setHoveredCellId(hoveredCellId)}
          onPointerLeave={() => setHoveredCellId(null)}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
